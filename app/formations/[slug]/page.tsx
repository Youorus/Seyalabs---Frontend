import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container, SectionLabel, JsonLd, Tag, Button, LinkArrow } from "@/components/ui/primitives";
import { TrainingCta } from "@/components/training-cta";
import { trainings, trainingContactHref } from "@/data/trainings";
import { services } from "@/data/services";
import { pageMetadata, breadcrumbs, courseSchema } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() { return trainings.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = trainings.find((item) => item.slug === slug);
  if (!training) notFound();
  return pageMetadata(training.seoTitle, training.description, `/formations/${slug}`);
}

export default async function TrainingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const training = trainings.find((item) => item.slug === slug);
  if (!training) notFound();
  const expertise = services.find((item) => item.kind === "expertises" && item.slug === training.relatedExpertise);
  const solution = services.find((item) => item.kind === "solutions" && item.slug === training.relatedSolution);
  const relatedTrainings = trainings.filter((item) => item.slug !== slug && item.relatedExpertise === training.relatedExpertise).slice(0, 2);
  return <>
    <PageHero title={training.title} description={training.intro} label="FORMATION / PROGRAMME ADAPTABLE" number={training.number} breadcrumb={[{ name: "Formations", href: "/formations" }, { name: training.name }]} />
    <section className="section"><Container><div className="editorial-grid">
      <div><SectionLabel>VOTRE PARCOURS</SectionLabel><h2 className="course-name">{training.name}</h2><div className="service-tech">{training.tools.map((tool) => <Tag key={tool}>{tool}</Tag>)}</div><Button variant="dark" href={trainingContactHref(training)}>Demander cette formation</Button></div>
      <div className="training-audience"><h3>Pour qui ?</h3><p>{training.audience}</p><h3>Les prérequis.</h3><p>{training.prerequisites}</p><h3>Le format et le calendrier.</h3><p>Le programme, la durée, le nombre de participants, les modalités et le tarif sont définis après cadrage. Les modules sont ajustés au niveau du groupe et au temps disponible.</p></div>
    </div></Container></section>
    <section className="section training-objectives"><Container><div className="editorial-grid">
      <div><SectionLabel>LES OBJECTIFS PÉDAGOGIQUES</SectionLabel><h2>Ce que vous saurez<br />mettre en pratique.</h2></div>
      <ul className="training-objective-list">{training.objectives.map((objective) => <li key={objective}><Check size={20} aria-hidden="true" /><span>{objective}</span></li>)}</ul>
    </div></Container></section>
    <section className="section"><Container><SectionLabel>LE PROGRAMME / BASE DE TRAVAIL</SectionLabel><h2>Des modules.<br />Un fil conducteur.</h2>
      <ol className="training-modules">{training.modules.map((module, index) => <li key={module.title}><span className="mono">0{index + 1}</span><div><h3>{module.title}</h3><p>{module.description}</p></div></li>)}</ol>
    </Container></section>
    <section className="section training-workshop"><Container><div className="editorial-grid">
      <div><SectionLabel>LA PRATIQUE</SectionLabel><h2>{training.workshop.title}</h2></div>
      <div><p>{training.workshop.description}</p><h3>Les éléments produits pendant l’atelier.</h3><ul>{training.workshop.outputs.map((output) => <li key={output}>{output}</li>)}</ul><p>Les exercices et les échanges permettent de vérifier les compétences travaillées. Les supports et livrables sont précisés dans le parcours convenu.</p></div>
    </div></Container></section>
    <section className="section"><Container><SectionLabel>ALLER PLUS LOIN</SectionLabel><div className="related-links">
      {solution && <LinkArrow href={`/solutions/${solution.slug}`}>Faire réaliser votre projet : {solution.name.toLowerCase()}</LinkArrow>}
      {expertise && <LinkArrow href={`/expertises/${expertise.slug}`}>Notre expertise en {expertise.name.toLowerCase()}</LinkArrow>}
      {relatedTrainings.map((item) => <LinkArrow href={`/formations/${item.slug}`} key={item.slug}>Formation {item.name.toLowerCase()}</LinkArrow>)}
      <LinkArrow href={`/formations#${training.relatedExpertise}`}>Tous les programmes de ce domaine</LinkArrow>
    </div></Container></section>
    <TrainingCta training={training} />
    <JsonLd data={breadcrumbs([{ name: "Formations", path: "/formations" }, { name: training.name, path: `/formations/${slug}` }])} />
    <JsonLd data={courseSchema(training)} />
  </>;
}
