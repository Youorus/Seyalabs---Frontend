"use client";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { automationBrief, automationExample, estimateAutomation, formatHours, type AutomationTask } from "@/lib/automation-estimate";
import styles from "./automation-calculator.module.css";

const numericFields = [
  { key: "monthlyRuns", label: "Exécutions par mois", hint: "Volume total de l’équipe, sans multiplier à nouveau par son effectif.", max: 1000000, step: 1 },
  { key: "minutesBefore", label: "Minutes par exécution avant", hint: "Temps de travail actif, hors attente.", max: 1440, step: 0.1 },
  { key: "minutesAfter", label: "Minutes par exécution après", hint: "Contrôle humain et traitement moyen des exceptions inclus.", max: 1440, step: 0.1 },
  { key: "monthlyMaintenance", label: "Minutes de suivi par mois", hint: "Surveillance et entretien du flux, ajoutés une seule fois.", max: 44640, step: 0.1 },
] as const;
const subscribeHydration = () => () => {};

export function AutomationCalculator() {
  const hydrated = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const [results, setResults] = useState<ReturnType<typeof estimateAutomation>[] | null>(null);
  const [stale, setStale] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);
  const best = results?.reduce((candidate, task) => task.hoursSaved > candidate.hoursSaved ? task : candidate);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    try {
      const tasks = automationExample.map((_, i) => ({
        name: String(values.get(`name-${i}`) || "").trim(),
        ...Object.fromEntries(numericFields.map(({ key }) => [key, Number(values.get(`${key}-${i}`))])),
      } as AutomationTask));
      setResults(tasks.map(estimateAutomation)); setStale(false); setError("");
      // Keep focus stable while the result is inserted after the form.
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch { setError("Vérifiez les noms, les volumes et les durées saisis."); }
  }

  function download() {
    if (!results || stale) return;
    const url = URL.createObjectURL(new Blob([automationBrief(results)], { type: "text/markdown;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "seya-labs-mon-cadrage-automatisation.md"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return <div className={styles.calculator}>
    <p className={styles.note} id="calculator-help">Les trois tâches et leurs chiffres sont des exemples fictifs. Remplacez-les par vos observations sur un même mois. Les calculs restent dans cette page, sans inscription.</p>
    <noscript><p>Activez JavaScript pour comparer vos tâches. La formule et l’exemple détaillé restent disponibles plus bas.</p></noscript>
    <form onSubmit={calculate} onChange={() => setStale(true)} onReset={() => { setResults(null); setStale(false); setError(""); }} aria-label="Comparer trois tâches à automatiser" aria-describedby="calculator-help">
      <div className={styles.tasks}>{automationExample.map((task, i) => <fieldset className={styles.task} key={i} disabled={!hydrated}>
        <legend>Tâche 0{i + 1}</legend>
        <label htmlFor={`name-${i}`}>Nom de la tâche</label><input id={`name-${i}`} name={`name-${i}`} maxLength={80} defaultValue={task.name} required />
        {numericFields.map(({ key, label, hint, max, step }) => <div className={styles.field} key={key}>
          <label htmlFor={`${key}-${i}`}>{label}</label><input id={`${key}-${i}`} name={`${key}-${i}`} type="number" inputMode={step === 1 ? "numeric" : "decimal"} min={0} max={max} step={step} defaultValue={task[key]} aria-describedby={`${key}-${i}-help`} required />
          <p id={`${key}-${i}-help`}>{hint}</p>
        </div>)}
      </fieldset>)}</div>
      <div className={styles.actions}><button type="submit" className="button button-dark" disabled={!hydrated}>Comparer mes tâches<ArrowUpRight size={18} aria-hidden="true" /></button><button type="reset" className={styles.reset} disabled={!hydrated}>Rétablir les exemples</button></div>
      {error && <p role="alert">{error}</p>}
    </form>
    {results && <div className={styles.results} ref={resultRef} tabIndex={-1} aria-labelledby="automation-result-title">
      <span className="mono">VOTRE COMPARAISON / HEURES PAR MOIS</span>
      <h3 id="automation-result-title">{stale ? "Vos hypothèses ont changé." : best && best.hoursSaved > 0 ? `${best.name} : une piste à examiner.` : "Le scénario ne libère pas de temps."}</h3>
      <p>{stale ? "Recalculez pour mettre les résultats à jour." : "Le temps de contrôle et le suivi mensuel sont déduits. Un résultat négatif signifie que le scénario ajoute du travail."}</p>
      <div className={styles.table} role="region" aria-label="Comparaison des charges mensuelles" tabIndex={0}>
        <table><caption className="visually-hidden">Charges mensuelles selon vos hypothèses</caption><thead><tr><th scope="col">Tâche</th><th scope="col">Avant</th><th scope="col">Après + suivi</th><th scope="col">Temps libéré</th></tr></thead>
          <tbody>{results.map((task, i) => <tr key={i}><th scope="row">{task.name}</th><td>{formatHours(task.hoursBefore)} h</td><td>{formatHours(task.hoursAfter)} h</td><td>{formatHours(task.hoursSaved)} h</td></tr>)}</tbody>
        </table>
      </div>
      <p>Le temps est un critère de choix. Vérifiez aussi l’accès aux outils, la stabilité des règles, les risques et le coût de réalisation. Évitez de compter deux fois une même étape entre vos tâches.</p>
      <div className={styles.actions}><button type="button" className="button button-outline" onClick={download} disabled={stale}>Télécharger mon cadrage<Download size={18} aria-hidden="true" /></button><a className="link-arrow" href="/contact?service=automatisation-workflows">Étudier ce projet avec SEYA LABS<ArrowUpRight size={18} aria-hidden="true" /></a></div>
      <p className={styles.note}>Le fichier reste sur votre appareil. Le lien de contact ne transmet pas vos chiffres : vous choisissez les informations à joindre à votre demande.</p>
    </div>}
  </div>;
}
