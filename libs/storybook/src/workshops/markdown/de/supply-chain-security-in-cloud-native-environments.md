\---  
description: 'KubeCon 2023 - Sicherheit der Lieferkette in Cloud-Native-Umgebungen'  
pubDate: 'Apr 29, 2023'  
heroImage: '3999c33e-70ea-4679-a7f9-4a4e126b6fa4_196476203-3e288fa7-241e-4520-aacb-8ebb9a8e442e.webp?auto=compress,format'  
author: 'Syntia'  
categories: 'Workshops, Cloud Infrastruktur, Sicherheit, Lieferkette'  
subcategories: 'Software Attestation, Herkunfts Attestation, Infrastruktur Stückliste, Stückliste, Lieferkettenstufen für Software Artefakte, Software Lieferkette, Transportschichtsicherheit, Secure Sockets Layer, Verschlüsselung'  
\---  

Im Kapitel zur Sicherheit der Lieferkette während der KubeCon 2023 erklärten Jeremy Rickard, Ido Neeman und Grace Nguyen, warum SBOM und IBOM in Verbindung mit der cloudbasierten Infrastruktur gleichermaßen wichtig sind, da diese letztendlich softwaredefiniert und gesteuert ist, und wie SBOM mit einem vollständigen Inventar des Infrastruktur-Stacks vervollständigt werden kann.

Von den Tools und dem Erstellen von Software- und Infrastruktur-Bill of Materials werden wir Beispiele durchgehen, um die Bereitstellung der Lieferkette für cloudbasierte Umgebungen zu erstellen.

### **Das Ziel ist die Schaffung einer Grundlage und Vertrautheit mit der Sicherheit der Software-Lieferkette.**

"Um die Schwachstellenanalyse zu erleichtern, sollten Hersteller die in den Produkten enthaltenen Komponenten mit digitalen Elementen identifizieren und dokumentieren, auch durch die Erstellung eines Sicherheits-Bill of Materials."

_Vorschlag für eine Verordnung des Europäischen Parlaments und des Rates über horizontale Cybersicherheitsanforderungen für Produkte mit digitalen Elementen und zur Änderung der Verordnung (EU) 2019/1020_

![](https://images.prismic.io/syntia/3999c33e-70ea-4679-a7f9-4a4e126b6fa4_196476203-3e288fa7-241e-4520-aacb-8ebb9a8e442e.webp?auto=compress,format)

![](https://images.prismic.io/syntia/a0ebf46d-ffff-486e-b1b9-52be68b24306_196477253-7ede9ec5-a995-4e59-aab7-8acb35dc56cf.webp?auto=compress,format)

![](https://images.prismic.io/syntia/b0ee3537-2638-47d7-bcb2-429ad3af0092_196480219-ff3ed225-65f6-401e-a58a-f8b823e69475.webp?auto=compress,format)

**Grafik zur Verständnis der Artefaktzusammensetzung**

### **Framework-Sicherheit**

**Attestation**: Signierte Aussagen (Aussagen zur Netzwerkkonfiguration, Abhängigkeiten, Infrastruktur) 

**Herkunft**: Materialien zu Artefakten und deren Ursprung

**SBOM** (Software Bill of Materials): Software-Bill of Materials und wie die Software aussieht

**IMOB** (Infrastruktur-Bill of Materials): Infrastruktur-Bill of Materials und wie die gesamte Infrastruktur aussieht

#### **SLSA-Sicherheitsrahmen zum Schutz von Software und aufgebauter Infrastruktur:**

1.  Dokumentation des Build-Prozesses (nicht signierte Herkunft)
    
2.  Manipulationssicherheit des Build-Dienstes (gehostete Quelle/Build, signierte Herkunft)
    
3.  Zusätzlicher Schutz vor bestimmten Bedrohungen (Sicherheitskontrollen auf dem Host, nicht fälschbare Herkunft)
    
4.  Höchstes Maß an Vertrauen und Sicherheit (Zwei-Parteien-Prüfung + hermetischer Build)
    

Von slsa.dev

Über Sicherung der Lieferkette können wir nicht sprechen, ohne Verschlüsselung zu verstehen.

Die digitale Signatur hat mit der asymmetrischen Verschlüsselung zu tun, während TLS-Verbindungen eine symmetrische Verschlüsselung verwenden.

Der Prozess der signierten Signatur besteht darin, dass der Unterzeichner die Binärdateien mit seinem privaten Schlüssel verschlüsselt und die Signatur zusammen mit dem Paket und der Signatur des öffentlichen Schlüssels zur Entschlüsselung übergibt.

#### **Sigstore**

**cosign**: Signieren und Überprüfen von Software-Artefakten - Container, Standarddateien, Blobs

**fulcio**: Root-Zertifizierungsstelle

**rekor**: Transparenzprotokolle

Generieren Sie ein Schlüsselpaar, signieren Sie mit dem privaten Schlüssel und überprüfen Sie das Paket mit einem signierten öffentlichen Schlüssel:

_cosign generate-key-pair_

_cosign sign –key cosign.key goose/demo_

_cosign verify –key cosign.pub goose/demo_ 

Fulcio ist eine Zertifizierungsstelle (CA), die gut darin ist, kurzlebige Zertifikate zu erstellen, die mit einem OICD-ID-Token (Gmail), einem öffentlichen Schlüssel und einer Challenge co-signiert sind.

#### **Rekor**

Manipulationssicheres Protokoll der Metadaten aus der Software-Lieferkette

Um zu überprüfen, ob dieses Paket von Kubernetes 1.27.0 aus dem Register gültig ist, führen Sie Folgendes aus:

_cosign verify \\_

_–certificate=identity=_[krel-trust@k8s-releng-prod.iam.gserviceaccount.com](mailto:krel-trust@k8s-releng-prod.iam.gserviceaccount.com) _\\_

_–certificate-oidc-issuer=_[https://accounts.google.com](https://accounts.google.com) _\\_

[registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _| jq ._

_Überprüfung des Registers_ [registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _.._

**Die folgenden Überprüfungen wurden bei jeder dieser Signaturen durchgeführt:**

*   Die cosign-Aussagen wurden validiert
    
*   Die Existenz der Aussagen im Transparenzprotokoll wurde offline überprüft
    
*   Das Codesigning-Zertifikat wurde mit vertrauenswürdigen Zertifikatsstellenzertifikaten überprüft
    

Der Protokollindex gibt an, ob das Zertifikat gültig ist oder nicht, als dieses Paket signiert wurde

Crane ist ein Tool zur Interaktion mit Remote-Images und Registries

crane digest [registry.k8s.io/kube-apiserver:v1.27.0](//registry.k8s.io/kube-apiserver:v1.27.0) _\# hat des Inhalts_

_crane manifest_ \[registry.k8s.io

/kube-apiserver:sha256-89b8d9dbef2b905b7d028…\](//registry.k8s.io/kube-apiserver:sha256-89b8d9dbef2b905b7d028%E2%80%A6)

Der Hash ist der Inhalt des Pakets, den cosign dem Zertifikat gibt, und die Signatur - es erhält den öffentlichen Schlüssel aus dem Zertifikat, führt die Entschlüsselung durch und vergleicht sie mit dem Manifest, es speichert die Metadaten während des Prozesses:

_"dev.cosignproject.cosign/signature"_

[https://docs.sigstore.dev/cosign/verify/](https://docs.sigstore.dev/cosign/verify/)

Aufgrund von cosign ist Sigstore für Containerregistrierung optimiert, die Übernahme in andere Open-Source-Software in der Sicherheitskette steht ganz oben auf der Agenda.

Sigstore für Python: [https://github.com/sigstore/sigstore-python](https://github.com/sigstore/sigstore-python)

Sigstore für npm: [https://github.com/sigstore/sigstore-js](https://github.com/sigstore/sigstore-js) 

#### **In-toto**

In-toto ist eine Richtlinienrichtlinie für den Überprüfungsprozess in zwei Schritten:

*   Aufzeichnen, welche Schritte, von wem und in welcher Reihenfolge in der Software-Lieferkette durchgeführt wurden
    
*   Überprüft die Aussage und die Berechtigungen des Erstellers mit Beweismetadateien
    

##### **Die Rollen des Update Frameworks (TUF)**

TUF ist die letzte Meile der Paketverteilung. Es geht nicht darum, _ob_, sondern _wann_ Ihr Paket, Ihr Schlüssel oder Ihr Repository kompromittiert wird, um die Auswirkungen so gering wie möglich zu halten. Das Bedrohungsmodell sind **Rollen**, die Berechtigungen für Folgendes erteilen:

*   Root-Berechtigung, um andere Rollen zu spezifizieren
    
*   Ziele: geben die Gültigkeit von Paketen an
    
*   Snapshot: bereitstellen von Paketversionen
    
*   Zeitstempel: wann das Paket zuletzt aktualisiert wurde
    
*   Widerruf + Sicherheit im Vergleich zu Sigstore
    

### **Irrtümer in Open Source:**

#### **Es geht nur um den Code.**

Am Beispiel von SolarWinds, wo der Angriff auf den Prozess abzielte, bis der Verbraucher das Paket erhält. Über 18.000 Kunden hatten ihr Paketupdate angewendet, was dann dem Remote Access Trojaner ermöglichte, alle ihre Kundensysteme und -netzwerke zu infizieren.

#### **Wir sind wahrscheinlich kein gutes Ziel.**

Die Sicherung der Lieferkette ist nicht nur in der Krypto relevant.

#### **Wir können wahrscheinlich nie die Risiken in unserer Software-Lieferkette beseitigen - es ist eine Anstrengung des gesamten Ökosystems.**

Es ist eine gemeinsame Verantwortung und ein Gespräch, das wir in der Gemeinschaft führen müssen - die Tatsache, dass Open Source oft unterfinanziert und von überarbeiteten Entwicklern gepflegt wird. Wie bieten wir Governance und Unterstützung, um die Ressourcen zu erhalten, die sie benötigen? Zur Investition in die SLSA-Sicherheit der Lieferkette.

### **Was kommt als Nächstes?**

1.  Fortschritt und neue Standards werden gerade jetzt gemacht
    
2.  Andere Komponenten: Schwachstellen-Scanning, Sicherung von Build-Umgebungen, Patchen von Containern.
    

![](https://images.prismic.io/syntia/7bb9c1f3-5f2b-4d33-9abc-d7605e836577_182689788-70acefc1-6d69-4972-abbf-3e60c0d4c014.webp?auto=compress,format)

Einige Beispiele für Fragen, die von GUAC bereitgestellt wurden: [https://github.com/guacsec/guac](https://github.com/guacsec/guac)

## **Überprüfung der Ketten am Tor: Erstellen von Lieferkettenrichtlinien**

#### **Wie setzen wir Richtlinien durch und kontrollieren, was sich in unserem Cluster befindet?**

Wenn Sie Kubernetes 1.26 verwenden, sind Zulassungsrichtlinien ein besserer Ausgangspunkt, um Richtlinien zu erstellen und sie auf Ihren Cluster anzuwenden.

#### **Zulassungscontroller**

Kubernetes-Zulassungscontroller sind Plugins, die regieren und durchsetzen, wie der Cluster verwendet wird. Sie können als eine Art Torwächter betrachtet werden, der (authentifizierte) API-Anfragen abfängt und die Anfrageobjekte ändern oder die Anfrage insgesamt verweigern kann. Der Zulassungskontrollprozess besteht aus zwei Phasen: die _mutierende_ Phase wird zuerst ausgeführt, gefolgt von der _validierenden_ Phase.

![](https://images.prismic.io/syntia/9c0c110c-59d4-4980-b0f5-111d8941c8d4_admission-controller-phases.webp?auto=compress,format)

### **Sigstore Policy Controller**

Der Policy-Controller-Zulassungscontroller kann verwendet werden, um Richtlinien in einem Kubernetes-Cluster auf der Grundlage von überprüfbaren Lieferkettenmetadaten von cosign durchzusetzen. Er löst auch die Image-Tags auf, um sicherzustellen, dass das ausgeführte Image nicht von dem Zeitpunkt abweicht, zu dem es zugelassen wurde.

Heute kann ein Policy-Controller Signaturen und Aussagen zu Container-Images automatisch validieren und Richtlinien (mit cue oder rego ) gegen Aussagen anwenden. Die Durchsetzung wird auf einer pro-Namespace-Basis konfiguriert, und es werden mehrere Richtlinien unterstützt. Weitere Informationen [https://docs.sigstore.dev/policy-controller/overview/](https://docs.sigstore.dev/policy-controller/overview/)

### **Gatekeeper**

Gatekeeper basiert auf dem Open Policy Agent. Im Vergleich zur Verwendung von [OPA mit seinem Sidecar kube-mgmt](https://www.openpolicyagent.org/docs/kubernetes-admission-control.html) (auch bekannt als Gatekeeper v1.0) bietet Gatekeeper die folgenden Funktionen:

*   Eine erweiterbare, parametrisierte [Richtlinienbibliothek](https://open-policy-agent.github.io/gatekeeper-library/website/)
    
*   Native Kubernetes CRDs zur Instanziierung der Richtlinienbibliothek, auch als "Constraints" bezeichnet, und zur Erweiterung dieser mit "Constraint Templates". Es teilt das Labelschema, einschließlich der Ziele, um die Labels für Metadaten einzuschränken.
    
*   Native Kubernetes CRDs für [Mutation](https://open-policy-agent.github.io/gatekeeper/website/docs/mutation/)\-Unterstützung
    
*   Audit-Funktionalität
    
*   Unterstützung für externe Daten
    

OCI 1.1 – "Artifacts" und Referrers API enthält Indexartefakte wie z. B. amd64-Indexartefakte und SBOM-Artefakte. Der Signaturblock des Subjekts verweist auf den Container zurück.

Generieren Sie ein SBOM mit zwei Signaturen und inspizieren Sie den SBOM-Referrer-Baumgraphen:

```bash
crane ls kubeconeu.azurecr.io/demo-app
# sha-d0992af7eb82…
# sha256-8920357d77a1c..
# sha256-8920357d77a1c…sig
# Bild mit zwei Signaturen, eine ist Cosign, die andere ist Notation

```

Oder verwenden Sie oras, um den Baum zu entdecken:

```bash
oras discover -o tree kubeconeu.azure.io/demo-app@sha-d0992af7eb82…
# SBOM-Artefaktbild-Referrer

```

#### **Wie schreiben wir Richtlinien für diese Artefakte?**

**Ratify** ist ein externer Anbieter für Gatekeeper. Ein Verifizierungsmotor als ausführbare Binärdatei sowohl auf Kubernetes als auch auf einem Kubernetes-Cluster, der die Verifizierung von Sicherheitsmetadaten für Artefakte ermöglicht und nur die Bereitstellung zulässt, die den Richtlinien entsprechen, die Sie vor der Bereitstellung im Cluster erstellen.

Es läuft auch als HTTP-Dienst. Cosign-Verifizierer haben Signaturen und OCI-Spezifikationsverweise, in denen der Descriptor-Medientyp, der Artefakttyp, der Verweis und der Subjekttyp aufgeführt sind. Beispiel:

```bash
COSIGN_EXPERIMENTAL=1 cosign verify kubeconeu.azure.io/demo-app@sha-d0992af7eb82… --certificate-identity https://github.com/jeremyrickard/kubecon-eu-demo-app/blob/main/.github/workflows/slsa-goreleaser.yml@refs/tags/v0.0.0-alpha.0 --certificate-oidc-issuer https://token.actions.githubusercontent.com

```

Überprüfen Sie mit Ratify:

```bash
~/.ratify.ratify verify -c cosign.js on -s kubeconeu.azure.io/demo-app@sha-d0992af7eb82…

```

##### **Bildverifizierung mit Gatekeeper und Ratify**

Externe Datenrichtlinie, wenden Sie Richtlinien auf Pods an, um sicherzustellen, dass sie Signaturen damit verknüpft haben:

Führen Sie ein nicht signiertes Image aus:

```bash
kubectl run demo --image=webbitnetworks.asurect.io/test/notary-image:unsigned
# Fehler vom Server (Verboten): Das Zulassungshook "validation.gatekeeper.sh" hat die Anforderung verweigert: [ratify-constraint] Das Subjekt konnte nicht verifiziert werden: webbitnetworks.asurect.io/test/notary-image@sha256:17490f904cf27..

```

Führen Sie ein signiertes Image aus:

```bash
kubectl run demo --image=kubeconeu.azurecr.io/demo-app:sha-d0992af7eb825e..
# pod/demo erstellt

```

Die Verifizierung wird in einer Verifier-Konfigurationsdatei definiert:

```yaml
apiVersion: config.ratify.deislabs.io/v1beta1
kind: Verifier
metadata:
  name: package-checker
spec:
  name: kubecon-demo
  artifactTypes: application/spdx+json
  parameters:
    disAllowedLicenses:
      - AGPL-3.0-or-later
    disAllowedPackages:
      - name: "github.com/mitchellh/mapstructure"
        version: "v1.5.0"
  source:
    artifact: kubeconeu.azurecr.io/ratify/package-checker:v0.0.0

-alpha.0

```

Bauen und veröffentlichen Sie das Plugin in Ihrer ACR-Instanz und registrieren Sie es im Cluster. Das Plugin besteht aus einem in Go geschriebenen Programm, das auf einer Linux-Maschine als Binärdatei ausgeführt wird und in einer Schleife disallowed-Versionen erkennt, Fehlermeldungen generiert und zurücksendet.

Bauen Sie die Darwin-Binärdatei:

```bash
CGO_ENABLED=0 GOOS=linux go build -o bin/package-checker .

```

Veröffentlichen Sie das Plugin mit oras, ähnlich wie bei `docker push`:

```bash
oras push kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0 ./package-checker
oras discover kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0
oras pull kubeconeu.azurecr.io/ratify/package-checker:v0.0.0-alpha.0

```

Erstellen Sie im Cluster einen Kubernetes-Verifier:

```bash
kubectl apply -f package-verifier.yml

```

Resolvieren Sie das Plugin-Manifest und laden Sie das Plugin herunter:

```bash
kubectl get verifiers

```

Führen Sie die Compliance-Überprüfung im Cluster durch:

```bash
kubectl run demo --image=kubeconeu.azure.io/demo-app:sha-d0992af7eb82…

```

### **Unterstützende Materialien**

[https://open-policy-agent.github.io/gatekeeper/website/docs/howto](https://open-policy-agent.github.io/gatekeeper/website/docs/howto)

[https://open-policy-agent.github.io/gatekeeper/website/docs/next/externaldata](https://open-policy-agent.github.io/gatekeeper/website/docs/next/externaldata)

[https://github.com/opencontainers/image-spec/blob/main/manifest.md](https://github.com/opencontainers/image-spec/blob/main/manifest.md)

[https://github.com/deislabs/ratify/blob/main/docs/reference/dynamic-plugins.md](https://github.com/deislabs/ratify/blob/main/docs/reference/dynamic-plugins.md)

[https://zotregistry.io](https://zotregistry.io)

[https://github.com/opencontainers/image-spec/pull/1049](https://github.com/opencontainers/image-spec/pull/1049)

[https://oras.land](https://oras.land/)

[https://github.com/jeremyrickard/ratify-package-checker](https://github.com/jeremyrickard/ratify-package-checker)

## **Über den Abhängigkeitsgraphen und SBOM-Exporte in GitHub**

Der Abhängigkeitsgraph ist eine Zusammenfassung der im Repository gespeicherten Manifest- und Sperrdateien sowie aller Abhängigkeiten, die über die Dependency Submission API (Beta) für das Repository eingereicht wurden. [https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/exporting-a-software-bill-of-materials-for-your-repository](https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/exporting-a-software-bill-of-materials-for-your-repository)

Für jedes Repository zeigt er Folgendes an:

- Abhängigkeiten, die Ökosysteme und Pakete, von denen sie abhängen
    
- Abhängige, die Repositories und Pakete, die von ihnen abhängen
    
- Für jede Abhängigkeit können Sie Informationen zur Lizenz und zur Schwere der Schwachstellen anzeigen. Sie können auch nach einer bestimmten Abhängigkeit suchen. Abhängigkeiten werden automatisch nach Schwachstellen-Schweregrad sortiert.
    

Sie können den aktuellen Zustand des Abhängigkeitsgraphen für Ihr Repository als Software Bill of Materials (SBOM) im Industriestandard SPDX-Format exportieren.

Ein SBOM ist ein formelles, maschinenlesbares Inventar der Abhängigkeiten eines Projekts und zugehöriger Informationen (wie Versionen, Paketkennungen und Lizenzen). SBOMs helfen dabei, Risiken in der Lieferkette zu reduzieren, indem sie:

- Transparenz über die von Ihrem Repository verwendeten Abhängigkeiten bieten
    
- ermöglichen, Schwachstellen frühzeitig im Prozess zu identifizieren
    
- Einblicke in die Lizenzkonformität, Sicherheits- oder Qualitätsprobleme, die in Ihrem Code vorhanden sein können, bereitstellen
    
- Ihnen helfen, verschiedene Datenschutzstandards besser einzuhalten
    

Wenn Ihr Unternehmen Software gemäß Executive Order 14028 an die US-Bundesregierung liefert, müssen Sie ein SBOM für Ihr Produkt bereitstellen. Sie können SBOMs auch im Rahmen Ihres Auditprozesses verwenden und sie zur Einhaltung regulatorischer und rechtlicher Anforderungen einsetzen.

## **GUAC: Graph zur Verständnis der Artefaktkomposition**

Durch die Erkundung von Kubernetes-Containern können wir herausfinden, welche Metadaten/Attestationen damit verbunden sind.

Wenn wir beispielsweise nach den kube-controller-manager-Containern für v1.24.6 suchen, können wir die Binärdateien und deren Metadaten finden.

In diesem Beispiel der GUAC-Visualisierung mit Untergraph können wir Folgendes beobachten:

- Wir sehen das Kubernetes-Container-Paket (rot) hat zwei Binärdateien: /go-runner und /usr/local/bin/kube-controller-manager.
    
- Wir sehen, dass wir eine SLSA-Attestation (orange) für die kube-Binärdatei haben, aber keine Attestationen für /go-runner.
    
- Wir bemerken auch, dass es Metadaten für die kube-Binärdatei in Scorecards gibt, die durch das Verständnis, dass die kube-Binärdatei (durch SLSA) aus dem Quellrepository/Commit von Kubernetes abgeleitet wurde, erstellt wurden und Informationen zu Scorecards enthält.

- Wir können die Scorecard-Informationen im Panel auf der rechten Seite anzeigen.

Referenz: [https://github.com/guacsec/guac/blob/main/SETUP.md](https://github.com/guacsec/guac/blob/main/SETUP.md)

![GUAC Graph](https://images.prismic.io/syntia/dbaab748-24b1-4274-a5be-b6c44455d997_182689908-477f4770-1142-4c18-8fa9-16d93dcf84b4.webp?auto=compress,format)

## **Attestation mit TACOS**

Das **TACOS-Framework** ist darauf ausgelegt, in dieser frühen Entwurfsphase gut mit SLSA (Supply Chain Levels for Software Artifacts) und GUAC (Graph for Understanding Artifact Composition) zusammenzuarbeiten, und auch in Zukunft. Das SLSA-Framework bietet eine standardisierte Möglichkeit, die Herkunft von Artefakten zu bestätigen.

Eine TACOS-Attestation ist eine einfache Datenstruktur, die die Attestationsmetadaten und die Aussagen enthält, die auf sichere Softwareentwicklungspraktiken für Open-Source-Pakete hinweisen.

Die **Attestation** ist der Dokumentencontainer mit Metadaten zur Erstellung der Attestation und den Aussagen zu den Open-Source-Bibliotheken, die von einer Anwendung oder Organisation verwendet werden. Es handelt sich um eine Aussage über den Status eines Satzes sicherer Entwicklungssoftwarepraktiken zu einem bestimmten Zeitpunkt.

Beispiel mit einem gehobenen Paket (ein Paket, bei dem ein Maintainer mit Tidelift zusammenarbeitet): [https://github.com/tacosframework/examples](https://github.com/tacosframework/examples)

```json
{
  "@context": "domain/namespace",
  "@id": "document URL",
  "signature": {"type": "sha256", "digest": "78ab8..."},
  "author": "Vorname Nachname",
  "role": "Attestor",
  "timestamp": "2022-03-23T05:35.37:00+04:00",
  "TACOSversion": "1",
  "application": "HelloWorld",
  "statements": [
    {
      "PackageName": "com.fasterxml.jackson.core:jackson-databind",
      "PackagePlatform": "maven",
      "PURL": "pkg:maven/com.fasterxml.jackson.core/jackson-databind",
      "UpstreamRepositoryURL": "https://github.com/FasterXML/jackson",
      "SPDXLicenseLatestRelease": "Apache-2.0", 
      "LatestRelease": "2.14.2",
      "ReleasesInUse": ["2.14.2, 2.14.0, 2.9.8"],
      "SBOM": [
        {
          "type": "cycloneDX",
          "version": "1.2",
          "format": "XML",
          "DigitalSignatureURL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-cycloneDX.xml.sig",
          "URL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-cycloneDX.xml"
        },
        {
          "type": "SPDX",
          "version": "2.3",
          "format": "SPDX",


          "DigitalSignatureURL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-SPDX.spdx.sig",
          "URL": "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind-latest-SPDX.spdx"
        }
      ],
      "PackageManager2FAEnabled": "True",
      "SourceRepo2FAEnabled": "True",
      "KnownReleasesURL":  "https://tidelift.com/packages/maven/com.fasterxml.jackson.core:jackson-databind/releases-map",
      ... und so weiter ...    
    }
  ]
}
```

## **DaggerBoard Schwachstellenanalyse**

**DaggerBoard** ist ein Schwachstellenanalysetool, das Software Bill of Material (SBOM)-Dateien (CycloneDX, SPDX) einliest und die Ergebnisse in einem lesbaren Format ausgibt. Dieses Tool bewertet Softwareabhängigkeiten, die in der SBOM-Datei für Paketschwachstellen aufgeführt sind.

![DaggerBoard Diagramm](https://images.prismic.io/syntia/26901cca-cc7b-4367-ae6d-47d2d719c998_readme_db_diagram.webp?auto=compress,format) [https://github.com/nyph-infosec/daggerboard](https://github.com/nyph-infosec/daggerboard)

## **Softwarepaketinspektion mit TERN**

**Tern** ist ein Softwarepaketinspektionstool, das ein Software Bill of Materials (SBOM) für Container erstellen kann. Tern ist ein Inspektionstool, um die Metadaten der in einem Container-Image installierten Pakete zu finden. Der Gesamtbetrieb sieht folgendermaßen aus:

- Es analysiert die erste Schicht des Container-Images, um Informationen wie den Distro-Typ, das Paketformat und die Paketmanager zu sammeln.
    
- Dann führt es Skripte aus der "Befehlsbibliothek" in einer chroot-Umgebung aus, um Informationen über in dieser Schicht installierte Pakete zu sammeln.
    
- Mit diesen Informationen als Ausgangspunkt analysiert es weiterhin die nachfolgenden Schichten im Container-Image.
    
- Wenn dies abgeschlossen ist, generiert es einen Bericht über Pakete mit ihren Metadaten. Mehrere Formate sind verfügbar. Der Bericht gibt in seinem Standardformat eine Erklärung der verschiedenen Softwarekomponenten in jeder Dateisystemebene ab. Wenn ein Dockerfile bereitgestellt wird, zeigt der Bericht die Dockerfile-Zeilen für jede der Dateisystemebenen an.
    
- Tern bietet Ihnen ein tieferes Verständnis für das Bill of Materials Ihres Containers, damit Sie bessere Entscheidungen über Ihre Container-basierte Infrastruktur, Integrations- und Bereitstellungsstrategien treffen können. Es ist auch ein gutes Werkzeug, wenn Sie neugierig auf den Inhalt der von Ihnen erstellten Container-Images sind.