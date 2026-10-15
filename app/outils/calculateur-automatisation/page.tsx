import { PageHero } from "@/components/page-hero";
import { Container, SectionLabel, LinkArrow, JsonLd, Button } from "@/components/ui/primitives";
import { AutomationCalculator } from "@/components/automation-calculator";
import { pageMetadata, breadcrumbs } from "@/lib/seo";
import styles from "@/components/automation-calculator.module.css";

export const metadata = pageMetadata("Calculateur d’automatisation : comparez le temps gagné", "Comparez gratuitement trois tâches à automatiser : volumes, temps de contrôle et suivi mensuel. Calcul transparent et cadrage téléchargeable, sans inscription.", "/outils/calculateur-automatisation");

export default function AutomationTool() {
  return <>
    <PageHero title="Automatisation : combien de temps pouvez-vous libérer ?" description="Comparez la charge de trois tâches avant et après automatisation. Intégrez les vérifications humaines, les exceptions et le suivi pour choisir une première piste à tester." label="OUTIL GRATUIT / AUTOMATISATION" breadcrumb={[{ name: "Guides", href: "/insights" }, { name: "Calculateur d’automatisation" }]} />
    <section className="section"><Container><SectionLabel number="01">VOS HYPOTHÈSES</SectionLabel><h2>Trois tâches.<br />Une comparaison concrète.</h2><AutomationCalculator /></Container></section>
    <section className="section service-decisions"><Container><div className={styles.method}>
      <SectionLabel number="02">COMPRENDRE LE CALCUL</SectionLabel><h2>Compter le travail<br />qui reste à faire.</h2>
      <p>Le volume mensuel correspond aux exécutions de toute l’équipe. Le temps après automatisation comprend le contrôle par une personne et le temps moyen passé sur les exceptions. Le suivi du workflow est ajouté séparément, une seule fois par mois.</p>
      <p className={styles.formula}>Temps libéré par mois = [volume × (minutes avant − minutes après) − minutes de suivi mensuel] ÷ 60.</p>
      <h3>Exemple fictif : 19 heures par mois.</h3><p>Pour 300 ressaisies de 6 minutes, la charge initiale est de 30 heures. Si chaque traitement demande encore 2 minutes de contrôle, il reste 10 heures. En ajoutant une heure de suivi, la nouvelle charge est de 11 heures : le scénario libère 19 heures. Ce calcul illustre la méthode ; il ne décrit pas un résultat client.</p>
      <h3>Comment relever des hypothèses utiles ?</h3><ol>
        <li>Comptez les exécutions sur une période représentative, en distinguant les pics et les cas habituels.</li>
        <li>Mesurez le travail actif et les corrections. Un délai d’attente de deux jours ne représente pas deux jours de travail humain.</li>
        <li>Testez un échantillon : cas complet, information manquante, doublon et outil indisponible. Relevez le temps de contrôle qui reste nécessaire.</li>
        <li>Ajoutez le suivi, les reprises et l’entretien. Faites varier les hypothèses pour examiner un scénario moins favorable.</li>
      </ol>
      <h3>Que signifie un résultat négatif ?</h3><p>Si les contrôles et le suivi prennent plus de temps que le travail évité, ce scénario ajoute de la charge. Il peut alors être utile de simplifier le processus, d’améliorer les données ou de choisir une autre tâche. L’outil conserve les valeurs négatives pour rendre cet arbitrage visible.</p>
      <h3>Le temps ne suffit pas à décider.</h3><p>Cette comparaison ne chiffre pas la réalisation, les abonnements, l’hébergement ou les coûts de changement. Elle ne calcule pas un retour financier. Un processus critique peut mériter un projet pour sa traçabilité ou sa qualité, même si le temps libéré est limité. Vérifiez les règles, les accès et les responsabilités avec les équipes avant de lancer la réalisation.</p>
      <p>Le calcul et le téléchargement fonctionnent dans votre navigateur. Aucun compte, email ou envoi de vos hypothèses n’est nécessaire.</p>
    </div></Container></section>
    <section className="section"><Container><div className="editorial-grid"><div><SectionLabel number="03">PASSER AU PROJET</SectionLabel><h2>Vérifier la piste.<br />Cadrer le premier flux.</h2></div><div><p>SEYA LABS conçoit des automatisations et des intégrations autour de vos outils. Nous précisons avec vous le déclencheur, les règles, les exceptions et les tests de la première version.</p><div className="reading-links"><LinkArrow href="/insights/automatiser-un-processus-par-ou-commencer">Choisir votre premier processus</LinkArrow><LinkArrow href="/insights/integration-api-crm-erp">Préparer les connexions CRM et ERP</LinkArrow><LinkArrow href="/solutions/automatisation-workflows">Notre offre automatisation de workflows</LinkArrow></div><Button href="/contact?service=automatisation-workflows">Parlons de votre processus</Button></div></div></Container></section>
    <JsonLd data={breadcrumbs([{ name: "Guides", path: "/insights" }, { name: "Calculateur d’automatisation", path: "/outils/calculateur-automatisation" }])} />
  </>;
}
