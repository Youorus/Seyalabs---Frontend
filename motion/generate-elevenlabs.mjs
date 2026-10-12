import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const story = JSON.parse(await readFile(join(root, "storyboard.json"), "utf8"));
const config = JSON.parse(
  await readFile(join(root, "voice-elevenlabs.json"), "utf8"),
);
const output = join(root, "audio");
await mkdir(output, { recursive: true });
const keyIndex = process.argv.indexOf("--key-file");
const apiKey =
  process.env.ELEVENLABS_API_KEY ||
  (keyIndex >= 0
    ? (await readFile(process.argv[keyIndex + 1], "utf8")).trim()
    : "");
if (!apiKey)
  throw new Error(
    "Définir ELEVENLABS_API_KEY dans l’environnement ou fournir --key-file avec un fichier hors du dépôt.",
  );
if (!/^[a-zA-Z0-9]+$/.test(config.voice_id))
  throw new Error("Identifiant de voix invalide.");
const spoken = (text) =>
  text.replaceAll("Seya Labs", config.brand_pronunciation);
const force = process.argv.includes("--force");

for (let index = 0; index < story.scenes.length; index++) {
  const payload = {
    text: spoken(story.scenes[index].voice),
    model_id: config.model_id,
    voice_settings: config.voice_settings,
    ...(index > 0
      ? { previous_text: spoken(story.scenes[index - 1].voice) }
      : {}),
    ...(index + 1 < story.scenes.length
      ? { next_text: spoken(story.scenes[index + 1].voice) }
      : {}),
  };
  const fingerprint = createHash("sha256")
    .update(JSON.stringify({ voice: config.voice_id, payload }))
    .digest("hex");
  const audio = join(output, `scene-${index + 1}-elevenlabs.mp3`);
  const metadata = join(output, `scene-${index + 1}-elevenlabs.json`);
  if (!force) {
    try {
      const cached = JSON.parse(await readFile(metadata, "utf8"));
      if (
        cached.fingerprint === fingerprint &&
        (await readFile(audio)).length > 1000
      ) {
        console.log(
          `ElevenLabs ${index + 1}/${story.scenes.length} : cache valide, aucun crédit supplémentaire.`,
        );
        continue;
      }
    } catch {
      /* Missing cache needs synthesis. */
    }
  }
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${config.voice_id}/with-timestamps?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "error",
      signal: AbortSignal.timeout(90_000),
    },
  );
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const status =
      typeof error.detail?.status === "string"
        ? error.detail.status
        : "request_refused";
    // Never print request headers, the API key or the unfiltered remote response.
    throw new Error(
      `ElevenLabs HTTP ${response.status} (${status}), scène ${index + 1}. Aucun nouvel essai payant automatique.`,
    );
  }
  const result = await response.json();
  const alignment = result.normalized_alignment || result.alignment;
  if (
    !result.audio_base64 ||
    !alignment?.characters?.length ||
    alignment.characters.length !==
      alignment.character_start_times_seconds?.length ||
    alignment.characters.length !==
      alignment.character_end_times_seconds?.length
  ) {
    throw new Error(
      `Réponse audio / synchronisation incomplète pour la scène ${index + 1}.`,
    );
  }
  await writeFile(audio, Buffer.from(result.audio_base64, "base64"));
  await writeFile(
    metadata,
    JSON.stringify(
      {
        fingerprint,
        provider: config.provider,
        voice: config.voice_name,
        voiceId: config.voice_id,
        modelId: config.model_id,
        alignment,
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
  console.log(
    `ElevenLabs ${index + 1}/${story.scenes.length} : narration ${config.voice_name} générée avec synchronisation.`,
  );
}
console.log(
  "Narration prête. Lancer node motion/render-film.mjs --elevenlabs pour mixer et exporter.",
);
