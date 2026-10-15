export type AutomationTask = {
  name: string;
  monthlyRuns: number;
  minutesBefore: number;
  minutesAfter: number;
  monthlyMaintenance: number;
};

export const automationExample: AutomationTask[] = [
  { name: "Ressaisie CRM", monthlyRuns: 300, minutesBefore: 6, minutesAfter: 2, monthlyMaintenance: 60 },
  { name: "Rapport d’activité", monthlyRuns: 20, minutesBefore: 45, minutesAfter: 15, monthlyMaintenance: 90 },
  { name: "Validation de dossier", monthlyRuns: 60, minutesBefore: 12, minutesAfter: 10, monthlyMaintenance: 180 },
];

export function estimateAutomation(task: AutomationTask) {
  if (!task.name.trim() || task.name.length > 80 ||
    !Number.isInteger(task.monthlyRuns) || task.monthlyRuns < 0 || task.monthlyRuns > 1000000 ||
    [task.minutesBefore, task.minutesAfter, task.monthlyMaintenance].some((value) => !Number.isFinite(value) || value < 0) ||
    task.minutesBefore > 1440 || task.minutesAfter > 1440 || task.monthlyMaintenance > 44640) {
    throw new RangeError("Vérifiez le nom, les volumes et les durées de la tâche.");
  }
  const hoursBefore = task.monthlyRuns * task.minutesBefore / 60;
  const hoursAfter = (task.monthlyRuns * task.minutesAfter + task.monthlyMaintenance) / 60;
  return { ...task, hoursBefore, hoursAfter, hoursSaved: hoursBefore - hoursAfter };
}

export const formatHours = (hours: number) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 }).format(hours);

export function automationBrief(tasks: AutomationTask[]) {
  const results = tasks.map(estimateAutomation);
  return [
    "# Préparer une automatisation — SEYA LABS", "",
    "Simulation à partir de mes hypothèses. Les durées après automatisation incluent le contrôle humain et les exceptions. Le suivi mensuel s’ajoute une seule fois par tâche.", "",
    ...results.flatMap((task) => [
      `## ${task.name.replace(/[\r\n]/g, " ")}`,
      `- Exécutions mensuelles pour toute l’équipe : ${task.monthlyRuns}`,
      `- Avant : ${task.minutesBefore} min/exécution, soit ${formatHours(task.hoursBefore)} h/mois`,
      `- Après : ${task.minutesAfter} min/exécution + ${task.monthlyMaintenance} min de suivi/mois, soit ${formatHours(task.hoursAfter)} h/mois`,
      `- Écart : ${formatHours(task.hoursSaved)} h/mois (négatif = travail supplémentaire)`, "",
      "À documenter : déclencheur, outils et accès disponibles, données de référence, exceptions, responsable du flux et tests d’acceptation.", "",
    ]),
    "## Avant de décider", "",
    "Vérifier ces durées sur un échantillon réel. Éviter de compter le même travail dans plusieurs tâches. Cette estimation de charge ne chiffre ni l’investissement, ni les abonnements, ni une économie financière. Un gain de temps n’est pas une garantie de chiffre d’affaires.", "",
    "Méthode : https://seyalabs.com/outils/calculateur-automatisation",
    "Accompagnement : https://seyalabs.com/solutions/automatisation-workflows", "",
  ].join("\n");
}
