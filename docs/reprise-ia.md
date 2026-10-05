# Reprise IA — SEYA LABS

Dernière mise à jour : 5 octobre 2026. Lire ce document, `README.md`, puis `docs/deploiement-dokploy.md` avant de poursuivre. Le point d’arrêt est **avant le déploiement sur le serveur Dokploy**. Le site et les livrables motion sont réalisés ; les informations de société et les réglages des comptes externes restent à finaliser.

## Projet et demande du propriétaire

- Workspace d’origine : `/Users/marc./WebstormProjects/Seyalabs-frontend`.
- Dépôt demandé : `git@github.com:Youorus/Seyalabs---Frontend.git` ; branche de livraison `main`.
- Domaine officiel : `https://seyalabs.com`.
- Contact : `contact@seyalabs.com`.
- GA4 fourni explicitement : **G-K3MFCQHF4R**.
- Objectif : site d’agence français premium, clair pour tous les métiers, offrant logiciel, IA, automatisation, data/API et formations dans ces domaines. Priorité SEO : **logiciels et applications métier sur mesure**.
- Différenciation souhaitée : rendre les outils accessibles grâce à des tarifs adaptés au budget. Aucun prix précis n’a été fourni : ne pas inventer de prix, de comparaison chiffrée ou de promesse de rentabilité.
- Le propriétaire veut un référencement très compétitif. Une première place ou une domination des concurrents ne peut pas être garantie. Améliorer contenu utile, architecture, performances et conversion, puis mesurer après publication.
- Le fleuriste cité dans l’historique était un exemple de compréhension par un non-technicien, **pas le sujet du film publicitaire**. La production présente l’agence et plusieurs besoins métiers.
- Autorisations : intégrer Analytics avec gestion du consentement, initialiser Git, committer et pousser vers le dépôt indiqué. Le déploiement Dokploy sera effectué par le propriétaire. Aucun email réel, message à un tiers ou publication publicitaire n’a été demandé.
- Le logo fourni reste à la racine (`Logo abstrait en S noir.png`). Déclinaisons SVG et wordmarks dans `public/brand/`.
- Le brief initial se trouvait dans une pièce jointe locale Codex (`Texte collé.txt`) ; ne pas dépendre de cet accès pour reprendre. Les décisions utiles sont dans ce document et le README.

## Identité et implémentation

Next.js **16.3.8**, App Router, React 19.3, TypeScript strict, Tailwind 4.3, Zod, Lucide, Framer Motion Mini chargé à l’interaction. Node **22** fixé dans `.nvmrc`, CI et Docker. Utiliser `npm ci` avec `package-lock.json` ; ne pas remplacer arbitrairement les versions.

Palette Digital Mineral / Copper : obsidienne `#11100E`, porcelaine `#F3F0E8`, cuivre `#D65A31`, aubergine `#34212F`, sandstone `#C9BDAE`, chalk `#E4E0D7`. Le cuivre de texte utilise un ton plus sombre pour le contraste. Fonts Space Grotesk, Inter et Geist Mono auto-hébergées, licences incluses. Styles et adaptations responsive dans `styles/globals.css`. Aucun fournisseur de fonts externe au chargement.

Le contenu éditorial est rendu côté serveur. Les îlots clients couvrent menu, formulaire, méthode, visuel System Flow et consentement. `prefers-reduced-motion` est pris en compte. Éviter d’ajouter du JavaScript global ou un lecteur vidéo à l’accueil sans demande.

## Contenus livrés

- 4 expertises : développement logiciel, intelligence artificielle, automatisation, data/API.
- 8 solutions : application métier, agents IA, automatisation workflows, assistant IA, intégration API, MVP, plateformes web/mobile, SaaS.
- 12 formations : 4 fondations et 8 parcours appliqués aux solutions. Lien formation correspondant depuis chaque offre et lien de retour vers la réalisation pour les parcours appliqués.
- Catalogue `/formations` avec 4 familles et navigation par ancres ; programmes avec public, prérequis, objectifs, modules, atelier et FAQ. Les durées, calendriers, financement, certifications et prix n’ont pas été fournis : ne pas les inventer.
- 7 articles utiles, dont 4 guides d’achat logiciel ; modèle de cahier des charges gratuit sans inscription dans `public/ressources/`.
- Contact qualifié ; cas clients préparés dans le schéma mais **aucun cas réel approuvé disponible**. Ne pas créer de client, témoignage, capture ou résultat fictif.
- Pages de méthode, à propos, réalisations, mentions légales et confidentialité.

Données : `data/services.ts`, `data/additional-services.ts`, `data/service-guidance.ts`, `data/additional-service-guidance.ts`, `data/articles.ts`, `data/software-guides.ts`, `data/trainings.ts`, `data/training-programmes.ts`, `data/projects.ts`.

## SEO

`lib/seo.ts` : titres et descriptions propres, canonical, Open Graph / Twitter, directives robots, Organization / WebSite / Service / BreadcrumbList / FAQPage / Article / Course / ItemList. L’image Open Graph est produite par Next. Pas de LocalBusiness avec adresse inventée ; pas de résultat enrichi garanti. L’existence d’un schéma FAQ/Course n’assure pas son affichage par Google.

`app/sitemap.ts` : **39 pages publiées**, réalisations vides et pages légales exclues. Pas de dates de modification artificielles à chaque build. Sitemap, liens et routes suivent les collections. **42 pages auditées**, **56 destinations internes**, **aucune page orpheline**, profondeur maximale **2** depuis l’accueil.

Sans `SITE_INDEXABLE=true`, les pages portent `noindex`. Il faut construire et exécuter avec la configuration du domaine final ; garder les previews en `noindex`. `robots.txt` permet de lire les directives de page et les ressources. Conserver une seule URL canonique publique.

Lire `docs/strategie-seo.md` pour le ciblage et la mesure. `GOOGLE_SITE_VERIFICATION` est facultatif pour une propriété Search Console par préfixe ; une propriété Domaine peut être validée par DNS. **Le tag G-K3MFCQHF4R n’est pas une validation Search Console.** Aucun token de vérification n’a été fourni, aucune propriété validée ni sitemap soumis par cette session.

## Analytics et cookies

Fichiers : `lib/consent.ts`, `lib/analytics.ts`, `lib/google-analytics.ts`, `components/analytics.tsx`, `components/cookie-preferences-button.tsx`, page `/confidentialite`.

- Analytics actif avec l’ID fourni, sauf `NEXT_PUBLIC_ANALYTICS_ENABLED=false`. Override possible avec `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Rebuild nécessaire après changement de ces variables publiques.
- Consent Mode **basique** : pas de script / connexion / ping Google avant accord explicite ou après un refus initial.
- Bandeau : « Tout refuser », « Tout accepter » de même présentation et « Personnaliser ». Mesure facultative décochée initialement. Navigation disponible en cas de refus.
- Préférences via « Gérer les cookies » dans le footer et la politique ; dialogue natif accessible, clavier / Escape / restauration du focus.
- Choix stocké dans `localStorage`, clé **seya-analytics-consent-v2**, version 2, décision horodatée et expiration **six mois calendaires**, jour plafonné pour les mois plus courts. Pas de renouvellement à chaque visite. Ancien format, donnée invalide, expiration ou stockage bloqué = pas de suivi.
- Contrôle de validité à chaque événement, au focus / retour de visibilité et toutes les 30 secondes. Synchronisation entre onglets avec `storage`.
- Retrait : drapeau Google `ga-disable-ID` immédiat, update de consentement refusé pour un tag déjà chargé, nettoyage des cookies `_ga`, `_ga_*`, `_gid`, `_gat*` accessibles au domaine. Un tag en cours de chargement ne configure pas de mesure si l’accord a été retiré entre-temps. Les cookies nécessaires sont conservés. Les données transmises auparavant ne sont pas supprimées rétroactivement.
- `send_page_view: false` et vues manuelles sur changement de pathname App Router, dédupliquées. URL/referrer sans query string ni hash dans les paramètres envoyés par le site.
- Événements autorisés : `hero_cta_click`, `contact_started`, `contact_submitted`, `service_viewed`, `case_study_viewed`, `resource_downloaded`, `email_clicked`, `phone_clicked`. Pas de propriété libre, de valeur du formulaire ni de destination mailto.
- Cookies Google configurés pour **365 jours**, `cookie_update: false`, SameSite Lax / Secure. Publicité refusée dans les consentements ; Google Signals / personnalisation publicitaire désactivés dans le tag.
- **À faire dans le compte GA4 avant publication : désactiver toute Mesure améliorée dans le flux Web**, surtout vues basées sur historique, clics sortants et formulaires. Le site a ses vues / événements manuels ; les mesures automatiques peuvent provoquer des doublons et collecter des destinations non prévues. Le dépôt n’a pas accès aux réglages distants.
- Confirmer la durée de conservation côté propriété (par exemple deux mois), les paramètres de partage et Signals / publicité, puis remplacer l’information encore à confirmer dans la politique. Les cookies navigateur et la conservation côté serveur sont deux durées différentes.
- Réception réelle à vérifier après publication avec une visite consentie / Temps réel / Tag Assistant. Les tests navigateur interceptent Google et n’envoient **aucune statistique réelle**.

Cette implémentation ne constitue pas une certification globale RGPD : les informations légales et les pratiques de traitement doivent correspondre à la société et aux prestataires effectivement retenus.

## Contact et sécurité

Sans `CONTACT_WEBHOOK_URL`, le formulaire valide, prépare un email explicite et laisse le visiteur finaliser l’envoi dans sa messagerie. Il ne prétend pas avoir envoyé une demande. Aucun webhook / CRM n’a été fourni.

Avec webhook HTTPS : API `app/api/contact/route.ts`, validation partagée `lib/contact-schema.ts`, idempotence, limites, protection anti-abus, origine, payload maximal 16 Ko, honeypot, temps minimal 1,5 s, timeout et aucune redirection de webhook. `lib/rate-limit.ts` : 5 requêtes / 15 min, local pour une instance ; Redis / Upstash avec HMAC temporaire pour plusieurs instances. Ne pas journaliser les champs du formulaire.

Les paramètres `/contact?type=formation&formation=SLUG` sont limités aux formations connues. La canonical reste `/contact`. Types Formation et Produit SaaS inclus dans le schéma partagé. Le consentement du formulaire concerne la demande de contact, séparément des cookies facultatifs.

Secrets uniquement côté serveur : `CONTACT_WEBHOOK_SECRET`, `UPSTASH_REDIS_REST_TOKEN`, `RATE_LIMIT_SECRET`. `CONTACT_ALLOW_LOCAL_PREVIEW=false` en public. `CONTACT_TRUST_PROXY=true` seulement si l’hébergeur supprime / remplace les forwarded headers entrants.

`next.config.ts` désactive poweredByHeader et fournit nosniff, Referrer-Policy, X-Frame-Options DENY, Permissions-Policy et CSP frame-ancestors / base-uri / object-src. Ne pas ajouter une CSP script-src restrictive sans vérifier Next, JSON-LD et le chargement consenti de Google.

## Motion design livré

Film **général de 45 secondes**, promesse « Des outils sur mesure. Un budget à votre mesure. ». Software × AI × Automation avec bénéfices concrets et formations. Aucun prix ni preuve client inventé.

`motion/prompt-motion-seya-labs.md` : prompt réutilisable pour une IA. `motion/README.md`, `storyboard.json`, `film.js`, `production.html`, `render-film.mjs`, `preview.mjs`, `kit-package.json` : sources / aperçu / rendu.

Exports conservés dans Git : `motion/output/seya-labs-horizontal.mp4` (1920×1080), `seya-labs-vertical.mp4` (1080×1920), `seya-labs-bande-son.mp3`, `seya-labs.srt`, couvertures, storyboards et `kit-motion-seya-labs.zip`. Chaque vidéo : H.264, AAC, 30 fps, **45 s exactes**. Voix française **synthétique** Thomas macOS, fond sonore original ; sous-titres présents dans le rendu et SRT séparé. Audio mesuré environ −15,97 LUFS / −1,8 dBTP ; décodage des vidéos et lecture navigateur validés dans la phase de production.

Les fichiers intermédiaires, WAV, captures techniques, `motion/audio/` et `motion/assets.js` sont ignorés dans Git. Le **ZIP de production** contient les ressources nécessaires pour reprendre hors du poste d’origine. `motion/` est exclu de l’image Docker du site et ne ralentit pas ses pages. Ne pas publier ces films sur des réseaux sans demande.

## Vérifications et commandes

```sh
npm ci
npm run lint
npm test
SITE_INDEXABLE=true npm run build
npm run typecheck
SITE_INDEXABLE=true npm start -- --port 3100
AUDIT_URL=http://localhost:3100 npm run audit:cookies
AUDIT_URL=http://localhost:3100 AUDIT_INDEXABLE=true npm run audit:site
npm run check:launch
```

`npm start` utilise `scripts/start.mjs` : ressources statiques copiées dans `.next/standalone`, chargement de l’environnement local et serveur standalone. Ne pas lancer `next start` avec ce mode. Port par défaut 3000 ; sur le poste d’origine, 3000 était occupé par un autre projet. Ne pas arrêter un processus tiers. Le site de cette session utilise 3100, l’aperçu motion 3210. Les ports sont des aperçus locaux, pas une publication.

Tests réussis de cette session : lint sans avertissement, TypeScript, build ; **6 tests unitaires** du contact / consentement ; audit **42 pages / 56 destinations / 138 contrôles responsive**, Axe AA sans violation automatique. Contenu principal disponible sans JS sur **31 pages**. Navigation mobile / clavier / focus, préremplissage des **12 formations**, contact / fallback email, ressource téléchargée, 404 et données structurées validés.

Audit cookies : blocage avant choix et après refus persistant, aspect égal des boutons, checkbox off par défaut, focus Escape, bon ID et config, vues SPA dédupliquées, payloads sans champs de contact ni queries, retrait entre onglets, suppression sélective des cookies, expiration, stockage indisponible, retrait pendant chargement ; Axe sans violation sur bandeau / dialogue à 1440 px et 375 px. Scripts / API / Google simulés : aucune mesure réelle ni email envoyé.

Rapports locaux dans `test-results/` (ignoré) : `audit.json`, `cookies-audit.json`, captures et audits de dépendances. CI `.github/workflows/ci.yml` sur main / PR : mêmes étapes avec Chrome Playwright, rapports conservés 7 jours, droits contents read, actions officielles figées par SHA.

Les scores Lighthouse historiques documentés dans README ont été mesurés **avant** ajout des formations / Analytics : accueil 93/100/100/100, application métier 97/100/100/100. Ne pas les présenter comme mesure fraîche de la version finale ou garantie en production.

`npm run check:launch` doit encore signaler les informations légales absentes et, sans environnement public, `SITE_INDEXABLE`. Ce contrôle ne doit pas être contourné avec des données fictives.

## Déploiement et prochain travail

Dockerfile multi-stage, Node22 Alpine, `npm ci`, Next standalone, utilisateur UID1001, port3000 et healthcheck `/api/health`. `.dockerignore` exclut secrets, IDE, Git, motion, caches et rapports. Lire `docs/deploiement-dokploy.md` pour distinguer **Build Time Arguments publics** et **variables runtime / secrets**. Aucun accès au serveur Dokploy ni déploiement public réalisé.

Pour continuer :

1. Lire `git status`, `git log -3 --oneline`, `git remote -v` et vérifier que main correspond à origin/main. Ne pas forcer un push ni écraser d’autres changements.
2. Obtenir les vraies informations légales et d’hébergement ; confirmer durées / prestataire de contact. Ne pas créer de tarifs ou cases studies sans données approuvées.
3. Configurer la source Git dans Dokploy, le Dockerfile, les arguments de build (domaine final et `SITE_INDEXABLE=true`), les variables runtime correspondantes et les secrets éventuels.
4. Finaliser les réglages GA4 indiqués ci-dessus et la politique ; vérifier une mesure réelle consentie après mise en ligne.
5. Configurer DNS, HTTPS et variantes canonisées. Tester le healthcheck, les assets, les formations, le contact jusqu’à la réception réelle si webhook.
6. Valider Search Console, soumettre le sitemap et suivre conversions / indexation. Préparer des améliorations avec données observées.
7. Si une nouvelle modification est demandée : garder l’identité et les décisions validées, exécuter les contrôles concernés, documenter les limites et committer un changement cohérent. Ne pas refaire le projet depuis zéro.

Aucune publication, aucun accès au compte GA4, aucune validation Search Console et aucun envoi réel de contact ne doivent être présentés comme déjà effectués.
