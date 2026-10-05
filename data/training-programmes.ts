import type { Training } from "./training-types";

export const appliedTrainings: Training[] = [
  {
    slug: "application-metier", number: "05", name: "Concevoir une application métier",
    title: "Votre processus. Un outil bien défini.",
    seoTitle: "Formation application métier : cadrage, UX et recette",
    description: "Apprenez à concevoir une application métier : processus, rôles, données, parcours UX et recette. Un atelier de cadrage adapté à votre équipe.",
    intro: "Avant de développer, il faut rendre vos règles compréhensibles. Ce parcours aide les équipes métier et produit à passer d’un tableur ou d’un processus dispersé à un cahier des charges exploitable, avec un périmètre que l’on peut réellement vérifier.",
    audience: "Responsables opérationnels, chefs de projet, équipes produit et référents métier qui doivent définir un outil interne ou participer à sa recette. Le parcours convient aussi aux équipes qui préparent l’évolution d’une application existante.",
    prerequisites: "Connaître un processus de votre organisation et pouvoir en décrire un exemple. Aucune programmation n’est requise. Des documents et fichiers anonymisés peuvent servir de support, après vérification de leur usage autorisé.",
    objectives: ["Décrire un processus avec ses décisions et ses exceptions.", "Définir les rôles, les états d’un dossier et les actions autorisées.", "Construire un parcours et un modèle de données cohérents.", "Prioriser une version utilisable et écrire ses critères de recette."],
    modules: [
      { title: "Observer le travail réel", description: "Reconstituer une demande de son arrivée à sa clôture. Repérer les ressaisies, les informations absentes et les validations informelles. Distinguer une règle nécessaire d’une habitude imposée par l’outil actuel." },
      { title: "Dessiner les rôles et les données", description: "Identifier les objets métier, leurs relations et la source de référence. Établir une matrice de droits et les transitions entre états. Traiter aussi le dossier incomplet et la correction après validation." },
      { title: "Concevoir le parcours prioritaire", description: "Esquisser les écrans et les actions utiles à chaque rôle. Définir un périmètre de bout en bout et les fonctions différées. Examiner les connexions aux outils existants et les données à reprendre." },
      { title: "Préparer la recette métier", description: "Transformer les règles en scénarios observables, avec les résultats attendus. Organiser les retours et les arbitrages. Préparer l’accompagnement des utilisateurs et le passage de l’ancien outil au nouveau." }
    ],
    workshop: { title: "Un dossier métier prêt à être cadré.", description: "Le groupe travaille sur un suivi de demandes ou un processus représentatif. Il produit un parcours prioritaire, ses règles et un jeu de scénarios, puis examine les zones qui demandent encore une décision.", outputs: ["Une carte du processus et une matrice des rôles.", "Un parcours esquissé et un modèle de données.", "Un périmètre priorisé et une grille de recette."] },
    tools: ["Cartographie", "Parcours UX", "Modèle de données", "Recette"], relatedExpertise: "developpement-logiciel", relatedSolution: "application-metier"
  },
  {
    slug: "plateformes-web-mobile", number: "06", name: "Développer une plateforme web ou mobile",
    title: "Un parcours. Sur les bons appareils.",
    seoTitle: "Formation développement de plateformes web et mobiles",
    description: "Formation plateformes web/mobile : interfaces, authentification, API, contraintes réseau et tests sur appareils. Construisez un parcours pédagogique utilisable.",
    intro: "Un portail au bureau et un outil de terrain ne se conçoivent pas de la même manière. Cette formation relie les usages, les interfaces et les échanges côté serveur pour construire un parcours adapté aux appareils et aux conditions réelles d’accès.",
    audience: "Développeurs, équipes produit et responsables techniques qui préparent une plateforme client, un espace partenaire ou une application de terrain. Les modules de conception peuvent être suivis par les référents métier du projet.",
    prerequisites: "Des bases de développement web et d’API sont nécessaires pour les ateliers techniques. Le framework, les appareils de test et les accès pédagogiques sont définis avant la session. Le volet mobile natif dépend de la stack retenue.",
    objectives: ["Choisir une approche web responsive, PWA ou mobile selon les usages.", "Construire un parcours accessible avec des états de chargement et d’erreur.", "Relier une interface à une API en respectant les droits utilisateurs.", "Tester le comportement sur appareils et lors d’une interruption réseau."],
    modules: [
      { title: "Web ou application mobile", description: "Examiner les appareils, la distribution et les fonctions nécessaires : caméra, notifications ou accès hors connexion. Comparer les conséquences d’un site responsive, d’une PWA et d’une application mobile sans imposer une stack à tous les projets." },
      { title: "Interfaces et parcours", description: "Construire la navigation, les formulaires et les états d’attente. Adapter les interactions au tactile et au clavier. Prévoir les messages qui aident à terminer une tâche lorsque les données sont absentes ou rejetées." },
      { title: "Comptes et échanges", description: "Relier l’interface à un service côté serveur. Comprendre session, authentification et autorisation. Contrôler les entrées et les actions au bon niveau ; éviter que l’interface seule porte les restrictions d’accès." },
      { title: "Tester sur le terrain", description: "Vérifier les tailles d’écran, les appareils concernés et une connexion interrompue. Étudier les limites de la synchronisation différée et les conflits possibles. Préparer un environnement de recette et un parcours de déploiement." }
    ],
    workshop: { title: "Un espace utilisateur testé sur plusieurs écrans.", description: "L’exercice relie consultation, saisie et suivi d’une demande. Les participants comparent le comportement sur ordinateur et mobile, puis documentent les conditions de reprise lorsqu’un échange échoue.", outputs: ["Une décision d’architecture argumentée.", "Un parcours pédagogique relié à une API.", "Une matrice de tests par appareil et état réseau."] },
    tools: ["React", "TypeScript", "API", "Responsive", "Tests appareils"], relatedExpertise: "developpement-logiciel", relatedSolution: "plateformes-web-mobile"
  },
  {
    slug: "saas", number: "07", name: "Concevoir et développer un SaaS",
    title: "Un produit. Plusieurs organisations.",
    seoTitle: "Formation SaaS : architecture, comptes et exploitation",
    description: "Formation conception de SaaS : organisations, isolation des données, comptes, abonnements et exploitation. Travaillez les fondations d’un produit multi-client.",
    intro: "Un SaaS doit distinguer ses clients, leurs droits et leurs données tout au long du produit. Ce programme traite les décisions qui dépassent une simple application : organisations, accès, abonnements, déploiements et fonctionnement au quotidien.",
    audience: "Développeurs, responsables techniques, fondateurs et équipes produit qui préparent un service logiciel destiné à plusieurs organisations. Les arbitrages produit et les ateliers de développement peuvent former deux volets du parcours.",
    prerequisites: "Connaître les bases d’une application web, d’une API et d’une base relationnelle pour la pratique technique. Les intégrations de paiement sont étudiées en environnement de test. Aucun compte de production ni facturation réelle n’est nécessaire à l’exercice.",
    objectives: ["Définir les organisations, leurs utilisateurs et leurs permissions.", "Comprendre et tester l’isolation des données entre clients.", "Relier les droits d’usage au cycle d’un abonnement.", "Préparer les déploiements, le support et la récupération des données."],
    modules: [
      { title: "Le modèle du produit", description: "Décrire les organisations clientes, les utilisateurs et les rôles. Séparer le compte utilisateur de l’appartenance à une organisation. Choisir une première proposition utilisable et expliciter les limites de chaque formule." },
      { title: "L’isolation des données", description: "Comparer les approches de séparation des clients et leurs contraintes. Vérifier les accès dans les requêtes, les exports, les fichiers et les tâches différées. Écrire des scénarios où un utilisateur tente d’accéder à une autre organisation." },
      { title: "Accès et abonnements", description: "Modéliser invitation, activation, changement de formule et suspension. Relier les événements d’un prestataire de paiement aux droits d’usage. Prévoir les événements répétés, les retards et les états qui demandent une vérification." },
      { title: "Exploiter le service", description: "Préparer migrations de schéma, configuration, suivi des erreurs et sauvegardes. Définir les actions de support et leur traçabilité. Examiner les exports, la fermeture d’un compte et la reprise après un incident." }
    ],
    workshop: { title: "Deux organisations. Des données bien séparées.", description: "Sur un produit pédagogique, le groupe définit deux organisations, plusieurs rôles et un cycle d’abonnement simulé. Il construit ou examine les contrôles empêchant une lecture ou une action dans le mauvais compte.", outputs: ["Un modèle organisations, membres et droits.", "Des scénarios d’isolation et d’abonnement.", "Un plan de déploiement et de support du produit."] },
    tools: ["Multi-tenant", "PostgreSQL", "API", "Abonnements", "Tests"], relatedExpertise: "developpement-logiciel", relatedSolution: "saas"
  },
  {
    slug: "mvp", number: "08", name: "Cadrer et lancer un MVP",
    title: "Une hypothèse. Un produit à éprouver.",
    seoTitle: "Formation MVP : cadrage produit, prototype et lancement",
    description: "Formation création de MVP : hypothèse, parcours prioritaire, prototype, critères d’observation et lancement. Préparez une première version testable.",
    intro: "Réduire une liste de fonctionnalités ne suffit pas à définir un MVP. Cette formation vous aide à choisir ce que vous voulez apprendre, le parcours nécessaire pour l’observer et les conditions d’un test avec de vrais utilisateurs.",
    audience: "Fondateurs, responsables produit, chefs de projet et équipes de développement qui préparent une première version. Le groupe peut travailler sur une idée nouvelle ou sur un service à tester auprès d’une cible précise.",
    prerequisites: "Disposer d’une idée de problème et pouvoir identifier les utilisateurs concernés. Aucun code n’est requis pour les modules de cadrage et de prototypage. Un volet de réalisation technique demande les bases de la stack choisie.",
    objectives: ["Formuler une hypothèse produit et les observations qui permettent de la discuter.", "Distinguer prototype, MVP utilisable et première version métier.", "Choisir un parcours complet et rendre les arbitrages explicites.", "Préparer le test, les retours et la décision qui suit le lancement."],
    modules: [
      { title: "Du problème à l’hypothèse", description: "Décrire un utilisateur, une situation et le changement attendu. Séparer ce qui est observé de ce qui est supposé. Choisir une question à vérifier et éviter de confondre intérêt déclaré et usage effectif." },
      { title: "Réduire le périmètre", description: "Dessiner le parcours qui permet le test. Examiner ce qui peut rester manuel et ce qui doit être fiable dès la première version. Documenter les fonctions différées et les conséquences des choix techniques." },
      { title: "Prototyper et préparer la livraison", description: "Utiliser un prototype pour revoir le parcours avant développement. Définir les critères de recette, les intégrations indispensables et les exigences d’accès. Organiser les étapes de réalisation en fonction des dépendances connues." },
      { title: "Observer et décider", description: "Préparer le recrutement des utilisateurs, les questions et les observations d’usage. Examiner les abandons et les erreurs sans leur donner une explication automatique. Définir les décisions possibles : poursuivre, modifier ou abandonner une hypothèse." }
    ],
    workshop: { title: "Un premier parcours et un plan de test.", description: "Les participants prennent une idée de service, choisissent une hypothèse et esquissent la version nécessaire à son observation. Ils confrontent le périmètre au temps disponible et expliquent les décisions qu’ils prendront selon les retours.", outputs: ["Une fiche d’hypothèse et de cible.", "Un prototype de parcours et un backlog priorisé.", "Un plan de test et une grille de décisions."] },
    tools: ["Cadrage produit", "Prototype", "Backlog", "Recette", "Retours utilisateurs"], relatedExpertise: "developpement-logiciel", relatedSolution: "mvp"
  },
  {
    slug: "assistant-ia", number: "09", name: "Construire un assistant IA documentaire",
    title: "Des documents. Des réponses vérifiables.",
    seoTitle: "Formation assistant IA et RAG sur vos documents",
    description: "Formation assistant IA documentaire : préparation du corpus, RAG, sources, permissions et évaluation. Concevez un assistant avec des réponses vérifiables.",
    intro: "Un assistant documentaire doit retrouver les bonnes informations et reconnaître ce qu’il ne peut pas conclure. Ce parcours traite la préparation du corpus, la recherche, les permissions et l’évaluation des réponses sur des questions métier.",
    audience: "Développeurs, équipes data, responsables de connaissances et référents métier qui préparent un assistant sur une documentation interne. Le programme relie les décisions éditoriales du corpus aux choix d’intégration technique.",
    prerequisites: "Connaître les bases du développement et des API pour le volet technique. Un corpus pédagogique est utilisé par défaut ; des documents internes peuvent être retenus après vérification des accès et des conditions d’usage. Les modules de cadrage sont accessibles aux profils métier.",
    objectives: ["Préparer un corpus avec ses versions et ses propriétaires.", "Comprendre la recherche documentaire et le contexte transmis au modèle.", "Appliquer les permissions lors de la recherche et de la réponse.", "Évaluer les sources, les réponses et les cas où l’assistant doit s’abstenir."],
    modules: [
      { title: "Préparer les connaissances", description: "Repérer les documents de référence, les doublons et les contenus périmés. Définir les métadonnées utiles, la mise à jour et les droits de lecture. Construire un jeu de questions représentatif avant de régler la recherche." },
      { title: "Retrouver le contexte", description: "Comprendre découpage, indexation et recherche sémantique dans un dispositif RAG. Examiner les passages retrouvés et leur pertinence. Distinguer un échec de recherche d’une mauvaise interprétation par le modèle." },
      { title: "Répondre avec des limites", description: "Formuler une réponse reliée aux sources disponibles. Prévoir l’absence d’information, une contradiction ou une demande hors périmètre. Tester les filtres d’accès avant la génération et les tentatives de détourner les consignes via un document." },
      { title: "Évaluer et maintenir", description: "Comparer les réponses aux attentes du jeu de questions. Vérifier citations, abstention, latence et coût d’usage. Préparer un contrôle après ajout de documents ou changement de modèle et attribuer la responsabilité des corrections." }
    ],
    workshop: { title: "Un assistant testé sur un corpus limité.", description: "Le groupe prépare une documentation pédagogique et construit ou analyse un assistant. Il confronte les réponses à un jeu de questions, dont une question sans réponse et une question portant sur un document inaccessible au profil testé.", outputs: ["Une fiche de corpus et de permissions.", "Un prototype ou un schéma de chaîne RAG.", "Un jeu d’évaluation avec sources et limites observées."] },
    tools: ["RAG", "Recherche sémantique", "LLM", "Python", "Évaluation"], relatedExpertise: "intelligence-artificielle", relatedSolution: "assistant-ia"
  },
  {
    slug: "agents-ia", number: "10", name: "Concevoir des agents IA encadrés",
    title: "Des actions utiles. Des limites explicites.",
    seoTitle: "Formation agents IA : outils, permissions et supervision",
    description: "Formation agents IA en entreprise : choix des outils, actions autorisées, validations humaines, tests et supervision. Concevez un agent au périmètre maîtrisé.",
    intro: "Lorsqu’un modèle peut agir sur un outil, la qualité d’une réponse ne suffit plus. Cette formation aide à définir ce que l’agent peut lire, proposer ou exécuter, et les points où une personne doit garder la décision.",
    audience: "Développeurs, équipes IA et responsables de processus qui souhaitent intégrer un agent à une activité précise. Les référents métier participent à la définition des actions, des exceptions et des validations nécessaires.",
    prerequisites: "Des bases de programmation, d’API et d’usage des modèles sont nécessaires pour la réalisation. Les outils sont simulés ou limités à un environnement pédagogique. Aucun accès aux opérations de production n’est requis pour l’atelier.",
    objectives: ["Choisir entre workflow déterministe, assistant et agent.", "Décrire des outils avec des entrées validées et des permissions limitées.", "Prévoir les validations humaines, les arrêts et les reprises.", "Évaluer une séquence d’actions et contrôler ses effets."],
    modules: [
      { title: "Définir le mandat", description: "Décrire la tâche, les informations disponibles et les actions autorisées. Identifier les décisions qui restent déterministes et celles où le modèle intervient. Fixer les limites de durée, de tentatives et de consommation adaptées à l’exercice." },
      { title: "Construire les outils", description: "Définir des fonctions avec un contrat d’entrée et un résultat lisible. Valider les paramètres côté serveur, limiter les permissions et distinguer consultation et écriture. Préparer les opérations répétées et les réponses ambiguës." },
      { title: "Garder le contrôle", description: "Placer une validation avant une action sensible et afficher les informations nécessaires à la décision. Prévoir annulation, refus et escalade. Examiner une tentative de détourner les instructions à partir d’une donnée externe." },
      { title: "Tester la trajectoire", description: "Évaluer les outils appelés, leurs arguments et le résultat final. Simuler une indisponibilité, un refus d’autorisation et un arrêt en cours de traitement. Définir les traces utiles et les conditions de reprise par une personne." }
    ],
    workshop: { title: "Un agent qui prépare une action soumise à validation.", description: "Dans un environnement simulé, l’agent examine une demande et propose une mise à jour. Le groupe teste la validation humaine, le refus et l’indisponibilité d’un outil, puis analyse la suite d’actions réalisée.", outputs: ["Un mandat d’agent et une matrice d’actions.", "Des contrats d’outils et un point de validation.", "Des scénarios d’échec et une grille d’évaluation."] },
    tools: ["LLM", "Tool calling", "API", "Permissions", "Supervision"], relatedExpertise: "intelligence-artificielle", relatedSolution: "agents-ia"
  },
  {
    slug: "automatisation-workflows", number: "11", name: "Construire des workflows avec n8n",
    title: "Des outils connectés. Un flux suivi.",
    seoTitle: "Formation n8n : workflows métier et automatisation",
    description: "Formation n8n : déclencheurs, transformations, connexions CRM, erreurs et reprise. Réalisez un workflow pédagogique avec des contrôles explicites.",
    intro: "Ce parcours va de la cartographie à la réalisation d’un workflow dans n8n. Vous pratiquez les déclencheurs, les transformations et les connexions, puis les cas qui déterminent sa fiabilité : doublons, quotas et interruptions.",
    audience: "Équipes opérations, profils no-code et développeurs qui souhaitent construire ou maintenir des automatisations. Les exercices peuvent relier une demande entrante, un CRM et un suivi d’équipe, selon les outils retenus.",
    prerequisites: "Être à l’aise avec des données structurées et connaître le processus à automatiser. Un environnement n8n pédagogique et les accès aux outils de test sont préparés. Des bases JSON et API sont utiles ; les transformations par code demandent des notions de JavaScript.",
    objectives: ["Construire un workflow avec déclencheurs, conditions et transformations.", "Connecter des outils en respectant les permissions et les limites d’API.", "Éviter les opérations en double et reprendre un traitement interrompu.", "Documenter les exécutions, les alertes et les responsabilités."],
    modules: [
      { title: "Concevoir le flux dans n8n", description: "Décrire les entrées et le résultat attendu. Pratiquer un déclenchement planifié ou par événement, les conditions et le passage des données entre étapes. Garder les règles métier lisibles et distinguer les branches normales des exceptions." },
      { title: "Transformer et connecter", description: "Manipuler les champs et les formats d’un jeu de données pédagogique. Connecter une API ou un outil CRM de test. Examiner pagination, authentification et quotas dans la documentation du système utilisé." },
      { title: "Prévoir les incidents", description: "Simuler une donnée incomplète, une requête refusée et un événement répété. Définir les reprises et les opérations qui doivent attendre une décision humaine. Vérifier les effets d’une relance avant de la rendre automatique." },
      { title: "Transférer et exploiter", description: "Organiser la configuration et les accès, documenter les dépendances et les états utiles. Choisir les informations à conserver dans le suivi. Préparer les alertes et une procédure de reprise compréhensible par la personne responsable du flux." }
    ],
    workshop: { title: "De la demande au CRM, avec reprise sur erreur.", description: "Les participants construisent un flux qui reçoit une demande, vérifie ses champs et alimente un outil de test. Ils rejouent un événement, interrompent une étape et comparent les résultats avec les critères attendus.", outputs: ["Un workflow pédagogique documenté.", "Une table de correspondance des champs.", "Un plan de test et une procédure de reprise."] },
    tools: ["n8n", "JSON", "Webhooks", "CRM", "API"], relatedExpertise: "automatisation", relatedSolution: "automatisation-workflows"
  },
  {
    slug: "integration-api", number: "12", name: "Développer des intégrations API fiables",
    title: "Deux systèmes. Un échange maîtrisé.",
    seoTitle: "Formation intégration API : REST, webhooks et synchronisation",
    description: "Formation intégration API : contrats REST, authentification, webhooks, identifiants, quotas et reprises. Testez une synchronisation entre deux systèmes.",
    intro: "Une connexion réussie une fois n’est pas encore une intégration exploitable. Ce parcours traite les contrats API, les identifiants et les mécanismes nécessaires pour détecter un échec, éviter un doublon et reprendre les échanges.",
    audience: "Développeurs, équipes backend et responsables techniques qui relient CRM, ERP, applications métier ou services externes. Les exemples sont choisis selon les échanges à comprendre ou les connecteurs à maintenir.",
    prerequisites: "Savoir programmer et manipuler des requêtes HTTP et des objets JSON. La session utilise une API pédagogique ou un environnement de test accessible. Les permissions, la documentation et les contraintes d’accès sont vérifiées au cadrage.",
    objectives: ["Lire et tester un contrat API avec ses erreurs et ses limites.", "Gérer authentification, permissions et secrets dans l’environnement retenu.", "Définir la correspondance des identifiants et la source de référence.", "Tester une reprise après doublon, délai dépassé ou interruption."],
    modules: [
      { title: "Lire le contrat", description: "Examiner endpoints, méthodes, champs requis et codes de réponse. Tester filtres et pagination sur des données représentatives. Distinguer une erreur technique d’un rejet métier et expliciter les hypothèses de version d’API." },
      { title: "Autoriser les échanges", description: "Comprendre le mécanisme d’authentification prévu par le fournisseur. Limiter les permissions et préparer la configuration des secrets. Examiner expiration des accès, signatures de webhooks et erreurs d’autorisation selon le système étudié." },
      { title: "Synchroniser les données", description: "Définir la référence pour chaque champ et la correspondance des identifiants. Comparer événement et synchronisation planifiée. Traiter suppressions, conflits, pagination et quotas sans supposer que tous les fournisseurs offrent les mêmes fonctions." },
      { title: "Reprendre et observer", description: "Tester un événement répété et une réponse perdue après une action. Choisir des contrôles d’idempotence adaptés, des délais de reprise et les cas à mettre en attente. Construire un rapprochement des résultats et une procédure d’intervention." }
    ],
    workshop: { title: "Une synchronisation confrontée aux erreurs.", description: "Le groupe relie deux services pédagogiques avec des identifiants distincts. Il provoque un doublon, un rejet et une interruption, puis vérifie les enregistrements et les actions réellement effectuées après reprise.", outputs: ["Un contrat d’échange et une table d’identifiants.", "Un connecteur pédagogique avec ses contrôles.", "Des scénarios de reprise et un rapprochement des données."] },
    tools: ["REST", "HTTP", "JSON", "Webhooks", "Tests API"], relatedExpertise: "data-api", relatedSolution: "integration-api"
  }
];
