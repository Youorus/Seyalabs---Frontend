import type { Article } from "@/data/article-types";

export const discoveryGuide: Article = {
  slug: "ia-automatisation-logiciel-differences",
  title: "IA, automatisation, logiciel : comprendre les différences.",
  seoTitle: "IA, automatisation et logiciel : un guide pour débuter",
  description: "Découvrez simplement ce qui distingue un logiciel, une automatisation et une IA, avec des exemples du quotidien et des pistes pour apprendre à votre rythme.",
  category: "Découverte",
  date: "2026-10-15",
  readingTime: "5 min",
  relatedService: "intelligence-artificielle",
  relatedArticles: ["assistant-ia-donnees-droits-et-evaluation", "automatiser-un-processus-par-ou-commencer"],
  intro: "Vous êtes curieux de technologie, vous découvrez l’IA ou vous avez une idée de projet personnel ? Trois notions reviennent souvent : logiciel, automatisation et intelligence artificielle. Elles peuvent se compléter. Ce guide part de situations simples pour comprendre le rôle de chacune, sans connaissances en programmation.",
  takeaways: [
    "Un logiciel fournit des fonctions et des règles pour accomplir une tâche.",
    "Une automatisation enchaîne des actions à partir d’un déclencheur et de conditions définies.",
    "Une IA peut notamment proposer un texte, reconnaître des éléments ou aider à classer des informations ; son résultat demande une vérification adaptée.",
    "Un même outil peut réunir les trois. Votre besoin reste le point de départ.",
  ],
  sections: [
    {
      title: "Un logiciel : un outil pour faire quelque chose.",
      paragraphs: [
        "Un calendrier, un gestionnaire de notes ou une application de suivi de lectures sont des logiciels. Vous fournissez des informations et utilisez des fonctions : ajouter un événement, retrouver une note ou marquer un livre comme terminé. L’interface vous permet d’agir sur ces informations.",
        "Un logiciel peut suffire à un besoin sans intégrer d’IA. Pour organiser vos lectures, une liste avec un titre, une date et un statut peut déjà être utile. Avant de chercher une technologie, décrivez ce que vous voulez pouvoir faire et les informations nécessaires.",
      ],
    },
    {
      title: "Une automatisation : relier un événement à des actions.",
      paragraphs: [
        "Imaginez une règle : lorsqu’un événement est ajouté à votre calendrier, créer un rappel la veille. Le déclencheur est l’ajout de l’événement ; l’action est la création du rappel. Des conditions peuvent préciser les événements concernés. Cet exemple illustre un mécanisme ; ses possibilités dépendent des fonctions et des accès de votre outil.",
        "Une automatisation suit les étapes que vous avez prévues. Il faut aussi penser aux exceptions : un événement annulé, une information manquante ou un rappel déjà créé. Pour apprendre, commencez par une tâche simple avec des données fictives et vérifiez ce qui se passe lorsque la règle ne peut pas être appliquée.",
      ],
      links: [{ label: "Comprendre comment choisir une première tâche à automatiser", href: "/insights/automatiser-un-processus-par-ou-commencer" }],
    },
    {
      title: "Une IA : une aide dont on examine le résultat.",
      paragraphs: [
        "L’intelligence artificielle recouvre plusieurs approches. Dans un assistant de rédaction, elle peut proposer une reformulation ou un résumé à partir d’un texte. Pour découvrir cet usage, prenez par exemple une note que vous avez écrite, demandez un résumé court et comparez-le à l’original. L’objectif est d’observer ce qui est conservé, omis ou ajouté.",
        "Une réponse bien rédigée peut contenir une erreur. Vérifiez les noms, les chiffres et les affirmations importantes dans leurs sources. Évitez de confier des informations personnelles ou confidentielles à un outil avant d’avoir compris ses conditions d’utilisation et de traitement. Une consigne précise aide à exprimer votre attente ; elle ne garantit pas l’exactitude du résultat.",
      ],
      bullets: ["Décrire une tâche limitée : résumer, reformuler ou proposer un classement.", "Utiliser un petit exemple que vous pouvez vérifier vous-même.", "Comparer la réponse aux informations de départ.", "Conserver la décision finale lorsque le résultat vous engage."],
    },
    {
      title: "Comment ces trois notions se combinent-elles ?",
      paragraphs: [
        "Prenons un exemple fictif : préparer les notes d’un club de lecture. Une application conserve les livres et les dates. Une automatisation crée une fiche à chaque nouvelle rencontre. Une IA peut proposer une synthèse de vos notes, que vous relisez avant de la partager. Chaque partie a un rôle distinct.",
        "Si votre besoin est seulement de retrouver les dates des rencontres, le calendrier peut suffire. Si vous recopiez toujours les mêmes informations, une automatisation peut aider. Si vous souhaitez une proposition de synthèse, l’IA peut apporter une assistance. La solution la plus utile dépend de la tâche et du niveau de contrôle souhaité.",
      ],
    },
    {
      title: "Un premier exercice pour passer de la curiosité à la pratique.",
      paragraphs: [
        "Choisissez une tâche personnelle facile à expliquer et sans conséquence importante : organiser une liste de lectures ou classer quelques notes fictives. Écrivez le résultat attendu en une phrase. Identifiez ce que vous pouvez faire avec les fonctions existantes, les étapes répétitives et les propositions qui demanderaient votre jugement.",
        "Testez ensuite sur quelques exemples, dont une information manquante et une correction. Notez ce qui vous aide et ce qui vous oblige à vérifier davantage. Ce petit exercice permet de poser de meilleures questions et de choisir ce que vous souhaitez apprendre ensuite.",
      ],
      links: [{ label: "Découvrir les parcours de formation et leurs prérequis", href: "/formations" }, { label: "Explorer tous les guides en accès libre", href: "/insights" }, { label: "Essayer le calculateur de temps d’automatisation", href: "/outils/calculateur-automatisation" }],
    },
  ],
};
