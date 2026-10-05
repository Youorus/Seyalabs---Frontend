import type { Training } from "./training-types";
import { appliedTrainings } from "./training-programmes";
export type { Training } from "./training-types";

export const foundationTrainings: Training[] = [
  {
    slug: "developpement-logiciel", number: "01",
    name: "Développement logiciel & applications métier",
    title: "Comprendre le logiciel. Construire avec méthode.",
    seoTitle: "Formation développement logiciel : architecture, tests et livraison",
    description: "Formation au développement logiciel : cadrage métier, interfaces web, données, API, tests et déploiement. Un parcours adapté à votre équipe et à vos objectifs.",
    intro: "Passer d’un besoin à une application demande plus que de savoir écrire du code. Cette formation relie les parcours métier, les choix techniques et la vie du logiciel après son lancement. Nous adaptons les modules à votre niveau et au produit que vous souhaitez comprendre ou construire.",
    audience: "Équipes produit, responsables de projets et développeurs qui souhaitent mieux cadrer une application ou structurer sa réalisation. Le parcours peut privilégier la compréhension du produit, la pratique technique ou l’articulation entre les deux.",
    prerequisites: "Les modules de cadrage ne demandent pas de savoir programmer. Pour les ateliers de développement, des bases de programmation sont nécessaires ; nous précisons le socle attendu et les outils à préparer avant la session.",
    objectives: [
      "Traduire un besoin métier en parcours, règles et critères de recette.",
      "Comprendre le rôle de l’interface, du backend, de la base de données et des API.",
      "Construire un parcours web avec des droits et des validations explicites.",
      "Organiser les tests, le versionnement et les étapes de mise en production.",
      "Préparer la documentation et les responsabilités de maintenance."
    ],
    modules: [
      { title: "Du besoin au périmètre", description: "Décrire les utilisateurs, les règles et les exceptions. Comparer un logiciel existant et une réalisation sur mesure. Écrire un parcours prioritaire et ses critères de recette, puis distinguer ce qui est indispensable de ce qui peut attendre une prochaine version." },
      { title: "Architecture et données", description: "Comprendre les échanges entre interface, serveur et stockage. Concevoir un modèle de données simple, identifier les relations et définir la source de référence. Examiner les intégrations nécessaires et les implications d’une reprise de données existantes." },
      { title: "Développer un parcours utilisable", description: "Assembler une interface adaptée aux appareils des utilisateurs et un traitement côté serveur. Valider les entrées, appliquer les droits au bon endroit et afficher les erreurs utiles. L’environnement de pratique est choisi selon votre stack et les objectifs retenus." },
      { title: "Tester, livrer et faire évoluer", description: "Utiliser Git pour suivre les modifications, choisir les tests qui vérifient le comportement attendu et préparer un environnement de recette. Aborder le déploiement, les secrets, les traces utiles, les sauvegardes et la documentation nécessaire à une autre personne pour reprendre le projet." }
    ],
    workshop: { title: "Un mini-parcours métier de bout en bout.", description: "Selon le niveau du groupe, l’atelier consiste à cadrer ou à réaliser un outil de suivi de demandes : création, affectation, validation et consultation. Les exemples servent de support pédagogique ; ils sont adaptés pour éviter d’exposer des données confidentielles.", outputs: ["Une fiche de parcours avec ses règles et exceptions.", "Un schéma des données et des échanges.", "Des scénarios de recette et, pour le parcours technique, une version testable."] },
    tools: ["TypeScript", "React", "Next.js", "Python", "PostgreSQL", "Git"],
    relatedExpertise: "developpement-logiciel"
  },
  {
    slug: "intelligence-artificielle", number: "02",
    name: "Intelligence artificielle, assistants & agents",
    title: "Utiliser l’IA. Comprendre ses limites.",
    seoTitle: "Formation IA en entreprise : assistants et agents",
    description: "Formation IA pour vos équipes : usages, prompting, assistants documentaires, agents, évaluation et contrôle humain. Des ateliers reliés à vos besoins métier.",
    intro: "L’IA devient utile lorsqu’on sait choisir une tâche, préparer les informations et vérifier le résultat. Cette formation va de la compréhension des usages aux assistants et agents intégrés aux processus. Le niveau technique et les ateliers sont définis avec votre équipe.",
    audience: "Responsables métier, équipes opérationnelles, chefs de projet et profils techniques qui souhaitent utiliser l’IA avec des repères clairs. Les modules d’acculturation et les ateliers d’intégration peuvent être organisés en parcours distincts.",
    prerequisites: "Aucune programmation n’est nécessaire pour le parcours d’usage. Les ateliers d’intégration demandent des bases en développement et en API. Les accès aux outils, le corpus pédagogique et les informations pouvant être utilisées sont vérifiés avant la session.",
    objectives: [
      "Choisir un cas d’usage précis et reconnaître les situations où l’IA apporte peu.",
      "Formuler une demande avec le contexte, les contraintes et le résultat attendu.",
      "Comprendre la recherche documentaire, les sources et les permissions d’un assistant.",
      "Distinguer un assistant, un agent et un workflow déterministe.",
      "Évaluer les réponses et prévoir les validations humaines nécessaires."
    ],
    modules: [
      { title: "Usages et limites des modèles", description: "Comprendre ce qu’un modèle génère et pourquoi une réponse plausible doit être vérifiée. Décrire une tâche, ses entrées et ses risques. Comparer assistance à la rédaction, extraction d’informations et action sur un outil, avec des critères adaptés à chaque usage." },
      { title: "Contexte et prompting", description: "Construire une consigne lisible, fournir les informations pertinentes et demander un format exploitable. Tester plusieurs formulations sur des exemples représentatifs. Repérer les réponses incorrectes ou ambiguës et conserver une validation lorsque l’enjeu le demande." },
      { title: "Assistants documentaires et agents", description: "Examiner le rôle du corpus, de la recherche et des sources dans un assistant documentaire. Comprendre comment un agent utilise des outils et des permissions. Définir les actions autorisées, les points d’arrêt et les cas qui doivent être transférés à une personne." },
      { title: "Évaluation et exploitation", description: "Préparer un jeu de questions avec leurs réponses attendues. Examiner qualité, sources, absence de réponse, latence et coût d’usage. Tester plusieurs profils d’accès et prévoir le suivi lorsque les documents, les règles ou le modèle changent." }
    ],
    workshop: { title: "Un usage IA évalué sur des questions concrètes.", description: "Le groupe travaille sur un corpus pédagogique ou des documents dont l’usage est autorisé. Il définit les réponses attendues, compare les sorties et documente les limites. Le parcours technique peut aller jusqu’au prototype d’un assistant ou d’une action encadrée.", outputs: ["Une fiche de cas d’usage et de limites.", "Un jeu de questions d’évaluation avec les sources attendues.", "Une grille de vérification et des points de contrôle humain."] },
    tools: ["LLM", "Prompting", "RAG", "Python", "API", "Évaluation"],
    relatedExpertise: "intelligence-artificielle"
  },
  {
    slug: "automatisation", number: "03",
    name: "Automatisation & workflows métier",
    title: "Automatiser une tâche. Maîtriser le processus.",
    seoTitle: "Formation automatisation métier : processus et méthode",
    description: "Formation à l’automatisation métier : cartographie, workflows, n8n, connexions API, validations et reprise sur erreur. Construisez un processus observable.",
    intro: "Un workflow doit continuer à être compréhensible lorsqu’une donnée manque ou qu’un outil ne répond plus. Cette formation vous apprend à choisir un processus, connecter les bonnes étapes et préparer son fonctionnement au quotidien. La pratique suit vos outils et votre niveau.",
    audience: "Équipes opérations, responsables de processus, profils produit et techniques qui souhaitent réduire les ressaisies et organiser les échanges entre outils. Le programme peut commencer par la cartographie ou aller jusqu’à la réalisation d’un workflow.",
    prerequisites: "Connaître un processus de votre activité et les outils qui y participent suffit pour le cadrage. Pour la pratique, nous vérifions les accès à l’environnement pédagogique et aux connecteurs. Des bases API ou de script peuvent être nécessaires selon les modules choisis.",
    objectives: [
      "Choisir une tâche avec des règles et des entrées suffisamment explicites.",
      "Cartographier le déclencheur, les étapes, les décisions et les exceptions.",
      "Construire un workflow et relier des outils avec les permissions adaptées.",
      "Prévoir les doublons, interruptions, alertes et procédures de reprise.",
      "Observer les résultats et documenter les responsabilités d’exploitation."
    ],
    modules: [
      { title: "Choisir le premier processus", description: "Reconstituer le travail réel avec ses transmissions et ses vérifications. Examiner la fréquence, la stabilité des règles et la disponibilité des données. Définir un résultat attendu et les informations à observer avant d’automatiser." },
      { title: "Construire un workflow", description: "Utiliser des déclencheurs, des conditions et des transformations pour relier les étapes. Pratiquer sur n8n ou sur l’environnement retenu au cadrage. Rendre les statuts compréhensibles et prévoir une validation humaine lorsqu’elle fait partie du processus." },
      { title: "Connecter les applications", description: "Comprendre API, webhooks, authentification et correspondance des champs. Identifier les quotas et la source de référence des données. Utiliser les accès autorisés et un environnement de test pour vérifier une connexion sans perturber les opérations réelles." },
      { title: "Exploiter et reprendre sur erreur", description: "Tester une donnée absente, un événement répété et un service indisponible. Définir les nouvelles tentatives, les mises en attente et les alertes nécessaires. Documenter qui peut reprendre un traitement et comment observer les exécutions après lancement." }
    ],
    workshop: { title: "De la demande entrante au suivi partagé.", description: "Le groupe construit ou décrit un flux pédagogique : recevoir une demande, vérifier les informations, la transmettre au bon outil et notifier la personne concernée. Les exceptions et le traitement d’un doublon font partie de l’exercice, au même titre que le scénario normal.", outputs: ["Une cartographie du processus et des exceptions.", "Un workflow pédagogique avec un plan de test.", "Une fiche de suivi, d’alerte et de reprise."] },
    tools: ["n8n", "Webhooks", "API", "Python", "CRM", "Supervision"],
    relatedExpertise: "automatisation"
  },
  {
    slug: "data-api", number: "04",
    name: "Data, bases de données & intégration API",
    title: "Comprendre les données. Fiabiliser les échanges.",
    seoTitle: "Formation data et API : SQL, données et intégration",
    description: "Formation data et intégration API : SQL, modèles de données, qualité, échanges entre logiciels et contrôles. Un programme adapté à vos flux et à votre équipe.",
    intro: "Des données fiables demandent un modèle compris, une source de référence et des échanges contrôlés. Cette formation donne les repères pour explorer une base, préparer une reprise et connecter des logiciels. Les exercices peuvent privilégier l’analyse, la conception ou le développement.",
    audience: "Analystes, responsables d’outils métier, développeurs et équipes qui doivent comprendre ou maintenir les échanges de données. Les modules sont choisis selon les responsabilités des participants et les systèmes concernés.",
    prerequisites: "Être à l’aise avec des fichiers de données est utile pour le parcours d’introduction. Les ateliers SQL et API précisent les bases attendues au cadrage ; les modules de développement demandent des notions de programmation. Un jeu de données pédagogique est préparé avant la session.",
    objectives: [
      "Comprendre un modèle relationnel, ses identifiants et ses contraintes.",
      "Interroger et rapprocher les informations avec des requêtes SQL adaptées.",
      "Détecter les doublons, valeurs manquantes et relations incohérentes.",
      "Décrire puis tester un échange API avec ses permissions et ses limites.",
      "Préparer les contrôles d’une migration ou d’une synchronisation."
    ],
    modules: [
      { title: "Modéliser et interroger", description: "Identifier les entités, leurs relations et les clés qui permettent de les retrouver. Pratiquer les filtres, les jointures et les agrégations sur une base pédagogique. Comprendre comment une requête et un modèle influencent la lecture d’un résultat métier." },
      { title: "Qualité et reprise des données", description: "Examiner formats, doublons, valeurs absentes et sources contradictoires. Écrire une table de correspondance entre les systèmes. Définir les transformations, conserver une trace des anomalies et préparer un rapprochement technique et métier." },
      { title: "Comprendre un contrat API", description: "Lire les endpoints, les paramètres, les réponses et les erreurs. Examiner authentification, permissions, pagination et quotas dans la documentation du système étudié. Tester les échanges dans un environnement adapté et distinguer erreur de transport et rejet métier." },
      { title: "Synchroniser et contrôler", description: "Choisir la source de référence et le sens d’un échange. Gérer les identifiants, les conflits et les événements répétés. Préparer les contrôles de cohérence, les états utiles au suivi et les conditions de reprise après interruption." }
    ],
    workshop: { title: "Reprendre un jeu de données et connecter deux outils.", description: "Sur un exemple pédagogique, le groupe examine un export, identifie les anomalies et prépare la reprise dans un modèle cible. Selon le parcours retenu, il décrit ou réalise une liaison API, puis vérifie les relations et les cas d’échec.", outputs: ["Un schéma de données et des requêtes de contrôle.", "Une table de correspondance et un relevé d’anomalies.", "Un contrat d’échange et des scénarios de reprise."] },
    tools: ["SQL", "PostgreSQL", "Python", "REST", "JSON", "Tests API"],
    relatedExpertise: "data-api"
  }
];

export const trainings: Training[] = [...foundationTrainings, ...appliedTrainings];

export const trainingFamilies = [
  { slug: "developpement-logiciel", name: "Logiciel & produits numériques", description: "Des fondations du développement aux applications métier, plateformes web/mobile, SaaS et MVP." },
  { slug: "intelligence-artificielle", name: "Intelligence artificielle", description: "Comprendre les usages de l’IA, construire un assistant documentaire et encadrer les actions d’un agent." },
  { slug: "automatisation", name: "Automatisation & opérations", description: "Cartographier vos processus, construire des workflows et organiser leur suivi avec n8n et les outils métier." },
  { slug: "data-api", name: "Data & intégrations API", description: "Modéliser et contrôler vos données, lire un contrat API et fiabiliser les échanges entre logiciels." }
];

export function trainingContactHref(training?: Training) {
  return training ? `/contact?type=formation&formation=${training.slug}` : "/contact?type=formation";
}

export const trainingFaq = [
  { question: "Peut-on adapter la formation à nos outils ?", answer: "Oui. Le cadrage précise votre environnement, les usages visés et les contraintes d’accès. Nous choisissons des exemples pédagogiques adaptés, avec des données dont l’usage est autorisé. Le programme et les exercices sont définis avant la session." },
  { question: "Faut-il déjà savoir développer ?", answer: "Cela dépend du parcours. Les modules de compréhension et de cadrage peuvent s’adresser à des profils métier. Les ateliers de développement, SQL ou intégration précisent les bases nécessaires. Nous vérifions le niveau des participants pour proposer les modules adaptés." },
  { question: "Quelle est la durée et comment est défini le tarif ?", answer: "La durée, les modalités, le calendrier et le tarif sont précisés dans une proposition après cadrage. Ils dépendent des objectifs, du niveau du groupe, des modules et de la préparation des ateliers. Indiquez le sujet, le nombre de participants et la période souhaitée pour préparer cet échange." }
];
