---
description: "35 ans du WWW"
pubDate: "Jun 19, 2024"
heroImage: "https://images.prismic.io/syntia/ZnIUWJm069VX13H8_IMG_20240615_081400_344.jpg?auto=format,compress?auto=compress,format"
author: "Syntia"
categories: "recherche, accès à l'information, archivage et documentation, open source"
subcategories: "javascript, manuel, conférences, recherche archivistique, événements de réseautage, gouvernance critique"
---

# 35 ans du WWW

![](https://images.prismic.io/syntia/ZnIUWJm069VX13H8_IMG_20240615_081400_344.jpg?auto=format,compress?auto=compress,format)

JSNation est la principale conférence JavaScript du 13 au 17 juin à Amsterdam
avec 50 intervenants, 1,5K participants et des événements sociaux et de
réseautage inoubliables. Le lieu de Kromhouthal a été transformé en piste de
danse, 💃 karaoké 🎤 et cour extérieure reliant le Likeminds Podium pour
accueillir des ateliers du festival C3 dev.

Bien que j'étais très concentré sur mon rôle de conférencier pendant la
conférence, j'ai rencontré d'autres esprits brillants qui ont investi dans le
Web depuis le début des années 90. L'opportunité de se voir et de se présenter
en personne ne devrait être remplacée par rien d'autre, tout simplement. Erick
Wendel a présenté une vision sur l'avenir des événements JS avec la réalité
étendue et le WebXR, ce qui sera un grand défi avec les manifestations des
technologies de l'IA.

![](https://images.prismic.io/syntia/ZnIUaZm069VX13H-_IMG_20240615_163903_740.webp?auto=format,compress?auto=compress,format)
En photo - Qui est le plus rapide pour créer une plateforme de visualisation de
données de génération d'énergie : ChatGPT ou un développeur ? Relevons ce défi
avec Chloé Caron.

Dans cet article, je voudrais partager quelques références sur la manière dont
le Web d'aujourd'hui façonne les technologies qui nous motivent à étudier le
rétro-ingénierie face à la complexité croissante de l'écosystème JS et à revenir
aux bases.

Si nous regardons ce qui est nouveau dans AtroJS, par exemple, les transitions
de vue sont une nouvelle définition pour les transitions animées CSS qui peuvent
être faites avec un simple HTML & CSS. Comprendre les bases du Web aide à
dévoiler les abstractions des frameworks JS modernes. Si vous êtes sur le point
d'installer un nouveau framework ou package sur vos _node_modules_, clonez
d'abord les dépendances et inspectez le code que vous utilisez.
![](https://images.prismic.io/syntia/ZnIUgZm069VX13H__IMG_20240615_124156.jpg?auto=format,compress?auto=compress,format)
En photo - Conférence de Christian Heilmann : 35 ans du WWW : Travailler en tant
que créateur de contenu, designer et développeur avec le meilleur médium jamais
créé.

## Témoigner de la mort du web en tant que médium d'information

### Christian Heilmann

[Les URI cool ne changent pas](https://www.w3.org/Provider/Style/URI). Les
pouvoirs du web étaient : pouvoir lier à d'autres ressources ; remixer et
ajouter aux favoris pour une utilisation ultérieure. Le fait est que
l'indexation est devenue moins importante.
[38 % des pages web qui existaient en 2013 ne sont plus accessibles aujourd'hui.](https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/)

En d'autres termes, le web était une question de rétention et d'accumulation de
contenu. Une bibliothèque en constante croissance qui par sa nature même était
auto-indexée et se référencée de manière croisée. Et c'est ce qui est activement
détruit de nos jours."

"À la fin des années 90, je travaillais comme présentateur de nouvelles radio et
utilisais les ordinateurs comme passe-temps", dit Christian. De nos jours, le
marché du travail exige de tourner autour des technologies qui peut-être dans 30
ans seront réduites. Témoigner de l'affirmation forte "la mort du web en tant
que médium d'information" a résonné avec quelqu'un qui criait du coin de la
salle de conférence "pourquoi toutes ces personnes sont-elles ici pour écouter
?" m'a fait repenser à la manière dont les informations sont détruites et les
gens ne peuvent pas trouver ou lire ce qu'ils veulent à cause des stratégies
économiques et centrées sur le profit qui sont manipulatrices et ont perdu le
domaine du contenu axé sur l'utilisateur, la communauté, avec un grand intérêt
pour la qualité de l'information et l'objectif éducatif ou académique.

"C'est devenu plus compliqué lorsque les médias ont fait de même. Je me souviens
quand le Guardian et la BBC avaient un accès complet aux archives. Je me
souviens même quand les autres journaux et les contenus agrégateurs de nouvelles
étaient disponibles pour remix. Mais bientôt, tout contenu d'actualité des 30
derniers jours a été supprimé du web et vous deviez vous fier à Google Cache ou
à la WayBackMachine de l'Internet Archive pour citer du contenu datant d'il y a
un mois. Les éditeurs ont commencé à réaliser que produire plus de contenu
dramatique et éphémère est la façon d'obtenir des clics. Et c'est de cela qu'il
s'agissait."

Référence à l'article complet :
[https://christianheilmann.com/2024/06/03/witnessing-the-death-of-the-web-as-a-news-medium/](https://christianheilmann.com/2024/06/03/witnessing-the-death-of-the-web-as-a-news-medium/)

![](https://images.prismic.io/syntia/ZnIXPpm069VX13IZ_IMG_20240613_110718.jpg?auto=format,compress?auto=compress,format)
Photo de la conférence d'Andrey Sitnik, Privacy-First Architecture.

## Superwebapps : Repenser les applications de bureau

### Introduction aux applications web progressives par Nico Martin

Nous devons stocker les données dans la logique de l'application de manière plus
structurée pour mettre en cache les entrées. Stockage de session pour une
session, stockage local pour une durée plus longue, mais ils sont limités à 5
Mo. IndexedDB est une API de navigateur de bas niveau qui permet aux
applications de stocker et de mettre à jour de grandes quantités de données
structurées.

Le système de fichiers privé d'origine permet de créer, lire et mettre à jour
des fichiers dans un système de fichiers privé. Il fait partie du système de
fichiers des utilisateurs, mais n'est pas visible par d'autres origines que
l'application web.

L'API de stockage persistant permet de demander l'autorisation de stocker les
données. Typiquement, les applications web peuvent stocker les données autant
que le navigateur le permet pour la mémoire disponible restante sur le
navigateur. L'API d'accès au système de fichiers permet aux applications web de
lire et d'enregistrer des modifications directement dans les fichiers et les
dossiers sur l'appareil de l'utilisateur. Les poignées de fichier de lecture
"showOpenFilePicker" demandent des autorisations pour une session et sont
sérialisables et peuvent être stockées dans IndexedDB, et la méthode
"createWritable()" stocke le fichier. L'API de gestion des fichiers permet
d'enregistrer une application en tant que gestionnaire de fichiers dans un
système d'exploitation.

[https://developer.chrome.com/docs/capabilities/web-apis/file-handling](https://developer.chrome.com/docs/capabilities/web-apis/file-handling)

Avec l'API launchQueue pour recevoir des fichiers entrants. L'API de gestion des
fichiers déclenche le point de terminaison de l'action et l'API launchQueue
consomme le fichier. C'est extrêmement pratique pour les utilisateurs.

Project Fugu est un projet cross-organisation pour apporter des capacités aux
applications web similaires aux applications natives des appareils.
[https://fugu-tracker.web.app/](https://fugu-tracker.web.app/) Certaines des API
sont particulièrement utiles, par exemple, les API de polices locales permettent
aux utilisateurs d'accéder aux polices installées localement et d'obtenir des
détails de bas niveau à leur sujet.
[https://developer.chrome.com/docs/capabilities/web-apis/local-fonts](https://developer.chrome.com/docs/capabilities/web-apis/local-fonts)

Adobe, VSCode fournissent leur service et l'accès à leurs applications
directement dans le navigateur Web grâce aux Service Workers et aux API de
navigateur. Avec les API Web progressives accessibles via URL, intégrées dans le
système d'exploitation, fonctionnant hors ligne et étant incroyablement petites
en comparaison avec d'autres solutions multiplateformes comme Tauri, Electron ou
Java.

Démo de présentation : [https://md.nico.dev/](https://md.nico.dev/)

## CODAGE EN DIRECT

Ateliers sur la création et le traitement du son numérique avec Mercury et Hydra
par [Saskia Freeke](https://sasj.nl/portfolio/) et
[Timo Hoogland](http://www.timohoogland.com/).

Les performances de codage en direct à JSNation étaient une activité essentielle
de la conférence, c'était le point culminant du festival C3 et l'événement de
clôture de JSNation. Le pouvoir collaboratif des ingénieurs et des artistes de
disciplines transversales travaillant ensemble était révélateur et libérateur.

Pendant l'atelier de 5 heures, j'ai appris à coder en mode collaboratif avec
Mercury et Hydra en utilisant l'incroyable environnement de codage en direct
Flok pour le navigateur développé par Damián Silvani.

Il existe 3 options pour utiliser Flok avec Mercury :

Utilisez Flok pour combiner Mercury avec des visuels Hydra (ou d'autres langages
comme Tidal, Foxdot et SuperCollider) sur un localhost

Collaborez ensemble dans la même salle physique avec 1 ordinateur pour faire

fonctionner Mercury

Collaborez à distance via un réseau

#### Références

[https://github.com/tmhglnd/live-coding-101](https://github.com/tmhglnd/live-coding-101)

[https://blog.toplap.org/](https://blog.toplap.org/)

[http://mercury.timohoogland.com/](http://mercury.timohoogland.com/)

[https://tonejs.github.io/](https://tonejs.github.io/)

[https://github.com/munshkr/flok?tab=readme-ov-file](https://github.com/munshkr/flok?tab=readme-ov-file)

[https://www.youtube.com/@Eulerroom](https://www.youtube.com/@Eulerroom)

<iframe width="560" height="315" src="https://www.youtube.com/embed/4d-5Ox9sELs?si=4kJ19cF3jjFEjn1g" title="Lecteur vidéo YouTube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Prix de l'open source

En répétant la tradition, JSNation a organisé cette année les JavaScript Open
Source Awards pour mettre en avant l'un des projets open source les plus
excitants de 2024 dans l'écosystème JS. Les projets candidats étaient regroupés
dans les catégories suivantes :

Projets contribuant à l'écosystème JS, ajoutant de nouvelles dimensions et des
possibilités de développement ultérieur. Concepts/idées nouveaux avec un grand
potentiel futur et une bonne réalisation en 2023.

rspack - [](https://github.com/web-infra-dev/rspack)
[https://github.com/web-infra-dev/rspack](https://github.com/web-infra-dev/rspack)

solid-start - [](https://github.com/solidjs/solid-start)
[https://github.com/solidjs/solid-start](https://github.com/solidjs/solid-start)

WinterJS - [](https://github.com/wasmerio/winterjs)
[https://github.com/wasmerio/winterjs](https://github.com/wasmerio/winterjs)

Mitosis - [](https://github.com/BuilderIO/mitosis)
[https://github.com/BuilderIO/mitosis](https://github.com/BuilderIO/mitosis)

Projets avec une utilisation pratique non standard de JS. Mélange avec des
logiciels et des technologies non traditionnels, ce qui fait briller JS en
augmentant les qualificatifs de développement/maintenance.

Effect-TS - [](https://github.com/Effect-TS)
[https://github.com/Effect-TS](https://github.com/Effect-TS)

PartyKit - [](https://github.com/partykit/partykit/)
[https://github.com/partykit/partykit/](https://github.com/partykit/partykit/)

Elysia - [](https://github.com/elysiajs/elysia)
[https://github.com/elysiajs/elysia](https://github.com/elysiajs/elysia)

Hono.js - [](https://github.com/honojs/hono)
[https://github.com/honojs/hono](https://github.com/honojs/hono)

Javy - [](https://github.com/bytecodealliance/javy)
[https://github.com/bytecodealliance/javy](https://github.com/bytecodealliance/javy)

Projet/outil qui a affecté la productivité du développement, faisant une grande
différence et méritant d'être adopté.

Biome - [](https://github.com/biomejs/biome)
[https://github.com/biomejs/biome](https://github.com/biomejs/biome)

Nitro - [](https://github.com/unjs/nitro)
[https://github.com/unjs/nitro](https://github.com/unjs/nitro)

Typescript Eslint - [](https://github.com/typescript-eslint/typescript-eslint)
[https://github.com/typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

Vanilla Extract - [](https://github.com/vanilla-extract-css/vanilla-extract)
[https://github.com/vanilla-extract-css/vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)

Node.js Test Runner - [](https://nodejs.org/api/test.html)
[https://nodejs.org/api/test.html](https://nodejs.org/api/test.html)

Projets intégrés avec l'utilisation de l'IA :

Screenshot-to-code [](https://github.com/abi/screenshot-to-code)
[https://github.com/abi/screenshot-to-code](https://github.com/abi/screenshot-to-code)

Draw-a-ui [](https://github.com/SawyerHood/draw-a-ui)
[https://github.com/SawyerHood/draw-a-ui](https://github.com/SawyerHood/draw-a-ui)

Web LLM [](https://github.com/mlc-ai/web-llm)
[https://github.com/mlc-ai/web-llm](https://github.com/mlc-ai/web-llm)

LangChain.js [](https://github.com/langchain-ai/langchainjs)
[https://github.com/langchain-ai/langchainjs](https://github.com/langchain-ai/langchainjs)

Ollama.js [](https://github.com/ollama/ollama-js)
[https://github.com/ollama/ollama-js](https://github.com/ollama/ollama-js)

![](https://images.prismic.io/syntia/ZnIUtJm069VX13IB_IMG_20240613_180926_0.jpg?auto=format,compress?auto=compress,format)
Merci Inga pour ta participation à l'événement et tes superbes captures !
