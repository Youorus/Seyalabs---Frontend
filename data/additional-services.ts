import type { Service } from "./services";

export const additionalServices: Service[] = [
  {
    kind: "solutions", slug: "plateformes-web-mobile", number: "07", label: "WEB / MOBILE",
    name: "Plateformes web & mobiles", title: "Vos services. Là où ils sont utilisés.",
    seoTitle: "Développement de plateformes web et applications mobiles",
    description: "SEYA LABS conçoit vos plateformes web et applications mobiles : portails clients, espaces partenaires et outils de terrain, avec API, droits et parcours adaptés.",
    intro: "Au bureau, chez un client ou sur le terrain, un service doit rester simple à utiliser. Nous concevons des plateformes web et mobiles autour des parcours, des appareils et des conditions d’accès de vos utilisateurs.",
    problemTitle: "Un service dispersé entre écrans et outils.",
    problem: "Les échanges par email, les espaces clients limités et les outils peu adaptés au mobile compliquent l’accès à votre service. Une plateforme rassemble les informations et les actions nécessaires, avec des parcours distincts pour clients, partenaires et équipes internes.",
    outcomes: ["Un parcours adapté aux appareils et aux conditions d’usage.", "Des espaces utilisateurs avec des droits explicites.", "Des échanges reliés à vos systèmes métier."],
    useCases: [
      { title: "Portail client", description: "Déposer une demande, consulter son avancement, transmettre une pièce et retrouver les échanges associés à son dossier." },
      { title: "Espace partenaire", description: "Partager des informations, attribuer des tâches et suivre leur réalisation selon les droits de chaque organisation." },
      { title: "Application de terrain", description: "Consulter une intervention, saisir un compte rendu et joindre des documents depuis les appareils réellement utilisés par vos équipes." }
    ],
    deliverables: ["Cadrage des utilisateurs, appareils et contraintes réseau", "Parcours UX et choix web, PWA ou mobile", "Interfaces, backend, comptes et connexions API", "Recette sur appareils, déploiement et documentation"],
    technologies: ["React", "Next.js", "TypeScript", "React Native", "API", "PostgreSQL"],
    faq: [
      { question: "Faut-il un site responsive ou une application mobile ?", answer: "Le choix dépend des fonctions attendues, des appareils, de la distribution et des conditions réseau. Un portail web responsive peut suffire ; une application mobile se discute lorsqu’il faut des fonctions d’appareil ou des usages particuliers. Nous comparons les options au cadrage." },
      { question: "Peut-on connecter la plateforme à notre logiciel existant ?", answer: "Oui, selon les possibilités réelles du logiciel : API, webhooks ou échanges de fichiers. Nous vérifions les accès, les données disponibles, les permissions et les contraintes avant de confirmer le périmètre de connexion." },
      { question: "L’application pourra-t-elle fonctionner sans réseau ?", answer: "Un fonctionnement hors connexion doit être défini par parcours. Il implique de choisir ce qui est conservé sur l’appareil, les actions disponibles et la résolution des conflits à la reconnexion. Ce besoin est chiffré et testé lorsqu’il fait partie du projet." }
    ],
    related: ["developpement-logiciel", "application-metier", "integration-api", "saas"]
  },
  {
    kind: "solutions", slug: "saas", number: "08", label: "PRODUIT / SAAS",
    name: "Produits SaaS", title: "Votre produit. Une base pour le faire grandir.",
    seoTitle: "Développement SaaS sur mesure pour votre produit logiciel",
    description: "Développez votre SaaS avec SEYA LABS : parcours produit, organisations clientes, comptes, permissions, abonnements, intégrations et exploitation du service.",
    intro: "Un produit SaaS sert plusieurs clients sans mélanger leurs données ni leurs usages. Nous construisons ses parcours, ses comptes et son architecture, avec les conditions nécessaires pour le déployer et le faire évoluer.",
    problemTitle: "Passer d’une idée ou d’un outil à un service logiciel.",
    problem: "Un outil qui fonctionne pour une équipe ne devient pas automatiquement un produit pour plusieurs organisations. Il faut préciser les droits, la séparation des données, l’accès au service, l’accompagnement et les responsabilités d’exploitation.",
    outcomes: ["Un premier parcours produit utilisable par vos clients.", "Des organisations, rôles et données correctement séparés.", "Un cycle d’accès et une exploitation documentés."],
    useCases: [
      { title: "Premier produit SaaS", description: "Transformer une proposition de service en un parcours accessible à un premier groupe de clients, avec un périmètre explicite." },
      { title: "Outil métier commercialisé", description: "Adapter un outil interne à plusieurs organisations : séparation des données, configuration, invitations et administration." },
      { title: "Évolution d’un produit existant", description: "Revoir un parcours, préparer une nouvelle intégration ou fiabiliser comptes, abonnements et déploiements après examen de l’architecture actuelle." }
    ],
    deliverables: ["Cadrage produit, organisations et première version", "Architecture, modèle de données et contrôle des accès", "Parcours, administration et abonnements selon le périmètre", "Tests d’isolation, déploiement et procédures d’exploitation"],
    technologies: ["Next.js", "React", "TypeScript", "PostgreSQL", "API", "Docker"],
    faq: [
      { question: "Quelle différence entre un SaaS et une application métier ?", answer: "Une application métier sert un processus et des utilisateurs définis. Un SaaS est exploité comme un service, souvent pour plusieurs organisations clientes, avec des comptes, une séparation des données et un cycle d’accès. Une application métier peut devenir un SaaS si son modèle et son architecture sont adaptés." },
      { question: "Intégrez-vous les abonnements et le paiement ?", answer: "Ces fonctions peuvent faire partie du périmètre. Nous précisons les formules, les événements du prestataire de paiement, les droits d’usage, les changements de formule et les situations d’échec. Les règles commerciales et comptables doivent être validées avec les personnes compétentes de votre organisation." },
      { question: "Peut-on commencer par un MVP ?", answer: "Oui. Un MVP permet de tester un premier parcours auprès d’une cible identifiée. Les fondations nécessaires à cet usage, notamment les accès et la séparation des données, sont prévues dès cette version ; les fonctions secondaires peuvent être différées." }
    ],
    related: ["mvp", "developpement-logiciel", "plateformes-web-mobile", "integration-api"]
  }
];
