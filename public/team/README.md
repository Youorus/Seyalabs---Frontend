# Portraits réels de l’équipe

Ajouter ici les photos approuvées pour publication (idéalement WebP, cadrage vertical 4:5, environ 800 × 1000 px et moins de 200 Ko). Préférer un fond simple, une lumière cohérente et des photos actuelles. Retirer les métadonnées de localisation.

Renseigner `data/team.ts` : `teamHeroPhoto` contient le chemin local de la photo principale, son texte alternatif, une légende exacte et `approvedForPublication: true`. Préférer un cadrage horizontal 6:5 pour cette photo. `teamMembers` fournit facultativement les noms réels, rôles, descriptions et portraits ; les deux premiers portraits approuvés complètent la photo principale. Vérifier que le fichier existe et que la personne autorise cet usage. Un seul portrait convient si l’entreprise est portée par une personne.

Les photos apparaissent uniquement dans le hero de l’accueil. Sans photo principale approuvée, le visuel System Flow reste affiché. Elle n’affiche ni identité fictive, ni portrait généré présenté comme une personne réelle. Les visuels de stock / IA peuvent illustrer une ambiance dans une rubrique distincte en signalant leur nature ; ils ne servent pas de portrait d’équipe.

## Visuel actuellement livré

`collaboration-seya-illustration.webp` est une image d’ambiance générée, optimisée en WebP, utilisée uniquement dans le hero. Sa légende et son texte alternatif l’identifient comme illustration ; elle ne représente pas les personnes réelles de Seya Labs. `teamHeroPhoto.kind` vaut `illustration`. Pour une vraie photo, remplacer la source, les textes et définir `kind: "real"` après autorisation ; les portraits nominatifs s’affichent uniquement dans ce mode.
