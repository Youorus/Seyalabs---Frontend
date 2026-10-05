import type { Metadata } from "next";
import { site } from "@/lib/site";
import type { Training } from "@/data/trainings";

export function robotsMetadata(noindex = false): Metadata["robots"] {
  const index = site.indexable && !noindex;
  return { index, follow: true, googleBot: { index, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } };
}

export function pageMetadata(title: string, description: string, path: string, noindex = false): Metadata {
  const url = new URL(path, site.url).href;
  const fullTitle = `${title} | SEYA LABS`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "fr_FR", siteName: site.name, title: fullTitle, description, url,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "SEYA LABS — Software × AI × Automation" }] },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: ["/opengraph-image"] },
    robots: robotsMetadata(noindex),
  };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [{ name: "Accueil", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem", position: i + 1, name: item.name, item: new URL(item.path, site.url).href,
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return { "@context": "https://schema.org", "@type": "Service", name, description,
    url: new URL(path, site.url).href, provider: { "@id": `${site.url}/#organization` }, areaServed: { "@type": "Country", name: "France" } };
}

export function faqSchema(faq: { question: string; answer: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map(({ question, answer }) => ({
    "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer },
  })) };
}

export function courseSchema(training: Training) {
  return { "@context": "https://schema.org", "@type": "Course", "@id": `${site.url}/formations/${training.slug}#course`,
    name: training.name, description: training.description, url: `${site.url}/formations/${training.slug}`, inLanguage: "fr",
    provider: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name, url: site.url },
    teaches: training.objectives, coursePrerequisites: training.prerequisites };
}
