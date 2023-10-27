---
description: "Syntia's Stereograph- Lebendiger Klang und Visionen, die am besten zu Ihnen passen"
pubDate: "Oct 27, 2023"
heroImage: "https://images.prismic.io/syntia/3df9a7cf-6e26-48bf-b4fc-efbe0ee24820_Screenshot+2023-10-23+at+21.29.20%281%29.png?auto=compress,format"
author: "Syntia"
categories: "Projekte, Klangstudien, Umweltstudien"
subcategories: "Interdisziplinäre Klänge, Schallagentur, Klangpolitik, diskrete Daten, Wahrscheinlichkeitsverteilung, Datenverarbeitung"
---

"Wir sollten unseren Städten lauschen. Ist es nicht die Natur der städtischen
Umgebung, uns das Gemisch von Klängen hören zu lassen, ob wir es mögen oder
nicht?"

Jean-Francois Augoyard, Henry Torque, Sonic Experience - Ein Leitfaden zu
Alltagsklängen (2005)

![](https://images.prismic.io/syntia/3df9a7cf-6e26-48bf-b4fc-efbe0ee24820_Screenshot+2023-10-23+at+21.29.20%281%29.png?auto=compress,format)

Jeder städtebauliche Plan hat seine eigene einzigartige Klangsignatur, die
einzigartig ist mit ihrer Klangumgebung. Früher habe ich Tonaufnahmen aus dem
Radio, von der Straße, aus dem Club oder den Cafés entdeckt, aber oft blieb der
Ursprung der Musik unbekannt. Die Klanglandschaften der Städte sind
charakteristisch für die Kultur, genauso wie jede Sprache durch ihren Kontext
mit bestimmtem Ursprung und Zeit identifiziert wird.

Heutzutage erkennen Klangerkennungsalgorithmen Plagiate in der Musik,
kontrollieren Lizenzen und helfen dabei, herauszufinden, wer die anfängliche
Inspiration für einige Pioniere in verschiedenen Genres in der klassischen
Musik, Pop, Jazz und anderen war. Ingenieur Jovan Jovanovic erklärt in diesem
[Artikel](https://www.toptal.com/algorithms/shazam-it-music-processing-fingerprinting-and-recognition),
wie dieser Algorithmus in Shazam, der weltweit führenden Audiokennung,
funktioniert. Die Shazam-App wurde mehr als 500 Millionen Mal heruntergeladen
und hat über 100 Millionen monatlich aktive Nutzer.

Als Alternative zur mobilen App bietet RapidAPI die größte Web-API-Plattform mit
ähnlichen oder identischen Diensten, die sowohl für kommerzielle als auch für
nicht kommerzielle Nutzung für Ingenieure verfügbar sind.

Durch die Zusammenführung von APIs für Tonaufnahmen, Liederkennung und die Suche
auf Spotify habe ich die wesentlichen Dienste entdeckt, um das Hörerlebnis von
Songs zu maximieren und ihre Entdeckung zu erleichtern. Jetzt ist "Syntias Sound
Stereograph" als öffentliche Web-Software verfügbar, um Klänge aufzunehmen, die
Künstler und ihre Arbeit zu entdecken. Ich warte auf die endgültige Genehmigung
von Spotify vor der ersten offiziellen Vorabveröffentlichung. In der
Zwischenzeit werde ich weiterhin an der visuellen Darstellung arbeiten, um die
Klangaufnahme und -verarbeitung anzupassen.

Die Visualisierung des Frequenzbereichs auf dem 3D-Plot hat eine immersive
Wirkung mit einer visuellen "Stereografie" - Daten, die auf Schallfrequenzen
reagieren. Diese Webplattform erfordert keine Anwendung auf dem Gerät und eignet
sich zum Streamen von Sound Aufführungen und zur Schaffung einzigartiger
Hörerlebnisse.

![](https://images.prismic.io/syntia/ccbb0e9b-9f7c-4486-912c-d85c920cfe38_landing_screen_Desktop.jpg?auto=compress,format)

### Audio Stereograph preview:

<iframe width="560" height="315" src="https://www.youtube.com/embed/PLqc39jJ7tQ?si=YlXe4mgGRQS-i5z5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Digitale Signalverarbeitung in der Klangerkennung

Die eingebaute Audioprozessierung moderner Geräte ermöglicht es uns, Klänge zu
erkennen mit Algorithmen. Wenn Sie eine verkürzte Version eines Songs aufnehmen,
wird eine Fingerabdruck für die aufgezeichnete Probe erstellt, die Datenbank
durchsucht und ihr Musik Erkennungsalgorithmus sagt Ihnen genau, welches Lied
Sie hören.

In einem Mikrofon übersetzt das erste elektrische Bauteil, das dieses Signal
empfängt, es in ein analoges Spannungssignal. Das kontinuierliche Signal wird in
ein diskretes Signal umgewandelt, das digital gespeichert werden kann. Dies
geschieht durch Erfassen eines digitalen Werts, der die Amplitude des Signals
darstellt.

Die Umwandlung beinhaltet die Quantisierung des Eingangs und führt zwangsläufig
zu einer kleinen Fehlermenge. Daher führt anstelle einer einzelnen Umwandlung
ein Analog-Digital-Wandler viele Umwandlungen an sehr kleinen Teilen des Signals
durch - ein Prozess, der als Abtastung bezeichnet wird.

### Der Nyquist-Shannon-Abtastsatz

Der Nyquist-Shannon-Abtastsatz ist ein grundlegendes Prinzip für die digitale
Signalverarbeitung, das den Frequenzbereich eines Signals und die erforderliche
Abtastrate verknüpft, um eine Art von Verzerrung namens Aliasbildung zu
vermeiden.

Der Abtastsatz besagt, dass die Abtastrate mindestens doppelt so hoch sein muss
wie die Bandbreite des Signals, um eine Aliasverzerrung zu vermeiden.
Insbesondere müssen wir, um alle Frequenzen zu erfassen, die ein Mensch in einem
Audiosignal hören kann, das Signal mit einer Frequenz abtasten, die doppelt so
hoch ist wie die menschliche Hörspanne.

Das menschliche Ohr kann Frequenzen zwischen ungefähr 20 Hz und 20.000 Hz
erkennen. Daher wird Audio in der Regel mit einer Abtastrate von 44.100 Hz
aufgenommen. Dies ist die gebräuchliche Abtastrate für verlustbehaftete
Kompression in MPEG-1 und VCD, SVCD und MP3 Audio- und Videoformaten.

## Aufnahme eines abgetasteten Audiosignals

Moderne Soundkarten verfügen über eingebaute Analog-Digital-Wandler. Software
für die Tonaufnahme wird mit Programmiersprachen wie Java, Python und
Klangverarbeitungsbibliotheken entwickelt - Einstellung der Abtastrate, Anzahl
der Kanäle mono oder stereo und der Probengröße, z.B. 16 oder 24-Bit-Proben.
Anschließend wird die Leitung von Ihrer Soundkarte geöffnet und in ein
Byte-Array geschrieben. Hier ist ein Beispiel, wie dies in Java durch das Lesen
der Daten aus `TargetDataLine` gemacht werden kann:

```java
private AudioFormat getFormat() {
    float sampleRate = 44100;
    int sampleSizeInBits = 16;
    int channels = 1;          //mono
   

 boolean signed = true;     //Gibt an, ob die Daten signiert oder unsigniert sind
    boolean bigEndian = true;  //Gibt an, ob die Audio-Daten in Reihenfolge von oben nach unten oder von unten nach oben gespeichert sind
    return new AudioFormat(sampleRate, sampleSizeInBits, channels, signed, bigEndian);
}

final AudioFormat format = getFormat(); //AudioFormat mit den Einstellungen füllen
DataLine.Info info = new DataLine.Info(TargetDataLine.class, format);
final TargetDataLine line = (TargetDataLine) AudioSystem.getLine(info);
line.open(format);
line.start();
```

Im folgenden Beispiel ist die `running`-Flagge eine globale Variable, die von
einem anderen Thread gestoppt wird, um mit der Schaltfläche "Stop" zu
interagieren.

```java
OutputStream out = new ByteArrayOutputStream();
running = true;

try {
    while (running) {
        int count = line.read(buffer, 0, buffer.length);
        if (count > 0) {
            out.write(buffer, 0, count);
        }
    }
    out.close();
} catch (IOException e) {
    System.err.println("I/O-Probleme: " + e);
    System.exit(-1);
}
```

## Fourier-Reihen

Was wir in diesem Byte-Array haben, ist ein im Zeitbereich aufgezeichnetes
Signal, das die Änderung der Amplitude des Signals im Laufe der Zeit darstellt.

In den frühen 1800er Jahren machte Jean-Baptiste Joseph Fourier die
bemerkenswerte Entdeckung, dass jedes Signal im Zeitbereich gleich der Summe
einer möglicherweise unendlichen Anzahl von einfachen Sinussignalen ist,
vorausgesetzt, jeder Komponentensinus hat eine bestimmte Frequenz, Amplitude und
Phase. Die Serie von Sinussignalen, die zusammen das ursprüngliche
Zeitbereichssignal bilden, wird als seine Fourier-Reihe bezeichnet.

Diese Darstellung des Signals wird als Frequenzbereich bezeichnet. In gewisser
Weise fungiert der Frequenzbereich als eine Art Fingerabdruck oder Signatur für
das Zeitbereichssignal und bietet eine statische Darstellung eines dynamischen
Signals.

![](https://images.prismic.io/syntia/a2da5b0a-5911-4ad1-9a9a-8f1e9e3501dd_images.png?auto=compress,format)

Die folgende Animation zeigt die Fourier-Reihe einer 1-Hz-Rechteckwelle und wie
aus sinusförmigen Komponenten eine ungefähre Rechteckwelle erzeugt werden kann.
Das Signal wird im Zeitbereich oben und im Frequenzbereich unten angezeigt.

![](https://upload.wikimedia.org/wikipedia/commons/a/af/Fourier_synthesis_square_wave_animated.gif?20100816165940)

Die Analyse eines Signals im Frequenzbereich vereinfacht viele Dinge erheblich.
In der Welt der digitalen Signalverarbeitung ist es bequemer, weil der Ingenieur
das Spektrum (die Darstellung des Signals im Frequenzbereich) studieren kann und
feststellen kann, welche Frequenzen vorhanden sind, sie anordnen oder filtern
kann, um den Ton zu rekonstruieren.

## Die diskrete Fourier-Transformation

Der Prozess der Umwandlung eines Signals vom Zeit- in den Frequenzbereich wird
als diskrete Fourier-Transformation (DFT) bezeichnet. Die DFT ist eine
mathematische Methodik zur Durchführung einer Fourier-Analyse an einem diskreten
Proben signal. Sie wandelt eine endliche Liste von gleichmäßig beabstandeten
Proben einer Funktion in eine Liste von Koeffizienten einer endlichen
Kombination von komplexen Sinusoiden um, die nach ihren Frequenzen geordnet
sind, unter der Annahme, dass diese Sinusoiden mit der gleichen Rate abgetastet
wurden.

Einer der bekannten numerischen Algorithmen zur Berechnung der DFT ist die
Schnelle Fourier-Transformation (FFT) mit Variationen der
Cooley-Tukey-FFT-Algorithmus. Dies ist ein divide-and-conquer-Algorithmus, der
eine DFT rekursiv in viele kleinere DFTs unterteilt. Während die Auswertung
einer DFT direkt **O(\_n\_2)** Operationen erfordert, wird mit einer
Cooley-Tukey-FFT dasselbe Ergebnis in **O(_n_ log _n_)** Operationen berechnet.

Die FFT wird von vielen Programmiersprachen unterstützt, beispielsweise in C
[FFTW](http://www.fftw.org/), C++
[EigenFFT](http://eigen.tuxfamily.org/index.php?title=EigenFFT), Java
[JTransform](https://sites.google.com/site/piotrwendykier/software/jtransforms),
Python [NumPy](http://docs.scipy.org/doc/numpy/reference/routines.fft.html),
Ruby
[Ruby-FFTW3](https://apps.ubuntu.com/cat/applications/quantal/ruby-fftw3-dbg/)
(Schnittstelle zu FFTW).

Hier ist ein Beispiel für eine FFT-Funktion in Java. (FFT nimmt komplexe Zahlen
als Eingabe. Um die Beziehung zwischen komplexen Zahlen und trigonometrischen
Funktionen zu verstehen, lesen Sie über die
[Eulersche Formel](https://de.wikipedia.org/wiki/Eulersche_Formel).)

```java
public static Complex[] fft(Complex[] x) {
    int N = x.length;
    
    Complex[] even = new Complex[N / 2];
    for (int k = 0; k < N / 2; k++) {
        even[k] = x[2 * k];
    }
    Complex[] q = fft(even);

    Complex[] odd = even; // das Array wieder verwenden
    for (int k = 0; k < N / 2; k++) {
        odd[k] = x[2 * k + 1];
    }
    Complex[] r = fft(odd);

    Complex[] y = new Complex[N];
    for (int k = 0; k < N / 2; k++) {
        double kth = -2 * k * Math.PI / N;
        Complex wk = new Complex(Math.cos(kth), Math.sin(kth));
        y[k] = q[k].plus(wk.times(r[k]));
        y[k + N / 2] = q[k].minus(wk.times(r[k]));
    }
    return y;
}
```

Und hier ist ein Beispiel für ein Signal vor und nach der FFT-Analyse:
![](https://images.prismic.io/syntia/467d1a4c-da4b-464e-b315-3281bdeae9ed_fft.png?auto=compress,format)

## Audioerkennung

Certainly, here is the provided Markdown text translated into German:

Eine bedauerliche Nebenwirkung der FFT ist, dass wir eine große Menge an
Timing-Information verlieren. Um das Timing eines Buffers zu transformieren,
wird nur dieser Teil der Information benötigt. Die Größe jedes Abschnitts kann
auf verschiedene Arten bestimmt werden.

In einem Beispiel für einen in Stereo aufgenommenen Sound mit 16-Bit-Samples bei
44.100 Hz beträgt eine Sekunde eines solchen Abschnitts etwa 176 kB (44.100
Samples * 2 Bytes * 2 Kanäle). Bei einer Größe von 4 kB für den Abschnitt haben
wir 44 Datenabschnitte zur Analyse in jeder Sekunde des Songs.

```java
byte audio [] = out.toByteArray()
int totalSize = audio.length
int sampledChunkSize = totalSize/chunkSize;
Complex[][] result = ComplexMatrix[sampledChunkSize][];

for(int j = 0;i < sampledChunkSize; j++) {
  Complex[chunkSize] complexArray;

  for(int i = 0; i < chunkSize; i++) {
    complexArray[i] = Complex(audio[(j*chunkSize)+i], 0);
  }

  result[j] = FFT.fft(complexArray);
}
```

In der inneren Schleife hat die zeitliche Daten (die Samples) einen komplexen
Wert mit imaginärem Teil 0. Die äußere Schleife durchläuft die Abschnitte und
führt auf jedem von ihnen eine FFT-Analyse durch.

Sobald die Frequenzdaten des Signals gesammelt sind, besteht die
Hauptherausforderung darin, herauszufinden, welche Frequenzen im
Erkennungsprozess am wichtigsten sind. Intuitiv suchen wir nach den Frequenzen
mit der höchsten Amplitude oder den Spitzen.

In einem Song kann die Bandbreite der Frequenzen zwischen dem tiefen C - C1
(32,70 Hz) und dem hohen C - C8 (4.186,01 Hz) variieren. Anstatt den gesamten
Frequenzbereich auf einmal zu analysieren, ist es effizienter, mehrere kleinere
Intervalle auf der Grundlage der gemeinsamen Frequenzen zu vergleichen und jede
separat zu analysieren, da dadurch weniger Speicherplatz benötigt wird.

Im Beispiel von
[Shazams Algorithmus](http://www.ee.columbia.edu/~dpwe/papers/Wang03-shazam.pdf)
sind dies 30 Hz - 40 Hz, 40 Hz - 80 Hz und 80 Hz - 120 Hz für tiefe Töne beim
Abdecken des Bassgitarre, und 120 Hz - 180 Hz und 180 Hz - 300 Hz für mittlere
und höhere Töne beim Abdecken von Gesang und den meisten anderen Instrumenten.

Die Identifizierung der Frequenz mit der höchsten Amplitude in jedem Intervall
bildet eine Signatur für diesen Abschnitt des Songs, und diese Signatur wird
Teil des Fingerabdrucks des Songs.

```java
public final int[] RANGE = new int[] { 40, 80, 120, 180, 300 };

// herausfinden, in welchem Bereich sich die Frequenz befindet
public int getIndex(int freq) {
    int i = 0;
    while (RANGE[i] < freq)
        i++;
    return i;
}
    
// Das Ergebnis ist eine komplexe Matrix, die im vorherigen Schritt erhalten wurde
for (int t = 0; t < result.length; t++) {
    for (int freq = 40; freq < 300 ; freq++) {
        // Ermitteln der Amplitude:
        double mag = Math.log(results[t][freq].abs() + 1);

        // Herausfinden, in welchem Bereich wir uns befinden:
        int index = getIndex(freq);

        // Speichern der höchsten Amplitude und der entsprechenden Frequenz:
        if (mag > highscores[t][index]) {
            points[t][index] = freq;
        }
    }
    
    // Bildung eines Hash-Tags
    long h = hash(points[t][0], points[t][1], points[t][2], points[t][3]);
}

private static final int FUZ_FACTOR = 2;

private long hash(long p1, long p2, long p3, long p4) {
    return (p4 - (p4 % FUZ_FACTOR)) * 100000000 + (p3 - (p3 % FUZ_FACTOR))
            * 100000 + (p2 - (p2 % FUZ_FACTOR)) * 100
            + (p1 - (p1 % FUZ_FACTOR));
}
```

Ein Fuzz-Faktor ist ein Analyseverfahren, das auf der Qualität der Aufnahme
basiert, d.h., wenn die Aufnahme nicht perfekt ist. Diese Signatur wird zum
Schlüssel in einer Hashtabelle. Der entsprechende Wert ist die Zeit, zu der
diese Frequenzgruppe im Song auftrat, zusammen mit der Song-ID (Songtitel und
Künstler). Hier ist ein Beispiel, wie diese Datensätze in der Datenbank
erscheinen könnten.

| Hash-Tag            | Zeit in Sekunden | Song                  |
| ------------------- | ---------------- | --------------------- |
| `30 51 99 121 195`  | 53,52            | Song A von Künstler A |
| `33 56 92 151 185`  | 12,32            | Song B von Künstler B |
| `39 26 89 141 251`  | 15,34            | Song C von Künstler C |
| `32 67 100 128 270` | 78,43            | Song D von Künstler D |
| `30 51 99 121 195`  | 10,89            | Song E von Künstler E |
| `34 57 95 111 200`  | 54,52            | Song A von Künstler A |
| `34 41 93 161 202`  | 11,89            | Song E von Künstler E |

Basierend auf diesem Musikidentifikationsprozess ist es möglich, eine Datenbank
mit einem digitalen Fingerabdruck für jeden Song zu erstellen und diesen
Fingerabdruck zu verwenden, um Songs zu identifizieren, indem in der Datenbank
nach passenden Hash-Tags gesucht wird. Jeder Song hat auch einen Standardcode
zur eindeutigen Identifizierung von Tonaufnahmen und Musikvideoclips (ISRC).

Mit den mehreren übereinstimmenden Hash-Tags kann die relative Abfolge der
Übereinstimmungen analysiert werden, was die Wahrscheinlichkeit von Ergebnissen
erhöht.

```java
// Klasse, die einen bestimmten Moment in einem Song darstellt
private class DataPoint {

    private int Zeit;
    private int Song-ID;

    public DataPoint(int Song-ID, int Zeit) {
       

 this.Song-ID = Song-ID;
        this.Zeit = Zeit;
    }
    
    public int getZeit() {
        return Zeit;
    }
    public int getSong-ID() {
        return Song-ID;
    }
}
```

Nehmen wir i1 und i2 als Momente im aufgenommenen Song und j1 und j2 als Momente
im Song aus der Datenbank. Die Wahrscheinlichkeit der Übereinstimmung zwischen
den beiden Songs wird berechnet, wenn die aufgezeichnete Probe in der Datenbank
zwei Hash-Tags identifiziert hat und wenn das Intervall zwischen den
Zeitstempeln im Song und in der Aufzeichnung gleich ist.
