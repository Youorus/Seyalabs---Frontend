import type { ServiceGuidance } from "./service-guidance";

export const additionalServiceGuidance: Record<string, ServiceGuidance> = {
  "intelligence-artificielle": {
    heading: "Intégrer l’IA autour d’une tâche vérifiable.",
    definition: "SEYA LABS conçoit des solutions d’IA pour rechercher une information, traiter des documents, assister une équipe ou préparer une action. Le projet commence par une tâche précise et un résultat attendu. Les données, les droits et l’évaluation déterminent ensuite si un assistant, un agent ou un traitement plus simple convient.",
    decisions: [
      { title: "Une tâche, un résultat attendu.", description: "Décrire les entrées, les utilisateurs et ce qui rend une réponse acceptable. Un usage trop large devient difficile à évaluer. Une règle déterministe peut suffire lorsque le traitement ne demande pas d’interprétation." },
      { title: "Lire, proposer ou agir.", description: "Un assistant qui répond et un agent qui modifie un outil demandent des contrôles différents. Nous précisons les permissions, les étapes de validation et les décisions qui restent à une personne." },
      { title: "Évaluer avant d’élargir.", description: "Un jeu de cas représentatif sert à examiner qualité, erreurs, abstention et coût d’usage. Les critères sont définis avec le métier ; une démonstration réussie sur quelques exemples ne suffit pas à valider tout le périmètre." }
    ],
    dependencies: [
      { title: "Des cas représentatifs", description: "Exemples d’entrées, résultats attendus et cas ambigus. Les personnes capables de valider ces attentes participent au cadrage." },
      { title: "Des données utilisables", description: "Sources, qualité, propriétaires et droits d’accès. Le corpus et les services envisagés sont examinés avant leur intégration." },
      { title: "Un cadre d’exploitation", description: "Volume de demandes, délai acceptable, validations humaines et responsable des corrections après lancement." }
    ],
    acceptance: ["Comparer les sorties aux attentes sur le jeu de cas convenu.", "Tester l’absence d’information et les demandes hors périmètre.", "Vérifier les accès avec plusieurs profils et les limites des actions.", "Observer latence, consommation et prise en charge d’une erreur."],
    tradeoff: "L’IA peut produire une réponse plausible mais incorrecte. Le niveau de vérification doit correspondre à l’usage. Si les données sont insuffisantes ou si une erreur ne peut pas être détectée et reprise, le périmètre doit être revu avant de confier la tâche au système.",
    articles: ["assistant-ia-donnees-droits-et-evaluation"]
  },
  "assistant-ia": {
    heading: "Un assistant IA documentaire avec des sources et des droits.",
    definition: "Un assistant IA aide vos équipes à retrouver et comprendre les informations d’un corpus défini. SEYA LABS prépare la recherche documentaire, les accès et l’évaluation des réponses. Le périmètre précise les documents utilisables, leur mise à jour et les questions auxquelles l’assistant doit savoir ne pas répondre.",
    decisions: [
      { title: "Un corpus de référence.", description: "Documents périmés, versions contradictoires et sources sans propriétaire fragilisent les réponses. Nous définissons les contenus retenus et la façon de les mettre à jour avant d’élargir la recherche." },
      { title: "Des permissions dans la recherche.", description: "Les documents accessibles dépendent du profil de l’utilisateur. Les restrictions doivent intervenir dans la récupération des informations et être vérifiées avec des comptes distincts." },
      { title: "Une réponse contrôlable.", description: "Le parcours prévoit les sources, les cas sans réponse et le retour d’une erreur. Le jeu d’évaluation distingue information retrouvée, interprétation correcte et abstention attendue." }
    ],
    dependencies: [
      { title: "Le corpus", description: "Formats, volumes, versions, langue et fréquence de mise à jour. Les documents représentatifs permettent de vérifier la recherche." },
      { title: "Les profils d’accès", description: "Groupes utilisateurs, restrictions documentaires et mécanisme d’authentification de l’outil qui accueillera l’assistant." },
      { title: "Les questions du métier", description: "Questions courantes, réponses attendues, sources et cas impossibles à conclure avec le corpus disponible." }
    ],
    acceptance: ["Retrouver les passages utiles sur les questions définies au cadrage.", "Relier les réponses aux sources et vérifier leur cohérence.", "Refuser l’accès aux documents d’un autre profil.", "Tester une mise à jour, une contradiction et une question sans réponse."],
    tradeoff: "Un assistant ne corrige pas automatiquement une documentation incohérente. Une première base limitée, maintenue et évaluée peut être préférable à l’indexation de tous les fichiers. L’extension se décide à partir des résultats observés et des responsabilités de mise à jour.",
    articles: ["assistant-ia-donnees-droits-et-evaluation"]
  },
  "agents-ia": {
    heading: "Des agents IA dont les actions restent encadrées.",
    definition: "Un agent IA utilise des outils pour accomplir une tâche au-delà de la génération d’une réponse. SEYA LABS définit son mandat, les données consultables et les actions autorisées. Les validations, les limites d’exécution et les procédures de reprise font partie du produit livré.",
    decisions: [
      { title: "Le bon niveau d’autonomie.", description: "Nous distinguons consultation, proposition et exécution. Une action qui engage une opération peut demander une validation humaine. L’autonomie se définit action par action, selon les effets possibles." },
      { title: "Des outils au contrat explicite.", description: "Chaque outil possède des entrées validées, des permissions et un résultat interprétable. Les contrôles métier restent côté serveur ; une consigne au modèle ne remplace pas une autorisation." },
      { title: "Un arrêt et une reprise.", description: "Une tâche doit pouvoir être interrompue ou transférée à une personne. Nous précisons les limites de tentatives, les erreurs récupérables et les opérations qui ne doivent pas être exécutées deux fois." }
    ],
    dependencies: [
      { title: "Les actions envisagées", description: "Liste des outils, effets de chaque opération, réversibilité et personnes qui peuvent autoriser ou reprendre une action." },
      { title: "Les accès de test", description: "Documentation API et environnement où vérifier les actions sans perturber les opérations réelles." },
      { title: "Les cas d’évaluation", description: "Tâches normales, demandes ambiguës, permissions refusées et outils indisponibles, avec les résultats attendus." }
    ],
    acceptance: ["Vérifier les outils appelés, leurs paramètres et les effets obtenus.", "Bloquer une action hors mandat ou non autorisée.", "Tester validation, refus et interruption d’une tâche.", "Reprendre un échec sans répéter une opération déjà effectuée."],
    tradeoff: "Un workflow classique peut mieux convenir à une suite de règles stable. Un agent devient pertinent lorsque la tâche demande une interprétation, avec des outils et des contrôles adaptés. Nous commençons par un mandat limité plutôt que par une autonomie générale difficile à évaluer.",
    articles: ["assistant-ia-donnees-droits-et-evaluation", "automatiser-un-processus-par-ou-commencer"]
  },
  "automatisation": {
    heading: "Automatiser les opérations à partir de règles comprises.",
    definition: "SEYA LABS accompagne l’automatisation des processus d’entreprise : collecte d’informations, transmissions, validations et échanges entre outils. Nous cartographions le travail réel, choisissons un premier flux et préparons son suivi. Les exceptions et les responsabilités comptent autant que le scénario normal.",
    decisions: [
      { title: "Choisir un processus stable.", description: "Fréquence, règles explicites et données disponibles permettent d’examiner un candidat. Un processus changeant ou mal compris peut demander un travail de clarification avant son automatisation." },
      { title: "Connecter ou développer.", description: "Nous comparons les connecteurs existants, les API et un traitement spécifique. Les accès, les quotas et les possibilités de reprise déterminent la solution ; le nombre de tâches ne suffit pas à choisir un outil." },
      { title: "Conserver les décisions utiles.", description: "Une validation métier peut rester humaine tout en automatisant sa préparation. Le flux doit rendre visible ce qui attend une décision et prévoir le traitement d’un refus ou d’une information manquante." }
    ],
    dependencies: [
      { title: "Le processus réel", description: "Déclencheur, étapes, règles, exceptions et personne responsable. Un exemple complet permet de vérifier la cartographie." },
      { title: "Les outils concernés", description: "Accès, documentation, connecteurs et environnements de test. Chaque connexion est vérifiée avant d’être retenue." },
      { title: "La mesure de départ", description: "Temps de traitement et erreurs observables à relever dans votre contexte pour comparer les résultats après lancement." }
    ],
    acceptance: ["Exécuter le flux normal et ses principales exceptions.", "Détecter une donnée rejetée ou un outil indisponible.", "Rejouer un événement sans créer une action en double.", "Identifier les traitements en attente et appliquer la procédure de reprise."],
    tradeoff: "Automatiser un processus ne garantit pas qu’il est utile ou correctement défini. Une première étape peut consister à supprimer une transmission inutile ou à harmoniser les données. La maintenance des connexions et des règles doit être prévue dès le cadrage.",
    articles: ["automatiser-un-processus-par-ou-commencer"]
  },
  "automatisation-workflows": {
    heading: "Des workflows métier qui peuvent être suivis et repris.",
    definition: "Un workflow relie les étapes d’un processus : réception, contrôle, transmission, validation et notification. SEYA LABS le construit avec n8n, des connecteurs ou un développement adapté aux outils concernés. Le flux possède des états compréhensibles, des contrôles et une procédure de reprise.",
    decisions: [
      { title: "Le déclencheur et le résultat.", description: "Un événement entrant, un planning ou une action utilisateur peut démarrer le flux. Nous définissons ce qui marque sa réussite et les opérations qui peuvent être reprises séparément." },
      { title: "Les données entre étapes.", description: "La correspondance des champs, les identifiants et les données obligatoires sont explicites. Un champ absent doit produire une situation compréhensible, plutôt qu’une transmission silencieusement incomplète." },
      { title: "La reprise des incidents.", description: "Un événement répété, une limite d’API ou une interruption doivent être traités selon leurs effets. Nous distinguons nouvelle tentative, mise en attente et intervention humaine." }
    ],
    dependencies: [
      { title: "La carte du flux", description: "Étapes, décisions, personnes concernées et exemples de demandes incomplètes ou refusées." },
      { title: "Les connexions", description: "Outils, comptes de test, permissions et contraintes documentées de chaque fournisseur." },
      { title: "Le suivi", description: "Responsable du workflow, alertes utiles et informations nécessaires pour comprendre puis reprendre un traitement." }
    ],
    acceptance: ["Vérifier le résultat dans les outils destinataires.", "Tester un champ absent, un refus et une limite de connexion.", "Rejouer un événement puis contrôler l’absence d’opération en double.", "Retrouver une exécution en échec et appliquer la reprise convenue."],
    tradeoff: "Un workflow demande une maintenance quand les outils, leurs accès ou les règles changent. Si le processus repose sur de nombreuses décisions implicites, une application métier ou une étape de clarification peut être préférable à l’ajout de branches difficiles à maintenir.",
    articles: ["automatiser-un-processus-par-ou-commencer"]
  },
  "data-api": {
    heading: "Des données structurées, des échanges compréhensibles.",
    definition: "SEYA LABS conçoit les fondations de vos systèmes : modèles de données, backend, flux de reprise, intégrations et restitutions métier. Nous relions les informations à leurs sources et à leurs règles, afin que vos équipes puissent comprendre les résultats et repérer les incohérences.",
    decisions: [
      { title: "La source de référence.", description: "Lorsque plusieurs outils décrivent le même objet, il faut définir les identifiants et la référence pour chaque information. Les conflits ne peuvent pas être résolus uniquement par la date du dernier fichier reçu." },
      { title: "Le modèle et la qualité.", description: "Nous examinons relations, valeurs absentes et doublons avec le métier. Les transformations et les rejets sont documentés ; une anomalie ne doit pas disparaître sans décision." },
      { title: "La restitution utile.", description: "Un dashboard commence par la définition d’un indicateur, sa formule, son périmètre et sa fréquence de mise à jour. Les accès et la traçabilité des données servent à expliquer le résultat." }
    ],
    dependencies: [
      { title: "Les sources", description: "Exports, bases ou API, volumes, formats et exemples représentatifs. Les accès de test permettent d’examiner les données disponibles." },
      { title: "Les règles métier", description: "Définitions des objets et indicateurs, propriétaires des informations et critères d’une donnée acceptable." },
      { title: "La transition", description: "Historique à reprendre, fréquence des échanges et conditions où le nouveau système devient la référence." }
    ],
    acceptance: ["Rapprocher les volumes, les identifiants et les relations avec les sources.", "Contrôler les transformations et retrouver les données rejetées.", "Vérifier un indicateur sur un jeu dont le résultat est connu.", "Tester les droits, une interruption et la reprise des flux."],
    tradeoff: "Un modèle technique ne résout pas seul les contradictions entre définitions métier. Certaines données demandent une décision ou un nettoyage avant migration. Les exigences de fraîcheur et de volume sont précisées sur les usages réels pour choisir une architecture proportionnée.",
    articles: ["migration-donnees-application-metier", "cahier-des-charges-application-metier"]
  },
  "plateformes-web-mobile": {
    heading: "Une plateforme web ou mobile adaptée aux usages réels.",
    definition: "Une plateforme donne accès à vos services depuis un navigateur ou une application mobile. SEYA LABS construit portails clients, espaces partenaires et outils de terrain avec leurs comptes, leurs API et leurs parcours. Les appareils, les conditions réseau et les fonctions nécessaires guident l’architecture.",
    decisions: [
      { title: "Choisir le mode d’accès.", description: "Web responsive, PWA et application mobile ont des implications différentes pour la distribution, les fonctions d’appareil et la maintenance. Nous partons des tâches à réaliser et des appareils réellement utilisés." },
      { title: "Séparer les espaces.", description: "Client, partenaire et équipe interne peuvent agir sur le même dossier avec des droits distincts. Nous précisons les informations visibles, les actions possibles et les contrôles côté serveur." },
      { title: "Définir l’accès hors connexion.", description: "Si le terrain le demande, nous choisissons les données disponibles localement et les actions différables. La reconnexion, les conflits et les limites de stockage doivent être conçus et testés." }
    ],
    dependencies: [
      { title: "Les utilisateurs et appareils", description: "Profils, équipements, lieux d’usage et contraintes d’accès. Un échantillon d’appareils représentatif sert à la recette." },
      { title: "Les systèmes existants", description: "Authentification, API, documents et données à afficher ou modifier depuis la plateforme." },
      { title: "La distribution", description: "Accès web, installation éventuelle, comptes de publication et responsabilités de mise à jour selon l’approche retenue." }
    ],
    acceptance: ["Terminer le parcours prioritaire sur les appareils convenus.", "Contrôler l’accès à un dossier avec plusieurs profils.", "Tester chargement, erreur, interruption réseau et reprise.", "Vérifier les fonctions d’appareil et le déploiement prévus au périmètre."],
    tradeoff: "Une application native n’est pas nécessaire à tous les services. Elle ajoute des contraintes de distribution et de suivi des plateformes. Un portail web peut répondre au besoin lorsque les fonctions attendues et les conditions d’accès le permettent.",
    articles: ["cahier-des-charges-application-metier", "budget-application-metier"]
  },
  "saas": {
    heading: "Développer un SaaS avec ses comptes et ses conditions d’exploitation.",
    definition: "SEYA LABS construit des produits SaaS pour servir plusieurs organisations avec des parcours, des droits et des données séparés. Le développement couvre la première proposition utilisable, le modèle des comptes et les fonctions d’accès au service convenues. L’exploitation et les évolutions entrent dans le cadrage.",
    decisions: [
      { title: "La première proposition.", description: "Nous définissons le parcours utile à une cible identifiée et les fonctions différées. Un MVP peut permettre de tester cette proposition avant d’ajouter des offres ou une administration plus complète." },
      { title: "Les organisations et leurs données.", description: "L’isolation concerne les requêtes, les fichiers, les exports et les traitements différés. Les rôles d’administration et de support doivent être définis avec leurs permissions et leur traçabilité." },
      { title: "Le cycle d’accès.", description: "Invitation, activation, abonnement, changement de formule et suspension se traduisent en états du produit. Les événements du prestataire de paiement et leurs erreurs sont traités selon les règles validées." }
    ],
    dependencies: [
      { title: "Le produit et la cible", description: "Utilisateurs, problème traité, premiers parcours et personnes qui essaieront la version initiale." },
      { title: "Les règles d’accès", description: "Organisations, rôles, formules et conséquences d’un changement ou d’un arrêt de service." },
      { title: "L’exploitation", description: "Hébergement, support, sauvegardes, exports et responsabilités de suivi du produit après son lancement." }
    ],
    acceptance: ["Réaliser le parcours avec plusieurs organisations et rôles.", "Empêcher la consultation ou la modification des données d’un autre client.", "Tester activation, changement d’accès et événements d’abonnement répétés.", "Vérifier déploiement, export et reprise dans le périmètre convenu."],
    tradeoff: "Un SaaS engage une exploitation continue et une responsabilité vis-à-vis de plusieurs clients. La séparation des données et les accès ne peuvent pas attendre une version ultérieure si la première version sert déjà plusieurs organisations. Les fonctions secondaires peuvent en revanche être différées.",
    articles: ["logiciel-sur-mesure-ou-saas", "cahier-des-charges-application-metier", "budget-application-metier"]
  }
};
