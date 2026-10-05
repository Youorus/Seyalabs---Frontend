# Déploiement

Le site vit sur le serveur `178.105.120.237`, derrière le Traefik de Dokploy,
sur `https://seyalabs.com` et `https://www.seyalabs.com`.

## Comment il est servi

Dokploy construit l'image depuis ce dépôt avec `docker-compose.dokploy.yml`.
Les étiquettes du routeur sont **dans ce fichier**, pas posées à la main sur le
serveur : posées à la main, elles ne survivent pas au premier `git pull` de
Dokploy — leçon payée sur le studio Postly.

| | |
|---|---|
| Dépôt | `github.com/Youorus/Seyalabs---Frontend`, branche `main` |
| Fichier Compose | `./docker-compose.dokploy.yml` |
| Image | construite depuis le `Dockerfile` (sortie `standalone` de Next) |
| Port interne | 3000 |
| Santé | `GET /api/health` |
| Domaines | `seyalabs.com`, `www.seyalabs.com`, certificat Let's Encrypt |

## Créer la ressource dans Dokploy (une seule fois)

1. Ouvrir Dokploy : `http://178.105.120.237:3000`.
2. Dans le projet qui porte déjà `api` et `frontend`, **Create Service →
   Compose**.
3. Renseigner :
   - **Name** : `site`
   - **Provider** : GitHub → dépôt `Seyalabs---Frontend`, branche `main`
   - **Compose Path** : `./docker-compose.dokploy.yml`
4. Ne rien ajouter dans l'onglet **Domains** : les domaines sont déjà déclarés
   dans le fichier Compose. En ajouter ici créerait un second routeur sur le
   même hôte, et Traefik en choisirait un au hasard.
5. **Deploy**.

## Variables facultatives (onglet Environment)

Aucune n'est nécessaire pour que le site réponde. Elles complètent :

| Variable | Ce qu'elle active |
|---|---|
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | le formulaire de contact. Sans elles il reste inerte plutôt que de perdre un message en silence |
| `RATE_LIMIT_SECRET`, `UPSTASH_REDIS_REST_*` | la protection anti-abus répartie |
| `GOOGLE_SITE_VERIFICATION` | la propriété Search Console |
| `LEGAL_*` | les mentions légales |
| `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_GITHUB_URL` | les liens sociaux (absents = masqués) |

Les `LEGAL_*` et les `NEXT_PUBLIC_*` sont lues **à la construction** :
après les avoir changées, il faut redéployer, pas seulement redémarrer.

## La bascule des domaines

`seyalabs.com` servait le studio Postly. L'ordre compte :

1. Pousser le studio sur `studio.seyalabs.com` (dépôt `postly_frontend`,
   commit déjà prêt) et attendre qu'il soit redéployé.
2. Déployer ce site, qui prend `seyalabs.com` et `www.seyalabs.com`.

Entre les deux, `seyalabs.com` ne répond pas — le temps d'une construction,
quelques minutes. Le DNS est déjà en place pour les trois noms (OVH) :
`seyalabs.com`, `www.seyalabs.com` et `studio.seyalabs.com` pointent tous sur
`178.105.120.237`.
