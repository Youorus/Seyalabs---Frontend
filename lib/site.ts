const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://seyalabs.com";
export const site = {
  name: "SEYA LABS",
  url: new URL(configuredUrl).origin,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@seyalabs.com",
  description: "Applications métier, intelligence artificielle et automatisation conçues autour de vos processus. SEYA LABS accompagne les entreprises du cadrage à la production.",
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
