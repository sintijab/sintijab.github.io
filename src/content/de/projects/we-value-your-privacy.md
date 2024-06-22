---
description: "Wir schätzen Ihre Privatsphäre"
pubDate: "June 22, 2024"
heroImage: "https://images.prismic.io/syntia/ZncucZbWFboweyE8_714158.jpg?auto=format,compress?auto=compress,format"
author: "Syntia"
categories: "Forschung, Informationszugang, Datenpolitik, Datenschutz, Open Source"
subcategories: "JavaScript, Konferenzen, DSGVO, Internet-Cookies, Networking-Events, Künstliche Intelligenz, Überwachung"
---

Meine Fähigkeiten zur Gesichtserkennung sind nicht großartig, aber KI hat die
Kraft, CNN in das Überwachungssystem zu integrieren, um gezielt Personen
unrechtmäßig ins Gefängnis zu schicken.

Während die Datenschutz-Grundverordnung (DSGVO) die Datenschutzrechte in Europa
messbar verbessert hat, hat sie die schlimmsten Probleme mit den Gesetzen, die
an einer Durchsetzungslücke leiden – einer großen Diskrepanz zwischen den
theoretisch festgelegten Schutzmaßnahmen und der Realität, wie Unternehmen
darauf reagieren, verschärft. Dies führte dazu, dass Unternehmen und europäische
Länder erhebliche Ressourcen in die Gestaltung von Compliance-Programmen
investierten, aber es brachte sie nicht wirklich dazu, sich um die Privatsphäre
der Kunden zu kümmern.

> „Man kann Daten nicht schützen, wenn man nicht weiß, wo sie sind.“
>
> Unbekannt

Im Jahr 2023, fünf Jahre nach Inkrafttreten der DSGVO, verhängte die irische
Datenschutzkommission (DPC) eine Strafe von 1,2 Milliarden Euro gegen Meta.
Diese rekordverdächtige Geldstrafe wurde wegen der Übertragung personenbezogener
Daten europäischer Nutzer in die Vereinigten Staaten ohne angemessene
Datenschutzmechanismen verhängt und stellt einen bedeutenden Meilenstein in der
Datenschutzregulierung dar.

Im Jahr 2021 verhängte die luxemburgische Nationale Kommission für Datenschutz
(CNPD) eine Geldstrafe von 746 Millionen Euro (888 Millionen US-Dollar) gegen
Amazon.com Inc. Die CNPD leitete eine Untersuchung ein, wie Amazon die
persönlichen Daten seiner Kunden verarbeitet, und stellte Verstöße im
Zusammenhang mit dem Werbetargeting-System von Amazon fest, das ohne
ordnungsgemäße Zustimmung durchgeführt wurde.

Im Jahr 2018 entstand durch einen Fehler im Design von Twitter ein Datenleck,
bei dem, wenn ein Benutzer auf einem Android-Gerät die mit seinem Twitter-Konto
verknüpfte E-Mail-Adresse änderte, die geschützten Tweets ungeschützt wurden und
daher für jeden (einschließlich der Behörden) ohne Wissen des Benutzers
zugänglich waren.

Im Jahr 2022 wurde ein saudi-arabischer Student der Universität Leeds nach
seiner Rückkehr nach Hause für einen Urlaub zu 34 Jahren Gefängnis verurteilt,
weil er ein Twitter-Konto hatte und Dissidenten und Aktivisten folgte und
retweetete.

VisionLabs, im Besitz von MTS und mit Hauptsitz in den Niederlanden, hat eine
weltweit führende Gesichtserkennungstechnologie entwickelt. Im Jahr 2022 wurden
laut Daten von OVD-Info mindestens 141 Personen präventiv durch
Gesichtserkennung festgenommen. Gesichtserkennungstechnologie verwendet
künstliche Intelligenz-Algorithmen, um Personen zu analysieren und zu
identifizieren.

In Moskau wurden mehr als 160.000 Kameras in der ganzen Stadt installiert – mehr
als 3.000 davon sind an das Gesichtserkennungssystem angeschlossen – und haben
den Strafverfolgungsbehörden geholfen. Jetzt zeigen mehr als 2.000
Gerichtsverfahren, dass diese Kameras eine wichtige Rolle bei den Verhaftungen
von Hunderten von Demonstranten gespielt haben. Die meisten dieser Personen
wurden 2021 festgenommen, nachdem sie an regierungsfeindlichen Demonstrationen
teilgenommen hatten.

### Wie kann man Tracking unter Wahrung der Privatsphäre der Kunden implementieren?

Obwohl das Ziel des Trackings darin besteht, die Nutzung einer Website zu
überwachen, kann dies dennoch ohne Erhebung personenbezogener Daten oder
persönlich identifizierbarer Informationen (PII), ohne Verwendung von Cookies
und unter Wahrung der Privatsphäre der Website-Besucher geschehen.

Tracking-Lösungen werden oft in Bezug auf ihre Nutzbarkeit überschätzt. Das
Finden der richtigen Werkzeuge für Ihre Geschäftsanalyse kann Ihnen helfen, eine
bessere Kontrolle darüber zu erlangen, welche Daten für die Analyse und
Berichterstattung zur Entscheidungsfindung notwendig sind und welche Werkzeuge
dies unterstützen, während sie die Privatsphäre der Besucher respektieren.

- A/B-Tests

- Produktlevel-Aufzeichnungen für Trichter- und Retentionsanalysen, Nutzerpfade,
  Verhaltensgruppen und andere UX-Metriken

- Softwareüberwachung und -beobachtbarkeit (OpenTelemetry, Prometheus, Grafana)

Die meisten A/B-Testanbieter verwenden lokalen Speicher, um IDs auf
Benutzerebene in Cookies zu speichern, um Benutzerreisen zu verfolgen und deren
Verhalten auf der Website zu verstehen. Marketer befassen sich hauptsächlich mit

- Erstanbieter-Cookies, die an einen internen Server gesendet werden

- Drittanbieter-Cookies, die von externen Domains erstellt werden und an
  Drittanbieter-Server wie LinkedIn, Google oder Meta gesendet werden.

Cookies von Drittanbietern ermöglichen es, dass alle Informationen Ihrer
Besucher an Dritte weitergegeben, gesendet oder verkauft werden, einschließlich
Werbetreibender, und gelten daher als aufdringlich und hoch invasiv für die
Privatsphäre der Nutzer.

Anonymisierung der Daten, um das Tracking über Plattformen hinweg zu vermeiden,
basierend auf Informationen, die sich auf eine identifizierte oder
identifizierbare lebende Person beziehen

- Anonymisierung der IP-Adressen

- Aggregation der Daten, um die Identifizierung einzelner Benutzer zu verhindern

- Verwendung von Pseudonymisierungstechniken zum Schutz persönlich
  identifizierbarer Informationen (PII)

- Deaktivierung des User-ID-Trackings, was es den meisten Werbetreibenden und
  Datenhändlern erheblich erschwert, Sie zu verfolgen

- Deaktivierung der Datenaustauscheinstellungen, die Daten an
  Drittanbieter-Dienste senden

#### Begrenzte Datenfreigabe

- Konfiguration der Datenaufbewahrungseinstellungen zur automatischen Löschung
  von Benutzer- und Ereignisdaten nach einem bestimmten Zeitraum

- Ermöglichung der Verwaltung von Benutzerpräferenzen (wenn sie benötigt werden)

- Erhebung der Daten, die nur für geschäftliche Entscheidungen und Analysen
  entscheidend sind

- Verwendung von trackingfreien Anbietern – Plausible, PostHog, Matomo, Umami

Finden Sie datenschutzfreundliche Tracking-Tools – Transparenz über ihre
Datenschutzrichtlinien, die nicht nur beschreiben, wie die Unternehmen mit den
Daten ihrer Kunden umgehen, sondern auch vollständige Offenlegung von ihren
Kunden.

Wenn Sie die Antworten über die Datenschutzrichtlinie nicht aus dem Dokument
finden können, könnte KI dies für Sie tun. Jason Mayes zeigte ein Beispiel, wie
man PDFs hochlädt und über die Plattform AskYourPDF über Datenschutz spricht.

#### Persönliche Daten

Persönliche Daten, die aus Datensammlungen und Aufzeichnungen
entfernt/pseudonymisiert werden müssen

- ein Name und Nachname;

- eine Wohnadresse;

- eine E-Mail-Adresse wie
  [name.nachname@firma.com](mailto:name.nachname@firma.com);

- eine Identifikationskartennummer;

- Standortdaten (zum Beispiel die Standortdatenfunktion auf einem
  Mobiltelefon)\*;

- eine Internet-Protokoll (IP)-Adresse;

- eine Cookie-ID\*;

- die Werbe-ID Ihres Telefons;

- Daten, die von einem Krankenhaus oder Arzt aufbewahrt werden und eine Person
  eindeutig identifizieren könnten.

Hören Sie über die „Privacy-First-Architektur“ in JSNation von Andrey Sitnik

[https://portal.gitnation.org/contents/how-to-make-your-open-source-project-popular](https://portal.gitnation.org/contents/how-to-make-your-open-source-project-popular)

Andere Quellen:

Europäischer Datenschutzausschuss

[https://www.edpb.europa.eu/our-work-tools/documents/our-documents\_en](https://www.edpb.europa.eu/our-work-tools/documents/our-documents_en)

Wie man ein datenschutzkonformes A/B-Test-Tool auswählt
[https://www.convert.com/blog/privacy/how-to-buy-privacy-compliant-ab-testing-tool/](https://www.convert.com/blog/privacy/how-to-buy-privacy-compliant-ab-testing-tool/)

Den Browser hacken, um digitale Zwillinge unserer Benutzer zu erstellen

[https://youtu.be/cWxpp9HwLYw?feature=shared](https://youtu.be/cWxpp9HwLYw?feature=shared)\
Jason Mayes „Web Apps der Zukunft mit Web-KI“ auf JSNation
[https://portal.gitnation.org/contents/web-apps-of-the-future-with-web-ai](https://portal.gitnation.org/contents/web-apps-of-the-future-with-web-ai)
