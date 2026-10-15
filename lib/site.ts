const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seyalabs.com";
export const site = {
  name: "SEYA LABS",
  url: new URL(configuredUrl).origin,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@seyalabs.com",
  description: "SEYA LABS conçoit des logiciels métier, de l’IA et des automatisations pour les PME françaises, et partage guides, outils et formations pour les particuliers curieux.",
  indexable: process.env.SITE_INDEXABLE === "true",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
};

export const navigation = [
  { label: "Expertises", href: "/expertises" },
  { label: "Solutions", href: "/solutions" },
  { label: "Formations", href: "/formations" },
  { label: "Réalisations", href: "/realisations" },
  { label: "Méthode", href: "/methode" },
  { label: "À propos", href: "/a-propos" },
  { label: "Insights", href: "/insights" },
];
