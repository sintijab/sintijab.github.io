---
description: "Kubernetes Networking 101"
pubDate: "Apr 21, 2023"
heroImage: "https://images.prismic.io/syntia/beb170e5-c363-43b6-bab1-8fd52a6f1fa8_dns.webp?auto=compress,format"
author: "Syntia"
categories: "ateliers, infrastructure cloud, réseau, kubernetes"
subcategories: "protocoles de communication, protocole de contrôle de transmission, protocole Internet, couche réseau, interface réseau, réseau virtuel"
---

# **Les règles de Networking Kubernetes :**

1.  Dans le Networking Kubernetes, tous les pods ont une **adresse IP**.
    
2.  Tous les Pods peuvent **communiquer** entre eux dans une structure de réseau à couche plate (sans l'utilisation de la traduction d'adresse réseau (NAT).
    
3.  Chaque Pod possède **PodCIDR\[s\]** (routing inter-domaines sans classe) par nœud. Le bloc CIDR des Pods du cluster limite le nombre total maximum d'adresses réseau disponibles pour l'allocation aux pods exécutés sur tous les nœuds, où Kubernetes attribue un bloc CIDR /24 (256 adresses) à chacun des nœuds où les IPs de pods font partie de cette plage IP. Pour modifier le CIDR des pods, vous devez configurer kube-proxy.
    
4.  Kubernetes utilise les services pour la couche de **répartition de charge** de Kubernetes. La répartition de charge est ce qui nous permet d'avoir de multiples réplicas d'un pod adressant un seul nom de service ou une seule adresse IP de cluster, et Kubernetes effectuera une répartition de charge sur l'un quelconque de ces réplicas. Les répliques de pods empêchent les utilisateurs de perdre l'accès à leur application en cas de défaillance ou d'inaccessibilité d'un Pod. Il lance une nouvelle instance d'un Pod, l'agrandit lorsque les instances en cours ne sont pas à la hauteur du nombre spécifié, et diminue ou supprime les Pods.
    
5.  Kubernetes utilise le **DNS** pour la **découverte de services**. Vous pouvez adresser un service par son nom et ne pas coder en dur les adresses IP dans les applications.
    
6.  **Network Policies** pour la segmentation. La Network Policy permet de définir quelles Pods sont autorisées à se connecter aux autres Pods, par exemple, la communication dans le même espace de noms est autorisée, mais pas entre les espaces de noms différents.
    

### **Kubernetes Networking CNI et kube-proxy**

![](https://images.prismic.io/syntia/000f4741-0374-4258-b8eb-bf0b3f49ad66_screenshot-2023-04-21-at-12.38.03.jpg?auto=compress,format)

Nous avons plusieurs nœuds dans le cluster, des pods s'exécutent sur les nœuds et des conteneurs s'exécutent à l'intérieur des pods. Le réseau CNI fonctionne en tant qu'agent ou ensemble de démons sur tous les nœuds, et le CNI s'étend sur le plan réseau, ce qui permet aux pods de communiquer entre eux.

Le plugin **Kubenet CNI** est responsable de :

*   Périphériques réseau
    
*   Gestion des adresses IP
    
*   Connectivité intra-nœud
    
*   Connectivité inter-nœuds
    

**Kube Proxy** est responsable de :

*   Services
    
*   Iptables ou ipvs
    
*   Découverte de services
    

## **Kubernetes Networking avec Cilium**

Avec d'autres plugins CNI tels que Cilium, le Networking Kubernetes est similaire. Cilium fournit un chemin de données réseau qui prend en charge la mise en œuvre d'eBPF et transfère les paquets ou met en œuvre les règles de politique réseau. eBPF a été construit sur la base du Berkeley Packet Filter (cBPF).

Cilium fonctionne non seulement en tant que CNI, mais aussi en tant que proxy sur chaque nœud, et il offre une observabilité du Networking Kubernetes avec Hubble, construit sur Cilium, qui est un "tcpdump pour Kubernetes". Il est configurable avec une intégration native Prometheus & Grafana pour collecter des journaux et des métriques.

Des panneaux basés sur Grafana, combien de paquets sont transférés, quel est le taux de chute au niveau de la couche réseau, la quantité totale de trafic transféré et la distribution du trafic entre les régions.

La carte de service Hubble UI avec tous les services en cours d'exécution, les connexions réseau individuelles et la latence de requête/réponse de l'appel API pour les protocoles d'application HTTP, gRPC, Kafka, Cassandra - toutes les données de connectivité.

## **Services Kubernetes**

Cluster IP permet d'exposer plusieurs réplicas de pods via une seule Cluster IP. Au lieu de gérer des centaines de répliques de pods, Kubernetes alloue un nom de service et le rend disponible sous forme de nom DNS via CoreDNS, de sorte que votre application se connecte au nom de service de l'application et que Kubernetes se charge de la mise à l'échelle des pods.

### **Comment résoudre les problèmes des Network Policies ?**

Un exemple des Network Policies, supposons que nous autorisions depuis le frontend la règle de sortie egress vers le pod backend via l'étiquette Kubernetes NetworkPolicy _egress_.

_podSelector_ spécifie quel trafic est autorisé vers et depuis le pod qui correspond au sélecteur _(egress: – to: – podSelector: matchLabels: app: backend)_

Les deux pods sont dans le même espace de noms, cependant, à partir des journaux d'observabilité, nous constatons un taux constant de rejets des Network Policy depuis le frontend, les paquets tentent d'aller vers le pod kube-dns.

En inspectant l'espace de noms en interrogeant le hubble :

 _hubble observe -n kubecon-simple_

_bck-i-search: hu\__

La CLI de Hubble affiche tous les travaux réseau et les flux transférés dans cet espace de noms, et les rejets de la politique se produisent du frontend vers kube-dns.

> > **"Ce n'est pas DNS, il n'y a aucune chance que ce soit DNS, c'était DNS"**

Le DNS Kubernetes est utilisé pour la découverte de services, et il est généralement implémenté avec CoreDNS.

### **Dépannage du DNS Kubernetes**

La carte de service Hubble UI avec une vue sur la communication entre espaces de noms d'un espace de noms à l'autre, par exemple, du frontend vers kube-dns. Nous pouvons voir la partie inférieure des flux rejetés et la description de la raison pour laquelle la politique a été refusée.

Maintenant, en appliquant la nouvelle Network Policy par-dessus la politique, nous permettons l'accès au serveur de noms Kubernetes coreDNS _kube-dns_ avec : _k apply -f kubecon-simple-allow-dns.yaml_

_cat kubecon-simple-allow-dns.yaml_

_apiVersion:_ [cilium.io/v2](//cilium.io/v2)

_kind: CiliumNetworkPolicy_

_metadata:_

  _name: allow-kube-dns_

_spec:_

  _egress:_

*   _toEndpoints:_
    

*   _matchLabels:_
    

_k8s:io.kubernetes.pod.namespace: kube-system_

_K8s:k8s-app: kube-dns_

_toPorts:_

*   _ports:_
    
*   _port: "53"_
    

_Protocol: ANY_

_endpointSelector:_

_matchLabels: {}
_

Le problème n'était pas seulement d'autoriser les règles de politique de réseau du backend au frontend (vers app=backend), mais aussi le pod kube-dns ou coreDNS (vers ns:contient-coredns pod:k8s-app=kube-dns), les applications ayant échoué en sortie en raison du dépassement de l'espace de noms kube-system.

La surveillance de Prometheus des erreurs DNS fait partie de l'observabilité DNS sur Hubble. Avec la CLI Hubble :

_hubble observe -n kubecon-debug-dns_ 

Hubble trace les communications vers kube-dns via UDP, ainsi que les demandes DNS réelles et les réponses, où le pod tente de résoudre IPv6 et IPv4, et les chemins de résolution DNS dans l'espace de noms.

### **Apprenez à créer des Network Policies pour Kubernetes**

Éditeur qui visualise les Network Policies Kubernetes :

[https://editor.networkpolicy.io/?id=zVzZxN60deKeWdOf](https://editor.networkpolicy.io/?id=zVzZxN60deKeWdOf)

## **Dépannage de la latence des services**

### **Tableau de bord des signaux d'or**

La latence des services peut être mesurée par les performances des applications déployées. Il existe un tableau de bord standard des **signaux d'or**, créé par l'équipe Google SRE, une manière standard de **monitorer les services disponibles publiquement**.

**Les quatre signaux d'or principaux sont :**

*   Latence
    
*   Trafic
    
*   Erreurs
    
*   Saturation
    

Plus d'informations : [https://sre.google/sre-book/monitoring-distributed-systems](https://sre.google/sre-book/monitoring-distributed-systems) 

![](https://images.prismic.io/syntia/2beaaec2-b396-429c-905f-514b0af5f907_screenshot-2023-04-21-at-14.23.10.png?auto=compress,format)

![](https://images.prismic.io/syntia/506cc33c-b34f-4e00-9b3e-52b016df9a18_screenshot-2023-04-21-at-14.47.16.png?auto=compress,format)

Hubble propose un tableau de bord pour les quatre signaux d'or. Il comprend :

*   **Volume des demandes entrantes** : Taux de combien de demandes arrivent par seconde
    
*   **Durée de la demande** : Latence de la demande HTTP à la réponse en secondes (P50 est la moyenne des pires moitiés du nombre de latence, P95 est la moyenne du pire 5% des connexions qui prennent le plus de temps, et P99 est le pire 1%). P95 et P99 sont plus importants, car en moyenne, cela semble souvent bon, mais parfois les demandes rencontrent des problèmes de latence où la durée atteint jusqu'à 2 secondes.
    
*   **Taux de succès des demandes entrantes** (et non des réponses 5xx) par source : taux d'erreurs HTTP renvoyées par l'application. Lorsqu'il y a un problème de latence, il y a des sources de problèmes lorsque les demandes prennent trop de temps ou que le service plante.
    
*   **Durée de la demande HTTP par source** Pour déboguer les erreurs, nous devons corréler la durée de la demande avec la saturation due à l'utilisation du CPU par source. Cela mesure à la fois la source (CPU) et les nœuds de destination (durée de la demande) pour surveiller largement les clusters.
    
*   **Utilisation du CPU par source** disponibilité des ressources CPU.
    

Le pic de latence est comparable sur les nœuds source et destination au moment permettant d'analyser les erreurs de service et leur rapidité et performance. Ces données sont disponibles en tant qu'OpenTelemetrics et traces à visualiser sur d'autres outils. Il ne s'agit pas de l'instrumentation de l'application, mais de l'observation du cluster Kubernetes et de ses ressources.
