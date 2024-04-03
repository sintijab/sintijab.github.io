---
description: "Topografieplanung für digitale Karten"
pubDate: "Apr 2, 2024"
heroImage: "https://images.prismic.io/syntia/8933c596-6e38-45e3-ace0-1829a8304ec4_snazzy-image.png?auto=compress,format"
author: "Syntia"
categories: "Projekte, Karten, Topografie, Innovation"
subcategories: "Datenverarbeitung, Geodaten, GPS-Navigation, regionale Daten, Standortverfolgung"
---

Heutzutage könnte ich mir das Reisen ohne Google Maps nicht mehr vorstellen. Während einige abgelegene Orte veraltet oder auf der Karte fehlen, ist die Visualisierung der Hauptinfrastruktur für die Sicherheit beim Reisen entscheidend. Ich nutze oft die Funktion "Ebenen" von Google Maps, die im Allgemeinen Sammlungen von Objekten darstellen, die Sie oben auf der Karte hinzufügen können, um eine gemeinsame Verbindung zu kennzeichnen.

## Wander- und Fahrradausflüge

Sie können auf Google Maps Wegbeschreibungen für Autofahren, öffentliche Verkehrsmittel, Gehen, Fahrgemeinschaften, Radfahren, Flüge oder Motorradfahren erhalten. Das Erreichen unzugänglicher Standorte zu Fuß kann gefährlich sein, insbesondere auf Straßen ohne Gehwege.

Google Maps bietet Funktionen wie Ebenen, um Wanderwege, dedizierte Fahrradwege, fahrradfreundliche Straßen oder unbefestigte Wege in der Kartenansicht zu markieren. In einigen abgelegenen Gebieten ist dies jedoch nicht genau. In Norddeutschland zum Beispiel erstreckt sich die Auffahrt ein Drittel der Straße separat vom Gehweg, der sich in den Fahrradweg einfügt, während die Straße weiterführt. Die Straßenschilder sind am zuverlässigsten, aber wenn Sie eines verpassen, nimmt Google Maps unerwartete Abzweigungen für Sie vor.

Eine benutzerdefinierte Gestaltung für die Google-Ebenen erleichtert die Planung Ihrer nächsten Autoreise.

## Wie erstellt man benutzerdefinierte Ebenen für Google Maps?

1. Besuchen Sie [https://mapstyle.withgoogle.com/](https://mapstyle.withgoogle.com/)

2. Verwenden Sie den Legacy JSON-Styling-Assistenten

3. Karte gestalten

4. Einstellungen - JSON importieren

5. JavaScript-Array von jeder Vorlage kopieren/einfügen, z. B.
   [https://snazzymaps.com/style/85450/monochrome-grey](https://snazzymaps.com/style/85450/monochrome-grey)

## Farbthemen

In einer kürzlich durchgeführten Umfrage von 115 mobilen Nutzern, die gefragt wurden, in welchem Modus sie ihr mobiles Gerät im Allgemeinen haben, sagte etwa 1/3 Dunkelmodus, 1/3 Lichtmodus und 1/3 eine Kombination aus beidem. Das Argument, dass der Dunkelmodus die Benutzererfahrung verbessert (und in einigen Fällen die Zugänglichkeit verbessert), scheint immer wieder auf die gleichen wenigen Gründe zurückzuführen zu sein, die von Benutzern, Designern und Entwicklern gleichermaßen genannt werden:

- Reduzierte Augenbelastung

- Batterieeinsparungen

- Ästhetische Anziehungskraft

- Verbesserte Zugänglichkeit für Menschen mit Sehbeeinträchtigungen (z. B. Grauer Star)

Die Farbtherapie nutzt die Kraft der Farben, um unser geistiges, emotionales und körperliches Wohlbefinden zu unterstützen, und sie kann beim Autofahren oder bei der Messung langer Strecken äußerst wichtig sein.

In diesem Artikel habe ich ein paar Vorlagen aufgelistet, die ich für Google Maps Web [https://mapstyle.withgoogle.com/](https://mapstyle.withgoogle.com/) oder beim Einbetten der Karten auf jeder Website empfehle.

## Topographische Vorlagen

### Der Propia-Effekt

Rote, violette und orangefarbene Farbpalette geeignet für den Dunkelmodus.
[Link zur Vorlage](https://snazzymaps.com/style/111/the-propia-effect).
<div id="propia-effect-map" class="map"></div>

### Hellgrün

Hellgrünes Farbthema hebt nicht-flache Oberflächen außerhalb städtischer Umgebungen hervor.
[Link zur Vorlage](https://snazzymaps.com/style/59/light-green).
<div id="light-green-map" class="map"></div>

### Navigation

Helles Grau, monochromes Thema hebt Straßenstandorte für Autoreisen oder Fahrradfahrten hervor.
[Link zur Vorlage](https://snazzymaps.com/style/4069/navigation).

### Farbenblind-freundlich

Eine stilisierte Karte basierend auf den Farbtönen einer farbenblind-freundlichen Palette. Menschen mit verschiedenen Arten von Farbsehschwäche, zum Beispiel Tritanopie (blau), Deuteranopie (grün), Protanopie (rot). Der Orange/Rot-Kanal wird unabhängig von der Art der Farbenblindheit, die eine Person hat, am besten wahrgenommen. Es befindet sich am Ende des Farbspektrums und überträgt maximalen Kontrast, der nicht verloren geht, wenn die Farbwahrnehmung verändert wird.
[Link zur Vorlage](https://snazzymaps.com/style/114/colorblind-friendly).

![](https://images.prismic.io/syntia/697c51f6-174a-4774-8500-3b2af3a9d3f5_tritanopia-deuteranopia-protanopia.jpg?auto=compress,format)
<div id="colorblind-friendly-map" class="map"></div>

### Hervorgehobene Interessengebiete

Dieser Stil soll die kupferfarbenen "Interessengebiete" hervorheben. Er eignet sich gut, um das Gebiet in Gruppen von Aktivitäten zu gliedern.
[Link zur Vorlage](https://snazzymaps.com/style/276636/areas-of-interest-highlight).

Tipp: Durch Filtern von Gebieten nach Stichworten in Google-Bewertungen können Interessen kategorisiert und Fragen im Zusammenhang mit der Routenplanung beantwortet werden.

<div id="areas-of-interest-map" class="map"></div>

### Schienennetz und Bah

nhöfe

Hervorhebung des Schienennetzes, der Seewege und Bahnhöfe.
[Link zur Vorlage](https://snazzymaps.com/style/76037/rail-network-and-stations)

<div id="rail-network-and-stations-map" class="map"></div>

### Natürliche Navigation

Ideal für die Markierung der Hauptstraßen von der Fahrradinfrastruktur auf Websites.
[Link zur Vorlage](https://snazzymaps.com/style/19607/natural-navigation).

<div id="natural-navigation-map" class="map"></div>

### RoweMap

Pastellrosa, lila, monochromes Grau Farbpalette, Farbsättigung und Helligkeit relativ zum Kartenzoomniveau.
[Link zur Vorlage](https://snazzymaps.com/style/40616/rowemap).

<div id="rowe-map-map" class="map"></div>

### BestTrip

Hellgrün, monochrome Farben, vereinfachte Karte mit Markierungen für Wandergebiete und Wanderwege.
[Link zur Vorlage](https://snazzymaps.com/style/20730/besttrip).

<div id="best-trip-map" class="map"></div>

### USGS Topo 1946

Zweifarbige monochrome Karte basierend auf einer USGS-Topo-Karte von ca. 1946, Hervorhebung von Wasserwegen, Parklandschaften und natürlichen Merkmalen. Nützlich zur Markierung historischer topographischer Sammlungen.
[Link zur Vorlage](https://snazzymaps.com/style/103965/usgs-topo-1946).

<div id="usgs-topo-map" class="map"></div>

### Fahrradsekundärstraßen

Hervorhebung von Straßen und Wegen, die für Fahrräder geeignet sind,
[Link zur Vorlage](https://snazzymaps.com/style/7800/biking-secondary-roads).

## Vereinfachte Karten

Vereinfachte Karten sind nicht beschriftet und eignen sich hervorragend zum Hinzufügen benutzerdefinierter Marker oder Kunstdrucke und Poster.

### Tour

Eine einfache Karte mit Autobahnen, Staats- und Landesgrenzen sowie Topographie. Es werden keine Parks/Reservierungen/etc. identifiziert, es werden keine Beschriftungen enthalten. Zoomen Sie für die Anpassung der Straßenlinienbreite.
[Link zur Vorlage](https://snazzymaps.com/style/97220/tour-tour-tour).

<div id="tour-map" class="map"></div>

### Mapiful

Mapiful-Stilthema ideal für Kartenposter jeder Stadt,
[Link zur Vorlage](https://snazzymaps.com/style/146099/like-mapiful).

<div id="mapiful-map" class="map"></div>

### Picoteo Malaga

Mapiful-Stilthema ideal für Markierungen lokaler Unternehmen,
[Link zur Vorlage](https://snazzymaps.com/style/13110/picoteo-malaga).

<div id="picoteo-malaga-map" class="map"></div>

### Graustufen mit Wasser

Grau- und blaugrüne Karte mit hohem Kontrast zwischen Wasserkanälen,
[Link zur Vorlage](https://snazzymaps.com/style/20028/greyscale-w-water),
[ähnliches Thema](https://snazzymaps.com/style/213493/water-only).

<div id="greyscale-water-map" class="map"></div>

### Einfaches Hellblaues Wasser

Minimalistische, graue, hellblaue Karte,
[Link zur Vorlage](https://snazzymaps.com/style/62520/light-blue-water-simple).

<div id="light-blue-water-map" class="map"></div>

### Monochromes Grau

Minimalistische, monochrome, graue Karte,
[Link zur Vorlage](https://snazzymaps.com/style/85450/monochrome-grey).

<div id="monochrome-grey-map" class="map"></div>