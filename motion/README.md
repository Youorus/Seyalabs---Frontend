# SEYA LABS — Première production motion design

Film commercial général de 45 secondes. Le message relie les services à des situations comprises sans connaissance informatique, puis met en avant l’engagement de tarifs accessibles. Le fleuriste n’est pas le thème du film.

Promesse : **Des outils sur mesure. Un budget à votre mesure.**

## Livrables

- `output/seya-labs-horizontal.mp4` : 1920 × 1080, 30 images/s, 45 s, H.264/AAC, sous-titres incrustés.
- `output/seya-labs-vertical.mp4` : 1080 × 1920, même durée, composition adaptée au mobile.
- `output/seya-labs.srt` : sous-titres français séparés, synchronisés avec les segments de narration.
- `output/seya-labs-bande-son.wav` et `.mp3` : narration et accompagnement sonore.
- `output/couverture-horizontal.png`, `output/couverture-vertical.png` : images de couverture.
- `output/storyboard-horizontal.png`, `output/storyboard-vertical.png` : planches de contrôle des huit séquences.
- `prompt-motion-seya-labs.md` : prompt complet réutilisable dans une IA de création.
- `storyboard.json` : textes, scénario, timing, narration et indications visuelles.
- `film.js`, `production.html`, `render-film.mjs` : sources éditables de l’animation, aperçu et export.

La voix française est une synthèse locale macOS (`Thomas`, débit 180), avec de petits ajustements de durée sur deux séquences. L’accompagnement est une composition synthétique originale générée dans `render-film.mjs` ; il n’utilise aucun morceau, enregistrement ou vidéo stock externe. Les typographies et le logo proviennent du site Seya Labs ; les licences des polices restent dans `public/fonts`.

Les interfaces représentent des possibilités et portent une mention « Exemple illustratif ». Aucun client, résultat chiffré, remise, tarif numérique ou classement comparatif n’a été ajouté. Le positionnement « tarifs accessibles » vient du propriétaire ; les montants attendent une grille réelle.

## Lire l’aperçu

Depuis la racine du projet :

```sh
node motion/preview.mjs
```

Ouvrir `http://localhost:3210`. L’aperçu permet lecture, pause, recherche temporelle, changement de format, coupure du son et téléchargement. Aucune lecture sonore ne démarre automatiquement. Le serveur est limité à localhost et au dossier motion.

`production.html` peut également être ouvert localement une fois `assets.js` et la bande-son générés ; les fichiers restent ensemble dans le dossier motion. Aucune connexion à un fournisseur vidéo n’est nécessaire.

## Modifier et exporter

Modifier les phrases et timings dans `storyboard.json`, les compositions dans `film.js`. La narration dispose de 250 ms d’entrée et d’une marge de fin. Le générateur vérifie qu’aucune voix ne déborde sur la séquence suivante ; il refuse une accélération excessive. Les sous-titres sont reconstruits avec les durées audio obtenues.

Prérequis de cette production : Node et Playwright du projet, Google Chrome installé, FFmpeg/FFprobe et la commande macOS `say` avec une voix française. La synthèse vocale doit pouvoir accéder au service de voix local macOS. Pour un autre système, remplacer cette étape par ses enregistrements et conserver les mêmes durées.

```sh
# Refaire l’ensemble : narration, bande-son, sous-titres, images et deux MP4.
node motion/render-film.mjs

# Refaire uniquement la narration et les fichiers de synchronisation.
node motion/render-film.mjs --audio-only

# Vérifier les images des deux formats avant d’encoder.
node motion/render-film.mjs --stills

# Réexporter les vidéos avec l’audio déjà produit.
node motion/render-film.mjs --video-only
```

`SEYA_VOICE`, `SEYA_VOICE_RATE`, `CHROME_PATH`, `FFMPEG_PATH` et `FFPROBE_PATH` permettent d’adapter les outils installés. `SEYA_MOTION_PORT` change le port de l’aperçu.

## Vérifications

Les images de chaque séquence ont été rendues et contrôlées dans les deux formats. Les exports sont sondés automatiquement pour vérifier codec, dimensions, cadence, piste audio et durée. Le fichier `output/verification.json` consigne les durées réelles de narration et les éventuelles erreurs navigateur.

Les deux MP4 ont été décodés intégralement sans erreur et lus dans le navigateur : durée exacte de 45 s, H.264 à 30 images/s, audio AAC stéréo à 48 kHz. L’aperçu a été contrôlé à 375 et 1440 px dans les deux formats, avec lecture, pause, recherche temporelle, changement de format, coupure du son et téléchargement des sous-titres. Axe ne signale aucune anomalie automatique d’accessibilité ; le navigateur ne signale aucune erreur. Rapport : `output/verification-apercu.json`.

La bande-son WAV mesurée atteint −15,97 LUFS intégrés et un pic réel de −1,80 dBTP. Ces mesures vérifient le niveau sonore ; elles ne remplacent pas une appréciation de la diction par l’auditeur. La narration peut être remplacée en conservant les timings.

Le kit ZIP regroupe les vidéos, la bande-son, le prompt, le scénario, les couvertures, les sources, le logo et les polices avec leurs licences. Pour l’utiliser hors du dépôt, décompresser, installer les dépendances du `package.json` fourni puis lancer `npm run preview`. La lecture des MP4 et du HTML autonome n’exige aucune installation Node. Pour réexporter, les outils de rendu mentionnés plus haut restent nécessaires.

Les ressources vidéo, audio et les assets générés sont ignorés par Git. Les sources restent dans le projet ; les fichiers livrés restent dans le dossier `output`. Le site Next.js et ses pages de référencement ne sont pas modifiés par cette production. Aucun film n’a été publié sur un réseau social ou un hébergement externe.
