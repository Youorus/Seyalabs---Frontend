import type { Article } from "@/data/article-types";

export const integrationGuide: Article = {
  slug: "integration-api-crm-erp",
  title: "Connecter votre CRM et votre ERP par API.",
  seoTitle: "Intégration API CRM et ERP : préparer le projet",
  description: "Connecter un CRM, un ERP et vos outils métier : données de référence, API, webhooks, doublons, reprises sur erreur et recette. Un guide de cadrage concret.",
  category: "Engineering",
  date: "2026-10-15",
  readingTime: "6 min",
  relatedService: "integration-api",
  relatedArticles: ["migration-donnees-application-metier", "automatiser-un-processus-par-ou-commencer"],
  intro: "Une intégration API permet à des logiciels d’échanger des informations sans recopier chaque donnée à la main. Relier un CRM à un ERP demande toutefois de décider ce qui circule, quelle application fait référence et comment reprendre un échange interrompu. Ces choix métier doivent précéder la réalisation du connecteur.",
  takeaways: [
    "Définir la source de référence pour chaque information, plutôt que synchroniser tous les champs dans les deux sens.",
    "Vérifier les accès et les fonctions des API avant d’engager le périmètre.",
    "Tester les doublons, les conflits et la reprise après interruption avec les personnes qui exploitent le processus.",
  ],
  sections: [
    {
      title: "1. Décrire un échange utile de bout en bout.",
      paragraphs: [
        "Commencez par un événement que vos équipes reconnaissent : une affaire est gagnée, une commande est validée ou un client change d’adresse. Précisez le résultat attendu dans l’autre outil et les personnes qui doivent le voir. Une liste de logiciels à connecter ne suffit pas à décrire ce parcours.",
        "Exemple illustratif : lorsqu’une affaire est validée dans le CRM, l’ERP doit retrouver le client et préparer une commande à vérifier. Le commercial garde la maîtrise de l’affaire ; l’équipe administrative contrôle les informations nécessaires à la commande. L’intégration relie ces responsabilités sans supposer que toutes les décisions peuvent être automatisées.",
      ],
      bullets: ["Quel événement déclenche l’échange ?", "Quels objets et champs sont nécessaires ?", "Quel délai est acceptable pour le métier ?", "Qui valide le résultat ou traite une exception ?"],
    },
    {
      title: "2. Attribuer une source de référence à chaque donnée.",
      paragraphs: [
        "Un client peut exister dans plusieurs outils avec des informations différentes. Déterminez lequel porte l’identité commerciale, l’adresse de facturation et les statuts de commande. La référence peut changer selon le champ. Cette répartition évite qu’une ancienne valeur écrase une correction effectuée par la bonne équipe.",
        "Préparez aussi la correspondance des identifiants. Une recherche uniquement fondée sur le nom d’une entreprise peut confondre deux fiches ou créer un doublon après une correction. Le connecteur doit pouvoir retrouver le lien entre les objets, expliquer un conflit et mettre en attente un rapprochement incertain.",
      ],
      table: {
        caption: "Exemple illustratif de répartition des données entre CRM et ERP, à adapter au processus réel.",
        headers: ["Information", "Référence possible", "Point à décider"],
        rows: [
          ["Affaire et contact commercial", "CRM", "À quel statut transmettre l’affaire ?"],
          ["Données de facturation", "ERP", "Qui peut corriger une adresse déjà utilisée ?"],
          ["Commande et livraison", "ERP", "Quels statuts rendre visibles au commercial ?"],
          ["Lien entre les fiches client", "Correspondance du connecteur", "Comment traiter une fiche déjà existante ?"],
        ],
      },
    },
    {
      title: "3. Vérifier les API et choisir le mode d’échange.",
      paragraphs: [
        "Consultez la documentation correspondant à vos produits et à leurs versions. Vérifiez les opérations disponibles, les permissions, les quotas, la pagination, les environnements de test et les conditions d’accès de votre abonnement. L’existence d’une API ne garantit pas qu’elle couvre l’action nécessaire au projet.",
        "Un webhook peut notifier un événement lorsqu’un outil le propose. Une interrogation planifiée peut convenir lorsque l’événement n’est pas disponible ou que la fraîcheur attendue le permet. Un import par lot peut suffire pour certains référentiels. Le choix dépend du besoin métier et des capacités vérifiées des outils ; tous les flux ne demandent pas une synchronisation immédiate.",
        "Le même examen permet de choisir entre un connecteur existant, un workflow sur une plateforme d’automatisation et un service développé sur mesure. Comparez la gestion des erreurs, la maintenabilité, les accès nécessaires et le coût d’exploitation, en plus du scénario qui fonctionne sans incident.",
      ],
      links: [{ label: "Notre accompagnement en automatisation de workflows", href: "/solutions/automatisation-workflows" }],
    },
    {
      title: "4. Prévoir les doublons et la reprise après erreur.",
      paragraphs: [
        "Une notification peut être répétée et une requête peut s’interrompre alors que l’outil destinataire a déjà créé l’objet. Rejouer aveuglément l’échange risque de créer une seconde commande. Définissez comment reconnaître une opération déjà traitée et comment vérifier son résultat avant une nouvelle tentative.",
        "Distinguez une interruption temporaire, une permission insuffisante et une donnée refusée par les règles métier. Une erreur de saisie demande souvent une correction ; répéter la même demande ne la résout pas. Prévoyez les nouvelles tentatives, la mise en attente et le passage à une personne avec les informations utiles.",
        "Les journaux doivent aider à retrouver un échange sans exposer inutilement les données qu’il transporte. Précisez qui peut consulter les états, relancer une opération et modifier les correspondances. Une intégration exploitable donne une issue claire aux incidents.",
      ],
    },
    {
      title: "5. Préparer la recette et la mise en service.",
      paragraphs: [
        "Construisez les tests avec les utilisateurs : nouveau client, client déjà connu, information manquante, statut modifié et correction après transmission. Ajoutez une indisponibilité de l’un des outils et un événement reçu deux fois. Vérifiez les effets dans les deux applications, pas seulement la réponse technique du connecteur.",
        "Avant la bascule, décidez ce qui se passe pour les dossiers en cours et l’historique. Une synchronisation de nouveaux événements ne reprend pas automatiquement les anciennes données. Définissez la date de départ, les contrôles de rapprochement et la procédure à suivre si une anomalie est découverte après ouverture.",
      ],
      bullets: ["Valider les champs et les droits dans un environnement de test.", "Contrôler les doublons et les correspondances d’identifiants.", "Simuler une interruption et vérifier la reprise.", "Définir le responsable des alertes et des corrections.", "Documenter les accès, les flux et les conditions d’arrêt."],
      links: [{ label: "Préparer la migration de vos données", href: "/insights/migration-donnees-application-metier" }],
    },
    {
      title: "Les éléments à réunir avant un premier échange.",
      paragraphs: [
        "Pour cadrer le projet avec SEYA LABS, préparez la liste des logiciels et de leurs versions, un exemple de parcours, les champs à transmettre et les exceptions déjà connues. Des données fictives représentatives suffisent pour expliquer le besoin au départ. Précisez aussi qui peut autoriser les accès et valider les règles.",
        "Nous pouvons alors examiner les API, proposer un premier flux complet et rendre les dépendances visibles. Le résultat du cadrage doit permettre de décider du périmètre, des responsabilités et des conditions de réception avant de construire l’intégration.",
      ],
      links: [{ label: "Faire réaliser une intégration API", href: "/solutions/integration-api" }, { label: "Former votre équipe aux API et webhooks", href: "/formations/integration-api" }],
    },
  ],
};
