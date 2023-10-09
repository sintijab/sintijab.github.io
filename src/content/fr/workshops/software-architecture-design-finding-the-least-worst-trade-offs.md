---
description: "Conception de l'architecture logicielle - trouver les compromis les moins pires"
pubDate: "May 13, 2022"
heroImage: "https://images.prismic.io/syntia/0956969c-64e0-47bf-9c70-7900606555fe_sustain-ops.png?auto=compress,format"
author: "Syntia"
categories: "ateliers, infrastructure cloud, conception de l'architecture logicielle"
subcategories: "scalabilité logicielle, conception axée sur le domaine, DevOps, distribution de services"
---

Architecture logicielle : Les Parties Difficiles, Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani

Les entreprises doivent être agiles pour survivre dans le marché rapide et en constante évolution d'aujourd'hui, ce qui signifie que leurs architectures sous-jacentes doivent également être agiles. L'objectif est d'explorer comment effectuer une analyse des compromis dans les architectures distribuées.

"Il n'y a aucun développement unique, que ce soit en technologie ou en technique de gestion, qui promette lui-même une amélioration d'un ordre de grandeur [dix fois] dans la productivité, la fiabilité, la simplicité en une décennie." - Fried Brooks de "No Silver Bullet"

L'écosystème du développement logiciel évolue constamment. Le style prédominant pour les grandes entreprises il y a des années était centralisé et basé sur l'orchestration, l'architecture orientée services. Depuis que l'open source et Linux sont devenus viables, l'écosystème du développement logiciel a évolué en favorisant une transition architecturale vers les microservices et une infrastructure émergente de conteneurs et d'outils d'orchestration tels que Kubernetes.

Les microservices, par définition, respectent leur contexte limité de la conception axée sur le domaine comme moyen de limiter la portée des détails de l'implémentation.

Pour maintenir une bonne intégrité structurelle interne dans le code et répondre efficacement aux changements dans l'écosystème ou le domaine, il doit y avoir des caractéristiques mesurables qui contribuent à l'agilité, telles que les déploiements, la maintenabilité et la testabilité du logiciel.

L'avantage concurrentiel supérieur est obtenu grâce à la rapidité de mise sur le marché combinée à la scalabilité pour soutenir une activité utilisateur accrue et une disponibilité globale de l'application. La tolérance aux pannes, c'est-à-dire la capacité d'une application à échouer et à continuer de fonctionner, est nécessaire pour garantir que lorsque certaines parties de l'application échouent, d'autres pourront continuer à fonctionner normalement, minimisant ainsi l'impact global sur l'utilisateur final.

Lorsque les données sont l'actif le plus important de l'entreprise, une distinction importante à prendre en compte est la séparation entre les données opérationnelles et les données analytiques.

Au début des années 2000, la rétroaction incrémentielle et l'automatisation sont devenues un secteur intersectoriel entre le développement logiciel et les opérations, donnant naissance au nouveau rôle de DevOps et à l'automatisation des opérations manuelles. Ainsi, l'automatisation et la rétroaction sont devenues des catalyseurs clés de la productivité et de l'efficacité du développement logiciel.

Pour illustrer un exemple d'anti-pattern à éviter, il y a l'importation arbitraire de classes ou de composants. Le réseau de composants formant les dépendances cycliques détruit la modularité de l'architecture en la transformant en un grand amas de boue - un système logiciel qui manque d'une architecture perceptible. De tels systèmes sont courants en pratique en raison des pressions commerciales, du roulement des développeurs et de l'entropie du code.

Bien que les architectes doivent finalement comprendre comment mettre en œuvre des solutions, ils doivent d'abord comprendre pourquoi un choix a de meilleurs compromis que d'autres. La définition de concepts architecturaux peut éviter de nombreuses implémentations inutiles. Cela ne peut être fait qu'en définissant une portée de couplage statique et dynamique dans les architectures.

Le couplage statique fait référence à la manière dont les parties architecturales sont connectées : les dépendances, le degré de couplage et ses points de connexion. Le couplage dynamique fait référence à la manière dont les parties de l'architecture s'appellent les unes les autres en tant que couche de transport avec des détails sur le contrat et les informations transmises.

Une architecture monolithique déployée en une seule unité est, par définition, une architecture quantique unique. Au sein d'une architecture distribuée telle que les microservices, les développeurs ont tendance à pouvoir déployer des services de manière indépendante, souvent de manière hautement automatisée. Par conséquent, un service au sein d'une architecture de microservices représente un actif pouvant être déployé indépendamment et servant à plusieurs fins en tant qu'architecture quantique.

Premièrement, la frontière représentée par une architecture quantique sert de langage commun et de portée utile entre les architectes, les développeurs et les opérations, et la comprendre à sa manière : les architectes comprennent les caractéristiques de couplage, les développeurs comprennent la portée du comportement, et l'équipe des opérations reconnaît les caractéristiques de déploiement.

Deuxièmement, l'architecture quantique représente l'une des forces (le couplage statique) que les architectes doivent prendre en compte lorsqu'ils cherchent à déterminer la granularité appropriée des services au sein d'une architecture distribuée. Souvent, dans les architectures de microservices, les développeurs se posent des questions difficiles sur la granularité du service : quelle cadence de mise en production le service nécessite-t-il, quels autres services pourraient être affectés, quelles pratiques d'ingénierie sont impliquées.

Troisièmement, la déployabilité indépendante oblige l'architecture quantique à inclure des points de couplage communs. De nombreux systèmes distribués qui pourraient être qualifiés échouent s'ils partagent la base de données commune avec leur propre cadence de déploiement. La prise en compte des limites de déploiement ne fournit pas uniquement une mesure

 utile, et la haute cohésion fonctionnelle doit être prise en compte pour limiter la portée utile de l'architecture quantique.

Idéalement, dans l'architecture des microservices, chaque service modélise un seul domaine ou flux de travail, et présente donc une haute cohésion fonctionnelle. La cohésion dans ce contexte ne concerne pas la manière dont les services interagissent pour effectuer un travail, mais plutôt à quel point un service est indépendant et couplé à un autre.

Degrés élevés de découplage permettent aux équipes travaillant sur un service de travailler de manière indépendante sans se soucier de casser d'autres dépendances. Dans l'architecture micro frontend, chaque service lié à un composant d'interface utilisateur forme une architecture quantique : chacun de ces services peut avoir des caractéristiques architecturales différentes.

Le couplage statique d'un système fournit des informations précieuses, même dans des systèmes complexes avec des intégrations. Une technique courante pour comprendre l'architecture "legacy" implique la création d'un diagramme quantique statique montrant comment les choses sont "câblées" ensemble, ce qui permet de déterminer quels systèmes seront impactés par les changements et offre un moyen de découpler l'architecture.
