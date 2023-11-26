# Kubernetes Fortgeschrittene Konzepte

Bisher haben wir gelernt, was Kubernetes ist, warum Black Friday-Verkäufe erfolgreich sind, und wie man grundlegende Kubernetes-Anwendungen erstellt und bereitstellt.
Kubernetes unterstützt das Management von Infrastruktur und Entwicklung sowohl für große Organisationen als auch für die Zusammenarbeit in kleineren Teams.
Der Zugriff auf und das Management mehrerer Kubernetes-Anwendungen innerhalb eines Clusters ist viel einfacher, sobald Sie mehr über die Komponenten und die Architektur von Kubernetes erfahren haben.
In diesem Artikel erfahren Sie mehr über das Management von Kubernetes-Clustern und das Skalieren der Infrastruktur mit mehreren Kubernetes-Anwendungen.

## K8s Namensräume - Komponenten organisieren

In einem Kubernetes-Cluster ist es möglich, Ressourcen in Namensräumen zu organisieren, wobei mehrere Namensräume ähnlich zu Clustern innerhalb des Clusters existieren können.
Standardmäßig bietet Kubernetes standardmäßig Namensräume an. Der Minikube-Cluster hat vier Namensräume:

```sh
kubectl get namespaces
# NAME                   STATUS   AGE
# default                Active   11h - Ressourcen, die erstellt wurden, befinden sich hier
# kube-node-lease        Active   11h - bestimmt die Verfügbarkeit des Knotens
# kube-public            Active   11h - öffentlich zugängliche Daten, Clusterinformationen
# kube-system            Active   11h - System-Masterprozess, z. B. kubectl cluster-info
# kubernetes-dashboard   Active   5h8m - spezifisch für Minikube
```

### Einen neuen Namensraum erstellen

```sh
kubectl create a namespace my-namespace # oder Konfigurationsdateien verwenden
```

### Warum neue Namensräume erstellen?

Mit nur Standardnamensräumen werden alle Ressourcen aus komplexen Anwendungen in mehreren Bereitstellungen enthalten, und das Erstellen von Pods mit den Ressourcen wird bald schwierig zu verwalten.
#### Beobachtbarkeit

Namensräume sind im Allgemeinen nützlich für die Überwachung von Ressourcen in diesen Gruppen. Wenn der Namensraum über dedizierten CPU-, RAM- und Speicherplatz verfügt, wird es einfacher, zwischen den Anwendungen zu unterscheiden und die Grenzen mit Ressourcenkontingenten in diesen Ressourcengruppen zu arrangieren.

#### Organisation der Arbeit des Teams

Es ermöglicht das Bereitstellen unterschiedlicher Ressourcen pro Namensraum, z. B. Datenbank oder nginx-ingress.

Ein Namensraum pro Anwendung reduziert das Risiko von Bereitstellungskonflikten und beschränkt die Engineering-Teams daran, versehentlich vorhandene Bereitstellungen zu überschreiben und die Arbeit zu unterbrechen.

Der Namensraum gibt den Teams auch nur den Teamzugriff, und keine anderen Teams haben Zugriff, um Ressourcen aus den Namensräumen anderer Teams zu aktualisieren, zu erstellen oder zu löschen.

#### Ressourcenteilung

Namensräume sind gut für die Ressourcenteilung. Wenn die Staging- und Entwicklungsumgebungen im selben Cluster sind, kann der nginx-ingress-Controller oder Elastic Stack für die Anmeldung in einem Cluster bereitgestellt und für beide Umgebungen verwendet werden.

Ein weiterer Anwendungsfall ist das Blue/Green Deployment. Wenn der Cluster zwei Versionen einer Produktion benötigt, eine aktive und die folgende, auch Pre-Prod genannt, können diese Namensräume die gemeinsam genutzten Ressourcen wiederverwenden.

### Merkmale von Namensräumen

Die Ressourcen können im Allgemeinen nicht über Namensräume hinweg geteilt werden, außer für einen Service. ConfigMap kann auf einen Service verweisen, der schließlich in einem Pod verwendet wird. In der Definition von ConfigMap gibt der Service auch den Namensraum an.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
data:
  database_url: mongodb-service.database # Dienstname gefolgt von Namensraum
```

Einige Ressourcen können nicht isoliert werden, wie z. B. der Volume- und Node. Es wird innerhalb des Clusters zugänglich sein. Finden Sie heraus, welche anderen Ressourcen keinem Namensraum zugeordnet sind:

```sh
kubectl api-resources --namespaced=false
```

### Wie weise ich Ressourcen einem Namensraum zu?

```sh
kubectl apply -f configmap.yaml -n=my-namespace # oder –namespace=my-namespace
```

Eine andere Möglichkeit besteht darin, das Zielnamensraumziel in Konfigurationsdateien einzuschließen:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mongodb-configmap
  namespace: my-namespace
data:
  database_url: mongodb-service.database # Dienstname gefolgt von Namensraum
```

Nach Zuweisung der Ressource zum Namensraum können Sie sie nicht mehr in der Standardgruppe finden.

```sh
kubectl get configmap # wird nichts mit -n=default finden
kubectl get configmap -n my-namespace # findet die Ressource im Namensraum
```

### Wie ändere ich den aktiven (Standard-) Namensraum?

Das CLI-Tool kubectx installiert die CLI-Erweiterung kubens, mit der der aktive Namensraum bearbeitet werden kann.

```sh
kubens my-namespace
# Kontext "minikube" geändert
# Aktiver Namensraum ist "my-namespace"
```

Nun können Sie kubectl ausführen, ohne den Namensraum zu den Befehlen hinzuzufügen.

## K8s Ingress

Ingress ist für das Zuordnen der IP-Adresse des externen Dienstes zur Domäne und zum sicheren Protokoll verantwortlich.

### Konfiguration des externen Dienstes

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
      port: 8081 # Dienstport
      targetPort: 8081 # Containerport des Pods
      nodePort: 30000 # Öffentlicher IP-Adressport öffnen
```

### Ingress-Konfiguration

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myingress
  labels:
    name: myingress
spec:
  rules:
  - host: <Host> # example.com, # die Domäne auf die IP-Adresse des Nodes abbilden. Es wäre eine IP-Adresse des Nodes innerhalb des Clusters oder ein konfigurierter Serverhost außerhalb des Clusters.
    Http: 
      paths:
      - pathType: Prefix
        path: "/"
        backend: # Anforderung an den internen Dienst weiterleiten
          service:
            name: <Service> # leitet an internen Dienst weiter, z. B. mongo-express-service
            port: 
              number:

 <Port> # Interner Dienstport z. B. 8081
```

### Wie konfiguriert man Ingress?

Ingress-Routen erfordern den Ingress-Controller, der ein weiteres Set von Controller-Pods ist, die Auswertung und Verarbeitung von Ingress-Regeln durchführen und die Weiterleitung verwalten.

Es gibt viele Ingress-Controller, aber einer, der häufig in Kubernetes verwendet wird, ist der Nginx Ingress Controller.
Liste anderer https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/.

Cloud-native Umgebungen haben oft von Cloud-Anbietern implementierte Cloud Load Balancer. Der Vorteil liegt in minimalem Aufwand bei der Einrichtung zur Weiterleitung von Anfragen an den Kubernetes-Cluster.

In einer Bare-Metal-Umgebung gibt es verschiedene Möglichkeiten, es zusammen mit einem Einstiegspunkt zu konfigurieren - in einem Cluster oder auf dem Server außerhalb des Clusters. Ein Ansatz ist ein externer Proxy-Server, der die Rolle eines Lastenausgleichs übernimmt. Es ist ein sichererer Ansatz, da die Ports und IP-Adressen für die Kommunikation mit dem Proxy-Server geöffnet sind, aber nicht von außerhalb des Clusters zugänglich sind.

#### Nginx Ingress auf dem Ingress-Controller auf Minikube einrichten

```sh
minikube addons enable ingress 
```

Es implementiert und konfiguriert automatisch den Nginx-Controller im Minikube-Cluster.

```sh
kubectl get pod -n kube-system
```

Erstellen Sie nun eine Ingress-Regel, die der Controller auswerten kann. Sie wird für das Kubernetes-Dashboard-Component erstellt.

### Einrichten des Minikube-Dashboards mit URL-Domänennamen

Für dieses Beispiel richten wir eine kleine Ingress-Konfiguration ein, um Anfragen an den internen Dienst weiterzuleiten.

Minikube hat integrierte Unterstützung für das Kubernetes Dashboard UI. Es hat bereits einen internen Dienst und Pod erstellt https://github.com/kubernetes/dashboard 

```sh
kubectl get ns
kubectl get all -n kubernetes-dashboard
# NAME                                             READY   STATUS    RESTARTS        AGE
# pod/dashboard-metrics-scraper-7fd5cb4ddc-n4d2t   1/1     Running   2 (6m15s ago)   6h41m
# pod/kubernetes-dashboard-8694d4445c-jcs2q        1/1     Running   3 (6m15s ago)   6h41m

# NAME                                TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)    AGE
# service/dashboard-metrics-scraper   ClusterIP   10.110.99.160   <none>        8000/TCP   6h41m
# service/kubernetes-dashboard        ClusterIP   10.104.219.39   <none>        80/TCP     6h41m
```

Erstellen Sie die Ingress-Konfigurationsdatei

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

Wenden Sie die Konfiguration an

```sh
kubectl apply -f nginx-ingress.yaml
# ingress.networking.k8s.io/dashboard-ingress created
kubectl get ingress -n kubernetes-dashboard
# NAME                CLASS   HOSTS               ADDRESS        PORTS   AGE
# dashboard-ingress   nginx   k8s-dashboard.com   192.168.66.2   80      46s
```

Fügen Sie die IP-Adresse hinzu, um sie der Host-Domäne lokal zuzuordnen

```sh
sudo vim /etc/hosts
# 192.168.66.2    k8s-dashboard.com
```

Jetzt können Sie auf das Kubernetes-Dashboard über den externen Ingress mit der Adresse k8s-dashboard.com zugreifen.

![](https://images.prismic.io/syntia/6031298c-bb94-4f5a-a897-f73f1a32154b_dashboard.png?auto=compress,format)

#### Standard-Backend für Ingress

Wird dem standardmäßigen Kubernetes-Dashboard auf den http-Port 80 zugeordnet. Immer wenn eine Anfrage in den K8s-Cluster kommt, die keinem Backend-Dienst zugeordnet ist, wird das Standard-Backend diese Anfragen behandeln.

Zum Beispiel wird bei einem nicht konfigurierten Pfad http://k8s-dashboard.com/test „404 Seite nicht gefunden“ zurückgegeben. Um eine benutzerdefinierte Antwort zu erstellen, würde man einen Pod und einen Service erstellen, auf den der Ingress verweist:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: kubernetes-dashboard # Dienstname aus Ingress
spec:
  selector:
    app: default-response-app
  ports:
    - protocol: TCP
      port: 80 # Dienstport aus Ingress
      targetPort: 8080 
```

### Konfiguration des Standard-Ingress

```sh
kubectl describe ingress dashboard-ingress -n kubernetes-dashboard
# Name:             dashboard-ingress
# Labels:           name=kubernetes-dashboard
# Namespace:        kubernetes-dashboard
# Address:          192.168.66.2
# Ingress Class:    nginx
# Default backend:  <default>
# Rules:
  # Host               Path  Backends
  # ----               ----  --------
  # k8s-dashboard.com  
  #                   /   kubernetes-dashboard:80 (10.244.0.33:9090)
# Annotations:         <none>
# Events:
#  Type    Reason  Age                    From                      Message
#  ----    ------  ----                   ----                      -------
#  Normal  Sync    9m30s (x2 over 9m48s)  nginx-ingress-controller  Scheduled for sync
```

## Routing für Anwendungen im Kubernetes-Cluster definieren

### Mehrere Pfade

Definition mehrerer Pfade für denselben Host. Für verschiedene Pfade ist es möglich, Anfragen an verschiedene interne Dienste und mehrere Anwendungen von einem Ingress aus zugänglich zu machen:

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
### Subdomains
Eine Anwendung kann Subdomänen haben, um Anfragen an verschiedene Anwendungen von der URL-Hostadresse der Subdomäne weiterzuleiten:
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
### Konfiguration des TLS-Zertifikats
Die Weiterleitung von Https im Ingress erfolgt einfach in der Ingress-Konfiguration.
Zwei Anforderungen sind TLS-Hosts und der Secret-Name über den Regeln. Der Secret-Name ist die Referenz auf das im Cluster erstellte Secret, das das TLS-Zertifikat enthält.
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
Das Secret muss im selben Namespace wie das Ingress-Komponente erstellt werden, um darauf verweisen zu können.
```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: k8s-dashboard-tls
type: kubernetes.io/tls
data:
  tls.crt: base64 codiertes Zertifikat
  tls.key: base64 codierter Schlüssel
```

## Helm-Paketmanager
Helm ist ein Paketmanager für Kubernetes. Es ist praktisch, YAML-Dateien zu paketieren und sie in Helm-Repositories zu verteilen. YAML-Dateien werden einmal als Helm-Charts erstellt, sodass sie von anderen Teammitgliedern für Bereitstellungen im Kubernetes-Cluster wiederverwendet werden können.
Häufig verwendete Bereitstellungen sind Frontend-Anwendungen, Datenbankanwendungen, Elasticsearch, MongoDB, MySQL, Überwachungsanwendungen mit Prometheus.
Mit einem einzigen Befehl
```sh
helm install CHART_NAME
```
Verwendet der Helm-Installationsbefehl die Konfiguration, die bereits zuvor für andere Anwendungen aus gemeinsamen Chart-Dateien im Helm-Repository erstellt wurde.

Es gibt auch öffentliche Registrierungen für die Helm-Charts, die wiederverwendet werden können:
https://helm.sh/docs/helm/helm_search_hub/

### Templating Engine
Helm ist eine Templating-Engine, bei der die Konfigurationen für Bereitstellungen und Dienste fast gleich sein können, außer dass der Anwendungsname und die Version unterschiedlich sind, Docker-Image-Name und Versionsangaben.
Es gibt eine gemeinsame Konfigurationsvorlage für die Bereitstellungen, die in den Vorlagen geschrieben ist. Die Werte, die sich ändern sollen, haben Platzhalter anstelle von Werten.
```yaml
# Template YAML-Konfiguration
apiVersion: v1
kind: ConfigMap
metadata:
  name: {{ .Values.Name }}-configmap
spec:
  containers:
  - name: {{ .Values.container.name }}
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
Die gleichen Konfigurationsdateien können verwendet werden, um Anwendungen über verschiedene Cluster für unterschiedliche Umgebungen bereitzustellen, indem Staging-, Entwicklungs- und Produktionsumgebungen gekennzeichnet werden.

### Helm-Repository-Struktur
Helm erwartet eine Struktur, die folgendermaßen aussieht:
```markdown
helm_repository/
  Chart.yaml          # Eine YAML-Datei mit Informationen zum Chart
  LICENSE             # OPTIONAL: Eine einfache Textdatei mit der Lizenz für das Chart
  README.md           # OPTIONAL: Eine menschenlesbare README-Datei
  values.yaml         # Die Standardkonfigurationswerte für dieses Chart
  values.schema.json  # OPTIONAL: Ein JSON-Schema, um der values.yaml-Datei eine Struktur aufzuerlegen
  charts/             # Ein Verzeichnis mit allen Charts, von denen dieses Chart abhängt.
  crds/               # Benutzerdefinierte Ressourcendefinitionen
  templates/          # Ein Verzeichnis mit Vorlagen, die zusammen mit Werten gültige Kubernetes-Manifestdateien generieren.
  templates/NOTES.txt # OPTIONAL: Eine einfache Textdatei mit kurzen Anwendungshinweisen
```
Weitere Informationen zu Helm Chart-Templates: https://helm.sh/docs/chart_template_guide/