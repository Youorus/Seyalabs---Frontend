import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { Container, SectionLabel, Button, LinkArrow } from "@/components/ui/primitives";
import { SystemFlow } from "@/components/sections/system-flow";
import { ExpertiseGrid } from "@/components/sections/expertise-grid";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { FinalCta } from "@/components/sections/final-cta";
import { ArticleCards } from "@/components/sections/article-cards";
import { TrainingSection } from "@/components/sections/training-section";
import { solutions } from "@/data/services";
import { principles } from "@/data/process";
import { publishedProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Logiciels sur mesure, IA et automatisation", "SEYA LABS conçoit des applications métier, des solutions d’intelligence artificielle et des automatisations pour les entreprises. Du cadrage à la production.", "/");

export default function Home() {
  return <>
    <section className="hero"><Container>
      <div className="hero-topline mono"><span><i className="status-dot" /> SOFTWARE × AI × AUTOMATION</span><span>INGÉNIERIE NUMÉRIQUE / PARIS</span></div>
      <div className="hero-grid"><div className="hero-copy"><h1>La technologie.<br />À la mesure de<br /><span>votre entreprise.</span></h1><p>Logiciels et applications métier sur mesure, intelligence artificielle et automatisation conçus autour de vos processus.<br className="desktop-break" /> Du cadrage à la mise en production.</p><div className="hero-actions"><Button event="hero_cta_click">Démarrer un projet</Button><LinkArrow href="/expertises/developpement-logiciel">Nos logiciels sur mesure</LinkArrow></div><p className="hero-audience mono">POUR LES ENTREPRISES QUI VEULENT AVANCER.</p></div><SystemFlow /></div>
      <div className="hero-bottom"><a href="#pourquoi" className="mono">DÉCOUVRIR SEYA LABS <ArrowDown size={15} aria-hidden="true" /></a><span className="mono">DU BESOIN AU SYSTÈME.</span></div>
    </Container></section>
    <div className="capabilities-strip"><Container>{["Logiciels sur mesure", "Intelligence artificielle", "Automatisation", "Data & API"].map((text, i) => <span key={text}><span className="mono">0{i + 1}</span>{text}</span>)}</Container></div>
    <section id="pourquoi" className="section manifesto"><Container><div className="section-heading-side"><SectionLabel number="01">POURQUOI SEYA</SectionLabel><div><h2>Votre entreprise ne devrait pas<br className="desktop-break" /> s’adapter à ses outils.<br /><span>Ses outils devraient<br className="desktop-break" /> s’adapter à elle.</span></h2><div className="manifesto-bottom"><p>Des processus complexes, des informations dispersées, des tâches qui se répètent. Nous les transformons en systèmes numériques clairs, conçus autour de vos équipes et de vos objectifs.</p><span className="mono">LE MÉTIER D’ABORD.<br />LA TECHNOLOGIE ENSUITE.</span></div></div></div></Container></section>
    <section className="section expertise-section"><Container><div className="section-heading"><div><SectionLabel number="02">EXPERTISES</SectionLabel><h2>De l’idée<br />à la production<span className="copper">.</span></h2></div><div className="section-intro"><p>Quatre expertises. Une même exigence :<br />construire ce qui sert votre activité.</p><LinkArrow href="/expertises">Toutes nos expertises</LinkArrow></div></div><ExpertiseGrid /></Container></section>
    <section className="section solutions-section"><Container><div className="section-heading"><div><SectionLabel number="03">SOLUTIONS</SectionLabel><h2>Un besoin concret.<br />La bonne réponse.</h2></div><p className="section-intro">Partir de ce qui freine votre activité.<br />Construire ce qui la fait avancer.</p></div><div className="solutions-list">{solutions.map((solution) => <Link className="solution-row" href={`/solutions/${solution.slug}`} key={solution.slug}><span className="mono solution-number">{solution.number}</span><h3>{solution.name}</h3><p>{solution.intro.split('. ')[0]}.</p><ArrowUpRight aria-hidden="true" size={25} /></Link>)}</div></Container></section>
    <section className="section method-section"><Container><div className="section-heading"><div><SectionLabel number="04">MÉTHODE</SectionLabel><h2>Un chemin clair.<br />Un système en production.</h2></div><div className="section-intro"><p>Des décisions expliquées. Des versions testables.<br />Votre équipe impliquée à chaque étape.</p><LinkArrow href="/methode">Découvrir notre méthode</LinkArrow></div></div><ProcessTimeline /></Container></section>
    <section className="section work-section"><Container><div className="work-grid"><div><SectionLabel number="05">RÉALISATIONS</SectionLabel><h2>Le sérieux se voit<br />dans les détails.</h2><p>Un système se juge sur ses usages, ses contraintes et son fonctionnement au quotidien. C’est ainsi que nous documentons nos projets.</p><LinkArrow href="/realisations">Notre approche des réalisations</LinkArrow></div><div className="work-spec"><div className="work-spec-top mono"><span>PROJECT DOCUMENTATION</span><span>SEYA / STANDARD</span></div>{["Le contexte et le problème métier", "Les choix et la solution construite", "L’usage réel et les enseignements"].map((text, i) => <div key={text}><span className="mono">0{i + 1}</span><span>{text}</span><Check size={17} aria-hidden="true" /></div>)}<p className="mono">{publishedProjects.length ? `${publishedProjects.length} PROJET(S) DOCUMENTÉ(S)` : "LES CAS PROJETS SERONT PUBLIÉS ICI."}</p></div></div></Container></section>
    <section className="section engineering-section"><Container><div className="section-heading"><div><SectionLabel number="06">ENGINEERING</SectionLabel><h2>Des choix techniques.<br />Une raison pour chacun.</h2></div><p className="section-intro">La stack suit le besoin, les contraintes<br />et la vie du produit après le lancement.</p></div><div className="technology-grid">{["Python", "FastAPI", "Next.js", "React", "PostgreSQL", "Docker", "Redis", "Qdrant", "OpenAI", "Anthropic", "Mistral", "n8n"].map((tech) => <span key={tech}>{tech}<span aria-hidden="true">↗</span></span>)}</div></Container></section>
    <section className="section principles-section"><Container><div className="section-heading"><div><SectionLabel number="07">L’EXIGENCE SEYA</SectionLabel><h2>Construire aujourd’hui.<br />Penser à la suite.</h2></div><LinkArrow href="/a-propos">À propos de SEYA LABS</LinkArrow></div><div className="principles-grid">{principles.map((principle) => <div key={principle.label}><span className="mono">{principle.label}</span><h3>{principle.title}</h3><p>{principle.description}</p></div>)}</div></Container></section>
    <TrainingSection />
    <section className="section insights-section"><Container><div className="section-heading"><div><SectionLabel number="08">INSIGHTS</SectionLabel><h2>Avant de construire,<br />comprendre.</h2></div><LinkArrow href="/insights">Toutes nos notes</LinkArrow></div><ArticleCards /></Container></section>
    <FinalCta />
  </>;
}
