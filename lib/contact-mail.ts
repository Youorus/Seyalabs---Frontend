import nodemailer from "nodemailer";
import { emailBody, type ContactData } from "@/lib/contact-schema";

/**
 * Envoi d'une demande de contact par SMTP, vers la boîte de SEYA LABS.
 *
 * Le message part **de** la boîte authentifiée (OVH refuse un expéditeur
 * qu'il n'héberge pas, et le SPF du domaine ne couvre que ses serveurs),
 * avec le visiteur en `Reply-To` : répondre depuis la messagerie lui
 * écrit directement.
 *
 * Aucun accusé de réception n'est envoyé au visiteur : le formulaire
 * deviendrait un relais capable d'écrire à n'importe quelle adresse saisie.
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
    from: { name: "Site SEYA LABS", address: config.user },
    to: config.to,
    replyTo: { name: oneLine(lead.name), address: lead.email },
    subject: oneLine(`Demande de contact — ${lead.projectType} — ${lead.company}`),
    text: `${emailBody({ ...lead, website: "", startedAt: 0 })}\n\n— Envoyé depuis seyalabs.com, référence ${id}`,
    headers: { "X-Seya-Lead-Id": id },
  });
}
