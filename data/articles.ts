import type { Article } from "@/data/article-types";
import { softwareGuides } from "@/data/software-guides";
export type { Article, ArticleSection } from "@/data/article-types";
// CMS-ready typed content. Replace this repository with a CMS adapter when needed.
const notes: Article[] = [
  {
    "slug": "quand-remplacer-excel-par-une-application-metier",
    "title": "Quand Excel ne suffit plus à votre métier.",
    "seoTitle": "Quand remplacer Excel par une application métier ?",
    "description": "Les signaux à regarder, les questions à poser et une méthode pour passer d’un tableur partagé à une application métier sans perdre les usages essentiels.",
    "category": "Software",
    "date": "2026-10-05",
    "readingTime": "5 min",
    "relatedService": "application-metier",
    "relatedArticles": ["logiciel-sur-mesure-ou-saas", "migration-donnees-application-metier", "cahier-des-charges-application-metier"],
    "intro": "Le problème n’est pas le tableur. C’est le moment où un fichier devient, à lui seul, le système qui fait fonctionner une activité. Avant de développer une application, il faut comprendre ce qu’il porte et ce qu’il ne peut plus garantir.",
    "sections": [
      {
        "title": "Regarder les frictions, pas le nombre de lignes.",
        "paragraphs": [
          "Un fichier volumineux ne justifie pas automatiquement une application. En revanche, plusieurs versions concurrentes, des saisies recopiées et des corrections difficiles à retracer sont des signaux utiles. La question est simple : où vos équipes doivent-elles compenser les limites du fichier ?",
          "Observez un parcours complet. Une demande arrive, un dossier est créé, une personne vérifie les informations, une autre valide et une troisième suit la suite. Si chacune travaille dans une copie différente, le problème est celui de la coordination autant que celui du stockage."
        ],
        "bullets": [
          "Plusieurs personnes modifient la même information.",
          "Les droits d’accès dépendent de copies et d’envois par email.",
          "Une erreur est difficile à attribuer ou à corriger.",
          "Les étapes de validation ne sont pas visibles."
        ]
      },
      {
        "title": "Distinguer un fichier d’un processus.",
        "paragraphs": [
          "Un tableur mélange souvent les données, les règles et la présentation. Une colonne de couleur peut vouloir dire « validé », une formule peut calculer un tarif et un onglet peut tenir lieu d’historique. Ces usages doivent être explicités avant de les transposer.",
          "Pour chaque champ important, identifiez sa source, la personne qui le modifie et le moment où il devient fiable. Pour chaque décision, demandez ce qui la déclenche et quelles exceptions existent. Le futur logiciel devra traduire ces règles, pas reproduire la grille à l’identique."
        ]
      },
      {
        "title": "Comparer les options avant de développer.",
        "paragraphs": [
          "Une application sur mesure est une option parmi d’autres. Un outil existant mieux configuré, une base partagée ou une automatisation ciblée peut résoudre le besoin. Le bon choix dépend des règles métier, des intégrations nécessaires et de la capacité à exploiter la solution.",
          "Le sur-mesure devient pertinent lorsque les parcours sont spécifiques, que les droits et la traçabilité sont centraux, ou que plusieurs logiciels doivent travailler ensemble. Il implique aussi une responsabilité durable : hébergement, maintenance, sauvegardes et évolution. Ces sujets doivent faire partie de la décision."
        ]
      },
      {
        "title": "Commencer par un parcours qui tient de bout en bout.",
        "paragraphs": [
          "Évitez de reprendre tous les onglets dans une première version. Choisissez un parcours fréquent et clairement défini. Il doit pouvoir aller de son entrée à son résultat, avec les rôles et les validations indispensables.",
          "Les utilisateurs doivent tester ce parcours sur des exemples représentatifs : un dossier complet, un dossier incomplet, un doublon, une correction après validation. Ces scénarios révèlent ce que la simple lecture du fichier ne montre pas. Leurs retours permettent de corriger les choix avant d’élargir le périmètre."
        ]
      },
      {
        "title": "Préparer la bascule autant que l’application.",
        "paragraphs": [
          "La migration n’est pas un simple import. Les anciennes données peuvent contenir des formats incohérents, des doublons et des règles implicites. Définissez les informations à conserver, les transformations admises et les critères de vérification.",
          "Prévoyez qui valide les données reprises, quand le fichier cesse d’être la référence et comment traiter une anomalie après le lancement. Un outil réussi ne remplace pas seulement un fichier : il donne aux équipes une façon claire de travailler ensemble."
        ],
        "bullets": [
          "Tester la reprise sur un échantillon représentatif.",
          "Identifier une source de référence pendant la transition.",
          "Documenter les nouveaux parcours et les responsabilités.",
          "Prévoir un accompagnement à la prise en main."
        ]
      }
    ]
  },
  {
    "slug": "automatiser-un-processus-par-ou-commencer",
    "title": "Automatiser : choisir le bon premier processus.",
    "seoTitle": "Automatisation en entreprise : par où commencer ?",
    "description": "Choisir un premier processus à automatiser : fréquence, règles, exceptions, outils, indicateurs et reprise sur erreur. Une grille concrète pour cadrer le besoin.",
    "category": "Automation",
    "date": "2026-10-05",
    "readingTime": "5 min",
    "relatedService": "automatisation-workflows",
    "intro": "La tâche la plus visible n’est pas toujours la meilleure à automatiser. Un premier workflow utile doit être assez fréquent pour compter, assez clair pour être construit et assez observable pour être amélioré.",
    "sections": [
      {
        "title": "Partir d’une friction décrite par les équipes.",
        "paragraphs": [
          "« Nous perdons du temps » est un point de départ, pas un périmètre. Demandez aux personnes concernées de décrire le travail : quel événement lance la tâche, quelles informations sont nécessaires, quels outils sont utilisés et comment sait-on qu’elle est terminée ?",
          "Reconstituez le chemin réel, y compris les relances, les vérifications et les retours en arrière. Une automatisation limitée à l’étape visible peut déplacer le problème vers la personne suivante. La cartographie permet de repérer les transmissions qui comptent."
        ]
      },
      {
        "title": "Chercher des règles stables et des données disponibles.",
        "paragraphs": [
          "Une tâche répétitive n’est pas forcément prévisible. Si la décision change selon un contexte non documenté, le premier travail consiste à clarifier les règles. Une automatisation fiable a besoin d’entrées identifiables et d’une action suffisamment explicite.",
          "Vérifiez aussi les moyens d’accès aux outils. Une API, un webhook ou un export autorisé peut fournir un point de connexion. Le volume, les quotas et les permissions influencent la conception. Les connaître tôt évite de construire un workflow qui dépend d’un accès fragile."
        ],
        "bullets": [
          "Un déclencheur identifiable.",
          "Des données accessibles et suffisamment fiables.",
          "Une règle explicite pour choisir la prochaine action.",
          "Un responsable pour les exceptions."
        ]
      },
      {
        "title": "Décrire les exceptions avant le scénario idéal.",
        "paragraphs": [
          "Que faire si un document manque, si une API est indisponible ou si le même événement arrive deux fois ? Ces questions ne sont pas des détails techniques. Elles déterminent la confiance que les équipes pourront accorder au système.",
          "Chaque exception doit avoir une issue : réessayer, demander une validation, mettre en attente ou prévenir une personne. Un workflow doit rendre son état compréhensible. Un échec silencieux oblige les équipes à tout revérifier et réduit l’intérêt de l’automatisation."
        ]
      },
      {
        "title": "Garder une décision humaine quand elle est utile.",
        "paragraphs": [
          "Automatiser une opération ne signifie pas supprimer toute intervention. Le système peut préparer un dossier, vérifier sa complétude et le présenter à la personne qui valide. C’est souvent une première étape plus pertinente qu’une exécution entièrement autonome.",
          "La validation doit elle-même être conçue : quelles informations faut-il afficher, qui peut décider et comment la décision est-elle tracée ? Un simple email sans statut partagé peut recréer une rupture dans le processus. Le point de contrôle doit appartenir au workflow."
        ]
      },
      {
        "title": "Évaluer le résultat avec une situation de départ.",
        "paragraphs": [
          "Avant de développer, observez le processus existant. Comptez les interventions manuelles, relevez les types d’erreurs et décrivez les attentes entre les étapes. Vous disposerez d’une référence pour juger les changements.",
          "Après le lancement, regardez les exécutions réussies, les exceptions et le travail encore nécessaire. Le résultat doit être évalué avec les équipes. Un workflow réussi est un processus que l’on comprend et que l’on peut exploiter, pas seulement un scénario qui fonctionne une fois."
        ],
        "bullets": [
          "Définir le résultat attendu avant la réalisation.",
          "Tester les doublons, interruptions et reprises.",
          "Donner accès aux états et aux alertes utiles.",
          "Prévoir qui adapte le workflow lorsque le métier change."
        ]
      }
    ]
  },
  {
    "slug": "assistant-ia-donnees-droits-et-evaluation",
    "title": "Un assistant IA commence par vos données.",
    "seoTitle": "Assistant IA en entreprise : données, accès et évaluation",
    "description": "Avant de créer un assistant IA documentaire : préparer le corpus, appliquer les droits, afficher les sources et évaluer les réponses sur des questions métier.",
    "category": "AI",
    "date": "2026-10-05",
    "readingTime": "5 min",
    "relatedService": "assistant-ia",
    "intro": "Une interface conversationnelle est la partie visible d’un assistant. Sa valeur dépend surtout de ce qu’il peut retrouver, de ce qu’il a le droit de montrer et de la façon dont ses réponses sont vérifiées.",
    "sections": [
      {
        "title": "Choisir une question métier suffisamment précise.",
        "paragraphs": [
          "« Interroger tous nos documents » est un périmètre difficile à évaluer. Commencez par un usage : retrouver une procédure, comparer les pièces d’un dossier ou préparer une réponse à partir d’une documentation connue.",
          "Réunissez des questions réelles posées par les équipes et les réponses attendues avec leurs sources. Incluez des questions auxquelles le corpus ne permet pas de répondre. Savoir s’arrêter ou demander une précision fait partie du comportement attendu."
        ]
      },
      {
        "title": "Identifier les documents qui font référence.",
        "paragraphs": [
          "Un corpus peut contenir plusieurs versions d’une procédure, des documents retirés et des informations contradictoires. Un moteur de recherche performant ne corrige pas ces problèmes à lui seul. Il faut déterminer quelles sources font autorité et comment leur actualité est suivie.",
          "Associez aux documents des informations utiles : propriétaire, date, version, statut et règles d’accès. Prévoyez leur mise à jour et leur retrait. Une réponse sourcée dans un document périmé reste une réponse à examiner, même si elle semble précise."
        ]
      },
      {
        "title": "Appliquer les droits avant la génération.",
        "paragraphs": [
          "L’assistant ne doit pas chercher dans un document que l’utilisateur n’est pas autorisé à consulter. Les permissions doivent être intégrées au système de recherche, avec des tests sur plusieurs profils. Une consigne dans le prompt ne constitue pas un contrôle d’accès.",
          "La même exigence concerne les passages affichés, les liens vers les sources et l’historique de conversation. Vérifiez les conditions de traitement des données par chaque composant. Les choix de fournisseur et d’hébergement se font en fonction du contexte, des engagements nécessaires et des capacités techniques."
        ]
      },
      {
        "title": "Afficher les sources et rendre les limites visibles.",
        "paragraphs": [
          "Une réponse utile permet à l’utilisateur de vérifier l’information. Les sources doivent conduire aux passages pertinents, dans des documents accessibles. Afficher seulement un nom de fichier apporte peu si la personne doit ensuite parcourir tout le document.",
          "L’interface doit aussi exprimer les cas où l’information manque ou reste ambiguë. Pour une décision engageante, l’utilisateur conserve un point de validation. L’objectif est de faciliter l’accès au savoir, sans donner une impression de certitude que le système ne peut pas justifier."
        ]
      },
      {
        "title": "Évaluer avant de déployer, puis dans le temps.",
        "paragraphs": [
          "Testez le système sur le jeu de questions métier défini au départ. Examinez séparément la pertinence des documents retrouvés, la fidélité de la réponse à ses sources et le respect des accès. Une réponse plausible ne suffit pas à conclure.",
          "Après le lancement, les documents et les usages évoluent. Rejouez les évaluations lors des changements importants et examinez les retours des utilisateurs. Suivez les erreurs, les coûts et les temps de réponse pour décider des améliorations."
        ],
        "bullets": [
          "Questions connues avec des sources attendues.",
          "Questions sans réponse dans le corpus.",
          "Documents contradictoires ou retirés.",
          "Profils utilisateurs avec des permissions différentes.",
          "Évaluation répétée après une modification du système."
        ]
      }
    ]
  }
];

export const articles: Article[] = [...softwareGuides, ...notes];
export const featuredArticles = ["cahier-des-charges-application-metier", "logiciel-sur-mesure-ou-saas", "quand-remplacer-excel-par-une-application-metier"]
  .map((slug) => articles.find((article) => article.slug === slug)!);
