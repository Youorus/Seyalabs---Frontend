# SEYA LABS

Site B2B en français — Software × AI × Automation. Next.js 16.3.8, App Router, React, TypeScript strict, Tailwind CSS 4, Framer Motion, Lucide et Zod.

## Démarrer

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Le site est disponible sur http://localhost:3000. `npm run build` puis `npm start` lancent la version standalone optimisée ; le script de démarrage copie les ressources statiques dans le dossier standalone. `npm start -- --port 3100` change le port local. Node.js 22 est fixé dans `.nvmrc` et le Dockerfile. Le lockfile fixe les versions installées.

## Déployer avec Dokploy

Le [guide de déploiement](docs/deploiement-dokploy.md) détaille le Dockerfile multi-stage, le port 3000, les variables à la construction et à l’exécution, HTTPS, les réglages Google et les vérifications. L’image utilise un utilisateur non root et un healthcheck `/api/health`. Les secrets restent dans Dokploy. Le [document de reprise IA](docs/reprise-ia.md) décrit l’état du projet et les prochaines étapes.

## Architecture

- `app/` : routes, Metadata API, image Open Graph, sitemap, robots et endpoint de contact.
- `components/` : navigation et composants éditoriaux. Server Components par défaut.
- `components/sections/` : expertises, articles, CTA et deux îlots interactifs (System Flow, méthode).
- `components/ui/` : conteneur, labels, boutons, liens, marque et JSON-LD.
- `data/services.ts`, `data/additional-services.ts` : 4 expertises et 8 solutions, chacune avec intention commerciale, cas d’usage, livrables et FAQ propres. Les plateformes web/mobile et produits SaaS ont leurs pages dédiées.
- `data/articles.ts`, `data/software-guides.ts` : 7 articles originaux, dont 4 guides consacrés aux décisions d’achat logiciel. Schéma typé dans `data/article-types.ts`, remplaçable par un adaptateur CMS.
- `data/service-guidance.ts`, `data/additional-service-guidance.ts` : contenu de cadrage approfondi pour les 12 offres : décisions, dépendances, compromis, critères de recette et guides associés.
- `data/trainings.ts`, `data/training-programmes.ts` : 12 programmes regroupés en quatre domaines, avec objectifs, public, prérequis, modules et ateliers. Type partagé dans `data/training-types.ts`. Les modalités sont définies au cadrage.
- `public/ressources/` : modèle de cahier des charges modifiable, téléchargeable sans inscription.
- `docs/strategie-seo.md` : intentions par URL, observations concurrentes, priorités et mesure après publication.
- `data/projects.ts` : schéma des cas réels ; collection vide tant qu’aucun cas approuvé n’est fourni.
- `lib/` : SEO, configuration, analytics, formulaire et protection contre les abus.
- `styles/globals.css` : tokens centralisés et styles responsive.
- `public/brand/` : symbole SVG, versions obsidienne/porcelaine, wordmarks et icône Apple. Le PNG fourni reste dans le dossier racine. La vectorisation reprend ses deux formes sans changer leurs proportions.
- `public/fonts/` : Space Grotesk, Inter et Geist Mono auto-hébergées, chargées avec `next/font/local` ; licences incluses.

## Pages

Accueil, expertises et leurs 4 pages, solutions et leurs 8 pages, formations et leurs 12 programmes, méthode, à propos, réalisations, insights et leurs 7 articles, contact, mentions légales et confidentialité. Les slugs inconnus renvoient une 404. Les routes `/realisations/[slug]` sont préparées ; aucun client, témoignage ni résultat fictif n’est publié.

## SEO

Chaque page possède un titre, une description, une URL canonique, Open Graph et Twitter. Le HTML comporte une seule H1. Le site fournit les schémas Organization, WebSite, Service, BreadcrumbList, FAQPage, Article, Course et ItemList pour les contenus concernés. Le balisage FAQ ou Course ne promet aucun résultat enrichi Google.

Les liens relient articles, expertises et solutions. Le sitemap inclut les contenus publiés et exclut les réalisations vides et les pages légales. Les dates de modification ne sont déclarées que lorsqu’une date éditoriale existe. Les environnements sans `SITE_INDEXABLE=true` portent une directive `noindex` ; robots.txt laisse les ressources accessibles afin que cette directive puisse être lue.

La priorité commerciale est le logiciel métier. Chaque requête principale est associée à une URL dans [la stratégie SEO](docs/strategie-seo.md). Les guides se relient entre eux et aux offres, avec des liens de retour depuis les pages commerciales. `updatedAt` s’ajoute à un article uniquement lors d’une vraie modification. Les contenus sont lisibles sans JavaScript ; aucun volume de recherche, position, client ou tarif n’est inventé.

Pour une propriété Search Console de préfixe d’URL, renseigner le token dans `GOOGLE_SITE_VERIFICATION` puis reconstruire. Une propriété Domaine peut être validée par DNS sans ce champ. Cette préparation n’équivaut pas à une validation de propriété ni à une déclaration du sitemap ; ces actions se font dans le compte propriétaire après publication.

## Formations

L’onglet `/formations` présente quatre familles, chacune accessible par une ancre de navigation : logiciel, IA, automatisation et data/API. Quatre parcours de fondations sont complétés par huit programmes appliqués : application métier, web/mobile, SaaS, MVP, assistant documentaire/RAG, agents IA, workflows n8n et intégrations API. Chaque programme a sa page, ses objectifs, son public, ses prérequis, ses modules et un atelier distinct. Les programmes sont adaptables ; durée, calendrier, modalités et tarif sont définis dans une proposition après cadrage. Aucun financement, certification ou créneau daté n’est annoncé sans information vérifiée.

Les formations sont accessibles dans le menu desktop/mobile, le pied de page, l’accueil et chaque expertise ou solution correspondante. Un programme appliqué renvoie aussi vers la prestation de réalisation ; les formations voisines restent dans le même domaine. Les CTA ouvrent `/contact?type=formation&formation=SLUG`, avec le type Formation sélectionné et le programme repris dans le message. Les paramètres sont limités aux programmes connus ; la canonical reste `/contact`. La catégorie Formation est validée par le même schéma côté client et serveur et transmise dans `projectType`. Sans webhook, la demande est préparée dans un email explicite comme les autres contacts.

Référence : [Google — données structurées Course](https://developers.google.com/search/docs/appearance/structured-data/course). Le contenu étant en français, aucun carrousel de cours n’est promis ; la documentation consultée réserve cette présentation à l’anglais.

Références de conception : [Google Search Central](https://developers.google.com/search/docs/fundamentals/seo-starter-guide), [Next.js Metadata](https://nextjs.org/docs/app/getting-started/metadata-and-og-images). [Flowt](https://flowt.fr/) a été consulté pour la logique du parcours commercial ; identité et contenus SEYA LABS sont propres au projet.

## Contact

Le domaine et le contact par défaut sont `https://seyalabs.com` et `contact@seyalabs.com`.

Sans `CONTACT_WEBHOOK_URL`, le formulaire valide la demande et propose un lien email prérempli. L’utilisateur confirme l’envoi dans sa messagerie. Le site n’annonce pas une transmission qui n’a pas eu lieu.

Pour un envoi direct, configurez un webhook **HTTPS** (n8n, CRM ou service email) et, si nécessaire, `CONTACT_WEBHOOK_SECRET`. Le serveur transmet un JSON validé contenant `id`, `name`, `company`, `email`, `phone`, `projectType`, `budget`, `timeline`, `message`, `consent`, `source`, `receivedAt`. Le webhook doit confirmer la prise en charge par un statut 2xx et conserver la demande avant cet accusé de réception. La clé d’idempotence permet au récepteur de traiter les répétitions d’une même requête. Aucune donnée du formulaire n’est écrite dans les logs applicatifs.

Protections : validation Zod côté client et serveur, champ piège, durée minimale, origine autorisée, limite de 16 Ko, timeout du récepteur, absence de redirection du webhook et limite de 5 requêtes par fenêtre de 15 minutes. Les secrets restent côté serveur.

Le limiteur local suffit pour un déploiement à une instance. Pour plusieurs instances/serverless, configurez `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` et un `RATE_LIMIT_SECRET` commun. Le limiteur distribué conserve uniquement une empreinte HMAC temporaire. Activez `CONTACT_TRUST_PROXY=true` uniquement si le proxy d’hébergement supprime et remplace les en-têtes forwarded des visiteurs ; autrement, la limite est partagée par tous les envois de l’instance. Ne pas activer `CONTACT_ALLOW_LOCAL_PREVIEW` sur le déploiement public.

## Analytics et vie privée

Google Analytics 4 est intégré avec l’identifiant `G-K3MFCQHF4R`. Le tag est chargé uniquement après un consentement explicite à la mesure d’audience (Consent Mode basique). Au premier affichage et après un refus initial, aucun script ni appel Google n’est déclenché. Le bandeau propose Tout refuser / Tout accepter avec le même aspect, plus Personnaliser. Un bouton « Gérer les cookies » dans le pied de page rouvre les préférences.

Le choix versionné, horodaté et validé est stocké six mois calendaires dans `localStorage` (`seya-analytics-consent-v2`). Une valeur expirée, invalide, ancienne ou un stockage inaccessible ne permet pas de suivi. Le retrait pose immédiatement le drapeau Google `ga-disable-G-K3MFCQHF4R`, communique un état refusé au tag déjà chargé et supprime les cookies `_ga`, `_ga_*`, `_gid`, `_gat*` accessibles au domaine. Les changements sont synchronisés entre onglets. Une vérification à chaque événement, au retour sur l’onglet et toutes les 30 secondes empêche de conserver un accord expiré.

Les vues sont envoyées une fois par changement de chemin App Router, avec `send_page_view: false`. Les événements métiers sont `hero_cta_click`, `contact_started`, `contact_submitted`, `service_viewed`, `case_study_viewed`, `resource_downloaded`, `email_clicked`, `phone_clicked`. Seuls des noms connus sont transmis ; aucun champ de formulaire, destination de lien, query string ou fragment n’est ajouté à ces événements. Les cookies sont configurés pour 365 jours sans renouvellement automatique. Les consentements publicitaires, Google Signals et la personnalisation publicitaire restent désactivés. La politique de confidentialité décrit le fournisseur, les finalités, le stockage et le retrait.

**Réglages à vérifier dans le compte Google Analytics avant publication :** Administration → Flux de données → flux Web → Mesure améliorée : désactiver les mesures automatiques (y compris les vues basées sur l’historique, les clics sortants et les interactions de formulaires). Le site produit lui-même ses vues et événements : conserver ces mesures automatiques peut créer des doublons et collecter des destinations non prévues. Désactiver Google Signals / fonctionnalités publicitaires dans la propriété, choisir une conservation minimale adaptée (par exemple deux mois), vérifier les paramètres de partage et confirmer cette durée dans la politique. Ces réglages appartiennent au compte Google et ne sont pas modifiables par ce dépôt. Vérifier ensuite une visite consentie dans Temps réel / Tag Assistant sur le domaine public. Les tests du dépôt interceptent Google pour ne pas polluer les statistiques.

`NEXT_PUBLIC_ANALYTICS_ENABLED=false` désactive entièrement le module. `NEXT_PUBLIC_GA_MEASUREMENT_ID` remplace l’identifiant. Ces variables publiques sont intégrées au build : reconstruire après modification. Sans variable, l’intégration demandée reste active avec l’identifiant fourni. Search Console nécessite une validation séparée ; ce tag n’est pas une preuve de propriété.

Références : [Consent Mode Google](https://developers.google.com/tag-platform/security/concepts/consent-mode), [configuration GA4](https://developers.google.com/analytics/devguides/collection/ga4/reference/config), [vues manuelles et mesure améliorée](https://developers.google.com/analytics/devguides/collection/ga4/views), [recommandations de la CNIL](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ).

## Contenus réels

Ajoutez les cas vérifiés dans `data/projects.ts` avec `approvedForPublication: true`. Ajoutez uniquement des chiffres, citations et captures approuvés. Le sitemap et les routes suivent automatiquement ces entrées. Pour les réseaux sociaux, configurez les URLs officielles ; aucun lien de profil inventé n’est affiché.

## Vérification

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
npm run audit:site
npm run audit:cookies
npm run check:launch
```

L’audit vérifie les destinations internes, titres et descriptions uniques, canonicals, données structurées, une H1, 404, absence de débordement à 375 / 430 / 768 / 1024 / 1440 / 1920 px, axe WCAG AA, focus du menu, navigation de la méthode et validation du formulaire. Il contrôle aussi les pages orphelines, la profondeur des liens, la cohérence du schéma Article, le téléchargement du modèle et le contenu rendu sans JavaScript. Il n’envoie aucun email et intercepte l’API de contact. Captures et rapport : `test-results/` (ignoré par Git). Sur macOS, Chrome installé est utilisé ; sinon installer le navigateur Playwright. `AUDIT_URL` et `CHROME_PATH` permettent de préciser la configuration. `AUDIT_INDEXABLE=true` vérifie les directives du build public ; `false` vérifie celles d’un aperçu. L’activer ne change pas le build : `SITE_INDEXABLE` doit correspondre lors de la compilation et du démarrage.

Les tests unitaires couvrent la qualification, les limites et le comportement de l’endpoint sur échec ou réception confirmée. System Flow utilise une progression de scroll limitée par requestAnimationFrame et la visibilité du visuel. Le moteur Framer Motion Mini est chargé à la première interaction avec la méthode, jamais pour le premier rendu. Les mouvements sont désactivés avec prefers-reduced-motion. Les performances Lighthouse se mesurent sur le build de production, avec l’indexation finale activée pour la catégorie SEO. Les objectifs du brief sont des cibles à mesurer, pas des scores revendiqués sans audit.

## Avant publication

1. Renseigner les variables `LEGAL_*` avec les informations exactes de la société et de l’hébergeur ; vérifier mentions et politique selon le traitement effectivement déployé.
2. Confirmer la durée de conservation et le processus de suppression des demandes. Le défaut est 12 mois sans suite ; adapter `PRIVACY_RETENTION_MONTHS` à la politique décidée.
3. Choisir le mode de contact : email explicite ou webhook testé jusqu’à réception, et configurer le limiteur selon l’hébergement.
4. Confirmer `NEXT_PUBLIC_SITE_URL=https://seyalabs.com`, TLS et redirection permanente de toute variante vers ce domaine canonique.
5. Activer `SITE_INDEXABLE=true` uniquement sur le domaine public final. Conserver les previews en noindex.
6. Valider le contenu commercial et, si disponibles, les liens sociaux officiels.
7. Désactiver les mesures automatiques dans le flux GA4, confirmer sa durée de conservation et les paramètres de partage. Mettre à jour la politique avec les réglages réellement choisis.
8. Exécuter les vérifications, `npm run check:launch`, puis déclarer le sitemap dans Search Console.

Le site est préparé pour un hébergement Node.js compatible Next.js. Il n’a pas été publié par cette tâche. Les paramètres légaux et la livraison des demandes dépendent de la configuration de production.

## Résultats vérifiés — 5 octobre 2026

Une production motion design générale de l’agence est livrée séparément dans `motion/` : deux MP4 de 45 s, horizontal et vertical, voix française synthétique, fond sonore original et sous-titres. Le [prompt réutilisable](motion/prompt-motion-seya-labs.md), les sources et les commandes sont décrits dans [le dossier de production](motion/README.md). L’aperçu local est accessible sur `http://localhost:3210` ; cette production n’ajoute aucune vidéo au chargement du site et n’a pas été publiée à l’extérieur.

- Lint sans avertissement, TypeScript strict, build de production et 6 tests du formulaire / consentement : validés.
- 42 pages et 56 destinations internes, dont le modèle téléchargeable et les demandes de formation : vérifiées ; titres et descriptions uniques, canonicals, données structurées et une H1.
- 39 pages dans le sitemap : aucune page orpheline, profondeur maximale de deux clics depuis l’accueil.
- 138 contrôles responsive à 375 / 430 / 768 / 1024 / 1440 / 1920 px : aucun débordement.
- Axe WCAG AA : aucune violation automatique sur les 42 pages, le menu mobile et le formulaire prérempli de formation.
- Contenu commercial, pédagogique et éditorial lisible sans JavaScript sur 31 pages ; téléchargement du modèle de cahier des charges vérifié.
- Clavier, focus, validation, fallback email, scroll, Framer Motion à l’interaction et navigation client : vérifiés. Aucun email de test envoyé.
- Catalogue → programme → contact prérempli → email qualifié : vérifié. Le préremplissage des 12 programmes et le lien vers une formation depuis chacune des 12 offres sont contrôlés. La catégorie Formation passe aussi la validation et la transmission API dans les tests avec récepteur simulé. Le type Produit SaaS complète les catégories du contact.
- Après la compilation finale, recontrôle ciblé des ancres du catalogue à 375 et 1440 px, de l’accessibilité et de la préparation d’une demande Produit SaaS : validé, sans erreur navigateur ni envoi externe.
- Lighthouse mobile sur l’accueil après renforcement SEO, avant ajout des formations, build local indexable : **Performance 93 / Accessibilité 100 / Bonnes pratiques 100 / SEO 100**. FCP 1,1 s ; LCP 2,8 s ; TBT 200 ms ; CLS 0.
- Lighthouse mobile sur l’offre Application métier, avant ajout des formations : **Performance 97 / Accessibilité 100 / Bonnes pratiques 100 / SEO 100**. FCP 0,8 s ; LCP 2,5 s ; TBT 30 ms ; CLS 0. Ces mesures de laboratoire dépendent de l’hébergement et des conditions de mesure ; elles ne remplacent pas le suivi des visiteurs après lancement, ni l’évaluation du classement.
- Rapports : `test-results/audit.json`, `test-results/final-adjustments.json`, `test-results/lighthouse-home.report.html` et `test-results/lighthouse-application-metier.report.html` ; captures dans le même dossier.
- Non publié. Les informations légales restent à renseigner. Le contact fonctionne en préparation d’email ; l’envoi serveur attend un webhook configuré et testé.
