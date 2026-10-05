# Déploiement SEYA LABS avec Dokploy

Configuration préparée le 5 octobre 2026. Le site est une application Next.js avec une API de contact : utiliser le Dockerfile fourni et le serveur Node standalone.

## Source et construction

- Dépôt : `git@github.com:Youorus/Seyalabs---Frontend.git`.
- Branche : `main` ; autoriser Dokploy à lire le dépôt via son intégration GitHub ou une clé de déploiement en lecture seule.
- Build Type : **Dockerfile**.
- Dockerfile Path : `Dockerfile`.
- Docker Context Path : `.`.
- Docker Build Stage : `runner` (ou laisser vide pour la dernière étape).
- Port interne : **3000**. Démarrage défini par `CMD ["node", "server.js"]`.
- Node.js 22, installation `npm ci` avec lockfile, image finale standalone sans dépendances de développement, utilisateur non root.
- Healthcheck : `GET /api/health`, réponse HTTP 200 `{"status":"ok"}`. Aucun secret ni contenu de contact exposé.
- Aucun volume persistant requis par le site. Si un webhook est choisi, les demandes doivent être conservées chez son récepteur.

## Variables à la construction

Dans Environment → **Build Time Arguments**, renseigner au minimum pour la version publique :

```dotenv
NEXT_PUBLIC_SITE_URL=https://seyalabs.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@seyalabs.com
SITE_INDEXABLE=true
NEXT_PUBLIC_ANALYTICS_ENABLED=true
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-K3MFCQHF4R
PRIVACY_RETENTION_MONTHS=12
```

Ajouter les informations exactes `LEGAL_COMPANY_NAME`, `LEGAL_COMPANY_FORM`, `LEGAL_ADDRESS`, `LEGAL_REGISTRATION`, `LEGAL_DIRECTOR`, `LEGAL_HOST_NAME`, `LEGAL_HOST_ADDRESS`, `LEGAL_HOST_PHONE`. Ajouter capital / TVA si applicables (`LEGAL_CAPITAL`, `LEGAL_VAT`). Ces informations deviennent publiques dans les pages légales. Ne pas inventer de société, d’adresse ou d’hébergeur.

Variables publiques facultatives : `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL`. Pour une validation Search Console par balise, ajouter `GOOGLE_SITE_VERIFICATION` ; la validation DNS d’une propriété Domaine convient également. L’identifiant Analytics n’est pas le token Search Console.

Les variables `NEXT_PUBLIC_*`, les métadonnées, les pages légales et le réglage d’indexation sont intégrés au build. **Une modification exige une reconstruction.** Une preview utilise `SITE_INDEXABLE=false` et peut désactiver Analytics avec `NEXT_PUBLIC_ANALYTICS_ENABLED=false`.

## Variables d’exécution

Dans Environment → variables du conteneur, reporter la même URL, le même email, `SITE_INDEXABLE` et les informations légales / durée. Le sitemap et l’API doivent correspondre au build ; changer uniquement une valeur runtime ne met pas à jour les pages précompilées.

Ajouter uniquement côté runtime les secrets nécessaires :

```dotenv
CONTACT_WEBHOOK_URL=
CONTACT_WEBHOOK_SECRET=
CONTACT_ALLOW_LOCAL_PREVIEW=false
CONTACT_TRUST_PROXY=false
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RATE_LIMIT_SECRET=
```

Sans webhook, le formulaire prépare un email et invite le visiteur à confirmer son envoi dans sa messagerie. Pour l’envoi serveur, fournir un webhook HTTPS puis tester jusqu’à la réception réelle. Ne pas mettre ces secrets dans Git, les Build Time Arguments, les variables publiques ou un Dockerfile.

`CONTACT_TRUST_PROXY=true` est possible uniquement si le proxy remplace les en-têtes forwarded entrants. Sinon conserver `false`, avec une limite commune à l’instance. Pour plusieurs replicas, utiliser Redis / Upstash et un secret HMAC `RATE_LIMIT_SECRET` commun pour le limiteur distribué. Le secret et les tokens sont à créer/configurer dans l’environnement du serveur.

## Domaine et Google

1. Faire pointer les DNS vers le serveur, ajouter `seyalabs.com` dans Domains sur le port 3000 et activer HTTPS. Rediriger les variantes `www` et HTTP vers `https://seyalabs.com` avec une redirection permanente.
2. Compléter les mentions légales et la politique de confidentialité. Confirmer le prestataire de contact et les durées réellement appliquées.
3. Dans GA4 → Administration → Flux de données → flux Web, **désactiver la Mesure améliorée**, y compris les vues basées sur l’historique, clics sortants et formulaires. Le site envoie déjà des vues manuelles et des événements filtrés. Les mesures automatiques risquent des doublons et une collecte de destinations non prévues.
4. Vérifier Google Signals / publicité désactivés, les paramètres de partage et une durée adaptée dans Conservation des données (par exemple deux mois). Reporter la durée confirmée dans `/confidentialite`. Ces réglages dans le compte ne sont pas appliqués par le code du site.
5. Sur le domaine HTTPS public : accepter les cookies dans une visite de contrôle, vérifier le bon flux dans GA4 Temps réel / Tag Assistant. Refuser dans une nouvelle session et vérifier l’absence de chargement du tag. Tester le retrait et « Gérer les cookies ».
6. Valider la propriété Search Console et soumettre `https://seyalabs.com/sitemap.xml`. Les classements ne sont pas garantis ; suivre indexation, impressions, clics et demandes qualifiées.

## Vérifications et retour arrière

En local, Docker Desktop doit fonctionner :

```sh
docker build --build-arg SITE_INDEXABLE=true -t seyalabs-frontend:local .
docker run --rm --name seyalabs-local -p 3101:3000 \
  -e NEXT_PUBLIC_SITE_URL=https://seyalabs.com -e SITE_INDEXABLE=true \
  seyalabs-frontend:local
```

Le build sans informations légales laisse les pages légales en préparation ; le préciser dans l’environnement final. Contrôler `http://localhost:3101/api/health`, les fonts, `/contact`, les programmes et le sitemap.

La CI GitHub exécute lint, tests, build, TypeScript et audits navigateur sans envoi à Google ni email réel. Après déploiement, vérifier les logs de démarrage, le healthcheck, HTTPS, les liens et le formulaire. Pour revenir en arrière, redéployer le dernier commit validé dans Dokploy en conservant la configuration correspondante. Les secrets restent dans Dokploy.

## Références

[Build Dockerfile et arguments dans Dokploy](https://docs.dokploy.com/docs/core/applications/build-type), [production Dokploy](https://docs.dokploy.com/docs/core/applications/going-production), [Next.js standalone avec Docker](https://docs.docker.com/guides/nextjs/), [Google : vues manuelles](https://developers.google.com/analytics/devguides/collection/ga4/views), [Google : conservation](https://support.google.com/analytics/answer/7667196?hl=fr).
