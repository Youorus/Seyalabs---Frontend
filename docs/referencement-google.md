# Référencement Google — SEYA LABS

État du 15 octobre 2026. Objectifs : identifier clairement SEYA LABS sur les recherches de marque et développer la visibilité sur le logiciel sur mesure, l’IA, l’automatisation et les intégrations de données. L’affichage du résultat, les liens de site et les positions sont décidés par Google.

## Ce qui a été vérifié sur le site public

Audit HTTP sans JavaScript des **39 URL du sitemap** de `https://seyalabs.com` :

- L’accueil est accessible, indexable et relié à la bonne canonical. Le sitemap et `robots.txt` sont disponibles.
- Les pages du sitemap ont des titres et descriptions distincts, une H1, des identités Organization/WebSite et des liens internes. Aucun contenu du sitemap n’est orphelin dans cet audit.
- **`/contact` renvoie `noindex, follow`**, pour le robot d’audit, Googlebot et un navigateur ordinaire. Cette directive empêche son indexation tant qu’elle est présente.
- **`www.seyalabs.com` renvoie le même contenu avec HTTP 200**, sans redirection vers l’adresse canonique. La canonical est déjà correcte ; la redirection permanente rend le choix de domaine cohérent.
- Le propriétaire a confirmé le 15 octobre que la propriété Search Console est déjà validée. Les rapports n’ont pas été consultés dans cette session : le navigateur disponible n’est pas connecté au compte Google.

Rapport local : `test-results/seo-production-2026-10-15.json`. Ce relevé décrit le site public avant déploiement des corrections ci-dessous, pas les positions dans Google.

## Corrections préparées dans le code

1. **Indexation cohérente à la construction et à l’exécution.** Les pages statiques lisaient `SITE_INDEXABLE=true` au build, tandis que Contact est rendu à la demande. Le Dockerfile transmet désormais cet argument à l’environnement de l’image finale ; Compose définit également `SITE_INDEXABLE: "true"` pour le domaine public. Les previews gardent leur valeur `false`.
2. **Domaine canonique.** Une redirection Next.js 308 de `www.seyalabs.com` vers `https://seyalabs.com` conserve le chemin et les paramètres. Les requêtes sur localhost ne sont pas redirigées sans le Host `www.seyalabs.com`.
3. **Identité de marque.** Le titre de l’accueil commence par SEYA LABS. Les identités WebSite et Organization partagent le nom et ses variantes, avec un logo carré existant de 180 × 180, le contact réel et les domaines d’expertise. Les profils sociaux sont uniquement ceux configurés par le propriétaire.
4. **Titres et navigation.** Les H1 des quatre expertises indiquent directement la prestation ; les pages Expertises, Formations et Insights sont plus explicites. Le pied de page relie les quatre expertises avec des libellés descriptifs.
5. **Contenu utile sur les API.** Le guide `/insights/integration-api-crm-erp` explique les sources de référence, les identifiants, le choix du flux, les doublons et la recette. Ses exemples sont illustratifs. Il est relié aux offres API et data, à l’automatisation et aux formations. Le sitemap passe automatiquement à **40 pages** après déploiement.

Ces changements complètent les pages commerciales et les sept guides déjà présents. Ils ne remplacent pas les preuves de projets réels, la notoriété du domaine et les observations Search Console.

## Vérifier la version à publier

```sh
SITE_INDEXABLE=true npm run build
SITE_INDEXABLE=true npm start -- --port 3101
python3 scripts/audit-search.py --url http://localhost:3101 --output test-results/seo-release-2026-10-15.json
```

Le contrôle lit le HTML de toutes les URL du sitemap, les directives d’indexation, les canonicals, l’unicité des métadonnées, les H1, les fils d’Ariane, les identités, les ressources de marque et les liens entrants. Il vérifie aussi la redirection www sur un chemin avec paramètres. Aucun formulaire n’est envoyé.

La CI exécute également cet audit sur son build non indexable et conserve le rapport avec les autres contrôles du site.

Pour une preview non indexable :

```sh
python3 scripts/audit-search.py --url http://localhost:3100 --preview --output test-results/seo-preview-2026-10-15.json
```

Après déploiement :

```sh
python3 scripts/audit-search.py --url https://seyalabs.com --output test-results/seo-production-apres-deploiement.json
```

Le rapport doit alors confirmer l’indexabilité de Contact et la redirection permanente www. Les pages légales incomplètes et les réalisations non publiées restent exclues du sitemap et de l’indexation.

## Terminer dans Search Console

1. Ouvrir la propriété **déjà validée de `seyalabs.com`** dans le compte Google propriétaire. Vérifier que la propriété sélectionnée couvre bien les URL HTTPS du site. La validation existante est conservée ; aucune modification DNS ou ajout d’utilisateur n’a été effectué par cette session.
2. Après déploiement, inspecter l’accueil, Contact et les quatre expertises avec le test d’URL en direct : réponse accessible, indexation autorisée, canonical cohérente. Examiner séparément l’état enregistré dans l’index Google.
3. Soumettre `https://seyalabs.com/sitemap.xml`, puis demander l’indexation des pages principales lorsque le test en direct est correct. Leur découverte et leur traitement peuvent prendre du temps.
4. Suivre les requêtes contenant « seya » pour la marque, puis les requêtes hors marque et les pages d’entrée par expertise. Comparer impressions, clics et demandes qualifiées au fil des données disponibles. Ne pas déduire un classement général d’une seule recherche personnalisée.
5. Publier progressivement des cas réels autorisés et relier les profils officiels de l’entreprise. Choisir les prochains contenus à partir des questions des prospects et des requêtes réellement observées.

Pour l’affichage illustré par la capture Amazon, Google recommande une structure logique, des titres clairs et des liens internes descriptifs. Les liens de site sont automatiques ; le code ne permet pas de choisir leurs libellés ni d’imposer leur affichage.

## Références officielles

- [Google : liens de site](https://developers.google.com/search/docs/appearance/sitelinks)
- [Google : nom du site](https://developers.google.com/search/docs/appearance/site-names)
- [Google : données structurées Organization](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google : consolidation des URL en double](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google : commencer avec Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)
