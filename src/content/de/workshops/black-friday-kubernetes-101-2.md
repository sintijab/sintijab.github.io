---
description: "Kubernetes 101 - k8s Anwendungssetup"
pubDate: "Nov 25, 2023"
heroImage: "https://images.prismic.io/syntia/04f6f440-e277-45f8-8772-5f908a3e5e0a\_Screenshot+2023-11-25+at+18.03.59.png?auto=compress,format"
author: "Syntia"
categories: "Workshops, Cloud Infrastruktur, Netzwerke, Kubernetes"
subcategories: "Kommunikationsprotokolle, Transmission Control Protocol, Internetprotokoll, Netzwerkschicht, Netzwerkschnittstelle, Virtuelles Netzwerk"
---

In diesem Workshop lernen wir, wie man MongoDB und Mongo Express bereitstellt. Dies kann auf jede andere Konfiguration angewendet werden, um stateless Kubernetes-Anwendungen zu erstellen. Wir gehen durch die folgenden Schritte:

1. Erstelle MongoDB-Pod mit Kubernetes-Deployment.
   
2. Erstelle einen internen Service. Ein interner Service beschränkt den Zugriff auf den Pod und erlaubt nur Anfragen von anderen Pods im gleichen Cluster.
   
3. Erstelle das Mongo Express Deployment. Mongo Express wird über URL und Anmeldedaten (Benutzername und Passwort für die Datenbank) eine Verbindung zur Datenbank herstellen. Diese Informationen werden über Umgebungsvariablen in der Deployment-Konfiguration bereitgestellt.
   
4. Erstelle eine ConfigMap, die die Datenbank-URL und ein Secret für Anmeldedaten enthält, und verweise darauf in der Deployment-Konfiguration.
   
5. Der externe Service ermöglicht es externen Anfragen, mit dem Pod zu kommunizieren. Die URL wird das http-Protokoll, die IP-Adresse des Nodes und den Port des externen Service enthalten.

## Die Kommunikation über k8s-Komponenten

Die Anfrage beginnt beim Browser und wird über den externen Service von Mongo Express an den Mongo Express Pod weitergeleitet. Der Pod stellt eine Verbindung zum MongoDB-Internen Service über die Datenbank-URL her und authentifiziert sich bei MongoDB mit den Anmeldedaten.

### Kubernetes-Architekturdiagramm
![](https://images.prismic.io/syntia/e1d6a504-2124-4922-ac8c-361974be8f0e_default.png?auto=compress,format)

### Liste der erstellten Kubernetes-Komponenten

Nach dem Löschen des Deployments und des Services aus dem ersten Workshop ist der Cluster leer.

```sh
kubectl get all

# NAME                     TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)   AGE
# service/kubernetes       ClusterIP   10.96.0.1        <none>        443/TCP   30m
```

Nach dem Erstellen des Deployments und des Services für eine Anwendung sehen Sie die folgenden k8s-Komponenten:

```sh
kubectl get all | grep mongodb # nach dem Namen Ihrer App filtern

# pod/mongodb-deployment-7bd745589d-pt2kl   1/1     Running   0       70m
# service/mongodb-service   ClusterIP       10.102.163.220  <none>        27017/TCP   15m
# deployment.apps/mongodb-deployment        1/1     1         1       70m
# replicaset.apps/mongodb-deployment-7bd745589d   1       1         1       70m
```

## Erstelle MongoDB Deployment/Pod

Erstelle eine Deployment-Datei entweder mit einem Editor oder über die Befehlszeile.

```sh
kubectl create deployment mongodb-deployment --image=mongo
```

Bearbeite nun das Deployment und entferne die Standardkonfiguration.

```sh
kubectl edit deployment mongodb-deployment
```

Im interaktiven Modus des vim-Editors lösche die mehrzeilige Konfiguration mit den folgenden Befehlen:

```sh
# Syntax: \[start\],\[end\]d

:.,$d # alle Zeilen nach dem Cursor
:.,1d # alle Zeilen über dem Cursor
:3,10d # entferne Zeilen zwischen 3 und 10
```

Das Deployment sollte in etwa so aussehen:

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
    spec: # Pods, die das Deployment erstellt
      containers:
      - image: mongo
        name: mongodb
```

### Verbindung zu MongoDB von einem anderen Docker-Container

Konfiguration für das MongoDB-Image [https://hub.docker.com/\_/mongo](https://hub.docker.com/_/mongo)

Der MongoDB-Server im Image hört auf dem standardmäßigen MongoDB-Port 27017.

#### Umgebungsvariablen

Die Informationen zu Umgebungsvariablen und Ports sind im Docker-Hub verfügbar.

Für die Authentifizierung der Datenbank verwenden wir zwei Umgebungsvariablen:

MONGO\_INITDB\_ROOT\_USERNAME, MONGO\_INITDB\_ROOT\_PASSWORD

Fügen Sie diese der Deployment-Konfiguration hinzu:

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

Wir werden die k8s Secrets erstellen, in denen diese Umgebungsvariablen referenziert werden, damit niemand darauf aus dem Code-Repository zugreifen kann.

### Erstellen Sie das Kubernetes Secret

Wenn Sie VSCode zum Erstellen der K8s-Konfigurationsdateien verwenden, sieht das automatische Ausfüllen von YAML-Dateien über das JSON Kubernetes-Schema ähnlich aus:

```yaml
# secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: mysecret
type: Opaque # Typ des Schlüsselwert-Secrets, andere sind für TLS-Zertifikate und andere Typen
data:
  password: <Password>
```

Korrigieren Sie den Namen und die Secret-Daten. Beachten Sie, dass Secret-Werte keine Klartextdaten sind, sondern base64-kodierte Werte.

Die Daten im Secret-Element zu speichern, macht sie nicht automatisch sicher.

Es gibt eingebaute Mechanismen wie die Verschlüsselung für grundlegende Sicherheit, die standardmäßig nicht aktiviert sind.

```sh
echo -n 'user' | base64 # Wert verschlüsseln
```

Kopieren Sie dies und fügen Sie es in die Secret-Datenwerte ein:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: mongodb-secret
type: Opaque
data:
  mongo-root-username: dXNlcg==
  mongo-root-password: cGFzc3c=
  mongo-basic-username: dXNlcg==
  mongo-basic-password: cGFzc3c=
```

Das Secret muss zuerst erstellt werden, bevor Sie ein Deployment in Kubernetes erstellen, um diese Secret-Werte verwenden zu können.

```sh
kubectl apply -f mongo-secret.yaml
kubectl get secret
# NAME           TYPE     DATA   AGE
# mongodb-secret Opaque   2      24s
```

### Erstellen Sie ein Deployment



Bearbeiten Sie nun die Deployment-Konfiguration, um das neue Secret zu verwenden.

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
          valueFrom: # Werte aus dem Secret referenzieren
            secretKeyRef:
              name: mongodb-secret
              key: mongo-root-username
        - name: MONGO\_INITDB\_ROOT\_PASSWORD
          valueFrom:  # Werte aus dem Secret referenzieren
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

Erstellen Sie das Deployment mit dieser Konfiguration:

```sh
kubectl apply -f mongo-deployment.yaml
kubectl get all

NAME                         READY   STATUS    RESTARTS   AGE
pod/mongodb-deployment-7bd745589d-pt2kl   1/1     Running   0          81s

NAME                        TYPE        CLUSTER-IP        EXTERNAL-IP   PORT(S)     AGE
service/kubernetes          ClusterIP   10.96.0.1         <none>        443/TCP     3h40m

NAME                                  READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/mongodb-deployment   1/1     1            1           82s

NAME                                     DESIRED   CURRENT   READY   AGE
replicaset.apps/mongodb-deployment-7bd745589d   1         1         1       81s
```

Nun sollten der Pod, das Deployment und der ReplicaSet erstellt worden sein.

#### Fehlerbehebung

Wenn die Container-Erstellung langsam ist und `kubectl get pod` den Status "ContainerCreating" anzeigt, können Sie den Fortschritt mit dem Befehl `kubectl get pod --watch` überwachen oder prüfen, ob es ein Problem mit dem Befehl `kubectl describe pod POD_NAME` gibt.

```sh
kubectl get pod
# NAME                       READY   STATUS    RESTARTS   AGE
# mongodb-deployment-7bd745589d-pt2kl   1/1     Running   0          2m13s
```

### Kubernetes-Service-Typen

```sh
kubectl create service --help
# Aliase:
# service, svc
# Verfügbare Befehle:
# clusterip       Erstelle einen ClusterIP-Service
# externalname    Erstelle einen ExternalName-Service
# loadbalancer    Erstelle einen LoadBalancer-Service
# nodeport        Erstelle einen NodePort-Service
# Verwendung:
# kubectl create service [flags] [Optionen]
```

#### ClusterIP

ClusterIP ist der Standard-Service-Typ. Kubernetes weist dem ClusterIP-Service eine clusterinterne IP-Adresse zu. Dadurch ist der Service nur innerhalb des Clusters erreichbar, und es sind keine anderen Anfragen an Service-Pods von außerhalb des Clusters zugelassen. Sie können optional die Cluster-IP-Adresse in der Servicedefinitionsdatei festlegen.

ClusterIP-Service ist der häufigste Service für die Kommunikation zwischen Front-End- und Back-End-Anwendungen oder zum Beispiel, wenn eine Mikrodienstanwendung, die Daten verarbeitet und sie an eine andere Mikrodienstanwendung sendet, einen ClusterIP-Service benötigt, um die Kommunikation zu beschränken.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-backend-service
spec:
  type: ClusterIP # Optional (Standard), andere Optionen sind NodePort oder LoadBalancer
  clusterIP: 10.10.0.1 # im Bereich der Cluster-IP-Adresse
  ports:
  - name: http
    protocol: TCP
    port: 80
    targetPort: 8080
```

#### NodePort

NodePort-Service ist eine Erweiterung von ClusterIP-Services, die externe Konnektivität zur Kubernetes-Anwendung ermöglicht. Mit NodePort verwendet Kubernetes einen bestimmten Port, der den Datenverkehr an den entsprechenden ClusterIP-Service weiterleitet, der auf dem Knoten ausgeführt wird.

Diese Services erlauben die Kommunikation von außerhalb des Clusters, wie z.B. von Webanwendungen oder APIs. Um den NodePort verfügbar zu machen, richtet Kubernetes eine Cluster-IP-Adresse ein, genauso wie wenn Sie einen Service vom Typ: ClusterIP angefordert hätten. Die Portnummer von Kubernetes ist vordefiniert und kann benutzerdefiniert oder im Bereich von 30000-32767 liegen.

#### LoadBalancer

LoadBalancer-Services sind für Anwendungen gedacht, die hohe Verkehrsvolumina verarbeiten müssen, wie Webanwendungen oder APIs. Er stellt den Service extern über einen externen Lastenausgleicher zur Verfügung. Kubernetes bietet direkt keine Lastenausgleichskomponente an; Sie müssen eine bereitstellen oder Ihren Kubernetes-Cluster mit einem Cloud-Anbieter integrieren.

Weitere Informationen zu Services: [https://kubernetes.io/docs/concepts/services-networking/service/](https://kubernetes.io/docs/concepts/services-networking/service/)

### Erstelle einen internen Service

Um einen Service hinzuzufügen, erstellen Sie eine neue YAML-Datei oder fügen Sie ihn in die Konfiguration der Bereitstellungen ein. In YAML können mehrere Dokumente in einer Datei mit einem Dateitrennzeichen aus drei Strichen enthalten sein.

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
      port: 27017 # Service-Port
      targetPort: 27017 # Pod- oder Container-Port
```

Wenden Sie nun die Änderungen sowohl auf das Deployment als auch auf den Service an:

```sh
kubectl apply -f mongo-deployment.yaml
service/mongodb-service created
```

Wenn Sie versuchen, den neuen Service auf den Pod anzuwenden und sich entscheiden, den Namen der Anwendung nach der Erstellung des Deployments zu ändern, schlägt die Beschriftung mit Fehlern im unveränderlichen Zustand fehl, wie zum Beispiel:

```sh

The Deployment "mongodb-deployment" is invalid: spec.selector: Invalid value: v1.LabelSelector{MatchLabels:map\[string\]string{"app":"mongodb"}, MatchExpressions:\[\]v1.LabelSelectorRequirement(nil)}: field is immutable

```

Certainly! Here is the translated Markdown text in German:

Überprüfen Sie den neu erstellten ClusterIP-Dienst mit dem Befehl:

```sh

kubectl get service

# NAME              TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)     AGE

# kubernetes        ClusterIP   10.96.0.1        <none>        443/TCP     4h38m

# mongodb-service   ClusterIP   10.102.163.220   <none>        27017/TCP   4m49s

```

Erhalten Sie weitere Informationen zum Dienst:

```sh

kubectl describe service mongodb-service

# Name:              mongodb-service

# Namespace:         default

# Labels:            <none>

# Annotations:       <none>

# Selector:          app=mongodb-deployment

# Type:              ClusterIP

# IP-Familienrichtlinie:  SingleStack

# IP-Familien:       IPv4

# IP:                10.102.163.220

# IPs:               10.102.163.220

# Port:              <unset>  27017/TCP

# TargetPort:        27017/TCP

# Endpoints:         10.244.0.6:27017

# Session Affinity:  None

# Events:            <none>

```

Endpoint ist eine IP-Adresse eines Pods und der Port, auf dem die Anwendung im Pod lauscht. Überprüfen Sie, ob der Dienst mit dem richtigen Pod verbunden ist, indem Sie die IP-Adresse eines Pods nachschlagen:

```sh

kubectl get pod -o wide

NAME                                  READY   STATUS    RESTARTS   AGE   IP           NODE       NOMINATED NODE   READINESS GATES

mongodb-deployment-7bd745589d-pt2kl   1/1     Running   0          65m   10.244.0.6   minikube   <none>           <none>

```

## Erstellen Sie den Mongo Express Deployment/Pod

Die Konfiguration des Deployments wird ähnlich wie die von MongoDB aussehen:

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

Bildinformationen zu Port und Umgebungsvariablen: [https://hub.docker.com/\_/mongo-express](https://hub.docker.com/_/mongo-express) 

Die Mongo Express-Anwendung im Container startet mit dem Port 8081. In Mongo Express müssen Umgebungsvariablen festgelegt werden:

*   für welche Datenbank die Anwendung eine Verbindung herstellen soll, d.h. MongoDB-Adresse / interner Dienst - suchen Sie die Umgebungsvariable ME\_CONFIG\_MONGODB\_SERVER im Docker Hub, die aus der ConfigMap referenziert wird.
    
*   Anmeldeinformationen zur Authentifizierung der Verbindung, dies sind ME\_CONFIG\_MONGODB\_ADMINUSERNAME und ME\_CONFIG\_MONGODB\_ADMINPASSWORD, die aus Secrets referenziert werden
    

  

### Erstellen Sie die ConfigMap

Da wir die ConfigMap benötigen, um auf die URL des internen MongoDB-Dienstes zu verweisen, muss sie vor dem Erstellen eines Mongo Express Deployments erstellt werden.

```yaml

apiVersion: v1

kind: ConfigMap

metadata:

  name: mongodb-configmap

data:

  database\_url: mongodb-service #Service-Name

```

Wenden Sie die ConfigMap auf den k8s-Zustand an:

```sh

kubectl apply -f mongo-configmap.yaml

```

Die ConfigMap wird auf Deployment-Umgebungsvariablen ähnlich wie Secrets referenziert:

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

          - name: ME\_CONFIG\_MONGODB\_ADMINUSERNAME

            valueFrom:

                secretKeyRef:

                  name: mongodb-secret

                  key: mongo-root-username

          - name: ME\_CONFIG\_MONGODB\_ADMINPASSWORD

            valueFrom:

                secretKeyRef:

                  name: mongodb-secret

                  key: mongo-root-password

          - name: ME\_CONFIG\_MONGODB\_SERVER

            valueFrom:

                configMapKeyRef:

                  name: mongodb-configmap

                  key: database\_url

```

### Erstellen Sie den Pod für Mongo Express

```sh

kubectl apply -f mongo-express.yaml

# deployment.apps/mongo-express created

kubectl get pod

# NAME                                  READY   STATUS    RESTARTS   AGE

# mongo-express-cbc554bd4-86h75         1/1     Running   0          26s

# mongodb-deployment-68f8db65c6-hst86   1/1     Running   0          24m

kubectl logs mongo-express-cbc554bd4-86h75 #Überprüfen Sie, ob die Datenbank verbunden ist

# Keine benutzerdefinierte config.js gefunden, lade config.default.js

# Willkommen bei mongo-express

#------------------------

  
  

# Mongo Express Server lauscht unter http://0.0.0.0:8081

# Der Server ist offen, um Verbindungen von jedem (0.0.0.0) zuzulassen

```

### Erstellen Sie einen externen Dienst

Fügen Sie einen externen Dienst vom Typ LoadBalancer hinzu, um auf Mongo Express aus dem Browser zuzugreifen. Es wird zur Konfiguration des Deployments hinzugefügt:

```yaml

# mongo-express.yaml EOF

\---

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

      targetPort: 8081 # Pod- oder Containerport

      nodePort:

 30000 # öffnen Sie den externen IP-Adressport

```

Der Typ LoadBalancer, auch als externer Dienst bekannt, akzeptiert externe Anfragen, indem er dem Dienst eine externe IP-Adresse zuweist.

```sh

kubectl apply -f mongo-express.yaml

kubectl get service

# NAME                    TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE

# kubernetes              ClusterIP      10.96.0.1        <none>        443/TCP          5h32m

# mongo-express-service   LoadBalancer   10.109.105.73    <pending>     8081:30000/TCP   9s

# mongodb-service         ClusterIP      10.102.163.220   <none>        27017/TCP        58m

```

In Minikube wird die externe IP-Adresse mit einem zusätzlichen Befehl zugewiesen:

```sh

minikube service mongo-express-service

# |-----------|-----------------------|-------------|---------------------------|

# | NAMESPACE |         NAME          | TARGET PORT |            URL            |

# |-----------|-----------------------|-------------|---------------------------|

# | default   | mongo-express-service |        8081 | http://123.123.12.2:30000 |

# |-----------|-----------------------|-------------|---------------------------|

# 🎉  Öffnen Sie den Dienst default/mongo-express-service im Standardbrowser...

  

```

Jetzt sollten Sie die Anwendung im Browser aufrufen können und sich mit den decodierten Basic-Auth-Anmeldeinformationen anmelden, die im Secret referenziert sind.

![](https://images.prismic.io/syntia/04f6f440-e277-45f8-8772-5f908a3e5e0a_Screenshot+2023-11-25+at+18.03.59.png?auto=compress,format) 

## Pod-Zugriff in Kubernetes-Anwendungen

CRUD-Operationen auf dieser Anwendung, z.B. das Erstellen einer Datenbank, folgen dem Prozess:

1.  Die Anforderung des externen Dienstes von Mongo Express leitet die Anfrage an den Mongo Express Pod weiter.
    
2.  Mongo Express ist mit dem internen MongoDB-Dienst verbunden, wo es die Anfrage an den MongoDB-Pod weiterleitet.
    
3.  Die MongoDB-Datenbank wird mit den angeforderten Änderungen aktualisiert.
    

Mit diesem Setup haben wir gelernt, wie man einfache Kubernetes-Komponenten erstellt, um eine grundlegende Webanwendung und ihre Datenbank im Kubernetes-Cluster zu erstellen.

### Fehlerbehebung

Wenn der Container nicht startet, vergleichen Sie das Schema der Konfigurationsdateien. Versuchen Sie, die Bereitstellungen zu löschen, die Secrets, ConfigMap zu bearbeiten und erneut bereitzustellen.

Wenn die Verbindung zum Cluster instabil ist, entweder aufgrund niedriger Systemressourcen oder Probleme mit dem Hypervisor, versuchen Sie, zu einer anderen virtuellen Umgebung zu wechseln, und überprüfen Sie die Systemanforderungen für Minikube.

Die Kubernetes-Architekturdiagramme aus dem tatsächlichen Zustand in einem Namespace wurden generiert, [Referenz](https://github.com/mkimuram/k8sviz).
Die Konfiguration für diesen Workshop ist auf GitHub verfügbar [https://github.com/sintijab/Kubernetes-Workshop](https://github.com/sintijab/Kubernetes-Workshop)
