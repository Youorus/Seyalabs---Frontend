import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(
  await readFile(join(root, "sound-design.json"), "utf8"),
);
const out = join(root, "audio", "effects");
await mkdir(out, { recursive: true });
const index = process.argv.indexOf("--key-file");
const key =
  process.env.ELEVENLABS_API_KEY ||
  (index >= 0 ? (await readFile(process.argv[index + 1], "utf8")).trim() : "");
if (!key)
  throw new Error("Configurer ELEVENLABS_API_KEY ou --key-file hors du dépôt.");
for (const effect of config.effects) {
  if (!/^[a-z-]+$/.test(effect.id))
    throw new Error("Identifiant d’effet invalide.");
  const { id, ...description } = effect;
  const payload = { ...description, model_id: config.model_id, loop: false };
  const fingerprint = createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex");
  const audio = join(out, `${id}.mp3`),
    metadata = join(out, `${id}.json`);
  if (!process.argv.includes("--force")) {
    try {
      if (
        JSON.parse(await readFile(metadata, "utf8")).fingerprint ===
          fingerprint &&
        (await readFile(audio)).length > 1000
      ) {
        console.log(`Effet ${id} : cache valide, aucun crédit supplémentaire.`);
        continue;
      }
    } catch {
      /* A missing cache needs generation. */
    }
  }
  const response = await fetch(
    "https://api.elevenlabs.io/v1/sound-generation?output_format=mp3_44100_128",
    {
      method: "POST",
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "error",
      signal: AbortSignal.timeout(90_000),
    },
  );
  if (!response.ok)
    throw new Error(
      `Effet ${id} : ElevenLabs HTTP ${response.status}. Aucun nouvel essai payant automatique.`,
    );
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 1000) throw new Error(`Effet ${id} : audio incomplet.`);
  await writeFile(audio, bytes);
  await writeFile(
    metadata,
    JSON.stringify(
      {
        provider: config.provider,
        model: config.model_id,
        fingerprint,
        generatedAt: new Date().toISOString(),
      },
      null,
      2,
    ),
  );
  console.log(`Effet ${id} généré par ElevenLabs.`);
}
