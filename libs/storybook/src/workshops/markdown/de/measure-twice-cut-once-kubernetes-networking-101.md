\---  
description: 'Kubernetes Networking 101'  
pubDate: 'Apr 21, 2023'  
heroImage: 'beb170e5-c363-43b6-bab1-8fd52a6f1fa8_dns.webp?auto=compress,format'  
author: 'Syntia'  
categories: 'Workshops, Cloud Infrastruktur, Netzwerke, Kubernetes'  
subcategories: 'Kommunikationsprotokolle, Transmission Control Protocol, Internetprotokoll, Netzwerkschicht, Netzwerkschnittstelle, Virtuelles Netzwerk'  
\---  

# **Kubernetes-Netzwerke 101: Erst messen, dann schneiden**  

In unserem vorherigen Netzwerk-Workshop [Erst messen, dann schneiden - Eintauchen in die Grundlagen des Netzwerks](https://syntia.org/2023/04/21/measure-twice-cut-once-dive-into-network-foundations-workshop/) haben wir gelernt, wie Kubernetes zu den Netzwerkschichten in der Infrastruktur passt, die die Bereitstellung der Recheninfrastruktur und die Grundlage der Netzwerkschnittstelle ermöglicht.

Tag 2 überstehen - **So beheben Sie Probleme mit Kubernetes-Netzwerken** - Dank an Thomas Graf von Isovalent für die Demo von **Cilium**!

## **Regeln für Kubernetes-Netzwerke:**

1. In Kubernetes-Netzwerken haben alle Pods eine **IP-Adresse**.

2. Alle Pods können miteinander sprechen, und zwar in einem **flachen Netzwerk** (ohne die Verwendung von Network Address Translation, NAT).

3. Jeder Pod hat **PodCIDRs** (Classless Inter-Domain Routing) pro Knoten. Der Pods-CIDR-Block des Clusters begrenzt die maximale Gesamtzahl der verfügbaren Netzwerkadressen, die für die Zuweisung an Pods auf allen Knoten zur Verfügung stehen. Kubernetes weist jedem der Knoten, bei denen die Pod-IPs Teil dieses IP-Bereichs sind, einen /24-CIDR-Block (256 Adressen) zu. Um die Pod-CIDRs zu ändern, müssen Sie kube-proxy konfigurieren.

4. Kubernetes verwendet Dienste für die **Lastverteilungsebene** von Kubernetes. Die Lastverteilung ermöglicht es uns, mehrere Replikate eines Pods zu haben, die auf einen einzigen Dienstnamen oder einzelne Cluster-IPs verweisen, und Kubernetes wird die Last auf eines dieser Replikate verteilen. Pod-Replikate verhindern, dass Benutzer den Zugriff auf ihre Anwendung verlieren, wenn ein Pod ausfällt oder nicht erreichbar ist. Es wird eine neue Instanz eines Pods gestartet, skaliert sie hoch, wenn die laufenden Instanzen nicht die angegebene Anzahl erreichen, und skaliert Pods herunter oder löscht sie.

5. Kubernetes verwendet **DNS** für die **Service-Erkennung**. Sie können auf Dienste anhand ihres Namens zugreifen, ohne IP-Adressen in Anwendungen fest codieren zu müssen.

6. **Netzwerkrichtlinien** für die Segmentierung. Netzwerkrichtlinien ermöglichen es, festzulegen, welche Pods eine Verbindung zu anderen Pods herstellen dürfen. In der gleichen Namensraumkommunikation ist erlaubt, aber zwischen Namensräumen nicht.

### **Kubernetes-Netzwerke CNI und kube-proxy**

![](https://images.prismic.io/syntia/000f4741-0374-4258-b8eb-bf0b3f49ad66_screenshot-2023-04-21-at-12.38.03.jpg?auto=compress,format)

In unserem Cluster gibt es mehrere Knoten, auf denen Pods ausgeführt werden, und Container, die in den Pods ausgeführt werden. Das Netzwerkcni läuft als Agent oder Daemon-Set auf allen Knoten, und das cni erstreckt sich über die Netzwerkebene, die es den Pods ermöglicht, miteinander zu kommunizieren.

Das **Kubenet CNI**-Plugin ist verantwortlich für:

* Netzwerkgeräte
* IP-Adressenverwaltung
* Intranode-Konnektivität
* Internode-Konnektivität

**Kube Proxy** ist verantwortlich für:

* Dienste
* Iptables oder ipvs
* Dienstentdeckung

## **Kubernetes-Netzwerke mit Cilium**

Mit anderen CNI-Plugins wie Cilium sind die Kubernetes-Netzwerke ähnlich. Cilium bietet einen Netzwerkdatenpfad, der die Implementierung von eBPF übernimmt und das Paket weiterleitet oder die Regeln für die Netzwerkrichtlinien implementiert. eBPF wurde auf Basis des Berkeley Packet Filter (cBPF) entwickelt.

Cilium fungiert nicht nur als CNI, sondern auch als Proxy auf jedem Knoten und bietet die Beobachtbarkeit des Kubernetes-Netzwerks mit Hubble, das auf Cilium aufbaut und als "tcpdump für Kubernetes" bezeichnet wird. Es ist konfigurierbar mit nativer Prometheus- und Grafana-Integration zur Sammlung von Protokollen und Metriken.

Grafana-basierte Panels zeigen an, wie viele Pakete auf der Netzwerkschicht weitergeleitet werden, wie hoch die Paketverlustrate ist, wie viel Verkehr insgesamt weitergeleitet wird und wie der Verkehr zwischen den Regionen verteilt wird.

Die Hubble UI-Servicekarte zeigt alle ausgeführten Dienste, individuelle Netzwerkverbindungen und die Hubble-Anforderungs-/Antwort-Latenz von API-Aufrufen für Anwendungsprotokolle wie HTTP, gRPC, Kafka und Cassandra - alle Konnektivitätsdaten.

## **Kubernetes-Dienste**

Cluster-IP bietet die Möglichkeit, mehrere Pod-Replikate über eine einzelne Cluster-IP freizugeben. Anstatt Hunderte von Pod-Replikaten zu verwalten, weist Kubernetes einen Dienstnamen zu und stellt ihn als DNS-Namen über Core DNS zur Verfügung, sodass Ihre Anwendung eine Verbindung zum Dienstnamen der Anwendung herstellt und Kubernetes sich um das Skalieren der Pods kümmert.

### **Wie werden Netzwerkrichtlinien behoben?**

Ein Beispiel für Netzwerkrichtlinien: Angenommen, wir erlauben vom Frontend die Ausgehregel für das Backend-Pod über das Kubernetes NetworkPolicy **egress**-Label.

Die **podSelector** gibt an, welcher Datenverkehr zu und von dem Pod zugelassen ist, der dem **Selector** entspricht (egress: – to: – podSelector: matchLabels: app: backend).

Beide Pods befinden sich in einem Namespace. Aus den Beobachtungslogs sehen wir jedoch eine konstante Rate von Netzwerkrichtlinienabfällen vom Frontend, da die Pakete versuchen, zum kube-dns-Pod zu gelangen.

Wenn wir den Namespace über die Abfrage von Hubble inspizieren:

```shell
hubble observe -

n kubecon-simple
```

Die Hubble CLI zeigt alle Netzwerkaufgaben und Weiterleitungsflüsse in diesem Namespace an, und die Richtlinienabfälle treten vom Frontend zum kube-dns auf.
> > **"Es ist nicht DNS, es gibt keine Möglichkeit, dass es DNS ist, es war DNS"**

Kubernetes DNS wird für die Service-Erkennung verwendet und wird normalerweise mit CoreDNS implementiert.

### **Kubernetes DNS-Fehlerbehebung**

Die Hubble UI-Servicekarte zeigt die Kommunikation zwischen Namensräumen von einem Namensraum zum anderen, z.B. vom Frontend zum kube-dns. Wir können die abgelehnten Flüsse im unteren Teil sehen und die Begründung, dass die Richtlinie abgelehnt wurde.

Nun, wenn wir die neue Netzwerkrichtlinie über der Richtlinie anwenden, erlaubt sie den Zugriff auf den Kubernetes-Namensserver CoreDNS **kube-dns** mit: **k apply -f kubecon-simple-allow-dns.yaml**

**cat kubecon-simple-allow-dns.yaml**

**apiVersion:** [cilium.io/v2](//cilium.io/v2)

**kind:** CiliumNetworkPolicy

**metadata:**

  _name: allow-kube-dns

**spec:**

  _egress:_

*   _toEndpoints:_

*   _matchLabels:_

**k8s:io.kubernetes.pod.namespace: kube-system**

**K8s:k8s-app: kube-dns**

_toPorts:_

*   _ports:_

*   _port: “53”_

_Protocol: ANY_

_endpointSelector:_

_matchLabels: {}_

Das Problem bestand nicht nur darin, Backend-Netzwerkrichtlinien für das Frontend (für **app=backend**) zuzulassen, sondern auch für den kube-dns- oder CoreDNS-Pod (für ns:contains-coredns pod:k8s-app=kube-dns). Anwendungen scheiterten an der Ausgeh-Kommunikation aufgrund der Überschreitung des Kubernetes-Systemnamensraums.

Die Überwachung von Prometheus für DNS-Fehler ist Teil der DNS-Beobachtbarkeit in Hubble. Mit dem Hubble CLI:

**_hubble observe -n kubecon-debug-dns_**

Hubble verfolgt die Kommunikation mit kube-dns über UDP sowie die tatsächlichen DNS-Anfragen und -Antworten. Dabei wird versucht, die IPv6- und IPv4-Auflösung vorzunehmen, und es werden die Pfade der DNS-Auflösung im Namensraum verfolgt.

### **Lernen Sie, wie Sie Netzwerkrichtlinien für Kubernetes erstellen**

Ein Editor, der Kubernetes-Netzwerkrichtlinien visualisiert:

[https://editor.networkpolicy.io/?id=zVzZxN60deKeWdOf](https://editor.networkpolicy.io/?id=zVzZxN60deKeWdOf)

## **Fehlerbehebung bei Dienstlatenz**

### **Golden-Signal-Dashboard**

Die Dienstlatenz kann anhand der Leistung der bereitgestellten Anwendungen gemessen werden. Es gibt ein Standard-**Golden-Signal-Dashboard**, das vom Google SRE-Team erstellt wurde und eine Standardmethode zur **Überwachung von öffentlich verfügbaren Diensten** darstellt.

**Vier Haupt-Goldensignale sind:**

*   Latenz
*   Verkehr
*   Fehler
*   Sättigung

Weitere Informationen: [https://sre.google/sre-book/monitoring-distributed-systems](https://sre.google/sre-book/monitoring-distributed-systems)

![](https://images.prismic.io/syntia/2beaaec2-b396-429c-905f-514b0af5f907_screenshot-2023-04-21-at-14.23.10.png?auto=compress,format)

![](https://images.prismic.io/syntia/506cc33c-b34f-4e00-9b3e-52b016df9a18_screenshot-2023-04-21-at-14.47.16.png?auto=compress,format)

Hubble bietet ein Dashboard für vier Goldensignale. Es besteht aus:

*   **Eingehendes Anforderungsvolumen**: Rate, wie viele Anfragen pro Sekunde eingehen.
*   **Anforderungsdauer**: Latenz von HTTP-Anfragen bis zur Antwort in Sekunden (P50 ist der Durchschnitt aus dem schlechtesten Teil der Latenz, P95 ist der Durchschnitt aus den schlechtesten 5% der Verbindungen, die die längste Zeit dauern, und P99 ist das schlechteste 1%). P95 und P99 sind wichtiger, da es durchschnittlich oft gut aussieht, aber manchmal treten Latenzprobleme auf, bei denen die Dauer auf bis zu 2 Sekunden ansteigt.
*   **Erfolgsrate der eingehenden Anforderungen** (und Nicht-5xx-Antworten) nach Quelle: Rate der HTTP-Fehler, die von der Anwendung zurückgegeben werden. Bei Problemen mit der Latenz gibt es Probleme mit Quellen, bei denen Anfragen zu lange dauern oder der Dienst abstürzt.
*   **HTTP-Anforderungsdauer nach Quelle**: Um die Fehler zu debuggen, müssen wir die Anforderungsdauer mit der Sättigung aus der CPU-Auslastung nach Quelle korrelieren. Dies misst sowohl die Quelle (CPU) als auch die Ziel (Anforderungsdauer) Knoten, um Cluster umfassend zu überwachen.
*   **CPU-Nutzung nach Quelle**: Verfügbarkeit von Ressourcen CPU.

Spitzen der Latenz sind auf Quell- und Zielknoten zu einem bestimmten Zeitpunkt vergleichbar und ermöglichen es uns, die Dienstfehler und deren Geschwindigkeit und Leistung zu analysieren. Diese Daten stehen als OpenTelemetrics und Spuren zur Visualisierung auf anderen Tools zur Verfügung. Dies ist keine Anwendungsinstrumentierung, sondern die Überwachung des Kubernetes-Clusters und seiner Ressourcen.