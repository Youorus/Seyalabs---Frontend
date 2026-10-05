import Link from "next/link";
import { ArrowUpRight, Braces, Workflow, Sparkles, Database } from "lucide-react";
import { expertises } from "@/data/services";
const icons = [Braces, Sparkles, Workflow, Database];
const summaries = ["Applications métier, plateformes web et mobiles. Des produits faits pour vos usages.", "Assistants, agents et recherche documentaire. L’IA reliée à vos données et à vos équipes.", "Workflows et intégrations. Des opérations qui avancent sans les tâches répétitives.", "API, pipelines et architectures backend. Des fondations qui relient vos systèmes."];

export function ExpertiseGrid({ light = false }: { light?: boolean }) {
  return <div className={`expertise-grid ${light ? "expertise-grid-light" : ""}`}>{expertises.map((expertise, i) => {
    const Icon = icons[i];
    return <Link href={`/expertises/${expertise.slug}`} key={expertise.slug} className="expertise-card"><div className="expertise-card-top"><span className="mono">{expertise.number} /</span><Icon size={27} strokeWidth={1.3} aria-hidden="true" /></div><span className="mono expertise-label">{expertise.label}</span><h3>{expertise.name}</h3><p>{summaries[i]}</p><div className="expertise-card-bottom"><span className="mono">EXPLORER L’EXPERTISE</span><ArrowUpRight size={24} aria-hidden="true" /></div></Link>;
  })}</div>;
}
