import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { once } from "node:events";
import { chromium } from "@playwright/test";

const run = promisify(execFile);
const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "output"), audioDir = join(root, "audio");
const story = JSON.parse(await readFile(join(root, "storyboard.json"), "utf8"));
await mkdir(out, { recursive: true }); await mkdir(audioDir, { recursive: true });
const modes = process.argv.includes("--stills") ? "stills" : process.argv.includes("--audio-only") ? "audio" : "full";
const reuseAudio = modes === "stills" || process.argv.includes("--video-only");
const voiceName = process.env.SEYA_VOICE || "Thomas";
const voiceRate = process.env.SEYA_VOICE_RATE || "180";
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg", ffprobe = process.env.FFPROBE_PATH || "ffprobe";
const probe = async (path) => JSON.parse((await run(ffprobe, ["-v", "error", "-show_entries", "format=duration,size:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels", "-of", "json", path])).stdout);
const stamp = (seconds) => {
  const ms = Math.round(seconds * 1000), hh = Math.floor(ms / 3600000), mm = Math.floor(ms / 60000) % 60, ss = Math.floor(ms / 1000) % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`;
};

function originalBed() {
  const rate = 48000, samples = story.duration * rate, buffer = Buffer.alloc(44 + samples * 4);
  buffer.write("RIFF", 0); buffer.writeUInt32LE(buffer.length - 8, 4); buffer.write("WAVEfmt ", 8);
  buffer.writeUInt32LE(16, 16); buffer.writeUInt16LE(1, 20); buffer.writeUInt16LE(2, 22); buffer.writeUInt32LE(rate, 24);
  buffer.writeUInt32LE(rate * 4, 28); buffer.writeUInt16LE(4, 32); buffer.writeUInt16LE(16, 34); buffer.write("data", 36); buffer.writeUInt32LE(samples * 4, 40);
  const notes = [220, 329.6276, 261.6256, 293.6648, 220, 196, 261.6256, 329.6276];
  for (let i = 0; i < samples; i++) {
    const t = i / rate, beat = 60 / 84, b = Math.floor(t / beat), phase = t % beat;
    const fade = Math.min(1, t / 1.4, (story.duration - t) / 1.6);
    const note = notes[b % notes.length], env = (1 - Math.exp(-phase * 45)) * Math.exp(-phase * 7);
    let value = .012 * Math.sin(2 * Math.PI * 110 * t) + .006 * Math.sin(2 * Math.PI * 164.8138 * t);
    value += .052 * env * (Math.sin(2 * Math.PI * note * t) + .27 * Math.sin(2 * Math.PI * note * 2 * t));
    const transition = story.scenes.find(scene => t >= scene.start && t - scene.start < .6);
    if (transition) { const dt = t - transition.start; value += .034 * Math.exp(-dt * 8) * Math.sin(2 * Math.PI * (440 + 110 * dt) * dt); }
    const mono = Math.round(Math.max(-.8, Math.min(.8, value * fade)) * 32767);
    buffer.writeInt16LE(mono, 44 + i * 4); buffer.writeInt16LE(Math.round(mono * .95), 46 + i * 4);
  }
  return buffer;
}

let cues = [], voiceReport = [];
if (!reuseAudio) {
  console.log("Préparation de la narration française et du fond sonore original.");
  for (let i = 0; i < story.scenes.length; i++) {
    const scene = story.scenes[i], textPath = join(audioDir, `scene-${i + 1}.txt`), source = join(audioDir, `scene-${i + 1}.aiff`), dest = join(audioDir, `scene-${i + 1}.wav`);
    // The written spelling helps the local French voice pronounce the brand correctly.
    await writeFile(textPath, scene.voice.replaceAll("Seya Labs", "Séya Labs"));
    await run("say", ["-v", voiceName, "-r", voiceRate, "-f", textPath, "-o", source]);
    const info = await probe(source), duration = Number(info.format.duration);
    if (!duration || duration < .5) throw new Error(`La voix ${voiceName} n’a pas généré d’audio. Vérifier les permissions macOS.`);
    const available = scene.end - scene.start - .55;
    const speed = Math.max(1, duration / available);
    if (speed > 1.23) throw new Error(`Narration trop longue dans la scène ${i + 1}. Raccourcir le texte plutôt que d’accélérer davantage.`);
    await run(ffmpeg, ["-y", "-v", "error", "-i", source, "-af", `atempo=${speed.toFixed(6)},aresample=48000,highpass=f=75,loudnorm=I=-18:TP=-2:LRA=7`, "-ar", "48000", "-ac", "2", dest]);
    const actualDuration = Number((await probe(dest)).format.duration), start = scene.start + .25;
    if (start + actualDuration > scene.end - .05) throw new Error(`Chevauchement audio dans la scène ${i + 1}`);
    const totalWeight = scene.captions.reduce((sum, caption) => sum + caption.length, 0);
    let cursor = start;
    for (const caption of scene.captions) {
      const end = cursor + actualDuration * caption.length / totalWeight;
      cues.push({ scene: i, start: cursor, end, text: caption }); cursor = end;
    }
    voiceReport.push({ scene: i + 1, voice: voiceName, sourceDuration: duration, speed, duration: actualDuration, startsAt: start, endsAt: start + actualDuration });
    console.log(`Voix ${i + 1}/8 : ${actualDuration.toFixed(2)} s.`);
  }
  const bed = join(audioDir, "fond-sonore-original.wav"); await writeFile(bed, originalBed());
  const inputs = story.scenes.flatMap((_, i) => ["-i", join(audioDir, `scene-${i + 1}.wav`)]).concat(["-i", bed]);
  const filters = story.scenes.map((scene, i) => `[${i}:a]adelay=${Math.round((scene.start + .25) * 1000)}|${Math.round((scene.start + .25) * 1000)}[v${i}]`);
  filters.push(`[8:a]volume=0.52[bed]`);
  filters.push(`${story.scenes.map((_, i) => `[v${i}]`).join("")}[bed]amix=inputs=9:duration=longest:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=9,atrim=duration=${story.duration}[mix]`);
  await run(ffmpeg, ["-y", "-v", "error", ...inputs, "-filter_complex", filters.join(";"), "-map", "[mix]", "-ar", "48000", "-ac", "2", join(out, "seya-labs-bande-son.wav")]);
  await run(ffmpeg, ["-y", "-v", "error", "-i", join(out, "seya-labs-bande-son.wav"), "-c:a", "libmp3lame", "-b:a", "192k", join(out, "seya-labs-bande-son.mp3")]);
  await writeFile(join(out, "seya-labs.srt"), cues.map((cue, i) => `${i + 1}\n${stamp(cue.start)} --> ${stamp(cue.end)}\n${cue.text}\n`).join("\n"));
  await writeFile(join(out, "narration-et-cues.json"), JSON.stringify({ voiceReport, cues }, null, 2));
} else {
  ({ cues, voiceReport } = JSON.parse(await readFile(join(out, "narration-et-cues.json"), "utf8")));
}

const fonts = {};
for (const [name, file] of [["SeyaDisplay", "space-grotesk.woff2"], ["SeyaBody", "inter.woff2"], ["SeyaMono", "geist-mono.woff2"]]) fonts[name] = (await readFile(join(root, "../public/fonts", file))).toString("base64");
const mark = await readFile(join(root, "../public/brand/logo-mark.svg"), "utf8");
const logoPath = mark.match(/<path d="([^"]+)"/)[1];
await writeFile(join(root, "assets.js"), `window.SEYA_FILM_ASSETS = ${JSON.stringify({ storyboard: story, cues, fonts, logoPath })};\n`);
if (modes === "audio") { console.log("Narration, bande-son, sous-titres et assets prêts."); process.exit(0); }

const browser = await chromium.launch(process.platform === "darwin" ? { executablePath: process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" } : {});
const context = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
const page = await context.newPage(), errors = [];
page.on("pageerror", error => errors.push(error.message));
try {
  await page.goto(`${pathToFileURL(join(root, "production.html")).href}?render=1`);
  await page.waitForFunction(() => window.filmReady === true);
  for (const [name, width, height] of [["horizontal", 1920, 1080], ["vertical", 1080, 1920]]) {
    const format = name === "horizontal" ? "landscape" : "portrait";
    await page.setViewportSize({ width, height });
    for (const [index, time] of [2.5, 7.4, 13.3, 19.5, 26.5, 33.6, 38.4, 42.8].entries()) {
      await page.evaluate(({ time, format }) => window.renderFrame(time, format), { time, format });
      await page.locator("canvas").screenshot({ path: join(out, `${name}-scene-${index + 1}.png`) });
    }
    await page.evaluate(({ format }) => window.renderFrame(43.3, format), { format });
    await page.locator("canvas").screenshot({ path: join(out, `couverture-${name}.png`) });
    if (modes === "stills") continue;
    console.log(`Export ${name} : ${width} × ${height}, ${story.fps} images/s.`);
    const dest = join(out, `seya-labs-${name}.mp4`);
    const encoder = spawn(ffmpeg, ["-y", "-v", "warning", "-f", "image2pipe", "-vcodec", "mjpeg", "-framerate", String(story.fps), "-i", "pipe:0", "-i", join(out, "seya-labs-bande-son.wav"), "-map", "0:v", "-map", "1:a", "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-t", String(story.duration), "-movflags", "+faststart", "-metadata", "title=SEYA LABS — Des outils sur mesure. Un budget à votre mesure.", "-metadata:s:a:0", "language=fra", dest], { stdio: ["pipe", "ignore", "pipe"] });
    let encoderErrors = ""; encoder.stderr.on("data", chunk => { encoderErrors = `${encoderErrors}${chunk.toString()}`.slice(-6000); });
    const exited = once(encoder, "close");
    const frames = Math.round(story.duration * story.fps);
    for (let frame = 0; frame < frames; frame++) {
      const base64 = await page.evaluate(({ seconds, format }) => { window.renderFrame(seconds, format); return document.querySelector("canvas").toDataURL("image/jpeg", .96).split(",")[1]; }, { seconds: frame / story.fps, format });
      if (!encoder.stdin.write(Buffer.from(base64, "base64"))) await once(encoder.stdin, "drain");
      if ((frame + 1) % 450 === 0) console.log(`${name} : ${Math.round((frame + 1) / frames * 100)} %`);
    }
    encoder.stdin.end(); const [code] = await exited;
    if (code !== 0) throw new Error(`Export échoué : ${encoderErrors}`);
    const info = await probe(dest), video = info.streams.find(stream => stream.codec_type === "video"), audio = info.streams.find(stream => stream.codec_type === "audio");
    if (video.width !== width || video.height !== height || video.codec_name !== "h264" || video.r_frame_rate !== "30/1" || audio.codec_name !== "aac" || Math.abs(Number(info.format.duration) - story.duration) > .1) throw new Error(`L’export ${name} ne respecte pas le format attendu.`);
    const file = await stat(dest); console.log(`MP4 ${name} terminé : ${(file.size / 1024 / 1024).toFixed(1)} Mo.`);
  }
  if (errors.length) throw new Error(`Erreurs navigateur : ${errors.join("; ")}`);
  await writeFile(join(out, "verification.json"), JSON.stringify({ duration: story.duration, fps: story.fps, mode: modes, voice: voiceName, voiceReport, pageErrors: errors, checkedAt: new Date().toISOString() }, null, 2));
} finally { await browser.close(); }
