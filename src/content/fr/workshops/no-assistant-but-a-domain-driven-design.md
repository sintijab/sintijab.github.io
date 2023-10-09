---
description: "Ingénieurs logiciels sans assistant mais avec une conception orientée domaine"
pubDate: "Jun 23, 2022"
heroImage: "https://images.prismic.io/syntia/8cea8294-1143-42c6-856a-338dd0a286d5_img_20220827_105638_666.jpg?auto=compress,format"
author: "Syntia"
categories: "ateliers, infrastructure cloud, conception d'architecture logicielle"
subcategories: "scalabilité logicielle, conception orientée domaine, devops, distribution de services"
---

Quand je regarde le code, je pense à combien de fois j'ai déménagé entre des espaces de travail pour résoudre des problèmes inaperçus. Peu importe combien de fois le problème se répète, il est susceptible d'appartenir au groupe des anti-patrons dans un état obsolète. Des outils de développement tels que le linter et le compilateur TypeScript peuvent assurer l'automatisation et la traçabilité des défauts dans le code et la conception qui peuvent témoigner de la qualité. Le système logiciel est plus qu'une unité, mais l'étendue du travail dépend de sa conception et de son architecture.

"Je ne travaille plus sur les fonctionnalités du produit, mais sur l'amélioration des modèles de conception et des échafaudages qui améliorent les produits de toutes sortes, de l'expérience du développeur à celle de l'utilisateur final. Cela n'est possible qu'avec une bonne équipe qui n'a pas peur de recommencer." 

Le logiciel web en 2022 consiste beaucoup plus à apprendre à coder de manière remplaçable et bien définie dans les processus et les règles de domaine. Ce qui pousse les équipes vers l'avant, ce ne sont pas les termes de la stratégie technique, mais la course à la performance. Investir plus de temps pour le développement en prenant une pause pour commencer une routine d'identification des modèles de conception dans les produits est la bonne attitude à adopter. Lorsque le modèle est modulaire, extensible et facile à entretenir, car la conception reflète le modèle commercial, il améliore la réutilisabilité et la testabilité des objets du domaine commercial. Certaines des caractéristiques d'un modèle de domaine bien conçu sont :

*   Le modèle abstrait dissèque la fonctionnalité au niveau atomique, permettant une classification basée sur des couches isolées de fonctionnalité, ce qui facilite l'extraction des interactions entre les composants, révélant ainsi de nouvelles vulnérabilités et caractéristiques du modèle.

*   Isolé des autres domaines ainsi que des autres couches de l'architecture de l'application.

*   Assurez-vous que les classes de domaine sont réutilisables et testables unitairement pour éviter les modèles et implémentations dupliqués des mêmes éléments de domaine.

*   Les dépendances ne sont pas couplées avec d'autres couches de l'application de chaque côté de la couche de domaine, les couches sont séparées, ce qui facilite la maintenance, les tests et la version.

*   Un ensemble minimal de dépendances sur des infrastructures frameworks permettra de survivre à un couplage serré sur des frameworks externes.

*   Le modèle de domaine devrait se concentrer sur un domaine opérationnel commercial spécifique. Il devrait s'aligner sur le modèle commercial, les stratégies et les processus commerciaux.