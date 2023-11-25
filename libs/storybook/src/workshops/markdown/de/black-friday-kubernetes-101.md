# Zero-Downtime während des Black Friday

![](https://images.prismic.io/syntia/17db0669-0455-46aa-a91e-a309d3a75156_yoga-kubernetes.jpg?auto=compress,format)

Ich wurde von der Unternehmerin und Yoga-Meisterin Karin Dimitrovova inspiriert,
dieses Workshop zu dokumentieren. Sie ist eine von vielen Geschäftsinhabern, die
von den Verkaufsaktionen am Black Friday überwältigt sind und Schwierigkeiten
haben, ihr Unternehmen im Auge zu behalten, während der Markt von einem Ansturm
erfasst wird.

Der Black Friday markiert den Beginn der Weihnachtseinkaufsaison zwischen
dem 23. und 29. November. Die Kunden gaben letzten Jahr beim Online-Shopping am
Black Friday rekordverdächtige 9,12 Milliarden US-Dollar aus, ein Anstieg um
2,3% im Vergleich zu 2021.

Höhere Preise haben auch dazu geführt, dass Verbraucher ihre
Zahlungsgewohnheiten ändern. Bestellungen mit "Jetzt kaufen, später zahlen"
(BNPL) stiegen am Black Friday im Vergleich zur Vorwoche (19. bis 25. November)
um 78%, laut
[Adobe](https://www.digitalcommerce360.com/article/black-friday-ecommerce-sales/).

Mit der Erwartung, den größten Umsatz während der Verkäufe zu erzielen, kann
Zero-Downtime mit Kubernetes Deployments erreicht werden.

In Situationen, in denen die Anwendung unterbrochen ist oder im schlimmsten Fall
Ausfallzeiten erlebt, ist Kubernetes dafür verantwortlich, containerisierte
Anwendungen wiederherzustellen, bevor sichtbare Auswirkungen auf die
Kundenerfahrung auftreten.

Das Skalieren des Dienstes in Kubernetes balanciert den Datenverkehr während der
Aktualisierungen nur zu verfügbaren Instanzen (Pods) und hat die wichtigste
Rolle, um die Verfügbarkeit der Anwendung zu gewährleisten.

In diesem ersten Teil des Workshops erfahren Sie, wie Sie Anwendungsdeployments
mit Kubernetes verwalten und Ihre lokale Testumgebung einrichten.

## Was ist Kubernetes?

Open-Source-Containerorchestrierungstool, entwickelt von Google. Es hilft bei
der Verwaltung containerisierter Anwendungen, z. B. Docker-Container, in
verschiedenen Umgebungen wie physischen, virtuellen Maschinen, Cloud- oder
Hybridbereitstellungsumgebungen.

### Welche Probleme löst Kubernetes?

Das Containerorchestrierungstool entstand aus der Entwicklung von Monolith zu
Microservices, was zu Bereitstellungen kleiner unabhängiger Anwendungen führte.
Die Notwendigkeit eines Containerorchestrierungstools zur Verwaltung Tausender
Container in verschiedenen Umgebungen. Welche Funktionen bieten
Orchestrierungstools? Hohe Verfügbarkeit ohne Ausfallzeiten, Skalierbarkeit mit
hoher Leistung, hohe Antwortraten und Mechanismen für die
Notfallwiederherstellung - Sicherung des aktuellen Anwendungsstatus und
Wiederherstellung.

## Hauptkomponenten von Kubernetes

In Kubernetes ist ein Worker-Knoten ein Server, physisch oder eine virtuelle
Maschine. Ein Pod ist eine Abstraktion des Containers - eine Kubernetes-Schicht
zum Verwalten des Container-Runtime. Ein Pod ist normalerweise dafür vorgesehen,
einen Anwendungscontainer zu starten, es sei denn, es handelt sich um einen
Hilfs- oder Nebendienst, der im selben Pod ausgeführt wird. Kubernetes bietet
ein virtuelles Netzwerk, in dem jedem Pod eine interne IP-Adresse zugewiesen
ist. Pods können miteinander kommunizieren, indem sie ihre IP-Adressen
verwenden.

Im Beispiel der Anwendung mit Datenbank kann die Anwendungscontainer mit einer
Pods-IP-Adresse mit einer Datenbank kommunizieren. Pod-Komponenten in Kubernetes
sind flüchtig - sie können häufig ausfallen. Der Datenbankcontainer kann
verloren gehen, weil eine Anwendung im Container abgestürzt ist oder weil der
Server keine Ressourcen mehr hat, und der neue Pod wird an seiner Stelle neu
erstellt, und es wird eine neue IP-Adresse zugewiesen.

Ein Service ist eine permanente IP-Adresse mit DNS-Adressnamen, die jedem Pod
angehängt werden kann. Die Anwendung und die Datenbank werden ihren eigenen
Service haben. Die Lebensdauer von Pod und Service ist nicht verbunden - wenn
der Container abstürzt, bleibt der Serviceendpunkt gleich. Der Service fungiert
als Lastenausgleicher - er fängt die Anfragen ab und leitet sie an den Pod
weiter.

Damit die Anwendung im Browser zugänglich ist, wird der externe Service
erstellt, der die Kommunikation von externen Quellen öffnet. Die internen
Dienste werden für die Pods für die Datenbank erstellt, damit diese nicht
öffentlich zugänglich sind, und Ingress, der für das Routing des Datenverkehrs
zum Kubernetes-Cluster verantwortlich ist und die Domäne sowie die
Portweiterleitung zur Adresse des externen Dienstes verwaltet.

Pods kommunizieren miteinander über Dienste, z. B. wird eine Anwendung einen
Endpunkt namens mongo-db-service haben, um mit der Datenbank zu kommunizieren.
Wenn der Anwendungsname unterschiedlich ist, muss die URL in der Anwendung
angepasst werden - neues Image zum Pod neu erstellen, ziehen und schieben.

Configmap verwaltet externe Konfigurationen für Ihre Anwendung. Es enthält
Konfigurationsdaten wie URLs von Datenbanken oder anderen Diensten. In
Kubernetes ist Configmap mit einem Pod verbunden, und zum Zugriff auf die
Konfigurationsdaten ist kein Neuaufbau von Images erforderlich.

Ein Teil der externen Konfiguration der Datenbank ist der Benutzername und das
Passwort, die sich auch im Anwendungsdeploiementprozess ändern können. Das
Platzieren im Configmap ist jedoch nicht sicher, und für geheime Informationen
wie Anmeldeinformationen hat Kubernetes Komponenten Secrets.

Secrets sind Passwörter, Zertifikate, Anmeldeinformationen und mit dem Pod
verbunden. Die Secrets und Configmap sind für die Anwendung von externen Dateien
oder Umgebungsvariablen aus zugänglich.

Für die Datenspeicherung bietet Kubernetes Volumes. Ohne Volumes würden bei
einem Neustart des Datenbankcontainers oder Pods die Daten nicht bestehen
bleiben. Volumes binden den physischen Speicher auf der Festplatte an den Pod
an. Dieser Speicher kann auf dem lokalen Rechner auf dem Serverknoten, auf dem
der Pod läuft, oder auf dem Remote-Speicher außerhalb des Kubernetes-Clusters,
z. B. Cloud-Speicher oder lokal, sein.

Der Kubernetes-

Cluster verwaltet keine Datenspeicherung. Der Kubernetes-Administrator ist für
das Sichern von Daten, das Replizieren und Verwalten verantwortlich.

Der Vorteil von containerisierten Systemen ist die Systemverfügbarkeit mit
Pod-Replikation. Wenn die Anwendung abstürzt oder der Pod neu gestartet wird,
bietet Kubernetes die Replikation der Serverknoten, auf denen der Klon der
Anwendung ausgeführt wird und mit dem Service verbunden ist.

Die Erstellung einer zweiten Replik erfolgt nicht mit der Pod-Erstellung,
sondern mit der Blaupausekonfiguration, die die Repliken deklariert. In
Kubernetes werden Pods von Deployments erstellt, einer Abstraktion von Pods.

Datenbankpods können nicht durch Deployments repliziert werden, da die Datenbank
einen Zustand und ihre eigenen Daten hat, die von Pods gesteuert werden, die
Daten lesen oder schreiben. Dieser Mechanismus wird von Kubernetes mit einem
StatefulSet für Anwendungen wie Elastic, MongoDB, MySQL angeboten. Das
StatefulSet kümmert sich um die Replikation von Pods und skaliert sie ähnlich
wie Deployments.

Datenbankanwendungen werden oft außerhalb des K8s-Clusters gehostet, und es
werden nur zustandslose Anwendungen beibehalten, die mit externen Datenbanken
kommunizieren.

## K8s-Architektur

Kubernetes arbeitet mit zwei Arten von Knoten - Master und Slave mit Rollen, die
es in einem Cluster hat.

### Prozesse des Worker Nodes

Die Art und Weise, wie Kubernetes Pods verwaltet und skaliert, erfolgt über drei
Prozesse, die auf jedem Knoten installiert sein müssen.

#### Grundlegende Einrichtung eines Knotens mit zwei Anwendungspods, die ausgeführt werden

Eine der Hauptkomponenten der Kubernetes-Architektur sind ihre Arbeitsserver
oder Worker Nodes. Jeder Knoten hat mehrere Anwendungspods mit Containern, die
auf jedem Knoten ausgeführt werden.

#### Container-Runtime

Der erste Prozess ist die Container-Runtime, z. B. Docker oder eine andere
Technologie, da Anwendungspods in einer Container-Runtime ausgeführt werden. Der
Prozess, der Container plant, ist Kubelet. Kubelet interagiert sowohl mit dem
Knoten als auch mit der Container-Runtime. Es ist dafür verantwortlich, einen
Pod mit dem Container zu starten und Ressourcen vom Knoten dem Container
zuzuweisen. Ein Kubernetes-Cluster besteht oft aus mehreren Knoten. Die
Kommunikation zwischen ihnen funktioniert mit Services - der Lastenausgleicher
fängt Anfragen von einem Pod der Anwendung oder Datenbank ab und leitet sie an
einen anderen Pod weiter. Der dritte Prozess, der für das Weiterleiten von
Anfragen von Diensten zu Pods verantwortlich ist, ist Kube Proxy - er ist auf
jedem Knoten installiert.

#### Kube Proxy

Kube Proxy stellt auch sicher, dass die Kommunikation mit geringem
Netzwerkoverhead performant funktioniert. Wenn z. B. eine Anwendung eine Anfrage
an die Datenbank stellt, leitet der Service die Anfrage zuerst an die Replik
weiter, die auf dem gleichen Knoten wie der Pod läuft, der die Anfrage initiiert
hat.

#### Wie interagiert man mit dem Cluster?

Entscheiden Sie, auf welchem Knoten der Anwendungspod oder der Datenbankpod
geplant wird? Wenn ein Replikationspod abstirbt, überwacht welcher Prozess ihn
und plant dann die erneute Planung oder Neustart? Wenn wir einen weiteren Server
hinzufügen, wie tritt er dem Cluster bei, um ein weiterer Knoten mit den anderen
Pods darauf zu werden? Alle diese Verwaltungsprozesse werden von Master-Nodes
durchgeführt. Auf jedem Master-Knoten werden 4 Prozesse ausgeführt.
Master-Prozesse sind entscheidend für den Betrieb des Clusters.

### Prozesse des Master Nodes

Der Kubernetes-Cluster besteht aus mehreren Mastern, wobei jeder Master-Knoten
seine Master-Prozesse ausführt, wobei der API-Server lastenausgeglichen ist und
der etcd-Speicher eine verteilte Speicherung über alle Master-Knoten bildet.
Grundlegende Cluster-Einrichtung von 2 Master-Knoten und 3 Worker-Knoten Die
Leistung und Ressourcen des Kubernetes-Clusters können einfach aufgrund der
Replikationskomplexität und des steigenden Ressourcenbedarfs erhöht werden. Um
einen neuen Master-/Knotenserver zum Cluster hinzuzufügen, sind nur ein neuer
Bare-Server mit installierten Master- und Worker-Prozessen erforderlich.

#### API-Server

Der erste Dienst ist der API-Server. Wenn der Benutzer eine neue Anwendung im
Kubernetes-Cluster bereitstellen möchte, interagiert er mit dem API-Server über
den Client, z. B. Kubelet oder Kubernetes-API. Der API-Server ist ein
Cluster-Gateway, das die anfänglichen Anfragen für Updates in den Cluster oder
Abfragen aus dem Cluster empfängt und als Gatekeeper für die Authentifizierung
dient, um sicherzustellen, dass nur autorisierte Anfragen einen Einstiegspunkt
zum Cluster haben.

#### Scheduler

Der Scheduler ist der nächste Prozess nach dem API-Server-Validator, der den
Anwendungspod auf einem der Worker-Knoten startet. Er verfügt über Informationen
zu den Ressourcen auf dem Worker-Knoten, die die Anwendung benötigen wird, wie
z. B. RAM und GPU, und entscheidet aufgrund der Ressourcenverfügbarkeit, auf
welchem Worker-Knoten der nächste Pod geplant wird. Der Prozess, der den Pod
startet, ist Kubelet, wenn er die Anfrage vom Scheduler erhält.

#### Controller Manager

Controller Manager erkennt Änderungen im Clusterzustand, wie das Abstürzen von
Pods, und versucht, es so schnell wie möglich wiederherzustellen. Er stellt eine
Anfrage an den Scheduler, um die abgestorbenen Pods neu zu planen, und der
Scheduler entscheidet dann, welche Worker-Knoten die Pods neu starten sollen,
und stellt eine Anfrage an Kubelet.

#### Etcd-Speicher

Cluster-Gehirn Etcd ist ein Schlüssel-Wert-Speicher des Cluster-Zustands. Jede
Änderung im Cluster wird im Schlüssel-Wert-Speicher aktualisiert. Er sammelt
alle Informationen darüber, welche Ressourcen auf jedem Worker-Knoten verfügbar
sind, Änderungen am Cluster-Zustand und die Gesundheit des Clusters.
Anwendungsdaten werden nicht in Etcd gespeichert.

Die Namenskonvention von Etcd stammt aus der Linux-Verzeichnisstruktur: In UNIX
sind alle Systemkonfigurationsdateien für ein einzelnes System in einem Ordner
"/etc" enthalten; "d" steht für "verteilt".

# Minikube und Kubectl - Lokales Setup

In der Produktionscluster-Konfiguration sind oft mindestens zwei Master-Knoten
und mehrere Worker-Knoten erforderlich, sowie separate virtuelle oder physische
Maschinen, die jeweils einen Knoten repräsentieren.

Für Tests von Kubernetes in einer lokalen Umgebung, z. B. das Bereitstellen
einer neuen Anwendung, könnte die Einrichtung eines Clusters aufgrund hoher
Anforderungen an die Ressourcen unmöglich sein.

### Minikube

Das Open-Source-Tool Minikube bietet einen Ein-Knoten-Cluster, auf dem die
Master- und Worker-Prozesse auf einem Knoten mit vorinstallierter
Docker-Container-Runtime ausgeführt werden. Es läuft in Virtual Box oder einem
anderen Hypervisor, der für Tests von Kubernetes in lokalen Setups verwendet
werden kann.

### Kubectl

Kubectl ist ein Kommandozeilen-Tool zum Interagieren mit jedem Typ von
K8s-Cluster, wie z. B. Minikube oder Cloud-Cluster. Während Minikube sowohl
Master- als auch Worker-Prozesse ausführt, ist einer der Master-Prozesse, der
API-Server, der Hauptzugangspunkt zum K8s-Cluster. Es gibt verschiedene
Möglichkeiten, mit dem Cluster zu interagieren - UI, Kubernetes-API oder CLI,
und kubectl CLI ist eines der leistungsstärksten der 3 Kubernetes-Clients.

## Lokales Setup

Installieren Sie einen Hypervisor wie VirtualBox
[https://www.virtualbox.org/wiki/Downloads](https://www.virtualbox.org/wiki/Downloads)
oder hyperkit für Mac
[https://minikube.sigs.k8s.io/docs/drivers/hyperkit/](https://minikube.sigs.k8s.io/docs/drivers/hyperkit/).

Installieren Sie Minikube (für Mac, Linux und Windows)
[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/).

Installieren Sie Kubectl
[https://kubernetes.io/docs/tasks/tools/](https://kubernetes.io/docs/tasks/tools/).

### Minikube starten

Der folgende Befehl konfiguriert einen Ein-Knoten-Cluster "minikube" und den
"default"-Namespace standardmäßig. Wenn Sie einen anderen Hypervisor als
VirtualBox verwenden, wählen Sie eine andere Treiberoption aus:

```sh
minikube start --driver=virtualbox --no-vtx-check

# Testen Sie die Befehle:
minikube kubectl -- get pods -A
kubectl version --client --output=yaml
kubectl get pod
kubectl get services
kubectl get nodes
```

## Haupt-Kubectl-Befehle - k8s CLI

Suchen Sie die verfügbaren k8s-Create-Ressourcen-Befehle:

```sh
kubectl create -h
```

### Deployment erstellen

Erstellen Sie ein nginx-K8s-Deployment mit dem folgenden Befehl:

```sh
# kubectl create deployment NAME –image=image
kubectl create deployment nginx-depl --image=nginx
```

Das Deployment ist eine Blaupause zum Erstellen von Pods. Die grundlegendste
Konfiguration für das Deployment ist der Name und das zu verwendende Image sowie
die Standardwerte von k8s, z. B. Replikate des Pods: `kubectl get replicaset`

### Abstraktion einer Abstraktion

Das Deployment verwaltet den ReplicaSet. Das ReplicaSet verwaltet Replikate des
Pods, und der Pod ist eine Abstraktion des Containers.

### Deployment-Bluprint bearbeiten

Bearbeiten Sie die Deployment-Konfiguration über die kubectl CLI mit dem
folgenden Befehl:

```sh
# kubectl edit deployment NAME
kubectl edit deployment nginx-depl
```

Jetzt können Sie die automatisch generierte Konfiguration mit Standardwerten
bearbeiten. Für die Übung bearbeiten Sie die nginx-Bildversion in die feste
Version. Die Bildversionen sind auf Dockerhub verfügbar. Wählen Sie die Version
mit der geringsten Anzahl von Sicherheitslücken aus. Bearbeiten Sie die Datei
und speichern Sie sie entweder mit dem Befehlsmodus `:wq` oder dem Editor.

[https://hub.docker.com/\_/nginx/tags?page=1](https://hub.docker.com/_/nginx/tags?page=1)

Es wird in etwa so aussehen:

```yaml
# Please edit the object below. Lines beginning with a '#' will be ignored,
# and an empty file will abort the edit. If an error occurs while saving this file will be
# reopened with the relevant failures.
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
    message: ReplicaSet "nginx-depl-6777bffb6f" has successfully progressed.
    reason: NewReplicaSetAvailable
    status: "True"
    type: Progressing
  - lastTransitionTime: "2023-11-24T22:11:27Z"
    lastUpdateTime: "2023-11-24T22:11:27Z"
    message: Deployment has minimum availability.
    reason: MinimumReplicasAvailable
    status: "True"
    type: Available
  observedGeneration: 1
  readyReplicas: 1
  replicas: 1
  updatedReplicas: 1
```

Führen Sie `kubectl get deployment` aus, um das neu erstellte Deployment zu
sehen, eins, das läuft, und das alte, das sich im Abschluss befind

et.

```sh
kubectl get deployment
# nginx-depl-549d9fb597-95lsl   0/1     Pending   0          1m12s
# nginx-depl-6777bffb6f-6fc95   1/1     Running   0          5m
```

Überprüfen Sie den neu erstellten Pod und das ReplicaSet:

```sh
kubectl get pod
# NAME                          READY   STATUS         RESTARTS      AGE
# nginx-depl-6777bffb6f-7hmls   1/1     Running        2 (75s ago)   6m

kubectl get replicaset
# NAME                    DESIRED   CURRENT   READY   AGE
# nginx-depl-549d9fb597   1         1         1       2m
# nginx-depl-6777bffb6f   0         0         0       6m
```

## Pod-Debugging

Der Befehl `kubectl logs` ist nützlich, um die Protokolle der Anwendung im Pod
anzuzeigen:

```sh
# kubectl logs POD_NAME
kubectl logs mongo-depl-558475c797-hz5ng
# Error from server (BadRequest): container "mongo" in pod "mongo-depl-558475c797-hz5ng" is waiting to start: ContainerCreating
```

Wenn der Container nicht gestartet wird, führen Sie einen weiteren
`describe`-Befehl für detailliertere Informationen zum Pod aus:

```sh
# kubectl describe pod POD_NAME
kubectl describe pod nginx-depl-6777bffb6f-7hmls
```

Erstellen Sie ein weiteres Deployment mit MongoDB, um die Protokolle zu sehen:

```sh
kubectl create deployment mongo-depl --image=mongo
kubectl describe pod mongo-depl-558475c797-jsh8g
```

In den Ereignissen finden Sie weitere Informationen über den
Kubernetes-Scheduler und Hilfe beim Debuggen, wenn die Anwendung Probleme hat:

```sh
Conditions:
  Type              Status
  Initialized       True
  Ready             False
  ContainersReady   False
  PodScheduled      True
Volumes:
  kube-api-access-vbplb:
    Type:                    Projected (a volume that contains injected data from multiple sources)
    TokenExpirationSeconds:  3607
    ConfigMapName:           kube-root-ca.crt
    ConfigMapOptional:       <nil>
    DownwardAPI:             true
QoS Class:                   BestEffort
Node-Selectors:              <none>
Tolerations:                 node.kubernetes.io/not-ready:NoExecute op=Exists for 300s
                             node.kubernetes.io/unreachable:NoExecute op=Exists for 300s
Events:
  Type     Reason     Age                From               Message
  ----     ------     ----               ----               -------
  Normal   Scheduled  82s                default-scheduler  Successfully assigned default/mongo-depl-558475c797-hz5ng to minikube
  Normal   Pulled     45s                kubelet            Successfully pulled image "mongo" in 1.628s (34.613s including waiting)
  Normal   Pulled     43s                kubelet            Successfully pulled image "mongo" in 1.352s (1.352s including waiting)
  Normal   Pulled     28s                kubelet            Successfully pulled image "mongo" in 1.404s (1.404s including waiting)
  Normal   Created    28s (x3 over 45s)  kubelet            Created container mongo
  Normal   Started    28s (x3 over 44s)  kubelet            Started container mongo
  Warning  BackOff    14s (x4 over 42s)  kubelet            Back-off restarting failed container mongo in pod mongo-depl-558475c797-hz5ng_default(bcb9b1e4-49eb-45d3-a501-3b743cc5efcb)
  Normal   Pulling    1s (x4 over 79s)   kubelet            Pulling image "mongo"
```

Ein weiterer nützlicher Befehl zum Debuggen des Pods besteht darin, den
Container im interaktiven Modus über die CLI zu inspizieren und Befehle
auszuführen:

```sh
kubectl exec -it POD_NAME -- bin/bash
```

### Deployment löschen

Das Löschen des Deployments löscht den Pod zusammen mit seinem ReplicaSet und
der Pod-Konfiguration:

```sh
kubectl get deployments
# NAME         READY   UP-TO-DATE   AVAILABLE   AGE
# mongo-depl   0/1     1            0           5m
# nginx-depl   1/1     1            1           6m

# kubectl delete deployment NAME
kubectl delete deployment mongo-depl
# deployment.apps "mongo-depl" deleted
```

## Kubernetes-Konfigurationsdateien

Da es so viele Konfigurationsoptionen gibt, ist es unpraktisch, sie alle über
die Befehlszeile hinzuzufügen. Die Konfiguration für Kubernetes-Komponenten kann
über Kubernetes YAML-Dateien und den `apply`-Befehl verwaltet werden. Der Befehl
`apply` erstellt und aktualisiert die Kubernetes-Konfiguration.

```sh
kubectl apply -f nginx-deployment.yaml
```

Die grundlegende Konfiguration für ein Deployment sieht folgendermaßen aus:

```yaml
apiVersion: apps/v1
kind: Deployment # Typ der Konfiguration
metadata:
  name: nginx-deployment # Name des Deployments, der für den Service verwendet wird
  labels:
    app: nginx
spec: # Spezifikation für das Deployment
  replicas: 2
  selector:
    matchLabels:
      app: nginx # Das Deployment verbindet alle Konfigurationen mit einem Label für den Anwendungsnamen
  template:
    metadata:
      labels:
        app: nginx # Pods greifen über das Template auf das Label zu
    spec: # Spezifikation für den Pod
      containers:
      - name: nginx 
        image: nginx:1.25 
        ports:
        - containerPort: 8080
```

Jede Kubernetes-Konfigurationsdatei hat drei Teile: Metadaten der Komponente,
wie z. B. der Anwendungsname. Die Spezifikation enthält die Konfiguration für
die k8s-Komponente. Der Status wird von Kubernetes automatisch generiert. Es
vergleicht immer den aktuellen und den gewünschten Zustand. Wenn die Zustände
der Anwendung nicht übereinstimmen, versucht Kubernetes, sie basierend auf den
Statusinformationen aus etcd zu korrigieren.

```sh
kubectl apply -f nginx-service.yaml
```

```yaml
apiVersion: v1 # API-Versionen sind für jede k8s-Komponente unterschiedlich
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx # Verbindet das Label des Deployments und seiner Pods
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
```

Das Format der Konfigurationsdateien ist YAML und hat strenge Einrückungsregeln.
Es ist normalerweise Teil der Infrastruktur als Code oder der
Bereitstellungsdateien eines einzelnen Projekts.

### Labels und Selektoren

Die Verbindung zwischen den k8s-Komponenten wird durch Labels und Selektoren
hergestellt. Metadaten enthalten Labels, und die Spezifikation enthält
Selektoren. In der Spezifikation des Service definiert der Selektor eine
Verbindung zwischen dem Service und dem Deployment sowie seinen Pods.

### Service-Port

Jeder Service hat einen Port, über den er erreichbar ist. Wenn andere Dienste,
z. B. ein DB-Dienst, mit dem nginx-Dienst verbunden sind, erfolgt dies auf
Port 80. Jeder Dienst muss wissen, an welchen Pod er die Anfrage weiterleiten
soll und auf welchem Port der Pod lauscht.

### Konfigurationsdateien anwenden

```sh
kubectl apply -f nginx-deployment.yaml
kubectl apply -f nginx-service.yaml
```

#### Wie überprüft man, ob der Service die korrekten Informationen über die Pods hat?

```sh
kubectl describe service nginx-service # Statusinformationen und Endpunkte
```

Endpunkte enthalten IP-Adressen und Ports der Pods, an die der Service die
Anfrage weiterleiten muss. Dies muss mit der Spalte "IP" der Pods
übereinstimmen.

```sh
kubectl get pod -o wide
```

Überprüfen Sie schließlich den Status des Deployments anhand der aktualisierten
Konfiguration.

```sh
kubectl get deployment nginx-deployment -o yaml
```

### Konfigurationsdateien löschen

```sh
kubectl delete deployment -f nginx-deployment.yaml
```

Im zweiten Teil des Workshops werde ich Ihnen in der Praxis zeigen, wie Sie zwei
Anwendungen mit Kubernetes bereitstellen können, wobei eine Anwendung ein Server
ist, der mit einem anderen Pod kommuniziert, um auf Daten aus der Datenbank
zuzugreifen.
