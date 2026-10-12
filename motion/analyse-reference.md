# Analyse de la référence Create.xyz

Référence corrigée et retenue le 12 octobre 2026 : [film de Martial Ditorga](https://www.tiktok.com/@martial_ditorga/video/7686905362720607508). Le profil Humain Penseur a été écarté après correction du propriétaire. Le MP4 fourni localement est la source de cette analyse.

## Méthode et limites

Le fichier contient **1 096 images vidéo à 30 images/s**, en 1024 × 576. Sa durée totale est 36,548 s ; la dernière image vidéo commence vers 36,500 s. Toutes les images ont été décodées et comparées par différence de luminance. Les 73 vues à intervalles de 0,5 s et les images de transition ont servi à l’examen visuel. `reference-analysis.json` conserve la méthode, le nombre d’images et les principaux changements détectés. Une différence importante peut être un changement de plan, un écran blanc ou un effet ; ce n’est pas automatiquement une coupe de montage.

Le lecteur local `output/analyse-reference.html` permet de parcourir les images une par une, avec un index, une position temporelle et les raccourcis clavier. Il embarque la référence fournie pour fonctionner hors ligne. **Il reste hors Git, du ZIP de livraison et du site public.** Aucun pixel, logo, personnage, fond, extrait de voix ou morceau de cette référence n’est incorporé au film Seya Labs.

La piste source est un mix AAC stéréo, pas une livraison de pistes séparées. Le fournisseur de voix, de musique et d’effets ne peut pas être établi à partir de ce fichier. Les effets décrits plus bas sont une proposition originale de production Seya Labs, pas une attribution à ElevenLabs des sons du créateur.

## Découpage visuel

Les bornes indiquent des groupes de compositions ; les éléments d’un même groupe peuvent entrer ou sortir avant la borne suivante. Les numéros d’image sont comptés à partir de zéro et les temps sont arrondis.

| Temps / images | Ce qui apparaît | Mouvement et rôle |
| --- | --- | --- |
| 0–1,53 s / 0–45 | Phrase d’accroche sur un dégradé sombre et bleu | Arrivée douce du texte centré ; presque tout l’espace reste vide. |
| 1,53–3,33 s / 46–99 | Mots remplacés, code autour du texte | Changement d’échelle et flou ; un mot accentué fait avancer le problème. |
| 3,33–5,70 s / 100–170 | Téléphone avec notes puis texte à droite | Le téléphone arrive avec un mouvement amorti et reste légèrement incliné. L’idée devient un objet familier. |
| 5,70–7,93 s / 171–237 | Symbole puis nom de marque | Changement franc de fond ; révélation progressive de la marque, sans détour. |
| 7,93–11,23 s / 238–336 | Promesse, puis mots web et mobile | Texte remplacé au même ancrage ; une trame de points apporte de la profondeur. |
| 11,23–13,63 s / 337–408 | Décor clair, champ de saisie et curseur | Rupture de luminosité ; saisie puis clic visibles, avec une action très courte. |
| 13,63–14,60 s / 409–437 | Fenêtre de produit | Zoom et contour lumineux ; l’interface devient la démonstration. |
| 14,60–16,87 s / 438–505 | Code puis phrase de connexion | L’objet change rapidement ; la phrase prépare le plan suivant. |
| 16,87–18,80 s / 506–563 | Rangées de badges défilants | Répétition horizontale et fond de couleur ; sensation de possibilités nombreuses. |
| 18,80–21 s / 564–629 | Deux phrases rassurantes | Retour au texte seul, très court ; le rythme respire. |
| 21–23,73 s / 630–711 | Pastille qui change de texte, curseur et clic | Transformation d’un même objet ; la validation matérialise le bénéfice. |
| 23,73–25,97 s / 712–778 | Connexion d’un service de paiement | Mot puis badge, avec une deuxième ligne ajoutée. |
| 25,97–28,17 s / 779–844 | Personne avec téléphone et notification superposée | Rupture par un plan filmé ; l’usage produit une conséquence concrète. |
| 28,17–31 s / 845–929 | Preuve chiffrée puis invitation | Texte sobre, nombre animé et nouvelle phrase. Ne pas reprendre cette preuve chez Seya Labs. |
| 31–34,5 s / 930–1034 | Variations autour du domaine | Substitution de mots au même endroit ; mémorisation de la destination. |
| 34,5–36,53 s / 1035–1095 | Logo final | Le mouvement se calme et laisse une marque lisible. |

## Ce qui produit cet effet

La composition montre généralement **une idée principale à la fois**. Les phrases sont courtes, les marges larges et les formes simples. L’œil n’a pas à lire une liste pendant qu’une autre liste est racontée. La taille du texte varie, mais sa position reste souvent stable : c’est le remplacement des mots qui apporte le rythme.

Le mouvement accélère vite puis s’amortit. Les entrées associent déplacement, léger changement d’échelle et flou temporaire ; les éléments s’arrêtent pour être lus. Les ruptures de luminosité, les objets en perspective et les contours lumineux évitent une succession de cartons identiques. La perspective sert un objet concret, elle ne transforme pas le film en démonstration de personnages 3D.

La structure commerciale suit : problème reconnaissable → marque → démonstration → simplification → bénéfice → preuve → destination. Pour Seya Labs, la preuve non disponible est remplacée par une promesse fournie par le propriétaire : **tarifs accessibles et budget défini avec le client**. Aucun prix, remise, nombre de clients ni gain de temps chiffré n’est inventé.

## Adaptation Seya Labs V2

- **0–4 s** : activité qui grandit et outils qui freinent ; deux messages typographiques successifs.
- **4–9 s** : téléphone avec commandes, factures, planning et relances dispersés.
- **9–15 s** : vraie marque Seya Labs, puis application métier en fenêtre et téléphone.
- **15–23 s** : une demande, un suivi mis à jour, un client informé ; puis assistant qui retrouve une information.
- **23–31 s** : applications, données/API, automatisation, intelligence artificielle et formations. Le remplacement des mots suit les timestamps de la narration.
- **31–37 s** : « Des tarifs accessibles. » devient le message principal, puis budget construit autour du besoin.
- **37–40 s** : bénéfice simple et bref.
- **40–45 s** : logo, promesse « Des outils sur mesure. Un budget à votre mesure. », appel à l’action et seyalabs.com.

La palette conserve obsidienne, cuivre et porcelaine. Les sources utilisent Canvas, une projection en perspective, des textures d’interface et une animation déterministe à 30 images/s. Cela permet de régler précisément les mots, les timings et le logo ; aucun modèle vidéo génératif ne doit réinventer ces éléments d’une image à l’autre.

La nouvelle voix est **François Louis**, française, grave et chaleureuse, sur `eleven_multilingual_v2`. Les réglages publics sont dans `voice-elevenlabs.json`. Le choix privilégie une narration stable et intelligible. Les silences de début/fin sont ajustés avec les timestamps ; les accélérations finales restent faibles et figurent dans le rapport, sans modifier la hauteur de la voix.

Le sound design prévu comprend six créations ElevenLabs originales : souffle de transition, impact grave retenu, clic, saisie, confirmation et scintillement. `sound-design.json` décrit les prompts, niveaux et placements. Les effets accompagnent une action visible ; la voix garde la priorité. **Le 12 octobre, l’API a renvoyé `401 missing_permissions` pour Sound Generation.** La narration fonctionne. Tant que cette permission manque, les exports V2 sont des versions de travail avec voix et fond original, sans prétendre contenir ces six effets. Le renderer refuse un export annoncé complet si les caches d’effets sont absents.

Sources techniques : [modèles de voix ElevenLabs](https://elevenlabs.io/docs/overview/models), [synthèse avec timestamps](https://elevenlabs.io/docs/api-reference/text-to-speech/convert-with-timestamps), [génération d’effets sonores](https://elevenlabs.io/docs/api-reference/text-to-sound-effects/convert).
