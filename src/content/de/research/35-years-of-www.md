---
description: "35 Jahre WWW"
pubDate: "Jun 19, 2024"
heroImage: "https://images.prismic.io/syntia/ZnIUWJm069VX13H8_IMG_20240615_081400_344.jpg?auto=format,compress?auto=compress,format"
author: "Syntia"
categories: "Forschung, Informationszugang, Archivierung und Dokumentation, Open Source"
subcategories: "JavaScript, Handbuch, Konferenzen, Archivforschung, Networking-Events, Kritik, Governance"
---

JSNation ist die Haupt-JavaScript-Konferenz vom 13. bis 17. Juni in Amsterdam
mit 50 Rednern, 1,5K Teilnehmern und unvergesslichen sozialen und
Networking-Events. Der Veranstaltungsort Kromhouthal wurde in eine Tanzfläche,
💃 Karaoke 🎤 und einen Außenbereich verwandelt, der das Likeminds Podium
verband, um C3-Entwicklerfestival-Workshops zu beherbergen.

Während ich mich stark auf meine Rolle als Sprecher während der Konferenz
konzentrierte, vernetzte ich mich mit anderen klugen Köpfen, die seit den frühen
90er Jahren in das Web investiert haben. Die Gelegenheit, sich persönlich zu
treffen und vorzustellen, sollte durch nichts ersetzt werden, so einfach ist
das. Erick Wendel skizzierte eine Vision über die Zukunft von JS-Veranstaltungen
mit erweiterter Realität und WebXR, die eine große Herausforderung zusammen mit
den Manifestationen der KI-Technologien darstellen wird.

![](https://images.prismic.io/syntia/ZnIUaZm069VX13H-_IMG_20240615_163903_740.webp?auto=format,compress?auto=compress,format)

Auf dem Foto – Wer ist schneller beim Erstellen einer
Energiedatenvisualisierungsplattform: ChatGPT oder ein Entwickler? Lassen Sie
uns diese Herausforderung mit Chloé Caron angehen.

In diesem Artikel möchte ich einige Referenzen darüber teilen, wie das Web heute
die Technologien formt, die uns motivieren, Reverse Engineering gegen die
evolutionär zunehmende Komplexität des JS-Ökosystems zu studieren und zu den
Grundlagen zurückzukehren.

Wenn wir uns beispielsweise ansehen, was es Neues in AtroJS gibt, sind View
Transitions eine neue Definition für die CSS-animierten Übergänge, die mit
einfachem HTML & CSS durchgeführt werden können. Das Verständnis der Grundlagen
des Webs hilft, die Abstraktionen moderner JS-Frameworks zu entwirren. Wenn Sie
im Begriff sind, ein neues Framework oder Paket in Ihrem _node\_modules_ zu
installieren, klonen Sie zuerst die Abhängigkeiten und inspizieren Sie den Code,
den Sie verwenden.

![](https://images.prismic.io/syntia/ZnIUgZm069VX13H__IMG_20240615_124156.jpg?auto=format,compress?auto=compress,format)

Auf dem Foto – Christian Heilmanns Vortrag: 35 Jahre WWW: Arbeiten als Content
Creator, Designer und Entwickler mit dem coolsten Medium überhaupt

## Zeuge des Todes des Webs als Nachrichtenmedium

### Christian Heilmann

[Coole URIs ändern sich nicht](https://www.w3.org/Provider/Style/URI). Die
Stärken des Webs waren: die Möglichkeit, auf andere Ressourcen zu verlinken; zu
remixen und zu bookmarken für die spätere Verwendung. Fakt ist, dass die
Indexierung weniger wichtig geworden ist.
[38% der Webseiten, die 2013 existierten, sind heute nicht mehr zugänglich.](https://www.pewresearch.org/data-labs/2024/05/17/when-online-content-disappears/)

Mit anderen Worten, das Web drehte sich um die Speicherung und Ansammlung von
Inhalten. Eine ständig wachsende Bibliothek, die von Natur aus selbstindexierend
und querverweisend war. Und das ist es, was heutzutage aktiv getötet wird.

„Ende der 90er Jahre arbeitete ich als Radionachrichtensprecher und nutzte
Computer als Hobby“, sagt Christian. Heutzutage erfordert der Arbeitsmarkt, sich
um Technologien zu drehen, die in 30 Jahren möglicherweise nicht mehr
existieren. Das starke Statement „der Tod des Webs als Nachrichtenmedium“ zu
hören, und jemand aus der Ecke des Konferenzraums rief „warum sind all diese
Leute hier, um zuzuhören?“ brachte mich dazu, darüber nachzudenken, wie
Informationsübermittlungen zerstört werden und Menschen nicht in der Lage sind,
das zu finden oder zu lesen, was sie wollen, aufgrund von wirtschaftlichen und
profitgetriebenen Strategien, die manipulierend sind und den Bereich
benutzerzentrierter, gemeinschaftsgetriebener Inhalte mit hohem Interesse an
Informationsqualität und Bildungs- oder akademischen Zwecken verloren haben.

„Es wurde schwieriger, als Nachrichtenagenturen dasselbe taten. Ich erinnere
mich, als der Guardian und die BBC vollen Zugang zu den Archiven hatten. Ich
erinnere mich sogar, als andere Zeitungen und Nachrichtenaggregatoren-Inhalte
zum Remixen verfügbar waren. Aber bald wurden alle Nachrichteninhalte der
letzten 30 Tage aus dem Web gelöscht und man musste sich auf den Google Cache
oder die WayBackMachine des Internetarchivs verlassen, um Inhalte von vor einem
Monat zu zitieren. Verlage erkannten, dass es darauf ankam, mehr und
kurzlebigere, dramatische Inhalte zu veröffentlichen, um die Klicks zu bekommen.
Und darum ging es.

Referenz zum vollständigen Artikel:
[https://christianheilmann.com/2024/06/03/witnessing-the-death-of-the-web-as-a-news-medium/](https://christianheilmann.com/2024/06/03/witnessing-the-death-of-the-web-as-a-news-medium/)

![](https://images.prismic.io/syntia/ZnIXPpm069VX13IZ_IMG_20240613_110718.jpg?auto=format,compress?auto=compress,format)

Foto vom Vortrag von Andrey Sitnik, Privacy-First Architecture

## Superwebapps: Desktop-Anwendungen neu denken

### Einführung in Progressive Web Apps von Nico Martin

Wir müssen Daten in der Anwendungslogik strukturierter speichern, um Einträge
zwischenzuspeichern. Sitzungspeicher für eine Sitzung, lokaler Speicher für
längere Zeit, aber sie sind auf 5 MB begrenzt. IndexedDB ist eine
Low-Level-Browser-API, die es Anwendungen ermöglicht, große Mengen an
strukturierten Daten zu speichern und zu aktualisieren.

Das origin private file system ermöglicht das Erstellen, Lesen und Aktualisieren
von Dateien in einem privaten Dateisystem. Es ist Teil des Dateisystems des
Benutzers, aber für andere Herkunft als Webanwendungen nicht sichtbar.

Die Persistent Storage API ermöglicht es, die Erlaubnis zum Speichern der Daten
anzufordern. Typischerweise können Webanwendungen so viele Daten speichern, wie
der Browser für den verfügbaren Speicher zulässt. Die File System Access API
ermöglicht es Web-Apps, Dateien und Ordner auf dem Gerät des Benutzers direkt zu
lesen und zu speichern. Read file handles „showOpenFilePicker“ fragt nach
Berechtigungen für eine Sitzung und sind serialisierbar und können in IndexedDB
gespeichert werden, und die „createWritable()“-Methode speichert die Datei. Die
File Handling API ermöglicht es, eine App als Dateihandler innerhalb eines
Betriebssystems zu registrieren.

[https://developer.chrome.com/docs/capabilities/web-apis/file-handling](https://developer.chrome.com/docs/capabilities/web-apis/file-handling)

Mit der launchQueue API können eingehende Dateien empfangen werden. Die File
Handling API löst einen Aktion-Endpunkt aus und die launchQueue API konsumiert
die Datei. Es ist extrem bequem für die Benutzer.

Project Fugu ist ein organisationsübergreifendes Projekt, um Web-Apps
Fähigkeiten ähnlich wie native Geräte-Apps zu verleihen.
[https://fugu-tracker.web.app/](https://fugu-tracker.web.app/) Einige der APIs
sind besonders nützlich, beispielsweise ermöglichen die Local Font APIs
Benutzern den Zugriff auf lokal installierte Schriftarten und das Abrufen von
Details auf niedriger Ebene darüber.
[https://developer.chrome.com/docs/capabilities/web-apis/local-fonts](https://developer.chrome.com/docs/capabilities/web-apis/local-fonts)

Adobe, VSCode bietet ihren Service und Anwendung direkt im Webbrowser dank der
Service Workers und Browser-APIs an. Mit Progressive Web APIs sind sie über URL
zugänglich, in das Betriebssystem integriert, arbeiten offline und sind im
Vergleich zu anderen plattformübergreifenden Lösungen wie Tauri, Electron oder
Java unglaublich klein.

Präsentationsdemo: [https://md.nico.dev/](https://md.nico.dev/)

## LIVE-CODING

Workshops zur digitalen Klangschaffung und -verarbeitung mit Mercury und Hydra
von [Saskia Freeke](https://sasj.nl/portfolio/) und
[Timo Hoogland](http://www.timohoogland.com/).

Live-Coding-Performances bei JSNation waren eine wesentliche Aktivität der
Konferenz, es war das Highlight des C3-Festivals und der Abschlussveranstaltung
von JSNation. Die kollaborative Kraft von Ingenieuren und Künstlern aus
verschiedenen Disziplinen, die zusammenarbeiten, war aufschlussreich und
befreiend.

Während des 5-stündigen Workshops lernte ich, im kollaborativen Modus mit
Mercury und Hydra zu programmieren, indem ich die erstaunliche
Flok-Live-Coding-Umgebung für den Browser nutzte, die von Damián Silvani
entwickelt wurde.

Es gibt 3 Optionen, um Flok mit Mercury zu verwenden:

- Verwenden Sie Flok, um Mercury mit Hydra-Visuals (oder anderen Sprachen wie
  Tidal, Foxdot und SuperCollider) auf einem localhost zu kombinieren
- Zusammenarbeiten im selben physischen Raum mit 1 Computer, um Mercury
  auszuführen
- Remote über ein Netzwerk zusammenarbeiten

#### Referenzen

[https://github.com/tmhglnd/live-coding-101](https://github.com/t

mhglnd/live-coding-101)

[https://blog.toplap.org/](https://blog.toplap.org/)

[http://mercury.timohoogland.com/](http://mercury.timohoogland.com/)

[https://tonejs.github.io/](https://tonejs.github.io/)

[https://github.com/munshkr/flok?tab=readme-ov-file](https://github.com/munshkr/flok?tab=readme-ov-file)

[https://www.youtube.com/@Eulerroom](https://www.youtube.com/@Eulerroom)

<iframe width="560" height="315" src="https://www.youtube.com/embed/4d-5Ox9sELs?si=4kJ19cF3jjFEjn1g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Open Source Awards

In Tradition wiederholend, veranstaltete JSNation dieses Jahr die JavaScript
Open Source Awards, um eines der aufregendsten Open-Source-Projekte 2024 im
JS-Ökosystem hervorzuheben. Die Kandidatenprojekte wurden in folgende Kategorien
gruppiert:

Projekte, die zum JS-Ökosystem beitragen, ihm neue Dimensionen hinzufügen und
Möglichkeiten für die Weiterentwicklung schaffen. Neue Konzepte/Ideen mit großem
Zukunftspotenzial und guter Realisierung im Jahr 2023.

rspack - [](https://github.com/web-infra-dev/rspack)
[https://github.com/web-infra-dev/rspack](https://github.com/web-infra-dev/rspack)

solid-start - [](https://github.com/solidjs/solid-start)
[https://github.com/solidjs/solid-start](https://github.com/solidjs/solid-start)

WinterJS - [](https://github.com/wasmerio/winterjs)
[https://github.com/wasmerio/winterjs](https://github.com/wasmerio/winterjs)

Mitosis - [](https://github.com/BuilderIO/mitosis)
[https://github.com/BuilderIO/mitosis](https://github.com/BuilderIO/mitosis)

Projekte mit unkonventionellem praktischen JS-Einsatz. Mix mit nicht
traditionellen Software und Technologien, die JS zum Glänzen bringen und die
Entwicklung/Wartungsqualifikationen fördern.

Effect-TS - [](https://github.com/Effect-TS)
[https://github.com/Effect-TS](https://github.com/Effect-TS)

PartyKit - [](https://github.com/partykit/partykit/)
[https://github.com/partykit/partykit/](https://github.com/partykit/partykit/)

Elysia - [](https://github.com/elysiajs/elysia)
[https://github.com/elysiajs/elysia](https://github.com/elysiajs/elysia)

Hono.js - [](https://github.com/honojs/hono)
[https://github.com/honojs/hono](https://github.com/honojs/hono)

Javy - [](https://github.com/bytecodealliance/javy)
[https://github.com/bytecodealliance/javy](https://github.com/bytecodealliance/javy)

Projekt/Werkzeug, das die Produktivität der Entwicklung beeinflusst hat, einen
großen Unterschied macht und es verdient, übernommen zu werden.

Biome - [](https://github.com/biomejs/biome)
[https://github.com/biomejs/biome](https://github.com/biomejs/biome)

Nitro - [](https://github.com/unjs/nitro)
[https://github.com/unjs/nitro](https://github.com/unjs/nitro)

Typescript Eslint - [](https://github.com/typescript-eslint/typescript-eslint)
[https://github.com/typescript-eslint/typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)

Vanilla Extract - [](https://github.com/vanilla-extract-css/vanilla-extract)
[https://github.com/vanilla-extract-css/vanilla-extract](https://github.com/vanilla-extract-css/vanilla-extract)

Node.js Test Runner - [](https://nodejs.org/api/test.html)
[https://nodejs.org/api/test.html](https://nodejs.org/api/test.html)

Projekte, die mit der Verwendung von KI integriert sind:

Screenshot-to-code [](https://github.com/abi/screenshot-to-code)
[https://github.com/abi/screenshot-to-code](https://github.com/abi/screenshot-to-code)

Draw-a-ui [](https://github.com/SawyerHood/draw-a-ui)
[https://github.com/SawyerHood/draw-a-ui](https://github.com/SawyerHood/draw-a-ui)

Web LLM [](https://github.com/mlc-ai/web-llm)
[https://github.com/mlc-ai/web-llm](https://github.com/mlc-ai/web-llm)

LangChain.js [](https://github.com/langchain-ai/langchainjs)
[https://github.com/langchain-ai/langchainjs](https://github.com/langchain-ai/langchainjs)

Ollama.js [](https://github.com/ollama/ollama-js)
[https://github.com/ollama/ollama-js](https://github.com/ollama/ollama-js)

![](https://images.prismic.io/syntia/ZnIUtJm069VX13IB_IMG_20240613_180926_0.jpg?auto=format,compress?auto=compress,format)

Danke Inga für die Teilnahme an der Veranstaltung und die großartigen Aufnahmen!
