---
description: "Prédiction d'images radar et satellitaires optiques"
pubDate: "Mar 29, 2022"
heroImage: "https://images.prismic.io/syntia/2f347b0b-5e4c-4167-a106-e625524b3ca4_figure-2022-03-27-153109.png?auto=compress,format"
author: "Syntia"
categories: "projets, intelligence artificielle, réseaux neuronaux, classification d'images"
subcategories: "réseau neuronal convolutif, réseaux neuronaux artificiels, imagerie satellite, détection d'objets militaires, détection d'anomalies"
---

Image de test et cartes de caractéristiques de la couche de convolution

Les progrès réalisés dans la technologie et le traitement numérique du signal depuis le début des années 50 ont conduit au développement de systèmes utiles pour les actions militaires et civiles.

Toutes les informations détenues par les systèmes de surveillance de masse devraient être une contrepartie de la défense et du renseignement militaire de l'Organisation du Traité de l'Atlantique Nord (OTAN), qui a été créée à la suite de la Seconde Guerre mondiale et qui devrait être chargée de fournir une sécurité avec des opérations de renseignement exploitables en temps réel pour aider à la fois dans les efforts militaires et humanitaires.

Aujourd'hui, la technologie du radar à ouverture synthétique (SAR) joue un rôle important dans la surveillance terrestre militaire et l'observation de la Terre. Dans le contexte militaire, la disponibilité du SAR est un avantage convaincant.

Les applications dans ce domaine sont nombreuses : la reconnaissance mondiale est principalement réalisée par des systèmes satellitaires, des avions et des plateformes sans pilote volant haut portant des capteurs pour l'observation de grandes zones, et un équipement SAR miniaturisé est utilisé pour l'intégration dans des drones pour la surveillance sur le champ de bataille.

Le principe sous-jacent du radar offre des avantages par rapport aux capteurs concurrents dans les domaines spectraux infrarouge ou visible. Le radar s'est avéré précieux auparavant, en raison de sa capacité jour et nuit et de la possibilité de pénétrer les nuages et la pluie. Cependant, les instruments optiques ont de grands avantages dans l'interprétation des objets représentés. Les images optiques de sociétés telles que Maxar Technologies et Planet fournissent des images satellites basées sur la lumière visible ou infrarouge, mais elles ne peuvent pas voir à travers les nuages et ne sont pas aussi efficaces la nuit.

Le SAR utilise le mouvement de l'antenne radar montée sur un avion ou un satellite pour imaginer ce qui se trouve en dessous ; il fonctionne en envoyant des impulsions de faisceaux radar et en collectant les échos. De manière similaire aux ondes ultrasonores qui rebondissent sur les interfaces entre des milieux ayant des impédances différentes, comme l'os/le muscle, ou la peau/le liquide amniotique. La synthèse est réalisée en acquérant des données à partir de parties de l'ensemble pour réduire la quantité de canaux électroniques. Pour le radar, l'objet est le plus souvent dans le champ lointain de l'ensemble, tandis que l'objet est toujours dans le champ proche d'un système d'échographie médicale, ce qui complique la reconstruction. Comme l'ensemble médical est fixe, il est possible de répéter rapidement les mesures, ce qui n'est pas le cas pour un système de radar SA. La position entre les différents éléments est également fixe en échographie, tandis que les déviations par rapport à une trajectoire de vol rectiligne pour les avions doivent souvent être compensées dans les systèmes radar.

Ainsi, en mesurant précisément le temps qu'il faut pour que les échos reviennent de ces interfaces en tenant compte des vitesses de propagation du son différentes dans chaque milieu, leurs positions peuvent être déterminées et une carte tridimensionnelle détaillée peut être calculée, puis convertie en une image vidéo en temps réel.

"Ultrasound" présente une collection d'images générées à partir d'un modèle de réseau de convolution formé sur des ensembles de données d'imagerie satellitaire optique et radar provenant d'activités militaires antérieures à l'envoi de troupes militaires russes en Ukraine, détaillant une flotte importante de technologie militaire et de ressources à travers la Biélorussie, la Crimée et l'ouest de la Russie, toutes frontalières de l'Ukraine.

Les images classifient les objets pour la segmentation : hélicoptères déployés, tentes, avions d'attaque au sol, troupes, unités de défense aérienne, convois de véhicules. L'entraînement du réseau de neurones profonds est réalisé par apprentissage non supervisé en raison de défauts inconnus, d'un nombre croissant d'ensembles de données déséquilibrés non étiquetés et de codeurs automatiques construits qui conviennent comme outil de diagnostic pour examiner des images satellites et prédire la détection d'objets militaires en tant qu'anomalies à grande distance, sur différentes surfaces et angles. Pour augmenter les performances de l'auto-étiquetage, la dimensionalité des images du jeu de données d'origine a été réduite après les 100 premières époques d'entraînement et le nouveau jeu de données a créé des cartes de caractéristiques reconstruites à partir de la partie encodeur avec les mêmes poids utilisés pour l'auto-encodeur. Les prédictions générées à partir du modèle CNN sont imprimables [./gallery/140472457/Ultrasound](https://www.behance.net/gallery/140472457/Ultrasound) représentant les images générées avec l'auto-étiquetage. L'ampleur des changements est mieux reflétée et est plus significative par la distribution KDE et l'analyse de l'espace latent.

Comment prédire où commence la guerre ? L'entraînement du réseau neuronal consiste en une classification binaire où le territoire n'a pas d'intervention militaire et où il y a une activité capturée à différents moments. L'entraînement pourrait être optimisé en auto-codant des ensembles de données avec des secteurs positifs et de faux positifs

 pour différencier les erreurs de reconstruction de test pour les territoires avec une probabilité plus faible d'anomalies.

L'activité militaire a été observée et capturée entre le 13 et le 22 février, avant que la Russie n'envoie des troupes militaires en Ukraine pour des opérations de "maintien de la paix", annoncées une semaine plus tard, le lundi 21 février. Avec les images satellites optiques et radar disponibles, une protection civile garantie et une réponse précoce à la crise humanitaire avant l'escalade de l'état d'urgence.

Sincères condoléances aux victimes de la guerre en Ukraine et à l'étranger.