import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/page-hero";
import { Container, SectionLabel, JsonLd, Tag } from "@/components/ui/primitives";
import { FinalCta } from "@/components/sections/final-cta";
import { publishedProjects } from "@/data/projects";
import { pageMetadata, breadcrumbs } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return publishedProjects.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = publishedProjects.find((item) => item.slug === slug); if (!project) notFound();
  return pageMetadata(project.title, project.description, `/realisations/${slug}`);
}
export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const project = publishedProjects.find((item) => item.slug === slug); if (!project) notFound();
  return <><PageHero title={project.title} description={project.description} label={`${project.category} / ${project.client}`} breadcrumb={[{ name: "Réalisations", href: "/realisations" }, { name: project.title }]} /><section className="section"><Container>{project.image && <Image {...project.image} alt={project.image.alt} className="case-image" sizes="(max-width: 767px) 100vw, 90vw" />}{[{ label: "LE CONTEXTE", text: project.context }, { label: "LE PROBLÈME", text: project.problem }, { label: "LA SOLUTION", text: project.solution }, { label: "LE RÉSULTAT", text: project.result }].map((section) => <div className="case-section" key={section.label}><SectionLabel>{section.label}</SectionLabel><p>{section.text}</p></div>)}<div className="service-tech">{project.technologies.map((tech) => <Tag key={tech}>{tech}</Tag>)}</div>{project.testimonial && <blockquote className="testimonial"><p>« {project.testimonial.quote} »</p><cite>{project.testimonial.name}, {project.testimonial.role}</cite></blockquote>}</Container></section><FinalCta /><JsonLd data={breadcrumbs([{ name: "Réalisations", path: "/realisations" }, { name: project.title, path: `/realisations/${slug}` }])} /></>;
}
