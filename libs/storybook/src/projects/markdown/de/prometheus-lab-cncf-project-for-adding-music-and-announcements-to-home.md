# **Prometheus Lab, CNCF-Projekt zur Hinzufügung von Musik und Ansagen zu Hause**

Projekt Coldplay von Erwin de Keijzer, DevOps-Ingenieur, hat den Projektphasenprozess bei der Entwicklung einer Softwarelösung für die Hinzufügung von Musik und Ansagen zu seinem Zuhause geleitet.

Während Prometheus zur weltweit prominentesten Open-Source-Überwachungstool geworden ist, geschweige denn OpenTelemetry, Grafana und die neuesten Projektaktualisierungen durch CNCF, lag der Schwerpunkt auf der Einführung von Überwachungs- und Beobachtungstools auf der KubeCon und CloudNativeCon 2023.

Bei der KubeCon + CloudNativeCon Europe 2023 handelte es sich um eine Veranstaltung mit mehr als 10.000 Teilnehmern, von denen 58 % zum ersten Mal an dieser globalen Cloud-Native-Konferenz teilnahmen.

Die Aufmerksamkeit für Proof-of-Concept- und Sandbox-Projekte zeigt oft, dass die Entscheidung über das endgültige Projektergebnis nicht nur von der Softwarearchitektur abhängt, sondern von den Testdurchläufen in der Projektentwicklungsphase.

Erwin de Keijzer, DevOps-Ingenieur, hat die Verwendung von Überwachungs- und Beobachtungstools vorgestellt, um mehr über Prometheus zu erfahren und die Abnormalitätserkennung mit PromQL-Abfragen zu entdecken.

#### **Projekt Coldplay - Verwendung von CNCF-Projekten zur Hinzufügung von Musik und Ansagen in meinen Hausaufzug.**

##### **Coldplay-Ziele:**

- Wissen, wo sich der Aufzug befindet;
- Musik hinzufügen, wenn der Aufzug sich bewegt;
- Ansagen abspielen, wenn der Aufzug an einem Stockwerk anhält;
- Den Aufzug nicht kaputt machen;
- Die interne Elektronik des Aufzugs nicht beschädigen.

#### **Benachrichtigungen:**

![Bild](https://images.prismic.io/syntia/3a7f4e2f-fff0-44ef-8eef-f71422107799_screenshot-2023-04-20-at-12.52.54.png?auto=compress,format)

![Bild](https://images.prismic.io/syntia/6b9bf08b-5a88-4e63-aa9f-7aa6413ac99b_screenshot-2023-04-20-at-12.54.11.png?auto=compress,format)

- Aufzug steckt zwischen den Stockwerken fest;
- Aufzug bewegt sich zu schnell;
- Aufzug bewegt sich zu langsam;
- Aufzug außerhalb des Bereichs (< 0 cm oder > 550 cm).

### **Versuch #1**

Ein Ultraschallsensor, der an einen Raspberry Pi angeschlossen ist, erstellt Messungen. Die Entfernung scheint zuverlässig zu sein, aber die horizontalen Trägerstützen im Aufzugsschacht erzeugen Echos für die Schallwellen, und der Aufzugsschacht ist zu hoch (über 2 m), ein Problem mit der vertikalen Skalierung.

### **Versuch #2**

Der TF-Luna LiDAR-Entfernungssensor, der bis zu 8 m reicht, eine Genauigkeit von 2 % der gemessenen Entfernung aufweist und bei 8 m eine Abweichung von 16 cm aufweisen kann, eine Bildwiederholfrequenz von bis zu 250 Hz und verschiedene Verbindungsmöglichkeiten bietet, z. B. ein triggerbasiertes Mechanismus.

Ein Problem mit Jitter für die Aufzugshöhe hängt mit der Temperatur des Chips auf dem Sensor zusammen (Einheit: 0,01 Celsius; Zeitstempel gemäß den TF Luna I2C-Spezifikationen).

![Bild](https://images.prismic.io/syntia/d2547ded-c47c-49e5-ba3e-cc6dea613587_screenshot-2023-04-20-at-11.47.48.png?auto=compress,format)

![Bild](https://images.prismic.io/syntia/53181ac6-c67a-4116-b4bd-59c12d2bd01e_screenshot-2023-04-20-at-12.01.29.png?auto=compress,format)

![Bild](https://images.prismic.io/syntia/617ab138-6ffc-4997-94fe-66ef4b37c2f1_screenshot-2023-04-20-at-12.06.45.png?auto=compress,format)

Überwachung mit Prometheus und Grafana

### **Softwarearchitektur:**

**1. Versuch** mit **Mikroservice-Ansatz** - Auf dem Raspberry Pi gibt es zwei Komponent

en: Messen und Sprechen, die Messungen durchführen und die Ansagen sprechen. Der "Scientist" ist das Coldplay-Lied, das die Kontrolle über das Projekt übernimmt, alle Messungen vornimmt, Entscheidungen über das Abspielen von Musik trifft, die Benutzeroberfläche aktualisiert und Daten an Prometheus sendet. UI, Prom Writer (Prometheus) und der Scientist verwenden das Subnetz. Es basiert auf Tailscale, das den Aufbau eines Overlay-Mesh-Netzwerks zwischen all Ihren Geräten und den Aufbau von Verbindungen zwischen ihnen im Tailnet ermöglicht.

**2. Versuch** mit **Monolith-Architektur** - Projekt namens Paradise, das in Go geschrieben ist, ist mit Prometheus und Grafana verbunden, um die Ergebnisse auszulesen.

Nachdem das Projekt einige Stunden lang ausgeführt wurde, gibt es Lärm aus, der Bodenergebnisse zurückgibt. Ein Neustart funktionierte für einige Sekunden, und die Anpassung der Zeit zwischen den Messungen basierend auf der Chip-Temperatur löste das Problem nicht.

Der **3. Versuch** war eine **architektonische Neugestaltung** mit Rust, die die Messungen vornimmt und sie in NATS schreibt. Dann artikuliert ein Dienst namens Yellow die Messungen für den Lautsprecher, aktualisiert die Benutzeroberfläche und sendet die Daten an Prometheus.

![Bild](https://images.prismic.io/syntia/c89413bf-f8f5-457d-84c6-9133454bb995_screenshot-2023-04-20-at-12.10.53.png?auto=compress,format)

![Bild](https://images.prismic.io/syntia/7b90532a-efb5-4103-9692-3eed32674db2_screenshot-2023-04-20-at-12.36.12.png?auto=compress,format)

![Bild](https://images.prismic.io/syntia/f6a24d7c-dd18-4951-9db9-7e1c00eda89c_screenshot-2023-04-20-at-12.40.17.png?auto=compress,format)

#### **Latenz des Dienstes**

Die Hardware oben auf dem Aufzugsschacht hat den Bluetooth-Lautsprecher, der jedoch mit einem Audiokabel verbunden ist, das keine Latenz aufweist, um sicherzustellen, dass die Zeit zwischen dem Starten des Aufzugs und dem Abspielen der Musik kurz ist. Die Hardware-Box ist im Aufzug mit Magneten befestigt.

Um sich mit dem Raspberry Pi zu verbinden, **SSHen Sie sich in den richtigen Raspberry Pi** für den Remote-Zugriff ein. Die Software ist mit einer Go-HTML-Webvorlage und JavaScript erstellt und richtet die WebSocket-Verbindung vom Server zum Client über den Ereignisstrom der eingehenden Nachricht ein.

Der Erfinder Generalmajor George Owen Squier, der 1910 als Erfinder des Telefonträger-Multiplexings gilt, entwickelte die ursprüngliche technische Grundlage für **Muzak** und besaß in den 1920er Jahren mehrere US-Patente im Zusammenhang mit der Übertragung und Verteilung von Signalen über elektrische Leitungen.

Während Muzak ursprünglich zehntausende Originalaufnahmen von Künstlern der späten 1930er und 1940er Jahre produziert hatte, erforderte ihre neue Strategie einen anderen Klang.

![Bild](https://images.prismic.io/syntia/eebf8b9d-503b-4c32-b940-d50a751882ce_screenshot-2023-04-20-at-11.47.25.png?auto=compress,format)

![Bild](https://images.prismic.io/syntia/76db2edb-8e45-43a0-a298-d1d49dc0b05a_screenshot-2023-04-20-at-12.08.17.png?auto=compress,format)

![Bild](https://images.prismic.io/syntia/ba0ad0b4-bdd0-4336-8d41-f56996d9bfcc_screenshot-2023-04-20-at-12.36.54.png?auto=compress,format)

#### **Architektonische Neugestaltung der Software:**

Entscheidung über die Hochfrequenzerkennung - Ultraschallsensor vs. **einzelpunktgerechtes LiDAR** mit I2C und TF Luna;

Lösen von Verbindungsproblemen - Ssh auf den falschen Host beim Testen von Audio;

Hardware-Barrieren - Raspberry Pi beim Trennen des Netzwerkswitches;

Zwei Kopien der Messsoftware gleichzeitig ausführen;

Schlechte Lötarbeit an den Steckverbindern des TF Luna;

Cross-Compilieren von Rust und Go vom M1 Mac zu Linux Arm.

Verweis auf das Projekt: [https://github.com/gnur/coldplay](https://github.com/gnur/coldplay)