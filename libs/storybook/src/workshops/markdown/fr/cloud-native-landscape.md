\---  
description: "Mise en place de l'écosystème Cloud Native"   
pubDate: "May 16, 2022"   
heroImage: "ad567817-7719-48c2-bf83-545944c8b2bd_bliss.jpg?auto=compress,format"   
author: "Syntia"   
categories: "ateliers, infrastructure cloud, devops"   
subcategories: "infrastructure cloud, plateforme de provisionnement, infrastructure en tant que code, virtualisation, sécurité de l'infrastructure, conteneurisation, chiffrement des clés, stockage natif du cloud, environnement d'exécution cloud, orchestration de l'infrastructure"   
\---

**_Bliss_** est une photo pratiquement non retouchée d'une colline verte et d'un ciel bleu avec des nuages dans la région de Carneros AVA, en Californie. Charles O'Rear a pris cette photo en janvier 1996 et Microsoft en a acheté les droits en 2000. On estime que des milliards de personnes ont vu cette image, ce qui en fait peut-être la photographie la plus vue de l'histoire.

L'espace natif du cloud évolue rapidement. Les utilisateurs finaux s'attendent désormais à créer des solutions complètes au sein de Kubernetes afin de développer des applications accessibles depuis n'importe quel appareil et de les déployer dans des environnements évolutifs, sécurisés et isolés. Cela complexifie les opérations à travers les clouds, les écosystèmes et les infrastructures. L'accès à l'industrie nécessite des capacités spécifiques propres à des domaines tels que le jeu, le divertissement, la médecine, l'énergie, la fabrication ou la finance. Les opérateurs qui synthétisent les opérations humaines sont essentiels à cet effort d'expansion.

![Image](https://images.prismic.io/syntia/efe603ef-3b81-4763-800d-329dd099b308_screenshot-2022-05-16-at-21.03.44.png?auto=compress,format)

Les types de télémétrie prédominants sont accessibles depuis les couches supérieures du contexte de l'infrastructure, à partir des appareils des utilisateurs finaux et des objets connectés.

### La CNCF (Cloud Native Computing Foundation) fournit une [Carte des Sentiers Cloud Native](https://landscape.cncf.io/?license=open-source) recommandée. Elle aide les développeurs à naviguer dans le paysage natif du cloud pour mieux comprendre sa structure avec les outils natifs du cloud disponibles.

Elle organise tous les projets open source natifs du cloud et les produits propriétaires en catégories, offrant une vue d'ensemble de l'écosystème actuel. Les _projets_ sont des projets open source ou des projets hébergés par la CNCF. Les nouveaux projets deviennent continuellement partie intégrante de la CNCF, classés en phase d'incubation (cadre bleu clair/violet) ou en projets diplômés (cadre bleu foncé). Les couches du paysage CNCF sont construites en couches :

## [Provisionnement](https://landscape.cncf.io/card-mode?category=provisioning)

Le provisionnement est la première couche dans le paysage natif du cloud. Il englobe les outils utilisés pour _créer_ les fondations sur lesquelles les applications cloud natives sont construites, ainsi que les outils pour configurer, créer et gérer automatiquement l'infrastructure, ainsi que pour analyser, signer et stocker les images de conteneurs. Il s'étend également à la sécurité avec des outils permettant de définir et d'appliquer des politiques, l'authentification et l'autorisation intégrées, ainsi que la gestion de la distribution des secrets.

La couche de provisionnement se concentre sur la création des fondations de vos plateformes et applications cloud natives :

*   Automatisation & Configuration
    
*   Registre de conteneurs
    
*   Sécurité et Conformité
    
*   Gestion des clés
    

### [Automatisation & Configuration](https://landscape.cncf.io/card-mode?category=automation-configuration)

Pour répondre aux cycles de développement et de publication rapides, l'infrastructure doit être provisionnée de manière dynamique. Les outils de cette catégorie gèrent soit différentes parties du processus de provisionnement, soit tentent de tout contrôler de bout en bout. Cela accélère la création et la configuration des ressources de calcul. Les outils automatisés tels que Terraform réduisent le niveau d'effort requis pour mettre à l'échelle des dizaines de serveurs et de réseaux avec des centaines de règles de pare-feu.

### [Registre de conteneurs](https://landscape.cncf.io/card-mode?category=container-registry)

Les applications cloud natives sont empaquetées et exécutées sous forme de conteneurs. Un conteneur est un processus en cours d'exécution avec des contraintes de ressources et de capacités gérées par le système d'exploitation d'un ordinateur. Les registres de conteneurs catégorisent et stockent les référentiels et fournissent les images de conteneurs nécessaires pour exécuter des applications. En stockant toutes les images de conteneurs au même endroit, elles sont facilement accessibles pour tout développeur travaillant sur cette application.

### [Sécurité et Conformité](https://landscape.cncf.io/card-mode?category=security-compliance)

Pour exécuter des conteneurs en toute sécurité, ils doivent être analysés pour les vulnérabilités connues et signés pour garantir qu'ils n'ont pas été altérés. Kubernetes dispose de paramètres de contrôle d'accès extrêmement permissifs par défaut, qui ne conviennent pas à la production. Résultat : les clusters Kubernetes sont la cible de toute personne cherchant à attaquer les systèmes. Les outils de sécurité et de conformité aident à surveiller et à appliquer la sécurité des plateformes et des applications.

### [Gestion des clés](https://landscape.cncf.io/card-mode?category=key-management)

Les environnements cloud natifs sont hautement dynamiques, ce qui nécessite une distribution de secrets à la demande. Cela doit donc être entièrement programmatique et automatisé. Les outils et les projets de cette catégorie couvrent tout, de la manière de stocker en toute sécurité des mots de passe et d'autres secrets (données sensibles telles que des clés API, des clés de chiffrement, etc.) à la manière de supprimer en toute sécurité des mots de passe et des secrets de votre environnement de microservices. Une clé est une chaîne de caractères utilisée pour chiffrer ou signer des données.

### [Exécution](https://landscape.cncf.io/card-mode?category=runtime,runtime)

La couche d'exécution fournit tous les outils nécessaires aux conteneurs pour s'exécuter dans un environnement natif du cloud :

*   Le stockage natif du cloud donne aux applications un accès facile et rapide aux données nécessaires pour fonctionner de manière fiable
    
*   Le runtime de conteneur qui crée et lance des conteneurs exécutant du code d'application
    
*   La connectivité native du cloud offre une connectivité aux applications conteneurisées pour communiquer.
    

Contrairement au provisionnement, la couche d'exécution englobe le contrôle des conteneurs pour s'exécuter dans un environnement natif du cloud. Cela inclut le code utilisé pour démarrer ou arrêter le conteneur, appelé runtime de conteneur ; les outils pour rendre le stockage persistant disponible pour les conteneurs ; et ceux qui gèrent les réseaux de l'environnement des conteneurs.

### [Stockage Natif du Cloud](https://landscape.cncf.io/card-mode?category=cloud-native-storage)

Les clusters Kubernetes doivent être gérés indépendamment à différents endroits pour développer les capacités de mise à l'échelle et les gérer de manière autonome. Pour les environnements cloud hybrides ou sur site, pour faire évoluer les applications conteneurisées, elles sont continuellement créées et supprimées, changeant ainsi de lieu au fil du temps, ce qui rend la portabilité difficile. Par conséquent, le stockage natif du cloud doit être fourni de manière indépendante des nœuds. Pour fonctionner de manière fiable, les applications doivent avoir un accès facile au stockage utilisant une interface de stockage de conteneurs compatible avec le cloud natif et pouvant être provisionné automatiquement, permettant la mise à l'échelle automatique et la restauration en éliminant le goulot d'étranglement humain.

### [Runtime de Conteneur](https://landscape.cncf.io/card-mode?category=container-runtime)

Le runtime de conteneur est le logiciel qui exécute des applications conteneurisées (ou "restreintes").

Les images de conteneurs (les fichiers avec les spécifications de l'application) doivent être lancées de manière normalisée, sécurisée et isolée. Normalisée car vous avez besoin de règles d'exploitation standard, peu importe où elles sont exécutées. Sécurisée, bien sûr, car vous ne voulez pas que quiconque y ait accès s'il ne le devrait pas. Et isolée parce que vous ne voulez pas que l'application affecte ou soit affectée par d'autres applications (par exemple, si une application colocalisée plante). L'isolation fonctionne essentiellement comme une protection. De plus, l'application doit disposer de ressources, telles que le CPU, le stockage et la mémoire. Containerd, tout comme Docker et CRI-O, sont des implémentations standard de runtime de conteneurs.

### [Réseau Natif du Cloud](https://landscape.cncf.io/card-mode?category=cloud-native-network)

Le réseau natif du cloud offre une connectivité pour que les applications conteneurisées puissent communiquer. Les applications distribuées ont plusieurs composants qui utilisent le réseau à des fins différentes. Les outils de cette catégorie créent un réseau virtuel au-dessus des réseaux existants spécifiquement pour que les applications puissent communiquer en privé, appelé réseau de superposition.

Le réseau de conteneurs doit attribuer des adresses IP aux pods où les applications conteneurisées s'exécutent dans Kubernetes, permettant à d'autres processus d'y accéder. Le réseau natif du cloud utilise un logiciel pour contrôler, inspecter et modifier les flux de données. Il facilite la gestion, la sécurité et l'isolation des connexions entre les conteneurs en prédéfinissant des politiques et des règles permettant à une application de se connecter à des services s'exécutant en dehors du réseau de conteneurs.

## **Orchestration et gestion**

Kubernetes lui-même est l'un des principaux moteurs du développement natif du cloud pour les couches d'infrastructure responsables de la communication interne des applications et des communications externes. Inhérent à l'évolutivité, les applications cloud natives reposent sur l'automatisation et la résilience, rendues possibles par ces outils.

### [Orchestration et planification](https://landscape.cncf.io/card-mode?category=scheduling-orchestration)

L'orchestration et la planification font référence à l'exécution et à la gestion de conteneurs sur un cluster. Un cluster est un groupe de machines, physiques ou virtuelles, connectées via un réseau. Les orchestrateurs (et les planificateurs) de conteneurs sont quelque peu similaires au système d'exploitation (OS) sur votre ordinateur portable. L'OS gère toutes vos applications comme Slack et Zoom ; il les exécute et planifie quand chaque application peut utiliser les ressources matérielles de votre ordinateur portable, comme le CPU, la mémoire et le stockage. La plupart des applications d'aujourd'hui nécessitent plus de ressources que ne peut en gérer un seul OS. Il faut donc un cluster pour regrouper les pods en fonction de leur espace de noms et gérer les conteneurs avec des outils d'orchestration tels que Kubernetes.

Les _espaces de noms_ Kubernetes permettent à différents projets, équipes ou clients de partager un cluster Kubernetes. Chaque espace de noms a ses propres :

1.  ressources (pods, services, réplicas, etc.)
    
2.  politiques (qui peut ou ne peut pas effectuer des actions dans leur communauté)
    
3.  contraintes (cette communauté est autorisée à consommer autant de quota, etc.)
    

Un opérateur de cluster peut créer un espace de noms pour chaque communauté d'utilisateurs unique.

L'espace de noms fournit une portée unique pour :

1.  les ressources nommées (pour éviter les collisions de noms de base)
    
2.  l'autorité de gestion déléguée aux utilisateurs de confiance
    
3.  la possibilité de limiter la consommation des ressources de la communauté
    

Les conteneurs et Kubernetes sont tous deux essentiels aux architectures cloud natives, ainsi que d'autres orchestrateurs de conteneurs tels que Docker Swarm et Mesos. Ils permettent une gestion de la configuration déclarative qui est gérée via des boucles de contrôle, un modèle dans lequel un processus en cours d'exécution dans Kubernetes surveille le magasin Kubernetes pour un type d'objet particulier et garantit que l'état réel dans le cluster correspond à l'état souhaité. On appelle cela une réconciliation d'état. L'état souhaité est spécifié par l'ingénieur (par exemple, dix instances du service A s'exécutant sur trois nœuds, c'est-à-dire des machines, avec accès à la base de données B, etc.) et est continuellement comparé à l'état réel. Si l'état souhaité et l'état réel ne sont pas compatibles, Kubernetes les réconcilie en créant ou en détruisant des objets. Par exemple, si un conteneur plante, Kubernetes lancera un nouveau conteneur sur un nœud différent pour le remplacer ou le récupérera lors de la mise à l'échelle de l'application avec des réplicas - la disponibilité d'un nombre spécifié de Pods identiques.

### [Coordination et découverte de services](https://landscape.cncf.io/card-mode?category=coordination-service-discovery)

Étant donné qu'il n'existe pas un seul endroit où se trouve un service particulier et que l'emplacement de tout est en constante évolution, les outils de découverte de services suivent les services au sein du réseau. Il existe principalement deux types d'outils dans cette catégorie :

1.  Moteurs de découverte de services : des outils de type base de données qui stockent des informations sur tous les services et la manière de les localiser
    
2.  Outils de résolution de noms : des outils qui reçoivent des demandes de localisation de service et renvoient des informations sur l'adresse réseau (par exemple, CoreDNS)
    

Dans Kubernetes, pour rendre un pod accessible, une nouvelle couche d'abstraction appelée "service" est introduite. Les services fournissent une seule adresse stable pour un groupe de pods en constante évolution. Dans Kubernetes, la création d'un service (abstraction) crée un groupe de pods qui fournissent ensemble un service (fonctionnalité dans un ou plusieurs conteneurs) avec un seul point d'entrée (point d'entrée) qui est le service Kubernetes.

#### **Découverte de service dans les systèmes distribués**

Les processus DNS traditionnels et les équilibreurs de charge traditionnels étaient souvent incapables de suivre rapidement les informations d'extrémité en constante évolution. Pour pallier ces lacunes, les outils de découverte de services gèrent rapidement l'enregistrement et la désinscription individuels des instances d'application. Certaines options telles que CoreDNS et etcd sont des projets de la CNCF et sont intégrées à Kubernetes. D'autres ont des bibliothèques ou des outils personnalisés pour permettre aux services de fonctionner efficacement.

### [Proxy de service](https://landscape.cncf.io/card-mode?category=service-proxy)

Un proxy de service est une passerelle entre l'utilisateur et les services ou entre différents services. Il intercepte le trafic vers ou depuis un service donné, lui applique une certaine logique, puis transfère ce trafic vers un autre service. Il peut être aussi simple que de servir de répartiteur de charge qui transfère le trafic vers des applications individuelles ou aussi complexe qu'un réseau de proxies interconnectés fonctionnant côte à côte avec des applications conteneurisées individuelles traitant toutes les connexions réseau. Les proxies de service sont également des éléments constitutifs d'autres systèmes, tels que les passerelles API ou les maillages de services. Les proxies recueillent des données essentielles, gèrent le routage (répartition équitable du trafic entre les services ou reroutage en cas de panne de certains services), chiffrent les connexions et mettent en cache le contenu (réduisant la consommation de ressources).

Les proxies de service permettent aux administrateurs d'accomplir plusieurs choses : ils peuvent recueillir des données détaillées sur la communication entre les services, protéger les services contre une surcharge, et appliquer d'autres normes courantes aux services, comme le TLS mutuel. Les proxies de service sont fondamentaux pour d'autres outils tels que les maillages de services, car ils fournissent un moyen d'appliquer des politiques de haut niveau à tout le trafic réseau.

### [Passerelle API](https://landscape.cncf.io/card-mode?category=api-gateway)

Une passerelle API permet aux organisations de déplacer des fonctions clés, telles que l'autorisation ou la limitation du nombre de requêtes entre les applications, vers un emplacement géré de manière centralisée. Elle simplifie la manière dont les organisations gèrent et appliquent des règles à toutes les interactions et sert de point d'entrée commun pour les consommateurs d'API (souvent externes).

Une passerelle API sert de point d'entrée commun pour un ensemble d'applications descendantes tout en fournissant en même temps un endroit où les équipes peuvent injecter une logique métier pour gérer l'autorisation, la limitation de débit ou la tarification.

### [Maillage de services](https://landscape.cncf.io/card-mode?category=service-mesh)

Un maillage de services est une couche d'infrastructure qui gère les communications entre les services en fournissant des signaux de commande et de contrôle à un réseau de proxies de service. Il lie tous les services s'exécutant sur un cluster via des proxies de service, créant ainsi un maillage de services.

Les maillages de services permettent aux propriétaires de plateformes d'effectuer des actions courantes ou de collecter des données sur les applications sans que les développeurs aient à écrire une logique personnalisée. Ils permettent aux équipes de plateforme d'ajouter de manière uniforme des fonctionnalités de fiabilité, d'observabilité et de sécurité à tous les services s'exécutant dans un cluster.

Certains maillages de services utilisent un proxy de service polyvalent (voir ci-dessus) pour leur plan de données. D'autres utilisent un proxy dédié ; par exemple, Linkerd utilise le "micro proxy" Linkerd2-proxy pour bénéficier d'un avantage en termes de performances et de consommation de ressources. Ces proxies sont uniformément attachés à chaque service via ce que l'on appelle des sidecars. Le terme "sidecar" fait référence au fait que le proxy s'exécute dans son propre conteneur mais réside dans la même capsule.

Cela s'applique également aux proxies polyvalents et aux passerelles API. Les maillages de services et les passerelles API résolvent ce problème, car ils sont mis en œuvre par les propriétaires de plateformes et appliqués de manière universelle à tous les services.

## **Définition et développement d'applications**

La couche de développement d'applications se concentre sur les outils qui permettent aux ingénieurs de créer des applications. Les outils de définition d'application et de construction d'images incluent diverses technologies qui améliorent l'expérience des développeurs et des opérateurs. La CI/CD aide les ingénieurs à détecter rapidement les erreurs, garantissant que le code est prêt pour le déploiement avec la meilleure qualité.

### [Base de données](https://landscape.cncf.io/card-mode?category=database)

Les bases de données fournissent une interface commune pour les applications afin de stocker et de récupérer des données. En général, il existe deux types courants : les bases de données en langage de requête structuré (SQL) et les bases de données NoSQL. Les bases de données les plus courantes, MySQL et Postgres, fonctionnent avec succès et efficacité dans les clusters Kubernetes et visent à apporter les avantages de la mise à l'échelle et de la disponibilité de Kubernetes.

### [Diffusion et messagerie](https://landscape.cncf.io/card-mode?category=streaming-messaging)

Les systèmes de messagerie et de diffusion fournissent un endroit central pour que les systèmes orchestrés communiquent. Le bus de messages fournit un endroit commun où toutes les applications peuvent aller pour informer les autres de ce qu'elles font en publiant des messages, ou pour voir ce qui se passe en s'abonnant à des messages.

Les outils de messagerie et de diffusion existent depuis longtemps avant que le natif cloud ne devienne une réalité. Pour gérer de manière centralisée les événements critiques pour l'entreprise, les organisations ont construit de grands bus de services d'entreprise. Mais lorsque nous parlons de messagerie et de diffusion dans un contexte cloud natif, nous faisons généralement référence à des outils comme NATS, RabbitMQ, Kafka ou des files d'attente de messages fournies par le cloud.

### [Définition d'application et construction d'images](https://landscape.cncf.io/card-mode?category=application-definition-image-build)

Les outils Kubernetes standardisent et simplifient la construction et le déploiement d'applications. Les outils de définition et de construction d'applications englobent un large éventail de fonctionnalités. En gros, les outils de cette catégorie résolvent soit des problèmes axés sur les développeurs, comme la manière de correctement écrire, empaqueter, tester ou exécuter des applications personnalisées, soit des problèmes axés sur les opérations, comme le déploiement et la gestion des applications. Helm est le seul projet diplômé de cette catégorie et sous-tend de nombreux modèles de déploiement d'applications. Il permet aux utilisateurs de Kubernetes de déployer et de personnaliser des applications, et est souvent utilisé par les organisations pour les versions internes.

![](https://images.prismic.io/syntia/0ebabfad-7ecf-4a66-90bb-756890d6e4e4_screenshot-2022-05-16-at-21.11.15.png?auto=compress,format)

![](https://images.prismic.io/syntia/4e0eeaa8-48ac-44d1-9de1-3b2b29eb476e_screenshot-2022-05-16-at-21.11.46.png?auto=compress,format)

Vulnérabilité de la traversée de chemin dans Argo CD - exploitation de l'analyse du champ du graphique Helm pour accéder à des informations restreintes telles que des clés API ou des mots de passe (CVE-2022-24348)

Les manifestes Helm chart yaml peuvent contenir une référence à des fichiers yaml de valeurs en dehors du champ d'application prévu. Cela peut entraîner une exposition de données sensibles provenant d'autres applications résidant sur le même serveur.

On soupçonne que la traversée de chemin se produit par un mécanisme implémentant une fonction intégrée qui conduit aux vulnérabilités. Elle peut être évitée par des tests unitaires et des mécanismes de test plus avancés couvrant tous les scénarios.

##### **Suggestion de remédiation à long terme**

*   Accès plat selon les permissions en tant que coupable lorsqu'il s'agit de sécurité
    
*   Mise en œuvre d'un modèle de permission au niveau du fichier
    
*   Les organisations doivent auditer l'accès aux fichiers et leur intégrité
    

### [Intégration continue et déploiement](https://landscape.cncf.io/card-mode?category=continuous-integration-delivery)

Les outils de CI garantissent que toutes les modifications de code ou les mises à jour introduites par les développeurs sont construites, validées et intégrées automatiquement et en continu. Plus un développeur travaille sur un morceau de logiciel sans l'intégrer dans le code source, plus il faudra

 de temps pour identifier une erreur et plus il sera difficile de la corriger.

Lorsqu'un développeur modifie le code d'une application Web, le système CI détecte le changement de code, construit et teste une nouvelle version. Le système CD prend cette nouvelle version et la déploie dans un environnement de développement, de test, de pré-production, puis de production. Il le fait tout en testant l'application déployée après chaque étape du processus. Ensemble, ces systèmes représentent un pipeline CI/CD.

Certains outils traditionnels de CI tels que Jenkins conviennent bien à l'écosystème Kubernetes. Flux et Argo ont inauguré une nouvelle manière de réaliser la livraison continue appelée GitOps, que le projet OpenGitOps s'efforce de définir en tant que norme neutre en termes de fournisseurs.

## **Observabilité et analyse**

*   "Observabilité" est un mot à la mode pour la surveillance moderne et l'analyse de la télémétrie
    
    *   Terme emprunté à la "théorie moderne des systèmes de contrôle", curieusement, a perdu le concept jumeau de "controllabilité" en cours de route
        
*   Mettons les choses au clair :
    
    *   La surveillance consiste à collecter et à traiter les données de télémétrie (pas seulement des métriques)
        
    *   L'observabilité est une propriété d'un système ; généralement, vous devez surveiller le système pour qu'il soit observable
        

L'observabilité est une caractéristique d'un système décrivant dans quelle mesure un système peut être compris à partir de ses sorties externes et comment il reste opérationnel même dans des conditions difficiles. Mesurée par le temps CPU, la mémoire, l'espace disque, la latence, les erreurs, etc., les outils de journalisation capturent les messages d'événements émis par les journaux des applications et les métriques, tandis que la trace suit le chemin des demandes individuelles. Lorsqu'ils sont combinés, ces outils fournissent idéalement un aperçu de la santé des systèmes. L'analyse est une activité au cours de laquelle les développeurs examinent ces données observables et en tirent des conclusions.

Les outils de cette catégorie sont répartis en journalisation, surveillance, traçage et ingénierie du chaos.

### [Surveillance](https://landscape.cncf.io/card-mode?category=monitoring)

#### **L'effet réseau de la surveillance**

*   Les problèmes se _propagent_ d'un système à un autre
    
*   Il faut une vue holistique des dépendances entre les systèmes pour comprendre
    
    *   Comment les problèmes se propagent
        
    *   L'impact sur les utilisateurs finaux
        
*   La surveillance a un _effet réseau_
    
    *   Plus vous surveillez ensemble, corrélé, contextualisé...
        
    *   Plus vous avez d'informations
        

Une bonne surveillance permet aux opérateurs de réagir rapidement, voire automatiquement, en cas d'incident. Elle offre des informations sur l'état actuel d'un système et surveille les changements.

La surveillance consiste à instrumenter une application pour collecter, agréger et analyser les journaux et les métriques afin d'améliorer notre compréhension de son comportement. Alors que les journaux décrivent des événements spécifiques, les métriques sont une mesure d'un système à un moment donné - ce sont deux choses différentes mais toutes deux nécessaires pour avoir une image complète de la santé du système.

![](https://images.prismic.io/syntia/71ffaf64-8a72-4314-a91a-69fa001f12aa_screenshot-2022-05-16-at-20.53.20.png?auto=compress,format)

Les types de télémétrie prévalents sont accessibles depuis les couches supérieures du contexte de l'infrastructure, en commençant par l'appareil de l'utilisateur final et l'Internet des objets (IoT).

### [Journalisation](https://landscape.cncf.io/card-mode?category=logging)

Les outils de journalisation collectent, stockent et analysent ces messages pour suivre les rapports d'erreurs et les données connexes. En plus des métriques et du traçage, la journalisation est l'un des piliers de l'observabilité - les outils de journalisation visent à aider les organisations à prendre le contrôle de leurs messages de journal pour comprendre ce qu'une application communiquait à tout moment donné.

Au fil du temps, la collecte et la conservation des messages de journal sont une capacité extrêmement puissante qui aide les équipes à diagnostiquer les problèmes et à répondre aux exigences réglementaires et de conformité. Dans un environnement natif du cloud, des outils de collecte de journaux comme Fluentd s'exécutent aux côtés des conteneurs d'application et collectent des messages directement à partir des applications.

### [Traçage](https://landscape.cncf.io/card-mode?category=tracing)

Le traçage, une utilisation spécialisée de la journalisation, permet de tracer le chemin d'une demande alors qu'elle se déplace à travers un système distribué en ajoutant un identifiant unique aux messages envoyés par l'application. Cet identifiant unique permet de suivre (ou de tracer) les transactions individuelles à mesure qu'elles se déplacent à travers le système.

Le traçage est un outil de débogage puissant qui permet de résoudre les problèmes et d'affiner le comportement d'une application distribuée. Le code de l'application doit être modifié pour émettre des données de traçage, et toutes les unités de travail individuelles d'un système distribué (appelées "spans") doivent être propagées par les composants de l'infrastructure (par exemple, les maillages de service et leurs proxies) dans le chemin de données de l'application. Jaeger et Open Tracing sont des projets CNCF dans cet espace.

### [Ingénierie du chaos](https://landscape.cncf.io/card-mode?category=chaos-engineering)

L'ingénierie du chaos fait référence à la pratique d'introduire intentionnellement des failles dans un système afin de tester sa résilience et de s'assurer que les applications et les équipes d'ingénierie sont capables de résister aux événements turbulents et inattendus.

L'approche traditionnelle pour maintenir une disponibilité élevée des applications est appelée l'optimisation du [temps moyen entre les pannes](https://en.wikipedia.org/wiki/Mean_time_between_failures) (MTBF). Vous pouvez observer cette pratique dans les organisations qui utilisent des choses comme les "comités d'examen des modifications" et les "longues périodes de gel des modifications". Les organisations informatiques performantes atteignent une disponibilité élevée en optimisant le [temps moyen de réparation](https://en.wikipedia.org/wiki/Mean_time_to_recovery) (MTTR) à la place. Au lieu d'attendre que quelque chose se produise et de le découvrir, placez-le sous contrainte dans des conditions contrôlées pour identifier les faiblesses et les corriger à l'avance.

##### **Événement Capture the Flag (CTF)**

Les événements Capture the Flag sont des compétitions de sécurité informatique. Les participants participent à des défis liés à la sécurité. Les drapeaux sont généralement des chaînes intégrées. Cela aide à développer les compétences essentielles nécessaires pour suivre une carrière en cybersécurité.

Exercice : terminez le Capture the Flag (CTF) de la journée Cloud Native Security de KubeCon [https://controlplaneio.github.io/kubecon-2021-sig-security-day-ctf/](https://controlplaneio.github.io/kubecon-2021-sig-security-day-ctf/)

Les conteneurs sont utilisés pour isoler les espaces de travail. L'espace de nom d'utilisateur et les cgroups sont un moyen pour un conteneur, en tant qu'ensemble de processus isolés, d'avoir un ensemble de permissions différent de celui du système lui-même. Cependant, les processus peuvent avoir des privilèges root dans leur espace de noms utilisateur sans les avoir dans d'autres espaces de noms utilisateur. L'exécution d'un conteneur privilégié permet d'accéder au système de fichiers racine à partir de cette machine.

![](https://images.prismic.io/syntia/15e7cab4-84fd-4150-b169-47f284dc38e1_screenshot-2022-05-16-at-21.13.59.png?auto=compress,format)

SSH dans un pod Kubernetes depuis l'extérieur du cluster Kubernetes

## **Plateforme**

Bien qu'il n'existe pas d'outil unique idéal pour tous les cas d'utilisation, il existe certainement un outil optimal pour les besoins de l'organisation en fonction du contrôle de l'adoption de Kubernetes, des charges de travail et des besoins en matière de délestage des tâches opérationnelles. Les opinions des fournisseurs sur ce qui est important et approprié sont intégrées dans la solution.

### [Kubernetes certifié - Distribution](https://landscape.cncf.io/card-mode?category=certified-kubernetes-distribution)

Les distributions Kubernetes fournissent un moyen fiable et sûr d'installer Kubernetes et fournissent des valeurs par défaut qui créent un environnement d'exploitation meilleur et plus sécurisé. Une distribution Kubernetes donne aux fournisseurs et aux projets le contrôle et la prévisibilité dont ils ont besoin pour fournir un support à un client tout au long du cycle de déploiement, de maintenance et de mise à niveau des clusters Kubernetes, ce qui facilite son utilisation.

### [Kubernetes certifié - Hébergé](https://landscape.cncf.io/card-mode?category=certified-kubernetes-hosted)

Kubernetes hébergé est un service proposé par des fournisseurs d'infrastructure comme AWS, Digital Ocean, Azure et Google, permettant aux clients de mettre en place un cluster Kubernetes à la demande. Le fournisseur cloud prend en charge la gestion d'une partie du cluster Kubernetes, généralement appelée le plan de contrôle. Ils sont similaires aux distributions, mais gérés par le fournisseur cloud sur leur infrastructure. Les clusters gérés imposent des limites plus strictes à la configuration des clusters Kubernetes.

### [Kubernetes certifié - Installateur](https://landscape.cncf.io/card-mode?category=certified-kubernetes-installer)

Les installateurs Kubernetes automatisent le processus d'installation et de configuration de Kubernetes et peuvent aider avec les mises à jour. Kubernetes open source s'appuie sur

 des installateurs comme kubeadm pour mettre en place et faire fonctionner les clusters Kubernetes. Les installateurs Kubernetes tels que [kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker) permettent de créer un cluster Kubernetes avec une seule commande. kubeadm est considéré comme si fondamental pour l'écosystème Kubernetes qu'il est inclus dans l'examen de l'administrateur Kubernetes certifié CKA. Minikube, kind, kops et kubespray sont tous des projets d'installateurs Kubernetes appartenant à la CNCF.

### [PaaS/Service de conteneurs](https://landscape.cncf.io/card-mode?category=paa-s-container-service)

Une plateforme en tant que service, ou PaaS, est un environnement qui permet aux utilisateurs d'exécuter des applications sans prendre le contrôle des ressources informatiques sous-jacentes. Des outils comme Cloud Foundry Application Runtime aident les organisations à démarrer rapidement avec de nouvelles applications. Cependant, tout PaaS présente ses propres avantages et restrictions. Les applications sans état ont tendance à bien fonctionner dans un PaaS, mais les applications avec état comme les bases de données ne le font généralement pas.

##### **Références et lectures complémentaires :**

Guide complet de la CNCF : [https://landscape.cncf.io/guide](https://landscape.cncf.io/guide)

Aperçu de Prometheus : [https://prometheus.io/docs/introduction/overview/](https://prometheus.io/docs/introduction/overview/)

Simulateur Kubernetes : [https://github.com/kubernetes-simulator/simulator](https://github.com/kubernetes-simulator/simulator)

Chaîne CNCF : [https://cloud-native.slack.com/](https://cloud-native.slack.com/)

Outils Argo CD : [https://argoproj.github.io/](https://argoproj.github.io/)

Outils Zinc : [https://github.com/jnsgruk/zinc-k8s-operator](https://github.com/jnsgruk/zinc-k8s-operator)

Outils Canonical :

*   [https://charmed-kubeflow.io/](https://charmed-kubeflow.io/)
    
*   [https://charmed-osm.com/](https://charmed-osm.com/)
    
*   [https://charmhub.io/topics/canonical-observability-stack](https://charmhub.io/topics/canonical-observability-stack)
    
*   [https://github.com/canonical/template-operator](https://github.com/canonical/template-operator)
    
*   [https://github.com/canonical/charming-actions](https://github.com/canonical/charming-actions)
    

Modèles Kubernetes : Éléments réutilisables pour la conception d'applications cloud natives : [https://developers.redhat.com/books/kubernetes-patterns](https://developers.redhat.com/books/kubernetes-patterns)