import { readConsent } from "./consent";

/**
 * Google Tag Manager, derrière le consentement.
 *
 * L'extrait que Google fournit charge `gtm.js` dès le premier octet de la page,
 * pour tout le monde. Le coller tel quel ferait mentir la bannière de ce site —
 * qui promet qu'aucun script de mesure ne part avant acceptation — et la
 * politique de confidentialité avec elle. C'est exactement ce qu'un contrôle
 * relève en premier.
 *
 * Le conteneur se charge donc au même moment que Google Analytics : après un
 * « oui » explicite, jamais avant. Les valeurs par défaut du mode consentement
 * sont poussées dans `dataLayer` AVANT le script, puisque GTM les lit à son
 * démarrage et les applique à toutes les balises qu'il déclenche.
 *
 * L'iframe `<noscript>` de Google n'est pas reprise : elle se déclencherait sans
 * JavaScript, donc sans consentement possible, et un visiteur sans JavaScript ne
 * peut de toute façon ni accepter ni refuser.
 */

export const containerId = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID || "";
export const tagManagerEnabled = /^GTM-[A-Z0-9]+$/.test(containerId);

const refuse = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const;

let loading: Promise<boolean> | undefined;
let demarre = false;

/** Vrai tant que le visiteur a dit oui. */
function autorise() {
  return tagManagerEnabled && readConsent()?.analytics === "granted";
}

/**
 * Retire le consentement auprès des balises déjà chargées.
 *
 * Le script de GTM ne se décharge pas d'une page vivante — personne ne sait le
 * faire. Ce qu'on peut faire, et qui compte, c'est lui retirer l'autorisation :
 * les balises qui respectent le mode consentement cessent alors d'écrire et
 * d'émettre. Le rechargement de la page finit le travail.
 */
export function stopTagManager() {
  if (!demarre || typeof window === "undefined") return;
  window.dataLayer?.push({ event: "seya_consent_withdrawn" });
  window.gtag?.("consent", "update", refuse);
}

export async function startTagManager(): Promise<boolean> {
  if (!autorise()) return false;
  if (!loading) {
    window.dataLayer = window.dataLayer || [];
    // La file de commandes de Google, dans sa forme documentée.
    // eslint-disable-next-line prefer-rest-params
    window.gtag = window.gtag || function () { window.dataLayer!.push(arguments); };
    // Tout est refusé par défaut : une balise ajoutée dans le conteneur sans
    // qu'on le sache n'écrira rien tant que le « oui » n'est pas remonté.
    window.gtag("consent", "default", refuse);
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

    loading = new Promise((resolve) => {
      const script = document.createElement("script");
      script.id = "seya-google-tag-manager";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`;
      script.referrerPolicy = "no-referrer";
      script.onload = () => resolve(true);
      script.onerror = () => {
        script.remove();
        loading = undefined;
        resolve(false);
      };
      document.head.appendChild(script);
    });
  }
  if (!(await loading) || !autorise()) return false;
  window.gtag?.("consent", "update", { ...refuse, analytics_storage: "granted" });
  demarre = true;
  return true;
}
