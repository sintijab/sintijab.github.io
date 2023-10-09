---
description: "Observability Day et Cilium Con 2023"
pubDate: "Apr 18, 2023"
heroImage: "https://images.prismic.io/syntia/cdafc9ba-d983-4d3f-8515-541c229c5d98_aws-terraform-snyk-arch.png?auto=compress,format"
author: "Syntia"
categories: "ateliers, infrastructure cloud, sécurité, surveillance réseau HTTP"
subcategories: "cycle de développement logiciel, terraform, observabilité de l'infrastructure en tant que code, ombrelle d'observabilité"
---

# **Observabilité dans les environnements natifs du cloud**

Aujourd'hui, à l'Observability Day et au Cilium Con 2023, les ingénieurs qui dépendent d'un écosystème OSS sain partagent leurs idées sur l'orchestration dans les environnements natifs du cloud avec Cilium - gestion de cluster avec une architecture multi-locataire et une interface réseau élastique (Conception et sécurisation d'un environnement d'exécution multi-locataire par Ahmed Bebars, New York Times), la détermination d'un modèle de menace et de risques - systématiques (vs. ad hoc), distribution grande/petite, risques de données brutes (vs. données dérivées) - flux réseau avec émission automatisée et accès aux ressources des clients et protection (Bloomberg), conception réseau neutre vis-à-vis du fournisseur, facile à mettre à l'échelle, intégration avec les systèmes hérités et gestion de l'épuisement d'IPv4 (Karsten Nielsen, IKEA Private Cloud and Networking).

![](https://images.prismic.io/syntia/334ca43c-c494-4a5c-bddd-25e3990b340f_screenshot-2023-04-18-at-11.07.38.png?auto=compress,format)

![](https://images.prismic.io/syntia/94e43f94-d1b5-4847-bc79-8abef037363a_screenshot-2023-04-18-at-10.39.12.png?auto=compress,format)

![](https://images.prismic.io/syntia/0b73fbe3-33fb-4071-a186-7adadb141db3_screenshot-2023-04-18-at-10.31.08.png?auto=compress,format)

Conception et sécurisation d'un environnement d'exécution multi-locataire par Ahmed Bebars

En plus des autres composants de conception réseau - réseau entre hôtes via le démon de routage BGP sous-jacent BIRD, opérations distribuées sans point de défaillance unique évolutives avec le stockage en bloc Ceph, plateforme GitOps déclarative pour Kubernetes avec Argo CD.

La surveillance ne suffit pas, l'observabilité est nécessaire dans des environnements informatiques hétérogènes. La détection d'anomalies - identification anormale d'événements inattendus - à l'aide des journaux d'accès peut être formée de l'apprentissage non supervisé à l'apprentissage supervisé qui nécessite des étiquettes de la série temporelle d'entrée qui mesure l'exactitude des procédures par rapport à différents algorithmes. La détection d'anomalies peut améliorer l'observabilité dans les systèmes complexes.

#### **Outils d'observabilité pour la surveillance réseau HTTP**

Les outils d'observabilité pour la surveillance réseau HTTP sont Prometheus, la version la plus récente >2.40 apporte des histogrammes natifs [https://promcon.io/2022-munich/talks/promql-for-native-histograms/](https://promcon.io/2022-munich/talks/promql-for-native-histograms/), une utilisation efficace de la mémoire et des performances légères sur le passé [https://archive.fosdem.org/2020/schedule/event/histograms/](https://archive.fosdem.org/2020/schedule/event/histograms/).

Le protocole OpenTelemetry permet de traduire les collections de données (récepteurs, processeurs, exportateurs) en backend observable, de spécifier les points de données avec une temporalité des données, d'observer le temps dans une séquence intégrée avec des horodatages importants pour les points ultérieurs sur le taux initial - réinitialisations, lacunes et chevauchements. L'observation des données avec des histogrammes en utilisant les histogrammes exponentiels d'Open Telemetry dans Prometheus, l'API/SDK d'agrégation de métriques, le pont vers la télémétrie interne des exportateurs Prometheus, Elastic Common Schema (ECS), une spécification open source pour un format plus normalisé et structuré des journaux générés par les fournisseurs.

#### **Évolution et hybridation des types de signaux - un voyage des métriques/journaux aux traces aux profils**

La conférence CNCF TAG Observability sur "Évolution et hybridation des types de signaux - mon voyage des métriques/journaux aux traces aux profils" avec Liz-Fong Jones : [https://youtu.be/Ran6QogzxKA](https://youtu.be/Ran6QogzxKA), notes de réunion : [https://github.com/cncf/tag-observability](https://github.com/cncf/tag-observability)  
"J'ai fait mes preuves en essayant de résoudre des problèmes que nous ne considérerions pas nécessairement comme des problèmes d'ingénierie ou d'administration système. Aujourd'hui, l'identification des anomalies dans les journaux est incluse dans l'ombrelle d'observabilité plus large qui présente des similitudes dans les motifs causés par les utilisateurs, sans nécessairement avoir connaissance de ce qu'ils essaient de faire. La mise en place d'un tampon circulaire de journaux comme signal est désespérément nécessaire uniquement lorsque le système échoue - qu'en est-il des problèmes qui n'ont pas l'air d'une source de défaillance unique, ou des problèmes que nous ne savons pas comment filtrer ou regrouper."

L'Infrastructure as Code (IaC) permet aux équipes de définir leur infrastructure avec du code en utilisant un cycle de développement logiciel (SDLC) pour les phases de développement et la familiarité des dépôts Git, des demandes de tirage, des tests et du développement entre pairs, traitant l'infrastructure comme n'importe quel autre projet logiciel. Les outils open source HashiCorp pour l'infrastructure permettent aux organisations du monde entier de faire fonctionner cette infrastructure dans le cloud.  
Un accès aussi simple aux environnements cloud nécessite la mise en place de mesures de sécurité dans toute organisation pour concevoir une architecture cloud de manière sécurisée et éviter que des configurations incorrectes ne soient déployées.

#### **Dans l'atelier Snyk & HashiCorp : Sécurisation de votre infrastructure en tant que code**

Dans l'atelier Snyk & HashiCorp : Sécurisation de votre infrastructure en tant que code, nous obtenons le code et effectuons certaines opérations en ligne de commande avec Snyk pour trouver des configurations incorrectes dans vos définitions d'infrastructure en tant que code en clonant un référentiel avec des actifs d'infrastructure en tant que code mal configurés ; exécutez une analyse Snyk CLI et observez les résultats ; exploitez la vulnérabilité ; corrigez les problèmes localement et relancez les analyses ; envoyez les résultats au site Web de Snyk.

Snyk est l'une des principales plates-formes de sécurité pour les développeurs, qui s'intègre automatiquement dans le flux de travail d'un développeur et est conçue spécifiquement pour que les équipes de sécurité collaborent avec leurs équipes de développement.  
Une introduction à Snyk sur leur plate-forme et l'intégration d'outils de sécurité avec Terraform CLI, HashiCorp Terraform Cloud et Synk CLI est disponible en ligne pour une durée limitée : [https://snyk-hashicorp.awsworkshop.io/](https://snyk-hashicorp.awsworkshop.io/).

Dans cet atelier, vous apprendrez à :

*   configurer un compte AWS
    
*   assurez-vous de suivre les étapes restantes de l'atelier en tant qu'utilisateur IAM avec un accès administrateur au compte AWS : [Créez un nouvel utilisateur IAM à utiliser pour l'atelier](https://console.aws.amazon.com/iam/home?#/users$new)
    
*   configurer des clés d'accès AWS pour permettre à Terraform Cloud de déployer sur votre instance AWS
    
*   créer un espace de travail AWS pour vos opérations à l'aide d'un environnement de développement intégré basé sur le cloud (IDE) via la console AWS Cloud9 et attribuer un rôle IAM à votre instance Cloud9 pour accorder à votre instance EC2 l'autorisation de créer des ressources.
    
*   Configuration de Terraform CLI et stockage de l'état Terraform des infrastructures que votre pipeline va provisionner et déployer en utilisant Terraform
    
*   Configuration de la CLI Snyk pour collecter et envoyer des résultats concernant vos vulnérabilités.
    

![](https://images.prismic.io/syntia/cdafc9ba-d983-4d3f-8515-541c229c5d98_aws-terraform-snyk-arch.png?auto=compress,format)

Autres ressources Snyk :

*   [Annonce Snyk Terraform Cloud](https://snyk.io/blog/snyk-iac-security-terraform-cloud/)
    
*   [Blog Snyk : Évitez les mauvaises configurations cloud dans HashiCorp Terraform avec Snyk IaC](https://snyk.io/blog/prevent-cloud-misconfigurations-hashicorp-terraform-snyk-iac/)
    
*   [Synk & Docker Hub Container Image Library - minimisez les vulnérabilités dans les images Docker pour construire des applications sécurisées](https://snyk.io/advisor/docker)
    

Si vous êtes nouveau dans l'Infrastructure as Code, je vous recommande de commencer par le cours gratuit de Free Code Academy sur l'automatisation de l'infrastructure cloud avec l'outil déclaratif Terraform : [https://youtu.be/SLB\_c\_ayRMo](https://youtu.be/SLB_c_ayRMo).

#O11yDay
