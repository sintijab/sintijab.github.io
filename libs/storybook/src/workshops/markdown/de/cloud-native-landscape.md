\---  
description: 'Bereitstellung der Cloud-Native-Landschaft'  
pubDate: 'May 16, 2022'  
heroImage: 'ad567817-7719-48c2-bf83-545944c8b2bd_bliss.jpg?auto=compress,format'  
author: 'Syntia'  
categories: 'Workshops, Cloud Infrastruktur, DevOps'  
subcategories: 'Cloud Infrastruktur, Bereitstellungsplattform, Infrastruktur als Code, Virtualisierung, Infrastruktursicherheit, Containerisierung, Schlüsselverschlüsselung, Cloud-native Speicherung, Cloud Laufzeitumgebung, Infrastrukturorchestrierung'  
\---  

**_Bliss_** ist ein nahezu unverändertes Foto eines grünen Hügels und eines blauen Himmels mit Wolken in der Carneros AVA, Kalifornien. Charles O'Rear hat das Foto im Januar 1996 aufgenommen, und Microsoft hat die Rechte daran im Jahr 2000 erworben. Es wird geschätzt, dass Milliarden von Menschen dieses Bild gesehen haben, möglicherweise das am häufigsten angesehene Foto in der Geschichte.

Der Bereich der nativen Cloud entwickelt sich schnell weiter. Endbenutzer erwarten heute, vollständige Lösungen in Kubernetes zu erstellen, um Anwendungen von jedem Gerät aus zugänglich zu machen und in skalierbaren, sicheren und isolierten Umgebungen bereitzustellen. Die Komplexität nimmt zu, wenn man über verschiedene Clouds, Ökosysteme und Infrastrukturen hinweg arbeitet. Der Zugang zur Industrie erfordert spezifische Fähigkeiten, die auf bestimmte Domänen wie Gaming, Unterhaltung, Medizin, Energie, Fertigung oder Finanztechnologie zugeschnitten sind. Betreiber, die menschliche Betreiber nachahmen, sind von entscheidender Bedeutung für diese Skalierungsanstrengungen.

![Telemetrie](https://images.prismic.io/syntia/efe603ef-3b81-4763-800d-329dd099b308_screenshot-2022-05-16-at-21.03.44.png?auto=compress,format)

Häufige Telemetrietypen sind in den oberen Schichten des Infrastrukturkontexts ab dem Endbenutzergerät und dem Internet der Dinge (IoT) verfügbar.

### Die Cloud Native Computing Foundation (CNCF) bietet einen [empfohlenen Pfad durch die Cloud Native Trail Map](https://landscape.cncf.io/?license=open-source) an. Dieser hilft Entwicklern, die Landschaft der nativen Cloud besser zu verstehen und die verfügbaren Tools für die native Cloud zu nutzen.

Sie organisiert alle Open-Source-Projekte und proprietären Produkte der nativen Cloud in Kategorien und bietet einen Überblick über das aktuelle Ökosystem. _Projekte_ sind entweder Open Source oder von CNCF gehostete Open Source Projekte. Neue Projekte werden kontinuierlich Teil der CNCF und werden als Inkubationsphase (hellblaue/lilafarbene Rahmen) oder abgeschlossene Projekte (dunkelblauer Rahmen) kategorisiert. Die Schichten der CNCF-Landschaft sind innerhalb von Schichten aufgebaut:

## [Bereitstellung](https://landscape.cncf.io/card-mode?category=provisioning)

Die Bereitstellung ist die erste Schicht in der Landschaft der nativen Cloud. Sie umfasst Tools, die verwendet werden, um _die Grundlage zu erstellen_, auf der native Cloud-Anwendungen entwickelt werden, sowie Tools zum automatischen Konfigurieren, Erstellen und Verwalten der Infrastruktur, zum Scannen, Signieren und Speichern von Container-Images. Sie erstreckt sich auch auf die Sicherheit mit Tools, die die Festlegung und Durchsetzung von Richtlinien, die integrierte Authentifizierung und Autorisierung sowie die Handhabung der Verteilung von Geheimnissen ermöglichen.

Die Bereitstellungsschicht konzentriert sich auf den Aufbau der Grundlage für Ihre nativen Cloud-Plattformen und Anwendungen:

*   Automatisierung & Konfiguration
    
*   Container-Register
    
*   Sicherheit und Compliance
    
*   Schlüsselverwaltung
    

### [Automatisierung & Konfiguration](https://landscape.cncf.io/card-mode?category=automation-configuration)

Um schnelle Entwicklungs- und Freigabzyklen zu gewährleisten, muss die Infrastruktur dynamisch bereitgestellt werden. Tools in dieser Kategorie behandeln entweder verschiedene Teile des Bereitstellungsprozesses oder versuchen, alles von Anfang bis Ende zu kontrollieren. Sie beschleunigen die Erstellung und Konfiguration von Berechnungsressourcen. Automatisierte Tools wie Terraform reduzieren den Aufwand, der erforderlich ist, um Dutzende von Servern und Netzwerken mit Hunderten von Firewall-Regeln zu skalieren.

### [Container-Register](https://landscape.cncf.io/card-mode?category=container-registry)

Cloud-native Anwendungen werden in Containern verpackt und ausgeführt. Ein Container ist ein laufender Prozess mit Ressourcen- und Fähigkeitsbeschränkungen, die vom Betriebssystem eines Computers verwaltet werden. Container-Register kategorisieren und speichern Repositories und stellen die Container-Images bereit, die zum Ausführen von Anwendungen benötigt werden. Durch die zentrale Speicherung aller Container-Images an einem Ort sind sie für jeden Entwickler, der an dieser Anwendung arbeitet, leicht zugänglich.

### [Sicherheit und Compliance](https://landscape.cncf.io/card-mode?category=security-compliance)

Um Container sicher auszuführen, müssen sie auf bekannte Schwachstellen gescannt und signiert werden, um sicherzustellen, dass sie nicht manipuliert wurden. Kubernetes hat standardmäßig sehr großzügige Zugriffssteuereinstellungen, die sich für die Produktion nicht eignen. Das Ergebnis: Kubernetes-Cluster sind ein

 Ziel für jeden, der Systeme angreifen möchte. Sicherheits- und Compliance-Tools helfen dabei, die Sicherheit von Plattformen und Anwendungen zu überwachen und durchzusetzen.

### [Schlüsselverwaltung](https://landscape.cncf.io/card-mode?category=key-management)

Umgebungen in der nativen Cloud sind äußerst dynamisch und erfordern eine programmgemäße und automatisierte Verteilung von Geheimnissen auf Abruf. Das bedeutet, dass es vollständig programmatisch und automatisiert sein muss. Die Tools und Projekte in dieser Kategorie decken alles ab, von der sicheren Speicherung von Passwörtern und anderen Geheimnissen (sensiblen Daten wie API-Schlüsseln, Verschlüsselungsschlüsseln usw.) bis hin zur sicheren Beseitigung von Passwörtern und Geheimnissen aus Ihrer Microservices-Umgebung. Ein Schlüssel ist eine Zeichenfolge von Zeichen, die zur Verschlüsselung oder Signierung von Daten verwendet wird.

### [Laufzeit](https://landscape.cncf.io/card-mode?category=runtime,runtime)

Die Laufzeitschicht bietet alle Tools, die Container benötigen, um in einer nativen Cloud-Umgebung ausgeführt zu werden:

*   Cloud-native Speicher ermöglicht einen einfachen und schnellen Zugriff auf die zur zuverlässigen Ausführung benötigten Daten
    
*   Der Container-Laufzeit, der Container erstellt und startet, um Anwendungscode auszuführen
    
*   Cloud-native Netzwerke bieten Konnektivität für containerisierte Anwendungen, um miteinander zu kommunizieren.
    

Im Gegensatz zur Bereitstellung umfasst die Laufzeitschicht die Containersteuerung in einer nativen Cloud-Umgebung. Dies umfasst den Code zur Starten oder Stoppen des Containers, der als Container-Laufzeit bezeichnet wird, Tools zur Bereitstellung von persistenter Speicherung für Container und solche, die die Netzwerke der Containerumgebung verwalten.

### [Cloud Native Speicher](https://landscape.cncf.io/card-mode?category=cloud-native-storage)

Die Kubernetes-Cluster müssen unabhängig an verschiedenen Standorten verwaltet werden, um die Skalierungsfähigkeiten zu entwickeln und autonom zu betreiben. Für hybride oder lokale Cloud-Umgebungen, in denen containerisierte Anwendungen kontinuierlich erstellt und gelöscht werden und sich die Standorte im Laufe der Zeit ändern, was die Portabilität erschwert, muss der Cloud-native Speicher unabhängig von Knoten bereitgestellt werden. Um zuverlässig zu funktionieren, müssen Anwendungen einfachen Zugriff auf Speicher haben, der eine cloud-native kompatible Container-Speicherschnittstelle verwendet und der automatisch bereitgestellt werden kann, um die automatische Skalierung und Wiederherstellung durch Beseitigung des menschlichen Engpasses zu ermöglichen.

### [Container-Laufzeit](https://landscape.cncf.io/card-mode?category=container-runtime)

Die Container-Laufzeit ist die Software, die containerisierte (oder "eingeschränkte") Anwendungen ausführt.

Container-Images (die Dateien mit den Anwendungsspezifikationen) müssen auf eine standardisierte, sichere und isolierte Weise gestartet werden. Standardisiert, weil Sie standardmäßige Betriebsregeln benötigen, egal wo sie ausgeführt werden. Sicher, weil Sie nicht möchten, dass jemand darauf zugreift, der es nicht sollte. Und isoliert, weil Sie nicht möchten, dass die Anwendung andere Anwendungen beeinflusst oder von ihnen beeinflusst wird (zum Beispiel, wenn eine gleichzeitig ausgeführte Anwendung abstürzt). Die Isolation fungiert im Wesentlichen als Schutz. Darüber hinaus müssen der Anwendung Ressourcen wie CPU, Speicher und Speicher zur Verfügung gestellt werden. Containerd wie Docker und CRI-O sind Standardimplementierungen der Container-Laufzeit.

### [Cloud Native Netzwerk](https://landscape.cncf.io/card-mode?category=cloud-native-network)

Cloud-native Netzwerke bieten Konnektivität für containerisierte Anwendungen, um miteinander zu kommunizieren. Verteilte Anwendungen haben mehrere Komponenten, die das Netzwerk zu unterschiedlichen Zwecken nutzen. Tools in dieser Kategorie erstellen ein virtuelles Netzwerk über bestehenden Netzwerken, speziell für Anwendungen, um privat zu kommunizieren, das als Overlay-Netzwerk bezeichnet wird.

Das Container-Netzwerk muss IP-Adressen an Pods zuweisen, in denen containerisierte Anwendungen in Kubernetes ausgeführt werden, damit andere Prozesse darauf zugreifen können. Cloud-native Netzwerk verwendet Software zur Steuerung, Inspektion und Änderung von Datenflüssen. Es erleichtert die Verwaltung, Sicherung und Isolierung von Verbindungen zwischen Containern, indem es Richtlinien und Regeln im Voraus definiert, die einer Anwendung das Verbinden mit außerhalb des Container-Netzwerks ausgeführten Diensten ermöglichen.

## **Orchestrierung und Management**

Kubernetes selbst ist einer der Schlüssel für die Entwicklung nativer Clouds bis zu den für die interne Anwendungs- und externe Kommunikation verantwortlichen Infrastrukturebenen. Nativ cloud-native Anwendungen verlassen sich auf Automatisierung und Widerstandsfähigkeit, die durch diese Tools ermöglicht werden.

### [Planung und Orchestrierung](https://landscape.cncf.io/card-mode?category=scheduling-orchestration)

Orchestrierung und Planung beziehen sich auf das Ausführen und Verwalten von Containern in einem Cluster. Ein Cluster ist eine Gruppe von Maschinen, physisch oder virtuell, die über ein Netzwerk verbunden sind. Container-Orchestrierer (und Planer) sind in gewisser Weise ähnlich dem Betriebssystem (OS) auf Ihrem Laptop. Das OS verwaltet alle Ihre Apps wie Slack und Zoom; führt sie aus und plant, wann jede App die Hardwareressourcen Ihres Laptops wie CPU, Speicher und Speicher nutzen kann. Die meisten Anwendungen von heute erfordern mehr Ressourcen, als ein OS verwalten kann. Daher ist ein Cluster erforderlich, um Pods nach ihrem Namespace zu gruppieren und Container mit Orchestrierungstools wie Kubernetes zu verwalten.

Kubernetes _Namespaces_ helfen verschiedenen Projekten, Teams oder Kunden dabei, einen Kubernetes-Cluster gemeinsam zu nutzen. Jeder Namespace hat seine eigenen:

1.  Ressourcen (Pods, Dienste, Replikationscontroller usw.)
    
2.  Richtlinien (wer kann oder

 kann keine Aktionen in ihrer Community ausführen)
    
3.  Beschränkungen (diese Community hat dieses Kontingent usw.)
    

Ein Cluster-Operator kann für jede eindeutige Benutzercommunity einen Namespace erstellen.

Der Namespace bietet einen eindeutigen Rahmen für:

1.  benannte Ressourcen (um grundlegende Namenskollisionen zu vermeiden)
    
2.  delegierte Verwaltungsbefugnis für vertrauenswürdige Benutzer
    
3.  die Möglichkeit, die Ressourcennutzung in der Community zu begrenzen

**Container und Kubernetes sind beide zentral für Cloud-Native-Architekturen. Zusammen mit anderen Container-Orchestrierungstools wie Docker Swarm und Mesos ermöglichen sie eine deklarative Konfigurationsverwaltung, die über Kontrollschleifen gehandhabt wird, einem Muster, bei dem ein in Kubernetes laufender Prozess den Kubernetes-Speicher nach einem bestimmten Objekttyp überwacht und sicherstellt, dass der tatsächliche Zustand im Cluster dem gewünschten Zustand entspricht. Dies wird als Zustandsabgleich bezeichnet. Der gewünschte Zustand wird vom Ingenieur festgelegt (z. B. zehn Instanzen von Dienst A, die auf drei Knoten, d. h. Maschinen, mit Zugriff auf Datenbank B, usw., ausgeführt werden) und kontinuierlich mit dem tatsächlichen Zustand verglichen. Wenn der gewünschte und der tatsächliche Zustand nicht kompatibel sind, gleicht Kubernetes sie aus, indem es Objekte erstellt oder zerstört. Wenn beispielsweise ein Container abstürzt, wird Kubernetes einen neuen Container auf einem anderen Knoten starten, um ihn zu ersetzen oder abzurufen, wenn die Anwendung mit Repliken skaliert wird - die Verfügbarkeit einer bestimmten Anzahl identischer Pods.

[Abstimmung und Serviceentdeckung](https://landscape.cncf.io/card-mode?category=coordination-service-discovery)

Da es keinen festen Ort gibt, an dem ein bestimmter Dienst ist, und die Position aller ständig wechselt, verfolgen Serviceentdeckungstools die Dienste im Netzwerk. Es gibt hauptsächlich zwei Arten von Tools in dieser Kategorie:

1. **Serviceentdeckungsmaschinen**: Datenbankähnliche Tools, die Informationen über alle Dienste und deren Standorte speichern und wie man sie findet.

2. **Namensauflösungstools**: Tools, die Anfragen zur Dienstlokalisierung erhalten und Netzwerkadressinformationen zurückgeben (z. B. CoreDNS).

In Kubernetes wird zur Erreichbarkeit eines Pods eine neue Abstraktionsebene namens "Service" eingeführt. Dienste bieten eine einzige stabile Adresse für eine sich dynamisch ändernde Gruppe von Pods. In Kubernetes erstellt die Erstellung eines Dienstes (Abstraktion) eine Gruppe von Pods, die zusammen einen Dienst (Funktionalität in einem oder mehreren Containern) mit einem einzigen Endpunkt (Einstiegspunkt) bereitstellen, der der Kubernetes-Dienst ist.

**Serviceentdeckung in verteilten Systemen**

Traditionelle DNS-Prozesse und traditionelle Lastenausgleicher konnten oft nicht mit sich ändernden Endpunktinformationen mithalten. Um diese Mängel auszugleichen, behandeln Serviceentdeckungstools einzelne Anwendungsinstanzen, die sich schnell registrieren und deregistrieren. Einige Optionen wie CoreDNS und etcd sind CNCF-Projekte und sind in Kubernetes integriert. Andere haben benutzerdefinierte Bibliotheken oder Tools, um sicherzustellen, dass Dienste effektiv arbeiten können.

[Service Proxy](https://landscape.cncf.io/card-mode?category=service-proxy)

Ein Service-Proxy ist ein Gate zwischen dem Benutzer und Diensten oder zwischen verschiedenen Diensten. Er interceptiert den Verkehr zu oder von einem bestimmten Dienst, wendet einige Logik darauf an und leitet dann den Verkehr zu einem anderen Dienst weiter. Es kann so einfach sein, wie einen Lastenausgleicher bereitzustellen, der den Verkehr an individuelle Anwendungen weiterleitet, oder so komplex wie ein vernetztes Netz von Proxies, die parallel zu einzelnen containerisierten Anwendungen laufen. Service-Proxies sind auch Bausteine für andere Systeme wie API-Gateways oder Servicemeshes. Proxies sammeln wichtige Daten, verwalten die Routen (gleichmäßige Verteilung des Verkehrs zwischen Diensten oder Umleitung, wenn einige Dienste ausfallen), verschlüsseln Verbindungen und speichern Inhalte im Cache (um den Ressourcenverbrauch zu reduzieren).

Service-Proxies ermöglichen Administratoren mehrere Aufgaben: Sie können detaillierte Metriken zur Kommunikation zwischen Diensten sammeln, Dienste vor Überlastung schützen und andere gängige Standards auf Dienste anwenden, wie gegenseitige TLS. Service-Proxies sind grundlegend für andere Tools wie Servicemeshes, da sie eine Möglichkeit bieten, höhere Richtlinien auf den gesamten Netzwerkverkehr anzuwenden.

[API Gateway](https://landscape.cncf.io/card-mode?category=api-gateway)

Ein API-Gateway ermöglicht es Organisationen, wichtige Funktionen wie die Autorisierung oder die Begrenzung der Anzahl der Anfragen zwischen Anwendungen an einen zentral verwalteten Ort zu verschieben. Es vereinfacht die Art und Weise, wie Organisationen Interaktionen verwalten und Regeln für alle Interaktionen anwenden und fungiert als gemeinsame Schnittstelle für (oft externe) API-Verbraucher.

Ein API-Gateway dient als gemeinsamer Einstiegspunkt für eine Gruppe von nachgelagerten Anwendungen und bietet gleichzeitig einen Ort, an dem Teams Geschäftslogik einfügen können, um Autorisierung, Begrenzung der Anfragen oder Abrechnung zu handhaben.

[Servicemeshes](https://landscape.cncf.io/card-mode?category=service-mesh)

Ein Servicemesh ist eine Infrastrukturebene, die die Kommunikation zwischen Diensten verwalten, indem sie Befehls- und Kontrollsignale an ein Netzwerk von Service-Proxies sendet. Es verbindet alle Dienste, die auf einem Cluster ausgeführt werden, über Service-Proxies und schafft ein Netzwerk von Diensten.

Servicemeshes ermöglichen es Plattformbesitzern, gemeinsame Aktionen durchzuführen oder Daten zu Anwendungen zu sammeln, ohne dass Entwickler benutzerdefinierte Logik schreiben müssen. Sie ermöglichen es Plattformteams, Zuverlässigkeits-, Überwachungs- und Sicherheitsfunktionen gleichmäßig auf alle in einem Cluster ausgeführten Dienste anzuwenden.

Einige Servicemeshes verwenden einen allgemeinen Service-Proxy (siehe oben) für ihre Datenebene. Andere verwenden einen dedizierten Proxy; Linkerd verwendet beispielsweise den Linkerd2-Proxy "Mikro-Proxy", um einen Vorteil in Bezug auf Leistung und Ressourcenverbrauch zu erlangen. Diese Proxies

 sind einheitlich mit jedem Dienst über sogenannte Sidecars verbunden. Sidecar bezieht sich darauf, dass der Proxy in seinem eigenen Container läuft, aber im selben Pod lebt.

Dies gilt auch für allgemeine Proxy- und API-Gateways. Servicemeshes und API-Gateways lösen genau dieses Problem, da sie von den Plattformbesitzern implementiert und universell auf alle Dienste angewendet werden.**

## **App-Definition und Entwicklung**

Die Anwendungsentwicklungsschicht konzentriert sich auf die Tools, die Ingenieuren ermöglichen, Apps zu erstellen. Anwendungsdarstellungs- und Image-Build-Tools umfassen verschiedene Technologien, die die Entwickler- und Betriebserfahrung verbessern. CI/CD hilft Ingenieuren, Fehler frühzeitig zu erkennen und sicherzustellen, dass der Code mit höchster Qualität bereit für die Bereitstellung ist.

[Database](https://landscape.cncf.io/card-mode?category=database)

Datenbanken bieten eine gemeinsame Schnittstelle für Anwendungen, um Daten zu speichern und abzurufen. Im Allgemeinen gibt es zwei gängige Typen: SQL-Datenbanken (Structured Query Language) und NoSQL-Datenbanken. Die gängigsten Datenbanken, MySQL und Postgres, funktionieren erfolgreich und effektiv in Kubernetes-Clustern und zielen darauf ab, die Skalierbarkeit und Verfügbarkeit von Kubernetes zu nutzen.

[Streaming und Messaging](https://landscape.cncf.io/card-mode?category=streaming-messaging)

Messaging- und Streaming-Systeme bieten einen zentralen Ort für choreographierte Systeme, um zu kommunizieren. Der Nachrichtenbus bietet einen gemeinsamen Ort, an den alle Apps gehen können, um anderen mitzuteilen, was sie tun, indem sie Nachrichten veröffentlichen, oder zu sehen, was vor sich geht, indem sie Nachrichten abonnieren.

Messaging- und Streaming-Tools existieren schon lange, bevor Cloud Native populär wurde. Wenn wir jedoch über Messaging und Streaming im Kontext von Cloud Native sprechen, beziehen wir uns im Allgemeinen auf Tools wie NATS, RabbitMQ, Kafka oder Cloud-bereitgestellte Nachrichtenwarteschlangen.

[Anwendungsdefinition und Image-Build](https://landscape.cncf.io/card-mode?category=application-definition-image-build)

Kubernetes-Tools standardisieren und vereinfachen den Anwendungsbuild und die Bereitstellung. Anwendungsdefinition und Build-Tools umfassen eine Vielzahl von Funktionen. Auf hoher Ebene lösen Tools in diesem Bereich entweder entwicklerbezogene Probleme, wie das korrekte Schreiben, Verpacken, Testen oder Ausführen von benutzerdefinierten Apps, oder operationale Probleme, wie das Bereitstellen und Verwalten von Anwendungen. Helm ist das einzige abgeschlossene Projekt in dieser Kategorie und bildet die Grundlage vieler Anwendungsbereitstellungsmuster. Es ermöglicht Kubernetes-Benutzern, Apps bereitzustellen und anzupassen, und wird häufig von Organisationen für die internen Veröffentlichungen verwendet.
**![Bild 1](https://images.prismic.io/syntia/0ebabfad-7ecf-4a66-90bb-756890d6e4e4_screenshot-2022-05-16-at-21.11.15.png?auto=compress,format)**

**![Bild 2](https://images.prismic.io/syntia/4e0eeaa8-48ac-44d1-9de1-3b2b29eb476e_screenshot-2022-05-16-at-21.11.46.png?auto=compress,format)**

**Pfad-Traversierbarkeits-Schwachstelle in Argo CD - Ausnutzung der Helm Chart-Feldanalyse, um auf eingeschränkte Informationen wie API-Schlüssel oder Passwörter zuzugreifen (CVE-2022-24348)**

Die Helm-Chart-YAML-Manifeste können einen Verweis auf Wert-YAML-Dateien außerhalb des beabsichtigten Anwendungsbereichs enthalten. Dies kann zu einer Offenlegung sensibler Daten aus anderen Anwendungen führen, wenn sie sich auf demselben Server befinden.

Es wurde vermutet, dass eine Pfad-Traversierung durch einen Mechanismus auftritt, der eine integrierte Funktion implementiert, die zu den Schwachstellen führt. Dies kann durch Unittests und fortgeschrittenere Testmechanismen verhindert werden, die alle Szenarien abdecken.

**Langfristiger Lösungsvorschlag:**

- Flache, berechtigungsmäßige Zugriffe als Verursacher bei der Sicherheitsbearbeitung
- Implementierung eines Dateiebenen-Berechtigungsmodells
- Organisationen sollten den Dateizugriff und die Integrität überprüfen

### [Continuous Integration and Delivery](https://landscape.cncf.io/card-mode?category=continuous-integration-delivery)

CI-Tools stellen sicher, dass alle von Entwicklern eingeführten Codeänderungen oder Aktualisierungen automatisch und kontinuierlich erstellt, validiert und mit anderen Änderungen integriert werden. Je länger ein Entwickler an einer Software arbeitet, ohne sie in den Codebase zu integrieren, desto länger dauert es, einen Fehler zu identifizieren, und desto schwieriger ist es, ihn zu beheben.

Wenn ein Entwickler den Code für eine Webanwendung ändert, sieht das CI-System die Codeänderung, erstellt und testet dann eine neue Version davon. Das CD-System nimmt diese neue Version und bereitstellt sie in eine Entwicklungs-, Test-, Vorproduktions- und schließlich Produktionsumgebung. Dies geschieht, während die bereitgestellte Anwendung nach jedem Schritt im Prozess getestet wird. Zusammen repräsentieren diese Systeme eine CI/CD-Pipeline.

Einige traditionelle CI-Tools wie Jenkins passen gut in das Kubernetes-Ökosystem. Flux und Argo haben eine neue Methode zur kontinuierlichen Bereitstellung namens GitOps entwickelt, an der das OpenGitOps-Projekt arbeitet, um sie als herstellerneutrales Standard zu definieren.

## **Observability and Analysis**

- "Observability" ist ein Schlagwort für modernes Monitoring und Telemetrie-Analyse.
  - Der Begriff stammt aus der "Theorie moderner Regelungssysteme" und hat interessanterweise das Konzept der "Steuerbarkeit" unterwegs verloren.
- Um die Dinge klarzustellen:
  - Überwachung ist das Sammeln und Verarbeiten von Telemetriedaten (nicht nur Metriken).
  - Observierbarkeit ist eine Eigenschaft eines Systems; normalerweise muss man das System überwachen, damit es beobachtbar ist.

Observierbarkeit ist eine Systemeigenschaft, die beschreibt, inwieweit ein System von seinen externen Ausgaben aus verstanden werden kann und sicherstellt, dass es selbst unter schwierigen Bedingungen betriebsbereit bleibt. Gemessen wird sie an CPU-Zeit, Speicher, Festplattenspeicher, Latenz, Fehlern usw. Logging-Tools erfassen von App-Protokollen ausgegebene Ereignisnachrichten, und Metriken verfolgen den Pfad einzelner Anfragen. Wenn diese Tools kombiniert werden, sollten sie idealerweise einen Überblick über den Zustand des Systems bieten. Die Analyse ist eine Aktivität, bei der Entwickler diese beobachtbaren Daten betrachten und Sinn daraus ziehen.

Tools in dieser Kategorie sind in Logging, Monitoring, Tracing und Chaos Engineering unterteilt.

### [Monitoring](https://landscape.cncf.io/card-mode?category=monitoring)

**Der Netzwerkeffekt des Monitorings:**

- Probleme breiten sich von einem System auf ein anderes aus.
- Es ist notwendig, einen ganzheitlichen Überblick über die Abhängigkeiten zwischen Systemen zu haben, um zu verstehen, wie Probleme sich ausbreiten und wie sie sich auf Endbenutzer auswirken.
- Monitoring hat einen Netzwerkeffekt.
  - Je mehr Sie gemeinsam überwachen, korrelieren und kontextualisieren, desto mehr Einblicke erhalten Sie.

Gutes Monitoring ermöglicht es Betreibern, schnell und sogar automatisch auf Vorfälle zu reagieren. Es bietet Einblicke in den aktuellen Zustand eines Systems und überwacht Veränderungen.

Monitoring bezieht sich auf die Instrumentierung einer App, um Protokolle und Metriken zu sammeln, zu aggregieren und zu analysieren, um unser Verständnis ihres Verhaltens zu verbessern. Während Protokolle spezifische Ereignisse beschreiben, sind Metriken eine Messung eines Systems zu einem bestimmten Zeitpunkt - sie sind zwei verschiedene Dinge, aber beide notwendig, um ein vollständiges Bild vom Gesundheitszustand des Systems zu bekommen.

![](https://images.prismic.io/syntia/71ffaf64-8a72-4314-a91a-69fa001f12aa_screenshot-2022-05-16-at-20.53.20.png?auto=compress,format)

Vorherrschende Telemetriearten sind von den obersten Schichten des Infrastrukturkontexts aus zugänglich, beginnend beim Endbenutzergerät und IoT.

### [Logging](https://landscape.cncf.io/card-mode?category=logging)

Logging-Tools sammeln, speichern und analysieren diese Nachrichten, um Fehlerberichte und verwandte Daten zu verfolgen. Neben Metriken und Tracing ist Logging einer der Pfeiler der Observierbarkeit.

 Logging-Tools zielen darauf ab, Organisationen dabei zu helfen, die Kontrolle über ihre Protokollnachrichten zu erlangen und zu verstehen, was eine Anwendung zu einem bestimmten Zeitpunkt kommuniziert hat.

Im Laufe der Zeit ist das Sammeln und Aufbewahren von Protokollnachrichten eine äußerst leistungsfähige Funktion, die Teams bei der Fehlerdiagnose und bei der Erfüllung von regulatorischen und Compliance-Anforderungen hilft. In einer Cloud-nativen Umgebung sammeln Protokollerfassungstools wie Fluentd Nachrichten neben Anwendungscontainern und erfassen Nachrichten direkt von den Anwendungen.

### [Tracing](https://landscape.cncf.io/card-mode?category=tracing)

Tracing, eine spezialisierte Verwendung von Protokollierung, ermöglicht es, den Pfad einer Anforderung zu verfolgen, während sie durch ein verteiltes System bewegt wird, indem sie eine eindeutige Kennung zu den von der Anwendung gesendeten Nachrichten hinzufügt. Diese eindeutige Kennung ermöglicht das Verfolgen einzelner Transaktionen, während sie durch das System bewegt werden.

Tracing ist ein leistungsfähiges Debugging-Tool, das es ermöglicht, das Verhalten einer verteilten Anwendung zu troubleshooten und zu optimieren. Der Anwendungscode muss geändert werden, um Tracing-Daten zu erzeugen, und alle Spans (eine Darstellung individueller Arbeitseinheiten in einem verteilten System) müssen von Infrastrukturkomponenten (z. B. Servicemeshes und deren Proxies) im Datenpfad der Anwendung weitergeleitet werden. Jaeger und Open Tracing sind CNCF-Projekte in diesem Bereich.

### [Chaos Engineering](https://landscape.cncf.io/card-mode?category=chaos-engineering)

Chaos Engineering bezieht sich auf die Praxis, absichtlich Fehler in ein System einzuführen, um seine Widerstandsfähigkeit zu testen und sicherzustellen, dass Anwendungen und Entwicklungsteams turbulenten und unerwarteten Ereignissen standhalten können.

Der traditionelle Ansatz zur Aufrechterhaltung hoher Verfügbarkeit von Anwendungen besteht darin, die "mittlere Zeit zwischen Ausfällen" (MTBF) zu optimieren. Dies zeigt sich in Organisationen, die Dinge wie "Änderungsprüfungsgremien" und "lange Änderungssperren" verwenden. Hochleistungs-IT-Organisationen erreichen jedoch eine hohe Verfügbarkeit, indem sie stattdessen die "mittlere Wiederherstellungszeit" (MTTR) optimieren. Anstatt auf etwas zu warten und herauszufinden, legen sie es unter kontrollierten Bedingungen unter Stress, um Schwachstellen zu identifizieren und sie im Voraus zu beheben.

**Capture the Flag (CTF) Veranstaltung:**

Capture-the-Flag-Veranstaltungen sind Wettbewerbe zur Computersicherheit. Teilnehmer treten in sicherheitsbezogenen Herausforderungen an. Flags sind in der Regel in Zeichenketten eingebettet. Es hilft, die für eine Karriere im Bereich der Cybersicherheit erforderlichen grundlegenden Fähigkeiten zu entwickeln.

Übung: Absolvieren Sie das Capture the Flag (CTF)-Event von KubeCon Cloud Native Security Day [https://controlplaneio.github.io/kubecon-2021-sig-security-day-ctf/](https://controlplaneio.github.io/kubecon-2021-sig-security-day-ctf/)

Container werden verwendet, um die Arbeitsbereiche zu isolieren. Der Benutzernamensraum und cgroups sind eine Möglichkeit, dass ein Container als Satz isolierter Prozesse über unterschiedliche Berechtigungen verfügt als das System selbst. Prozesse können jedoch innerhalb ihres Benutzernamensraums root-Berechtigungen haben, ohne diese in anderen Benutzernamensräumen zu haben. Das Ausführen eines privilegierten Containers ermöglicht den Zugriff auf das Wurzeldateisystem von diesem Rechner.

**![Bild 3](https://images.prismic.io/syntia/15e7cab4-84fd-4150-b169-47f284dc38e1_screenshot-2022-05-16-at-21.13.59.png?auto=compress,format)**

**SSH in ein K8 Pod von außerhalb des Kubernetes-Clusters**

## **Plattform**

Obwohl es kein einziges bestes Tool für alle Anwendungsfälle gibt, gibt es sicherlich ein optimales Tool für die Bedürfnisse einer Organisation, basierend auf der Kontrolle über die Kubernetes-Adoption, den Workloads und den Bedarf an Auslagerung von Betriebsaufgaben. Die Meinungen der Anbieter darüber, was wichtig und angemessen ist, sind in die Lösung eingebaut.

### [Zertifiziertes Kubernetes - Distribution](https://landscape.cncf.io/card-mode?category=certified-kubernetes-distribution)

Kubernetes-Distributionen bieten eine vertrauenswürdige und zuverlässige Möglichkeit, Kubernetes zu installieren und Standards bereitzustellen, die eine bessere und sicherere Betriebsumgebung schaffen. Eine Kubernetes-Distribution gibt Anbietern und Projekten die Kontrolle und Vorhersagbarkeit, die sie benötigen, um Unterstützung für Kunden bereitzustellen, wenn sie den Lebenszyklus von Bereitstellung, Wartung und Aktualisierung von Kubernetes-Clustern durchlaufen, und erleichtert die Verwendung.

### [Zertifiziertes Kubernetes - Gehostet](https://landscape.cncf.io/card-mode?category=certified-kubernetes-hosted)

Gehostetes Kubernetes ist ein von Infrastrukturanbietern wie AWS, Digital Ocean, Azure und Google angebotener Dienst, der es Kunden ermöglicht, auf Anfrage einen Kubernetes-Cluster zu erstellen. Der Cloud-Anbieter übernimmt die Verantwortung für die Verwaltung eines Teils des Kubernetes-Clusters, der normalerweise als Steuerebene bezeichnet wird. Sie ähneln Distributionen, werden jedoch vom Cloud-Anbieter auf deren Infrastruktur verwaltet. Verwaltete Cluster bieten strengere Grenzen bei der Konfiguration von Kubernetes-Clustern.

### [Zertifiziertes Kubernetes - Installer](https://landscape.cncf.io/card-mode?category=certified-kubernetes-installer)

Kubernetes-Installer automatisieren den Installations- und Konfigurationsprozess von Kubernetes und können bei Upgrades helfen. Open Source Kubernetes setzt auf Installationsprogramme wie kubeadm, um Kubernetes-Cluster einsatz

bereit zu machen. Kubernetes-Installer wie [kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker) ermöglichen das Erstellen eines Kubernetes-Clusters mit einem einzigen Befehl. Kubeadm wird als so grundlegend für das Kubernetes-Ökosystem angesehen, dass es Teil der CKA, Certified Kubernetes Administrator-Prüfung ist. Minikube, kind, kops und kubespray sind alle von der CNCF besessene Kubernetes-Installationsprojekte.

### [PaaS/Container Service](https://landscape.cncf.io/card-mode?category=paa-s-container-service)

Platform-as-a-Service, oder PaaS, ist eine Umgebung, die es Benutzern ermöglicht, Anwendungen auszuführen, ohne die Kontrolle über die zugrunde liegenden Computerressourcen zu übernehmen. Tools wie Cloud Foundry Application Runtime helfen Organisationen dabei, schnell neue Anwendungen in Betrieb zu nehmen. Jede PaaS hat jedoch ihre eigenen Trade-offs und Einschränkungen. Stateless-Anwendungen laufen in einer PaaS in der Regel sehr gut, aber stateful-Anwendungen wie Datenbanken in der Regel nicht.
##### **Referenzen und weiterführende Lektüre:**

Vollständiger Leitfaden des CNCF: [https://landscape.cncf.io/guide](https://landscape.cncf.io/guide)

Übersicht zu Prometheus: [https://prometheus.io/docs/introduction/overview/](https://prometheus.io/docs/introduction/overview/)

Kubernetes Simulator: [https://github.com/kubernetes-simulator/simulator](https://github.com/kubernetes-simulator/simulator)

CNCF-Kanal: [https://cloud-native.slack.com/](https://cloud-native.slack.com/)

Argo CD-Tools: [https://argoproj.github.io/](https://argoproj.github.io/)

Zinc-Tools: [https://github.com/jnsgruk/zinc-k8s-operator](https://github.com/jnsgruk/zinc-k8s-operator)

Canonical-Tools:

* [https://charmed-kubeflow.io/](https://charmed-kubeflow.io/)
* [https://charmed-osm.com/](https://charmed-osm.com/)
* [https://charmhub.io/topics/canonical-observability-stack](https://charmhub.io/topics/canonical-observability-stack)
* [https://github.com/canonical/template-operator](https://github.com/canonical/template-operator)
* [https://github.com/canonical/charming-actions](https://github.com/canonical/charming-actions)

"Kubernetes Patterns: Wiederverwendbare Elemente für das Design von Cloud-native Anwendungen": [https://developers.redhat.com/books/kubernetes-patterns](https://developers.redhat.com/books/kubernetes-patterns)