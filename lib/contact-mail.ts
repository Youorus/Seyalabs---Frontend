import nodemailer from "nodemailer";
import { confirmationEmail, shortReference } from "@/lib/contact-confirmation";
import { emailBody, type ContactData } from "@/lib/contact-schema";

/**
 * Envoi d'une demande de contact par SMTP, vers la boîte de SEYA LABS.
 *
 * Le message part **de** la boîte authentifiée (OVH refuse un expéditeur
 * qu'il n'héberge pas, et le SPF du domaine ne couvre que ses serveurs),
 * avec le visiteur en `Reply-To` : répondre depuis la messagerie lui
 * écrit directement.
 *
 * Le visiteur reçoit ensuite un accusé de réception aux couleurs de la
 * marque (`contact-confirmation.ts`), qui ne reprend aucun texte libre.
 */

type Lead = Omit<ContactData, "website" | "startedAt">;

export function smtpConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!user || !pass) return null;
  return {
    host: process.env.SMTP_HOST || "ssl0.ovh.net",
    port: Number(process.env.SMTP_PORT || 587),
    user,
    pass,
    to: process.env.CONTACT_MAIL_TO || user,
  };
}

/** Remplaçable par les tests : aucun courriel réel ne part de `npm test`. */
export const mailer = {
  createTransport: (config: NonNullable<ReturnType<typeof smtpConfig>>) =>
    nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      requireTLS: config.port !== 465,
      auth: { user: config.user, pass: config.pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    }),
};

/** Un saut de ligne dans un objet de courriel n'a jamais de raison d'être. */
function oneLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export async function sendContactMail(lead: Lead, id: string) {
  const config = smtpConfig();
  if (!config) throw new Error("SMTP not configured");
  await mailer.createTransport(config).sendMail({
    from: { name: "SEYA LABS", address: config.user },
    to: config.to,
    replyTo: { name: oneLine(lead.name), address: lead.email },
    subject: oneLine(`Demande de contact — ${lead.projectType} — ${lead.company || lead.name} — ${shortReference(id)}`),
    text: `${emailBody({ ...lead, website: "", startedAt: 0 })}\n\n— Envoyé depuis seyalabs.com, référence ${shortReference(id)} (${id})`,
    headers: { "X-Seya-Lead-Id": id },
  });
}

/**
 * L'accusé de réception, vers l'adresse saisie par le visiteur.
 *
 * `Auto-Submitted` (RFC 3834) dit aux répondeurs automatiques de ne pas
 * répondre à une réponse automatique : sans lui, deux messageries en
 * congés peuvent se renvoyer la balle sans fin. Une réponse du visiteur
 * revient sur la boîte de contact.
 */
export async function sendConfirmationMail(lead: Lead, id: string) {
  const config = smtpConfig();
  if (!config) throw new Error("SMTP not configured");
  const { subject, html, text } = confirmationEmail(lead, id);
  await mailer.createTransport(config).sendMail({
    from: { name: "SEYA LABS", address: config.user },
    to: lead.email,
    replyTo: config.to,
    subject,
    text,
    html,
    headers: { "Auto-Submitted": "auto-replied", "X-Auto-Response-Suppress": "All", "X-Seya-Lead-Id": id },
  });
}
