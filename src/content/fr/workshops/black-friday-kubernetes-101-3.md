---
description: "Kubernetes 101 - Concepts avancés de K8s"
pubDate: "Nov 24, 2023"
heroImage: "https://syntia.prismic.io/medias/?open=ZWKhxRAAACMA1LzO"
author: "Syntia"
categories: "ateliers, infrastructure cloud, réseau, kubernetes"
subcategories: "protocoles de communication, protocole de contrôle de transmission, protocole Internet, couche réseau, interface réseau, réseau virtuel"
---

Jusqu'à présent, nous avons appris ce qu'est Kubernetes, pourquoi les ventes du Black Friday sont réussies, et comment créer et déployer des applications Kubernetes de base.
Kubernetes aide à gérer l'infrastructure et le développement, que ce soit pour de grandes organisations ou en collaboration au sein d'équipes plus petites.
Accéder et gérer plusieurs applications Kubernetes au sein d'un cluster est beaucoup plus facile une fois que vous avez appris les composants et l'architecture de Kubernetes.
Dans cet article, vous en apprendrez davantage sur la gestion des clusters Kubernetes et le dimensionnement de l'infrastructure avec plusieurs applications Kubernetes.

## K8s Namespaces - Organisation des composants

Dans le cluster Kubernetes, il est possible d'organiser les ressources dans des espaces de noms, permettant d'avoir plusieurs espaces de noms similaires à des clusters à l'intérieur du cluster. Par défaut, Kubernetes offre quelques espaces de noms. Le cluster Minikube dispose de quatre espaces de noms :

```sh
kubectl get namespaces
# NOM                   STATUT   ÂGE
# default               Actif    11h - ressources créées ici
# kube-node-lease       Actif    11h - détermine la disponibilité du nœud
# kube-public           Actif    11h - données accessibles publiquement, informations sur le cluster
# kube-system           Actif    11h - processus principal du système, par exemple, kubectl cluster-info
# kubernetes-dashboard  Actif    5h8m - spécifique à Minikube
```

### Créer un nouvel espace de noms

```sh
kubectl create namespace my-namespace # ou utilisez des fichiers de configuration
```

### Pourquoi créer de nouveaux espaces de noms ?

Avec seulement des espaces de noms par défaut, toutes les ressources provenant d'applications complexes contenant plusieurs déploiements et créant des pods avec des ressources deviennent rapidement difficiles à gérer.

#### Observabilité

Les espaces de noms sont généralement utiles pour surveiller les ressources dans ces groupes. Lorsque l'espace de noms a une certaine CPU, RAM, stockage dédié, il devient plus facile de distinguer entre les applications et de définir des limites avec des quotas de ressources dans ces groupes de ressources.

#### Organisation du travail des équipes

Il permet d'avoir différentes ressources par espace de noms, par exemple, une base de données ou un `nginx-ingress`. Avoir un espace de noms par application réduit les risques de conflits de déploiement et limite les équipes d'ingénierie pour éviter d'écraser accidentellement un déploiement existant et d'interrompre le travail.

L'espace de noms donne également aux équipes uniquement l'accès à leur espace de noms, et aucune autre équipe n'aura accès pour mettre à jour, créer ou supprimer des ressources des espaces de noms des autres équipes.

#### Partage de ressources

Les espaces de noms sont bons pour le partage de ressources. Lorsque les environnements de mise en scène et de développement sont dans le même cluster, le contrôleur `nginx-ingress` ou `elastic stack` pour la journalisation peut être déployé dans un cluster et utilisé pour les deux environnements.

Un autre cas d'utilisation est le déploiement Blue/Green. Lorsque le cluster a besoin de deux versions d'une production, l'une qui est active et l'autre, alias pré-production, ces espaces de noms peuvent réutiliser les ressources communes partagées.

### Caractéristiques de l'espace de noms

Les ressources ne peuvent généralement pas être partagées entre les espaces de noms, à l'exception d'un Service. ConfigMap peut faire référence à un Service qui sera éventuellement utilisé dans un Pod. Dans la définition de ConfigMap, le service spécifiera également l'espace de noms.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service.database # Nom du service suivi de l'espace de noms
```

Certaines ressources ne peuvent pas être isolées, comme le volume et le nœud. Ils seront accessibles dans le cluster. Découvrez quelles autres ressources ne sont pas attribuées à un espace de noms :

```sh
kubectl api-resources --namespaced=false
```

### Comment attribuer les ressources à un espace de noms ?

```sh
kubectl apply -f configmap.yaml -n=my-namespace # ou --namespace=my-namespace
```

Une autre façon est d'inclure la destination de l'espace de noms dans les fichiers de configuration :

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
  namespace: my-namespace
data:
  database_url: mongodb-service.database # Nom du service suivi de l'espace de noms
```

Après avoir attribué la ressource à l'espace de noms, vous ne pourrez pas la trouver dans le groupe par défaut.

```sh
kubectl get configmap # ne trouvera rien avec -n=default
kubectl get configmap -n my-namespace # trouve la ressource dans l'espace de noms
```

### Comment changer l'espace de noms actif (par défaut) ?

L'outil en ligne de commande `kubectx` installe l'extension CLI `kubens` qui peut modifier l'espace de noms actif.

```sh
kubens my-namespace
# contexte "minikube" modifié
# l'espace de noms actif est "my-namespace"
```

Maintenant, vous pouvez exécuter `kubectl` sans ajouter l'espace de noms aux commandes.

## K8s Ingress

Ingress est responsable de la mise en correspondance de l'adresse IP du service externe avec le nom de domaine et le protocole sécurisé.

### Configuration du service externe

```yaml
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

### Configuration de l'Ingress

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myingress
  labels:
    name: myingress
spec:
  rules:
  - host: <Hôte> # example.com, # fait correspondre le nom de domaine à l'entrée IP du nœud. Il s'agit de l'adresse IP d'un nœud à l'intérieur du cluster ou d'un hôte de serveur configuré à l'extérieur du cluster.
    http: 
      paths:
      - pathType: Prefix
        path: "/"
        backend: # redirige la demande vers le service interne
          service:
            name: <Service> # redirige vers le service interne, par exemple mongo-express-service
            port: 
              number: <Port> # Port du

 service interne, par exemple 8081
```

### Comment configurer l'Ingress ?

L'acheminement des Ingress nécessite le contrôleur d'Ingress, qui est un autre ensemble de pods de contrôleurs qui effectue l'évaluation et le traitement des règles Ingress et gère la redirection.

Il existe de nombreux contrôleurs d'Ingress, mais l'un des plus couramment utilisés dans Kubernetes est le Nginx Ingress Controller. Liste d'autres : [Contrôleurs Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/).

Les environnements natifs du cloud ont souvent un équilibreur de charge cloud mis en œuvre par les fournisseurs de cloud. L'avantage est un effort minimal pour rediriger les demandes vers le cluster Kubernetes.

Dans un environnement bare-metal, il existe différentes façons de le configurer avec un point d'entrée, soit dans un cluster, soit sur le serveur en cours d'exécution à l'extérieur du cluster. Une approche consiste à utiliser un serveur mandataire externe qui prendra le rôle d'un équilibreur de charge. C'est une approche plus sécurisée car les ports et les adresses IP sont ouverts pour la communication vers le serveur mandataire mais ne sont pas accessibles depuis l'extérieur du cluster.

#### Configuration de Nginx Ingress sur le contrôleur d'Ingress de Minikube

```sh
minikube addons enable ingress
```

Il implémente et configure automatiquement le contrôleur Nginx sur le cluster Minikube.

```sh
kubectl get pod -n kube-system
```

Maintenant, créez une règle Ingress que le contrôleur peut évaluer. Elle sera créée pour le composant Kubernetes Dashboard.

### Configuration du tableau de bord Minikube avec un nom de domaine URL

Pour cet exemple, nous allons configurer une petite configuration Ingress pour rediriger les demandes vers un service interne.

Minikube a une prise en charge intégrée de l'interface utilisateur du tableau de bord Kubernetes. Il a déjà un service interne et un pod créé [GitHub Dashboard](https://github.com/kubernetes/dashboard).

```sh
kubectl get ns
kubectl get all -n kubernetes-dashboard
# NOM                                             PRÊT    STATUT    REDEMARRAGES        ÂGE
# pod/dashboard-metrics-scraper-7fd5cb4ddc-n4d2t   1/1     En cours d'exécution   2 (il y a 6m15s)   6h41m
# pod/kubernetes-dashboard-8694d4445c-jcs2q        1/1     En cours d'exécution   3 (il y a 6m15s)   6h41m

# NOM                                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    ÂGE
# service/dashboard-metrics-scraper   ClusterIP   10.110.99.160   <none>        8000/TCP   6h41m
# service/kubernetes-dashboard        ClusterIP   10.104.219.39   <none>        80/TCP     6h41m
```

Créez le fichier de configuration de l'Ingress.

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: dashboard-ingress
  namespace: kubernetes-dashboard
  labels:
    name: kubernetes-dashboard
spec:
  rules:
  - host: k8s-dashboard.com
    http:
      paths:
      - backend:
          serviceName: kubernetes-dashboard
          servicePort: 80
```

Appliquez la configuration.

```sh
kubectl apply -f nginx-ingress.yaml
# ingress.networking.k8s.io/dashboard-ingress created
kubectl get ingress -n kubernetes-dashboard
# NOM                CLASSE  HÔTES                   ADRESSE          PORTS   ÂGE
# dashboard-ingress   nginx   k8s-dashboard.com   192.168.66.2   80      46s
```

Ajoutez l'adresse IP pour la faire correspondre au nom de domaine localement.

```sh
sudo vim /etc/hosts
# 192.168.66.2    k8s-dashboard.com
```

Maintenant, vous devriez pouvoir accéder au tableau de bord Kubernetes via l'Ingress externe avec l'adresse k8s-dashboard.com.

![Dashboard](https://images.prismic.io/syntia/6031298c-bb94-4f5a-a897-f73f1a32154b_dashboard.png?auto=compress,format)

#### Backend par défaut de l'Ingress

Il est associé par défaut au tableau de bord Kubernetes à l'adresse http://k8s-dashboard.com/test renverra une « page non trouvée 404 ». Pour créer une réponse personnalisée, vous devez créer un pod et un service qui sont référencés par l'Ingress :

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kubernetes-dashboard # Nom du service à partir de l'Ingress
spec:
  selector:
    app: default-response-app
  ports:
    - protocol: TCP
      port: 80 # Port du service à partir de l'Ingress
      targetPort: 8080 
```

### Configuration de l'Ingress par défaut

```sh
kubectl describe ingress dashboard-ingress -n kubernetes-dashboard
# Nom:             dashboard-ingress
# Étiquettes:       nom=kubernetes-dashboard
# Espace de noms:   kubernetes-dashboard
# Adresse:         192.168.66.2
# Ingress Class:   nginx
# Backend par défaut:  <défaut>
# Règles:
  # Hôte                Chemin  Backends
  # ----                ----  --------
  # k8s-dashboard.com  
  #                   /   kubernetes-dashboard:80 (10.244.0.33:9090)
# Annotations:         <aucun>
# Événements:
#  Type    Raison  Âge                    De                        Message
#  ----    ------  ----                   ----                      -------
#  Normal  Sync    9m30s (x2 sur 9m48s)  nginx-ingress-controller  Programmé pour la synchronisation
```

## Définir le routage pour les applications dans le cluster Kubernetes

### Multipaths

Définition de plusieurs chemins pour le même hôte. Pour les différents chemins, il est possible de rediriger les demandes vers différents services internes et d'avoir plusieurs applications accessibles à partir d'un seul Ingress :

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dashboard-ingress
  labels:
    name: kubernetes-dashboard
spec:
  rules:
  - host: k8s-dashboard.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: kubernetes-dashboard
            port: 
              number: 80
      - pathType: Prefix
        path: "/account"
        backend:
          service:
            name: account-service
            port: 
              number: 80
```
### Sous-domaines
Une application peut avoir des sous-domaines pour rediriger les requêtes vers différentes applications à partir d'adresses URL de sous-domaine :
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dashboard-ingress
  labels:
    name: kubernetes-dashboard
spec:
  rules:
  - host: k8s-dashboard.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: kubernetes-dashboard
            port: 
              number: 80
  - host: account.k8s-dashboard.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: account-service
            port: 
              number: 80
```

### Configuration du certificat TLS
La redirection Https dans l'ingress est simplement réalisée dans la configuration de l'ingress.
Deux exigences sont les hôtes tls et le nom secret au-dessus des règles. Le nom secret est la référence au Secret créé dans le cluster qui détient le certificat TLS.
```yaml
# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: dashboard-ingress
  labels:
    name: kubernetes-dashboard
spec:
  tls:
    - hosts:
      - k8s.dashboard.com
      secretName: k8s-dashboard-tls
  rules:
  - host: k8s-dashboard.com
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: kubernetes-dashboard
            port: 
              number: 80
```
Le secret doit être créé dans le même espace de noms que le composant Ingress pour pouvoir le référencer.
```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: k8s-dashboard-tls
type: kubernetes.io/tls
data:
  tls.crt: base64 encoded cert
  tls.key: base64 encoded key
```

Jusqu'à présent, nous avons appris ce qu'est Kubernetes, pourquoi les ventes du Black Friday sont réussies, et comment créer et déployer des applications Kubernetes de base.
Kubernetes aide à gérer l'infrastructure et le développement, que ce soit pour de grandes organisations ou en collaboration au sein d'équipes plus petites.
Accéder et gérer plusieurs applications Kubernetes au sein d'un cluster est beaucoup plus facile une fois que vous avez appris les composants et l'architecture de Kubernetes.
Dans cet article, vous en apprendrez davantage sur la gestion des clusters Kubernetes et le dimensionnement de l'infrastructure avec plusieurs applications Kubernetes.

## Gestionnaire de paquets Helm
![](https://images.prismic.io/syntia/c25e5854-b3cb-4f5a-afd0-0cc63f1c116b_Screenshot+2023-11-26+at+02.28.08.png?auto=compress,format)

Helm est un gestionnaire de paquets pour Kubernetes. Il est pratique pour empaqueter des fichiers YAML et les distribuer dans des référentiels Helm. Les fichiers YAML sont créés une fois en tant que Helm Charts, de sorte qu'ils peuvent être réutilisés par d'autres membres de l'équipe pour les déploiements dans le cluster Kubernetes.
Les déploiements couramment utilisés sont les applications frontend, les applications de base de données, Elasticsearch, MongoDB, MySQL, les applications de surveillance avec Prometheus.
En utilisant une seule commande
```sh
helm install NOM_DU_CHART
```
La commande d'installation de Helm réutilise la configuration qui a déjà été créée précédemment pour d'autres applications à partir de fichiers de chart partagés sur le référentiel Helm.

Il existe également des registres publics pour les charts Helm disponibles à la réutilisation :
https://helm.sh/docs/helm/helm_search_hub/ 
### Moteur de modèle
Helm est un moteur de modèle, où la configuration de déploiement et de service peut être presque la même, sauf que le nom de l'application et la version sont différents, le nom et les balises de version de l'image Docker.
Il existe un modèle de configuration commun pour les déploiements écrit dans les templates. Les valeurs qui vont changer ont des espaces réservés au lieu de valeurs. 
```yaml
# Configuration YAML modèle
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.Name }}-configmap
spec:
  containers:
  - name: {{ .Values.container.name  }}
    image: {{ .Values.container.image }}
    port: {{ .Values.container.port }}

# Values.yaml
name: my-app
container:
  name: web-app
  image: some-image
  port: 8001
```
https://helm.sh/docs/chart_template_guide/values_files/ 
Les mêmes fichiers de configuration peuvent être utilisés pour déployer des applications sur différents clusters pour différents environnements en étiquetant les environnements de staging, de développement et de production.

### Structure du référentiel Helm
Helm s'attendra à une structure qui correspond à ceci :
```markdown
helm_repository/
  Chart.yaml          # Un fichier YAML contenant des informations sur le chart
  LICENSE             # FACULTATIF : Un fichier texte contenant la licence du chart
  README.md           # FACULTATIF : Un fichier README lisible par l'homme
  values.yaml         # Les valeurs de configuration par défaut pour ce chart
  values.schema.json  # FACULTATIF : Un schéma JSON imposant une structure sur le fichier values.yaml
  charts/             # Un répertoire contenant les charts sur lesquels dépend ce chart.
  crds/               # Définitions de ressources personnalisées
  templates/          # Un répertoire de modèles qui, combinés avec des valeurs,
                      # générera des fichiers de manifeste Kubernetes valides.
  templates/NOTES.txt # FACULTATIF : Un fichier texte contenant de courtes notes d'utilisation
```
Plus d'informations sur les modèles de chart Helm : https://helm.sh/docs/chart_template_guide/ 
```