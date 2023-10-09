\---  
description"Vorhersage von Radar- und optischer Satellitenbildern"   
pubDate"Mar 29, 2022"   
heroImage"2f347b0b-5e4c-4167-a106-e625524b3ca4_figure-2022-03-27-153109.png?auto=compress,format"   
author"Syntia"   
categories"Projekte, Künstliche Intelligenz, Neuronale Netzwerke, Bildklassifikation"   
subcategories"Faltungsneuronales Netzwerk, Künstliche neuronale Netzwerke, Satellitenbilder, Erkennung militärischer Objekte, Erkennung von Anomalien"   
\---  

Testbild und Merkmalskarten aus der Faltungsschicht

Die Fortschritte in der Technologie und der digitalen Signalverarbeitung seit den frühen 50er Jahren haben zur Entwicklung von Systemen geführt, die sowohl für militärische als auch zivile Zwecke nützlich sind.

Alle Informationen, die in den Systemen gespeichert sind und eine Massenüberwachung darstellen, sollten eine Gegenleistung zur Verteidigungs- und Militärgeheimdienstorganisation NATO (Nordatlantikpakt-Organisation) sein, die in der Nachkriegszeit des Zweiten Weltkriegs gegründet wurde und für die Bereitstellung von Sicherheit mit Echtzeit-Einsatznachrichtenoperationen verantwortlich sein sollte, um sowohl militärische als auch humanitäre Bemühungen zu unterstützen.

Heutzutage spielt Synthetic Aperture Radar (SAR) eine wichtige Rolle in der militärischen Bodenüberwachung und Erdbeobachtung. Im militärischen Kontext ist die Verfügbarkeit von SAR ihr überzeugender Vorteil.

Anwendungen in diesem Bereich sind weit verbreitet: Die globale Aufklärung wird hauptsächlich von Satellitensystemen durchgeführt, Flugzeuge und hochfliegende unbemannte Plattformen tragen Sensoren zur Beobachtung großer Gebiete, und miniaturisierte SAR-Ausrüstungen werden zur Integration in Drohnen für die Schlachtfeldüberwachung verwendet.

Das zugrunde liegende Radarprinzip bietet Vorteile im Vergleich zu konkurrierenden Sensoren im Infrarot- oder sichtbaren Spektralbereich. Radar hat sich bereits aufgrund seiner Tag- und Nachttauglichkeit und der Möglichkeit, Wolken und Regen zu durchdringen, als wertvoll erwiesen. Optische Instrumente haben jedoch erhebliche Vorteile bei der Interpretation abgebildeter Objekte. Optische Bilder von Unternehmen wie Maxar Technologies und Planet basieren auf sichtbarem oder Infrarotlicht, können nicht durch Wolken sehen und sind nachts nicht so effektiv.

SAR verwendet die Bewegung der Radarantenne, die an einem Flugzeug oder Satelliten montiert ist, um das darunter liegende Bild zu erzeugen. Es funktioniert, indem es Radarstrahlen aussendet und die Echos sammelt. Ähnlich wie Ultraschallwellen an Grenzflächen zwischen Medien mit unterschiedlichen Impedanzen, wie Knochen/Muskel oder Haut/Fruchtwasser, reflektieren. Die Synthese erfolgt durch die Erfassung von Daten aus Teilen des Arrays, um die Anzahl der elektronischen Kanäle zu reduzieren. Bei Radar befindet sich das Objekt in der Regel im Fernfeld des Arrays, während das Objekt bei einem medizinischen Ultraschallsystem immer im Nahfeld ist, was die Rekonstruktion kompliziert. Da das medizinische Array stationär ist, ist es möglich, Messungen schnell zu wiederholen, was für ein SAR-Radarsystem nicht der Fall ist. Die Position zwischen den verschiedenen Elementen ist auch in der Ultraschalltechnik festgelegt, während die Abweichungen von einem geraden Flugpfad für Flugzeuge in Radar-Systemen oft kompensiert werden müssen.

Daher können durch die genaue Messung der Zeit, die benötigt wird, bis die Echos von diesen Grenzflächen zurückkehren, unter Berücksichtigung der unterschiedlichen Schallgeschwindigkeiten in jedem Medium, deren Positionen ermittelt und eine detaillierte dreidimensionale Karte berechnet werden, die in ein Echtzeit-Videobild umgewandelt werden kann.

"Ultrasound" zeigt eine Sammlung von Bildern, die aus einem Convolutional Network-Modell generiert wurden, das auf optischen und Radar-Satellitenbild-Datensätzen aus militärischen Aktivitäten vor Russlands Entsendung von Militärtruppen in die Ukraine erstellt wurde. Diese Bilder zeigen eine erhebliche Flotte von Militärtechnologie und Ressourcen in Belarus, der Krim und Westrussland, die alle an die Ukraine grenzen.

Die Bilder klassifizieren die Objekte für die Segmentierung: Bereitgestellte Hubschrauber, Zelte, Bodenangriffsflugzeuge, Truppen, Luftabwehreinheiten, Fahrzeugkolonnen. Das Training des Deep Neural Networks erfolgt durch unüberwachtes Lernen aufgrund unbekannter Fehler, einer zunehmenden Anzahl von unbeschrifteten unausgeglichenen Datensätzen und aufgebauten Autoencodern, die als Diagnosewerkzeug zur Untersuchung von Satellitenbildern geeignet sind und die Vorhersage von militärischen Objekten als Anomalien aus großer Entfernung auf unterschiedlichen Oberflächen und Blickwinkeln ermöglichen. Um die Leistung des automatischen Labelings zu erhöhen, wurde die Bilddimensionalität des ursprünglichen Datensatzes nach den ersten 100 Trainingsepochen reduziert, und aus dem Encoder-Teil wurde ein neuer Datensatz erstellt, der mit denselben Gewichten wie der Autoencoder rekonstruierte Merkmalskarten enthält. Die generierten Vorhersagen des CNN-Modells sind hier [./gallery/140472457/Ultrasound](https://www.behance.net/gallery/140472457/Ultrasound) abrufbar und repräsentieren die generierten Bilder mit der automatischen Beschriftung. Das Ausmaß der Veränderungen wird besser durch die KDE-Verteilung und die Analyse des latenten Raums reflektiert.

Wie lässt sich vorhersagen, wo der Krieg beginnt? Das Training des neuronalen Netzwerks besteht aus einer binären Klassifikation, bei der das Gebiet keine militärische Intervention aufweist und wo in verschiedenen Zeitreihen Aktivitäten erfasst werden. Das Training könnte durch Autoencoding-Datensätze mit positiven und falsch positiven Sektoren optimiert werden, um zwischen der Testrekonstruktion von Fehlern für Gebiete mit geringerer Wahrscheinlichkeit von Anomalien zu unterscheiden.

Die militärische Aktivität wurde zwischen dem 13. und 22. Februar beob

achtet und erfasst, bevor Russland Militärtruppen in die Ukraine für "Friedensmissionen" entsandte, wie am Montag, dem 21. Februar, eine Woche später, angekündigt wurde. Mit den verfügbaren optischen und Radar-Satellitenbildern konnte die zivile Sicherheit garantiert und eine frühzeitige Reaktion auf die humanitäre Krise sichergestellt werden, bevor sich der Ausnahmezustand eskalierte.

Aufrichtige Anteilnahme an die Opfer des Krieges in der Ukraine und im Ausland.