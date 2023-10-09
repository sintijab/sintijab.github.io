\---  
description: "Principe du niveau débutant au niveau avancé n°1 - des problèmes avec des exemples pratiques en code doivent être résolus en 1h..."   
pubDate: "Jul 28, 2023"   
heroImage: "f527fcc8-4b8c-4a67-a8db-059bbde53dac_img_20230726_150309-1.webp?auto=compress,format"   
author: "Syntia"   
categories: "ateliers, infrastructure cloud, réseautage, Kubernetes"   
subcategories: "dépannage de pods, application décentralisée, architecture hexagonale, polymorphisme"   
\---  

Le WeAreDevelopers World Congress est considéré par beaucoup comme l'événement phare mondial pour les développeurs. Ce que j'ai le plus apprécié, c'est la possibilité de rencontrer des personnes partageant les mêmes idées, sans entraves à leurs ambitions et à leur volonté d'un avenir meilleur.

## Restez Simple
Ce que j'ai appris du point de vue du conférencier, c'est le principe "Restez Simple" - des exemples pratiques en code et votre problème à résoudre en 1h doivent être clairs pour tout le monde, des débutants aux niveaux avancés.
Parmi tous les ateliers du premier jour du congrès, j'ai décidé de suivre trois ateliers différents sur Kubernetes, la conception d'architecture en programmation orientée objet et le changement de plateforme - la construction d'applications décentralisées sur la blockchain en tant que service.

## Dépannage Kubernetes
##### Atelier animé par Ahmed Gaber et Cassandra Faris
Obtenir des informations détaillées sur les pods est une pratique courante dans le processus de déploiement d'applications Web. En raison de la mauvaise configuration, de l'absence d'étiquettes ou de la mise à l'échelle du logiciel, le dépannage est essentiel pour exécuter les pods avec succès sur Kubernetes et garantir la disponibilité de l'application. De plus, l'avantage principal de Kubernetes réside dans le déploiement sur différents environnements, assurant la sécurité de l'application, la gestion des ressources et la mise à l'échelle de l'infrastructure.
Par exemple, la plupart des erreurs courantes peuvent être identifiées avec les deux commandes suivantes pour décrire le pod problématique, où la sortie indiquera la cause profonde du problème.
```bash
kubectl get pods
kubectl describe pod [nom-du-pod]
```
L'atelier sur le dépannage Kubernetes est disponible en ligne sur Kubecampus : https://kubecampus.io/kubernetes/courses/kubernetes-troubleshooting/

#### Problème : CrashLoopBackOff
Le pod ne peut pas être planifié sur un nœud. Le nœud n'a pas suffisamment de ressources pour exécuter le pod, ou il n'a pas réussi à monter les volumes. Les causes courantes sont les suivantes : Ressources insuffisantes - s'il y a des ressources insuffisantes sur le nœud, les clusters peuvent être mis à l'échelle pour garantir que plus de nœuds sont disponibles pour les pods et les anciens pods peuvent être arrêtés.
Montage de volume. Pour résoudre le problème de montage d'un volume de stockage, identifiez d'abord quel volume le pod essaie de monter et vérifiez si ce volume de stockage est correctement configuré et disponible.

#### Problème : ImagePullBackOff
Le pod n'a pas pu être exécuté car il a échoué à extraire une image de conteneur depuis un registre. Le pod refuse de démarrer car il ne peut pas créer un ou plusieurs conteneurs définis dans sa configuration.
Il s'agit soit d'un nom ou d'une étiquette d'image incorrecte - cela se produit généralement parce que le nom ou l'étiquette de l'image a été saisi incorrectement dans la configuration du pod.

Dans cet atelier, vous inspecterez les pods, vérifierez les images, corrigerez et appliquerez les définitions de pod à la configuration du pod.

![Atelier Kubernetes](https://images.prismic.io/syntia/f527fcc8-4b8c-4a67-a8db-059bbde53dac_img_20230726_150309-1.webp?auto=compress,format)
![Atelier Kubernetes](https://images.prismic.io/syntia/6af4ba85-205f-4484-8f1e-e6f1262b186f_img_20230726_150607-1.webp?auto=compress,format)
![Atelier Kubernetes](https://images.prismic.io/syntia/13ed9948-cb59-493b-91c0-3c61d338458d_img_20230726_150743-1.webp?auto=compress,format)

## Construisez des applications Web3 comme des applications Web2
##### At

elier animé par David Dal Busco
Ethereum a été la première blockchain capable d'héberger des contrats intelligents Turing complets, qui sont des unités de code sécurisées traitant et stockant des données sur la blockchain elle-même.

Bien que les contrats intelligents Ethereum puissent être utilisés pour créer un service DeFi, ils ne sont pas capables de fournir des expériences Web interactives permettant aux utilisateurs finaux d'interagir avec eux.

Une infrastructure d'informatique en nuage est utilisée pour fournir l'expérience utilisateur, et souvent aussi pour effectuer la grande majorité du traitement et du stockage des données, en particulier dans le cas des services Web3. Cela les expose à toutes sortes de vulnérabilités, notamment la censure par l'opérateur de cloud, les piratages et le transfert de responsabilité légale pour le service autrement décentralisé aux développeurs qui exploitent les comptes cloud.

Réalisant finalement que la trajectoire du projet Ethereum était incompatible avec la cryptographie appliquée et les mathématiques de l'informatique distribuée capables d'accélérer les blockchains et de leur permettre de se développer à l'infini.
Pour ce nouveau concept de "World Computer", la Fondation Dfinity a dû créer la plus grande opération de recherche et développement en blockchain, qui emploie actuellement plus de cryptographes que toute autre organisation technologique.

La blockchain Internet Computer - la première réalisation véritable de la vision du "World Computer" - a été lancée le 10 mai 2021.
Afin de mettre en œuvre des protocoles permettant d'établir des matériaux de cryptographie de clé de chaîne sur des nœuds dans un environnement de réseau décentralisé, cela ne peut être réalisé qu'à l'aide d'un protocole de génération de clé distribuée non interactive et de partage de clé, conçu par le cryptographe Jens Groth de DFINITY.

Il existe de nombreuses façons d'améliorer les échanges décentralisés fonctionnant sur Ethereum :
L'expérience Web interactive, par laquelle les utilisateurs passent des commandes et gèrent leurs comptes, peut être créée à l'aide de contrats intelligents capables de traiter des demandes HTTP.

Le traitement et le stockage coûteux des données peuvent être déchargés vers des contrats intelligents de l'Internet Computer. Par exemple, l'Internet Computer peut gérer les informations de profil utilisateur pour enregistrer toutes leurs transactions et leur permettre de continuer à acheter et à vendre des biens avec plusieurs vendeurs et acheteurs.

L'identité sur Internet peut être exploitée. Il s'agit d'un cadre d'authentification blockchain anonymisant que l'Internet Computer fournit pour permettre aux utilisateurs finaux de créer en toute sécurité des sessions avec des services Web3 en utilisant du matériel spécial, tel que le capteur d'empreintes digitales de leur ordinateur portable ou Face ID sur leur téléphone.
Le front-end construit sur l'Internet Computer peut mapper les ancres d'identité sur Internet aux clés publiques Ethereum, puis permettre aux utilisateurs finaux de s'authentifier en toute sécurité et commodément auprès du service DeFi en utilisant leur capteur d'empreintes digitales.

David Dal Busco lors du WeAreDevelopers 2023 World-congress, en moins d'une heure, nous a montré comment construire une "dapp" décentralisée en créant un service qui permet aux utilisateurs de s'authentifier de manière anonyme, de stocker et de récupérer des entrées de données et de télécharger des fichiers.
Cet exemple est expliqué en détail https://juno.build/blog#build-a-dapp
Le code source de ce tutoriel est disponible sur GitHub https://github.com/buildwithjuno/workshops, ainsi que d'autres exemples de code pour des applications et des microservices construits avec des frameworks logiciels Web bien connus tels que react, nextjs, vue, angular, nodejs. https://github.com/buildwithjuno/examples

Juno est une nouvelle solution open-source de Blockchain en tant que service qui permet la flexibilité de construire des applications décentralisées et de les héberger en tant que site web statique sur l'Internet Computer.
Juno prend en charge l'authentification via Internet Identity et NFID, le modèle de programmation du datastore pour le stockage de données sur la blockchain, éliminant ainsi le besoin d'écrire un backend, et le stockage pour la construction de dapps dynamiques pour stocker des actifs tels que des images, des documents, des vidéos, etc. La limite de stockage est actuellement de 2 Go de données, mais elle va être augmentée à 64 Go dans un avenir proche.

Contrairement aux plates-formes traditionnelles de Backend-as-a-Service (BaaS) telles que Google Firebase ou AWS Amplify, Juno fonctionne entièrement sur la blockchain.
Le développement d'une application JavaScript qui fonctionne entièrement sur la blockchain avec Juno ne diffère pas en termes d'architecture par rapport aux solutions sans serveur Web2 traditionnelles. Cependant, en ce qui concerne la sécurité

, l'optimisation des ressources et la réutilisation des composants, Web3 offre aux développeurs une perspective différente de l'architecture des applications.

Un exemple d'architecture d'applications Web3 (et Web2) expliqué par David Dal Busco : https://juno.build/blog/exploring-a-juno-web3-dapp-architecture

![Application dapp Web3](https://images.prismic.io/syntia/06dfe52a-8fa3-4303-be9d-24306c16fb30_screenshot-2023-07-28-at-21.39.42.webp?auto=compress,format)
![David Dal Busco](https://images.prismic.io/syntia/515fafd6-7d51-4b67-b517-4e8cf3ab5338_img_20230726_160352.webp?auto=compress,format)

## Pages Web hexagonales à six faces ? Architecture frontend hexagonale !
##### Atelier animé par Marco Emrich
Composant + Stratégie vous permet de configurer un sous-système pour s'intégrer dans des environnements légèrement différents. L'architecture hexagonale, également connue sous le nom de Ports & Adapters, en est une version spécifique qui vous permet d'isoler un système des technologies externes, de faire varier ces technologies externes et de tester le système en isolation.
Vous passez assez naturellement un objet dans une fonction afin que la fonction puisse demander à cet objet plus d'informations ou lui demander de faire quelque chose. Il s'agit d'une conception orientée objet normale.
Par exemple, supposez que vous programmiez une machine à café qui fonctionne à partir de recettes, vous pourriez passer un objet recette au fabricant de boissons, afin que le fabricant de boissons puisse obtenir de lui la séquence des ingrédients à distribuer.

Votre code ressemblerait à ceci :

```js
recipe = RecipeLibrary.find( "mochaccino" );
drinkmaker.make( recipe )
```
et à l'intérieur du fabricant de boissons :


```js
foreach step in recipe {
  dispenser = step.ingredient
  quantity - step.quantity
  dispenser.dispense( quantity )
}
```
Tout d'abord, nous avons paramétré les recettes, c'est-à-dire que nous choisissons celle que nous voulons utiliser en fonction de l'argument que nous passons à la fonction. Il s'agit d'une manière très basique de programmer, et cela devrait être assez compréhensible. La principale raison pour laquelle je le mentionne, c'est que je veux pouvoir dire un peu plus tard : "paramétrez les acteurs secondaires". Tout ce que je veux dire par là, c'est que vous passez un argument qui identifie celui à utiliser.
Il s'avère que nous venons de mettre en œuvre le modèle de conception Stratégie. De nombreux programmeurs n'utilisent pas consciemment la Stratégie, car elle semble compliquée dans le livre Design Patterns. Donc, bien qu'ils l'utilisent instinctivement, ils ne décrivent pas leurs conceptions de cette manière.

Ce qu'il y a de bien avec la Stratégie, c'est que la polymorphie permet non seulement d'économiser un tas d'"if", mais que le Contexte ne sait pas ou ne se soucie pas de celui qu'il a au moment de l'appel.
Le Contexte peut avoir calculé lequel il fallait plus tôt - par exemple, il peut avoir décidé plus tôt d'utiliser une recherche optimale en temps ou une recherche optimale en espace, et avoir obtenu l'algorithme de recherche approprié de quelque part, avoir mis cet objet d'algorithme de recherche dans un endroit sûr, et lorsque cela était nécessaire, avoir invoqué ce qu'il avait stocké.
Ou bien, l'objet Contexte peut ne jamais savoir quel objet de stratégie concrète il appelle. Quelque chose, ailleurs, a pris cette décision et l'a passée en tant que paramètre. C'est ce que nous avons fait avec l'objet recette.
Parce que le pilote passe la recette au fabricant de boissons, le fabricant de boissons ne sait rien de ces autres objets au moment de la programmation. Il n'a aucune dépendance au niveau du code sur eux. Toutes les connaissances dont il a besoin sont obtenues au besoin lors de l'exécution du programme. Nous aimons cela, du point de vue de la maintenance, des tests et de la réutilisation.

Pour appliquer ce concept de Stratégie dans l'architecture frontend hexagonale, Marco Emrich a montré un exemple de magasin de vaisseaux spatiaux :
https://github.com/illyrica/hexa-space
Similaire à la machine à café dans le livre d'Alistair Cockburn, Component-plus-Strategy généralise Ports-and-Adapters, 2022. L'UML contient une chose appelée Component, qui a une Interface fournie ou API du côté du pilote, et une Interface requise du côté du collaborateur. De plus, Component a une chose appelée un Port, qui n'est rien d'autre qu'une exigence selon laquelle tout ce qui se branche sur le composant doit respecter un protocole.
La spécification UML dit qu'un Component est "une unité modulaire avec des Interfaces bien définies qui est remplaçable dans son environnement".
De plus, les composants sont les Interfaces bien définies dans l'application principale qui connectent un ou plusieurs contextes limités implémentant des adaptateurs réutilisables.



Le modèle d'adaptateur est un cas spécial du modèle de conception Stratégie dans lequel la stratégie concrète apportera quelques ajustements pour la compatibilité de l'interface, puis appellera un autre service pour prendre en charge la demande. La grande différence entre les deux est que l'adaptateur a un niveau d'indirection supplémentaire. La stratégie peut ou non effectuer tout le travail elle-même, mais nous attendons des adaptateurs qu'ils fassent cela. Un des avantages de l'utilisation de Component et Strategy est que, en déclarant explicitement la limite du composant, vous pouvez fournir un double de test en tant que stratégie pour l'un des acteurs externes et tester ainsi le composant en isolation. Ensuite, pour une utilisation en production, fournissez un adaptateur pour effectuer la vraie connexion.

Et maintenant, notre discussion sur la Stratégie-Adaptateur devient pertinente. Les Interfaces pourraient ne pas être connectées à une base de données. Si ce n'est pas le cas, alors la définition correspond à un objet de Stratégie. S'il est connecté à une base de données, alors il s'agit probablement d'un adaptateur.

Cependant, nous ne sommes pas pointilleux sur la manière de l'appeler. En fin de compte, avoir un modèle architectural bien conçu avec Component et Strategy ou Component et Adapter facilite l'adaptation de l'application aux différents domaines. Cela se retourne contre la maintenance lors de l'introduction de plus d'exigences métier qui augmentent la complexité de l'application, ainsi que contre les efforts de refactoring futurs et les tests en unités isolées séparées.
![Application frontend hexagonale](https://images.prismic.io/syntia/151eca4e-45eb-414c-85e2-41112c8b4b72_screenshot-2023-07-26-at-18.08.55.webp?auto=compress,format)
![Marco Emrich](https://images.prismic.io/syntia/73a2206e-5d1f-4eb4-b408-cc97c964012a_img_20230726_170704.webp?auto=compress,format)