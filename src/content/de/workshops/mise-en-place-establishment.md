---
description: 'Immer auf dem neuesten Stand von Design und Technologie bei Front'
pubDate: 'Aug 29, 2022'
heroImage: 'https://images.prismic.io/syntia/4fc5860f-6a48-4ccf-8548-3d300b80a89e_img_20220826_103321.jpg?auto=compress,format'
author: 'Syntia'
categories: 'Workshops, Cloud Infrastruktur, DevOps'
subcategories: 'Funktionale Drahtmodelle, Rendering-Strategien, Softwarearchitektur, Projektwartung, Designsystem, Caching, Konventionelle Kommentare'
---

# **Mise en place, Aufbau**

Um eine herausragende Frontend-Lösung zu erstellen, verlassen wir uns aufeinander: Designer auf Entwickler und Entwickler auf Designer. "Indem wir stets auf dem neuesten Stand von Design und Technologie bleiben, hat sich 'Front' zur größten Webkonferenz in der Schweiz entwickelt."

![Bild](https://images.prismic.io/syntia/039ad8c1-d03b-4df9-85a9-e34474c65dbe_img_20220826_115009.jpg?auto=compress,format)

#### **Haupterkenntnisse**

### **Konventionelle Kommentare**

Eines der einflussreichsten Werkzeuge im Jahr 2022 sind **konventionelle Kommentare**, die Entwickler dazu ermutigen, Feedback auf eine bessere Weise zu lesen und zu schreiben sowie eine bessere Qualität der Überprüfungen zu gewährleisten. Hier ist der Link zur Website: [https://conventionalcomments.org/](https://conventionalcomments.org/), erstellt von Paul Slaughter.

![Bild](https://images.prismic.io/syntia/4fc5860f-6a48-4ccf-8548-3d300b80a89e_img_20220826_103321.jpg?auto=compress,format)

![Bild](https://images.prismic.io/syntia/7811d84b-520c-4a64-bcce-ab42ca81fd47_img_20220826_144732.jpg?auto=compress,format)

### **Statische Builds**

Das Astro Smart-Build-System wird normalerweise mit Next.js verglichen, basierend auf Ähnlichkeiten. Es gibt jedoch Unterschiede zwischen den beiden Frameworks, es sei denn, es überwindet die Barrieren der Wettbewerbskompromisse. Die Größe der Bundle-Skripte ist nicht vergleichbar, aufgrund der vollständigen oder teilweisen Hydratisierung. Der Aufbau von Komponenten als kleine Anwendungen, die das Skript beim ersten Aufruf basierend auf seiner Referenz träge laden, macht es zu einer leistungsorientierten statischen Rendering-Lösung.

Der Astro-Compiler wurde mit Go entwickelt und läuft mit node.js. Hier ist der Link zur Website: [https://astro.build/](https://astro.build/)

Im Vergleich zu Next.js sind Unterscheidungen zwischen Rendering-Strategien als statisch oder serverseitig sowie die Abfangung von Routen nicht verfügbar. Das vollständig statische Erstellen von Mehrseiten- oder Einzelseitenanwendungen bringt jedoch mehrere Vorteile mit sich, wie SEO-Markierungen. Produktseiten sind für Webcrawler im HTML-Format zugänglich, anstatt einer Momentaufnahme aus einem Skript, das für Eintrittspunktbündler typisch ist. Dies verringert das doppelte Rendering vom Server zum Client, reduziert die Bundle-Größe um mehr als das 10-fache und wird vom TypeScript-Compiler unterstützt.

![Bild](https://images.prismic.io/syntia/bc2d8bd5-c7e7-486e-82a3-fdc160b9f1a4_img_20220826_110426.jpg?auto=compress,format)

![Bild](https://images.prismic.io/syntia/f6faeaed-9766-4541-adff-b75830e0c6e9_img_20220826_142822.jpg?auto=compress,format)

Im Jahr 2022 verfügt CSS vollständig oder teilweise über Funktionen, die versuchen, die übersehenen Fragen in CSS zu lösen, wie die Auswahl, das Raster, die Imports, die Farbräume und der Farbkontrast. Informationen zur Browserunterstützung finden Sie auf [https://caniuse.com/](https://caniuse.com/).

Basierend auf den Erfahrungen eines der Referenten, der ein Designsystem erstellt hat, um Tausende von Versicherungsschadensformularen in verschiedenen Ländern bereitzustellen:

- Verfolgen Sie nicht das Spotify-Modell, Menschen werden nicht geklont. Das Spotify-Modell ist ein auf Menschen ausgerichteter, autonomer Ansatz zur Skalierung von Agilität, der die Bedeutung von Kultur und Netzwerk betont.
- Investieren Sie in Tools und Prozesse, die die Benutzererfahrung verbessern.
- Evaluieren Sie die Unterstützung aus der Organisation und die Wartungskosten.
- Finden Sie ein engagiertes Team, das bereit ist, Zeit in Effizienz zu investieren, d.h., in Qualität und Zugänglichkeit des Designsystems.
- Erwähnen Sie nicht

 das atomare Design ohne Zusammenhang.
- Verfolgen Sie designbasierte Gemeinschaftsdesignsysteme, die Endbenutzer und Benutzertests einbeziehen.
- Investieren Sie in Produkte, indem Sie die richtigen Spezialisten (Entwickler), Generalisten (Designer) und Verantwortlichen finden, die alles zusammenbringen (Produktinhaber). Diese setzen sich für die Benutzer ein, verstehen die organisatorischen Anforderungen und den Entwicklungsprozess.
- Designführung muss der Anker in den Teams sein, um auszubalancieren, welche Benutzerbedürfnisse wichtiger sind als andere.
- Bevor Sie ein Designsystem erstellen, muss frühzeitig eine Struktur als Teil von gemeinsamen Code- und Designkits geschaffen werden, die ein Styleguide und ein konsistentes Branding umfassen.
- Der Designprozess muss funktional und interaktiv sein, nicht nur auf Bildern und Skizzen basieren. Hochauflösende Mockups erstellen ein vollständiges Bild des Website-Blueprints, sind aber in der Regel nicht vollständig im Kontext und in der Interaktivität.
- Von der wahrgenommenen zur funktionalen Drahtmodellierung: Lehren Sie Designer, wie Codierung das Design unterstützt.
- Schaffen Sie eine konsistente, tokenbasierte Entwicklung, um den Prozess auszurichten, den Code zu begrenzen und eine unendliche Flexibilität für die Übergabe zu gewährleisten.
- Stellen Sie die Konsistenz bei wiederholten UI/UX-Elementen vom Design bis zur Entwicklung sicher.
- Designsysteme werden nicht nur als schnittstellenbasiert, sondern auch als voll funktionsfähige Schnittstellen kategorisiert, die mit REST-APIs, Drittanbieterbibliotheken oder Microservices erstellt werden.
- Dokumentation ist nicht optional. Sie muss keine Monolith oder ein Archiv sein, sondern konsistent. Dokumentation ist die UX für Entwickler.

![Bild](https://images.prismic.io/syntia/8aae1f38-4cc5-410a-896e-c14fc5ca1696_img_20220826_140703.jpg?auto=compress,format)

![Bild](https://images.prismic.io/syntia/33ddbcbb-f96e-404a-87c9-10b8e28f5a77_img_20220826_140527.jpg?auto=compress,format)

![Bild](https://images.prismic.io/syntia/aafe5fd8-3991-4e60-9800-4bb3d151586f_img_20220826_141538.jpg?auto=compress,format)

![Bild](https://images.prismic.io/syntia/363ef9ab-e135-4ab7-ab7c-632fdca71c46_img_20220826_153105.jpg?auto=compress,format)