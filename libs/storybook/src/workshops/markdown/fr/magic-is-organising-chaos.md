# La magie organise le chaos

Au React Summit, environ 70% des présentations portaient sur les implémentations côté serveur par rapport au côté client. Alors que la plupart des intervenants expliquaient la configuration avec des setups personnalisés ou adaptés à des frameworks comme Next.js, l'engouement pour les composants générés côté serveur peut s'expliquer ainsi.

### Avantages

*   L'application dépend de nombreuses APIs externes, le chargement direct depuis le serveur présente des avantages pour réduire le TTI (temps jusqu'à l'interactivité), ce qui est particulièrement utile sur les connexions lentes ou les appareils peu performants.
    
*   Étant donné que le contenu est rendu/streamé côté serveur, les moteurs de recherche le classent plus haut, améliorant ainsi la visibilité du site.
    
*   Les composants rendus côté serveur sont moins dépendants du code côté client, réduisant ainsi certaines vulnérabilités de sécurité. Parmi celles-ci figure la [falsification de requête côté serveur (SSRF)](https://cwe.mitre.org/data/definitions/918.html) (signalée récemment par un audit de sécurité sur les requêtes fetch). Si JavaScript échoue ou est désactivé côté client, le SSR peut garantir que le contenu et les fonctionnalités essentiels restent accessibles.
    
*   La séparation du réseau - délimiter quelles parties de l'interface utilisateur sont rendues côté client ou côté serveur permet de combiner différentes stratégies de chargement de l'interface utilisateur.
    

### Inconvénients :

*   La composabilité - orchestrer quelles composantes doivent être demandées en premier avant de rendre quoi que ce soit (par exemple, avec des promesses). Remix, par exemple, utilise des promesses avec des actions et des chargeurs au niveau de la route, mais pas au niveau des composants. Le React Suspense permet d'afficher l'interface utilisateur avec des états de chargement et offre un meilleur contrôle sur les états de chargement. De plus, le crochet React `useDeferredValue` permet de différer la mise à jour d'une partie de l'interface utilisateur avec des données en attente.
    
*   Les composants côté serveur ne sont pas adaptés aux grandes applications ou aux architectures statiques sans serveur en raison de l'utilisation accrue du CPU, ce qui peut entraîner des coûts d'infrastructure plus élevés. De plus, l'utilisation des [threads de travail (worker-threads)](https://nodejs.org/api/worker_threads.html) pour le co-implémentation des données et la gestion des opérations JavaScript en parallèle ne sont pas recommandés.
    

Kent.C.Dodds a expliqué les concepts des Composants Serveur avec le framework RSC personnalisé - Et maintenant, vous comprenez les Composants Serveur React, React Summit, [lien](https://github.com//epicweb-dev/react-server-components) vers l'atelier.

## Introduire le Chaos dans votre frontend

Thibaud Courtoison expliquait "La magie organise le chaos tandis que les océans du mystère demeurent" en expliquant l'ingénierie du chaos avec le Chaos Frontend Toolkit, une extension de navigateur [https://chaos-frontend-toolkit.web.app/](https://chaos-frontend-toolkit.web.app/). Il inclut différentes zones de perturbation telles que :

*   Retard des requêtes (similaire à l'atténuation du réseau mais avec des retards max/min ou aléatoires des requêtes HTTP jusqu'à 15000 millisecondes)
    
*   Échec des requêtes ou liste de refus (échec de toutes les requêtes HTTP à partir de cette liste regex)
    
*   Tests de localisation (i18n, de droite à gauche, polices, espacement) avec pseudo-localisation
    
*   Ralentissement du minuteur - lorsque le site Web est hors focus pendant longtemps, les délais d'expiration ou les intervalles sont ralentis
    
*   Navigation aléatoire en arrière ou en avant dans l'historique de l'application toutes les 60 secondes.
    
*   Voyage dans le temps - tests de soumission de formulaire et stockage client avec l'historique de l'API en naviguant en arrière/avant dans l'historique du navigateur toutes les X secondes
    
*   Tests de validation de formulaire avec double clic sur l'entrée ou gremlins - simule des actions d'utilisateur aléatoires avec la souris et le clavier
    
*   Accessibilité - remplacement des couleurs par du noir et blanc
    

## Améliorer les écosystèmes React avec l'observabilité

Améliorer les écosystèmes React avec l'observabilité : une plongée profonde dans React avec OpenTelemetry par Jan Peer Stöcklmair. Si vous avez déjà reçu un ticket de bogue d'un client affichant un écran blanc et que vous n'avez trouvé aucun moyen efficace de le déboguer.

### Surveillance vs Observabilité

**Surveillance** consiste à collecter, analyser et utiliser des informations pour suivre les progrès du programme vers l'atteinte de ses objectifs et pour guider les décisions de gestion.  
**Observabilité** consiste à comprendre l'état interne d'un système en analysant les données qu'il génère, telles que les journaux, les métriques et les traces.  
**OpenTelemetry** se concentre sur la génération et le traitement des journaux, des métriques et des traces. Le stockage et l'analyse dépendent des fournisseurs.  
Les journaux ou les enregistrements de journal sont importants pour la trace de requête et les identifiants de span, la timestamp et le corps.  
Les métriques ou les instruments où un instrument est un point de données à un moment spécifique, par exemple, la quantité de CPU utilisée par votre logiciel à un instant donné.  
Le compteur regroupe plusieurs instruments, et la trace est un parcours d'utilisation d'un événement spécifique, par exemple, un appel d'API avec un ID de trace pour l'événement qui se compose d'identifiants de span, comme des appels de base de données, ou un autre appel de fonction. Chaque ID de span peut contenir d'autres attributs et des événements de span qui sont utiles pour le traçage des erreurs et le débogage.

### Suivi client
Un ID de trace serait trop difficile pour le débogage des sessions utilisateur de 2 à 3 heures, donc un ID de trace pourrait être attribué à :

*   par exemple, le rechargement du navigateur, les événements globaux du navigateur et le chargement de différents fichiers (html/css/js)
    
*   le sondage aléatoire en arrière-plan avec un certain endpoint
    
*   interactions utilisateur, par exemple, les gestionnaires d'événements onclick qui demandent des APIs
    

La fusion des traces est possible avec l'ID d'instance, qui peut être ajouté à chacune de ces traces.

### Complexité dans les composants serveur Web

L'utilisateur ne peut pas faire la différence entre les composants rendus côté serveur ou côté client, car les deux renvoient un HTML. Si l'utilisateur navigue vers la page des mises en page, elle n'est pas récupérée en tant qu'HTML, mais par une requête POST fetch.  
Le serveur peut accéder directement à la base de données ou à d'autres fournisseurs, par exemple Redis, pour récupérer les clés. Dans un autre scénario, il pourrait appeler un point d'extrémité sur un proxy NGINX qui contiendrait un événement Python ou un nouveau service qui aurait également accès à la base de données. L'absence de configuration établie pour les limites d'erreur et la gestion des erreurs au niveau du serveur rendra le débogage de l'application problématique.**Traçage distribué**  
Le traçage distribué consiste à connecter une trace pour différents services, par exemple React et NGINX avec propagation de contexte via l'en-tête [W3C Trace Context](https://www.w3.org/TR/trace-context/).  
Il existe un ID de trace sur les deux services via l'en-tête parent de trace défini par W3C Trace Context ou tout autre. Il se compose de quatre composants : la version, l'ID de trace qui connecte les deux services, et l'ID de span qui est la dernière partie de l'ID de span de l'application React et qui est également la première partie de l'ID de span du service connecté, et les indicateurs de trace s'il est échantillonné ou non.  
Démonstration sur l'instrumentation d'OpenTelemetry pour JavaScript sur l'application NextJS : [https://github.com/JPeer264/reactsummit24/commit/0b05c89950d89f265

64e90acaca5c1bf5ed491e4](https://github.com/JPeer264/reactsummit24/commit/0b05c89950d89f26564e90acaca5c1bf5ed491e4)

### Comment limiter les coûts sur les traces ?

Traquer tout dans votre application ajoutera du stockage de données qui est limité pour les niveaux gratuits. Sur le stockage Cloud de Grafana, il est de 50 Go avec 14 jours de rétention et seulement 3 utilisateurs.  
Le collecteur OpenTelemetry, un récepteur, peut avoir plusieurs instances, et NextJS peut être un récepteur pour envoyer les données au collecteur. Les processeurs filtrent, masquent et regroupent les données qui sont ensuite transférées vers Loki pour collecter les journaux d'erreurs ou stockées dans un fichier. Le traitement est l'une des étapes les plus importantes avec la propagation de contexte pour économiser sur les coûts de stockage Cloud et la planification.

Référence photo - codage créatif en WebAssembly écrit à la main, utilisant le format texte .wat de WebAssembly. Mentionné dans la présentation de Justin Schroeder à JSNation 2024, intitulée "Say WAT Now!? Turbocharged JavaScript With Hand Crafted WASM". Répertoire - austintheriot/hand-crafted-wasm.