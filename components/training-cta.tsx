import { Container, SectionLabel, Button } from "@/components/ui/primitives";
import { trainingContactHref, type Training } from "@/data/trainings";

export function TrainingCta({ training }: { training?: Training }) {
  return <section className="section training-cta"><Container><div className="editorial-grid">
    <div><SectionLabel>VOTRE ÉQUIPE / LA PROCHAINE ÉTAPE</SectionLabel><h2>Un sujet à maîtriser.<br />Un parcours à définir.</h2></div>
    <div><p>Indiquez vos objectifs, le nombre de participants, leur niveau actuel et la période souhaitée. Nous préciserons avec vous le programme, la durée, les modalités et le tarif.</p><Button href={trainingContactHref(training)}>Parler de ma formation</Button></div>
  </div></Container></section>;
}
