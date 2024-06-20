# Magie ist das Organisieren von Chaos

Auf dem React Summit drehten sich etwa 70% der Vorträge um serverseitige Implementierungen im Vergleich zu clientseitigen. Die meisten Redner erklärten die Konfiguration mit individuellen oder auf Frameworks abgestimmten Setups wie Next.js. Der Hype um servergenerierte Komponenten lässt sich dadurch erklären.

### Vorteile

*   Die App viele Abhängigkeiten von externen APIs hat; das Laden von Apps direkt vom Server hat Vorteile zur Reduzierung der TTI (Time to Interactive), was bei langsamen Internet oder langsamen Geräten prominent ist.
    
*   Da der Inhalt serverseitig gerendert/gestreamt wird, ranken Suchmaschinen-Crawler ihn höher, was die Sichtbarkeit der Website verbessert.
    
*   Serverseitig gerenderte Komponenten sind weniger abhängig von clientseitigem Code und reduzieren einige Sicherheitslücken. Eine davon ist [Server-Side Request Forgery (SSRF)](https://cwe.mitre.org/data/definitions/918.html) (was von der Sicherheitsüberprüfung kürzlich gemeldet wurde). Wenn JavaScript auf der Clientseite fehlschlägt oder deaktiviert ist, kann SSR sicherstellen, dass der wesentliche Inhalt und die Funktionalität zugänglich bleiben.
    
*   Netzwerkgrenzen – das Abgrenzen, welche UI-Teile client- oder serverseitig gerendert werden, ermöglicht die Kombination verschiedener UI-Ladestrategien.
    

### Nachteile:

*   Komponierbarkeit – die Orchestrierung, welche Komponenten zuerst angefordert werden müssen, bevor etwas anderes gerendert wird (z. B. mit Promises). Remix hat zum Beispiel Promises mit Aktionen und Loaders auf der Routenebene, aber nicht auf Komponenten. React Suspense Boundary kann UI mit Ladezuständen anzeigen und es gibt mehr Kontrolle über die Ladezustände. Auch der React-Hook `useDeferredValue` ermöglicht es, die Aktualisierung eines Teils der UI mit ausstehenden Daten zu verzögern.
    
*   Serverseitige Komponenten sind nicht für große Anwendungen/ oder statische, serverlose Anwendungen geeignet, da die erhöhte CPU-Nutzung zu höheren Infrastrukturkosten führen kann. Auch [worker-threads](https://nodejs.org/api/worker_threads.html) für die gemeinsame Nutzung von Daten und die parallele Verarbeitung von JavaScript-Operationen wird nicht empfohlen.
    

Kent.C.Dodds erklärte die Konzepte der Server-Komponenten mit einem benutzerdefinierten RSC-Framework – And Now You Understand React Server Components, React Summit, [Link](https://github.com//epicweb-dev/react-server-components) zum Workshop.

## Chaos in Ihr Frontend einführen

Thibaud Courtoison erklärte “Magie ist das Organisieren von Chaos, während Ozeane des Geheimnisses bleiben” und erklärte Chaos Engineering mit dem Chaos Frontend Toolkit, einer Browser-Erweiterung [https://chaos-frontend-toolkit.web.app/](https://chaos-frontend-toolkit.web.app/). Es umfasst verschiedene Bereiche der Störungen, wie:

*   Verzögerung von Anfragen (ähnlich wie Netzwerk-Drosselung, aber mit maximalen/minimalen oder zufälligen Verzögerungen von HTTP-Anfragen bis zu 15000 Millisekunden)
    
*   Anfragen scheitern oder Verweigerungsliste (schlägt jede HTTP-Anfrage aus dieser Regex-Liste fehl)
    
*   Lokalisierungstests (i18n, von rechts nach links, Schriftarten, Abstände) mit Pseudo-Lokalisierung
    
*   Timer-Drosselung – wenn die Website lange Zeit aus dem Fokus gerät, werden Timeouts oder Intervalle verlangsamt
    
*   Zufällige Navigation vorwärts oder rückwärts in der App-Geschichte alle 60 Sekunden.
    
*   Zeitreisen – Testen von Formularübermittlungen und Client-Speicher mit der History-API durch Navigieren vorwärts/rückwärts in der Browser-Historie alle X Sekunden
    
*   Testen der Formularvalidierungen mit Doppelklick auf Eingaben oder Gremlins – simuliert zufällige Benutzeraktionen mit Maus und Tastatur
    
*   Barrierefreiheit – Ersetzen der Farben durch Schwarz-Weiß
    

## Verbesserung von React-Ökosystemen mit Observability

Verbesserung von React-Ökosystemen mit Observability: Ein tiefer Einblick in React mit OpenTelemetry von Jan Peer Stöcklmair. Wenn Sie jemals ein Fehler-Ticket von einem Kunden erhalten haben, das einen leeren Bildschirm anzeigt, und keine guten Möglichkeiten zur Fehlerbehebung gefunden haben.

### Monitoring vs Observability

**Monitoring** ist das Sammeln, Analysieren und Verwenden von Informationen zur Verfolgung des Fortschritts des Programms in Richtung **Erreichung seiner Ziele** und zur **Leitung von Managemententscheidungen**.  
**Observability** ist das **Verstehen** des **internen Zustands** eines Systems durch Analyse der von ihm erzeugten Daten, wie Logs, Metriken und Traces.  
**OpenTelemetry** konzentriert sich auf das Erzeugen und Verarbeiten der Daten-Logs, Metriken und Traces. Das Speichern und Analysieren hängt von den Anbietern ab.  
**Logs** oder LogRecords sind wichtig für Request Trace und Span-IDs, Zeitstempel und Body.  
Metriken oder Meter & **Instrumente**, wobei ein Instrument ein Datenpunkt zu einem bestimmten Zeitpunkt ist, z. B. wie viel CPU Ihre Software im Moment verwendet.  
**Meter** gruppiert mehrere Instrumente, und **Trace** ist eine Nutzungsreise eines bestimmten Ereignisses, z. B. ein API-Aufruf mit einer Trace-ID für das Ereignis, das aus Span-IDs besteht, wie z. B. Datenbankaufrufe oder ein anderer Funktionsaufruf. Jede Span-ID kann andere Attribute und **Span-Ereignisse** enthalten, die nützlich für die Fehlerverfolgung und -behebung sind.

### Client-Tracking 
Eine Trace-ID wäre zu schwer für das Debugging von 2 bis 3-stündigen Benutzersitzungen, daher könnte eine Trace-ID zugewiesen werden für:

*   z. B. Browser-Neuladen, globale Browser-Ereignisse & Laden verschiedener Dateien (html/css/js)
    
*   zufälliges Hintergrund-Polling mit einem Endpunkt
    
*   Benutzerinteraktionen, z. B. onclick-Event-Handler, die APIs anfordern
    

Das Zusammenführen der Traces ist mit den Instance-ID-Schlüsselattributen möglich, die zu jedem dieser Traces hinzugefügt werden können.

### Komplexität bei Web-Server-Komponenten

Der Benutzer kann keinen Unterschied zwischen server- oder clientseitig gerenderten Komponenten feststellen, da beide ein HTML zurückgeben. Wenn der Benutzer zur Layout-Seite navigiert, wird diese nicht als HTML, sondern als fetch POST-Anfrage abgerufen.  
Der Server kann direkt auf Datenbanken oder andere Anbieter zugreifen, z. B. Redis, um die Schlüssel abzurufen. In einem anderen Szenario würde er einen Endpunkt auf einem NGINX-Proxy aufrufen, der ein Python-Ereignis oder einen neuen Dienst enthält, der ebenfalls Zugriff auf die Datenbank hätte. Ohne eine festgelegte Konfiguration für Fehlergrenzen und Fehlerbehebung auf Serverebene wird das Debugging der Anwendung schwierig sein.

**Verteilte Tracing**  
Verteilte Tracing verbindet einen Trace für verschiedene Dienste, z. B. React und NGINX mit Kontextweitergabe über den [W3C Trace Context-Header](https://www.w3.org/TR/trace-context).  
Es gibt eine Trace-ID über beide Dienste hinweg über den traceparent-Header, der von W3C Trace Context oder anderen definiert wird. Er besteht aus vier Komponenten: Version, Trace-ID, die beide Dienste verbindet, und der Span-ID, die der letzte Teil der Span-ID der React-App ist und auch der erste Teil der Span-ID des verbundenen Dienstes, sowie den Trace-Flags, ob es abgetastet wird oder nicht.  
Demo zur Instrumentierung von OpenTelemetry für JavaScript in einer NextJS-App: [https://github.com/JPeer264/reactsummit24/commit/0b05c89950d89f26564e90acaca5c1bf5ed491e4](https://github.com/JPeer264/reactsummit24/commit/0b05c89950d89f26564e90acaca5c1bf5ed491e4)

### Wie kann man die Kosten für die Traces begrenzen?

Das Tracing aller Dinge in Ihrer Anwendung summiert sich im Datenspeicher, der für kostenlose Tarife begrenzt ist. Auf dem Grafana Cloud-Speicher sind es 50 GB mit 14 Tagen Aufbewahrung und nur 3 Benutzern.  
Der OpenTelemetry-Sammler, ein Empfänger, kann mehrere Instanzen haben, und NextJS kann ein Empfänger sein, um die Daten an den Sammler zu senden. Prozessoren filtern, redigieren und bündeln dann die Daten, die dann an Loki zur Sammlung der Fehlerprotokolle übertragen oder in eine Datei geschrieben werden. Die Verarbeitung ist eine der wichtigsten Phasen zusammen mit der Kontextweitergabe für Kosteneinsparungen im Cloud-Speicher und Planung.

Photo-Referenz: Kreative Codierung in handgeschriebenem WebAssembly unter Verwendung des WebAssembly .wat-Textformats. Erwähnt in Justin Schroeders Vortrag "Say WAT Now!? Turbocharged JavaScript With Hand Crafted WASM" auf der JSNation 2024. Repository: [austintheriot/hand-crafted-wasm](https://github.com/austintheriot/hand-crafted-wasm/tree/master).