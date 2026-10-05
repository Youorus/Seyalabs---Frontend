import type { Article } from "@/data/article-types";

// Original decision guides. Examples are illustrative, never presented as client results.
export const softwareGuides: Article[] = [
  {
    slug: "logiciel-sur-mesure-ou-saas",
    title: "SaaS ou sur-mesure : choisir ce qui tient dans la durée.",
    seoTitle: "Logiciel sur mesure ou SaaS : comment choisir ?",
    description: "Comparez SaaS et logiciel sur mesure : règles métier, intégrations, données, coût complet et maintenance. Une grille pour décider avant de développer.",
    category: "Software", date: "2026-10-05", readingTime: "7 min",
    relatedService: "developpement-logiciel",
    relatedArticles: ["budget-application-metier", "cahier-des-charges-application-metier", "quand-remplacer-excel-par-une-application-metier"],
    intro: "Un SaaS convient lorsque ses parcours couvrent votre besoin avec des adaptations acceptables. Le sur-mesure devient intéressant lorsque vos règles, vos échanges de données ou vos contraintes d’exploitation sont déterminants. Le choix se fait sur un parcours réel et sur le coût de fonctionnement complet, pas sur une préférence technique.",
    takeaways: ["Tester les exceptions métier dans une démonstration du SaaS.", "Comparer configuration, intégration et développement avec le même périmètre.", "Prévoir l’exploitation, la sortie et la reprise des données dès la décision."],
    sections: [
      { title: "Commencer par un parcours, pas par une liste de fonctionnalités.", paragraphs: [
        "Choisissez une opération que votre équipe réalise souvent : traiter une demande, préparer une intervention ou valider un dossier. Décrivez son début, son résultat, les personnes impliquées et les exceptions. Un catalogue de fonctionnalités peut donner l’impression que deux solutions se valent alors que leur utilisation quotidienne diffère nettement.",
        "Voici un exemple illustratif : un dossier doit être validé par deux personnes seulement au-delà d’un certain montant. Après validation, une modification doit rouvrir le contrôle. Un outil peut afficher des statuts et des approbations sans savoir exprimer cette règle. C’est ce scénario, avec une modification réelle, qu’il faut montrer en démonstration."
      ], links: [{ label: "Préparer le cahier des charges de votre application métier", href: "/insights/cahier-des-charges-application-metier" }] },
      { title: "Une grille pour comparer les deux options.", paragraphs: ["Les tendances ci-dessous servent à orienter les questions. Un SaaS extensible peut couvrir des règles complexes ; un développement mal cadré peut créer une dépendance forte. Vérifiez les capacités du produit, les modalités contractuelles et l’organisation qui exploitera la solution."], table: {
        caption: "SaaS et logiciel sur mesure : points à vérifier pour votre projet", headers: ["Critère", "SaaS à examiner", "Sur-mesure à examiner"], rows: [
          ["Parcours métier", "Adéquation des fonctions et possibilités de configuration.", "Règles à concevoir, tester et faire évoluer."],
          ["Intégrations", "API disponibles, quotas, droits et coût des connecteurs.", "Connecteurs à construire et comportement sur erreur."],
          ["Données", "Formats d’export, historique récupérable et modalités de sortie.", "Modèle de données, migration et procédures de sauvegarde."],
          ["Évolution", "Feuille de route de l’éditeur et limites des extensions.", "Budget, compétences et organisation pour maintenir le code."],
          ["Coût complet", "Abonnements, paramétrage, intégrations et interventions manuelles restantes.", "Conception, réalisation, infrastructure, maintenance et évolutions."]
        ]
      } },
      { title: "Identifier ce qui doit réellement être spécifique.", paragraphs: [
        "Toutes les étapes d’un processus ne constituent pas un avantage à développer vous-même. L’authentification, l’envoi d’emails ou la facturation peuvent s’appuyer sur des services existants. Le besoin spécifique se trouve souvent dans une règle d’affectation, une chaîne de validation ou la coordination de plusieurs outils.",
        "Séparez les exigences indispensables des habitudes que l’équipe accepterait de changer. Pour chaque exigence, décrivez la conséquence d’un écart. Une préférence d’écran et une impossibilité de traiter un dossier n’ont pas le même poids. Cette distinction évite de développer une application uniquement pour reproduire une interface connue."
      ], bullets: ["Quelle règle ne peut pas être modifiée sans perturber l’activité ?", "Quelle adaptation demande seulement une prise en main ?", "Quelle étape relève déjà d’un logiciel spécialisé ?", "Quel contournement devra encore être réalisé à la main ?"] },
      { title: "Comparer les coûts avec les mêmes hypothèses.", paragraphs: [
        "Le prix d’un abonnement et le devis d’un développement ne couvrent pas nécessairement le même travail. Comparez un périmètre commun : utilisateurs, environnements, reprise de données, intégrations, accompagnement et exploitation. Décrivez ensuite comment ces éléments évolueraient si le volume ou l’équipe changeait.",
        "Le temps passé à maintenir les contournements mérite d’être mesuré. Une exportation manuelle, une ressaisie ou une vérification systématique représente du travail réel. Cela ne devient pas automatiquement une économie financière après développement : l’équipe peut employer le temps libéré à d’autres tâches. Distinguez temps disponible, dépenses évitées et nouvelles dépenses."
      ], links: [{ label: "Les éléments qui déterminent le budget d’une application métier", href: "/insights/budget-application-metier" }] },
      { title: "Prévoir la sortie et la continuité de service.", paragraphs: [
        "Demandez comment récupérer les données, les pièces jointes et l’historique. Un fichier d’export ne suffit pas si les relations entre les dossiers disparaissent ou si les documents doivent être téléchargés un par un. Testez une extraction et vérifiez qu’elle permet une reprise utilisable.",
        "Pour le sur-mesure, clarifiez les droits sur le code et les livrables dans le contrat, l’accès au dépôt, les comptes d’hébergement, la documentation et le transfert. La possession d’un dépôt ne remplace pas une procédure de déploiement et une personne capable de l’exécuter. La continuité se prépare avec des responsabilités explicites."
      ] },
      { title: "Une troisième voie : conserver le SaaS et construire la liaison.", paragraphs: [
        "Votre outil principal peut rester pertinent alors que les échanges autour de lui sont fragiles. Une intégration API ou un portail métier peut réduire les doubles saisies sans recréer toutes ses fonctions. Cette option doit être comparée au remplacement complet.",
        "La bonne décision est parfois progressive : tester une configuration, réaliser une connexion sur un flux, puis développer le parcours réellement spécifique. Fixez ce que le test doit démontrer et les conditions qui conduiraient à retenir une autre option. Vous obtenez une décision documentée plutôt qu’une architecture choisie trop tôt."
      ], links: [{ label: "Connecter vos logiciels par une intégration API", href: "/solutions/integration-api" }, { label: "Développement logiciel sur mesure : notre intervention", href: "/expertises/developpement-logiciel" }] }
    ]
  },
  {
    slug: "budget-application-metier",
    title: "Le budget d’une application se construit avant le devis.",
    seoTitle: "Budget d’une application métier : cadrer le coût",
    description: "Fonctions, droits, intégrations, migration, hébergement et maintenance : les postes à cadrer pour obtenir un devis d’application métier comparable et utile.",
    category: "Software", date: "2026-10-05", readingTime: "7 min",
    relatedService: "application-metier",
    relatedArticles: ["cahier-des-charges-application-metier", "logiciel-sur-mesure-ou-saas", "migration-donnees-application-metier"],
    intro: "Il n’existe pas de prix fiable pour une application métier sans connaître ses parcours, ses données et ses conditions d’exploitation. Deux projets avec le même nombre d’écrans peuvent demander des efforts très différents. Pour obtenir un budget exploitable, il faut décrire ce qui doit fonctionner, ce qui doit être repris et ce qui devra être maintenu.",
    takeaways: ["Le nombre d’écrans ne suffit pas à estimer le travail.", "Séparer construction, transition et fonctionnement après lancement.", "Comparer les devis avec les mêmes exclusions et critères de réception."],
    sections: [
      { title: "Les règles métier comptent autant que les écrans.", paragraphs: [
        "Un écran de dossier peut sembler simple. Il devient plus exigeant lorsque chaque rôle voit des champs différents, qu’une validation dépend du montant et qu’une correction doit conserver l’historique. L’effort dépend des comportements à construire et à tester, y compris lorsque les données sont incomplètes.",
        "Décrivez chaque parcours par un scénario observable : qui agit, avec quelles données, à quel moment, et quel résultat doit être obtenu. Ajoutez un cas d’erreur et un cas d’exception. Cela donne une base de discussion plus précise qu’un intitulé comme « gestion des dossiers » et réduit les interprétations entre prestataires."
      ] },
      { title: "Six postes à faire apparaître dans l’estimation.", paragraphs: ["Cette grille permet de repérer les sujets absents d’un devis. Elle ne donne pas un tarif : chaque poste doit être estimé à partir de votre périmètre et des accès réellement disponibles."], table: {
        caption: "Postes de budget d’une application métier sur mesure", headers: ["Poste", "Questions à résoudre avant de chiffrer"], rows: [
          ["Cadrage et conception", "Quels parcours, utilisateurs, règles et prototypes doivent être validés ?"],
          ["Développement et tests", "Quels rôles, validations, exceptions et volumes faut-il couvrir ?"],
          ["Intégrations", "Les API sont-elles documentées, accessibles et testables ?"],
          ["Migration", "Quelles données, pièces jointes et relations doivent être nettoyées puis reprises ?"],
          ["Lancement", "Quels environnements, formations et contrôles de bascule sont nécessaires ?"],
          ["Exploitation", "Qui assure hébergement, supervision, sauvegardes, corrections et évolutions ?"]
        ]
      } },
      { title: "Ne pas découvrir la reprise des données en fin de projet.", paragraphs: [
        "Les informations existantes sont rarement prêtes à être importées sans examen. Une même entreprise peut avoir plusieurs identifiants, une date peut être enregistrée comme du texte et une pièce jointe peut n’exister que dans une boîte email. La reprise demande une cartographie, des règles de transformation et une validation métier.",
        "Fournissez un échantillon représentatif avant l’estimation, en retirant les informations personnelles inutiles à cette étape. Décrivez les volumes, les doublons connus, l’historique à conserver et le moment où les données cesseront d’être modifiées dans l’ancien outil. Une migration testée peut révéler un travail que le seul schéma des écrans ne montre pas."
      ], links: [{ label: "Préparer la migration vers une application métier", href: "/insights/migration-donnees-application-metier" }] },
      { title: "Découper une première version utilisable.", paragraphs: [
        "Réduire le périmètre ne consiste pas seulement à retirer des écrans. Une première version doit permettre de terminer une opération réelle. Par exemple, pour une gestion d’interventions, créer une demande sans pouvoir l’affecter ni suivre son état laisse un processus incomplet. Ce scénario illustratif doit être adapté à votre métier.",
        "Classez les besoins en trois groupes : indispensables au premier parcours, utiles après observation et hors périmètre. Expliquez les tâches qui resteront manuelles durant la transition. Le découpage rend les arbitrages visibles et permet de discuter du budget sans masquer une partie du travail nécessaire."
      ], bullets: ["Un parcours complet avec les rôles indispensables.", "Les intégrations nécessaires à ce parcours.", "La visibilité sur les erreurs et les actions à reprendre.", "Les conditions de déploiement et de récupération des données."] },
      { title: "Comparer deux devis sans comparer deux produits différents.", paragraphs: [
        "Un devis plus court peut exclure les tests de migration, l’administration, l’environnement de recette ou la documentation d’exploitation. Demandez un découpage des livrables, des hypothèses et des exclusions. Lorsque l’incertitude est importante, une phase de cadrage distincte peut être plus utile qu’un engagement détaillé fondé sur des informations incomplètes.",
        "Vérifiez aussi ce qui déclenche la réception : scénarios testés, anomalies admises, données reprises et accès remis. Clarifiez les modalités de correction, de maintenance et d’évolution. Les conditions de propriété intellectuelle et de réversibilité se définissent dans le contrat ; elles doivent être comprises avant de choisir le prestataire."
      ], links: [{ label: "Télécharger le modèle de cahier des charges", href: "/insights/cahier-des-charges-application-metier" }] },
      { title: "Mesurer l’intérêt du projet avant de parler de rentabilité.", paragraphs: [
        "Observez la situation de départ : opérations réalisées, délais entre étapes, erreurs corrigées et interventions manuelles. Notez les volumes et la période de mesure. Ces observations permettent de relier le projet à une amélioration attendue, sans inventer un pourcentage de gain.",
        "Après lancement, comparez le même processus dans des conditions explicites. Une hausse de volume ou un changement d’équipe peut modifier le résultat. Un budget défendable relie les dépenses, le périmètre et des critères vérifiables ; il ne repose pas sur une promesse de retour universel. Pour démarrer, apportez un parcours, vos outils et un échantillon de données : nous pourrons préciser les inconnues et la prochaine étape."
      ], links: [{ label: "Cadrer une application métier sur mesure avec Seya Labs", href: "/solutions/application-metier" }] }
    ]
  },
  {
    slug: "cahier-des-charges-application-metier",
    title: "Un cahier des charges qui décrit le travail réel.",
    seoTitle: "Cahier des charges application métier : modèle gratuit",
    description: "Un modèle de cahier des charges à télécharger : objectifs, utilisateurs, parcours, données, intégrations et critères de recette pour une application métier.",
    category: "Software", date: "2026-10-05", readingTime: "8 min",
    relatedService: "application-metier",
    relatedArticles: ["budget-application-metier", "migration-donnees-application-metier", "logiciel-sur-mesure-ou-saas"],
    intro: "Un cahier des charges utile permet de comprendre le processus, de discuter les choix et de vérifier le résultat. Il n’a pas besoin de figer chaque écran. Il doit expliquer qui travaille, quelles règles doivent tenir et comment l’application sera utilisée après le lancement. Le modèle proposé ci-dessous sert à préparer ce cadrage avec vos équipes.",
    takeaways: ["Décrire un parcours complet et ses exceptions.", "Identifier les sources de données et les responsables de validation.", "Rendre les critères de recette observables dès le cadrage."],
    download: { href: "/ressources/modele-cahier-des-charges-application-metier.md", label: "Télécharger le modèle gratuit", description: "Fichier Markdown modifiable dans un éditeur de texte, sans inscription. À compléter avec votre équipe." },
    sections: [
      { title: "1. Poser le problème et le résultat attendu.", paragraphs: [
        "Commencez par expliquer le fonctionnement actuel et la friction que vous souhaitez résoudre. « Développer un outil moderne » donne peu de repères. « Retrouver l’état d’un dossier sans consulter trois fichiers » décrit un changement concret que les utilisateurs pourront vérifier.",
        "Associez au problème une situation de départ : personnes impliquées, fréquence des opérations, temps d’attente et erreurs observées. Ces éléments n’ont pas besoin d’être parfaits ; précisez leur source et la période d’observation. Définissez aussi ce que le projet ne cherche pas à changer. Vous éviterez d’absorber progressivement tous les besoins de l’entreprise."
      ], bullets: ["Le problème rencontré aujourd’hui et ses conséquences.", "Le premier parcours que l’application doit rendre possible.", "Les indicateurs observés avant le projet.", "Les sujets exclus de la première version."] },
      { title: "2. Décrire les personnes, les rôles et les décisions.", paragraphs: [
        "Listez les profils qui utiliseront l’application, ceux qui administreront les accès et ceux qui recevront les résultats. Un même collaborateur peut cumuler plusieurs rôles. Décrivez qui consulte, crée, corrige, valide, exporte ou supprime une information, ainsi que les éventuelles restrictions par équipe ou périmètre.",
        "Identifiez les personnes capables de trancher une règle et de valider une version. Si personne ne peut décider ce qu’il faut faire lorsqu’un dossier est modifié après validation, le développement devra attendre cette décision. L’organisation du projet fait donc partie du cahier des charges, au même titre que les fonctions."
      ] },
      { title: "3. Écrire les parcours avec leurs exceptions.", paragraphs: [
        "Pour chaque parcours, notez le déclencheur, les entrées, les étapes, la sortie et les cas particuliers. Utilisez le vocabulaire des équipes. Un schéma simple peut compléter le texte ; il doit rester compréhensible par une personne qui n’a pas participé aux ateliers.",
        "Exemple illustratif : une coordinatrice crée une demande d’intervention, affecte un technicien et suit la clôture. Si une pièce manque, la demande reste en attente ; si le technicien est indisponible, l’affectation est reprise ; si l’intervention est annulée, l’historique est conservé. Ces exceptions définissent davantage le produit que le seul écran de création."
      ], table: { caption: "Une fiche de parcours à compléter", headers: ["Champ", "Contenu attendu"], rows: [
        ["Déclencheur", "Événement qui lance l’opération."], ["Acteurs", "Profils impliqués et droits nécessaires."], ["Entrées", "Données disponibles et informations obligatoires."], ["Règles", "Conditions, validations et décisions à appliquer."], ["Exceptions", "Données manquantes, doublons, interruptions, corrections."], ["Sortie", "Résultat attendu et personne qui le vérifie."]
      ] } },
      { title: "4. Inventorier les données et les logiciels à connecter.", paragraphs: [
        "Listez les fichiers, bases, outils et documents qui alimentent le processus. Pour chaque source, précisez le propriétaire, les identifiants, les formats et les volumes connus. Indiquez la source qui fait référence lorsqu’une même information est présente à plusieurs endroits.",
        "Une intégration doit préciser le sens de l’échange, le déclencheur, la fréquence et le comportement en cas d’échec. Demandez si un environnement de test et une documentation API sont disponibles. Si l’accès n’a pas encore été vérifié, marquez-le comme une dépendance à lever plutôt que comme une fonction acquise."
      ], links: [{ label: "Préparer la reprise des données sans perdre les relations", href: "/insights/migration-donnees-application-metier" }, { label: "Cadrer les connexions entre logiciels", href: "/solutions/integration-api" }] },
      { title: "5. Préparer des critères de recette observables.", paragraphs: [
        "Remplacez les formulations comme « interface intuitive » par des scénarios à réaliser. Décrivez les données de départ, l’action et le résultat attendu. Ces critères peuvent être affinés au fil des ateliers, mais ils doivent exister avant la réception finale.",
        "Exemple illustratif : avec un compte de technicien, seules les interventions affectées à ce compte sont visibles. Une tentative d’accès direct à une autre intervention est refusée. Après une modification autorisée, l’historique permet de retrouver l’auteur et les champs modifiés. On peut vérifier ce comportement dans l’interface et au niveau de l’application."
      ], bullets: ["Un scénario normal par parcours prioritaire.", "Un scénario avec donnée manquante ou incorrecte.", "Un scénario de droits d’accès avec un autre profil.", "Une interruption et une reprise lorsque le parcours le nécessite.", "Une procédure de migration ou de restauration lorsque celle-ci fait partie du périmètre."] },
      { title: "6. Anticiper la vie de l’application après livraison.", paragraphs: [
        "Précisez les horaires d’usage, les contraintes de disponibilité, les responsabilités de support et les données à sauvegarder. Décrivez qui sera alerté en cas d’erreur et qui pourra remettre le service en fonctionnement. Les besoins de sécurité et de protection des données doivent être examinés selon les informations réellement traitées.",
        "Préparez la remise des accès, la documentation, la formation et les conditions de transfert à une autre équipe. Discutez les livrables et les droits sur le code dans le cadre contractuel du projet. Un lancement réussi inclut les personnes qui utiliseront et exploiteront l’outil, pas seulement celles qui l’ont commandé."
      ] },
      { title: "7. Indiquer les contraintes et garder une liste d’inconnues.", paragraphs: [
        "Donnez les contraintes de calendrier, de disponibilité des équipes et de budget lorsqu’elles sont connues. Expliquez la raison d’une date importante : fin d’un contrat, nouvelle activité ou période de migration possible. Une contrainte justifiée aide à proposer un découpage adapté.",
        "Le document doit aussi exposer ce qui reste à vérifier : accès à un logiciel, qualité d’un fichier, règle métier non décidée. Une liste d’inconnues est utile pour organiser le cadrage et comparer les hypothèses d’un devis. Le modèle téléchargeable fournit cette structure ; apportez-le même incomplet à une première discussion."
      ], links: [{ label: "Comprendre les postes de budget avant de demander un devis", href: "/insights/budget-application-metier" }, { label: "Discuter de votre application métier avec Seya Labs", href: "/solutions/application-metier" }] }
    ]
  },
  {
    slug: "migration-donnees-application-metier",
    title: "Changer d’outil sans perdre le fil de vos données.",
    seoTitle: "Migration de données vers une application métier",
    description: "Passer d’Excel ou d’un ancien logiciel à une application métier : inventaire, nettoyage, correspondances, tests et bascule des données en sept étapes.",
    category: "Software", date: "2026-10-05", readingTime: "7 min",
    relatedService: "application-metier",
    relatedArticles: ["quand-remplacer-excel-par-une-application-metier", "cahier-des-charges-application-metier", "budget-application-metier"],
    intro: "Une migration reprend des données et les relations qui leur donnent un sens. Avant de remplacer Excel ou un ancien logiciel, il faut déterminer ce qui fait référence, ce qui doit être conservé et qui vérifiera la reprise. Un import techniquement réussi peut laisser des dossiers inutilisables si ces décisions n’ont pas été préparées.",
    takeaways: ["Cartographier les sources et leurs relations avant de transformer les fichiers.", "Tester les correspondances et les contrôles sur un échantillon représentatif.", "Définir une seule source de référence pendant la bascule."],
    sections: [
      { title: "1. Inventorier les sources et désigner une référence.", paragraphs: [
        "Listez les fichiers, bases, pièces jointes et exports qui portent les informations du processus. Identifiez leur propriétaire, leur format, leur fréquence de mise à jour et les personnes qui les utilisent. Une donnée peut avoir plusieurs copies sans que l’une soit explicitement considérée comme la bonne.",
        "Lorsque les sources se contredisent, la règle de priorité doit être décidée par le métier. Ne déduisez pas qu’un fichier plus récent contient forcément les informations les plus fiables. Pour un client, un dossier et une intervention, précisez quelle source fournit l’identité, l’état et l’historique."
      ] },
      { title: "2. Décider ce qui doit être repris.", paragraphs: [
        "Tout reprendre augmente le travail et peut importer des problèmes anciens dans le nouvel outil. Distinguez données actives, historique nécessaire au fonctionnement et archives dont l’usage doit être précisé. Les durées de conservation et les règles de traitement sont à examiner selon la nature des données et votre contexte.",
        "Décrivez les conséquences d’une exclusion : un dossier actif doit-il rester consultable dans l’ancien outil ? Une pièce jointe est-elle indispensable à une opération ? Prévoyez où les informations non migrées pourront être retrouvées et par qui. La décision appartient au responsable métier, avec les interlocuteurs concernés par les exigences applicables."
      ] },
      { title: "3. Construire les correspondances et conserver les relations.", paragraphs: [
        "La table de correspondance relie chaque champ source à sa destination. Elle précise le type, les transformations et le traitement des valeurs manquantes. Les dates, les unités, les codes de statut et les identifiants doivent être explicités ; leurs conventions ne sont pas toujours visibles dans l’écran de l’ancien outil.",
        "Exemple illustratif : une intervention pointe vers un client identifié par un code interne. Si le nouvel outil utilise un autre identifiant, conservez une table reliant les deux. Sans cette correspondance, les clients peuvent être importés correctement tandis que leurs interventions restent détachées. Vérifiez les relations, pas seulement le nombre de lignes."
      ], table: { caption: "Informations à documenter pour chaque champ migré", headers: ["Élément", "Exemple illustratif"], rows: [
        ["Source et destination", "client_code dans l’export → identifiant du client dans l’application."],
        ["Transformation", "Conversion d’un statut textuel vers une valeur validée par le métier."],
        ["Valeur manquante", "Mise en anomalie plutôt que création d’une valeur fictive."],
        ["Contrôle", "Chaque intervention importée référence un client existant."],
        ["Responsable", "Personne qui valide la règle et tranche les exceptions."]
      ] } },
      { title: "4. Nettoyer sans rendre les anomalies invisibles.", paragraphs: [
        "Repérez les doublons, les valeurs invalides et les informations contradictoires. Une règle de fusion doit préciser ce qui est conservé et permettre de retrouver les décisions prises. Une suppression automatique fondée sur un nom similaire peut réunir deux entités distinctes.",
        "Conservez un journal des transformations et une liste des éléments non repris avec leur motif. Un enregistrement rejeté doit pouvoir être corrigé ou explicitement exclu. Cela permet aux équipes de comprendre le résultat et d’éviter qu’une opération de nettoyage ne devienne une perte silencieuse d’information."
      ] },
      { title: "5. Tester un échantillon qui contient des cas difficiles.", paragraphs: [
        "Ne choisissez pas uniquement les dossiers complets. Incluez des caractères particuliers, des données absentes, des dossiers anciens, des doublons et des pièces jointes. Si l’échantillon représente seulement le scénario idéal, le test ne dira pas comment la migration traite les cas réels.",
        "Après l’import, réalisez les opérations métier dans le nouvel outil. Vérifiez les totaux pertinents, les relations, les statuts et les documents accessibles. Faites valider les résultats par les personnes responsables des données. Un rapprochement technique et une recette métier se complètent."
      ], links: [{ label: "Définir les critères de recette dans le cahier des charges", href: "/insights/cahier-des-charges-application-metier" }] },
      { title: "6. Organiser la bascule et la reprise sur incident.", paragraphs: [
        "Choisissez le moment où l’ancien outil cesse d’être la référence. Si les données continuent à changer pendant la migration, définissez comment reprendre les écarts. Évitez que deux systèmes acceptent des modifications concurrentes sans règle de synchronisation.",
        "Prévoyez une sauvegarde vérifiée, des contrôles après migration et les conditions qui conduiraient à reporter la bascule. Un retour en arrière devient plus difficile dès que des opérations nouvelles ont été réalisées dans la nouvelle application. Décidez à l’avance comment elles seraient récupérées et qui pourrait autoriser cette procédure."
      ] },
      { title: "7. Suivre les anomalies après le lancement.", paragraphs: [
        "Donnez aux équipes un moyen clair de signaler un dossier incomplet ou une relation incorrecte. Distinguez les défauts de reprise des nouvelles erreurs de saisie. Chaque correction doit être traçable et, si elle révèle une règle manquante, conduire à examiner les autres données concernées.",
        "La migration est terminée lorsque les contrôles convenus sont validés, les anomalies connues sont traitées ou acceptées et les utilisateurs savent où retrouver leur information. Préparer cette étape dès le cadrage permet d’estimer le travail et de construire une application qui part d’un référentiel compris."
      ], links: [{ label: "Concevoir une application métier avec sa reprise de données", href: "/solutions/application-metier" }, { label: "Relier vos systèmes et fiabiliser les échanges", href: "/expertises/data-api" }] }
    ]
  }
];
