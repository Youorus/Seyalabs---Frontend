import { additionalServiceGuidance } from "./additional-service-guidance";

export type ServiceGuidance = {
  heading: string;
  definition: string;
  decisions: { title: string; description: string }[];
  dependencies: { title: string; description: string }[];
  acceptance: string[];
  tradeoff: string;
  articles: string[];
};

export const serviceGuidance: Record<string, ServiceGuidance> = {
  ...additionalServiceGuidance,
  "developpement-logiciel": {
    heading: "Développement logiciel sur mesure : partir du bon périmètre.",
    definition: "SEYA LABS accompagne les entreprises dans la conception et le développement de logiciels sur mesure : applications métier, outils internes et plateformes web. Nous définissons les parcours avec vos équipes, relions les systèmes nécessaires et préparons les conditions de mise en production. Le cadrage sert aussi à vérifier si configurer un SaaS ou connecter vos logiciels répondrait mieux au besoin.",
    decisions: [
      { title: "Développer ce qui est spécifique.", description: "Les règles métier, les rôles et les intégrations déterminent le périmètre. Nous distinguons ce qui doit être construit de ce qui peut s’appuyer sur un service existant. L’objectif est de consacrer le développement aux comportements qui comptent pour votre activité." },
      { title: "Faire évoluer ou remplacer.", description: "Un audit de l’existant permet d’examiner l’architecture, les accès au code, les tests et les usages. Une évolution progressive peut limiter les interruptions. Une réécriture se discute lorsque les contraintes de l’ancien système empêchent les changements nécessaires." },
      { title: "Choisir une première version complète.", description: "Nous définissons un parcours qui peut être utilisé de son entrée à son résultat. Les besoins différés et les tâches qui resteront manuelles sont documentés. Vous pouvez ainsi arbitrer le périmètre et le budget avec des conséquences visibles." }
    ],
    dependencies: [
      { title: "Le travail actuel", description: "Un parcours représentatif, ses exceptions et les personnes capables de valider les règles. Les fichiers, écrans et documents existants servent de point de départ." },
      { title: "Les connexions", description: "Les logiciels concernés, la documentation des API et les possibilités d’accès à un environnement de test. Une connexion non vérifiée reste une dépendance explicite." },
      { title: "Les données à conserver", description: "Les sources de référence, les volumes, les relations et les critères de reprise. La migration et son contrôle entrent dans l’estimation du projet." },
      { title: "La vie du logiciel", description: "Les utilisateurs, les contraintes de disponibilité, l’hébergement et les responsabilités de support. La documentation et le transfert sont prévus dans les livrables convenus." }
    ],
    acceptance: [
      "Exécuter les parcours prioritaires avec des données représentatives et les profils utilisateurs concernés.",
      "Vérifier les droits au niveau de l’application, les validations et les cas d’erreur définis au cadrage.",
      "Contrôler les échanges avec les outils tiers, y compris une interruption ou une donnée rejetée.",
      "Remettre les accès, la documentation et les procédures d’exploitation prévus dans le périmètre."
    ],
    tradeoff: "Le sur-mesure implique un travail de conception et une responsabilité d’exploitation dans la durée. Lorsque vos besoins sont standards et correctement couverts par un logiciel existant, son paramétrage peut être préférable. Nous comparons les options sur vos parcours ; les droits sur le code, la maintenance et la réversibilité se précisent dans le cadre contractuel du projet.",
    articles: ["logiciel-sur-mesure-ou-saas", "budget-application-metier", "cahier-des-charges-application-metier"]
  },
  "application-metier": {
    heading: "Une application métier sur mesure pour vos opérations.",
    definition: "Une application métier organise un processus propre à votre entreprise : suivi de dossiers, gestion d’interventions, validations ou portail d’équipe. Elle rassemble les informations, applique les règles et donne à chaque utilisateur les accès nécessaires. SEYA LABS construit ces outils avec leurs intégrations, leur reprise de données et des critères de recette définis avec le métier.",
    decisions: [
      { title: "Remplacer un tableur devenu central.", description: "Des fichiers concurrents, des formules difficiles à maintenir ou un suivi manuel des validations peuvent signaler un besoin. Nous reconstituons d’abord le processus derrière le fichier pour conserver les règles utiles et éviter de reproduire toutes les colonnes sans examen." },
      { title: "Coordonner plusieurs équipes.", description: "Un dossier peut passer entre opérations, administration et responsables. Nous définissons les statuts, les actions autorisées et les notifications utiles, ainsi que le traitement des corrections après validation. L’outil doit rendre le travail en attente visible." },
      { title: "Garder les logiciels qui remplissent leur rôle.", description: "Une application métier peut compléter votre CRM, votre ERP ou votre outil de facturation. Nous précisons quelle source fait référence pour chaque donnée et comment les échanges se déroulent. Le remplacement de tous les outils n’est pas un préalable." }
    ],
    dependencies: [
      { title: "Un dossier de bout en bout", description: "Un exemple normal, un dossier incomplet et une exception. Ces cas servent à dessiner les parcours et à préparer les premiers tests métier." },
      { title: "Les rôles et les règles", description: "Qui crée, modifie, valide, consulte et exporte ? Les restrictions par équipe ou périmètre doivent être décrites avec les personnes qui peuvent trancher." },
      { title: "La transition", description: "Les fichiers et historiques à reprendre, les doublons à traiter et le moment où le nouvel outil devient la référence. Les contrôles de migration sont préparés avant la bascule." },
      { title: "Les contraintes de terrain", description: "Les appareils utilisés, les conditions d’accès au réseau, les volumes et les horaires d’usage. Un besoin mobile ou hors connexion doit être précisé dès la conception." }
    ],
    acceptance: [
      "Créer, affecter, traiter puis clôturer un dossier avec les profils concernés, selon le parcours retenu.",
      "Refuser les actions non autorisées et retrouver l’historique des changements prévu dans le périmètre.",
      "Rapprocher les données reprises avec les sources et vérifier leurs relations et leurs pièces jointes.",
      "Tester une exception métier, une indisponibilité de connexion et la reprise prévue pour chacune."
    ],
    tradeoff: "Une application métier demande une implication de vos équipes pour clarifier les règles et valider les versions. Le budget dépend des parcours, des droits, des intégrations, de la migration et des exigences d’exploitation ; un nombre d’écrans ne suffit pas à le déterminer. Un premier périmètre cohérent permet d’observer l’usage avant d’ajouter des fonctions.",
    articles: ["quand-remplacer-excel-par-une-application-metier", "cahier-des-charges-application-metier", "migration-donnees-application-metier", "budget-application-metier"]
  },
  "integration-api": {
    heading: "Intégration API : rendre les échanges exploitables.",
    definition: "Une intégration API relie des logiciels pour partager des données ou déclencher des actions. SEYA LABS conçoit les connexions entre vos outils métier, CRM, ERP et services tiers. Nous définissons la source de référence, le sens des échanges et les mécanismes de suivi pour que la liaison puisse être comprise et reprise lorsqu’une opération échoue.",
    decisions: [
      { title: "Un événement ou une synchronisation.", description: "Un webhook peut déclencher un traitement à la réception d’un événement ; une synchronisation planifiée peut convenir à d’autres usages. Le choix dépend de la fraîcheur attendue, des capacités des outils et des quotas réellement disponibles." },
      { title: "Une seule référence par donnée.", description: "Lorsque deux systèmes peuvent modifier la même information, il faut décider quelle valeur conserver et comment résoudre un conflit. La correspondance des identifiants doit rester lisible pour éviter les doublons et les relations perdues." },
      { title: "Une reprise sans action en double.", description: "Un message peut être reçu plusieurs fois ou une réponse peut se perdre après une action réussie. Nous définissons les contrôles adaptés au flux, les tentatives de reprise et les cas qui doivent demander une intervention." }
    ],
    dependencies: [
      { title: "Documentation et accès", description: "Versions d’API, permissions, authentification et environnement de test. La connexion est examinée avant de tenir ses possibilités pour acquises." },
      { title: "Formats et contraintes", description: "Champs requis, identifiants, volumes, fréquences et quotas. Ces informations déterminent la structure et les limites du flux." },
      { title: "Suivi opérationnel", description: "Responsable du flux, états utiles, alertes et durée de conservation des traces à définir selon les données et le besoin." }
    ],
    acceptance: ["Vérifier un échange valide, un rejet et une réponse indisponible.", "Tester la réception répétée d’un événement sans créer d’action métier en double.", "Retrouver l’état d’un traitement et la procédure de reprise prévue."],
    tradeoff: "Une intégration dépend des capacités, des autorisations et des changements des systèmes tiers. Les quotas, les versions et les permissions doivent être suivis. Si une API ne permet pas l’action nécessaire, il faut revoir le périmètre ou le mode d’échange avant de développer le connecteur.",
    articles: ["migration-donnees-application-metier", "cahier-des-charges-application-metier", "automatiser-un-processus-par-ou-commencer"]
  },
  "mvp": {
    heading: "Développement MVP : tester une hypothèse avec un produit utilisable.",
    definition: "Un MVP est une première version conçue pour vérifier une hypothèse auprès d’utilisateurs. Il doit permettre un usage cohérent et produire des observations utiles à la suite du projet. SEYA LABS accompagne le choix du parcours, la conception, le développement et la mise en production, avec les contraintes indispensables au test.",
    decisions: [
      { title: "Une question à vérifier.", description: "Précisez l’utilisateur visé, le problème et le comportement que vous souhaitez observer. Un prototype d’interface, une expérimentation manuelle ou une application peuvent répondre à des questions différentes ; nous choisissons le support selon l’hypothèse." },
      { title: "Un parcours plutôt qu’un catalogue.", description: "La première version doit aller de l’entrée au résultat attendu. Les fonctionnalités secondaires sont différées explicitement. Les opérations qui restent manuelles sont organisées pour que le test puisse se dérouler sans confondre l’usage et les difficultés de lancement." },
      { title: "Une suite ouverte.", description: "Les choix d’architecture prennent en compte les contraintes connues, sans construire tous les besoins possibles. Les observations du test peuvent conduire à poursuivre, modifier le parcours ou arrêter une hypothèse. Ces issues doivent être prévues." }
    ],
    dependencies: [
      { title: "Les utilisateurs du test", description: "Qui essaiera le produit, dans quel contexte et avec quel accompagnement ? Un recrutement identifié vaut davantage qu’une cible trop générale." },
      { title: "Les limites de la version", description: "Parcours retenu, données utilisées, intégrations nécessaires et fonctions différées. Un calendrier se définit en fonction de ce périmètre." },
      { title: "Les observations attendues", description: "Opérations réussies, abandons, erreurs et retours à collecter avec des conditions de mesure explicites. Aucun résultat commercial ne peut être garanti par la seule livraison." }
    ],
    acceptance: ["Réaliser le parcours prioritaire avec les utilisateurs et les données du test.", "Comprendre les erreurs et récupérer les informations nécessaires au suivi.", "Déployer, documenter et organiser le support pendant l’expérimentation."],
    tradeoff: "Un MVP n’est pas une dispense de sécurité, de permissions ou de traitement des erreurs nécessaires à son usage. Il réduit le périmètre testé, et non les exigences essentielles. Lorsque le projet concerne un processus interne déjà connu, une première version d’application métier peut être une meilleure façon de cadrer la livraison.",
    articles: ["logiciel-sur-mesure-ou-saas", "cahier-des-charges-application-metier", "budget-application-metier"]
  }
};
