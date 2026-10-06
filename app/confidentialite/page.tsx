import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/primitives";
import { CookiePreferencesButton } from "@/components/cookie-preferences-button";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { legal, legalComplete } from "@/lib/legal";

export const metadata = pageMetadata("Politique de confidentialité", "Traitement des demandes de contact, données collectées, conservation, droits et préférences de mesure d’audience sur le site SEYA LABS.", "/confidentialite", !legalComplete);

export default function Privacy() {
  const retention = Number(process.env.PRIVACY_RETENTION_MONTHS) || 12;
  return <>
    <PageHero title="Confidentialité." description="Vos informations servent à comprendre votre demande et à vous répondre." label="DONNÉES PERSONNELLES" breadcrumb={[{ name: "Confidentialité" }]} />
    <section className="section"><Container><div className="legal-content">
      {!legalComplete && <p className="notice">Cette version est en préparation. L’identification complète du responsable du traitement, les prestataires de contact et les paramètres de conservation de Google Analytics doivent être finalisés avant publication.</p>}
      <h2>Qui traite vos informations ?</h2>
      <p>Les demandes sont destinées à {legal.company || site.name}. Pour toute question relative à vos données, écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>. Les informations d’identification figurent dans les <a href="/mentions-legales">mentions légales</a>.</p>
      <h2>Quelles données sont utilisées ?</h2>
      <p>Le formulaire demande votre nom, votre entreprise, votre email, le type de projet, le budget indicatif, le calendrier et la description du besoin. Le téléphone est facultatif. Évitez d’inclure des données sensibles ou des informations confidentielles non nécessaires au premier échange.</p>
      <h2>Pourquoi et sur quelle base ?</h2>
      <p>Ces informations permettent d’étudier votre besoin, d’échanger avec vous et de préparer les mesures précontractuelles que vous demandez. Elles ne vous inscrivent pas à une newsletter et ne déclenchent aucune prospection automatisée.</p>
      <h2>Envoi et destinataires</h2>
      <p>En mode email, la demande est préparée sur votre appareil. Elle est transmise lorsque vous confirmez son envoi dans votre messagerie. Lorsque l’envoi direct est activé, les informations sont transmises au service de réception configuré par SEYA LABS pour le traitement des demandes. Seules les personnes chargées de cette demande et les prestataires nécessaires à son acheminement y accèdent.</p>
      <h2>Durée de conservation</h2>
      <p>Les demandes sans suite ont vocation à être supprimées au plus tard {retention} mois après le dernier échange. Lorsqu’une relation contractuelle est établie, les durées sont adaptées au suivi de la prestation et aux obligations applicables. Vous pouvez demander la suppression des informations qui ne sont plus nécessaires.</p>
      <h2>Sécurité et prévention des abus</h2>
      <p>Le formulaire applique une validation, une limite de taille et une protection contre les envois répétés. Lorsqu’un identifiant réseau est utilisé pour cette protection, il est transformé en empreinte temporaire et conservé pendant la fenêtre de limitation de 15 minutes. Le contenu des demandes n’est pas enregistré dans les journaux applicatifs du formulaire.</p>
      <h2 id="cookies">Cookies et mesure d’audience</h2>
      <p>La mesure d’audience repose sur votre consentement. Google Analytics 4 et le gestionnaire de balises Google Tag Manager sont chargés uniquement après l’acceptation de cette finalité. Avant votre choix et en cas de refus initial, aucun script ni appel de mesure n’est déclenché — ni Google Analytics, ni Tag Manager. Vous pouvez accepter, refuser ou personnaliser votre choix avec le même accès au site.</p>

      <p>Google Tag Manager ne mesure rien par lui-même : il déclenche les balises de mesure configurées pour ce site. Il est soumis au même consentement, et les balises qu’il déclenche reçoivent le mode consentement de Google — tout est refusé par défaut, et seule la mesure d’audience est autorisée après votre accord. Un retrait de consentement retire cette autorisation aux balises déjà chargées.</p>
      <p>Votre décision est mémorisée dans le stockage local de ce navigateur, sous la clé <code>seya-analytics-consent-v2</code>, pendant six mois à compter de votre choix. Ce stockage sert exclusivement à conserver vos préférences. Les visites suivantes ne prolongent pas sa validité. Une suppression du stockage du navigateur ou l’expiration du choix fait réapparaître la demande.</p>
      <h3>À quoi sert Google Analytics ?</h3>
      <p>Il nous permet de connaître les pages consultées et certaines interactions : ouverture d’un contact, clic sur un bouton, consultation d’une offre ou téléchargement d’une ressource. Les événements ajoutés par SEYA LABS n’incluent ni les champs du formulaire, ni les adresses email ou numéros de téléphone, ni les paramètres de recherche ou fragments des URL. Nous n’ajoutons pas de suivi publicitaire ; Google Signals et la personnalisation publicitaire sont désactivés dans le tag.</p>
      <p>Après accord, Google reçoit notamment des informations de navigation, des identifiants de cookies et des informations techniques sur le navigateur et l’appareil. Le service est fourni par Google, dont Google Ireland Limited pour les utilisateurs de l’Espace économique européen. Google peut traiter les données dans plusieurs pays, y compris hors de l’Union européenne, conformément à ses conditions de protection des données et aux mécanismes de transfert applicables. Consultez <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noopener noreferrer">la politique de confidentialité de Google</a> et <a href="https://business.safety.google/adsprocessorterms/" target="_blank" rel="noopener noreferrer">ses conditions de traitement des données</a>.</p>
      <h3>Quels cookies et quelles durées ?</h3>
      <p>Les cookies <code>_ga</code> et <code>_ga_*</code> permettent respectivement de reconnaître un navigateur et de conserver l’état de session. Le tag demande une durée maximale de 365 jours, sans prolongation automatique à chaque visite. Le choix de consentement expire après six mois : sa durée est distincte de celle des cookies. La conservation des données dans les rapports dépend du paramétrage de la propriété Google Analytics ; ce réglage et son information doivent être confirmés avant publication.</p>
      <h3>Modifier ou retirer mon accord</h3>
      <p>Le bouton « Gérer les cookies » reste disponible dans le pied de page et ci-dessous. Un refus ultérieur désactive les nouvelles mesures du site et supprime les cookies Google Analytics accessibles sur son domaine. Le changement est également pris en compte dans les autres onglets de ce navigateur. Le retrait ne supprime pas rétroactivement les données déjà transmises ; vous pouvez nous contacter pour exercer vos droits.</p>
      <p><CookiePreferencesButton /></p>
      <h2>Vos droits</h2>
      <p>Vous pouvez demander l’accès, la rectification, l’effacement ou la limitation de l’utilisation de vos données, et exercer les autres droits applicables à votre situation, en écrivant à <a href={`mailto:${site.email}`}>{site.email}</a>. Vous pouvez également adresser une réclamation à la <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">CNIL</a>.</p>
    </div></Container></section>
  </>;
}
