import { PageHero } from "@/components/page-hero";
import { Container, JsonLd, SectionLabel, LinkArrow } from "@/components/ui/primitives";
import { ArticleCards } from "@/components/sections/article-cards";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata, breadcrumbs } from "@/lib/seo";
import { articles } from "@/data/articles";

export const metadata = pageMetadata("Guides : applications métier, logiciels et IA", "SaaS ou sur-mesure, budget, cahier des charges et migration : des guides pratiques pour préparer une application métier, une automatisation ou un assistant IA.", "/insights");
export default function Insights() {
  return <>
    <PageHero title="Comprendre pour mieux construire." description="Des guides pratiques pour poser les bonnes questions avant de choisir un logiciel, cadrer une application métier ou relier vos outils." label="INSIGHTS / GUIDES & NOTES" breadcrumb={[{ name: "Insights" }]} />
    <section className="section"><Container>
      <div className="section-heading"><div><SectionLabel>DOSSIER / LOGICIELS MÉTIER</SectionLabel><h2>Préparer votre<br />application métier.</h2></div><div className="section-intro"><p>Choisir, cadrer, estimer et organiser la transition.</p><LinkArrow href="/solutions/application-metier">Notre offre application métier</LinkArrow></div></div>
      <ArticleCards items={articles.filter((article) => article.category === "Software")} />
    </Container></section>
    <section className="section principles-section"><Container>
      <SectionLabel>IA & AUTOMATISATION</SectionLabel><h2 className="guides-heading">Connecter les outils.<br />Garder les bons contrôles.</h2>
      <ArticleCards items={articles.filter((article) => article.category !== "Software")} />
    </Container></section>
    <FinalCta /><JsonLd data={breadcrumbs([{ name: "Insights", path: "/insights" }])} />
  </>;
}
