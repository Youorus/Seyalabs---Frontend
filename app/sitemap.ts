import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { services } from "@/data/services";
import { articles } from "@/data/articles";
import { publishedProjects } from "@/data/projects";
import { trainings } from "@/data/trainings";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/expertises", "/solutions", "/formations", "/methode", "/a-propos", "/contact", "/insights", ...(publishedProjects.length ? ["/realisations"] : [])];
  return [
    ...paths.map((path) => ({ url: new URL(path, site.url).href })),
    ...services.map((service) => ({ url: `${site.url}/${service.kind}/${service.slug}` })),
    ...trainings.map((training) => ({ url: `${site.url}/formations/${training.slug}` })),
    ...articles.map((article) => ({ url: `${site.url}/insights/${article.slug}`, lastModified: new Date(`${article.updatedAt || article.date}T10:00:00+02:00`) })),
    ...publishedProjects.map((project) => ({ url: `${site.url}/realisations/${project.slug}`, lastModified: new Date(project.publishedAt) })),
  ];
}
