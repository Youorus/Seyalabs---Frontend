import type { ContactData } from "@/lib/contact-schema";
import { site } from "@/lib/site";

/**
 * L'accusé de réception envoyé au visiteur après une demande de contact.
 *
 * ═══ Aucun texte libre du visiteur n'y figure ═══
 *
 * Ce courriel part vers une adresse saisie dans un formulaire public. S'il
 * reprenait le nom, l'entreprise ou le message, n'importe qui pourrait
 * faire écrire par contact@seyalabs.com le texte de son choix à
 * l'adresse de son choix — c'est ainsi qu'une boîte finit sur les listes
 * de spam. Il ne reprend donc que les choix faits dans des listes fermées
 * (type, budget, horizon) et une référence produite par le serveur.
 *
 * ═══ Le HTML d'un courriel n'est pas celui d'une page ═══
 *
 * Tableaux, styles en ligne, aucune feuille externe, aucun SVG : c'est ce
 * que Gmail, Outlook et Apple Mail rendent tous. Les polices de la charte
 * ne se chargent pas dans une messagerie ; les piles de repli gardent le
 * caractère géométrique et la chasse fixe des étiquettes.
 */

type Choices = Pick<ContactData, "projectType" | "budget" | "timeline">;

const color = {
  obsidian: "#11100e",
  porcelain: "#f3f0e8",
  copper: "#d65a31",
  copperInk: "#a94021",
  chalk: "#e4e0d7",
  border: "#d5cfc3",
  muted: "#625e56",
  white: "#fbfaf6",
};
const display = "'Space Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif";
const body = "Inter,'Helvetica Neue',Helvetica,Arial,sans-serif";
const mono = "'Geist Mono',ui-monospace,SFMono-Regular,Menlo,Consolas,monospace";

/** La référence courte, la même dans l'accusé et dans le courriel interne. */
export function shortReference(id: string) {
  return `SL-${id.replace(/-/g, "").slice(0, 8).toUpperCase()}`;
}

const steps = [
  ["01", "Nous lisons votre demande", "Une personne de l’équipe prend connaissance de votre besoin — pas un robot."],
  ["02", "Nous vous répondons", "Par e-mail, avec nos premières questions ou une proposition d’échange."],
  ["03", "Nous cadrons ensemble", "Objectifs, périmètre, délais : la suite se construit avec vous."],
] as const;

export function confirmationEmail(choices: Choices, id: string) {
  const reference = shortReference(id);
  const subject = `Nous avons bien reçu votre demande — ${reference}`;
  const methodUrl = `${site.url}/methode`;
  const logoUrl = `${site.url}/brand/email-wordmark.png`;

  const recap = [
    ["Type de demande", choices.projectType],
    ["Budget indicatif", choices.budget],
    ["Horizon", choices.timeline],
    ["Référence", reference],
  ];

  const text = [
    "SEYA LABS",
    "",
    "Nous avons bien reçu votre demande.",
    "",
    "Merci de nous avoir écrit. Votre message est arrivé jusqu’à l’équipe ; nous revenons vers vous directement par e-mail.",
    "",
    ...recap.map(([label, value]) => `${label} : ${value}`),
    "",
    "La suite :",
    ...steps.map(([n, title, detail]) => `${n} — ${title}. ${detail}`),
    "",
    `Une précision à ajouter ? Répondez simplement à ce message, en rappelant la référence ${reference}.`,
    "",
    `Découvrir notre méthode : ${methodUrl}`,
    "",
    "—",
    `Vous recevez ce message parce qu’une demande a été envoyée depuis ${site.url.replace("https://", "")} avec cette adresse. Si ce n’est pas vous, ignorez-le : aucune suite ne lui sera donnée.`,
    "SEYA LABS · Paris, France",
  ].join("\n");

  const recapRows = recap
    .map(
      ([label, value], index) => `
              <tr>
                <td style="padding:14px 0;${index ? `border-top:1px solid ${color.border};` : ""}font-family:${mono};font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:${color.muted};">${label}</td>
                <td align="right" style="padding:14px 0;${index ? `border-top:1px solid ${color.border};` : ""}font-family:${body};font-size:14px;color:${color.obsidian};font-weight:600;">${value}</td>
              </tr>`,
    )
    .join("");

  const stepRows = steps
    .map(
      ([n, title, detail]) => `
              <tr>
                <td valign="top" width="44" style="padding:0 0 18px;font-family:${mono};font-size:12px;color:${color.copper};font-weight:600;">${n}</td>
                <td valign="top" style="padding:0 0 18px;">
                  <div style="font-family:${display};font-size:16px;font-weight:600;color:${color.obsidian};letter-spacing:-.01em;">${title}</div>
                  <div style="font-family:${body};font-size:14px;line-height:1.55;color:${color.muted};padding-top:4px;">${detail}</div>
                </td>
              </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${subject}</title>
<style>
  @media (max-width: 480px) {
    .px { padding-left: 24px !important; padding-right: 24px !important; }
    .h1 { font-size: 26px !important; }
    .stack { display: block !important; width: 100% !important; text-align: left !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:${color.porcelain};-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Votre demande est entre les mains de l’équipe SEYA LABS. Référence ${reference}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${color.porcelain};">
  <tr>
    <td align="center" style="padding:40px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;">
        <tr>
          <td style="padding:0 4px 28px;">
            <a href="${site.url}" style="text-decoration:none;"><img src="${logoUrl}" width="170" height="40" alt="SEYA LABS" style="display:block;border:0;width:170px;height:40px;"></a>
          </td>
        </tr>
        <tr>
          <td style="background:${color.white};border:1px solid ${color.border};border-radius:2px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td style="height:4px;background:${color.copper};font-size:0;line-height:0;">&nbsp;</td></tr>
              <tr>
                <td class="px" style="padding:44px 40px 8px;">
                  <div style="font-family:${mono};font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${color.copperInk};">Demande reçue · ${reference}</div>
                  <h1 class="h1" style="margin:16px 0 0;font-family:${display};font-size:30px;line-height:1.15;font-weight:600;letter-spacing:-.03em;color:${color.obsidian};">Nous avons bien reçu votre demande.</h1>
                  <p style="margin:18px 0 0;font-family:${body};font-size:16px;line-height:1.6;color:${color.obsidian};">Merci de nous avoir écrit. Votre message est arrivé jusqu’à l’équipe&nbsp;; nous revenons vers vous directement par e-mail.</p>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:28px 40px 0;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${color.obsidian};border-bottom:1px solid ${color.obsidian};">${recapRows}
                  </table>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:36px 40px 4px;">
                  <div style="font-family:${mono};font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:${color.muted};padding-bottom:18px;">La suite</div>
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${stepRows}
                  </table>
                </td>
              </tr>
              <tr>
                <td class="px" style="padding:8px 40px 44px;">
                  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="background:${color.obsidian};border-radius:2px;">
                        <a href="${methodUrl}" style="display:inline-block;padding:15px 26px;font-family:${body};font-size:14px;font-weight:600;color:${color.porcelain};text-decoration:none;">Découvrir notre méthode&nbsp;&nbsp;→</a>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:24px 0 0;font-family:${body};font-size:14px;line-height:1.6;color:${color.muted};">Une précision à ajouter&nbsp;? Répondez simplement à ce message, en rappelant la référence <span style="font-family:${mono};color:${color.obsidian};">${reference}</span>.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 4px 0;">
            <p style="margin:0;font-family:${body};font-size:12px;line-height:1.6;color:${color.muted};">Vous recevez ce message parce qu’une demande a été envoyée depuis <a href="${site.url}" style="color:${color.muted};">${site.url.replace("https://", "")}</a> avec cette adresse. Si ce n’est pas vous, ignorez-le&nbsp;: aucune suite ne lui sera donnée.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;border-top:1px solid ${color.border};">
              <tr>
                <td class="stack" style="padding-top:16px;font-family:${mono};font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:${color.muted};">© ${new Date().getFullYear()} SEYA LABS · Paris, France</td>
                <td class="stack" align="right" style="padding-top:16px;font-family:${mono};font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:${color.copperInk};">Built with intent.</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  return { subject, html, text };
}
