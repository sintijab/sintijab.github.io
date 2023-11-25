---
description: "Zéro temps d'arrêt pendant le Black Friday"
pubDate: "Nov 24, 2023"
heroImage: "https://images.prismic.io/syntia/04f6f440-e277-45f8-8772-5f908a3e5e0a_Screenshot+2023-11-25+at+18.03.59.png?auto=compress,format](https://images.prismic.io/syntia/04f6f440-e277-45f8-8772-5f908a3e5e0a_Screenshot+2023-11-25+at+18.03.59.png?auto=compress,format"
author: "Syntia"
categories: "ateliers, infrastructure cloud, réseau, kubernetes"
subcategories: "protocoles de communication, protocole de contrôle de transmission, protocole Internet, couche réseau, interface réseau, réseau virtuel"
---

# Kubernetes 101 - Configuration d'application k8s

Dans cet atelier, nous allons apprendre comment déployer MongoDB et mongo-express. Cela peut être appliqué à n'importe quelle autre configuration pour la création d'applications Kubernetes Stateless. Nous allons suivre les étapes suivantes :

1. Créer un pod MongoDB avec un déploiement Kubernetes.
   
2. Créer un service interne. Le service interne limite l'accès au pod aux seules requêtes internes autorisées, seuls les pods du même cluster peuvent y accéder.
   
3. Créer un déploiement Mongo Express. Mongo Express se connectera à la base de données via une URL et des informations d'identification (nom d'utilisateur et mot de passe de la base de données). Il sera accessible via des variables d'environnement dans la configuration du déploiement.
   
4. Créer un ConfigMap qui contiendra l'URL de la base de données et un Secret pour les informations d'identification, avec des références depuis le déploiement.
   
5. Le service externe permettra aux requêtes externes de communiquer avec le pod. L'URL contiendra le protocole http, l'adresse IP du nœud et le port du service externe.

## La communication à travers les composants k8s

La demande commencera depuis le navigateur vers le service externe de Mongo Express, qui la transmettra au pod Mongo Express. Le pod se connectera au service interne MongoDB via l'URL de la base de données et s'authentifiera auprès de MongoDB avec les informations d'identification de la base de données.

### Schéma d'architecture Kubernetes
![](https://images.prismic.io/syntia/e1d6a504-2124-4922-ac8c-361974be8f0e_default.png?auto=compress,format)

### Liste des composants Kubernetes créés

Après avoir supprimé le déploiement et le service du premier atelier, le cluster est vide.

```sh

kubectl get all

# NOM                  TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE

# service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   30m

```

Après la création du déploiement et du service pour une application, vous verrez les composants k8s suivants :

```sh

kubectl get all | grep mongodb # filtrez par le nom de votre application

# pod/mongodb-deployment-7bd745589d-pt2kl   1/1     Running   0          70m

# service/mongodb-service   ClusterIP   10.102.163.220   <none>        27017/TCP   15m

# deployment.apps/mongodb-deployment   1/1     1            1           70m

# replicaset.apps/mongodb-deployment-7bd745589d   1         1         1       70m

```

## Créer un déploiement/pod MongoDB

Créez un fichier de déploiement soit avec un éditeur soit en ligne de commande.

```sh

kubectl create deployment mongodb-deployment –image=mongo

```

Maintenant, modifiez le déploiement et supprimez la configuration par défaut :

```sh

kubectl edit deployment mongodb-deployment

```

Avec l'éditeur interactif vim, supprimez les lignes multiples avec les commandes suivantes :

```sh

# syntaxe :\[début\],\[fin\]d

:.,$d # toutes les lignes après le curseur

:.,1d # toutes les lignes au-dessus du curseur

:3,10d # supprimer les lignes entre 3 et 10

```

Le déploiement devrait ressembler à ceci :

```yaml

apiVersion: apps/v1

kind: Deployment

metadata:

  labels:

    app: mongodb-deployment

  name: mongodb-deployment

spec:

  replicas: 1

  selector:

    matchLabels:

      app: mongodb-deployment

  template:

    metadata:

      creationTimestamp: null

      labels:

        app: mongodb-deployment

    spec: # Pods que le déploiement créera

      containers:

      - image: mongo

        name: mongodb

```

### Se connecter à MongoDB depuis un autre conteneur Docker

Configuration de l'image pour MongoDB [https://hub.docker.com/\_/mongo](https://hub.docker.com/_/mongo) 

Le serveur MongoDB dans l'image écoute sur le port standard de MongoDB, 27017

#### Variables d'environnement

Les informations sur les variables d'environnement et le port dans la configuration de l'image sont sur Docker Hub. 

Pour l'authentification de la base de données, nous allons utiliser deux variables d'environnement :

MONGO\_INITDB\_ROOT\_USERNAME, MONGO\_INITDB\_ROOT\_PASSWORD

Ajoutons-les à la configuration du déploiement :

```yaml

   template:

    metadata:

      labels:

        app: mongodb-deployment

    spec:

      containers:

      - image: mongo

        name: mongodb

        ports:

        - containerPort: 27017

        env:

        - name: MONGO\_INITDB\_ROOT\_USERNAME

          value: 

        - name: MONGO\_INITDB\_ROOT\_PASSWORD

          value:

```

Nous allons créer les secrets k8s où ces valeurs d'environnement seront référencées, afin que personne n'y ait accès depuis le dépôt de code.

### Créer un secret Kubernetes

Si vous utilisez VSCode pour la création des fichiers de configuration K8s, l'autocomplétion des fichiers YAML via le schéma JSON Kubernetes ressemblera à ceci :

```yaml

# secret.yaml

apiVersion: v1

kind: Secret

metadata:

  name: mysecret

type: Opaque # type de secret clé-valeur, d'autres sont pour les secrets pour les certificats TLS et d'autres types

data:

  password: <Mot de passe>

```

Corrigez le nom et les données du secret. Gardez à l'esprit que les valeurs des secrets ne sont pas en texte brut mais des valeurs encodées en base64.

Stocker les données dans le composant Secret ne les rend pas automatiquement sécurisées.

Il existe des mécanismes intégrés tels que le chiffrement pour une sécurité de base, qui ne sont pas activés par défaut.

```sh

echo -n 'utilisateur' | base64 # crypter la valeur

```

Copiez-collez-la dans les valeurs de données du Secret :

```yaml

apiVersion: v1

kind: Secret

metadata:

  name: mongodb-secret

type: Opaque

data:

  mongo-root-username: dXNlcg==

  mongo-root-password: cGFzc3c

=

  mongo-basic-username: dXNlcg==

  mongo-basic-password: cGFzc3c=

```

Le Secret doit être créé avant de créer un déploiement dans Kubernetes afin d'utiliser les valeurs du Secret.

```sh

kubectl apply -f mongo-secret.yaml

kubectl get secret

# NOM                TYPE      DATA   AGE

# mongodb-secret   Opaque   2      24s

```

### Créer un déploiement

Maintenant, vous pouvez modifier la configuration du déploiement pour utiliser le nouveau secret.

```yaml

 template:

    metadata:

      labels:

        app: mongodb-deployment

    spec:

      containers:

      - image: mongo

        name: mongodb

        ports:

        - containerPort: 27017

        env:

        - name: MONGO\_INITDB\_ROOT\_USERNAME

          valueFrom: # référence aux valeurs du secret

           secretKeyRef:

            name: mongodb-secret

            key: mongo-root-username

        - name: MONGO\_INITDB\_ROOT\_PASSWORD

          valueFrom:  # référence aux valeurs du secret

           secretKeyRef:

            name: mongodb-secret

            key: mongo-root-password

       - name: ME\_CONFIG\_BASICAUTH\_USERNAME

          valueFrom:

              secretKeyRef:

                name: mongodb-secret

                key: mongo-basic-username

        - name: ME\_CONFIG\_BASICAUTH\_PASSWORD

          valueFrom:

              secretKeyRef:

                name: mongodb-secret

                key: mongo-basic-password

```

Créez le déploiement avec cette configuration :

```sh

kubectl apply -f mongo-deployment.yaml

kubectl get all

NOM                                      PRÊT   ETAT       REDEMARRAGES  AGE

pod/mongodb-deployment-7bd745589d-pt2kl   1/1     Running   0          81s

  

NOM                TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)    AGE

service/kubernetes   ClusterIP    10.96.0.1        <none>        443/TCP    3h40m

  

NOM                                            PRÊT   ACTUEL    DISPONIBLE    AGE

deployment.apps/mongodb-deployment   1/1      1        1            82s

  

NOM                                              DESIRE     ACTUEL     PRÊT    AGE

replicaset.apps/mongodb-deployment-7bd745589d   1         1         1       81s

  

```

Maintenant, vous devriez voir le pod, le déploiement et le jeu de répliques créés.

#### Débogage

Si la création du conteneur est lente et que `kubectl get pod` donne l'état ContainerCreating, vous pouvez suivre la progression avec la commande `kubectl get pod --watch` ou vérifier s'il y a un problème avec la commande `kubectl describe pod NOM_DU_POD`.

```sh

kubectl get pod

# NOM                                      PRÊT   ETAT       REDEMARRAGES  AGE

# mongodb-deployment-7bd745589d-pt2kl   1/1     Running   0          2m13s

```

### Types de services Kubernetes

```sh

kubectl create service --help

# Alias:

# service, svc

  

# Commandes disponibles:

# clusterip      Créez un service ClusterIP

# externalname   Créez un service ExternalName

# loadbalancer   Créez un service LoadBalancer

# nodeport       Créez un service NodePort

  

# Utilisation:

#   kubectl create service \[flags\] \[options\]

  

```

#### ClusterIP

ClusterIP est le type de service par défaut. Kubernetes attribuera une adresse IP interne au cluster au service ClusterIP. Cela rend le service accessible uniquement à l'intérieur du cluster, et aucune autre demande vers les pods de service n'est autorisée depuis l'extérieur du cluster. Vous pouvez éventuellement définir une adresse IP de cluster dans le fichier de définition du service.

Le service ClusterIP est le type de service le plus courant pour la communication entre les applications frontend et backend ou, par exemple, lorsqu'un microservice traite des données et les envoie à un autre microservice, un service ClusterIP est nécessaire pour restreindre la communication.

```yaml

apiVersion: v1

kind: Service

metadata:

  name: my-backend-service

spec:

  type: ClusterIP # Champ facultatif (par défaut), les autres options sont NodePort ou LoadBalancer

  clusterIP: 10.10.0.1 # plage d'adresses IP du cluster de service

  ports:

  - name: http

    protocol: TCP

    port: 80

    targetPort: 8080

```

#### NodePort

Le service NodePort est une extension des services ClusterIP permettant une connectivité externe à l'application Kubernetes. Avec NodePort, Kubernetes utilise un port désigné qui redirige le trafic vers le service ClusterIP correspondant s'exécutant sur le nœud. 

  

Ces services permettent la communication depuis l'extérieur du cluster, comme les applications web ou les API. Pour rendre le port du nœud disponible, Kubernetes configure une adresse IP de cluster, la même que si vous aviez demandé un service de type : ClusterIP, l'adresse IP du nœud et le numéro de port attribué au service. Le numéro de port Kubernetes est prédéfini, il est personnalisé ou dans la plage de 30000 à 32767.

#### LoadBalancer

Les services LoadBalancer sont destinés aux applications qui doivent traiter des volumes élevés de trafic, comme les applications web ou les API. Il expose le service de manière externe à l'aide d'un équilibreur de charge externe. Kubernetes n'offre pas directement de composant d'équilibrage de charge ; vous devez en fournir un, ou vous pouvez intégrer votre cluster Kubernetes à un fournisseur de cloud.

Plus d'informations sur les services : [https://kubernetes.io/docs/concepts/services-networking/service/](https://kubernetes.io/docs/concepts/services-networking/service/) 

  
### Créer un Service interne

Pour ajouter un Service, créez un nouveau fichier yaml ou incluez-le dans la configuration des Déploiements. En yaml, il est possible d'inclure plusieurs documents dans un fichier avec un séparateur de trois tirets.

```yaml
# mongo-deployment.yaml EOF
---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
    - protocol: TCP
      port: 27017 # Port du Service
      targetPort: 27017 # Port du Pod ou du conteneur
```

Appliquez maintenant les changements aux déploiements et au service:

```sh
kubectl apply -f mongo-deployment.yaml
service/mongodb-service créé
```

Si vous essayez d'appliquer le nouveau Service au Pod et décidez de changer le nom de l'Application après la création du Déploiement, l'étiquetage échouera avec des erreurs d'état immuable, telles que:

```sh
Le Déploiement "mongodb-deployment" n'est pas valide: spec.selector: Valeur non valide: v1.LabelSelector{MatchLabels:map[string]string{"app":"mongodb"}, MatchExpressions:[]v1.LabelSelectorRequirement(nil)}: le champ est immuable
```

Vérifiez maintenant le service ClusterIP nouvellement créé avec la commande:

```sh
kubectl get service
# NAME               TYPE         CLUSTER-IP       EXTERNAL-IP   PORT(S)     AGE
# kubernetes         ClusterIP    10.96.0.1        <none>        443/TCP     4h38m
# mongodb-service    ClusterIP    10.102.163.220   <none>        27017/TCP   4m49s
```

Obtenez plus d'informations sur le service:

```sh
kubectl describe service mongodb-service
# Nom:               mongodb-service
# Espace de noms:   default
# Étiquettes:        <aucun>
# Annotations:       <aucune>
# Sélecteur:         app=mongodb-deployment
# Type:              ClusterIP
# Politique de famille IP:   SingleStack
# Familles IP:       IPv4
# IP:                10.102.163.220
# IPs:               10.102.163.220
# Port:              <unset>  27017/TCP
# TargetPort:        27017/TCP
# Points de terminaison:     10.244.0.6:27017
# Affinité de session:      Aucun
# Événements:        <aucun>
```

Le point de terminaison est l'adresse IP d'un Pod et le port où l'Application dans le Pod écoute. Vérifiez si le Service est attaché au bon Pod en recherchant l'adresse IP d'un Pod:

```sh
kubectl get pod -o wide
# NOM                         PRÊT   STATUT    REDÉMARRAGES   ÂGE   IP            NODE      NOMINATED NODE   READINESS GATES
# mongodb-deployment-7bd745589d-pt2kl   1/1     Running   0         65m   10.244.0.6    minikube   <aucun>          <aucun>
```

## Créer un Déploiement/Pod Mongo Express

La configuration du Déploiement sera similaire à celle de MongoDB:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    app: mongo-express
  name: mongo-express
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mongo-express
  template:
    metadata:
      labels:
        app: mongo-express
    spec:
      containers:
        - image: mongo
          name: mongo-express
```

Informations sur l'image concernant le port et les variables d'environnement: [https://hub.docker.com/_/mongo-express](https://hub.docker.com/_/mongo-express)

L'Application Mongo Express à l'intérieur du conteneur démarre avec le port 8081. Dans Mongo Express, nous devons définir les variables d'environnement:

* pour quelle base de données l'application se connectera, quelle est l'adresse MongoDB / Service interne - du hub Docker, trouvez la variable d'environnement ME_CONFIG_MONGODB_SERVER référencée depuis la configMap
* les informations d'identification pour authentifier la connexion, qui sont ME_CONFIG_MONGODB_ADMINUSERNAME et ME_CONFIG_MONGODB_ADMINPASSWORD référencées depuis les Secrets

### Créer la ConfigMap

Étant donné que nous avons besoin de la ConfigMap pour référencer l'URL vers le service interne MongoDB, elle doit être créée avant de créer un Déploiement Mongo Express.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service # Nom du service
```

Appliquez la ConfigMap à l'état k8s:

```sh
kubectl apply -f mongo-configmap.yaml
```

La ConfigMap sera référencée aux variables d'environnement du Déploiement, de manière similaire aux Secrets:

```yaml
template:
  metadata:
    labels:
      app: mongo-express
  spec:
    containers:
      - image: mongo
        name: mongo-express
        ports:
          - containerPort: 8081
        env:
          - name: ME_CONFIG_MONGODB_ADMINUSERNAME
            valueFrom:
              secretKeyRef:
                name: mongodb-secret
                key: mongo-root-username
          - name: ME_CONFIG_MONGODB_ADMINPASSWORD
            valueFrom:
              secretKeyRef:
                name: mongodb-secret
                key: mongo-root-password
          - name: ME_CONFIG_MONGODB_SERVER
            valueFrom:
              configMapKeyRef:
                name: mongodb-configmap
                key: database_url
```

### Créer le Pod pour Mongo Express

```sh
kubectl apply -f mongo-express.yaml
# deployment.apps/mongo-express créé
kubectl get pod
# NOM                               PRÊT   STATUT   REDÉMARRAGES   ÂGE
# mongo-express-cbc554bd4-86h75      1/1     Running  0              26s
# mongodb-deployment-68f8db65c6-hst86  1/1     Running  0              24m
kubectl logs mongo-express-cbc554bd4-86h75 # Vérifiez que la base de données est connectée
# Aucun fichier config.js personnalisé trouvé, chargement de config.default.js
# Bienvenue sur mongo-express
#------------------------
# Serveur Mongo Express écoutant sur http://0.0.0.0:8081
# Le serveur est ouvert pour autoriser les connexions de

 n'importe qui (0.0.0.0)
```

### Créer un Service externe

Ajoutez un Service externe de type LoadBalancer pour accéder à Mongo Express depuis le navigateur. Il sera ajouté à la configuration du Déploiement:

```yaml
# mongo-express.yaml EOF
---
apiVersion: v1
kind: Service
metadata:
  name: mongo-express-service
spec:
  selector:
    app: mongo-express
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 8081 # Port du service
      targetPort: 8081 # Port du Pod ou du conteneur
      nodePort: 30000 # Ouvre le port de l'adresse IP externe
```

Le type LoadBalancer, alias Service externe, accepte les demandes externes en attribuant au service une adresse IP externe.

```sh
kubectl apply -f mongo-express.yaml
kubectl get service
# NOM                          TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          ÂGE
# kubernetes                   ClusterIP      10.96.0.1        <none>        443/TCP          5h32m
# mongo-express-service        LoadBalancer   10.109.105.73    <pending>     8081:30000/TCP   9s
# mongodb-service              ClusterIP      10.102.163.220   <none>        27017/TCP        58m
```

Dans minikube, une adresse IP externe est attribuée avec une commande supplémentaire:

```sh
minikube service mongo-express-service
# |-----------|-----------------------|-------------|---------------------------|
# | ESPACE DE NOM | NOM                   | PORT CIBLE   | URL                       |
# |-----------|-----------------------|-------------|---------------------------|
# | default   | mongo-express-service | 8081        | http://123.123.12.2:30000 |
# |-----------|-----------------------|-------------|---------------------------|
# 🎉  Ouverture du service default/mongo-express-service dans le navigateur par défaut...
```

Maintenant, vous devriez pouvoir accéder à l'Application sur le navigateur, connectez-vous avec les informations d'authentification de base décodées référencées dans Secret.

[https://images.prismic.io/syntia/04f6f440-e277-45f8-8772-5f908a3e5e0a_Screenshot+2023-11-25+at+18.03.59.png?auto=compress,format](https://images.prismic.io/syntia/04f6f440-e277-45f8-8772-5f908a3e5e0a_Screenshot+2023-11-25+at+18.03.59.png?auto=compress,format)

## Accès aux Pods dans les Applications Kubernetes

Les opérations CRUD sur cette Application, par exemple la création d'une base de données, suivront le processus:

1. La demande par le Service externe de Mongo Express transmet la demande au Pod Mongo Express.
2. Mongo Express est connecté au Service interne de Mongo DB où il transmettra la demande au Pod MongoDB.
3. La base de données MongoDB est mise à jour avec les modifications demandées.

Avec cette configuration, nous avons appris à créer des composants Kubernetes simples pour construire une application Web de base et sa base de données dans le cluster Kubernetes.

### Dépannage

Si le conteneur ne démarre pas, comparez le schéma des fichiers de configuration. Essayez de supprimer les déploiements, de modifier les secrets, la configMap, et de redéployer.
Si la connexion avec le cluster est instable, en raison des ressources système faibles ou des problèmes avec l'hyperviseur, essayez de passer à un autre environnement virtuel et vérifiez les exigences système pour minikube.

Les diagrammes d'architecture Kubernetes à partir de l'état réel dans un espace de noms ont été générés, [référence](https://github.com/mkimuram/k8sviz).
La configuration pour cet atelier est disponible sur GitHub [https://github.com/sintijab/Kubernetes-Workshop](https://github.com/sintijab/Kubernetes-Workshop)
