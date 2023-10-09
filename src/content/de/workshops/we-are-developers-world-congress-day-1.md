---
description: "Prinzipien von Anfänger- bis Fortgeschrittenenstufen Nr. 1 - Probleme mit praktischen Beispielen im Code müssen in 1 Stunde gelöst werden..."
pubDate: "Jul 28, 2023"
heroImage: "https://images.prismic.io/syntia/f527fcc8-4b8c-4a67-a8db-059bbde53dac_img_20230726_150309-1.webp?auto=compress,format"
author: "Syntia"
categories: "Workshops, Cloud Infrastruktur, Netzwerke, Kubernetes"
subcategories: "Pod Fehlerbehebung, Dezentrale Anwendung, Hexagonale Architektur, Polymorphismus"
---


# **We Are Developers World Congress Tag 1**

Der WeAreDevelopers World Congress wird von vielen als das Flaggschiff-Event der Welt für Entwickler angesehen. Was mir am meisten gefallen hat, war die Gelegenheit, gleichgesinnte Menschen zu treffen, die keine Rückschläge bei ihren Ambitionen und ihrem Streben nach einer besseren Zukunft erleiden.

![WeAreDevelopers World Congress](https://images.prismic.io/syntia/9a12209c-00f1-4765-aeb8-d8db8b685472_img_20230727_155058.webp?auto=compress,format)

## **Keep It Simple**

Was ich aus der Sicht des Sprechers gelernt habe, ist das Prinzip "Keep It Simple" - praktische Beispiele im Code und Ihr Problem, das Sie in 1 Stunde lösen möchten, müssen für jeden verständlich sein, vom Anfänger bis zum Fortgeschrittenen.

Von allen Workshops am ersten Tag des Kongresses habe ich mich entschieden, drei verschiedene Workshops zu besuchen: Kubernetes, Architekturentwurf in der objektorientierten Programmierung und die Änderung der Plattform - den Aufbau von dezentralen Anwendungen auf der Blockchain als Service.

## **Kubernetes-Fehlerbehebung**

##### **Workshop von Ahmed Gaber und Cassandra Faris**

Detaillierte Informationen über die Pods zu erhalten, ist eine gängige Praxis im Bereitstellungsprozess von Webanwendungen. Aufgrund von Fehlkonfigurationen, fehlenden Labels oder Skalierung der Software ist die Fehlerbehebung entscheidend, um Pods erfolgreich auf Kubernetes auszuführen und die Verfügbarkeit der Anwendung sicherzustellen. Darüber hinaus besteht der Hauptvorteil von Kubernetes darin, Bereitstellungen in verschiedenen Umgebungen sicherzustellen, um die Sicherheit der Anwendung, das Ressourcenmanagement und die Skalierbarkeit der Infrastruktur zu gewährleisten.  
[https://kubecampus.io/kubernetes/courses/kubernetes-troubleshooting/](https://kubecampus.io/kubernetes/courses/kubernetes-troubleshooting/)  
Die meisten gängigen Fehler können beispielsweise mit den beiden folgenden Befehlen gefunden werden, um den problematischen Pod zu beschreiben, wobei die Ausgabe die Ursache des Problems anzeigt:

```shell
kubectl get pods
kubectl describe pod [Pod-Name]
```

#### **Problem: CrashLoopBackOff**

Der Pod kann nicht auf einem Knoten geplant werden. Der Knoten verfügt nicht über ausreichende Ressourcen, um den Pod auszuführen, oder er konnte die Volumes nicht erfolgreich einhängen. Die häufigsten Ursachen sind: Unzureichende Ressourcen - Wenn auf dem Knoten unzureichende Ressourcen vorhanden sind, können Cluster skaliert werden, um sicherzustellen, dass mehr Knoten für Pods verfügbar sind, und die alten Pods können beendet werden.  
Volumen einhängen. Um das Problem mit dem Einhängen eines Speichervolumens zu lösen, finden Sie zunächst heraus, welches Volumen der Pod zu mounten versucht, und prüfen Sie, ob dieses Speichervolumen richtig eingestellt und verfügbar ist.

#### **Problem: ImagePullBackOff**

Der Pod konnte nicht gestartet werden, weil er einen Fehler beim Abrufen eines Container-Images aus einem Registry versucht hat. Der Pod weigert sich zu starten, weil er einen oder mehrere Container, die in seiner Manifestdatei definiert sind, nicht erstellen kann.  
Es handelt sich entweder um einen falschen Bildnamen oder Tag - dies tritt normalerweise auf, weil der Bildname oder Tag in der Pod-Manifestdatei falsch eingegeben wurde.

In diesem Workshop werden Sie die Pods inspizieren, die Bilder überprüfen, Pod-Definitionen korrigieren und auf die Pod-Manifestdatei anwenden.

![Kubernetes Troubleshooting](https://images.prismic.io/syntia/f527fcc8-4b8c-4a67-a8db-059bbde53dac_img_20230726_150309-1.webp?auto=compress,format)

![Kubernetes Troubleshooting](https://images.prismic.io/syntia/6af4ba85-205f-4484-8f1e-e6f1262b186f_img_20230726_150607-1.webp?auto=compress,format)

![Kubernetes Troubleshooting](https://images.prismic.io/syntia/13ed9948-cb59-493b-91c0-3c61d338458d_img_20230726_150743-1.webp?auto=compress,format)

## **Web3-Anwendungen erstellen, als ob es Web2 wäre**

##### **Workshop von David Dal Busco**

Ethereum war die erste Blockchain, die Turing-vollständige Smart Contracts hosten konnte, sichere Codeeinheiten, die Daten auf der Blockchain selbst verarbeiten und speichern.

Obwohl Ethereum Smart Contracts verwendet werden können, um einen DeFi-Dienst zu erstellen, sind sie nicht in der Lage, interaktive Web-Erfahrungen bereitzustellen, die es Endbenutzern ermöglichen, mit ihnen zu interagieren.

Eine Cloud-Computing-Infrastruktur wird verwendet, um das Benutzererlebnis bereitzustellen und oft auch die überwiegende Mehrheit der Datenverarbeitung und -speicherung durchzuführen - insbesondere, wenn Web3-Dienste beteiligt sind. Dies macht sie anfällig für alle Arten von Schwachstellen, einschließlich Zensur durch den Cloud-Betreiber, Hacking und die Übertragung der rechtlichen Haftung für den ansonsten dezentralen Dienst auf die Entwickler, die die Cloud-Konten betreiben.

Schließlich wurde erkannt, dass der Weg des Ethereum-Projekts nicht mit angewandter Kryptografie und verteilten Berechnungsmethoden vereinbar war, die in der Lage sind, Blockchains zu beschleunigen und ihnen eine unendliche Skalierbarkeit zu ermöglichen.  
Für dieses neue Konzept "World Computer" musste die Dfinity Foundation die größte Forschungs- und Entwicklungseinrichtung für Blockchains aufbauen, die derzeit mehr Kryptografen beschäftigt als jede andere Organisation in der Tech-Branche.  
Die Internet Computer Blockchain - die erste wahre Verwirklichung der Vision des World Computer - wurde am 10. Mai 2021 gestartet.  
Um Protokolle zu implementieren, die es ermöglichen, Schlüsselmaterial für die Ketten auf Knoten in einer dezentralen Netzwerkeinst

ellung festzulegen, konnte dies nur durch ein nicht interaktives verteiltes Schlüsselerzeugungs- und Schlüsselweitergabeprotokoll erreicht werden, das vom Kryptografen Jens Groth von DFINITY entwickelt wurde.

Es gibt viele Möglichkeiten, dezentrale Börsen, die auf Ethereum laufen, zu verbessern:  
Die interaktive Web-Erfahrung, bei der Benutzer Bestellungen aufgeben und ihre Konten verwalten, kann mithilfe von Smart Contracts erstellt werden, die HTTP-Anfragen verarbeiten können.

Die teure Datenverarbeitung und -speicherung kann auf Internet Computer Smart Contracts ausgelagert werden. Zum Beispiel kann der Internet Computer Benutzerprofilinformationen verwalten, um alle ihre Trades aufzuzeichnen und ihnen zu ermöglichen, kontinuierlich Waren mit mehreren Verkäufern und Käufern zu kaufen und zu verkaufen.

Die Internet Identity kann genutzt werden. Dies ist ein anonymisierendes Blockchain-Authentifizierungsframework, das es Endbenutzern ermöglicht, sicher Sitzungen mit Web3-Diensten unter Verwendung spezieller Hardware wie dem Fingerabdrucksensor auf ihrem Laptop oder Face ID auf ihrem Telefon zu erstellen.  
Die auf dem Internet Computer erstellte Front-End kann Internet Identity-Anker auf Ethereum-Public Keys abbilden und den Endbenutzern ermöglichen, sich sicher und bequem mit ihrem Fingerabdrucksensor zu authentifizieren.

David Dal Busco führte uns während des WeAreDevelopers 2023 World Congress in weniger als einer Stunde durch die Erstellung einer dezentralen "dapp", indem er einen Dienst erstellte, der es Benutzern ermöglicht, sich anonym zu authentifizieren, Datenbankdatensätze zu speichern und abzurufen und Dateien hochzuladen.  
Dieses Beispiel wird detailliert erklärt unter [https://juno.build/blog#build-a-dapp](https://juno.build/blog#build-a-dapp)  
Der Quellcode dieses Tutorials ist auf GitHub verfügbar unter [https://github.com/buildwithjuno/workshops](https://github.com/buildwithjuno/workshops), sowie andere Codebeispiele für Anwendungen und Mikroservices, die mit bekannten Websoftware-Frameworks wie React, Next.js, Vue, Angular, Node.js entwickelt wurden. [https://github.com/buildwithjuno/examples](https://github.com/buildwithjuno/examples)

Juno ist eine neue Open-Source-Blockchain-as-a-Service-Lösung, die die Flexibilität bietet, dezentrale Apps zu entwickeln und als statische Website auf dem Internet Computer zu hosten.  
Juno unterstützt die Authentifizierung über Internet Identity und NFID, ein Datenmodell für die Speicherung von Daten in der Blockchain. Dadurch entfällt die Notwendigkeit eines Backends und eines Speichers für den Aufbau von dynamischen dapps zum Speichern von Assets wie Bildern, Dokumenten, Videos usw. Die Grenze für den Speicher beträgt derzeit 2 GB, wird aber in naher Zukunft auf 64 GB erhöht.

Im Gegensatz zu traditionellen BaaS (Backend-as-a-Service)-Plattformen wie Google Firebase oder AWS Amplify läuft Juno vollständig auf der Blockchain.  
Die Entwicklung einer JavaScript-Anwendung, die vollständig auf der Blockchain mit Juno ausgeführt wird, unterscheidet sich in Bezug auf die Architektur nicht von herkömmlichen serverlosen Lösungen für Web2. Wenn es jedoch um Sicherheit, Ressourcenoptimierung und die Wiederverwendbarkeit von Komponenten geht, bietet Web3 Entwicklern eine andere Perspektive auf die Anwendungsarchitektur.

Eine Beispielarchitektur für Web3 (und Web2) dapps, erklärt von David Dal Busco: [https://juno.build/blog/exploring-a-juno-web3-dapp-architecture](https://juno.build/blog/exploring-a-juno-web3-dapp-architecture)

![Juno](https://images.prismic.io/syntia/06dfe52a-8fa3-4303-be9d-24306c16fb30_screenshot-2023-07-28-at-21.39.42.webp?auto=compress,format)

![Juno](https://images.prismic.io/syntia/515fafd6-7d51-4b67-b517-4e8cf3ab5338_img_20230726_160352.webp?auto=compress,format)

## **Sechseckige Webseiten? Hexagonale Frontend-Architektur!**

##### **Workshop von Marco Emrich**

Komponente + Strategie ermöglicht es Ihnen, ein Teilsystem so zu konfigurieren, dass es leicht in leicht unterschiedliche Umgebungen passt. Die hexagonale Architektur, auch als Ports & Adapter bekannt, ist eine spezielle Version davon, die es ermöglicht, ein System von externen Technologien zu isolieren, diese externen Technologien zu variieren und das System in Isolation zu testen.  
Es ist ziemlich natürlich, ein Objekt in eine Funktion zu übergeben, damit die Funktion dieses Objekt nach weiteren Informationen fragen oder ihm sagen kann, etwas zu tun. Dies ist normales objektorientiertes Design.  
Wenn Sie beispielsweise eine Kaffeemaschine programmieren, die nach Rezepten funktioniert, könnten Sie ein Rezeptobjekt an den Getränkehersteller übergeben, damit der Getränkehersteller daraus die Abfolge der Zutaten zum Ausgeben erhalten kann.

Ihr Code würde so aussehen:

```markup
recipe = RecipeLibrary.find( "mochaccino" );
drinkmaker.make( recipe )
```

und im Getränkehersteller:

```markup
foreach step in recipe {
  dispenser = step.ingredient
  quantity - step.quantity
  dispenser.dispense( quantity )
}
```

Zunächst haben wir die Rezepte parametrisiert, das bedeutet, wir wählen aus, welches Rezept wir verwenden möchten, je nach dem Argument, das wir an die Funktion übergeben. Dies ist eine wirklich grundlegende Art zu programmieren und sollte ziemlich verständlich sein. Der Hauptgrund, warum ich das erwähne, ist, dass ich in Kürze sagen möchte: "Parametrisieren Sie die sekundären Akteure". Alles, was ich damit meine, ist, dass Sie ein Argument übergeben, das identifiziert, welches verwendet werden soll.  
Es stellt sich heraus, dass wir das Strategiemuster implementiert haben. Viele Programmierer verwenden die Strategie nicht bewusst, weil es im Buch "Design Patterns" kompliziert erscheint. Obwohl sie es reflexart

ig verwenden können, beschreiben sie ihre Designs nicht auf diese Weise.

Das Tolle an der Strategie ist, dass Polymorphismus nicht nur eine Menge "if"-Anweisungen spart, sondern der Kontext weiß nicht, welchen er zur Laufzeit hat.  
Der Kontext hat möglicherweise früher entschieden, welchen er benötigte - beispielsweise hat er möglicherweise früher entschieden, eine zeitoptimale Suche oder eine platzoptimale Suche zu verwenden, und hat den entsprechenden Suchalgorithmus von irgendwoher erhalten, diesen Suchalgorithmusobjekt an einen sicheren Ort gesteckt und bei Bedarf aufgerufen.  
Oder das Kontextobjekt weiß möglicherweise nie, welches konkrete Strategieobjekt es aufruft. Etwas, an anderer Stelle, hat diese Entscheidung getroffen und sie als Parameter übergeben. Dies ist das, was wir mit dem Rezeptobjekt getan haben.  
Weil der Treiber das Rezept in den Getränkehersteller einbringt, weiß der Getränkehersteller während der Programmierung nichts über diese anderen Objekte. Er hat keine Codeebene-Abhängigkeiten von ihnen. Alle benötigten Informationen erhält er nach Bedarf während der Programmausführung. Dies gefällt uns aus Wartungs-, Test- und Wiederverwendbarkeitsperspektive.

Um dieses Strategiekonzept in der hexagonalen Frontend-Architektur anzuwenden, zeigte Marco Emrich ein Beispiel für ein Raumschiff zum Verkauf:  
[https://github.com/illyrica/hexa-space](https://github.com/illyrica/hexa-space)  
Ähnlich wie bei der Kaffeemaschine in Alistair Cockburns "Component-plus-Strategy" wird Ports-and-Adapters generalisiert, 2022. UML enthält eine Komponente, die auf der Treiberseite eine bereitgestellte Schnittstelle oder API und auf der Kollaboratorseite eine erforderliche Schnittstelle aufweist. Darüber hinaus verfügt die Komponente über einen sogenannten Port, der lediglich eine Anforderung ist, dass alles, was in die Komponente eingesteckt wird, ein Protokoll einhalten muss.  
Die UML-Spezifikation besagt, dass eine Komponente "eine modulare Einheit mit gut definierten Schnittstellen ist, die innerhalb ihrer Umgebung austauschbar ist".  
Darüber hinaus sind Komponenten die gut definierten Schnittstellen in der Hauptanwendung, die eine oder mehrere begrenzte Kontexte miteinander verbinden, die wiederverwendbare Adapter implementieren.

Das Adaptermuster ist ein spezieller Fall des Strategiemusters, bei dem die konkrete Strategie Anpassungen zur Sicherstellung der Schnittstellenkompatibilität vornimmt und dann einen anderen Dienst aufruft, um die Anforderung zu erfüllen. Der große Unterschied zwischen den beiden besteht darin, dass der Adapter eine zusätzliche Ebene der Indirektion hat. Die Strategie kann all ihre Arbeit selbst erledigen oder auch nicht, aber wir beabsichtigen, dass der Adapter eine Verbindung zu etwas anderem herstellt.  
In dieser Struktur des Raumfahrzeuggeschäfts sind Adapter eine Unterebene ihrer begrenzten Kontexte, Space Ship Store Front und Weapon Inventory. Jeder von ihnen enthält wiederverwendbare HTTP-Schnittstellen für API-Adapter, UI-Adapter für wiederverwendbare Komponenten und Domänen-Schnittstellen für die geschäftsspezifischen Anforderungen.

Ein Strategieobjekt - die Anwendung kann natürlich all dies tun - das liegt außerhalb der Musterdefinition - aber wir erwarten, dass die Adapter dies tun. Einer der Vorteile der Verwendung von Komponente und Strategie besteht darin, dass Sie die Komponentengrenze explizit deklarieren können, um einen Testdouble als Strategie für einen der externen Akteure bereitzustellen und das Komponente in Isolation zu testen. Dann können Sie für die Produktion einen Adapter bereitstellen, um die tatsächliche Verbindung herzustellen.

Und jetzt wird unsere Diskussion über Strategie-Adapter relevant. Die Schnittstellen sind möglicherweise nicht mit einer Datenbank verbunden. Wenn dies nicht der Fall ist, passt die Definition zu einem Strategieobjekt. Wenn sie mit einer Datenbank verbunden ist, handelt es sich möglicherweise um einen Adapter.

Wir sind jedoch nicht pingelig, wie wir es nennen. Letztendlich erleichtert es eine gut durchdachte architektonische Struktur mit Komponente und Strategie oder Komponente und Adapter, die Anwendung auf verschiedene Domänen zu skalieren. Es hat negative Auswirkungen auf die Wartung bei der Einführung weiterer Geschäftsanforderungen, die die Komplexität der Anwendung erhöhen, sowie bei zukünftigen Refactoring-Bemühungen und beim Testen in separaten isolierten Einheiten.

![Hexagonale Frontend-Architektur](https://images.prismic.io/syntia/151eca4e-45eb-414c-85e2-41112c8b4b72_screenshot-2023-07-26-at-18.08.55.webp?auto=compress,format)

![Hexagonale Frontend-Architektur](https://images.prismic.io/syntia/73a2206e-5d1f-4eb4-b408-cc97c964012a_img_20230726_170704.webp?auto=compress,format)