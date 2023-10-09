---
description: "Prometheus Lab, Projet CNCF pour ajouter de la musique et des annonces à la maison"
pubDate: "Apr 21, 2023"
heroImage: "https://images.prismic.io/syntia/3a7f4e2f-fff0-44ef-8eef-f71422107799_screenshot-2023-04-20-at-12.52.54.png?auto=compress,format"
author: "Syntia"
categories: "projets, infrastructure cloud, outils de surveillance"
subcategories: "infrastructure cloud, prometheus, laboratoire de hackathon, espace des hackers, outils audio, ingénierie sonore"
---

Le projet Coldplay d'Erwin de Keijzer, ingénieur DevOps, a guidé la phase de construction d'une solution logicielle pour ajouter de la musique et des annonces à sa maison.

Alors que Prometheus est devenu l'outil de surveillance open source le plus important au monde, sans parler d'OpenTelemetry, Grafana et des récentes mises à jour de projet par la CNCF, l'intégration d'outils de surveillance et d'observation a été au cœur de la KubeCon et de la CloudNativeCon en 2023.

Cette année, la KubeCon + CloudNativeCon Europe 2023 a réuni plus de 10 000 participants, dont 58 % participaient pour la première fois à cette conférence cloud-native mondiale.

L'attention portée aux preuves de concept et aux projets sandbox montre souvent que la décision concernant le résultat final d'un projet dépend non seulement de l'architecture logicielle, mais aussi des itérations de test dans la phase de développement du projet.

Erwin de Keijzer, ingénieur DevOps, a présenté l'utilisation d'outils de surveillance et d'observation pour en apprendre davantage sur Prometheus et découvrir la détection des anomalies avec des requêtes PromQL.

#### **Projet Coldplay - Utilisation des Projets CNCF pour Ajouter de la Musique et des Annonces à Mon Ascenseur Domicile**

##### **Objectifs de Coldplay :**

*   savoir où se trouve l'ascenseur ;
    
*   ajouter de la musique lorsque l'ascenseur est en mouvement ;
    
*   diffuser des annonces lorsque l'ascenseur s'arrête à un étage ;
    
*   ne pas endommager l'ascenseur ;
    
*   ne pas endommager l'électronique interne de l'ascenseur.
    

#### **Alertes :**

![](https://images.prismic.io/syntia/3a7f4e2f-fff0-44ef-8eef-f71422107799_screenshot-2023-04-20-at-12.52.54.png?auto=compress,format)

![](https://images.prismic.io/syntia/6b9bf08b-5a88-4e63-aa9f-7aa6413ac99b_screenshot-2023-04-20-at-12.54.11.png?auto=compress,format)

*   Ascenseur bloqué entre les étages ; l'ascenseur se déplace trop rapidement ;
    
*   l'ascenseur se déplace trop lentement ;
    
*   l'ascenseur est hors limites (< 0 cm ou > 550 cm).
    

### **Tentative #1**

Capteur ultrasonique attaché à un Raspberry Pi, où le code Python produit des mesures. La distance semble fiable, mais les poutres de support horizontales dans la cage d'ascenseur produisent des échos pour les ondes sonores, et la cage d'ascenseur est trop haute (plus de 2 m), un problème d'échelle verticale.

### **Tentative #2**

Capteur de portée LiDAR TF-Luna, portée jusqu'à 8 m, précision de 2 % de la distance mesurée, à partir de 8 m, elle pourrait dévier de 16 cm, taux de rafraîchissement jusqu'à 250 Hz et plusieurs modes de connexion, par exemple, basé sur un mécanisme de déclenchement.

Problème de gigue pour la hauteur de l'ascenseur lié à la température de la puce elle-même sur le capteur (Unité : 0,01 degré Celsius ; Horodatage - selon les spécifications TF Luna I2C).

![](https://images.prismic.io/syntia/d2547ded-c47c-49e5-ba3e-cc6dea613587_screenshot-2023-04-20-at-11.47.48.png?auto=compress,format)

![](https://images.prismic.io/syntia/53181ac6-c67a-4116-b4bd-59c12d2bd01e_screenshot-2023-04-20-at-12.01.29.png?auto=compress,format)

![](https://images.prismic.io/syntia/617ab138-6ffc-4997-94fe-66ef4b37c2f1_screenshot-2023-04-20-at-12.06.45.png?auto=compress,format)

Surveillance avec Prometheus et Grafana

### **Architecture Logicielle :**

**1re tentative** avec une **approche de microservices** - sur le Raspberry Pi, il y a deux composants - mesure et haut-parleur, qui effectuent des mesures et diffusent les annonces. Le Scientist est la chanson Coldplay qui contrôle le projet - prend toutes les mesures et décisions concernant la diffusion de musique, met à jour l'interface utilisateur et envoie des données à Prometheus. Ui, prom writer (Prometheus) et le Scientist utilisent le sous-réseau. Il est basé sur Tailscale, qui permet de construire un réseau maillé superposé entre tous vos appareils et de créer des connexions entre eux sur le réseau Tailnet.

**2e tentative** avec une **architecture monolithique** - projet appelé Paradise écrit en Go, connecté à Prometheus et Grafana pour lire les résultats.

Cependant, après avoir exécuté le projet pendant quelques heures, il génère du bruit qui renvoie des résultats au sol. Le redémarrage a fonctionné pendant quelques secondes, et l'adaptation du temps entre les mesures en fonction de la température de la puce n'a pas résolu le problème.

La **3e tentative** était une **refonte architecturale** avec Rust qui effectue les mesures et les écrit sur NATS, puis un service appelé Yellow articule les mesures vers le haut-parleur, met à jour l'interface utilisateur et envoie les données à Prometheus.

![](https://images.prismic.io/syntia/c894

13bf-f8f5-457d-84c6-9133454bb995_screenshot-2023-04-20-at-12.10.53.png?auto=compress,format)

![](https://images.prismic.io/syntia/7b90532a-efb5-4103-9692-3eed32674db2_screenshot-2023-04-20-at-12.36.12.png?auto=compress,format)

![](https://images.prismic.io/syntia/f6a24d7c-dd18-4951-9db9-7e1c00eda89c_screenshot-2023-04-20-at-12.40.17.png?auto=compress,format)

#### **Latence du Service**

Le matériel au sommet de la cage d'ascenseur comporte le haut-parleur Bluetooth mais se connecte avec un câble audio sans latence pour s'assurer que le temps entre le démarrage de l'ascenseur et la diffusion de la musique est court. La boîte matérielle est fixée avec des aimants à l'intérieur de l'ascenseur.

Pour se connecter au Raspberry Pi, **SSH dans le Raspberry Pi correct** pour l'accès distant. Le logiciel est construit avec un modèle web Go HTML et JavaScript, établissant la connexion websocket du serveur au client via un flux d'événements de message entrant.

L'inventeur Major General George Owen Squier, crédité de l'invention de la multiplexage de transport téléphonique en 1910, a développé la base technique initiale de **Muzak**, et plusieurs brevets américains dans les années 1920 liés à la transmission et à la distribution de signaux sur les lignes électriques.

Alors que Muzak avait initialement produit des dizaines de milliers d'enregistrements d'artistes originaux par les meilleurs interprètes de la fin des années 1930 et des années 1940, leur nouvelle stratégie nécessitait un son différent.

![](https://images.prismic.io/syntia/eebf8b9d-503b-4c32-b940-d50a751882ce_screenshot-2023-04-20-at-11.47.25.png?auto=compress,format)

![](https://images.prismic.io/syntia/76db2edb-8e45-43a0-a298-d1d49dc0b05a_screenshot-2023-04-20-at-12.08.17.png?auto=compress,format)

![](https://images.prismic.io/syntia/ba0ad0b4-bdd0-4336-8d41-f56996d9bfcc_screenshot-2023-04-20-at-12.36.54.png?auto=compress,format)

#### **Refonte Architecturale Logicielle :**

Décision concernant la détection à haut taux d'images - Capteur ultrasonique vs **LiDAR à portée unique** avec I2C et TF Luna ;

Résolution des connexions - Erreur SSH lors du test audio ;

Barrières matérielles - débranchement du Raspberry Pi du commutateur réseau ;

Avoir 2 copies du logiciel de mesure en cours d'exécution en même temps ;

Mauvaise soudure sur les connecteurs du TF Luna ;

Compilation croisée Rust et Go depuis un Mac M1 vers Linux Arm.

Référence au projet : [https://github.com/gnur/coldplay](https://github.com/gnur/coldplay)