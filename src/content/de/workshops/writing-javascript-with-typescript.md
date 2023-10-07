---
description: 'Besseres Schreiben von JavaScript mit TypeScript in 10 Schritten'
pubDate: 'Jun 28, 2021'
heroImage: 'https://images.prismic.io/syntia/6e6c9a03-e07f-463d-bc1a-47f11ef2279f_typescript.jpg?auto=compress,format'
author: 'Syntia'
categories: 'Workshops, Schnittstellen, TypeScript, Kontrollflussanalyse'
subcategories: 'TypeScript Compiler, Varianznotationen, Typnotationen, TypeScript Regeln'
---


![Image](https://images.prismic.io/syntia/1d989402-fb0e-4ae2-8d36-923f659b6d95_41jnu0vcbl._sx379_bo1204203200_.jpg?auto=compress,format)

Effektives TypeScript, 62 spezifische Möglichkeiten, Ihr TypeScript zu verbessern von Dan Vanderkam

TypeScript ist ein leistungsstolles Werkzeug für JavaScript. Es erfordert das Hinzufügen von Typen, um Code zu erkennen und zu analysieren, der zur Laufzeit eine Ausnahme werfen würde, ohne den Code auszuführen, so einfach wie die Vermeidung von Fehlern zur Entwicklungszeit.

Das Buch "Effektives TypeScript, 62 spezifische Möglichkeiten, Ihr TypeScript zu verbessern" von Dan Vanderkam ist vollgepackt mit praktischen Beispielen und beantwortet mindestens eine Frage, nach der jeder TypeScript-Entwickler gesucht hat.

In den letzten beiden Jahren hat sich [TypeScript](https://www.typescriptlang.org/docs/) mit dem Stellenwert der Regeln geändert, der sich auf die Version der Veröffentlichung und die Übung mit Codebeispielen auswirkt.

Ich habe in diesem Buch 10 Punkte (Elemente) mit Mitnahme-Notizen markiert, die ich für wesentlich halte, um TypeScript und JavaScript effektiver zu schreiben.

### **Element 9: Bevorzugen Sie Typdeklarationen (: Typ) gegenüber Typüberprüfungen (as Typ)**

Die Typdeklaration stellt sicher, dass der Wert dem Typ entspricht (z. B. `interface Person { name: string }; const alice: Person = { name: Alice };`), während die Typüberprüfung den Typ annimmt und dort am besten verwendet wird, wo die Unterarten einen bekannten Typ haben, d. h. für Web-API-Schnittstellen und DOM-Typen (z. B. `element.addEventListener(‘click’, e => { const button = e.currentTarget as HTMLButtonElement; // Typunterart zu EventTarget mit Wertzuweisung zur Erkennung eines DOM-Schaltflächenelements }`)).

### **Element 27: Verwenden Sie funktionale Konstrukte und Bibliotheken, um den Typfluss zu unterstützen**

Als Beispiel für das Parsen von CSV-Daten mit imperativem Stil:

```javascript
const csvData = “...”;
const rawRows = csvData.split(‘\n’);
const headers = rawRows[0].split(‘,’);
const rows = rawRows.slice(1).map(rowStr => {
  const row = {};
  rowStr.split(‘,’).forEach((val, j) => {
    row[headers[j] = val; //~~~~ Es wurde keine Indexsignatur mit Parameter vom Typ ‘string’ auf Typ ‘{}’ gefunden
  });
  return row;
});
```

oder das Erstellen von Zeilenobjekten mit `reduce`:

```javascript
const rows = rawRows.slice(1).map(rowStr => rowStr.split(‘,’).reduce((row, val, i) => (row[headers[i] = val, row), {}));
```

Die Lösung in jedem Fall besteht darin, die Typenannotation für `{}` bereitzustellen, entweder `{[column: string]: string}` oder `Record<string, string>`.

Mit der Abhängigkeit von der Lodash-Bibliothek besteht die Möglichkeit, den Typencheck ohne Änderungen zu bestehen und drei Zeilen Code zu speichern. Ohne die Verwendung eines Bündelungsprogramms würde es wahrscheinlich den Großteil der Projektgröße ausmachen.

```javascript
import _ from ‘lodash’;
const rows = rawRows.slice(1).map(rowStr => _.zipObject(headers, rowStr.split(‘,’)));
```

### **Element 35: Generieren Sie Typen aus APIs und Spezifikationen, nicht aus Daten**

Einige der Typen werden wahrscheinlich außerhalb des Programms als Dateiformate, APIs oder Spezifikationen kommen. Das Generieren der Typen aus den Spezifikationen anstelle von Beispieldaten gewährleistet eine explizite Definition, die nicht nur Datenbeispiele berücksichtigt. Als Beispiel liefern die Typdeklarationen für GeoJSON Typen ohne Entwicklerverständnis und Erfahrung mit dem Format.

```javascript
const geometryHelper = (g: Geometry) => {
  if (geometry.type === ‘GeometryCollection’) {
    geometry.geometries.forEach(geometryHelper);
  } else {
    helper(geometry.coordinates);
  }
};
```

Ähnliche Überlegungen gelten für API-Aufrufe durch Generieren von Typen aus der Spezifikation einer API, wie es bei GraphQL funktioniert. Eine GraphQL-API wird mit einem Schema geliefert, das alle möglichen Abfragen und Schnittstellen unter Verwendung eines Typsystems ähnlich TypeScript spezifiziert. Es gibt Tools, die TypeScript-Typen generieren, wie beispielsweise Apollo Client für GraphQL-Abfragen:

```shell
$ apollo client:codegen --endpoint https://api.github.com/graphql --includes license.graphql --target typescript
```

### **Element 2: Wissen Sie, welche TypeScript-Optionen Sie verwenden,**

### **Element 44: Verfolgen Sie Ihre Typabdeckung, um Regressionen in der Typsicherheit zu verhindern**

Die TypeScript-Regel `noImplicitAny` steuert, ob Variablen bekannte Typen haben und wirft einen Fehler für nicht definierte Typerklärungen. Die Regel `strictNullCheck` steuert, ob `null` und `undefined` zulässige Werte in jedem Typ sind. Um die Anzahl der `any`-Typen in Ihrem Code zu verfolgen, verwenden Sie das `type-coverage`-Paket auf npm. Wenn Sie `type-coverage` mit der `--detail`-Flagge ausführen, wird gedruckt, wo jeder 'any'-Typ im Code vorkommt. Er kann auch von Drittanbieterdeklarationen stammen, insbesondere bei einer gesamten Modul eine "any"-Typdeklaration gegeben wird: `declare module ‘my-module’;` Mit dieser Deklaration wird Code aus dem Modul importiert, ohne jegliche Typüberprüfung.

### **Element 54: Iterieren über Objekte**

Um über die Schlüssel des Objekts ohne Typfehler zu iterieren, verwenden Sie die for-in-Schleife und keyof typeof list, wenn der Schlüssel denselben Typ von Werten hat wie im folgenden Beispiel:

```javascript
Const obj = {
  one: ‘uno’,
  two: ‘dos’,
  three:

 ‘tres’,
};

for (const k in obj) {
  const v = obj[k]; // ~~~~ Element hat implizit den Typ ‘any’, weil der Typ … keine Indexsignatur hat
}
```

Der Typ von `k` ist ein String, aber er muss in ein Objekt mit drei bestimmten Schlüsseln eingreifen: ‘one’, ‘two’ und ‘three’, sodass er mit der TypeScript-Flagge scheitert.

Das Einstecken einer engeren Typdeklaration für `k` behebt das Problem:

```javascript
let k: keyof typeof obj; // Typ ist “one” | “two” | “three”
for (k in obj) {
  const v = obj[k]; // OK
}
```

Die zugewiesenen Werte können jedoch unterschiedlich sein, z. B. als Zahl, Datum oder alles, was die Variable zu einem "any"-Typ macht. Verwenden Sie aus diesem Grund entweder eine `keyof`-Deklaration (`let k: keyof T`) oder `Object.entries`, um über die Schlüssel und Werte eines beliebigen Objekts zu iterieren:

```javascript
Interface ABC {
  a: string;
  b: string;
  c: number;
}

function foo(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    // k hat den Typ string
    // v hat den Typ any
  }
}
```

### **Element 57: Verwenden Sie Source Maps zum Debuggen von TypeScript**

Wenn Sie TypeScript-Code ausführen, führen Sie tatsächlich einen von TypeScript-Compiler generierten JavaScript-Code aus.

Mit der Regel `noEmit` gibt TypeScript keine Compiler-Ausgabedateien wie JavaScript-Quellcode, Source Maps oder Deklarationen aus. Es ermöglicht die Entscheidung für ein anderes Compiler-Tool wie Babel oder swc, um die TypeScript-Datei in eine Datei umzuwandeln, die in einer JavaScript-Umgebung ausgeführt werden kann. Sie können TypeScript dann als ein Werkzeug zur Bereitstellung von Editor-Integrationen und als Typüberprüfer für Quellcode verwenden.

Mit aktivierten `sourceMap`-Regeln werden Positionen und Symbole in einer generierten Datei auf die entsprechenden Positionen und Symbole in der Originalquelle zurückverfolgt. Dies ist für das Debuggen des Codes wesentlich. Ohne Source Maps generiert der Compiler JavaScript, das dem Original-TypeScript-Quellcode nicht sehr ähnlich sieht, was das Debuggen erschwert.

Um beispielsweise das `async/await` in älteren Browsern zu unterstützen, muss der Compiler den Ereignishandler als Zustandsmaschine umschreiben, die den Code ausführt, aber nicht mehr so stark dem Originalquellcode ähnelt.

### **Element 58: Schreiben Sie modernes JavaScript**

TypeScript ist so konzipiert, dass es mit modernem JavaScript funktioniert, und da TypeScript eine Erweiterung von JavaScript ist, bedeutet das Erlernen des Schreibens von modernem JavaScript, dass Sie auch lernen, besseres TypeScript zu schreiben. Am wichtigsten für die Übernahme von TypeScript sind ECMAScript-Module und ES2015-Klassen.

Die Details variieren je nach Ihrer Einrichtung, aber wenn Sie CommonJS wie folgt verwenden:

```javascript
// CommonJS
// a.js
const b = require(‘./b’);
// b.js
const name = ‘Module B’;
module.exports = { name };
```

dann würde das ES-Modul-Äquivalent folgendermaßen aussehen:

```javascript
// ECMAScript-Modul
// a.ts
Import * as b from ‘./b’;
// b.ts
export const name = ‘Module B’;
```

#### **Verwenden Sie Klassen anstelle von Prototypen.**

Anstelle von:

```javascript
function Person(first, last) {
  this.first = first;
  this.last = last;
}

Person.prototype.getName = function() {
  return this.first + ‘ ’ + this.last;
}

const marie = new Person(‘Marie’, ‘Curie’);
const personName = marie.getName();
```

Schreiben Sie:

```javascript
class Person {
  first: string;
  last: string;
  constructor(first: string, last: string) {
    this.first = first;
    this.last = last;
  }
  getName() {
    return `${this.first} ${this.last}`;
  }
}
```

### **Element 25: Verwenden Sie async/await anstelle von Roh-Promises oder Callbacks für asynchrone Codes**

Klassisches JavaScript modellierte asynchrones Verhalten mit Callbacks, was zum berüchtigten "Pyramid of Doom" führte. Die Ausführung ist das Gegenteil der Reihenfolge des Codes, was den Code schwer lesbar macht.

ES2015 führte das Konzept einer Promise ein, um die "Pyramide des Schreckens" zu durchbrechen: Korrektur der Reihenfolge des Codes, Konsolidierung der Fehlerbehandlung und Verwendung von höherwertigen Tools wie Promise.all.

ES2017 führte die Schlüsselwörter `async` und `await` ein, um die Ausführung von Promises zu vereinfachen. Das Schlüsselwort `await` pausiert die Ausführung der Funktion, bis das Promise aufgelöst oder abgelehnt wird und eine Ausnahme wirft. Es ist auch praktisch, das Promise mit einer `try/catch`-Anweisung zu umschließen.

```javascript
async function get() {
  try {
    const response = await fetch(url1);
    const response2 = await fetch(url2);
    // ...
  } catch (e) {
    // ...
  }
}
```

Die Verwendung der Destrukturierungszuweisung mit `await` kann ebenfalls nützlich sein, z. B.

```javascript
async function fetchSimultaneous(urls: string[]) {
  const [response1, response2, response3] = await Promise.all([ fetch(url1), fetch(url2), fetch(url3)]);
  // ...
}
```

Eine async-Funktion gibt immer ein Promise zurück, auch wenn sie nichts erwartet.

Erstellen Sie async-Pfeilfunktionen:

```javascript
const getNumber = async () => 42; // Typ ist () => Promise<number>
```

Das Roh-Promise entspricht:

```javascript
const getNumber = () => Promise.resolve(42);  // Typ ist () => Promise<number>
```

### **Element 60: Verwenden Sie `allowJs`, um TypeScript und JavaScript zu mischen**

Für ein kleines Projekt kann die Konvertierung von JavaScript zu TypeScript einfach sein, für große Projekte kann die `allowJs`-Compilerregel eine Option sein, die keine sofortige Konvertierung erfordert. Mit `allowJs` können TypeScript-Dateien und JavaScript-Dateien ein ander importieren. Es werden nur Syntaxfehler angezeigt, es sei denn, Sie verwenden `@ts-check` oben in der JavaScript-Datei, um die Typüberprüfung zu aktivieren. Betrachten Sie die Migration jedoch nicht als abgeschlossen, bevor Sie die Regel `noImplicitAny` aktiviert haben.