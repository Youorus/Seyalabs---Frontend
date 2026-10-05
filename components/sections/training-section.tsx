import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, SectionLabel, LinkArrow } from "@/components/ui/primitives";
import { foundationTrainings } from "@/data/trainings";

export function TrainingSection() {
  return <section className="section training-section"><Container><div className="editorial-grid">
    <div><SectionLabel>FORMATIONS / TRANSMETTRE</SectionLabel><h2>Les compétences.<br />Dans votre équipe.</h2><p>Logiciel, IA, automatisation et data : des formations pour comprendre vos systèmes, pratiquer sur des cas concrets et gagner en autonomie.</p><LinkArrow href="/formations">Découvrir nos formations</LinkArrow></div>
    <nav className="training-topics" aria-label="Domaines de formation">{foundationTrainings.map((training) => <Link href={`/formations#${training.relatedExpertise}`} key={training.slug}><span className="mono">{training.number}</span><span>{training.name}</span><ArrowUpRight size={21} aria-hidden="true" /></Link>)}</nav>
  </div></Container></section>;
}
