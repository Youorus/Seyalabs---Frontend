"""Package only approved production files; exclude credentials and the reference film."""
from pathlib import Path
import hashlib
import json
import re
import zipfile

root = Path(__file__).resolve().parent.parent
output = root / "motion/output"
files = {}


def include(relative, target=None):
    source = root / relative
    if not source.is_file():
        raise FileNotFoundError(relative)
    files[target or relative] = source.read_bytes()


include("motion/kit-package.json", "package.json")
include("motion/README.md", "README.md")
for name in [
    "README.md", "prompt-motion-seya-labs.md", "analyse-reference.md",
    "reference-analysis.json", "storyboard.json", "voice-elevenlabs.json",
    "sound-design.json", "film.js", "assets.js", "production.html",
    "render-film.mjs", "preview.mjs", "generate-elevenlabs.mjs",
    "generate-sound-effects.mjs", "package-kit.py", "kit-package.json",
]:
    include(f"motion/{name}")
for name in [
    "seya-labs-horizontal.mp4", "seya-labs-vertical.mp4",
    "seya-labs-bande-son.mp3", "seya-labs-voix-elevenlabs.mp3",
    "seya-labs.srt", "narration-et-cues.json", "production-status.json",
    "couverture-horizontal.png", "couverture-vertical.png",
    "storyboard-horizontal.png", "storyboard-vertical.png",
    "verification.json", "verification-apercu.json", "verification-elevenlabs.json",
]:
    include(f"motion/output/{name}")
for index in range(1, 9):
    for extension in ["mp3", "json"]:
        include(f"motion/audio/scene-{index}-elevenlabs.{extension}")
status = json.loads(files["motion/output/production-status.json"])
if status["sound"]["status"] == "complete":
    design = json.loads(files["motion/sound-design.json"])
    for effect in design["effects"]:
        for extension in ["mp3", "json"]:
            include(f"motion/audio/effects/{effect['id']}.{extension}")
for path in sorted((root / "public/fonts").iterdir()):
    if path.suffix in {".woff2", ".txt"}:
        include(str(path.relative_to(root)))
include("public/brand/logo-mark.svg")
include("scripts/audit-motion.mjs")
include("docs/reprise-ia.md")

# The standalone audit needs the same accessibility package as the main project.
package = json.loads(files["package.json"])
package["devDependencies"]["@axe-core/playwright"] = "4.13.0"
package["scripts"]["audit"] = "node scripts/audit-motion.mjs"
files["package.json"] = (json.dumps(package, indent=2) + "\n").encode()
for name, content in files.items():
    if Path(name).suffix in {".md", ".json", ".js", ".mjs", ".html", ".txt", ".py", ".svg"}:
        if re.search(rb"sk_[a-zA-Z0-9]{25,}", content):
            raise ValueError(f"Possible secret: {name}")
    if "analyse-reference.html" in name or "reference.mp4" in name or ".env" in name:
        raise ValueError(f"Private file: {name}")
manifest = {name: hashlib.sha256(content).hexdigest() for name, content in files.items()}
files["manifest-sha256.json"] = (json.dumps(manifest, indent=2) + "\n").encode()
destination = output / "kit-motion-seya-labs.zip"
with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
    for name, content in sorted(files.items()):
        archive.writestr(name, content)
with zipfile.ZipFile(destination) as archive:
    if archive.testzip() is not None:
        raise ValueError("ZIP integrity failure")
    for name, digest in manifest.items():
        assert hashlib.sha256(archive.read(name)).hexdigest() == digest, name
print(f"Kit: {len(files)} files, {destination.stat().st_size / 1024**2:.1f} MiB.")
print(f"Production status: {status['sound']['status']}.")
