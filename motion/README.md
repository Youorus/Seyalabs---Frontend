# Seya Labs — film commercial V2

Production du 12 octobre 2026 : **45 secondes**, formats horizontal 1920 × 1080 et vertical 1080 × 1920, 30 images/s, H.264/AAC, voix française ElevenLabs et sous-titres incrustés. Le film présente plusieurs besoins métiers. Le fleuriste était un exemple de compréhension, pas le thème retenu.

Promesse : **Des outils sur mesure. Un budget à votre mesure.** Aucun prix, client, gain chiffré ou témoignage n’est inventé.

## État de la livraison

Les MP4 actuels sont des **versions de travail V2**. La nouvelle animation et la voix sont exportées. L’API ElevenLabs a répondu `401 missing_permissions` pour Sound Generation : les six effets sonores prévus ne sont donc pas encore présents. Les fichiers contiennent la narration et un fond original discret. Ils ne doivent pas être présentés comme un mix ElevenLabs complet.

`output/production-status.json` conserve cet état de manière explicite. Le renderer refuse le mode complet si les caches d’effets sont absents ou périmés. `--draft-without-effects` est nécessaire pour reproduire la version de travail. Après activation de la permission de clé, les commandes ci-dessous terminent le mix et réexportent les deux films.

## Direction artistique

La référence corrigée est le film Create.xyz de Martial Ditorga, fourni localement par le propriétaire. `analyse-reference.md` décrit son découpage, les principes observés et les limites de l’analyse ; `reference-analysis.json` consigne le décodage des 1 096 images et leur comparaison. Le lecteur privé `output/analyse-reference.html` permet le parcours image par image, mais reste **hors Git, du ZIP et du site public**. Aucun extrait de cette référence n’est utilisé dans la production Seya Labs.

La V2 utilise des phrases cinétiques, du flou temporaire, des interfaces en perspective, des ruptures de composition et des changements de mots synchronisés à la narration. Le logo et les textes sont rendus précisément en Canvas, sans modèle vidéo génératif. Palette obsidienne/cuivre/porcelaine, typographies locales du site, interfaces marquées « Exemple illustratif ».

Voix : **François Louis**, modèle `eleven_multilingual_v2`. Réglages publics dans `voice-elevenlabs.json` : diction grave, chaleureuse et assurée, sans imitation de la voix de référence. Les timestamps de caractères déterminent les sous-titres et les mots de la séquence services. Seuls les silences de bord sont retirés ; le tempo conserve la hauteur. Les ajustements finaux de cette version vont de 1 à environ 1,057, hors vitesse 1,08 de la synthèse.

`sound-design.json` prépare six créations originales sur `eleven_text_to_sound_v2` : souffle, impact grave, clic, saisie, confirmation et scintillement, répartis sur 27 événements. Les changements de services utilisent les timestamps des mots. Aucun effet d’un autre fournisseur n’est substitué aux effets ElevenLabs manquants.

## Livrables

- `output/seya-labs-horizontal.mp4` et `output/seya-labs-vertical.mp4` : films sous-titrés.
- `output/seya-labs-voix-elevenlabs.mp3` : narration seule, calée sur 45 secondes.
- `output/seya-labs-bande-son.mp3` : mix actuel ; `output/seya-labs.srt` : sous-titres séparés.
- `output/narration-et-cues.json` : durées, trims, tempo, sous-titres, mots et état du son.
- Couvertures, deux planches de storyboard et `output/production-status.json`.
- `output/kit-motion-seya-labs.zip` : exports, sources, caches de voix, logo, fonts et licences, permettant une reprise sans resynthétiser les voix inchangées.
- `prompt-motion-seya-labs.md` : brief réutilisable dans une autre IA.

Le dossier motion est exclu de l’image Docker du site. Aucun lecteur vidéo n’est ajouté au chargement de l’accueil et aucun film n’est publié sur un réseau social.

## Aperçu et rendu

Prérequis : Node, dépendances du projet, Chrome sur macOS ou Chromium Playwright, FFmpeg/FFprobe. Le ZIP contient son propre `package.json` ; installer ses dépendances pour modifier/rendre, pas pour lire les MP4.

```sh
node motion/preview.mjs
# Ouvrir http://localhost:3210

# Reproduire les MP4 de travail avec la bande-son déjà livrée : aucun crédit API.
node motion/render-film.mjs --elevenlabs --draft-without-effects --video-only

# Refaire le mix de travail avec les caches de voix existants.
node motion/render-film.mjs --elevenlabs --draft-without-effects --audio-only

# Contrôler les compositions sans encoder les vidéos.
node motion/render-film.mjs --elevenlabs --draft-without-effects --stills
```

Pour terminer le sound design après activation de **Sound Generation / Sound Effects** sur la clé ElevenLabs :

```sh
# ELEVENLABS_API_KEY doit être configurée hors Git.
node motion/generate-sound-effects.mjs
node motion/render-film.mjs --elevenlabs
node scripts/audit-motion.mjs
```

Pour modifier la narration : changer `storyboard.json`, puis lancer `node motion/generate-elevenlabs.mjs` avant le mix. Les générateurs acceptent aussi `--key-file` vers un fichier privé hors dépôt. Les caches utilisent une empreinte du payload ; une modification de voix, texte ou contexte invalide le segment concerné. `--force` consomme explicitement de nouveaux crédits. Aucun nouvel essai payant automatique n’est effectué après une erreur API. **Aucune clé n’est versionnée, embarquée dans le navigateur ou livrée dans le ZIP.**

Les compositions sont dans `film.js`, l’aperçu dans `production.html`. Ne pas utiliser le fallback macOS Thomas par inadvertance : les commandes sans `--elevenlabs` remplacent la narration. Variables d’outils : `CHROME_PATH`, `FFMPEG_PATH`, `FFPROBE_PATH`, `SEYA_MOTION_PORT`.

## Contrôles

Les exports sont sondés pour vérifier codec, dimensions, cadence et durée. Le contrôle de lecture examine les deux MP4 et les aperçus à 375 et 1440 px, l’audio et Axe WCAG AA. Les deux vidéos sont décodées intégralement ; le mix vise −16 LUFS et −1,5 dBTP. Rapports locaux : `output/verification.json`, `output/verification-apercu.json`, `output/verification-elevenlabs.json`. Ces contrôles techniques ne remplacent pas une appréciation humaine de la diction et du mix final.

Les WAV, caches techniques, captures, lecteur privé de référence et assets embarqués restent ignorés. Le ZIP conserve les caches nécessaires à la reprise, sans la vidéo de référence. Une fois les effets ajoutés, refaire les mesures, les planches et le ZIP avant de marquer la production complète.

Reconditionner le kit avec `python3 motion/package-kit.py` (Python 3 standard). Le script utilise une liste explicite de fichiers, contrôle l’absence de clé, puis vérifie les empreintes SHA-256 et l’intégrité du ZIP.

Documentation : [synthèse avec timestamps](https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps), [effets sonores](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert).
