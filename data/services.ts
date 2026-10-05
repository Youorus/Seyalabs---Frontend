import { additionalServices } from "./additional-services";

export type FAQ = { question: string; answer: string };
export type Service = {
  kind: "expertises" | "solutions"; slug: string; number: string; label: string;
  name: string; title: string; seoTitle: string; description: string; intro: string;
  problemTitle: string; problem: string; outcomes: string[];
  useCases: { title: string; description: string }[]; deliverables: string[];
  technologies: string[]; faq: FAQ[]; related: string[];
};
export const services = [
  {
    "kind": "expertises",
    "slug": "developpement-logiciel",
    "number": "01",
    "label": "SOFTWARE ENGINEERING",
    "name": "Développement logiciel",
    "title": "Un logiciel qui parle votre métier.",
    "seoTitle": "Agence de développement logiciel sur mesure",
    "description": "SEYA LABS développe vos logiciels sur mesure : cadrage, conception, intégrations, tests et mise en production. Applications métier et outils pour entreprises.",
    "intro": "Vos processus ont leurs propres règles. Nous construisons les applications qui les rendent plus simples, avec des interfaces claires et une architecture pensée pour évoluer.",
    "problemTitle": "Quand vos outils deviennent une limite.",
    "problem": "Fichiers dispersés, doubles saisies, logiciels trop rigides : vos équipes compensent les limites de leurs outils. Un logiciel sur mesure rassemble les informations et traduit vos règles métier en parcours utilisables au quotidien.",
    "outcomes": [
      "Un référentiel partagé par vos équipes.",
      "Des parcours alignés sur vos opérations.",
      "Une base technique documentée et évolutive."
    ],
    "useCases": [
      {
        "title": "Applications métier",
        "description": "Gérer des dossiers, des interventions ou des validations avec les bons droits et une trace des actions."
      },
      {
        "title": "Plateformes web et mobiles",
        "description": "Donner à vos clients ou collaborateurs un accès simple à leurs services, sur le terrain comme au bureau."
      },
      {
        "title": "SaaS et outils internes",
        "description": "Structurer un produit, ses comptes utilisateurs, ses intégrations et ses conditions d’exploitation."
      }
    ],
    "deliverables": [
      "Ateliers de cadrage et définition du périmètre",
      "Architecture et parcours UX",
      "Application, tests et intégrations",
      "Déploiement, documentation et transfert"
    ],
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL"
    ],
    "faq": [
      {
        "question": "Quand choisir un logiciel sur mesure ?",
        "answer": "Quand vos règles métier ou vos intégrations ne trouvent pas de réponse satisfaisante dans les outils existants. Le cadrage compare les options : configurer un logiciel, connecter vos outils ou développer une application."
      },
      {
        "question": "Peut-on faire évoluer une application existante ?",
        "answer": "Oui. Nous commençons par comprendre son architecture, ses usages et ses contraintes. Une amélioration progressive peut être plus pertinente qu’une réécriture complète."
      },
      {
        "question": "Comment est défini le budget ?",
        "answer": "Le périmètre fonctionnel, les intégrations, la reprise de données et les exigences d’exploitation déterminent l’effort. Nous précisons ces éléments avec vous avant de proposer un plan de réalisation."
      }
    ],
    "related": [
      "application-metier",
      "plateformes-web-mobile",
      "saas",
      "mvp",
      "integration-api"
    ]
  },
  {
    "kind": "expertises",
    "slug": "intelligence-artificielle",
    "number": "02",
    "label": "ARTIFICIAL INTELLIGENCE",
    "name": "Intelligence artificielle",
    "title": "L’IA utile. Dans vos processus.",
    "seoTitle": "Intégration d’intelligence artificielle en entreprise",
    "description": "Intégrez l’IA à vos données et processus : assistants, agents, recherche documentaire et traitement de documents, avec évaluation et contrôle humain.",
    "intro": "L’intelligence artificielle prend sa valeur dans un usage précis. Nous concevons des assistants et des agents connectés à vos informations, avec les contrôles nécessaires à leur utilisation.",
    "problemTitle": "Passer de l’expérimentation à un usage fiable.",
    "problem": "Un prototype convaincant ne suffit pas. Il faut des données accessibles, des réponses évaluées, des droits respectés et un coût d’exploitation compris. Nous traitons ces sujets avec le cas d’usage, dès le cadrage.",
    "outcomes": [
      "Des réponses appuyées sur vos informations.",
      "Des actions encadrées par des permissions.",
      "Une qualité évaluée sur des cas métier."
    ],
    "useCases": [
      {
        "title": "Recherche documentaire",
        "description": "Retrouver une information dans vos documents, avec ses sources et les permissions de l’utilisateur."
      },
      {
        "title": "Assistants métier",
        "description": "Aider une équipe à préparer une réponse, résumer un dossier ou comprendre une procédure."
      },
      {
        "title": "Traitement documentaire",
        "description": "Extraire et classer des données, puis faire valider les cas ambigus avant leur intégration."
      }
    ],
    "deliverables": [
      "Sélection d’un cas d’usage et corpus d’évaluation",
      "Architecture des données et des accès",
      "Prototype évalué puis intégration métier",
      "Suivi des coûts, des erreurs et de la qualité"
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "Qdrant",
      "OpenAI",
      "Anthropic",
      "Mistral"
    ],
    "faq": [
      {
        "question": "Faut-il déjà disposer de données structurées ?",
        "answer": "Pas toujours. Des documents peuvent constituer un point de départ. Nous évaluons d’abord leur qualité, leur actualité, leurs droits d’accès et leur adéquation au besoin."
      },
      {
        "question": "Comment réduire les réponses incorrectes ?",
        "answer": "Nous combinons sources explicites, jeux d’évaluation, règles de réponse et possibilité de ne pas répondre. Les tâches sensibles gardent une validation humaine. Aucune approche ne garantit une absence totale d’erreurs."
      },
      {
        "question": "Quel modèle d’IA choisir ?",
        "answer": "Le choix dépend de la qualité attendue, de la confidentialité, du coût, de la latence et des conditions d’hébergement. Nous comparons les options sur vos exemples plutôt que sur une préférence de fournisseur."
      }
    ],
    "related": [
      "assistant-ia",
      "agents-ia",
      "application-metier"
    ]
  },
  {
    "kind": "expertises",
    "slug": "automatisation",
    "number": "03",
    "label": "AUTOMATION",
    "name": "Automatisation",
    "title": "Moins de tâches. Plus de continuité.",
    "seoTitle": "Automatisation des processus en entreprise",
    "description": "Automatisez les tâches répétitives, connectez CRM et outils internes et fiabilisez vos workflows avec des validations, des alertes et un suivi.",
    "intro": "Les opérations ne devraient pas dépendre d’un copier-coller ou d’un rappel manuel. Nous relions vos outils pour transformer les tâches répétitives en workflows suivis et contrôlables.",
    "problemTitle": "Les tâches simples s’accumulent.",
    "problem": "Une saisie à recopier, un document à envoyer, un statut à vérifier : chaque étape manuelle crée une attente et une possibilité d’erreur. Nous cartographions le flux complet pour automatiser ce qui peut l’être et préserver les décisions humaines utiles.",
    "outcomes": [
      "Des informations transmises au bon moment.",
      "Des exceptions visibles et récupérables.",
      "Des équipes concentrées sur les décisions."
    ],
    "useCases": [
      {
        "title": "Opérations commerciales",
        "description": "Synchroniser les contacts, qualifier les demandes et déclencher les étapes prévues dans votre CRM."
      },
      {
        "title": "Gestion administrative",
        "description": "Acheminer les documents, préparer les données et suivre les validations entre les équipes."
      },
      {
        "title": "Suivi des opérations",
        "description": "Déclencher des alertes sur les événements importants et documenter les traitements effectués."
      }
    ],
    "deliverables": [
      "Cartographie du processus et des exceptions",
      "Workflows et connexions aux outils",
      "Gestion des erreurs, alertes et reprises",
      "Documentation et transmission aux équipes"
    ],
    "technologies": [
      "n8n",
      "Make",
      "Python",
      "REST API",
      "Webhooks",
      "PostgreSQL"
    ],
    "faq": [
      {
        "question": "Tout processus peut-il être automatisé ?",
        "answer": "Non. Un processus doit être suffisamment explicite et ses exceptions comprises. Nous conservons des étapes humaines lorsque la décision, le risque ou la qualité des données le justifie."
      },
      {
        "question": "Faut-il remplacer nos outils ?",
        "answer": "Souvent, non. Les API et webhooks permettent de relier les logiciels existants. Le cadrage vérifie leurs capacités, limites et conditions d’accès."
      },
      {
        "question": "Que se passe-t-il si un workflow échoue ?",
        "answer": "Nous prévoyons des journaux, des alertes et une stratégie de reprise. Les opérations sont conçues pour éviter les doublons et rendre les exceptions visibles aux personnes concernées."
      }
    ],
    "related": [
      "automatisation-workflows",
      "integration-api",
      "agents-ia"
    ]
  },
  {
    "kind": "expertises",
    "slug": "data-api",
    "number": "04",
    "label": "DATA & SYSTEMS",
    "name": "Data & API",
    "title": "Des données reliées. Un système cohérent.",
    "seoTitle": "Développement API et intégration de données",
    "description": "Connectez vos outils grâce à des API, pipelines de données et architectures backend : des données cohérentes, des échanges fiables et un suivi clair.",
    "intro": "Les données ne deviennent utiles que lorsqu’elles circulent correctement. Nous construisons les fondations qui relient vos applications et rendent vos informations exploitables.",
    "problemTitle": "Une information, plusieurs versions.",
    "problem": "Vos équipes travaillent avec des exports, des bases isolées et des chiffres difficiles à rapprocher. Nous identifions les sources de référence, définissons les règles d’échange et construisons des flux observables entre vos systèmes.",
    "outcomes": [
      "Des sources de référence identifiées.",
      "Des échanges documentés et supervisés.",
      "Des données utilisables pour vos décisions."
    ],
    "useCases": [
      {
        "title": "API et intégrations",
        "description": "Exposer des fonctions métier ou connecter CRM, ERP et applications internes avec des contrats d’échange clairs."
      },
      {
        "title": "Pipelines de données",
        "description": "Collecter, valider et transformer les informations avant de les rendre disponibles aux équipes."
      },
      {
        "title": "Dashboards métier",
        "description": "Présenter les indicateurs utiles avec des définitions partagées, des droits d’accès et une fraîcheur connue."
      }
    ],
    "deliverables": [
      "Cartographie des sources et règles de qualité",
      "Modèle de données et contrats API",
      "Pipelines, authentification et tests",
      "Supervision, documentation et exploitation"
    ],
    "technologies": [
      "PostgreSQL",
      "Python",
      "FastAPI",
      "Redis",
      "Docker",
      "REST API"
    ],
    "faq": [
      {
        "question": "Peut-on connecter un outil sans API ?",
        "answer": "Parfois, via un export, une connexion à une base ou un connecteur autorisé. Nous étudions la solution la plus stable et ses limites avant de promettre une intégration."
      },
      {
        "question": "Comment sécuriser les échanges de données ?",
        "answer": "Nous définissons des accès limités au besoin, des mécanismes d’authentification adaptés et des échanges chiffrés. Les secrets et les droits sont gérés séparément du code métier."
      },
      {
        "question": "Qui maintient les intégrations ?",
        "answer": "Les responsabilités sont définies au cadrage. La livraison comprend les contrats, les journaux nécessaires et une documentation permettant le suivi et les évolutions."
      }
    ],
    "related": [
      "integration-api",
      "application-metier",
      "automatisation-workflows"
    ]
  },
  {
    "kind": "solutions",
    "slug": "application-metier",
    "number": "01",
    "label": "BUSINESS SOFTWARE",
    "name": "Application métier",
    "title": "Votre métier. Votre application.",
    "seoTitle": "Développement d’application métier sur mesure",
    "description": "Remplacez les fichiers dispersés et doubles saisies par une application métier sur mesure : gestion de dossiers, opérations, validations et reporting.",
    "intro": "Un seul espace pour les informations, les actions et les règles qui font fonctionner votre activité. Nous concevons votre outil avec les personnes qui l’utiliseront.",
    "problemTitle": "Quand un tableur porte toute l’activité.",
    "problem": "Les fichiers Excel rendent service, puis deviennent difficiles à partager, sécuriser et faire évoluer. Lorsque les validations, les droits et l’historique deviennent essentiels, une application métier offre un cadre plus adapté.",
    "outcomes": [
      "Un espace de travail partagé.",
      "Des règles métier intégrées aux parcours.",
      "Une traçabilité des décisions et actions."
    ],
    "useCases": [
      {
        "title": "Gestion de dossiers",
        "description": "Centraliser les pièces, les statuts, les échanges et les échéances sans multiplier les fichiers."
      },
      {
        "title": "Opérations terrain",
        "description": "Donner aux équipes mobiles une interface adaptée aux interventions et à la remontée d’informations."
      },
      {
        "title": "Validation et pilotage",
        "description": "Définir les étapes d’approbation et suivre l’activité avec les indicateurs utiles à votre métier."
      }
    ],
    "deliverables": [
      "Analyse des usages et des fichiers existants",
      "Prototype des parcours principaux",
      "Application, droits d’accès et reprise de données",
      "Tests métier, déploiement et prise en main"
    ],
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Docker"
    ],
    "faq": [
      {
        "question": "Comment remplacer Excel sans perdre nos données ?",
        "answer": "Nous identifions les données à reprendre, les nettoyons selon des règles convenues et testons la migration. Une période de transition peut être organisée avant de basculer les usages."
      },
      {
        "question": "Les utilisateurs participent-ils à la conception ?",
        "answer": "Oui. Les personnes qui réalisent le travail nous aident à décrire les contraintes et à tester les parcours. Leurs retours sont intégrés pendant les cycles de développement."
      },
      {
        "question": "L’application peut-elle être connectée à notre CRM ?",
        "answer": "Oui, si les capacités techniques et les autorisations de votre CRM le permettent. Les échanges, leurs fréquences et la gestion des erreurs sont définis au cadrage."
      }
    ],
    "related": [
      "developpement-logiciel",
      "integration-api",
      "automatisation-workflows"
    ]
  },
  {
    "kind": "solutions",
    "slug": "agents-ia",
    "number": "02",
    "label": "AI AGENTS",
    "name": "Agents IA",
    "title": "Des agents qui agissent. Dans un cadre.",
    "seoTitle": "Agents IA pour les processus d’entreprise",
    "description": "Concevez des agents IA connectés à vos outils, avec actions autorisées, validation humaine, traçabilité et évaluation sur vos processus métier.",
    "intro": "Un agent peut analyser une demande, préparer une action et utiliser un outil. Nous définissons précisément ce qu’il peut faire, ce qu’il doit faire valider et ce qu’il doit laisser à vos équipes.",
    "problemTitle": "Automatiser une tâche qui demande du contexte.",
    "problem": "Certains workflows ne suivent pas toujours le même chemin. Un agent IA peut aider à traiter les variations, mais il ajoute de l’incertitude. Nous limitons son champ d’action et évaluons chaque étape avant d’élargir son autonomie.",
    "outcomes": [
      "Des actions limitées au périmètre autorisé.",
      "Une validation pour les décisions sensibles.",
      "Un historique des actions et de leurs résultats."
    ],
    "useCases": [
      {
        "title": "Qualification de demandes",
        "description": "Lire une demande, recueillir les informations manquantes et préparer son orientation vers la bonne équipe."
      },
      {
        "title": "Préparation de dossiers",
        "description": "Rassembler les documents disponibles, vérifier une liste de points et proposer une synthèse sourcée."
      },
      {
        "title": "Coordination d’outils",
        "description": "Préparer une mise à jour dans un logiciel, puis demander sa validation avant l’exécution."
      }
    ],
    "deliverables": [
      "Définition des actions, permissions et limites",
      "Connexion aux outils et contrôle des accès",
      "Scénarios d’évaluation et validations humaines",
      "Suivi des erreurs, coûts et actions exécutées"
    ],
    "technologies": [
      "Python",
      "FastAPI",
      "LLM",
      "REST API",
      "PostgreSQL",
      "n8n"
    ],
    "faq": [
      {
        "question": "Quelle différence entre un agent et un assistant IA ?",
        "answer": "Un assistant aide à trouver ou produire de l’information. Un agent peut aussi choisir et utiliser des outils pour accomplir des étapes. Cette capacité exige des permissions et des contrôles plus stricts."
      },
      {
        "question": "Un agent peut-il travailler sans supervision ?",
        "answer": "Cela dépend de la tâche et du risque. Nous commençons avec un périmètre limité, des règles explicites et des validations. Les opérations sensibles restent soumises à une décision humaine."
      },
      {
        "question": "Comment éviter les actions en double ?",
        "answer": "Les outils exposés à l’agent doivent gérer l’idempotence, les identifiants d’opération et les reprises. Ces protections relèvent du système qui encadre l’agent, pas seulement de son prompt."
      }
    ],
    "related": [
      "intelligence-artificielle",
      "assistant-ia",
      "automatisation-workflows"
    ]
  },
  {
    "kind": "solutions",
    "slug": "automatisation-workflows",
    "number": "03",
    "label": "CONNECTED OPERATIONS",
    "name": "Automatisation de workflows",
    "title": "Vos opérations, sans les ruptures.",
    "seoTitle": "Automatisation des workflows et opérations métier",
    "description": "Reliez vos outils et automatisez vos workflows : traitement des demandes, synchronisation CRM, documents et validations, avec suivi des exceptions.",
    "intro": "Une demande reçue. Les bonnes informations transmises. Une étape déclenchée au bon moment. Nous concevons des workflows qui rendent ce chemin plus direct.",
    "problemTitle": "Le travail se perd entre les outils.",
    "problem": "Une équipe attend un email, une autre copie un statut, une troisième relance une validation. Le processus existe, mais ses connexions sont manuelles. Nous rendons ses étapes explicites et automatisons les échanges prévisibles.",
    "outcomes": [
      "Des transmissions qui suivent le processus.",
      "Des validations confiées aux bonnes personnes.",
      "Des échecs identifiés et récupérables."
    ],
    "useCases": [
      {
        "title": "De la demande au dossier",
        "description": "Créer un dossier à partir d’un formulaire, associer les documents et prévenir l’équipe concernée."
      },
      {
        "title": "Synchronisation commerciale",
        "description": "Mettre à jour les informations entre CRM et outils métier selon des règles de référence."
      },
      {
        "title": "Circuits d’approbation",
        "description": "Déclencher une validation, suivre son état et rappeler les étapes en attente."
      }
    ],
    "deliverables": [
      "Carte du workflow et des exceptions",
      "Scénarios n8n, Make ou code sur mesure",
      "Tests de reprise et prévention des doublons",
      "Tableau de suivi et documentation"
    ],
    "technologies": [
      "n8n",
      "Make",
      "Webhooks",
      "Python",
      "REST API",
      "Redis"
    ],
    "faq": [
      {
        "question": "n8n, Make ou développement sur mesure ?",
        "answer": "Le choix dépend des connecteurs, de l’hébergement, du volume et de la complexité des règles. Un outil de workflow suffit souvent ; du code peut compléter les étapes qui le nécessitent."
      },
      {
        "question": "Peut-on conserver une validation humaine ?",
        "answer": "Oui. Une validation peut être une étape du workflow, avec un responsable, un statut et une trace. L’automatisation doit faciliter la décision, pas la masquer."
      },
      {
        "question": "Comment choisir le premier workflow ?",
        "answer": "Privilégiez un processus fréquent, stable et suffisamment documenté. Définissez un résultat observable et une manière de traiter les exceptions avant de lancer le développement."
      }
    ],
    "related": [
      "automatisation",
      "integration-api",
      "agents-ia"
    ]
  },
  {
    "kind": "solutions",
    "slug": "assistant-ia",
    "number": "04",
    "label": "KNOWLEDGE SYSTEMS",
    "name": "Assistant IA",
    "title": "Votre savoir. À portée de question.",
    "seoTitle": "Assistant IA connecté aux documents de l’entreprise",
    "description": "Créez un assistant IA pour rechercher dans vos documents et accompagner vos équipes, avec réponses sourcées, droits d’accès et évaluation métier.",
    "intro": "Vos procédures, votre documentation et vos dossiers peuvent devenir plus accessibles. Nous construisons un assistant qui retrouve les informations utiles et indique d’où elles viennent.",
    "problemTitle": "L’information existe. La retrouver prend du temps.",
    "problem": "Les réponses sont dans un dossier partagé, un document ancien ou la mémoire d’un collègue. Un assistant documentaire aide à accéder à ce savoir, à condition de respecter les droits et de signaler les limites de ses réponses.",
    "outcomes": [
      "Une recherche en langage naturel.",
      "Des sources consultables avec les réponses.",
      "Des accès alignés sur vos permissions."
    ],
    "useCases": [
      {
        "title": "Support aux équipes",
        "description": "Retrouver une procédure et ses exceptions sans parcourir l’ensemble de la documentation."
      },
      {
        "title": "Consultation de dossiers",
        "description": "Poser une question sur un ensemble de pièces autorisées et consulter les passages pertinents."
      },
      {
        "title": "Préparation de réponses",
        "description": "Produire un premier brouillon à partir du contexte interne, puis le faire valider par l’utilisateur."
      }
    ],
    "deliverables": [
      "Audit documentaire et règles d’accès",
      "Pipeline d’indexation et recherche",
      "Interface conversationnelle avec sources",
      "Évaluation, mises à jour et supervision"
    ],
    "technologies": [
      "RAG",
      "Qdrant",
      "Python",
      "FastAPI",
      "LLM",
      "Next.js"
    ],
    "faq": [
      {
        "question": "Qu’est-ce que le RAG ?",
        "answer": "La génération augmentée par la recherche consiste à retrouver des informations pertinentes dans un corpus, puis à les fournir au modèle pour préparer une réponse. Elle ne remplace ni l’évaluation ni les contrôles d’accès."
      },
      {
        "question": "L’assistant voit-il tous les documents ?",
        "answer": "Il ne doit accéder qu’aux documents autorisés pour l’utilisateur. Les permissions sont appliquées lors de la recherche et vérifiées dans les tests du système."
      },
      {
        "question": "Comment garder les réponses à jour ?",
        "answer": "Nous définissons les sources de référence, la fréquence de synchronisation et les règles de retrait des documents obsolètes. L’interface peut indiquer les sources et leur date."
      }
    ],
    "related": [
      "intelligence-artificielle",
      "agents-ia",
      "data-api"
    ]
  },
  {
    "kind": "solutions",
    "slug": "integration-api",
    "number": "05",
    "label": "SYSTEM INTEGRATION",
    "name": "Intégration API",
    "title": "Des outils qui travaillent ensemble.",
    "seoTitle": "Intégration API entre CRM, ERP et logiciels métier",
    "description": "Connectez CRM, ERP et applications internes avec des intégrations API fiables : synchronisation, authentification, reprise sur erreur et documentation.",
    "intro": "Vous n’avez pas toujours besoin d’un nouvel outil. Vous avez parfois besoin que les outils existants partagent les bonnes informations, avec des règles d’échange claires.",
    "problemTitle": "La double saisie n’est pas une connexion.",
    "problem": "Quand les systèmes ne communiquent pas, vos équipes servent d’interface. Nous identifions les données de référence, les événements utiles et les limites de chaque API pour construire une intégration qui peut être exploitée au quotidien.",
    "outcomes": [
      "Des informations cohérentes entre logiciels.",
      "Des contrats d’échange explicites.",
      "Des incidents visibles et des reprises prévues."
    ],
    "useCases": [
      {
        "title": "CRM ↔ outil métier",
        "description": "Partager les clients et les statuts, tout en précisant quel système est responsable de chaque donnée."
      },
      {
        "title": "ERP ↔ plateforme",
        "description": "Échanger les catalogues, commandes ou disponibilités selon les capacités autorisées de vos systèmes."
      },
      {
        "title": "API pour vos partenaires",
        "description": "Exposer des fonctions métier avec authentification, documentation et limites d’utilisation."
      }
    ],
    "deliverables": [
      "Analyse des API et modèle de synchronisation",
      "Connecteurs, contrats et authentification",
      "Tests d’échec, de doublon et de reprise",
      "Documentation et suivi des échanges"
    ],
    "technologies": [
      "REST API",
      "Webhooks",
      "FastAPI",
      "OAuth",
      "PostgreSQL",
      "Docker"
    ],
    "faq": [
      {
        "question": "Une synchronisation peut-elle être instantanée ?",
        "answer": "Cela dépend des API et des événements disponibles. Des webhooks permettent parfois un traitement proche du temps réel ; d’autres outils imposent une interrogation périodique."
      },
      {
        "question": "Comment gérer les différences entre deux logiciels ?",
        "answer": "Nous définissons une correspondance des champs, des règles de transformation et un système de référence. Les conflits sont traités selon des règles explicites et documentées."
      },
      {
        "question": "Que faire quand une API change ?",
        "answer": "La documentation, le versionnement et les tests des contrats permettent d’identifier les changements. Le suivi des erreurs aide à détecter les incompatibilités en exploitation."
      }
    ],
    "related": [
      "data-api",
      "automatisation-workflows",
      "application-metier"
    ]
  },
  {
    "kind": "solutions",
    "slug": "mvp",
    "number": "06",
    "label": "PRODUCT DEVELOPMENT",
    "name": "Création de MVP",
    "title": "L’essentiel. Prêt à être utilisé.",
    "seoTitle": "Création de MVP et développement de produit digital",
    "description": "Transformez une idée en MVP utilisable : cadrage, parcours essentiels, développement, déploiement et retours utilisateurs pour décider de la suite.",
    "intro": "Un MVP doit permettre de vérifier une hypothèse avec de vrais usages. Nous vous aidons à choisir le parcours essentiel et à le rendre disponible sans construire tout le produit à l’avance.",
    "problemTitle": "Une idée claire. Un périmètre qui grandit.",
    "problem": "Chaque fonctionnalité semble utile avant le premier utilisateur. Nous relions le périmètre à une question précise : que faut-il observer pour décider de continuer, modifier ou arrêter ? Cette question guide ce que nous construisons.",
    "outcomes": [
      "Une hypothèse et un périmètre explicites.",
      "Un parcours complet accessible aux utilisateurs.",
      "Une base pour décider des prochaines étapes."
    ],
    "useCases": [
      {
        "title": "Premier produit SaaS",
        "description": "Valider un service principal avec un parcours d’inscription et les fonctions nécessaires à son usage."
      },
      {
        "title": "Nouveau service numérique",
        "description": "Tester une proposition de valeur auprès d’un groupe d’utilisateurs avant d’élargir le produit."
      },
      {
        "title": "Prototype devenu produit",
        "description": "Transformer une expérimentation en version déployée, avec les contrôles nécessaires à son exploitation."
      }
    ],
    "deliverables": [
      "Hypothèse produit et critères d’observation",
      "Parcours utilisateur et périmètre priorisé",
      "MVP testé et mis en production",
      "Plan de collecte des retours et documentation"
    ],
    "technologies": [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Docker"
    ],
    "faq": [
      {
        "question": "Quelle différence entre prototype et MVP ?",
        "answer": "Un prototype sert à explorer une idée ou une interface. Un MVP est une version utilisable du produit, suffisamment complète pour observer un usage et tester une hypothèse."
      },
      {
        "question": "Combien de temps faut-il pour créer un MVP ?",
        "answer": "Cela dépend du parcours retenu, des intégrations et des contraintes d’exploitation. Nous établissons un calendrier après le cadrage, plutôt qu’un délai standard détaché du besoin."
      },
      {
        "question": "Le MVP pourra-t-il évoluer ?",
        "answer": "Oui, si les fondations sont adaptées au projet. Nous cherchons un équilibre entre la simplicité du premier périmètre et les choix qui évitent de bloquer les évolutions prévisibles."
      }
    ],
    "related": [
      "developpement-logiciel",
      "application-metier",
      "integration-api"
    ]
  },
  ...additionalServices
] satisfies Service[];

export const expertises = services.filter((item) => item.kind === "expertises");
export const solutions = services.filter((item) => item.kind === "solutions");
export function getService(kind: string, slug: string) { return services.find((item) => item.kind === kind && item.slug === slug); }
