\---  
description: 'Tag der Beobachtbarkeit und Cilium Con 2023'  
pubDate: 'Apr 18, 2023'  
heroImage: 'cdafc9ba-d983-4d3f-8515-541c229c5d98_aws-terraform-snyk-arch.png?auto=compress,format'  
author: 'Syntia'  
categories: 'Workshops, Cloud Infrastruktur, Sicherheit, Überwachung des HTTP Netzwerks'  
subcategories: 'Softwareentwicklungslebenszyklus, Terraform, Infrastruktur als Code Überwachung, Überwachungsschirm'  
\---  

# **Beobachtbarkeit in cloud-nativen Umgebungen**

Heute, am Observability Day und Cilium Con 2023, teilten Ingenieure, die auf ein gesundes OSS-Ökosystem angewiesen sind, ihre Erkenntnisse zur Orchestrierung in Cloud-nativen Umgebungen mit Cilium. Dies umfasste Cluster-Management mit einer Multi-Tenancy-Architektur und Elastic Network Interface (Entwurf und Absicherung einer Multi-Tenant-Laufzeitumgebung von Ahmed Bebars, New York Times), die Bestimmung eines Bedrohungsmodells und von Risiken - systematisch (gegenüber ad hoc), große/kleine Verteilung, Rohdaten (gegenüber abgeleiteten Daten) - Netzwerkfluss mit automatisiertem Egress und Kundenressourcenzugriff und -schutz (Bloomberg), Netzwerkdesign, das herstellerneutral ist, leicht skalierbar ist, sich in Legacy-Systeme integrieren lässt und die Erschöpfung von IPv4 behandelt (Karsten Nielsen, IKEA Private Cloud and Networking).

Zusammen mit den anderen Komponenten des Netzwerkdesigns - Cross-Host-Networking über den zugrunde liegenden BGP-Routing-Daemon BIRD, verteilte Betriebsführung ohne Single Point of Failure, skalierbar mit Ceph-Blockspeicher und deklaratives GitOps-Plattform für Kubernetes mit Argo CD.

Überwachung allein reicht nicht aus, Beobachtbarkeit ist in heterogenen Rechenumgebungen erforderlich. Die Anomalieerkennung - die Identifizierung von unerwarteten Ereignissen - mithilfe von Zugriffsprotokollen kann von unbeaufsichtigtem zu überwachtem Lernen geschult werden, das Bezeichnungen der Eingabe-Zeitreihen erfordert, die die Genauigkeit der Verfahren im Vergleich zu verschiedenen Algorithmen messen. Die Anomalieerkennung kann die Beobachtbarkeit in komplexen Systemen verbessern.

#### **Beobachtbarkeitstools für die Überwachung des HTTP-Netzwerks**

Beobachtbarkeitstools für die Überwachung des HTTP-Netzwerks sind Prometheus. Die neueste Version 2.40 bietet native Histogramme [https://promcon.io/2022-munich/talks/promql-for-native-histograms/](https://promcon.io/2022-munich/talks/promql-for-native-histograms/), effiziente Speicherplatznutzung und Leistung sowie geringe Auswirkungen auf die Vergangenheit [https://archive.fosdem.org/2020/schedule/event/histograms/](https://archive.fosdem.org/2020/schedule/event/histograms/).

OpenTelemetry-Protokoll zum Übersetzen von Datensammlungen (Empfänger, Prozessoren, Exporteure) in beobachtbare Backends, Spezifikation von Datenpunkten mit Daten-Temporality, Zeiterfassung in eingebauter Sequenz mit Zeitstempeln, die für nachfolgende Punkte bei anfänglicher Rate wichtig sind - Resets, Lücken und Überlappungen. Datenbeobachtung mit Histogrammen unter Verwendung von Open Telemetry's Exponential Histograms in Prometheus, Metriken Aggregator API/SDK, Brücke zur internen Telemetrie von Prometheus-Exportern, Elastic Common Schema (ECS), eine Open-Source-Spezifikation für ein standardisierteres und strukturiertes Format für von Anbietern generierte Protokolle.

#### **Entwicklung und Hybridisierung von Signaltypen - die Reise von Metriken/Logs zu Traces zu Profilen**

CNCF TAG Observability-Vortrag über "Entwicklung und Hybridisierung von Signaltypen - meine Reise von Metriken/Logs zu Traces zu Profilen" mit Liz-Fong Jones: [https://youtu.be/Ran6QogzxKA](https://youtu.be/Ran6QogzxKA), Protokollnotizen: [https://github.com/cncf/tag-observability](https://github.com/cncf/tag-observability)  
"Ich habe mich darum bemüht, Probleme zu lösen, die wir nicht unbedingt als Probleme des Systemengineering oder der Systemverwaltung betrachten würden. Heute sind die Identifizierung von Abweichungen in Protokollen in den breiteren Schirm der Beobachtbarkeit aufgenommen worden, Ähnlichkeiten in Mustern, die durch Benutzer verursacht werden, ohne unbedingt zu wissen, was sie tun wollen. Das Rollen eines kreisförmigen Puffers von Protokollen als Signal, das nur dann dringend benötigt wird, wenn das System versagt - was ist mit Problemen, die nicht als Einzelquelle des Versagens erscheinen, oder mit Problemen, bei denen wir nicht wissen, wie wir sie filtern oder gruppieren sollen."

Infrastructure as Code (IaC) ermöglicht es Teams, ihre Infrastruktur mithilfe eines Softwareentwicklungs-Lebenszyklus (SDLC) zu definieren und die Vertrautheit mit Git-Repositories, Pull-Anfragen, Tests und Peer-Entwicklung zu nutzen, um die Infrastruktur wie jedes andere Softwareprojekt zu behandeln. Die Open-Source-Tools von HashiCorp für die Infrastruktur ermöglichen es Organisationen weltweit, diese Infrastruktur in der Cloud zu betreiben.  
Ein so einfacher Zugang zu Cloud-Umgebungen erfordert Sicherheitsmaßnahmen in jeder Organisation, um eine sichere Gestaltung der Cloud-Architektur sicherzustellen und die Bereitstellung von Fehlkonfigurationen zu verhindern.

#### **Im Snyk & HashiCorp Workshop: Ihre Infrastruktur als Code sichern**

Im Snyk & HashiCorp Workshop: Sichern Ihrer Infrastruktur als Code erhalten wir den Code und führen einige CLI-Operationen mit Snyk aus, um Fehlkonfigurationen in Ihren Definitionen von Infrastruktur als Code zu finden, indem wir ein Repository mit falsch konfigurierten Assets für Infrastruktur als Code klonen; Führen Sie einen Snyk CLI-Scan durch und beobachten Sie die Ergebnisse; nutzen Sie die Sicherheitslücke aus; beheben Sie Probleme lokal und führen Sie Scans erneut durch; senden Sie Ergebnisse an die Snyk-Website.

Snyk ist eine der führenden Plattformen für die Sicherheit von Entwicklern, die automatisch in den Arbeitsablauf eines Entwicklers integriert ist und speziell für Sicherheitsteams entwickelt wurde, um

mit ihren Entwicklungsteams zusammenzuarbeiten.  
Eine Snyk-Einführung zu ihrer Plattform und zur Integration von Sicherheitstools mit Terraform CLI, HashiCorp Terraform Cloud und Synk CLI ist online für begrenzte Zeit verfügbar: [https://snyk-hashicorp.awsworkshop.io/](https://snyk-hashicorp.awsworkshop.io/).

In diesem Workshop lernen Sie:

*   Einrichten eines AWS-Kontos
    
*   Stellen Sie sicher, dass Sie die verbleibenden Workshop-Schritte als IAM-Benutzer mit Administratorzugriff auf das AWS-Konto befolgen: [Erstellen eines neuen IAM-Benutzers für den Workshop](https://console.aws.amazon.com/iam/home?#/users$new)
    
*   Einrichten von AWS-Zugriffsschlüsseln, um Terraform Cloud zu ermöglichen, auf Ihre AWS-Instanz zuzugreifen.
    
*   Erstellen Sie einen AWS-Arbeitsbereich für Ihre Operationen mit Hilfe einer cloudbasierten integrierten Entwicklungsumgebung (IDE) über die AWS Cloud9-Konsole und weisen Sie Ihrer Cloud9-Instanz eine IAM-Rolle zu, um Ihrer EC2-Instanz die Berechtigung zum Erstellen von Ressourcen zu erteilen.
    
*   Richten Sie die Terraform CLI ein und speichern Sie den Terraform-Status der von Ihrer Pipeline bereitgestellten und mit Terraform bereitgestellten Infrastrukturen.
    
*   Richten Sie die Snyk CLI ein, um Ergebnisse zu Ihren Schwachstellen zu sammeln und zu senden.
    

![](https://images.prismic.io/syntia/cdafc9ba-d983-4d3f-8515-541c229c5d98_aws-terraform-snyk-arch.png?auto=compress,format)

Weitere Snyk-Ressourcen:

*   [Snyk Terraform Cloud Ankündigung](https://snyk.io/blog/snyk-iac-security-terraform-cloud/)
    
*   [Snyk Blog: Verhindern Sie Cloud-Fehlkonfigurationen in HashiCorp Terraform mit Snyk IaC](https://snyk.io/blog/prevent-cloud-misconfigurations-hashicorp-terraform-snyk-iac/)
    
*   [Synk & Docker Hub Container Image Library - Minimieren Sie Schwachstellen in Docker-Images für sichere Anwendungen](https://snyk.io/advisor/docker)
    

Wenn Sie neu in der Infrastruktur als Code sind, empfehle ich Ihnen, mit dem kostenlosen Code Academy-Kurs zur Automatisierung von Cloud-Infrastrukturen mit dem deklarativen Tool Terraform zu beginnen: [https://youtu.be/SLB\_c\_ayRMo](https://youtu.be/SLB_c_ayRMo).

#O11yDay