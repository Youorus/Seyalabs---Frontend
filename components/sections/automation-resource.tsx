import { Button, SectionLabel } from "@/components/ui/primitives";
import styles from "@/components/automation-calculator.module.css";

export function AutomationResource() {
  return <div className={styles.resource}>
    <div><SectionLabel>OUTIL GRATUIT / SANS INSCRIPTION</SectionLabel><h3>Quelle tâche mérite<br />d’être automatisée ?</h3></div>
    <div><p>Comparez trois tâches avec vos propres volumes. Le calcul tient compte du contrôle humain et du suivi, puis prépare un cadrage à télécharger.</p><Button href="/outils/calculateur-automatisation" variant="dark">Comparer mes tâches</Button></div>
  </div>;
}
