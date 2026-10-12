import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import { once } from "node:events";
import { createHash } from "node:crypto";
import { chromium } from "@playwright/test";

const run = promisify(execFile);
const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, "output"),
  audioDir = join(root, "audio");
const story = JSON.parse(await readFile(join(root, "storyboard.json"), "utf8"));
await mkdir(out, { recursive: true });
await mkdir(audioDir, { recursive: true });
const modes = process.argv.includes("--stills")
  ? "stills"
  : process.argv.includes("--audio-only")
    ? "audio"
    : "full";
const reuseAudio = modes === "stills" || process.argv.includes("--video-only");
const elevenlabs = process.argv.includes("--elevenlabs");
const draftWithoutEffects = process.argv.includes("--draft-without-effects");
const elevenConfig = elevenlabs
  ? JSON.parse(await readFile(join(root, "voice-elevenlabs.json"), "utf8"))
  : null;
const voiceName = elevenlabs
  ? `${elevenConfig.voice_name} · ElevenLabs`
  : process.env.SEYA_VOICE || "Thomas";
const voiceRate = process.env.SEYA_VOICE_RATE || "180";
const ffmpeg = process.env.FFMPEG_PATH || "ffmpeg",
  ffprobe = process.env.FFPROBE_PATH || "ffprobe";
const probe = async (path) =>
  JSON.parse(
    (
      await run(ffprobe, [
        "-v",
        "error",
        "-show_entries",
        "format=duration,size:stream=codec_type,codec_name,width,height,r_frame_rate,sample_rate,channels",
        "-of",
        "json",
        path,
      ])
    ).stdout,
  );
const stamp = (seconds) => {
  const ms = Math.round(seconds * 1000),
    hh = Math.floor(ms / 3600000),
    mm = Math.floor(ms / 60000) % 60,
    ss = Math.floor(ms / 1000) % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`;
};

function originalBed() {
  const rate = 48000,
    samples = story.duration * rate,
    buffer = Buffer.alloc(44 + samples * 4);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(buffer.length - 8, 4);
  buffer.write("WAVEfmt ", 8);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(2, 22);
  buffer.writeUInt32LE(rate, 24);
  buffer.writeUInt32LE(rate * 4, 28);
  buffer.writeUInt16LE(4, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(samples * 4, 40);
  const notes = [
    220, 329.6276, 261.6256, 293.6648, 220, 196, 261.6256, 329.6276,
  ];
  for (let i = 0; i < samples; i++) {
    const t = i / rate,
      beat = 60 / 84,
      b = Math.floor(t / beat),
      phase = t % beat;
    const fade = Math.min(1, t / 1.4, (story.duration - t) / 1.6);
    const note = notes[b % notes.length],
      env = (1 - Math.exp(-phase * 45)) * Math.exp(-phase * 7);
    let value =
      0.012 * Math.sin(2 * Math.PI * 110 * t) +
      0.006 * Math.sin(2 * Math.PI * 164.8138 * t);
    value +=
      0.015 *
      env *
      (Math.sin(2 * Math.PI * note * t) +
        0.27 * Math.sin(2 * Math.PI * note * 2 * t));
    const mono = Math.round(
      Math.max(-0.8, Math.min(0.8, value * fade)) * 32767,
    );
    buffer.writeInt16LE(mono, 44 + i * 4);
    buffer.writeInt16LE(Math.round(mono * 0.95), 46 + i * 4);
  }
  return buffer;
}

let cues = [],
  words = [],
  voiceReport = [];
let soundReport = {
  provider: elevenlabs ? "ElevenLabs" : "Local original",
  status: elevenlabs
    ? draftWithoutEffects
      ? "draft_missing_sound_effects_permission"
      : "complete"
    : "local_fallback",
  generatedEffects: 0,
  events: 0,
};
if (!reuseAudio) {
  console.log(
    "Préparation de la narration française et du fond sonore original.",
  );
  for (let i = 0; i < story.scenes.length; i++) {
    const scene = story.scenes[i],
      textPath = join(audioDir, `scene-${i + 1}.txt`),
      source = join(
        audioDir,
        `scene-${i + 1}${elevenlabs ? "-elevenlabs.mp3" : ".aiff"}`,
      ),
      dest = join(audioDir, `scene-${i + 1}.wav`);
    let alignment,
      trimStart = 0,
      trimEnd;
    if (elevenlabs) {
      const metadata = JSON.parse(
        await readFile(
          join(audioDir, `scene-${i + 1}-elevenlabs.json`),
          "utf8",
        ),
      );
      if (
        metadata.voiceId !== elevenConfig.voice_id ||
        metadata.modelId !== elevenConfig.model_id
      )
        throw new Error(
          "Le cache ElevenLabs ne correspond pas à la voix configurée.",
        );
      const spoken = (text) =>
        text.replaceAll("Seya Labs", elevenConfig.brand_pronunciation);
      const payload = {
        text: spoken(scene.voice),
        model_id: elevenConfig.model_id,
        voice_settings: elevenConfig.voice_settings,
        ...(i > 0 ? { previous_text: spoken(story.scenes[i - 1].voice) } : {}),
        ...(i + 1 < story.scenes.length
          ? { next_text: spoken(story.scenes[i + 1].voice) }
          : {}),
      };
      const expected = createHash("sha256")
        .update(JSON.stringify({ voice: elevenConfig.voice_id, payload }))
        .digest("hex");
      if (metadata.fingerprint !== expected)
        throw new Error(
          `Cache vocal périmé, scène ${i + 1}. Régénérer la narration avant le rendu.`,
        );
      alignment = metadata.alignment;
      const spokenIndexes = alignment.characters
        .map((character, index) =>
          /[\p{L}\p{N}]/u.test(character) ? index : -1,
        )
        .filter((index) => index >= 0);
      if (!spokenIndexes.length) throw new Error("Alignement vocal vide.");
      trimStart = Math.max(
        0,
        alignment.character_start_times_seconds[spokenIndexes[0]] - 0.06,
      );
      trimEnd =
        alignment.character_end_times_seconds[spokenIndexes.at(-1)] + 0.14;
    } else {
      await writeFile(
        textPath,
        scene.voice.replaceAll("Seya Labs", "Séya Labs"),
      );
      await run("say", [
        "-v",
        voiceName,
        "-r",
        voiceRate,
        "-f",
        textPath,
        "-o",
        source,
      ]);
    }
    const info = await probe(source),
      duration = Number(info.format.duration);
    if (!duration || duration < 0.5)
      throw new Error(
        `La voix ${voiceName} n’a pas généré d’audio. Vérifier les permissions macOS.`,
      );
    trimEnd = Math.min(duration, trimEnd ?? duration);
    const available = scene.end - scene.start - 0.55;
    const speed = Math.max(1, (trimEnd - trimStart) / available);
    if (speed > 1.23)
      throw new Error(
        `Narration trop longue dans la scène ${i + 1}. Raccourcir le texte plutôt que d’accélérer davantage.`,
      );
    await run(ffmpeg, [
      "-y",
      "-v",
      "error",
      "-i",
      source,
      "-af",
      `atrim=start=${trimStart}:end=${trimEnd},asetpts=PTS-STARTPTS,atempo=${speed.toFixed(6)},aresample=48000,highpass=f=75,loudnorm=I=-18:TP=-2:LRA=7`,
      "-ar",
      "48000",
      "-ac",
      "2",
      dest,
    ]);
    const actualDuration = Number((await probe(dest)).format.duration),
      start = scene.start + 0.25;
    if (start + actualDuration > scene.end - 0.05)
      throw new Error(`Chevauchement audio dans la scène ${i + 1}`);
    if (alignment) {
      const normalise = (text) =>
        text
          .normalize("NFD")
          .replace(/\p{M}/gu, "")
          .toLowerCase()
          .replaceAll("’", "'")
          .replaceAll("…", "...");
      const characterMap = [];
      const text = alignment.characters
        .map((character, index) => {
          const normalized = normalise(character);
          for (let n = 0; n < normalized.length; n++) characterMap.push(index);
          return normalized;
        })
        .join("");
      const alignedTime = (index, end = false) =>
        start +
        Math.max(
          0,
          (end
            ? alignment.character_end_times_seconds[index]
            : alignment.character_start_times_seconds[index]) - trimStart,
        ) /
          speed;
      let wordStart = -1;
      for (let n = 0; n <= alignment.characters.length; n++) {
        const character = alignment.characters[n] ?? " ";
        if (!/\s/.test(character) && wordStart < 0) wordStart = n;
        if (/\s/.test(character) && wordStart >= 0) {
          words.push({
            scene: i,
            text: alignment.characters.slice(wordStart, n).join(""),
            start: alignedTime(wordStart),
            end: Math.min(start + actualDuration, alignedTime(n - 1, true)),
          });
          wordStart = -1;
        }
      }
      let from = 0;
      for (const caption of scene.captions) {
        const needle = normalise(caption),
          index = text.indexOf(needle, from);
        if (index < 0)
          throw new Error(
            `Sous-titre absent de l’alignement ElevenLabs : scène ${i + 1}.`,
          );
        const endIndex = index + needle.length - 1;
        const cueStart =
          start +
          Math.max(
            0,
            alignment.character_start_times_seconds[characterMap[index]] -
              trimStart,
          ) /
            speed;
        const cueEnd = Math.min(
          start + actualDuration,
          start +
            Math.max(
              0,
              alignment.character_end_times_seconds[characterMap[endIndex]] -
                trimStart,
            ) /
              speed,
        );
        if (
          !Number.isFinite(cueStart) ||
          !Number.isFinite(cueEnd) ||
          cueEnd <= cueStart
        )
          throw new Error("Synchronisation ElevenLabs invalide.");
        cues.push({ scene: i, start: cueStart, end: cueEnd, text: caption });
        from = endIndex + 1;
      }
    } else {
      const totalWeight = scene.captions.reduce(
        (sum, caption) => sum + caption.length,
        0,
      );
      let cursor = start;
      for (const caption of scene.captions) {
        const end = cursor + (actualDuration * caption.length) / totalWeight;
        cues.push({ scene: i, start: cursor, end, text: caption });
        cursor = end;
      }
    }
    voiceReport.push({
      scene: i + 1,
      voice: voiceName,
      sourceDuration: duration,
      trimStart,
      trimEnd,
      speed,
      duration: actualDuration,
      startsAt: start,
      endsAt: start + actualDuration,
    });
    console.log(`Voix ${i + 1}/8 : ${actualDuration.toFixed(2)} s.`);
  }
  const bed = join(audioDir, "fond-sonore-original.wav");
  await writeFile(bed, originalBed());
  const inputs = story.scenes
    .flatMap((_, i) => ["-i", join(audioDir, `scene-${i + 1}.wav`)])
    .concat(["-i", bed]);
  const filters = story.scenes.map(
    (scene, i) =>
      `[${i}:a]adelay=${Math.round((scene.start + 0.25) * 1000)}|${Math.round((scene.start + 0.25) * 1000)}[v${i}]`,
  );
  filters.push(`[8:a]volume=0.22[bed]`);
  const soundLabels = [];
  if (elevenlabs && !draftWithoutEffects) {
    const design = JSON.parse(
      await readFile(join(root, "sound-design.json"), "utf8"),
    );
    for (const effect of design.effects) {
      const { id, ...description } = effect;
      const fingerprint = createHash("sha256")
        .update(
          JSON.stringify({
            ...description,
            model_id: design.model_id,
            loop: false,
          }),
        )
        .digest("hex");
      const cached = JSON.parse(
        await readFile(join(audioDir, "effects", `${id}.json`), "utf8"),
      );
      if (cached.fingerprint !== fingerprint)
        throw new Error(`Effet ${id} périmé. Régénérer les effets ElevenLabs.`);
    }
    design.events.forEach((event, index) => {
      const inputIndex = 9 + index,
        label = `effect${index}`;
      const matchedWord =
        event.word &&
        words.find(
          (word) =>
            word.scene === event.scene &&
            word.text.toLowerCase().startsWith(event.word.toLowerCase()),
        );
      const at = matchedWord ? Math.max(0, matchedWord.start - 0.12) : event.at;
      if (
        !Number.isFinite(at) ||
        at < 0 ||
        at >= story.duration ||
        !design.effects.some((effect) => effect.id === event.effect)
      )
        throw new Error("Placement sonore invalide.");
      inputs.push("-i", join(audioDir, "effects", `${event.effect}.mp3`));
      filters.push(
        `[${inputIndex}:a]aresample=48000,loudnorm=I=-16:TP=-3:LRA=4,volume=${event.gainDb}dB,adelay=${Math.round(at * 1000)}|${Math.round(at * 1000)}[${label}]`,
      );
      soundLabels.push(`[${label}]`);
    });
    soundReport = {
      provider: design.provider,
      model: design.model_id,
      status: "complete",
      generatedEffects: design.effects.length,
      events: design.events.length,
    };
  }
  filters.push(
    `${story.scenes.map((_, i) => `[v${i}]`).join("")}[bed]${soundLabels.join("")}amix=inputs=${9 + soundLabels.length}:duration=longest:normalize=0,loudnorm=I=-16:TP=-1.5:LRA=9,atrim=duration=${story.duration}[mix]`,
  );
  await run(ffmpeg, [
    "-y",
    "-v",
    "error",
    ...inputs,
    "-filter_complex",
    filters.join(";"),
    "-map",
    "[mix]",
    "-ar",
    "48000",
    "-ac",
    "2",
    join(out, "seya-labs-bande-son.wav"),
  ]);
  await run(ffmpeg, [
    "-y",
    "-v",
    "error",
    "-i",
    join(out, "seya-labs-bande-son.wav"),
    "-c:a",
    "libmp3lame",
    "-b:a",
    "192k",
    join(out, "seya-labs-bande-son.mp3"),
  ]);
  await writeFile(
    join(out, "seya-labs.srt"),
    cues
      .map(
        (cue, i) =>
          `${i + 1}\n${stamp(cue.start)} --> ${stamp(cue.end)}\n${cue.text}\n`,
      )
      .join("\n"),
  );
  if (elevenlabs) {
    const narrationInputs = inputs.slice(0, story.scenes.length * 2);
    const narrationFilters = story.scenes.map(
      (scene, i) =>
        `[${i}:a]adelay=${Math.round((scene.start + 0.25) * 1000)}|${Math.round((scene.start + 0.25) * 1000)}[v${i}]`,
    );
    narrationFilters.push(
      `${story.scenes.map((_, i) => `[v${i}]`).join("")}amix=inputs=8:duration=longest:normalize=0,apad,loudnorm=I=-16:TP=-1.5:LRA=9,atrim=duration=${story.duration}[voice]`,
    );
    await run(ffmpeg, [
      "-y",
      "-v",
      "error",
      ...narrationInputs,
      "-filter_complex",
      narrationFilters.join(";"),
      "-map",
      "[voice]",
      "-ar",
      "48000",
      "-ac",
      "2",
      "-c:a",
      "libmp3lame",
      "-b:a",
      "192k",
      join(out, "seya-labs-voix-elevenlabs.mp3"),
    ]);
  }
  await writeFile(
    join(out, "narration-et-cues.json"),
    JSON.stringify({ voiceReport, cues, words, soundReport }, null, 2),
  );
} else {
  ({
    cues,
    voiceReport,
    words = [],
    soundReport,
  } = JSON.parse(await readFile(join(out, "narration-et-cues.json"), "utf8")));
}

const fonts = {};
if (
  reuseAudio &&
  elevenlabs &&
  soundReport?.status !== "complete" &&
  !draftWithoutEffects
)
  throw new Error(
    "Le mix est provisoire : générer les effets ElevenLabs et refaire le mix, ou demander explicitement --draft-without-effects.",
  );
await writeFile(
  join(out, "production-status.json"),
  JSON.stringify(
    {
      edition: story.edition,
      voice: voiceName,
      duration: story.duration,
      sound: soundReport,
      checkedAt: new Date().toISOString(),
    },
    null,
    2,
  ),
);
for (const [name, file] of [
  ["SeyaDisplay", "space-grotesk.woff2"],
  ["SeyaBody", "inter.woff2"],
  ["SeyaMono", "geist-mono.woff2"],
])
  fonts[name] = (await readFile(join(root, "../public/fonts", file))).toString(
    "base64",
  );
const mark = await readFile(
  join(root, "../public/brand/logo-mark.svg"),
  "utf8",
);
const logoPath = mark.match(/<path d="([^"]+)"/)[1];
await writeFile(
  join(root, "assets.js"),
  `window.SEYA_FILM_ASSETS = ${JSON.stringify({ storyboard: story, cues, words, fonts, logoPath, soundReport })};\n`,
);
if (modes === "audio") {
  console.log("Narration, bande-son, sous-titres et assets prêts.");
  process.exit(0);
}

const browser = await chromium.launch(
  process.platform === "darwin"
    ? {
        executablePath:
          process.env.CHROME_PATH ||
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      }
    : {},
);
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await context.newPage(),
  errors = [];
page.on("pageerror", (error) => errors.push(error.message));
try {
  await page.goto(
    `${pathToFileURL(join(root, "production.html")).href}?render=1`,
  );
  await page.waitForFunction(() => window.filmReady === true);
  for (const [name, width, height] of [
    ["horizontal", 1920, 1080],
    ["vertical", 1080, 1920],
  ]) {
    const format = name === "horizontal" ? "landscape" : "portrait";
    await page.setViewportSize({ width, height });
    for (const [index, time] of [
      2.7, 7.4, 13.3, 21, 29.7, 35.2, 39.3, 43.3,
    ].entries()) {
      await page.evaluate(
        ({ time, format }) => window.renderFrame(time, format),
        { time, format },
      );
      await page
        .locator("canvas")
        .screenshot({ path: join(out, `${name}-scene-${index + 1}.png`) });
    }
    await page.evaluate(({ format }) => window.renderFrame(43.3, format), {
      format,
    });
    await page
      .locator("canvas")
      .screenshot({ path: join(out, `couverture-${name}.png`) });
    if (modes === "stills") continue;
    console.log(
      `Export ${name} : ${width} × ${height}, ${story.fps} images/s.`,
    );
    const dest = join(out, `seya-labs-${name}.mp4`);
    const encoder = spawn(
      ffmpeg,
      [
        "-y",
        "-v",
        "warning",
        "-f",
        "image2pipe",
        "-vcodec",
        "mjpeg",
        "-framerate",
        String(story.fps),
        "-i",
        "pipe:0",
        "-i",
        join(out, "seya-labs-bande-son.wav"),
        "-map",
        "0:v",
        "-map",
        "1:a",
        "-c:v",
        "libx264",
        "-preset",
        "fast",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-c:a",
        "aac",
        "-b:a",
        "192k",
        "-ar",
        "48000",
        "-t",
        String(story.duration),
        "-movflags",
        "+faststart",
        "-metadata",
        "title=SEYA LABS — Des outils sur mesure. Un budget à votre mesure.",
        "-metadata:s:a:0",
        "language=fra",
        dest,
      ],
      { stdio: ["pipe", "ignore", "pipe"] },
    );
    let encoderErrors = "";
    encoder.stderr.on("data", (chunk) => {
      encoderErrors = `${encoderErrors}${chunk.toString()}`.slice(-6000);
    });
    const exited = once(encoder, "close");
    const frames = Math.round(story.duration * story.fps);
    for (let frame = 0; frame < frames; frame++) {
      const base64 = await page.evaluate(
        ({ seconds, format }) => {
          window.renderFrame(seconds, format);
          return document
            .querySelector("canvas")
            .toDataURL("image/jpeg", 0.96)
            .split(",")[1];
        },
        { seconds: frame / story.fps, format },
      );
      if (!encoder.stdin.write(Buffer.from(base64, "base64")))
        await once(encoder.stdin, "drain");
      if ((frame + 1) % 450 === 0)
        console.log(`${name} : ${Math.round(((frame + 1) / frames) * 100)} %`);
    }
    encoder.stdin.end();
    const [code] = await exited;
    if (code !== 0) throw new Error(`Export échoué : ${encoderErrors}`);
    const info = await probe(dest),
      video = info.streams.find((stream) => stream.codec_type === "video"),
      audio = info.streams.find((stream) => stream.codec_type === "audio");
    if (
      video.width !== width ||
      video.height !== height ||
      video.codec_name !== "h264" ||
      video.r_frame_rate !== "30/1" ||
      audio.codec_name !== "aac" ||
      Math.abs(Number(info.format.duration) - story.duration) > 0.1
    )
      throw new Error(`L’export ${name} ne respecte pas le format attendu.`);
    const file = await stat(dest);
    console.log(
      `MP4 ${name} terminé : ${(file.size / 1024 / 1024).toFixed(1)} Mo.`,
    );
  }
  if (errors.length)
    throw new Error(`Erreurs navigateur : ${errors.join("; ")}`);
  await writeFile(
    join(out, "verification.json"),
    JSON.stringify(
      {
        duration: story.duration,
        fps: story.fps,
        mode: modes,
        voice: voiceName,
        voiceReport,
        soundReport,
        pageErrors: errors,
        checkedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
