---
description: "Zéro temps d'arrêt pendant le Black Friday"
pubDate: "Nov 24, 2023"
heroImage: "https://images.prismic.io/syntia/17db0669-0455-46aa-a91e-a309d3a75156_yoga-kubernetes.jpg?auto=compress,format"
author: "Syntia"
categories: "ateliers, infrastructure cloud, réseau, kubernetes"
subcategories: "protocoles de communication, protocole de contrôle de transmission, protocole Internet, couche réseau, interface réseau, réseau virtuel"
---

J'ai été inspiré pour documenter cet atelier par l'entrepreneure et maître de
yoga Karin Dimitrova, l'une des nombreuses propriétaires d'entreprise submergées
par les ventes du Black Friday et la nécessité de maintenir son entreprise tout
en observant le marché pris d'assaut.

Le Black Friday marque le début des soldes de magasinage des fêtes entre le 23
et le 29 novembre. Les clients ont dépensé un record de 9,12 milliards de
dollars lors du Black Friday de l'année dernière, soit une augmentation de 2,3%
par rapport à 2021.

Les prix plus élevés ont également entraîné un changement dans la manière dont
les consommateurs paient. Les commandes "Achetez maintenant, payez plus tard"
(BNPL) ont augmenté de 78% le Black Friday par rapport à la semaine précédente
(du 19 au 25 novembre), selon
[Adobe](https://www.digitalcommerce360.com/article/black-friday-ecommerce-sales/).

Avec l'attente d'avoir les revenus les plus importants pendant les ventes, le
zéro temps d'arrêt peut être accompli avec les déploiements Kubernetes.

Dans des situations où l'application est interrompue ou, dans le pire des cas,
subit une interruption, Kubernetes est responsable de la restauration des
applications conteneurisées avant tout impact visible sur l'expérience client.

La mise à l'échelle du service dans Kubernetes équilibre la charge du trafic
uniquement vers les instances disponibles (Pods) pendant les mises à jour et
joue un rôle crucial pour assurer la disponibilité de l'application.

Dans cette première partie de l'atelier, vous apprendrez à gérer les
déploiements d'applications avec Kubernetes et à configurer votre environnement
de test local.

## Qu'est-ce que Kubernetes?

Outil d'orchestration de conteneurs open source développé par Google. Il aide à
gérer les applications conteneurisées, par exemple les conteneurs Docker, dans
différents environnements tels que physiques, machines virtuelles, cloud et
environnements de déploiement hybrides.

### Quels problèmes résout Kubernetes?

L'outil d'orchestration de conteneurs - passage du monolithe aux microservices
qui a conduit au déploiement de petites applications indépendantes. Le besoin
d'un outil d'orchestration de conteneurs pour gérer des milliers de conteneurs
dans différents environnements. Quelles fonctionnalités offrent les outils
d'orchestration? Disponibilité élevée sans temps d'arrêt, évolutivité avec des
performances élevées, taux de réponse élevés, et un mécanisme de reprise après
sinistre - sauvegarde de l'état d'application le plus récent et restauration.

## Principaux composants de Kubernetes

Dans Kubernetes, un nœud ouvrier est un serveur, physique ou une machine
virtuelle. Le Pod est une abstraction du conteneur - une couche Kubernetes sur
le conteneur pour gérer l'exécution du conteneur. Un Pod est généralement
destiné à exécuter un seul conteneur d'application à l'intérieur, sauf s'il
s'agit d'un service auxiliaire ou secondaire s'exécutant dans le même pod.
Kubernetes offre un réseau virtuel où chaque Pod a une adresse IP interne
attribuée. Les Pods peuvent communiquer entre eux en utilisant leurs adresses
IP.

Dans l'exemple d'une application avec une base de données, le conteneur
d'application peut communiquer avec une base de données en utilisant l'adresse
IP des Pods. Les composants du Pod dans Kubernetes sont éphémères - ils peuvent
mourir fréquemment. Le conteneur de base de données peut être perdu, car une
application a planté dans le conteneur, ou parce que le serveur a manqué de
ressources, et le nouveau pod sera recréé à sa place avec une nouvelle adresse
IP attribuée.

Le Service est une adresse IP permanente avec un nom d'adresse DNS qui peut être
attaché à chaque pod. L'application et la base de données auront leur propre
service. La durée de vie du Pod et du Service n'est pas connectée, lorsque le
conteneur meurt, le point de terminaison du service reste le même. Le service
agit comme un équilibreur de charge - il intercepte les demandes et les transmet
au pod.

Pour que l'application soit accessible dans le navigateur, un service externe
est créé, qui ouvre la communication depuis des sources externes. Les services
internes sont créés pour les pods de la base de données afin de ne pas avoir un
accès public, et l'ingress qui est responsable du routage du trafic vers le
cluster Kubernetes et gère le domaine et le transfert de port vers l'adresse du
service externe.

Les Pods communiquent entre eux en utilisant des services, par exemple, une
application aura un point de terminaison appelé "mongo-db-service" pour
communiquer avec la base de données. Si le nom de l'application est différent,
l'URL devra être ajustée dans l'application - reconstruire, extraire et pousser
une nouvelle image vers le pod.

Configmap gère la configuration externe de votre application. Il contient des
données de configuration telles que les URL des bases de données ou d'autres
services. Dans Kubernetes, Configmap est connecté à un pod, et pour accéder aux
données de configuration, la reconstruction des images n'est pas nécessaire.

Une partie de la configuration externe de la base de données est le nom
d'utilisateur et le mot de passe, qui peuvent également changer dans le
processus de déploiement de l'application. Cependant, le placer dans le
configmap n'est pas sécurisé, et pour des informations secrètes telles que des
informations d'identification, Kubernetes dispose de Secrets.

Les Secrets sont des mots de passe, des certificats, des informations
d'identification et sont connectés au pod. Les secrets et le configmap sont
accessibles à l'application à partir d'un fichier externe ou de variables
d'environnement.

Pour le stockage des données, Kubernetes propose des Volumes. Sans volumes,
lorsque le conteneur de la base de données ou le pod est redémarré, les données
ne persisteraient pas. Les volumes attachent le stockage physique du disque dur
au pod. Ce stockage peut être sur la machine locale sur le nœud du serveur où
s'exécute le pod, ou sur le stockage distant, en deh

ors du cluster Kubernetes, par exemple, le stockage cloud ou sur site.

Le cluster Kubernetes ne gère aucune persistance des données. L'administrateur
Kubernetes est responsable de la sauvegarde, de la réplication et de la gestion
des données.

L'avantage des systèmes conteneurisés est la disponibilité du système avec la
réplication des pods. Si l'application meurt ou si le pod redémarre, Kubernetes
offre la réplication des nœuds de serveur où le clone de l'application
s'exécutera et sera connecté au service.

La création d'une deuxième réplique n'est pas effectuée avec la création du pod,
mais avec la configuration du modèle qui déclare les répliques. Dans Kubernetes,
les pods sont créés par des déploiements, qui sont une abstraction des pods.

Les pods de base de données ne peuvent pas être répliqués par des déploiements,
car la base de données a un état et ses propres données qui sont contrôlées par
les pods qui écrivent ou lisent les données. Ce mécanisme est offert par
Kubernetes avec un ensemble d'états pour des applications telles qu'Elastic,
MongoDB, MySQL. L'ensemble d'états se charge de la réplication des pods et de
leur mise à l'échelle de manière similaire aux déploiements.

Les applications de base de données sont souvent hébergées en dehors du cluster
K8s, ne conservant que des applications sans état qui communiquent avec des
bases de données externes.

## Architecture K8s

Kubernetes fonctionne avec deux types de nœuds - maître et esclave, avec des
rôles au sein d'un cluster.

### Processus du nœud ouvrier

La manière dont Kubernetes gère et met à l'échelle les pods se fait à travers
trois processus qui doivent être installés sur chaque nœud.

#### Configuration de base du nœud avec deux pods d'application en cours d'exécution

L'un des principaux composants de l'architecture Kubernetes est ses serveurs ou
nœuds ouvriers. Chaque nœud a plusieurs pods d'application avec des conteneurs
s'exécutant sur chaque nœud.

#### Runtime du conteneur

Le premier processus est le runtime du conteneur, par exemple Docker ou une
autre technologie, car les pods d'application s'exécutent dans un runtime de
conteneur. Le processus qui planifie les conteneurs est Kubelet. Kubelet
interagit avec le nœud et le runtime du conteneur tous deux. Il est responsable
de démarrer un pod avec le conteneur et d'attribuer des ressources du nœud au
conteneur. Le cluster Kubernetes est souvent constitué de plusieurs nœuds. La
communication entre eux fonctionne avec les Services - l'équilibreur de charge
intercepte les demandes d'un pod d'application ou d'une base de données et les
transmet à un autre pod. Le troisième processus responsable du transfert des
demandes des services vers les pods est Kube Proxy - il est installé sur chaque
nœud.

#### Kube Proxy

Kube Proxy veille également à ce que la communication fonctionne de manière
performante avec une faible surcharge réseau. Par exemple, si une application
fait une demande à la base de données, le service transmettra d'abord la demande
à la réplique qui s'exécute sur le même nœud que le pod qui a initié la demande.

#### Comment interagir avec le cluster?

Décidez-vous sur quel nœud le pod d'application ou le pod de base de données
sera planifié? Si une réplique de pod meurt, quel processus le surveille et la
reprogramme ou la redémarre ensuite? Si nous ajoutons un autre serveur, comment
se joint-il au cluster pour devenir un autre nœud avec les autres pods qui y
sont? Tous ces processus de gestion sont effectués par les nœuds maîtres. Quatre
processus s'exécutent sur chaque nœud maître. Les processus maîtres sont
cruciaux pour le fonctionnement du cluster.

### Processus du nœud maître

Le cluster Kubernetes est constitué de plusieurs maîtres, où chaque nœud maître
exécute ses processus maîtres, où le serveur API est équilibré et le magasin
etcd forme un stockage distribué sur tous les nœuds maîtres. Configuration de
base du cluster avec 2 nœuds maîtres et 3 nœuds ouvriers La puissance et les
ressources du cluster Kubernetes peuvent être facilement augmentées en fonction
de la complexité de la réplication et de l'augmentation de ses besoins en
ressources. Pour ajouter un nouveau serveur maître/nœud au cluster, les seules
exigences sont un nouveau serveur vierge avec les processus de nœud maître et
ouvrier installés.

#### Serveur API

Le premier service est le serveur API. Lorsque l'utilisateur souhaite déployer
une nouvelle application sur le cluster Kubernetes, il interagit avec le serveur
API à l'aide d'un client, par exemple Kubelet ou l'API Kubernetes. Le serveur
API est une passerelle de cluster qui reçoit les demandes initiales de toutes
les mises à jour dans le cluster ou des requêtes du cluster, et agit comme un
gardien de porte pour l'authentification afin de s'assurer que seules les
demandes autorisées ont un point d'entrée dans le cluster.

#### Ordonnanceur

L'ordonnanceur est le processus suivant après le validateur du serveur API qui
démarre le pod d'application sur l'un des nœuds ouvriers. Il dispose
d'informations sur les ressources du nœud ouvrier dont l'application aura
besoin, telles que la mémoire et le GPU, et en fonction de la disponibilité des
ressources, décide du nœud ouvrier sur lequel le prochain pod sera programmé. Le
processus qui démarre le pod est Kubelet, lorsqu'il reçoit la demande de
l'ordonnanceur.

#### Gestionnaire de contrôleurs

Le gestionnaire de contrôleurs détecte les changements d'état du cluster tels
que le crash de pods et tente de le récupérer le plus rapidement possible. Il
fait la demande à l'ordonnanceur pour replanifier les pods morts, et
l'ordonnanceur décide ensuite quels nœuds ouvriers devraient redémarrer les pods
et fait une demande à Kubelet.

#### Stockage Etcd

Etcd dans le cerveau du cluster est un magasin clé-valeur de l'état d'un
cluster. Chaque modification sur le cluster est mise à jour dans le magasin
clé-valeur. Il recueille toutes les informations sur les ressources disponibles
sur chaque nœud ouvrier, les changements d'état du cluster et la santé du
cluster. Les données d'application ne sont pas stockées dans etcd.

La convention de nommage d'Etcd provient de la structure de répertoire Linux :
sous UNIX, tous les fichiers de configuration système pour un seul système sont
contenus dans un dossier "/etc;" "d" signifiant "distribué."

# Minikube et Kubectl - Configuration locale

Dans une configuration de cluster de production, il est souvent nécessaire
d'avoir au moins deux nœuds maîtres et plusieurs nœuds ouvriers, ainsi que des
machines virtuelles ou physiques distinctes représentant chacune un nœud.

Pour tester Kubernetes dans un environnement local, par exemple, le déploiement
d'une nouvelle application, la configuration d'un cluster peut être impossible
en raison des fortes exigences en ressources.

### Minikube

L'outil open source Minikube fournit un cluster à un seul nœud où les processus
maître et ouvrier s'exécutent sur un nœud avec le runtime de conteneur Docker
préinstallé. Il s'exécute dans Virtual Box ou un autre hyperviseur pouvant être
utilisé pour tester Kubernetes en configuration locale.

### Kubectl

Kubectl est un outil en ligne de commande permettant d'interagir avec tout type
de cluster K8s, tel que Minikube ou un cluster cloud. Alors que Minikube exécute
à la fois les processus maître et ouvrier, l'API Server de l'un des processus
maîtres est le point d'entrée principal vers le cluster K8s. Il existe plusieurs
façons d'activer l'interaction avec le cluster : UI, API Kubernetes ou CLI, et
la CLI de kubectl est l'une des plus puissantes des 3 clients Kubernetes.

## Configuration locale

Installer un hyperviseur tel que VirtualBox
[https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)
ou hyperkit pour Mac
[https://minikube.sigs.k8s.io/docs/drivers/hyperkit/](https://minikube.sigs.k8s.io/docs/drivers/hyperkit/)
Installer Minikube (Mac, Linux et Windows)
[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
Installer Kubectl
[https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/)

### Démarrer Minikube

La commande suivante configure un cluster à un seul nœud "minikube" et un espace
de noms "par défaut" par défaut. Si vous utilisez un hyperviseur autre que
Virtual Box, sélectionnez une option de pilote différente :

```sh
minikube start –driver=virtualbox --no-vtx-check

# Tester les commandes :
minikube kubectl -- get pods -A
kubectl version --client --output=yaml
kubectl get pod
kubectl get services
kubectl get nodes
```

## Principales commandes Kubectl - CLI K8s

Trouver les commandes de création de ressources K8s disponibles :

```sh
kubectl create -h
```

### Créer un déploiement

Créer le déploiement k8s de nginx avec la commande suivante :

```sh
# kubectl create deployment NAME –image=image
kubectl create deployment nginx-depl --image=nginx
```

Le déploiement est un modèle pour créer des pods. La configuration la plus
basique pour le déploiement est le nom et l'image à utiliser, ainsi que les
valeurs par défaut de k8s, par exemple les répliques du pod : kubectl get
replicaset

### Abstraction d'une abstraction

Le déploiement gère le ReplicaSet. Le ReplicaSet gère les répliques du Pod, et
le Pod est une abstraction du Conteneur.

### Modifier le modèle de déploiement

Modifier la configuration du déploiement via la CLI de kubectl avec la commande
suivante :

```sh
# kubectl edit deployment NAME
kubectl edit deployment nginx-depl
```

Maintenant, vous pouvez modifier la configuration auto-générée avec les valeurs
par défaut. Pour l'exercice, modifiez la version de l'image nginx à la version
fixe. Les versions d'image sont disponibles sur Dockerhub. Sélectionnez la
version avec le moins de vulnérabilités. Modifiez le fichier et enregistrez-le
soit avec le mode de commande :wq, soit avec l'éditeur.
[https://hub.docker.com/\_/nginx/tags?page=1](https://hub.docker.com/_/nginx/tags?page=1)

Il ressemblera à cette configuration :

```yaml
# Veuillez éditer l'objet ci-dessous. Les lignes commençant par '#' seront ignorées,
# et un fichier vide interrompra l'édition. En cas d'erreur lors de l'enregistrement, ce fichier sera
# rouvert avec les échecs pertinents.
#
apiVersion: apps/v1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "1"
  creationTimestamp: "2023-11-24T22:04:14Z"
  generation: 1
  labels:
    app: nginx-depl
  name: nginx-depl
  namespace: default
  resourceVersion: "980"
  uid: 37234dfe-47a5-4d8c-903c-44a67b957149
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: nginx-depl
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: nginx-depl
    spec:
      containers:
      - image: nginx:1.25
        imagePullPolicy: Always
        name: nginx
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
status:
  availableReplicas: 1
  conditions:
  - lastTransitionTime: "2023-11-24T22:04:14Z"
    lastUpdateTime: "2023-11-24T22:06:46Z"
    message: Le ReplicaSet "nginx-depl-6777bffb6f" a progressé avec succès.
    reason: NewReplicaSetAvailable


    status: "True"
    type: Progressing
  - lastTransitionTime: "2023-11-24T22:11:27Z"
    lastUpdateTime: "2023-11-24T22:11:27Z"
    message: Le déploiement a une disponibilité minimale.
    reason: MinimumReplicasAvailable
    status: "True"
    type: Available
  observedGeneration: 1
  readyReplicas: 1
  replicas: 1
  updatedReplicas: 1
```

Exécutez kubectl get deployment pour voir le déploiement nouvellement créé,
celui qui est en cours d'exécution et l'ancien qui se termine.

```sh
kubectl get deployment
# nginx-depl-549d9fb597-95lsl   0/1     Pending   0          1m12s
# nginx-depl-6777bffb6f-6fc95   1/1     Running   0          5m
```

Vérifiez le nouveau pod et le replicaset créés :

```sh
kubectl get pod
# NAME                          READY   STATUS         RESTARTS      AGE
# nginx-depl-6777bffb6f-7hmls   1/1     Running        2 (75s ago)   6m

kubectl get replicaset
# NAME                    DESIRED   CURRENT   READY   AGE
# nginx-depl-549d9fb597   1         1         1       2m
# nginx-depl-6777bffb6f   0         0         0       6m
```

## Débogage des pods

La commande de journaux de Kubectl est utile pour voir ce qui se passe dans les
journaux de l'application qui s'exécute dans les pods :

```sh
# kubectl logs NOM_DU_POD
kubectl logs mongo-depl-558475c797-hz5ng
# Erreur du serveur (BadRequest) : le conteneur "mongo" dans le pod "mongo-depl-558475c797-hz5ng" attend de démarrer : ContainerCreating
```

Si le conteneur ne démarre pas, exécutez une autre commande describe pour
obtenir des informations plus détaillées sur le pod :

```sh
# kubectl describe pod NOM_DU_POD
kubectl describe pod nginx-depl-6777bffb6f-7hmls
```

Créez un autre déploiement avec MongoDB pour voir les journaux :

```sh
kubectl create deployment mongo-depl –image=mongo
kubectl describe pod mongo-depl-558475c797-jsh8g
```

Dans les événements, vous trouverez plus d'informations sur le planificateur
Kubernetes et vous aider à déboguer si l'application présente des problèmes :

```sh
Conditions :
  Type               Status
  Initialized        True
  Ready              False
  ContainersReady    False
  PodScheduled       True
Volumes :
  kube-api-access-vbplb :
    Type : Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds : 3607
    ConfigMapName : kube-root-ca.crt
    ConfigMapOptional : <nil>
    DownwardAPI : true
QoS Class : BestEffort
Node-Selectors : <none>
Tolérances : node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Événements :
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Scheduled  82s                default-scheduler  Successfully assigned default/mongo-depl-558475c797-hz5ng to minikube
  Normal   Pulled     45s                kubelet            Successfully pulled image "mongo" in 1.628s (34.613s including waiting)
  Normal   Pulled     43s                kubelet            Successfully pulled image "mongo" in 1.352s (1.352s including waiting)
  Normal   Pulled     28s                kubelet            Successfully pulled image "mongo" in 1.404s (1.404s including waiting)
  Normal   Created    28s (x3 over 45s)  kubelet            Created container mongo
  Normal   Started    28s (x3 over 44s)  kubelet            Started container mongo
  Avertissement BackOff   14s (x4 over 42s)  kubelet            Back-off restarting failed container mongo in pod mongo-depl-558475c797-hz5ng_default(bcb9b1e4-49eb-45d3-a501-3b743cc5efcb)
  Normal   Pulling    1s (x4 over 79s)   kubelet            Pulling image "mongo"
```

Une autre commande utile pour déboguer le pod consiste à inspecter le conteneur
en mode interactif CLI et à exécuter des commandes :

```sh
kubectl exec -it NOM_DU_POD – bin/bash
```

### Supprimer le déploiement

Supprimer le déploiement supprimera le pod ainsi que son ReplicaSet et la
configuration du pod :

```sh
kubectl get deployments
# NAME         READY   UP-TO-DATE   AVAILABLE   AGE
# mongo-depl   0/1     1            0           5m
# nginx-depl   1/1     1            1           6m

# kubectl delete deployment NAME
kubectl delete deployment mongo-depl
# deployment.apps "mongo-depl" deleted
```

## Fichiers de configuration Kubernetes

Étant donné qu'il existe de nombreuses options de configuration, les ajouter via
la CLI est impraticable. La configuration des composants Kubernetes peut être
gérée via des fichiers YAML Kubernetes et la commande apply. Apply crée et met à
jour la configuration Kubernetes.

```sh
kubectl apply -f nginx-deployment.yaml
```

La configuration de déploiement de base ressemblera à ceci :

```yaml
apiVersion: apps/v1
kind: Deployment # type de configuration
metadata:
  name: nginx-deployment # nom du déploiement utilisé pour le Service
  labels:
    app: nginx
spec: # spécification du déploiement
  replicas: 2
  selector:
    matchLabels:
      app: nginx # Le déploiement connecte toute la configuration avec une étiquette de nom d'application
  template:
    metadata:
      labels:
        app: nginx # Les pods accèdent à l'étiquette via le modèle
    spec: # spécification pour le pod
      containers:
      - name: nginx 
        image: nginx:1.25 
        ports:
        - containerPort: 8080
```

Chaque fichier de configuration Kubernetes a trois parties : les métadonnées du
composant tel que le nom de l'application. La spécification contient la
configuration du composant K8s. Le statut est généré automatiquement par
Kubernetes. Il comparera toujours l'état réel à l'état souhaité. Si les états de
l'application ne correspondent pas, il tentera de les corriger en fonction des
informations d'état d'etcd.

```sh
kubectl apply -f nginx-service.yaml
```

```yaml
apiVersion: v1 # Les versions d'API sont différentes pour chaque composant k8s
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx # Connecte l'étiquette du déploiement et ses pods
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

Le format des fichiers de configuration est YAML et suit des règles
d'indentation strictes, et il fait généralement partie de l'infrastructure en
tant que code ou des fichiers de déploiement d'un seul projet.

### Étiquettes et sélecteurs

La connexion entre les composants k8s est établie par les étiquettes et les
sélecteurs. Les métadonnées contiennent des étiquettes et la spécification
contient des sélecteurs. Dans la spécification du service, le sélecteur définit
une connexion entre le service, le déploiement et ses pods.

### Port du service

Chaque service a un port où le service est accessible. Si d'autres services, par
exemple un service de base de données, se connectent au service nginx, cela se
fera sur le port 80. Chaque service doit savoir vers quel pod il doit
transmettre la demande et à quel port le pod écoute.

### Appliquer les fichiers de configuration

```sh
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-service.yaml
```

#### Comment valider que le service a les bonnes informations sur les pods?

```sh
kubectl describe service nginx-service # Informations d'état et points de terminaison
```

Les points de terminaison contiennent les adresses IP et les ports des pods vers
lesquels le service doit transmettre la demande. Cela doit correspondre à la
colonne IP des pods.

```sh
kubectl get pod -o wide
```

Enfin, vérifiez l'état du déploiement en mettant à jour la configuration

```sh
kubectl get deployment nginx-deployment -o yaml
```

### Supprimer les fichiers de configuration

```sh
kubectl delete deployment -f nginx-deployment.yaml
```

Dans la deuxième partie de l'atelier, je vous montrerai pratiquement comment
déployer deux applications avec Kubernetes, où l'une sera un serveur
communiquant avec un autre pod pour accéder aux données de la base de données.
