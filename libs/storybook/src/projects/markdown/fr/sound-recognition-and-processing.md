"Écoutons nos villes. N'est-ce pas la nature même de l'environnement urbain de
nous faire entendre, que nous le voulions ou non, le mélange des sons ?"

Jean-François Augoyard, Henry Torgue, Sonic Experience - Un Guide des Sons du
Quotidien (2005)

![](https://images.prismic.io/syntia/3df9a7cf-6e26-48bf-b4fc-efbe0ee24820_Screenshot+2023-10-23+at+21.29.20%281%29.png?auto=compress,format)

Chaque plan de conception urbaine a sa propre signature sonore unique, en lien
avec son environnement sonore. J'avais l'habitude de découvrir des
enregistrements sonores à la radio, dans la rue, les files d'attente des clubs
ou les cafés, mais souvent l'origine de la musique reste inconnue. Le paysage
sonore des villes est caractéristique de la culture, tout comme une langue est
identifiée par son contexte, son origine et son époque.

Aujourd'hui, les algorithmes de reconnaissance sonore identifient le plagiat
musical, contrôlent les licences et aident à découvrir qui a été l'inspiration
initiale pour certains pionniers de différents genres musicaux, que ce soit la
musique classique, la pop, le jazz et d'autres. L'ingénieur Jovan Jovanovic
explique dans cet
[article](https://www.toptal.com/algorithms/shazam-it-music-processing-fingerprinting-and-recognition)
comment fonctionne cet algorithme dans Shazam, la principale application de
reconnaissance audio au monde. L'application Shazam a été téléchargée plus de
500 millions de fois et compte plus de 100 millions d'utilisateurs actifs par
mois.

En alternative à l'application mobile, RapidAPI propose la plus grande
plateforme d'API Web offrant des services similaires ou identiques pour une
utilisation commerciale et non commerciale par les ingénieurs.

En regroupant les API pour l'enregistrement sonore, la reconnaissance de
chansons et la recherche sur Spotify, j'ai découvert les services essentiels
pour maximiser l'expérience d'écoute de la musique et la découverte. Désormais,
"Stereographie Sonore de Syntia" est un logiciel web public permettant
d'enregistrer des sons et de découvrir les artistes et leur travail. J'attends
l'approbation finale de Spotify avant la première pré-version officielle. En
attendant, je continuerai à travailler sur la représentation visuelle pour
adapter l'entrée sonore et le traitement.

La visualisation du domaine de fréquence sur le graphique 3D a un effet immersif
avec une "stéréographie" visuelle - les données répondent aux fréquences
sonores. Cette plateforme web ne nécessite pas d'application sur l'appareil et
est adaptée à la diffusion de performances sonores et à la création
d'expériences d'écoute uniques.

![](https://images.prismic.io/syntia/ccbb0e9b-9f7c-4486-912c-d85c920cfe38_landing_screen_Desktop.jpg?auto=compress,format)

## Traitement numérique du signal dans la reconnaissance sonore

Le traitement du signal audio intégré aux appareils modernes nous permet de
reconnaître les sons grâce à des algorithmes. Si vous enregistrez une courte
version d'une chanson, elle créera une empreinte digitale pour l'échantillon
enregistré, recherchera dans la base de données et utilisera son algorithme de
reconnaissance musicale pour vous dire exactement quelle chanson vous écoutez.

Dans un microphone, le premier composant électrique à rencontrer ce signal le
traduit en un signal de tension analogique. Le signal continu est transformé en
un signal discret qui peut être stocké numériquement. Cela se fait en capturant
une valeur numérique qui représente l'amplitude du signal.

La conversion implique la quantification de l'entrée, ce qui introduit
nécessairement une petite quantité d'erreur. Par conséquent, au lieu d'une seule
conversion, un convertisseur analogique-numérique effectue de nombreuses
conversions sur de très petites parties du signal - un processus appelé
échantillonnage.

### Le théorème d'échantillonnage de Nyquist-Shannon

Le théorème d'échantillonnage de Nyquist-Shannon est un principe essentiel du
traitement numérique du signal, liant la plage de fréquence d'un signal et la
fréquence d'échantillonnage nécessaire pour éviter un type de distorsion appelé
aliasing.

Ce théorème stipule que la fréquence d'échantillonnage doit être au moins deux
fois supérieure à la largeur de bande du signal pour éviter la distorsion par
aliasing. En particulier, pour capturer toutes les fréquences que l'oreille
humaine peut percevoir dans un signal audio, nous devons échantillonner le
signal à une fréquence deux fois supérieure à la plage de fréquence audible par
l'homme.

L'oreille humaine peut détecter des fréquences d'environ 20 Hz à 20 000 Hz. En
conséquence, l'audio est le plus souvent enregistré à une fréquence
d'échantillonnage de 44 100 Hz. C'est la fréquence d'échantillonnage couramment
utilisée pour la compression avec pertes en MPEG-1 et les formats audio et vidéo
VCD, SVCD et MP3.

## Enregistrement d'un signal audio échantillonné

Les cartes son modernes intègrent des convertisseurs analogique-numérique. Les
logiciels d'enregistrement sonore sont développés avec des langages de
programmation tels que Java, Python, et des bibliothèques de traitement du son,
réglant la fréquence de l'échantillon, le nombre de canaux mono ou stéréo, et la
taille de l'échantillon, par exemple en 16 ou 24 bits. Ensuite, en ouvrant la
ligne de votre carte son, commencez à écrire dans un tableau d'octets. Voici un
exemple de comment cela peut être fait en Java en lisant les données depuis
`TargetDataLine :`

```java
private AudioFormat getFormat() {
    float sampleRate = 44100;
    int sampleSizeInBits = 16;
    int channels = 1;          //mono
    boolean signed = true;     //Indique si les données sont signées ou non signées
    boolean bigEndian = true;  //Indique si les données audio sont stockées dans l'ordre big-endian ou little-endian
    return new AudioFormat(sampleRate, sampleSizeInBits, channels, signed, bigEndian);
}

final AudioFormat format = getFormat(); //Remplir AudioFormat avec les paramètres
DataLine.Info info = new DataLine.Info(TargetDataLine.class, format);
final TargetDataLine line = (TargetDataLine) AudioSystem.getLine(info);
line.open(format);
line.start();
```

Dans l'exemple suivant, le drapeau `running` est une variable globale qui est
arrêtée par un autre thread, interagissant avec le bouton "Arrêter".

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
    System.err.println("Problèmes d'E/S : " + e);
    System.exit(-1);
}
```

## Série de Fourier

Dans ce tableau d'octets, nous avons un signal enregistré dans le
[domaine temporel](https://fr.wikipedia.org/wiki/Domaine_temporel). Le signal en
domaine temporel représente la variation d'amplitude du signal au fil du temps.

Au début des années 1800, Jean-Baptiste Joseph Fourier a fait la découverte
remarquable que tout signal dans le domaine temporel est équivalent à la somme
d'un certain nombre éventuellement infini de signaux sinusoïdaux simples, à
condition que chaque sinusoïde composante ait une certaine fréquence, amplitude
et phase. La série de sinusoïdes qui forment ensemble le signal d'origine en
domaine temporel est connue sous le nom de sa
[série de Fourier](https://fr.wikipedia.org/wiki/S%C3%A9rie_de_Fourier).

Cette représentation du signal est connue sous le nom de
[domaine fréquentiel](https://fr.wikipedia.org/wiki/Domaine_fr%C3%A9quentiel). À
certains égards, le domaine fréquentiel agit comme une sorte d'empreinte
digitale ou de signature pour le signal en domaine temporel, fournissant une
représentation statique d'un signal dynamique.

![](https://images.prismic.io/syntia/a2da5b0a-5911-4ad1-9a9a-8f1e9e3501dd_images.png?auto=compress,format)

L'animation suivante montre la série de Fourier d'un signal carré de 1 Hz, et
comment un signal carré approximatif peut être généré à partir de composantes
sinusoïdales. Le signal est montré dans le domaine temporel ci-dessus, et dans
le domaine fréquentiel ci-dessous.

![](https://upload.wikimedia.org/wikipedia/commons/a/af/Fourier_synthesis_square_wave_animated.gif?20100816165940)

Analyser un signal dans le domaine fréquentiel simplifie énormément de choses.
Il est plus pratique dans le monde du traitement numérique du signal, car
l'ingénieur peut étudier le spectre (la représentation du signal dans le domaine
fréquentiel) et déterminer quelles fréquences sont présentes, les organiser ou
les filtrer pour reconstruire le ton.

## La transformée de Fourier discrète

Le processus de conversion du signal du domaine temporel au domaine fréquentiel
utilise la
[transformée de Fourier discrète](https://fr.wikipedia.org/wiki/Transform%C3%A9e_de_Fourier_discr%C3%A8te)
(DFT). La DFT est une méthodologie mathématique pour effectuer
[l'analyse de Fourier](https://fr.wikipedia.org/wiki/Analyse_de_Fourier) sur un
signal échantillonné discret. Elle convertit une liste finie d'échantillons
équidistants d'une fonction en une liste de coefficients d'une combinaison finie
de sinusoïdes complexes, triées par fréquence, en supposant que ces sinusoïdes
ont été échantillonnées à la même fréquence.

L'un des algorithmes numériques bien connus pour le calcul de la DFT est la
[transformée de Fourier rapide](https://fr.wikipedia.org/wiki/Transform%C3%A9e_de_Fourier_rapide)
(FFT) avec la variation de FFT
[algorithme de Cooley–Tukey](https://fr.wikipedia.org/wiki/Algorithme_de_Cooley%E2%80%93Tukey_FFT).
Il s'agit d'un algorithme de diviser pour régner qui divise récursivement une
DFT en de nombreuses DFT plus petites. Alors qu'évaluer une DFT directement
nécessite **O(_n_2)** opérations, avec une FFT de Cooley-Tukey, le même résultat
est calculé en **O(_n_ log _n_)** opérations.

La FFT est prise en charge par de nombreux langages de programmation, par
exemple en **C** [FFTW](http://www.fftw.org/), en **C++**
[EigenFFT](http://eigen.tuxfamily.org/index.php?title=EigenFFT), en **Java**
[JTransform](https://sites.google.com/site/piotrwendykier/software/jtransforms),
en **Python**
[NumPy](http://docs.scipy.org/doc/numpy/reference/routines.fft.html), en
**Ruby**
[Ruby-FFTW3](https://apps.ubuntu.com/cat/applications/quantal/ruby-fftw3-dbg/)
(Interface to FFTW).

Ci-dessous se trouve un exemple de fonction FFT écrite en Java. (La FFT prend
des nombres complexes en entrée. Pour comprendre la relation entre les nombres
complexes et les fonctions trigonométriques, lisez sur la
[formule d'Euler](https://fr.wikipedia.org/wiki/Formule_d'Euler).)

```java
public static Complex[] fft(Complex[] x) {
    int N = x.length;
    
    Complex[] even = new Complex[N / 2];
    for (int k = 0; k < N / 2; k++) {
        even[k] = x[2 * k];
    }
    Complex[] q = fft(even);

    Complex[] odd = even; // reuse the array
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

Et voici un exemple d'un signal avant et après l'analyse FFT :
![](https://images.prismic.io/syntia/467d1a4c-da4b-464e-b315-3281bdeae9ed_fft.png?auto=compress,format)

## Identification audio

Un effet malheureux de la FFT est que nous perdons une grande quantité
d'informations concernant le timing. Pour le timing, un tampon est nécessaire
pour transformer seulement cette partie de l'information. La taille de chaque
fragment peut être déterminée de différentes manières.

Par exemple, pour un son enregistré en stéréo avec des échantillons de 16 bits à
44 100 Hz, une seconde d'un tel fragment serait de 44 100 échantillons \* 2
octets \* 2 canaux ≈ 176 Ko. Avec une taille de 4 Ko, nous aurons 44 fragments
de données à analyser chaque seconde de la chanson.

```java
byte audio[] = out.toByteArray()
int totalSize = audio.length
int sampledChunkSize = totalSize / chunkSize;
Complex[][] result = ComplexMatrix[sampledChunkSize][];

for (int j = 0; i < sampledChunkSize; j++) {
  Complex[chunkSize] complexArray;

  for (int i = 0; i < chunkSize; i++) {
    complexArray[i] = Complex(audio[(j*chunkSize)+i], 0);
  }

  result[j] = FFT.fft(complexArray);
}
```

Dans la boucle interne, les données en domaine temporel (les échantillons) ont
une partie imaginaire de 0. La boucle externe itère à travers les fragments et
effectue une analyse FFT sur chacun d'eux.

Une fois que les données de fréquence du signal sont collectées, le défi
principal est de savoir comment distinguer quelles fréquences sont les plus
importantes dans le processus de reconnaissance. Intuitivement, nous cherchons
les fréquences avec la plus grande magnitude ou des pics.

Dans une chanson, la plage de fréquences peut varier entre le do grave - C1
32,70 Hz et le do aigu - C8 4 186,01 Hz. Au lieu d'analyser l'ensemble de la
plage de fréquences en une fois, comparer plusieurs intervalles plus petits en
fonction des fréquences communes et les analyser séparément est plus efficace,
car cela alloue moins de mémoire pour stocker les données.

Par exemple, dans l'algorithme de
[Shazam](http://www.ee.columbia.edu/~dpwe/papers/Wang03-shazam.pdf), il s'agit
de 30 Hz - 40 Hz, 40 Hz - 80 Hz et 80 Hz - 120 Hz pour les basses fréquences
lorsque l'on couvre la guitare basse, et de 120 Hz - 180 Hz et 180 Hz - 300 Hz
pour les fréquences moyennes et élevées lorsque l'on couvre la voix et la
plupart des autres instruments.

Identifier la fréquence avec la magnitude la plus élevée dans chaque intervalle
forme une signature pour ce fragment de la chanson, et cette signature devient
partie de l'empreinte digitale de la chanson.

```java
public final int[] PLAGE = new int[] { 40, 80, 120, 180, 300 };

// déterminer dans quelle plage se trouve la fréquence
public int getIndex(int freq) {
    int i = 0;
    while (PLAGE[i] < freq)
        i++;
    return i;
}

// le résultat est une matrice complexe obtenue à l'étape précédente
for (int t = 0; t < result.length; t++) {
    for (int freq = 40; freq < 300 ; freq++) {
        // Obtenir l'amplitude :
        double mag = Math.log(results[t][freq].abs() + 1);

        // Déterminer dans quelle plage nous nous trouvons :
        int index = getIndex(freq);

        // Enregistrer l'amplitude la plus élevée et la fréquence correspondante :
        if (mag > highscores[t][index]) {
            points[t][index] = freq;
        }
    }
    
    // former une balise de hachage
    long h = hash(points[t][0], points[t][1], points[t][2], points[t][3]);
}

private static final int FACTEUR_DE_FLOU = 2;

private long hash(long p1, long p2, long p3, long p4) {
    return (p4 - (p4 % FACTEUR_DE_FLOU)) * 100000000 + (p3 - (p3 % FACTEUR_DE_FLOU))
            * 100000 + (p2 - (p2 % FACTEUR_DE_FLOU)) * 100
            + (p1 - (p1 % FACTEUR_DE_FLOU));
}
```

Un facteur de flou est un système d'analyse basé sur la qualité de
l'enregistrement, c'est-à-dire lorsque l'enregistrement n'est pas parfait. Cette
signature devient la clé dans une table de hachage. La valeur correspondante est
le moment où cet ensemble de fréquences est apparu dans la chanson, ainsi que
l'identifiant de la chanson (titre de la chanson et artiste). Voici un exemple
de comment ces enregistrements pourraient apparaître dans la base de données.

| Balise de Hachage  | Temps en Secondes | Chanson                 |
| ------------------ | ----------------- | ----------------------- |
| `30 51 99 121 195` | 53,52             | Chanson A par artiste A |
| `33 56 92 151 185` | 12,32             | Chanson B par artiste B |
| `                  |                   |                         |

39 26 89 141 251`| 15,34              | Chanson C par artiste C | |`32 67 100
128 270`| 78,43              | Chanson D par artiste D | |`30 51 99 121
195`| 10,89              | Chanson E par artiste E | |`34 57 95 111
200`| 54,52              | Chanson A par artiste A | |`34 41 93 161 202` | 11,89
| Chanson E par artiste E |

Grâce à ce processus d'identification musicale, il est possible de créer une
base de données avec une empreinte digitale numérique sur chaque chanson et de
l'utiliser pour identifier les chansons en recherchant les balises de hachage
correspondantes. Chaque chanson a également un code standard pour identifier de
manière unique les enregistrements sonores et les enregistrements vidéo musicaux
(ISRC).

Avec les multiples balises de hachage correspondantes, la synchronisation
relative des correspondances peut être analysée, augmentant ainsi la probabilité
de résultats.

```java
// Classe qui représente un moment spécifique dans une chanson
private class PointDeDonnées {

    private int temps;
    private int idChanson;

    public PointDeDonnées(int idChanson, int temps) {
        this.idChanson = idChanson;
        this.temps = temps;
    }
    
    public int getTemps() {
        return temps;
    }
    public int getIdChanson() {
        return idChanson;
    }
}
```

Prenons i1 et i2 comme moments dans la chanson enregistrée, et j1 et j2 comme
moments dans la chanson de la base de données. La probabilité de l'équation de
deux chansons est calculée si l'échantillon enregistré a identifié deux balises
de hachage dans la base de données et si l'intervalle de soustraction entre deux
horodatages dans la chanson et l'enregistrement est le même.

Voici un exemple de modèle visuel du processus de reconnaissance musicale et de
mise en correspondance:
![](https://images.prismic.io/syntia/852fa93f-eede-465c-9922-1826b18a340d_images+%281%29.png?auto=compress,format)
