import { services } from "@/data/services";
import type { ProjectType } from "@/lib/contact-schema";

const types: Record<string, ProjectType> = {
  "developpement-logiciel": "Application métier", "application-metier": "Application métier",
  "plateformes-web-mobile": "Plateforme web/mobile", saas: "Produit SaaS", mvp: "MVP",
  "intelligence-artificielle": "Intelligence artificielle", "assistant-ia": "Intelligence artificielle", "agents-ia": "Intelligence artificielle",
  automatisation: "Automatisation", "automatisation-workflows": "Automatisation",
  "data-api": "Data / API", "integration-api": "Data / API",
};

export function serviceEnquiry(slug: unknown) {
  if (typeof slug !== "string") return undefined;
  const service = services.find((item) => item.slug === slug);
  if (!service || !Object.hasOwn(types, slug)) return undefined;
  return { service, projectType: types[slug], message: `Je souhaite échanger sur votre prestation « ${service.name} ».\n\nNotre contexte :\nLes outils concernés :\nCe que nous voulons améliorer :\n` };
}
