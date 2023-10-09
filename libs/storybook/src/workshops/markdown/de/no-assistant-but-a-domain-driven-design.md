\---  
description: "Softwareingenieure ohne Assistenten, sondern mit domänengesteuertem Design"   
pubDate: "Jun 23, 2022"   
heroImage: "8cea8294-1143-42c6-856a-338dd0a286d5_img_20220827_105638_666.jpg?auto=compress,format"   
author: "Syntia"   
categories: "Workshops, Cloud Infrastruktur, Softwarearchitekturdesign"   
subcategories: "Software Skalierbarkeit, Domänengesteuertes Design, DevOps, Serviceverteilung"   
\---  

Wenn ich mir den Code anschaue, frage ich mich, wie oft ich zwischen Arbeitsbereichen gewechselt habe, um unbemerkt Probleme zu lösen. Egal, wie oft sich das Problem wiederholt, es gehört wahrscheinlich zur Gruppe der Anti-Muster im veralteten Zustand. Entwicklungstools wie Linter und der TypeScript-Compiler können Automatisierung und Rückverfolgbarkeit der Mängel im Code und Design sicherstellen, die die Qualität widerspiegeln können. Das Softwaresystem ist mehr als eine Einheit, sondern der Umfang der Arbeit hängt von seinem Design und seiner Architektur ab.
"Ich arbeite nicht mehr an Produktmerkmalen, sondern an der Verbesserung von Designmustern und Gerüsten, die die Produkte auf die eine oder andere Weise von Entwicklern bis zum Endbenutzererlebnis verbessern. Dies ist nur mit einem guten Team möglich, das keine Angst hat, von vorne zu beginnen".
Websoftware im Jahr 2022 dreht sich viel mehr darum, zu lernen, Code zu schreiben, der austauschbar ist und in Prozessen und Regeln der Domäne gut definiert ist. Was die Teams vorantreibt, sind nicht die technischen Strategien, sondern die Leistung. Mehr Zeit in die Entwicklung zu investieren, indem man eine Pause einlegt, um eine Routine zur Identifizierung von Modell-Designmustern in Produkten zu starten, ist die richtige Denkweise, um zu beginnen. Wenn das Modell modular, erweiterbar und einfach zu pflegen ist, da das Design das Geschäftsmodell widerspiegelt, verbessert es die Wiederverwendbarkeit und Testbarkeit der Geschäftsdomänenobjekte. Einige der Merkmale eines gut gestalteten Domänenmodells sind:

* Das abstrakte Modell zerlegt die Funktionalität auf atomarer Ebene und ermöglicht eine Klassifizierung auf der Grundlage isolierter Funktionsebenen, die bei der Extraktion von Interaktionen zwischen Komponenten helfen und somit neue Schwachstellen und Merkmale des Modells aufzeigen.
* Es ist von anderen Domänen sowie von anderen Ebenen in der Anwendungsarchitektur isoliert.
* Stellen Sie sicher, dass Domänenklassen wiederverwendbar und unit-testbar sind, um doppelte Modelle und Implementierungen derselben Domänenlemente zu vermeiden.
* Abhängigkeiten sind weder mit anderen Ebenen in der Anwendung noch auf der Seite der Domänenschicht gekoppelt. Die Ebenen sind voneinander getrennt, was die Wartung, das Testen und die Versionierung erleichtert.
* Die Mindestanzahl von Abhängigkeiten von Infrastruktur-Frameworks wird enger Kopplung mit externen Frameworks überdauern.
* Das Domänenmodell sollte sich auf eine spezifische betriebliche Domäne konzentrieren. Es sollte mit dem Geschäftsmodell, den Strategien und den Geschäftsprozessen übereinstimmen.