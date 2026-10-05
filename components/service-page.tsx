import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container, SectionLabel, Tag, JsonLd } from "@/components/ui/primitives";
import { FinalCta } from "@/components/sections/final-cta";
import { services, type Service } from "@/data/services";
import { serviceGuidance } from "@/data/service-guidance";
import { ServiceGuidance } from "@/components/sections/service-guidance";
import { processSteps } from "@/data/process";
import { breadcrumbs, faqSchema, serviceSchema } from "@/lib/seo";
import { trainings } from "@/data/trainings";

export function ServicePage({ service }: { service: Service }) {
  const group = service.kind === "expertises" ? "Expertises" : "Solutions";
  const path = `/${service.kind}/${service.slug}`;
  const related = services.filter((item) => service.related.includes(item.slug));
  const guide = serviceGuidance[service.slug];
  const training = trainings.find((item) => service.kind === "expertises" ? item.slug === service.slug : item.relatedSolution === service.slug);
  return <>
    <PageHero title={service.title} description={service.intro} label={service.label} number={service.number} breadcrumb={[{ name: group, href: `/${service.kind}` }, { name: service.name }]} cta />
    <section className="section service-problem"><Container><div className="section-heading-side"><SectionLabel number="01">LE BESOIN</SectionLabel><div><h2>{guide?.heading || service.problemTitle}</h2><p>{guide?.definition || service.problem}</p><div className="outcome-list">{service.outcomes.map((outcome) => <div key={outcome}><Check size={18} aria-hidden="true" /><span>{outcome}</span></div>)}</div></div></div></Container></section>
    <section className="section usecases-section"><Container><SectionLabel number="02">CAS D’USAGE</SectionLabel><h2>Des applications concrètes.</h2><div className="usecase-grid">{service.useCases.map((useCase, i) => <div key={useCase.title}><span className="mono">0{i + 1} /</span><h3>{useCase.title}</h3><p>{useCase.description}</p></div>)}</div></Container></section>
    <section className="section"><Container><div className="deliverables-grid"><div><SectionLabel number="03">DE LA CONCEPTION À L’USAGE</SectionLabel><h2>Ce que nous<br />construisons ensemble.</h2><div className="service-tech">{service.technologies.map((tech) => <Tag key={tech}>{tech}</Tag>)}</div></div><ol className="deliverables">{service.deliverables.map((deliverable, i) => <li key={deliverable}><span className="mono">0{i + 1}</span><span>{deliverable}</span></li>)}</ol></div></Container></section>
    {guide && <ServiceGuidance guide={guide} />}
    <section className="section service-method"><Container><SectionLabel>UNE MÉTHODE PARTAGÉE</SectionLabel><h2>Avancer avec des repères.</h2><div className="mini-process">{processSteps.map((step) => <div key={step.number}><span className="mono">{step.number} / {step.label}</span><h3>{step.title}</h3><p>{step.description}</p></div>)}</div><Link href="/methode" className="link-arrow">Notre méthode de travail<ArrowUpRight size={18} aria-hidden="true" /></Link></Container></section>
    <section className="section faq-section"><Container><div className="faq-grid"><div><SectionLabel>QUESTIONS FRÉQUENTES</SectionLabel><h2>Avant de<br />commencer.</h2></div><div className="faq-list">{service.faq.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></Container></section>
    <section className="section related-section"><Container><SectionLabel>POUR ALLER PLUS LOIN</SectionLabel><div className="related-links">{related.map((item) => <Link href={`/${item.kind}/${item.slug}`} key={item.slug}>{item.name}<ArrowUpRight size={21} aria-hidden="true" /></Link>)}</div>{training && <div className="service-training-link"><p>Vous souhaitez développer les compétences de votre équipe dans ce domaine ?</p><Link href={`/formations/${training.slug}`} className="link-arrow">Formation : {training.name}<ArrowUpRight size={18} aria-hidden="true" /></Link></div>}</Container></section>
    <FinalCta /><JsonLd data={breadcrumbs([{ name: group, path: `/${service.kind}` }, { name: service.name, path }])} /><JsonLd data={serviceSchema(service.name, service.description, path)} /><JsonLd data={faqSchema(service.faq)} />
  </>;
}
