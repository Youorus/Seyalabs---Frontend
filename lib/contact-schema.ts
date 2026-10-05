import { z } from "zod";

export const projectTypes = ["Application métier", "Plateforme web/mobile", "Produit SaaS", "Intelligence artificielle", "Automatisation", "Data / API", "MVP", "Formation", "Autre"] as const;
export type ProjectType = (typeof projectTypes)[number];
export const budgets = ["Moins de 3 000 €", "3 000 – 10 000 €", "10 000 – 25 000 €", "25 000 € et plus", "À définir"] as const;
export const timelines = ["Urgent", "1–2 mois", "3–6 mois", "Exploration"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom (au moins 2 caractères).").max(100, "Votre nom est trop long."),
  company: z.string().trim().min(2, "Indiquez votre entreprise.").max(150, "Le nom de l’entreprise est trop long."),
  email: z.string().trim().max(254).pipe(z.email("Indiquez une adresse email valide.")),
  phone: z.string().trim().max(30, "Le numéro est trop long.").refine((value) => !value || (/^[+\d\s().-]{7,30}$/.test(value) && /\d/.test(value)), "Vérifiez le numéro de téléphone.").default(""),
  projectType: z.enum(projectTypes, { error: "Choisissez un type de demande." }),
  budget: z.enum(budgets, { error: "Choisissez un budget indicatif." }),
  timeline: z.enum(timelines, { error: "Choisissez votre horizon de lancement." }),
  message: z.string().trim().min(20, "Décrivez votre besoin en au moins 20 caractères.").max(5000, "Limitez votre description à 5 000 caractères."),
  consent: z.literal(true, { error: "Confirmez que nous pouvons utiliser ces informations pour vous répondre." }),
  website: z.string().max(200).default(""),
  startedAt: z.number().int().positive(),
});
export type ContactData = z.infer<typeof contactSchema>;

export function emailBody(data: ContactData) {
  return `Bonjour SEYA LABS,\n\n${data.message}\n\nNom : ${data.name}\nEntreprise : ${data.company}\nEmail : ${data.email}\nTéléphone : ${data.phone || "Non renseigné"}\nType de demande : ${data.projectType}\nBudget indicatif : ${data.budget}\nHorizon : ${data.timeline}\n\nJ’ai pris connaissance de la politique de confidentialité.`;
}
