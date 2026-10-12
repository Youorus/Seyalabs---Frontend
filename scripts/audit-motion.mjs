import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

const base = process.env.MOTION_AUDIT_URL || "http://localhost:3210";
const output = new URL("../motion/output/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch(
  process.platform === "darwin"
    ? {
        executablePath:
          process.env.CHROME_PATH ||
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      }
    : {},
);
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const checks = [];
try {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.filmReady);
    for (const format of ["Horizontal", "Vertical"]) {
      await page.getByRole("button", { name: format, exact: true }).click();
      await page.locator("#seek").fill("19.5");
      await page.locator("#seek").dispatchEvent("input");
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      assert.equal(
        axe.violations.length,
        0,
        `${width} / ${format}: accessibility`,
      );
      const audioDuration = await page.evaluate(async () => {
        const audio = document.querySelector("audio");
        await audio.play();
        await new Promise((resolve) => setTimeout(resolve, 250));
        const playing = audio.currentTime > 0 && !audio.paused;
        audio.pause();
        return { duration: audio.duration, playing };
      });
      assert.ok(Math.abs(audioDuration.duration - 45) < 0.15);
      assert.equal(audioDuration.playing, true);
      checks.push({
        width,
        format,
        audioDuration: audioDuration.duration,
        accessibilityViolations: 0,
      });
    }
  }
  for (const format of ["horizontal", "vertical"]) {
    await page.goto(`${base}/output/seya-labs-${format}.mp4`);
    const info = await page.locator("video").evaluate(async (video) => {
      if (video.readyState < 1)
        await new Promise((resolve, reject) => {
          video.addEventListener("loadedmetadata", resolve, { once: true });
          video.addEventListener("error", reject, { once: true });
        });
      await video.play();
      await new Promise((resolve) => setTimeout(resolve, 300));
      const info = {
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        playing: !video.paused && video.currentTime > 0,
      };
      video.pause();
      return info;
    });
    assert.equal(info.duration, 45);
    assert.equal(info.playing, true);
    assert.equal(info.width, format === "horizontal" ? 1920 : 1080);
    assert.equal(info.height, format === "horizontal" ? 1080 : 1920);
    checks.push({ format, ...info });
  }
  assert.deepEqual(errors, []);
  console.log(
    `PASS: ElevenLabs mix plays, 4 accessible previews, 2 MP4 formats of 45 seconds, no browser errors.`,
  );
} finally {
  await writeFile(
    new URL("verification-apercu.json", output),
    JSON.stringify(
      {
        voice: "François Louis · ElevenLabs",
        checks,
        pageErrors: errors,
        checkedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
  await browser.close();
}
