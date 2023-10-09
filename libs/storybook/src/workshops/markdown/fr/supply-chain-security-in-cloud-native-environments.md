\---  
description: "KubeCon 2023 - Sécurité de la chaîne d'approvisionnement dans les environnements natifs du cloud"   
pubDate: "Apr 29, 2023"   
heroImage: "3999c33e-70ea-4679-a7f9-4a4e126b6fa4_196476203-3e288fa7-241e-4520-aacb-8ebb9a8e442e.webp?auto=compress,format"   
author: "Syntia"   
categories: "ateliers, infrastructure cloud, sécurité, chaîne d'approvisionnement"   
subcategories: "attestation logicielle, attestation de provenance, liste de matériel d'infrastructure, liste de matériel, niveaux de chaîne d'approvisionnement pour les artefacts logiciels, chaîne d'approvisionnement logicielle, sécurité de la couche de transport, couche sécurisée de sockets, chiffrement"   
\---

Dans le chapitre sur la sécurité de la chaîne d'approvisionnement de KubeCon 2023, Jeremy Rickard, Ido Neeman et Grace Nguyen ont expliqué pourquoi SBOM et IBOM sont tout aussi importants, étant donné que l'infrastructure native du cloud est finalement définie et pilotée par des logiciels, et comment SBOM peut être complet avec un inventaire complet de la pile d'infrastructure.

À partir de l'outillage et de la création de la liste de matériel logiciel et d'infrastructure, nous passerons en revue des exemples de création de la provision de la chaîne d'approvisionnement pour les environnements natifs du cloud.

### **L'objectif est d'établir une base et une familiarité avec la sécurité de la chaîne d'approvisionnement logicielle.**

"Afin de faciliter l'analyse des vulnérabilités, les fabricants devraient identifier et documenter les composants contenus dans les produits avec des éléments numériques, notamment en établissant une liste de matériel de sécurité."

_Proposition de règlement du Parlement européen et du Conseil sur les exigences horizontales en matière de cybersécurité pour les produits avec des éléments numériques et modifiant le règlement (UE) 2019/1020_

![](https://images.prismic.io/syntia/a0ebf46d-ffff-486e-b1b9-52be68b24306_196477253-7ede9ec5-a995-4e59-aab7-8acb35dc56cf.webp?auto=compress,format)

![](https://images.prismic.io/syntia/b0ee3537-2638-47d7-bcb2-429ad3af0092_196480219-ff3ed225-65f6-401e-a58a-f8b823e69475.webp?auto=compress,format)

**Graphique pour comprendre la composition des artefacts**

### **Sécurité du cadre**

**Attestation**: revendications signées (revendications sur la configuration du réseau, les dépendances, l'infrastructure)

**Provenance**: matériaux pour les artefacts et leur origine

**SBOM**: (liste de matériel logiciel) liste de matériel logiciel et à quoi ressemble le logiciel

**IMOB** (Infrastructure Bill of Materials) liste de matériel d'infrastructure et à quoi ressemble l'ensemble de l'infrastructure

#### **Cadre de sécurité SLSA pour protéger les logiciels et l'infrastructure construite :**

1. Documentation du processus de construction (provenance non signée)
2. Résistance à la manipulation du service de construction (source/hôte hébergé, provenance signée)
3. Résistance accrue aux menaces spécifiques (contrôles de sécurité sur l'hôte, provenance non falsifiable)
4. Plus hauts niveaux de confiance et de fiabilité (examen à deux parties + construction hermétique)

À partir de slsa.dev

On ne peut pas parler de la sécurisation de la chaîne d'approvisionnement sans comprendre le chiffrement

La signature numérique a à voir avec le chiffrement asymétrique, tandis que les connexions TLS ont un chiffrement symétrique.

Le processus de signature signée consiste à ce que le signataire chiffre les binaires avec une clé privée et transmet la signature avec le package et la signature de la clé publique pour le déchiffrement.

#### **Sigstore**

**cosign**: signez et vérifiez les artefacts logiciels - conteneurs, fichiers standard, blocs

**fulcio**: autorité de certification racine

**rekor**: journaux de transparence

Générez une paire de clés, signez avec une clé privée et vérifiez le package avec une clé publique signée :

_cosign generate-key-pair_

_cosign sign –key cosign.key goose/demo_

_cosign verify –key cosign.pub goose/demo_

Fulcio est une autorité de certification (CA) capable de créer des certificats de courte durée co-signés et basés sur :

- Requête de certificat
- Token d'ID OIDC (Gmail)
- Clé publique
- Défi

#### **Rekor**

Journal inviolable des métadonnées de la chaîne d'approvisionnement logicielle

Pour vérifier si ce package de Kubernetes 1.27.0 du registre est valide, exécutez :

_cosign verify \\_

_–certificate=identity=_[krel-trust@k8s-releng-prod.iam.gserviceaccount.com](mailto:krel-trust@k8s-releng-prod.iam.gserviceaccount.com) _\\_

_–certificate-oidc-issuer=_[https://accounts.google.com](https://accounts.google.com) _\\_

[registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _| jq ._

_Vérification pour le registre_ [registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _.._

**Les vérifications suivantes ont été effectuées sur chacune de ces signatures :**

- Les revendications de cosign ont été validées
- L'existence des revendications dans le journal de transparence a été vérifiée hors ligne
- Le certificat de signature de code a été vérifié à l'aide de certificats d'autorité de confiance

L'indice du journal indique si le certificat est valide ou non lorsque ce package a été signé

Crane est un outil pour interagir avec des images et des registres distants

_crane digest [registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _\# a du contenu_

_crane manifest_ [registry.k8s.io/kube-apiserver:sha256-89b8d9dbef2b905b7d028…](//registry.k8s.io/kube-apiserver:sha256-89b8d9dbef2b905b7d028%E2%80%A6)

Le hachage est un corps du package que cosign donne le certificat et la signature - il obtient la clé publique à partir du certificat, effectue le déchiffrement et le compare avec le manifeste, il enregistre les métadonnées pendant le processus :

_"dev.cosignproject.cosign/signature"_

[https://docs.sigstore.dev/cosign/verify/](https://docs.sigstore.dev/cosign/verify/)

En raison de cosign sigstore, l'optimisation est destinée au registre de conteneurs, l'adoption de logiciels open source pour la chaîne de sécurité est en tête.

Sigstore pour Python : [https://github.com/sigstore/sigstore-python](https://github.com/sigstore/sigstore-python)

Sigstore pour npm : [https://github.com/sigstore/sigstore-js](https://github.com/sigstore/sigstore-js) 

#### **In-toto**

In-toto est une politique de mise en page du processus de vérification en deux étapes :

- Enregistrez les étapes qui ont été effectuées, par qui et dans quel ordre dans la chaîne d'approvisionnement logicielle
- Vérifiez l'attestation et les autorisations de son créateur avec des fichiers de métadonnées de lien

##### **Les rôles du cadre de mise à jour (TUF)**

TUF est la dernière étape de la distribution d'un package. Il ne s'agit pas de _si_ mais de _quand_ votre package, votre clé ou votre référentiel seront compromis pour minimiser au maximum l'impact. Le modèle de menace est les **rôles** qui accordent des autorisations à :

- permission racine pour spécifier d'autres rôles
- cibles : indiquer la validité des packages
- snapshot : fournir les versions des packages
- timestamp : quand le package a été mis à jour pour comparaison avec sigstore

### **Idées fausses dans les logiciels open source :**

#### **Ce n'est qu'une question de code.**

Avec l'exemple de SolarWinds, où l'attaque a ciblé le processus jusqu'à ce que le consommateur reçoive le package. Plus de 18 000 clients avaient appliqué leur mise à jour de package, ce qui a ensuite permis au cheval de Troie à accès distant de contaminer tous leurs systèmes et réseaux clients.

#### **Nous ne sommes probablement pas une cible de choix.**

La chaîne d'approvisionnement de sécurité est pertinente non seulement en crypto.

#### **Nous ne pourrons probablement jamais éliminer les risques de la chaîne d'approvisionnement de nos logiciels - c'est un effort de l'ensemble de l'écosystème.**

C'est une responsabilité partagée et une conversation dont nous avons besoin dans la communauté - le fait que l'open source est souvent sous-financé et maintenu par des développeurs surchargés. Comment pouvons-nous offrir une gouvernance et un soutien pour aider à obtenir les ressources dont ils ont besoin ? Investir dans la sécurité de la chaîne d'approvisionnement SLSA.

### **Qu'est-ce qui vient ensuite ?**

1. Des progrès et de nouvelles normes sont en cours d'élaboration dès maintenant
2. D'autres composants : balayage des vulnérabilités, sécurisation des environnements de construction, patching des conteneurs.

![](https://images.prismic.io/syntia/7bb9c1f3-5f2b-4d33-9abc-d7605e836577_182689788-70acefc1-6d69-4972-abbf-3e60c0d4c014.webp?auto=compress,format)

Quelques exemples de questions fournies par GUAC : [https://github.com/guacsec/guac](https://github.com/guacsec/guac)

## **Vérification des chaînes à la porte : Élaboration de politiques de chaîne d'approvisionnement**

#### **Comment faisons-nous respecter les politiques et contrôlons ce qui se trouve dans notre cluster ?**

Si vous utilisez Kubernetes 1.26, les politiques d'admission sont un meilleur point de départ pour créer des politiques et les appliquer à votre cluster.

#### **Contrôleurs d'admission**

Les contrôleurs d'admission Kubernetes sont des plugins qui régissent et imposent la manière dont le cluster est utilisé. On peut les considérer comme des gardiens qui interceptent les demandes d'API (authentifiées) et peuvent modifier l'objet de la demande ou refuser la demande complètement. Le processus de contrôle d'admission comporte deux phases : la phase de _mutation_ est exécutée en premier, suivie de la phase de _validation_.

![](https://images.prismic.io/syntia/9c0c110c-59d4-4980-b0f5-111d8941c8d4_admission-controller-phases.webp?auto=compress,format)

### **Contrôleur de politique Sigstore**

Le contrôleur d'admission de la politique peut être utilisé pour imposer une politique sur un cluster Kubernetes en se basant sur les métadonnées de la chaîne d'approvisionnement vérifiable de cosign. Il résout également les balises d'image pour s'assurer que l'image en cours d'exécution n'est pas différente de celle qui a été admise.

Aujourd'hui, un contrôleur de politique peut automatiquement valider les signatures et les attestations des images de conteneur, ainsi que d'appliquer des politiques (à l'aide de cue ou rego ) contre les attestations. L'application est configurée par namespace, et prend en charge plusieurs politiques. Plus d'informations [https://docs.sigstore.dev/policy-controller/overview/](https://docs.sigstore.dev/policy-controller/overview/) 

### **Gatekeeper**

Gatekeeper est basé sur Open Policy Agent. Comparé à l'utilisation d'[OPA avec son kube-mgmt sidecar](https://www.openpolicyagent.org/docs/kubernetes-admission-control.html) (alias Gatekeeper v1.0), Gatekeeper introduit les fonctionnalités suivantes :

- Une bibliothèque de politique extensible et paramétrée
- CRD Kubernetes natifs pour instancier la bibliothèque de politique, alias "contraintes", et l'étendre avec des "modèles de contrainte". Il partage le schéma des libellés, y compris les cibles pour restreindre les libellés pour les métadonnées.
- CRD Kubernetes natifs pour [la mutation](https://open-policy-agent.github.io/gatekeeper/website/docs/mutation/) supportée
- Fonctionnalité d'audit
- Support des données externes

OCI 1.1 – “Artifacts” and Referrers API contains image index e.g. amd64 index artifacts and SBOM artifact. Its subject block signature refers back to the container.

Générer un SBOM avec deux signatures et inspecter le graphique des référents SBOM :

_crane ls_ [kubeconeu.azurecr.io/demo-app](//kubeconeu.azurecr.io/demo-app)

\# sha-d0992af7eb82…

\# sha256-8920357d77a1c..

\# sha256-8920357d77a1c…sig

\# image with two signatures, one is cosign the other is notation

_\# oras discover -o tree_ [kubeconeu.azure.io/demo-app@sha-d0992af7eb82…](mailto:kubeconeu.azure.io/demo-app@sha-d0992af7eb82%E2%80%A6)

# sbom artifact image referrers

#### Comment écrivons-nous des politiques pour ces artefacts ?

**Ratify** est un fournisseur externe pour Gatekeeper. Un moteur de vérification en tant qu'exécutable binaire et sur Kubernetes qui permet la vérification des métadonnées de sécurité des artefacts et n'autorise le déploiement que de ceux qui sont conformes aux politiques que vous créez avant de les déployer dans le cluster.

Il fonctionne également en tant que service HTTP. Les vérificateurs Cosign ont des signatures et des références de spécification OCI où le type de média du descripteur est le type d'artefact du référent du sujet. Exemple :

COSIGN\_EXPERIMENTAL=1 cosign verify [kubeconeu.azure.io/demo-app@sha-d0992af7eb82…](mailto:kubeconeu.azure.io/demo-app@sha-d0992af7eb82%E2%80%A6) _–certificate-identity_ [https://github.com/jeremyrickard/kubecon-eu-demo-app/blob/main/.github/workflows/slsa-goreleaser.yml@refs/tags/v0.0.0-alpha.0](https://github.com/jeremyrickard/kubecon-eu-demo-app/blob/main/.github/workflows/slsa-goreleaser.yml@refs/tags/v0.0.0-alpha.0) _–certificate-oidc-issuer_ [https://token.actions.githubusercontent.com](https://token.actions.githubusercontent.com) 

 # Vérifier avec Ratify

_~/.ratify.ratify verify -c cosign.js on -s_ [kubeconeu.azure.io/demo-app@sha-d0992af7eb82…](mailto:kubeconeu.azure.io/demo-app@sha-d0992af7eb82%E2%80%A6)

##### **Vérification de l'image avec Gatekeeper et Ratify**

Politique de données externes, appliquer des politiques aux pods pour s'assurer qu'ils ont des signatures associées :

# Exécuter une image non signée

_kubectl run demo –image=_[webbitnetworks.asurect.io/test/notary-image:unsigned](//webbitnetworks.asurect.io/test/notary-image:unsigned)

\# Erreur du serveur (interdite) : le crochet d'admission "validation.gatekeeper.sh" a refusé la demande  \[ratify-constraint\] L'objet a échoué à la vérification : [webbitnetworks.asurect.io/test/notary-image@sha256:17490f904cf27..](mailto:webbitnetworks.asurect.io/test/notary-image@sha256:17490f904cf27..)

# Exécuter une image signée

_kubectl run demo –image=_[kubeconeu.azurecr.io/demo-app:sha-d0992af7eb825e..](//kubeconeu.azurecr.io/demo-app:sha-d0992af7eb825e..)

\# pod/demo créé

_apiVersion: constraints.gatekeeper.sh/v1beta1_

_kind: ratifyVerification_

_metadata:_ 

    _Name: ratify-constraint_

_spec:_ 

    _enforcementAction: deny_

    _match:_ 

        _Kinds:_ 

            _– apiGroups: \[“”\]_

            _– kinds: \[“Pod”\]_

        _Namespaces: \[“default”\]_

##### **Bloquer les licences ou les packages que nous savons vulnérables**

###### **avec un plugin vérificateur personnalisé**

# package-verifier.yml

_apiVersion:_ [config.ratify.deislabs.io/v1beta1](//config.ratify.deislabs.io/v1beta1)

_kind: Verifier_

_metadata:_

    _name: package-checker_

_spec:_

    _name: kubecon-demo_

    _artifactTypes: application/spdx+json_

    _parameters:_

      _disAllowedLicenses:_

        _– AGPL-3.0-or-later_

      _disAllowedPackages:_

        _– name:_ [“github.com/mitchellh/mapstructure”](//%E2%80%9Cgithub.com/mitchellh/mapstructure%E2%80%9D)

          _version: “v1.5.0”_

    _source:_

      _artifact:_ [kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0](//kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0) 

# build and publish plugin to ACR instance and register in cluster

\# the plugin consist of program written in Go that runs verifier instance accepts interface parameters for disallowed licenses and packages, that runs in a loop identifying disallowed versions, generates error message and sends it back

# build our darwin binary which uses Go on a Linux machine

_CGO\_ENABLED=0 GOOS=linux go build -o bin/package-checker ._

# run with oras similar to docker push

_oras push_ [kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0](//kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0)  _./package-checker_

_oras discover_ [kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0](//kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0) 

_oras pull_ [kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0](//kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0) 

# Crée un vérificateur k8s dans le cluster

_kubectl get pods_

\# ratify-8f8cdcfd9-sn4qc

_kubectl logs -f

 ratify-8f8cdcfd9-sn4qc_

_kubectl apply -f package-verifyer.yml_

# Résout le manifeste du plugin et télécharge le plugin

_kubectl get verifiers_

# télécharge le plugin et vérifie la conformité dans le cluster

_kubectl run demo –image=_ [kubeconeu.azure.io/demo-app:sha-d0992af7eb82…](//kubeconeu.azure.io/demo-app:sha-d0992af7eb82%E2%80%A6)

### **Matériaux de soutien**

[https://open-policy-agent.github.io/gatekeeper/website/docs/howto](https://open-policy-agent.github.io/gatekeeper/website/docs/howto)

[https://open-policy-agent.github.io/gatekeeper/website/docs/next/externaldata](https://open-policy-agent.github.io/gatekeeper/website/docs/next/externaldata)

[https://github.com/opencontainers/image-spec/blob/main/manifest.md](https://github.com/opencontainers/image-spec/blob/main/manifest.md)

[https://github.com/deislabs/ratify/blob/main/docs/reference/dynamic-plugins.md](https://github.com/deislabs/ratify/blob/main/docs/reference/dynamic-plugins.md)

[https://zotregistry.io](https://zotregistry.io)

[https://github.com/opencontainers/image-spec/pull/1049](https://github.com/opencontainers/image-spec/pull/1049)

[https://oras.land](https://oras.land/)

[https://github.com/jeremyrickard/ratify-package-checker](https://github.com/jeremyrickard/ratify-package-checker)

## **À propos du graphique de dépendance et des exports SBOM dans GitHub**

Le graphique de dépendance est un résumé des fichiers de manifeste et de verrouillage stockés dans un dépôt et des dépendances soumises pour le dépôt à l'aide de l'API de soumission des dépendances (bêta). [https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/exporting-a-software-bill-of-materials-for-your-repository](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/exporting-a-software-bill-of-materials-for-your-repository) 

Pour chaque dépôt, il montre :

*   Les dépendances, les écosystèmes et les packages sur lesquels elles dépendent
    
*   Les dépendants, les dépôts et les packages qui en dépendent
    
*   Pour chaque dépendance, vous pouvez voir les informations sur la licence et la gravité des vulnérabilités. Vous pouvez également rechercher une dépendance spécifique à l'aide de la barre de recherche. Les dépendances sont automatiquement triées par gravité des vulnérabilités.
    

Vous pouvez exporter l'état actuel du graphique de dépendance pour votre dépôt sous forme de modèle de liste de matériaux logiciels (SBOM) en utilisant le format SPDX standard de l'industrie.

Un SBOM est un inventaire formel et lisible par machine des dépendances d'un projet et des informations associées (telles que les versions, les identifiants de package et les licences). Les SBOM aident à réduire les risques de la chaîne d'approvisionnement en :

*   fournissant de la transparence sur les dépendances utilisées par votre dépôt
    
*   permettant d'identifier tôt les vulnérabilités dans le processus
    
*   fournissant des informations sur la conformité des licences, la sécurité ou les problèmes de qualité qui peuvent exister dans votre code source
    
*   vous permettant de mieux respecter diverses normes de protection des données
    

Si votre entreprise fournit des logiciels au gouvernement fédéral américain conformément à l'ordonnance exécutive 14028, vous devrez fournir un SBOM pour votre produit. Vous pouvez également utiliser des SBOM dans le cadre de votre processus d'audit et les utiliser pour respecter les exigences réglementaires et légales.

## **GUAC : Graph for Understanding Artifact Composition**

En explorant les conteneurs Kubernetes, nous pouvons trouver quelles métadonnées/attestations y sont connectées.

En cherchant les conteneurs kube-controller-manager pour v1.24.6, nous pouvons trouver quelles sont les binaires et leurs métadonnées.

Dans cet exemple de représentation visuelle GUAC avec sous-graphique, nous pouvons observer ce qui suit :

*   Nous pouvons voir que le package du conteneur Kubernetes (rouge) a deux binaires /go-runner et /usr/local/bin/kube-controller-manager.
    
*   Nous pouvons voir que nous avons une attestation SLSA (orange) pour le binaire kube, mais aucune attestation pour le /go-runner.
    
*   Nous remarquons également qu'il y a des métadonnées de scorecards pour le binaire kube, qui ont été déduites en comprenant que le binaire kube a été construit à partir du référentiel/source kubernetes (via SLSA), qui a des informations de scorecards.
    
*   Nous pouvons voir les informations de scorecards dans le panneau de droite.
    

Référence : [https://github.com/guacsec/guac/blob/main/SETUP.md](https://github.com/guacsec/guac/blob/main/SETUP.md) 

![](https://images.prismic.io/syntia/dbaab748-24b1-4274-a5be-b6c44455d997_182689908-477f4770-1142-4c18-8fa9-16d93dcf84b4.webp?auto=compress,format)

## **Attestation avec TACOS**

Le **framework TACOS** est conçu pour fonctionner en harmonie avec SLSA (Supply chain Levels for Software Artifacts) et GUAC (Graph for Understanding Artifact Composition) dans cette phase de conception précoce et à l'avenir. Le framework SLSA fournit une manière normalisée de garantir la provenance des artefacts.

Une attestation TACOS est une structure de données simple qui contient les métadonnées de l'attestation et les déclarations attestant des pratiques de développement de logiciels sécurisées des packages open source.

**L'attestation** est le conteneur de document avec les métadonnées sur la création de l'attestation et les déclarations sur les bibliothèques open source amont utilisées par une application ou une organisation. Il s'agit d'une assertion sur l'état d'un ensemble de pratiques de développement sécurisé à un moment donné.

Exemple avec un package Lifted (un package pour lequel un mainteneur s'est associé à Tidelift) [https://github.com/tacosframework/examples](https://github.com/tacosframework/examples)

```markup
{
  "@context": "domain/namespace",
  "@id": "document URL",
  "signature": {"type": "sha256", "digest": "78ab8..."},
  "author": "Firstname Lastname",
  "role": "Attestor",
  "timestamp": "2022-03-23T05:35.37:00+04:00",
  "TACOSversion": "1",
  "application": "HelloWorld",
  "statements": [
    {
      "PackageName": "com.fasterxml.jackson.core:jackson-databind",
        "PackagePlatform": "maven",
        "PURL": "pkg:maven/com.fasterxml.jackson.core/jackson-databind",
      "UpstreamRepositoryURL": "https://github.com/FasterXML/jackson",
      "SPDXLicenseLatestRelease": "Apache-2.0", 
      "LatestRelease": "2.14.2",
      "ReleasesInUse": ["2.14.2, 2.14.0, 2.9.8"],
      "SBOM": [
      {
            "type": "cycloneDX",
            "version": "1.2",
            "format": "XML",
            "DigitalSignatureURL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-cycloneDX.xml.sig",
            "URL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-cycloneDX.xml"
    },
    {
            "type": "SPDX",
            "version": "2.3",
            "format": "SPDX",
            "DigitalSignatureURL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-SPDX.spdx.sig",
            "URL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-SPDX.spdx"
      }
      ],
     "PackageManager2FAEnabled": "True",
     "SourceRepo2FAEnabled": "True",
     "KnownReleasesURL":  "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind/releases-map",
      ... and so on ...    
    }
  ]
}

```

## **Analyse des vulnérabilités avec DaggerBoard**

**DaggerBoard** est un outil d'analyse des vulnérabilités qui ingère des fichiers de liste de matériaux logiciels (SBOM) au format CycloneDX, SPDX, et produit des résultats sous une forme lisible. Cet outil évalue les dépendances logicielles décrites dans le fichier SBOM pour détecter les vulnérabilités des packages.

![https://github.com/nyph-infosec/daggerboard](https://images.prismic.io/syntia/26901cca-cc7b-4367-ae6d-47d2d719c998_readme_db_diagram.webp?auto=compress,format)

[https://github.com/nyph-infosec/daggerboard](https://github.com/nyph-infosec/daggerboard)

## **Inspection des packages logiciels avec TERN**

**Tern** est un outil d'inspection des packages logiciels qui peut créer une liste de matériaux logiciels (SBOM) pour les conteneurs. Tern est un outil d'inspection permettant de trouver les métadonnées des packages installés dans une image de conteneur. Le fonctionnement global est le suivant :

*   Il analyse la première couche de l'image de conteneur pour collecter des informations telles que le type de distribution, le format des packages et les gestionnaires de packages.
    
*   Ensuite, il exécute des scripts de la "bibliothèque de commandes" dans un environnement chroot pour collecter des informations sur les packages installés dans cette couche.
    
*   Avec ces informations comme point de départ, il continue à analyser les couches suivantes de l'image de conteneur.
    
*   Une fois terminé, il génère un rapport sur les packages avec leurs métadonnées. Plusieurs formats sont disponibles. Le rapport, dans son format par défaut, fournit une explication couche par couche des différents composants logiciels importés. Si un Dockerfile est fourni, le rapport indique les lignes du Dockerfile correspondant à chacune des couches du système de fichiers.
    
*   Tern vous offre une meilleure compréhension de la liste des matériaux de votre conteneur, ce qui vous permet de prendre de meilleures décisions concernant votre infrastructure basée sur des conteneurs, vos stratégies d'intégration et de déploiement. C'est également un bon outil si vous êtes curieux au sujet du contenu des images de conteneur que vous avez construites.