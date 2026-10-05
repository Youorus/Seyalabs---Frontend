import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Container, SectionLabel } from "@/components/ui/primitives";
import type { ServiceGuidance as Guidance } from "@/data/service-guidance";
import { articles } from "@/data/articles";

export function ServiceGuidance({ guide }: { guide: Guidance }) {
  return <>
    <section className="section service-decisions"><Container>
      <SectionLabel>CHOISIR LE PÉRIMÈTRE</SectionLabel>
      <h2>Les décisions avant le développement.</h2>
      <div className="guidance-grid">{guide.decisions.map((item) => <div key={item.title}><h3>{item.title}</h3><p>{item.description}</p></div>)}</div>
      <p className="guidance-tradeoff">{guide.tradeoff}</p>
    </Container></section>
    <section className="section"><Container>
      <div className="editorial-grid"><div><SectionLabel>PRÉPARER LE CADRAGE</SectionLabel><h2>Les informations<br />qui font avancer.</h2></div>
        <dl className="guidance-dependencies">{guide.dependencies.map((item) => <div key={item.title}><dt>{item.title}</dt><dd>{item.description}</dd></div>)}</dl>
      </div>
      <div className="guidance-acceptance"><h3>Comment vérifier la version livrée ?</h3><p>Les scénarios de recette sont précisés avec vous. Ils peuvent notamment couvrir les points suivants.</p>
        <ul>{guide.acceptance.map((item) => <li key={item}><Check size={18} aria-hidden="true" /><span>{item}</span></li>)}</ul>
      </div>
    </Container></section>
    <section className="section service-reading"><Container>
      <div className="editorial-grid"><div><SectionLabel>PRÉPARER VOTRE PROJET</SectionLabel><h2>Des réponses<br />avant le devis.</h2><p>Des guides pour comparer les options, poser le périmètre et préparer les bonnes questions.</p></div>
        <nav className="reading-links" aria-label="Guides pour préparer ce projet">{guide.articles.map((slug) => {
          const article = articles.find((item) => item.slug === slug);
          return article && <Link href={`/insights/${slug}`} key={slug}><span>{article.seoTitle}</span><ArrowUpRight size={20} aria-hidden="true" /></Link>;
        })}</nav>
      </div>
    </Container></section>
  </>;
}
