import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container, SectionLabel, JsonLd, Button } from "@/components/ui/primitives";
import { TrainingCta } from "@/components/training-cta";
import { trainings, trainingFamilies, trainingContactHref, trainingFaq } from "@/data/trainings";
import { pageMetadata, breadcrumbs, faqSchema } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata("Formations : logiciel, IA, automatisation et data", "Formez vos équipes au développement logiciel, à l’IA, à l’automatisation et à la data/API. Des programmes pratiques adaptés à vos niveaux et à vos objectifs.", "/formations");

export default function Formations() {
  const catalogue = trainingFamilies.flatMap((family) => trainings.filter((training) => training.relatedExpertise === family.slug));
  return <>
    <PageHero title="Comprendre. Pratiquer. Devenir autonome." description="Les mêmes domaines d’expertise, transmis à vos équipes. Des formations en logiciel, intelligence artificielle, automatisation et data/API, construites autour de vos objectifs et de cas concrets." label="FORMATIONS / SEYA LABS" breadcrumb={[{ name: "Formations" }]} />
    <section className="section training-intro"><Container><div className="editorial-grid">
      <div><SectionLabel>UNE FORMATION UTILE AU MÉTIER</SectionLabel><h2>Des repères.<br />Et de la pratique.</h2></div>
      <div><p>Comprendre une architecture, construire un workflow, vérifier une réponse IA ou préparer une intégration : chaque parcours vise des compétences que votre équipe peut mettre en pratique.</p><p>Nous précisons le niveau de départ, les outils et les objectifs avant de choisir les modules. Les programmes ci-dessous sont des bases à adapter à votre contexte.</p><Button variant="dark" href={trainingContactHref()}>Définir notre parcours</Button></div>
    </div></Container></section>
    <section className="section training-catalogue"><Container>
      <SectionLabel>{`${trainingFamilies.length} DOMAINES / ${trainings.length} PROGRAMMES`}</SectionLabel><h2>Choisir votre formation.</h2>
      <p className="training-catalogue-intro">Un parcours de fondations pour comprendre le domaine, ou un programme appliqué pour travailler un projet précis.</p>
      <nav className="training-family-nav" aria-label="Accès aux domaines de formation">{trainingFamilies.map((family) => <Link href={`#${family.slug}`} key={family.slug}>{family.name}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</nav>
      {trainingFamilies.map((family) => <section className="training-family" id={family.slug} aria-labelledby={`family-${family.slug}`} key={family.slug}>
        <div className="training-family-heading"><h3 id={`family-${family.slug}`}>{family.name}</h3><p>{family.description}</p></div>
        <div className="training-grid">{catalogue.filter((training) => training.relatedExpertise === family.slug).map((training) => <article className="training-card" key={training.slug}>
          <span className="mono">{training.number} / {training.relatedSolution ? "PARCOURS APPLIQUÉ" : "FONDATIONS"}</span><h4>{training.name}</h4><p>{training.intro}</p>
          <div className="training-card-objectives"><span className="mono">CE QUE VOUS APPRENDREZ</span><ul>{training.objectives.slice(0, 3).map((objective) => <li key={objective}>{objective}</li>)}</ul></div>
          <Link className="link-arrow" href={`/formations/${training.slug}`}><span>Voir le programme</span><ArrowUpRight size={18} aria-hidden="true" /></Link>
        </article>)}</div>
      </section>)}
    </Container></section>
    <section className="section"><Container><SectionLabel>UN PARCOURS EN TROIS TEMPS</SectionLabel><h2>Du besoin à la pratique.</h2>
      <div className="guidance-grid">{[
        { title: "01 / Cadrer", description: "Identifier les participants, leur niveau, les usages visés et les outils disponibles. Définir les objectifs, les modalités et le périmètre avant la session." },
        { title: "02 / Pratiquer", description: "Alterner explications, démonstrations et exercices adaptés. Travailler avec des données pédagogiques ou des exemples dont l’usage est autorisé." },
        { title: "03 / Vérifier", description: "Revoir les exercices, expliquer les choix et vérifier les compétences travaillées. Repartir avec les supports et les éléments produits dans le parcours convenu." }
      ].map((step) => <div key={step.title}><h3>{step.title}</h3><p>{step.description}</p></div>)}</div>
    </Container></section>
    <section className="section faq-section"><Container><div className="faq-grid"><div><SectionLabel>QUESTIONS FRÉQUENTES</SectionLabel><h2>Préparer votre<br />formation.</h2></div><div className="faq-list">{trainingFaq.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></div></Container></section>
    <TrainingCta />
    <JsonLd data={breadcrumbs([{ name: "Formations", path: "/formations" }])} />
    <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Formations SEYA LABS", numberOfItems: catalogue.length, itemListElement: catalogue.map((training, index) => ({ "@type": "ListItem", position: index + 1, name: training.name, url: `${site.url}/formations/${training.slug}` })) }} />
    <JsonLd data={faqSchema(trainingFaq)} />
  </>;
}
