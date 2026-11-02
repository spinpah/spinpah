// French and Italian text for data/projects.json, keyed by project id.
// English stays in the JSON; anything missing here falls back to it.

export type ProjectText = {
  name?: string;
  shortDescription: string;
  description: string;
  features: string[];
  challenges: string[];
};

export const PROJECT_TEXT: Record<"fr" | "it", Record<string, ProjectText>> = {
  fr: {
    b64: {
      shortDescription:
        "Landing page pour B64, un studio logiciel qui transforme les idées d'IA en produits en production : agents conversationnels, vision par ordinateur, prévision et plateformes produit.",
      description:
        "Conception et développement de la landing page de B64, un studio logiciel dont la promesse est « l'ambition, traduite en production » : sortir l'idée du pitch deck et la stratégie des données du client, puis livrer un produit en ligne, mesuré et qui lui appartient. La page joue sur le nom du studio avec un motif base64 : chaque libellé de section est encodé en base64 à côté de son titre en clair, et un flux animé de texte encodé défile derrière un hero bleu profond en grande typographie serif éditoriale. Elle présente les quatre domaines d'expertise (systèmes de langage et agents, vision par ordinateur, modèles de prévision et de décision, plateformes data et produit), chacun relié à un produit en ligne comme preuve ; les cinq étapes d'accompagnement de l'idée à l'exploitation ; une démo interactive de vision par ordinateur « une image, six lectures » (détecter, segmenter, suivre, lire, mesurer, décrire) ; une étude de cas Waysights ; les trois façons de travailler avec le studio (Assess, Build, Run) ; une FAQ et une section contact présentant ses bureaux à Doha, Dubaï, Alger et Paris.",
      features: [
        "Hero bleu profond en grande typographie serif éditoriale sur un flux animé de texte base64",
        "Libellés de section encodés en base64 à côté de leur titre en clair, en écho au nom du studio",
        "Quatre cartes d'expertise, chacune reliée à un produit en ligne comme preuve",
        "Parcours d'accompagnement en cinq étapes, de l'idée à l'exploitation",
        "Démo interactive de vision par ordinateur : une image, six lectures (détecter, segmenter, suivre, lire, mesurer, décrire)",
        "Étude de cas, modes de collaboration (Assess, Build, Run), FAQ et section contact",
        "Entièrement responsive sur ordinateur, tablette et mobile",
      ],
      challenges: [
        "Présenter clairement une offre IA très large sans noyer le visiteur dans le jargon",
        "Faire de l'idée du base64 une identité visuelle qui reste lisible",
        "Garder le fond animé et la démo interactive fluides sur tous les appareils",
      ],
    },
    hadin: {
      shortDescription:
        "Landing page marketing pour Hadin, une plateforme d'aide à la décision qui aide les dirigeants à prioriser les actions qui protègent leur compte de résultat.",
      description:
        "Une landing page marketing soignée et animée pour Hadin, une plateforme de « decision intelligence » pensée pour les dirigeants opérationnels. La page présente le Co-Advisor IA de Hadin et son produit autour d'un scénario de biens de consommation aux Émirats (suivi des marges, des promotions et du fonds de roulement en AED). Elle raconte l'histoire du produit : un hero en champ d'étoiles qui pose la proposition de valeur, une maquette interactive du tableau de bord avec la file de décisions à valeur récupérable, une section stratégie avec une carte effort/impact, et une vitrine du Co-Advisor qui montre des réponses conversationnelles fondées sur des preuves. Le design s'appuie sur une esthétique éditoriale sombre mêlant serif et sans-serif, des apparitions fluides au scroll et des signaux de confiance (SOC 2 Type II, hébergement des données aux Émirats, isolation des tenants, journalisation d'audit).",
      features: [
        "Hero animé en champ d'étoiles qui porte la proposition de valeur",
        "Maquette interactive du tableau de bord avec la file de décisions à valeur récupérable",
        "Section stratégie avec une carte des arbitrages effort/impact",
        "Vitrine du Co-Advisor avec des réponses conversationnelles fondées sur des preuves",
        "Design system éditorial sombre avec association serif/sans-serif et animations au scroll",
        "Signaux de confiance et de conformité (SOC 2 Type II, données hébergées aux Émirats, isolation des tenants)",
        "Entièrement responsive sur ordinateur, tablette et mobile",
      ],
      challenges: [
        "Transformer un produit d'entreprise dense et multi-sections en un récit marketing clair",
        "Créer des animations au scroll et des visualisations performantes sans alourdir le chargement",
        "Concevoir des maquettes de tableaux de bord et de graphiques réalistes, fidèles au vrai produit",
      ],
    },
    "vane-solutions": {
      shortDescription:
        "Site vitrine de Vane Solutions, une entreprise de services informatiques spécialisée dans le web, le mobile et le cloud.",
      description:
        "Le site de Vane Solutions est une plateforme professionnelle sous WordPress qui présente les services, l'expertise et les réalisations de l'entreprise. Il met en avant ses compétences en solutions informatiques : développement web, applications mobiles, infrastructure cloud et cybersécurité. Le site offre un design moderne et épuré, optimisé pour la performance et le responsive, afin de donner aux clients potentiels une vue claire de l'offre et des moyens simples de prendre contact.",
      features: [
        "Présentation de l'entreprise et de son identité",
        "Vitrine des services clairement structurée",
        "Design responsive sur tous les appareils",
        "Formulaires de contact et système de demandes clients",
        "Structure optimisée pour le SEO",
      ],
      challenges: [
        "Garantir un design moderne et professionnel",
        "Optimiser les performances sous WordPress",
        "Adapter WordPress à l'identité de la marque",
      ],
    },
    "penetration-testing-audit": {
      name: "Rapport de test d'intrusion et d'audit de sécurité",
      shortDescription:
        "Audit de sécurité d'une machine vulnérable : identification et exploitation des failles pour simuler des attaques et en mesurer l'impact, puis propositions de remédiation pour renforcer la sécurité du système.",
      description:
        "Projet complet de test d'intrusion portant sur l'audit de sécurité d'un environnement de machine vulnérable. Le projet visait à identifier et exploiter méthodiquement les failles de sécurité afin de simuler des scénarios d'attaque réels et d'évaluer leur impact sur le système. À travers les phases de reconnaissance, de scan, d'énumération et d'exploitation, plusieurs faiblesses ont été découvertes et documentées. Le projet s'est conclu par des stratégies de remédiation détaillées et des recommandations de durcissement pour renforcer la posture de sécurité globale.",
      features: [
        "Évaluation et scan des vulnérabilités",
        "Test d'intrusion réseau",
        "Test de sécurité d'applications web",
        "Simulation d'ingénierie sociale",
        "Rapports et documentation détaillés",
        "Recommandations de remédiation",
      ],
      challenges: [
        "Identifier des vecteurs d'attaque complexes en plusieurs étapes",
        "Concilier exhaustivité et contraintes de temps",
        "Élaborer des stratégies de remédiation concrètes",
      ],
    },
    "secure-social-network": {
      name: "Réalisation d'un réseau social web sécurisé",
      shortDescription:
        "Une plateforme de réseau social sécurisée construite avec des technologies web modernes, intégrant des mesures de sécurité avancées et les bonnes pratiques.",
      description:
        "Développement d'une application web de réseau social complète, avec un accent fort sur la sécurité. Le projet consistait à créer une plateforme sociale riche tout en intégrant des mesures de sécurité avancées : authentification sécurisée, chiffrement des données, validation des entrées et protection contre les vulnérabilités web courantes. L'application propose des profils, le partage de publications, une messagerie et des interactions sociales, le tout bâti sur une architecture « security-first » conforme aux bonnes pratiques du secteur.",
      features: [
        "Système d'authentification sécurisé",
        "Messagerie chiffrée de bout en bout",
        "Nettoyage et validation des entrées",
        "Protection XSS et CSRF",
        "Limitation de débit et protection DDoS",
        "Gestion sécurisée des sessions",
      ],
      challenges: [
        "Mettre en place des parcours d'authentification sécurisés",
        "Concilier sécurité et expérience utilisateur",
        "Gérer efficacement les données chiffrées",
      ],
    },
    "three-tier-network": {
      name: "Conception et sécurisation d'un réseau trois tiers",
      shortDescription:
        "Conception et sécurisation d'un réseau trois tiers sous GNS3, avec routage dynamique, VLAN, pare-feu et tests d'intrusion pour évaluer la résistance aux attaques DDoS.",
      description:
        "Projet complet de conception et de sécurisation réseau : création d'une architecture trois tiers robuste dans l'environnement de simulation GNS3. Le projet couvrait la conception de la topologie, la mise en place de protocoles de routage dynamique, la configuration de VLAN pour la segmentation et le déploiement de plusieurs couches de sécurité, dont des pare-feu et des systèmes de détection d'intrusion. La sécurité du réseau a été éprouvée par des scénarios de tests d'intrusion simulés, avec une attention particulière à la résistance aux attaques par déni de service distribué (DDoS) et aux autres menaces réseau.",
      features: [
        "Architecture réseau trois tiers",
        "Mise en place du routage dynamique",
        "Segmentation par VLAN",
        "Configuration des pare-feu",
        "Mécanismes de protection DDoS",
        "Supervision et journalisation du réseau",
      ],
      challenges: [
        "Optimiser les protocoles de routage pour la performance",
        "Mettre en place une atténuation DDoS efficace",
        "Concilier sécurité et performance du réseau",
      ],
    },
    "radius-wifi-security": {
      name: "Accès Wi-Fi sécurisé avec RADIUS",
      shortDescription:
        "Configuration de l'authentification RADIUS sous Windows Server 2012 R2 pour sécuriser l'accès Wi-Fi 802.1X, avec intégration Active Directory et application des politiques de sécurité.",
      description:
        "Mise en place d'une solution de sécurité Wi-Fi de niveau entreprise reposant sur l'authentification RADIUS (Remote Authentication Dial-In User Service) sur une infrastructure Windows Server 2012 R2. Le projet impliquait la configuration du Network Policy Server (NPS) pour centraliser l'authentification, l'autorisation et la traçabilité des accès sans fil. L'intégration avec Active Directory a permis une gestion fluide des utilisateurs et l'application des politiques, tandis que le protocole 802.1X garantissait des communications sans fil sécurisées. La solution comprenait une authentification par certificats, des politiques d'accès réseau et une journalisation complète pour la supervision et la conformité.",
      features: [
        "Configuration du serveur RADIUS",
        "Authentification 802.1X",
        "Intégration Active Directory",
        "Sécurité par certificats",
        "Politiques d'accès réseau",
        "Journalisation d'audit complète",
      ],
      challenges: [
        "Complexité de la gestion des certificats",
        "Optimisation de la configuration des politiques",
        "Résolution des problèmes d'authentification",
      ],
    },
    "setram-mobile-app": {
      name: "Application mobile de gestion des abonnements – Setram Alger",
      shortDescription:
        "Développement d'une application mobile Flutter pour Setram Alger permettant aux usagers de gérer et souscrire leurs abonnements directement depuis l'application, pour un service plus accessible et plus simple.",
      description:
        "Développement d'une application mobile complète pour Setram Alger (société de transport public) avec le framework Flutter. L'application a été conçue pour moderniser et simplifier la gestion des abonnements aux transports publics. Les usagers peuvent gérer leurs abonnements, en acheter de nouveaux, suivre leur utilisation et consulter en temps réel les informations sur le service. L'application offre une interface conviviale, un paiement sécurisé et un mode hors ligne pour les fonctions essentielles. Le projet a nettement amélioré l'accès aux services de Setram et réduit la charge administrative grâce à la transformation numérique.",
      features: [
        "Gestion des abonnements",
        "Paiement sécurisé",
        "Informations sur le service en temps réel",
        "Fonctionnement hors ligne",
        "Support multilingue",
        "Notifications push",
      ],
      challenges: [
        "Intégration avec des systèmes existants",
        "Garantir la sécurité des paiements",
        "Optimiser l'affichage pour différentes tailles d'écran",
      ],
    },
  },
  it: {
    b64: {
      shortDescription:
        "Landing page per B64, uno studio software che trasforma le idee di IA in prodotti in produzione: agenti linguistici, computer vision, previsioni e piattaforme di prodotto.",
      description:
        "Progettazione e sviluppo della landing page di B64, uno studio software la cui promessa è \"l'ambizione, tradotta in produzione\": tirare fuori l'idea dal pitch deck e la strategia dai dati del cliente, per poi rilasciare un prodotto online, misurato e di sua proprietà. La pagina gioca con il nome dello studio attraverso un motivo base64: ogni etichetta di sezione è codificata in base64 accanto al titolo in chiaro, e un flusso animato di testo codificato scorre dietro una hero blu intenso con una grande tipografia serif editoriale. Presenta le quattro aree di competenza (sistemi linguistici e agentici, computer vision, modelli di previsione e decisione, piattaforme dati e di prodotto), ognuna collegata a un prodotto online come prova; le cinque fasi di collaborazione dall'idea alla gestione; una demo interattiva di computer vision \"un fotogramma, sei letture\" (rilevare, segmentare, tracciare, leggere, misurare, descrivere); un caso studio Waysights; i tre modi di lavorare con lo studio (Assess, Build, Run); una FAQ e una sezione contatti con le sedi di Doha, Dubai, Algeri e Parigi.",
      features: [
        "Hero blu intenso con grande tipografia serif editoriale su un flusso animato di testo base64",
        "Etichette di sezione codificate in base64 accanto al titolo in chiaro, in richiamo al nome dello studio",
        "Quattro schede di competenza, ognuna collegata a un prodotto online come prova",
        "Percorso di collaborazione in cinque fasi, dall'idea alla gestione",
        "Demo interattiva di computer vision: un fotogramma, sei letture (rilevare, segmentare, tracciare, leggere, misurare, descrivere)",
        "Caso studio, modalità di collaborazione (Assess, Build, Run), FAQ e sezione contatti",
        "Completamente responsive su desktop, tablet e mobile",
      ],
      challenges: [
        "Spiegare con chiarezza un'offerta di IA molto ampia senza sommergere i visitatori di gergo tecnico",
        "Trasformare l'idea del base64 in un'identità visiva che resti leggibile",
        "Mantenere fluidi lo sfondo animato e la demo interattiva su ogni dispositivo",
      ],
    },
    hadin: {
      shortDescription:
        "Landing page di marketing per Hadin, una piattaforma di decision intelligence che aiuta chi gestisce un'azienda a scegliere le mosse che proteggono il conto economico.",
      description:
        "Una landing page di marketing curata e animata per Hadin, una piattaforma di \"decision intelligence\" pensata per chi gestisce un'azienda. La pagina presenta il Co-Advisor IA di Hadin e il prodotto attraverso uno scenario di beni di consumo negli Emirati (monitoraggio di margini, promozioni e capitale circolante in AED). Racconta la storia del prodotto: una hero con un campo di stelle che inquadra la proposta di valore, un mockup interattivo della dashboard con la coda delle decisioni a valore recuperabile, una sezione strategia con una mappa sforzo/impatto e una vetrina del Co-Advisor che mostra risposte conversazionali basate su evidenze. Il design punta su un'estetica editoriale scura con l'abbinamento serif/sans-serif, animazioni fluide allo scroll e segnali di fiducia (SOC 2 Type II, residenza dei dati negli Emirati, isolamento dei tenant, log di audit).",
      features: [
        "Hero animata con campo di stelle che comunica la proposta di valore",
        "Mockup interattivo della dashboard con la coda delle decisioni a valore recuperabile",
        "Sezione strategia con una mappa dei compromessi sforzo/impatto",
        "Vetrina del Co-Advisor con risposte conversazionali basate su evidenze",
        "Design system editoriale scuro con abbinamento serif/sans-serif e animazioni allo scroll",
        "Segnali di fiducia e conformità (SOC 2 Type II, dati residenti negli Emirati, isolamento dei tenant)",
        "Completamente responsive su desktop, tablet e mobile",
      ],
      challenges: [
        "Tradurre un prodotto enterprise denso e articolato in un racconto di marketing chiaro",
        "Realizzare animazioni allo scroll e visualizzazioni di dati performanti senza rallentare il caricamento",
        "Progettare mockup di dashboard e grafici realistici, fedeli al prodotto reale",
      ],
    },
    "vane-solutions": {
      shortDescription:
        "Sito aziendale di Vane Solutions, società di servizi IT specializzata in soluzioni web, mobile e cloud.",
      description:
        "Il sito di Vane Solutions è una piattaforma professionale basata su WordPress che presenta i servizi, le competenze e il portfolio dell'azienda. Mette in evidenza le capacità nelle soluzioni IT: sviluppo web, app mobile, infrastruttura cloud e cybersecurity. Il sito ha un design moderno e pulito, ottimizzato per prestazioni e responsive, per offrire ai potenziali clienti una panoramica chiara dell'offerta e modi semplici per mettersi in contatto.",
      features: [
        "Presentazione e identità dell'azienda",
        "Vetrina dei servizi con una struttura chiara",
        "Design responsive su tutti i dispositivi",
        "Moduli di contatto e gestione delle richieste dei clienti",
        "Struttura ottimizzata per la SEO",
      ],
      challenges: [
        "Garantire un design moderno e professionale",
        "Ottimizzare le prestazioni su WordPress",
        "Personalizzare WordPress secondo l'identità del brand",
      ],
    },
    "penetration-testing-audit": {
      name: "Report di penetration test e audit di sicurezza",
      shortDescription:
        "Audit di sicurezza di una macchina vulnerabile: individuazione e sfruttamento delle vulnerabilità per simulare attacchi e valutarne l'impatto, con proposte di remediation per rafforzare la sicurezza del sistema.",
      description:
        "Progetto completo di penetration testing incentrato sull'audit di sicurezza di un ambiente con una macchina vulnerabile. L'obiettivo era individuare e sfruttare in modo sistematico le vulnerabilità per simulare scenari di attacco reali e valutarne l'impatto sulla sicurezza del sistema. Attraverso le fasi di ricognizione, scansione, enumerazione ed exploitation sono state scoperte e documentate diverse debolezze. Il progetto si è concluso con strategie di remediation dettagliate e raccomandazioni di hardening per rafforzare la postura di sicurezza complessiva.",
      features: [
        "Valutazione e scansione delle vulnerabilità",
        "Penetration test di rete",
        "Test di sicurezza delle applicazioni web",
        "Simulazione di social engineering",
        "Report e documentazione dettagliati",
        "Raccomandazioni di remediation",
      ],
      challenges: [
        "Individuare vettori di attacco complessi in più fasi",
        "Bilanciare completezza e vincoli di tempo",
        "Definire strategie di remediation concrete",
      ],
    },
    "secure-social-network": {
      name: "Realizzazione di un social network web sicuro",
      shortDescription:
        "Una piattaforma di social networking sicura, costruita con tecnologie web moderne e con misure di sicurezza avanzate e best practice.",
      description:
        "Sviluppo di un'applicazione web di social networking completa, con una forte attenzione alla sicurezza. Il progetto ha previsto la creazione di una piattaforma social ricca di funzionalità integrando misure di sicurezza avanzate: autenticazione sicura, cifratura dei dati, validazione degli input e protezione dalle vulnerabilità web più comuni. L'applicazione offre profili utente, condivisione di post, messaggistica e interazioni social, il tutto su un'architettura security-first che segue le best practice del settore.",
      features: [
        "Sistema di autenticazione sicuro",
        "Messaggistica cifrata end-to-end",
        "Sanificazione e validazione degli input",
        "Protezione da XSS e CSRF",
        "Rate limiting e protezione DDoS",
        "Gestione sicura delle sessioni",
      ],
      challenges: [
        "Implementare flussi di autenticazione sicuri",
        "Bilanciare sicurezza ed esperienza utente",
        "Gestire in modo efficiente i dati cifrati",
      ],
    },
    "three-tier-network": {
      name: "Progettazione e sicurezza di una rete a tre livelli",
      shortDescription:
        "Progettazione e messa in sicurezza di una rete a tre livelli con GNS3, con routing dinamico, VLAN, firewall e penetration test per valutare la resistenza agli attacchi DDoS.",
      description:
        "Progetto completo di progettazione e sicurezza di rete: creazione di un'architettura a tre livelli robusta nell'ambiente di simulazione GNS3. Il progetto ha coperto la progettazione della topologia, l'implementazione di protocolli di routing dinamico, la configurazione delle VLAN per la segmentazione e l'introduzione di più livelli di sicurezza, tra cui firewall e sistemi di rilevamento delle intrusioni. La sicurezza della rete è stata messa alla prova con scenari di penetration test simulati, con particolare attenzione alla resistenza agli attacchi DDoS (Distributed Denial of Service) e ad altre minacce di rete.",
      features: [
        "Architettura di rete a tre livelli",
        "Implementazione del routing dinamico",
        "Segmentazione tramite VLAN",
        "Configurazione dei firewall",
        "Meccanismi di protezione DDoS",
        "Monitoraggio e logging della rete",
      ],
      challenges: [
        "Ottimizzare i protocolli di routing per le prestazioni",
        "Implementare una mitigazione DDoS efficace",
        "Bilanciare sicurezza e prestazioni della rete",
      ],
    },
    "radius-wifi-security": {
      name: "Accesso Wi-Fi sicuro con RADIUS",
      shortDescription:
        "Configurazione dell'autenticazione RADIUS su Windows Server 2012 R2 per proteggere l'accesso Wi-Fi 802.1X, con integrazione Active Directory e applicazione delle policy di sicurezza.",
      description:
        "Implementazione di una soluzione di sicurezza Wi-Fi di livello enterprise basata sull'autenticazione RADIUS (Remote Authentication Dial-In User Service) su un'infrastruttura Windows Server 2012 R2. Il progetto ha richiesto la configurazione del Network Policy Server (NPS) per centralizzare autenticazione, autorizzazione e accounting degli accessi wireless. L'integrazione con Active Directory ha permesso una gestione semplice degli utenti e l'applicazione delle policy, mentre il protocollo 802.1X ha garantito comunicazioni wireless sicure. La soluzione comprendeva autenticazione tramite certificati, policy di accesso alla rete e un logging completo per monitoraggio e conformità.",
      features: [
        "Configurazione del server RADIUS",
        "Autenticazione 802.1X",
        "Integrazione con Active Directory",
        "Sicurezza basata su certificati",
        "Policy di accesso alla rete",
        "Log di audit completi",
      ],
      challenges: [
        "Complessità nella gestione dei certificati",
        "Ottimizzazione della configurazione delle policy",
        "Risoluzione dei problemi di autenticazione",
      ],
    },
    "setram-mobile-app": {
      name: "App mobile per la gestione degli abbonamenti – Setram Algeri",
      shortDescription:
        "Sviluppo di un'app mobile in Flutter per Setram Algeri che permette agli utenti di gestire e sottoscrivere gli abbonamenti direttamente dall'app, rendendo il servizio più accessibile e semplice da usare.",
      description:
        "Sviluppo di un'applicazione mobile completa per Setram Algeri (azienda di trasporto pubblico) con il framework Flutter. L'app è stata pensata per modernizzare e semplificare la gestione degli abbonamenti ai trasporti pubblici. Gli utenti possono gestire gli abbonamenti esistenti, acquistarne di nuovi, monitorarne l'utilizzo e consultare in tempo reale le informazioni sul servizio. L'app offre un'interfaccia intuitiva, pagamenti sicuri e funzionalità offline per le operazioni essenziali. Il progetto ha migliorato sensibilmente l'accesso ai servizi Setram e ridotto il carico amministrativo grazie alla trasformazione digitale.",
      features: [
        "Gestione degli abbonamenti",
        "Pagamenti sicuri",
        "Informazioni sul servizio in tempo reale",
        "Funzionalità offline",
        "Supporto multilingua",
        "Notifiche push",
      ],
      challenges: [
        "Integrazione con sistemi legacy",
        "Garantire la sicurezza dei pagamenti",
        "Ottimizzare per schermi di diverse dimensioni",
      ],
    },
  },
};
