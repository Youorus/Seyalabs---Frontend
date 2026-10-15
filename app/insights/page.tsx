import { PageHero } from "@/components/page-hero";
import { Container, JsonLd, SectionLabel, LinkArrow } from "@/components/ui/primitives";
import { ArticleCards } from "@/components/sections/article-cards";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata, breadcrumbs } from "@/lib/seo";
import { articles } from "@/data/articles";
import { AutomationResource } from "@/components/sections/automation-resource";

export const metadata = pageMetadata("Guides pour comprendre le logiciel, l’IA et l’automatisation", "Particuliers curieux et entreprises : découvrez le logiciel, l’IA et l’automatisation avec des guides en accès libre, des exemples et des ressources pratiques.", "/insights");
export default function Insights() {
  return <>
    <PageHero title="Guides logiciel, IA et automatisation." description="Pour les particuliers curieux comme pour les entreprises : comprendre les notions, explorer des exemples et préparer un projet. Nos guides et ressources sont en accès libre." label="INSIGHTS / GUIDES & NOTES" breadcrumb={[{ name: "Insights" }]} />
    <section className="section" id="decouvrir"><Container>
      <div className="section-heading"><div><SectionLabel>POUR COMMENCER / DÉCOUVRIR SANS JARGON</SectionLabel><h2>La curiosité est<br />un bon point de départ.</h2></div><p className="section-intro">Vous découvrez ces sujets ? Commencez par les notions, essayez une ressource ou explorez les formations selon votre envie d’apprendre.</p></div>
      <div className="usecase-grid discovery-paths">{[
        { title: "Comprendre les bases", description: "Logiciel, IA, automatisation : un guide avec des exemples du quotidien et un premier exercice sans programmation.", href: "/insights/ia-automatisation-logiciel-differences", label: "Lire le guide pour débuter" },
        { title: "Essayer un outil", description: "Explorez le calculateur gratuit avec ses exemples fictifs, puis modifiez les hypothèses pour comprendre le résultat.", href: "/outils/calculateur-automatisation", label: "Essayer le calculateur" },
        { title: "Choisir un parcours", description: "Vous souhaitez être accompagné ? Consultez les programmes et leurs prérequis, puis précisez votre objectif et votre niveau.", href: "/formations", label: "Explorer les formations" }
      ].map((item) => <div key={item.href}><h3>{item.title}</h3><p>{item.description}</p><LinkArrow href={item.href}>{item.label}</LinkArrow></div>)}</div>
    </Container></section>
    <section className="section"><Container>
      <div className="section-heading"><div><SectionLabel>DOSSIER / LOGICIELS MÉTIER</SectionLabel><h2>Préparer votre<br />application métier.</h2></div><div className="section-intro"><p>Choisir, cadrer, estimer et organiser la transition.</p><LinkArrow href="/solutions/application-metier">Notre offre application métier</LinkArrow></div></div>
      <ArticleCards items={articles.filter((article) => article.category === "Software")} />
    </Container></section>
    <section className="section principles-section"><Container>
      <SectionLabel>IA, AUTOMATISATION & API</SectionLabel><h2 className="guides-heading">Connecter les outils.<br />Garder les bons contrôles.</h2>
      <ArticleCards items={articles.filter((article) => article.category !== "Software" && article.category !== "Découverte")} />
      <AutomationResource />
    </Container></section>
    <FinalCta /><JsonLd data={breadcrumbs([{ name: "Insights", path: "/insights" }])} />
  </>;
}
