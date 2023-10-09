---
description: "Softwarearchitekturdesign - die am wenigsten schlechten Kompromisse finden"
pubDate: "May 13, 2022"
heroImage: "https://images.prismic.io/syntia/0956969c-64e0-47bf-9c70-7900606555fe_sustain-ops.png?auto=compress,format"
author: "Syntia"
categories: "Workshops, Cloud Infrastruktur, Softwarearchitekturdesign"
subcategories: "Software Skalierbarkeit, Domänengesteuertes Design, DevOps, Serviceverteilung"
---

Software-Architektur: Die schwierigen Teile, Neal Ford, Mark Richards, Pramod Sadalage, Zhamak Dehghani

Unternehmen müssen agil sein, um in der heutigen schnelllebigen und sich ständig verändernden Marktsituation zu überleben, was bedeutet, dass auch ihre zugrunde liegenden Architekturen agil sein müssen. Das Ziel ist es, zu untersuchen, wie man Kompromissanalysen in verteilten Architekturen durchführt.

"Es gibt keine einzelne Entwicklung, weder in der Technologie noch in der Managementtechnik, die selbst innerhalb eines Jahrzehnts eine Größenordnung \[zehnfache\] Verbesserung in Produktivität, Zuverlässigkeit oder Einfachheit verspricht." - Fried Brooks aus "No Silver Bullet"

Das Ökosystem der Softwareentwicklung verändert sich ständig und wächst. Der vorherrschende Stil für große Unternehmen vor Jahren war zentralisiert und orchestriert, eine serviceorientierte Architektur. Seit Open Source und Linux tragfähig geworden sind, hat sich das Softwareentwicklungsumfeld weiterentwickelt und einen architektonischen Übergang zu Microservices und schnell aufkommender Infrastruktur von Containern und Orchestrierungstools wie Kubernetes gefördert.

Die Microservices haben nach Definition die Einhaltung ihres begrenzten Kontexts aus dem Domain-Driven-Design als Möglichkeit zur Begrenzung des Umfangs der Implementierungsdetailkopplung.

Um eine gute interne strukturelle Integrität in der Codebasis aufrechtzuerhalten und effizient auf Veränderungen in Ökosystem oder Domäne reagieren zu können, müssen messbare Eigenschaften vorhanden sein, die zur Agilität beitragen, wie Bereitstellungen, Wartbarkeit und Testbarkeit der Software.

Der Wettbewerbsvorteil wird durch die Geschwindigkeit auf dem Markt in Verbindung mit der Skalierbarkeit erreicht, um die gesteigerte Benutzeraktivität und die allgemeine Anwendungsverfügbarkeit zu unterstützen. Die Fehlertoleranz, die Fähigkeit einer Anwendung, zu versagen und dennoch zu funktionieren, ist notwendig, um sicherzustellen, dass Teile der Anwendung ausfallen können, während andere weiterhin normal funktionieren, wodurch die Gesamtauswirkung auf den Endbenutzer minimiert wird.

Wenn Daten das wichtigste Gut im Unternehmen sind, muss eine wichtige Unterscheidung getroffen werden: die Trennung zwischen operativen und analytischen Daten.

In den frühen 2000er Jahren wurde das inkrementelle Feedback und die Automatisierung zu einer Schnittstelle zwischen Softwareentwicklung und Betrieb und führte zur Entstehung der neuen Rolle des DevOps und zur Automatisierung manueller Vorgänge. So wurden Automatisierung und Feedback zu Schlüsselfaktoren für die Produktivität und Effizienz in der Softwareentwicklung.

Ein Beispiel für ein Anti-Pattern, das vermieden werden sollte, besteht darin, willkürlich Klassen oder Komponenten zu importieren. Das Netzwerk von Komponenten, das zyklische Abhängigkeiten bildet, zerstört die Architekturmodularität hin zu einem großen Haufen Schlamm - einem Softwaresystem, das keine wahrnehmbare Architektur aufweist. Solche Systeme sind in der Praxis aufgrund von Geschäftsdruck, Entwicklerfluktuation und Code-Entropie häufig anzutreffen.

Letztendlich müssen Architekten zwar verstehen, wie Lösungen implementiert werden, sie müssen jedoch zunächst verstehen, warum eine Wahl bessere Kompromisse bietet als eine andere. Das Festlegen von Architekturkonzepten kann zahlreiche Implementierungen vermeiden. Dies kann nur durch die Definition eines Umfangs der statischen und dynamischen Kopplung in Architekturen erfolgen.

Statische Kopplung bezieht sich auf die Art und Weise, wie architektonische Teile miteinander verkabelt sind: Abhängigkeiten, Kopplungsgrad und deren Verbindungspunkte. Dynamische Kopplung bezieht sich darauf, wie die Architekturteile einander aufrufen, als Transportschicht mit Details über den Vertrag und die übermittelten Informationen.

Eine monolithische Architektur, die als Einheit bereitgestellt wird, ist nach Definition eine einzelne Quantenarchitektur. In einer verteilten Architektur wie Microservices tendieren Entwickler dazu, die Fähigkeit zur unabhängigen Bereitstellung von Diensten zu nutzen, oft auf hochautomatisierte Weise. Daher stellt ein Dienst in einer Microservices-Architektur eine unabhängig bereitstellbare Ressource dar, die mehrere Zwecke als Architekturquantum erfüllt.

Erstens dient die Grenze, die durch ein Architekturquantum dargestellt wird, als nützliche gemeinsame Sprache und Bereich zwischen Architekten, Entwicklern und Betrieb, wobei jeder es auf seine Weise versteht: Architekten verstehen die Kopplungsmerkmale, Entwickler verstehen den Umfang des Verhaltens und das Betriebsteam erkennt die bereitstellbaren Merkmale an.

Zweitens stellt das Architekturquantum eine der Kräfte (statische Kopplung) dar, die Architekten berücksichtigen müssen, wenn sie nach der richtigen Granularität von Diensten in einer verteilten Architektur streben. Oft stehen Entwickler in Microservices-Architekturen vor der schwierigen Frage, welche Dienstgranularität die optimale Reihe von Kompromissen bietet. Ein Teil davon dreht

 sich um die Bereitstellung: Welche Veröffentlichungsfrequenz benötigt der Dienst, welche anderen Dienste könnten betroffen sein, welche Engineering-Praktiken sind beteiligt.

Drittens zwingt die unabhängige Bereitstellung das Architekturquantum dazu, gemeinsame Kopplungspunkte einzuschließen. Viele verteilte Systeme, die sich qualifizieren würden, versagen, wenn sie die gemeinsame Datenbank mit ihrer eigenen Bereitstellungsfrequenz teilen. Die Berücksichtigung der Bereitstellungsgrenzen allein bietet keine nützliche Messung, und die hohe funktionale Kohäsion sollte berücksichtigt werden, um das Architekturquantum auf einen nützlichen Bereich zu beschränken.

Idealerweise modelliert in einer Microservices-Architektur jeder Dienst eine einzelne Domäne oder einen einzelnen Arbeitsablauf und zeigt daher eine hohe funktionale Kohäsion auf. Kohäsion in diesem Kontext bezieht sich nicht darauf, wie Dienste interagieren, um Arbeit auszuführen, sondern darauf, wie unabhängig und gekoppelt ein Dienst an einen anderen ist.

Hohe Grade der Entkopplung ermöglichen es Teams, die an einem Dienst arbeiten, unabhängig voneinander zu arbeiten, ohne sich Gedanken über das Brechen von Abhängigkeiten zu machen. In der Micro-Frontend-Architektur bildet jeder Dienst zusammen mit einem Benutzeroberflächenkomponente eine Architekturquantum: Jeder dieser Dienste kann unterschiedliche architektonische Merkmale aufweisen.

Die statische Kopplung eines Systems bietet wertvolle Einblicke, auch in komplexen Systemen mit Integrationen. Eine gängige Technik zur Analyse der "Legacy"-Architektur besteht darin, ein statisches Quantendiagramm zu erstellen, das zeigt, wie die Dinge miteinander "verkabelt" sind, was hilft, festzustellen, welche Systeme von Änderungen betroffen sein werden, und eine Möglichkeit zur Entkopplung der Architektur bietet.