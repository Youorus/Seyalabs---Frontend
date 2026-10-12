# Prompt de production — publicité motion design Seya Labs

Tu es directeur artistique, motion designer, concepteur-rédacteur et sound designer. Produis un film publicitaire **original de 45 secondes**, en français, pour Seya Labs. Fournis une vraie vidéo exportée avec son, ainsi que les sources éditables. Si un outil manque, distingue précisément les éléments réalisés et ceux qui restent à produire.

## Marque et objectif commercial

Seya Labs crée des logiciels et applications métier sur mesure, des applications web et mobiles, des intégrations de données/API, des automatisations et des outils d’intelligence artificielle. L’agence forme aussi les équipes dans ces domaines. Site : **seyalabs.com**. Contact : **contact@seyalabs.com**.

Le film doit parler aux commerçants, artisans, indépendants et entreprises sans connaissance informatique. Utilise des situations familières : retrouver une commande, suivre un client, organiser un planning, éviter une ressaisie, retrouver une information. Le fleuriste n’est qu’un exemple de public : **ne centre pas le film sur ce métier**.

Différenciation fournie par le propriétaire : **des tarifs accessibles, un projet adapté au besoin et au budget**. Donne à cette idée une place forte avant la conclusion. Promesse finale exacte : **« Des outils sur mesure. Un budget à votre mesure. »** Ne crée aucun prix, remise, résultat chiffré, classement concurrentiel, client ou témoignage. Le film doit donner envie de parler de son projet, sans jargon ni catalogue technique.

## Référence et langage visuel

Si la référence Create.xyz de Martial Ditorga est fournie, analyse-la avant de produire : compositions, échelle, vitesse, pauses, courbes d’animation, flou, transformations, perspective, rapport voix/image et transitions. Le dossier existant contient `analyse-reference.md` et `reference-analysis.json`. Si tu n’as pas accès à la vidéo, ne prétends pas l’avoir visionnée.

Retenir ces principes : une idée dominante à l’écran, phrases très courtes, mots remplacés au même ancrage, mouvement vif puis amorti, flou limité aux transitions, objets familiers en perspective, démonstrations d’interface brèves, alternance de compositions et conclusion calme. Créer une direction propre à Seya Labs ; ne reprendre aucun pixel, son, logo, personne ni preuve de la référence.

Palette : obsidienne #11100E, porcelaine #F3F0E8, cuivre #D65A31, accent clair #FFA27B. Space Grotesk pour les titres, Inter pour le texte, Geist Mono avec retenue. Utiliser le **vrai logo fourni**. Textes nets, marges généreuses, sous-titres contrastés. Adapter la mise en page du vertical ; ne pas recadrer simplement l’horizontal. Les interfaces de démonstration portent la mention discrète « Exemple illustratif ».

Évite les diapositives immobiles, les longues listes, les compteurs décoratifs, les personnages 3D sans utilité et les transitions uniformes. Le modèle vidéo génératif ne doit pas réinventer le logo ou les textes : privilégie un rendu déterministe pour ces éléments.

## Déroulé et voix

Respecte les huit séquences ; les phrases entre guillemets constituent la narration :

1. **0–4 s** — Accroche typographique : « Votre activité grandit. Vos outils vous freinent ? »
2. **4–9 s** — Téléphone incliné, informations dispersées : « Commandes, planning, factures… Tout est éparpillé. »
3. **9–15 s** — Révélation de marque, application métier : « Avec Seya Labs, tout se retrouve dans une application pensée pour votre métier. »
4. **15–23 s** — Demande → suivi → client, puis assistant : « Automatisez vos tâches. Connectez vos logiciels. Retrouvez l’essentiel avec l’intelligence artificielle. »
5. **23–31 s** — Mots qui se remplacent avec la voix : « Applications web et mobiles, données, automatisation, intelligence artificielle… Et formations pour vos équipes. »
6. **31–37 s** — Message tarifaire dominant : « Notre plus ? Des tarifs accessibles. Un projet pensé pour votre budget. »
7. **37–40 s** — Bénéfice : « Vos outils suivent. Vous avancez. »
8. **40–45 s** — Logo, promesse, CTA et domaine : « Seya Labs. Des outils sur mesure. Un budget à votre mesure. » Afficher « Parlons de votre projet. » et **seyalabs.com**.

## Voix et sound design ElevenLabs

Voix française grave, chaleureuse, claire et assurée ; énergie publicitaire retenue. Ne clone ni n’imite la personne de référence. Configuration actuelle : **François Louis**, voice ID `UBXZKOKbt62aLQHhc1Jm`, `eleven_multilingual_v2`, stability 0,45, similarity 0,78, style 0,2, speaker boost activé, speed 1,08. Lire `voice-elevenlabs.json` si le kit est fourni. Choisir un autre modèle seulement si cela améliore un résultat vérifiable.

Réutiliser les caches de narration valides. Synchroniser les sous-titres aux timestamps réels ; garder les pauses utiles et éviter une diction accélérée. Prononciation attendue : « Séya Labs ». Faire contrôler la diction par un auditeur avant publication.

Produire des **effets originaux ElevenLabs** : souffle court de transition, impact grave retenu pour les révélations, clic tactile, brève saisie, confirmation douce et scintillement final. Modèle prévu : `eleven_text_to_sound_v2`. Le fichier `sound-design.json` contient six prompts et 27 placements ; certains suivent les timestamps des mots. Aucun effet sur chaque syllabe : le son accompagne une action et laisse la voix intelligible. Mix final visé : −16 LUFS, plafond −1,5 dBTP, stéréo.

La clé est fournie uniquement par environnement sécurisé ou fichier privé hors dépôt. **Ne l’inscris jamais dans le prompt, les sources, le navigateur, les logs ou le ZIP.** L’API a précédemment refusé Sound Generation avec `401 missing_permissions` : demander l’activation de cette permission si elle manque. Ne pas présenter des effets absents ou provenant d’un autre fournisseur comme des sons ElevenLabs.

## Livrables et validation

- Deux MP4 de 45 s : **1920 × 1080** et **1080 × 1920**, 30 images/s, H.264/AAC, démarrage progressif HTTP, sous-titres incrustés.
- Voix seule, mix complet, SRT français, couvertures et planches des séquences.
- Storyboard, réglages publics, scripts, logo et polices avec licences, sources éditables et commandes reproductibles.
- Un ZIP sans secrets ni fichier de référence tiers, avec les caches audio autorisés pour éviter des dépenses inutiles.
- Un état de production explicite et un Markdown de reprise indiquant les limites et le point d’arrêt.

Vérifier les exports par décodage complet et lecture réelle, les dimensions, la durée, les niveaux sonores, le français, la synchronisation et la lisibilité mobile. Contrôler les images en transition et les collisions de texte. Une prévisualisation silencieuse doit déjà faire comprendre l’offre et la promesse. Ne publier sur aucune plateforme sans instruction du propriétaire.
