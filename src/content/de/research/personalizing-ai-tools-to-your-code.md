---
description: "Personalisierung von KI-Tools für Ihren Code"
pubDate: "Jan 2, 2024"
heroImage: "https://images.prismic.io/syntia/7cf03112-0986-4c73-af67-211f25284d43_IMG_20221212_124550.jpg?auto=compress,format"
author: "Syntia"
categories: "Forschung, Informationszugang, künstliche Intelligenz, Archivierung und Dokumentation"
subcategories: "Artefaktarchiv, Archivrecherche, Algorithmische Kuratierung, Kritik im Dialog, Kritik-Governance"
---

Die richtige Einbindung von KI-Kontext ist besonders wichtig und knifflig für Code-Autocomplete aus drei Hauptgründen:

Für Code-Autocomplete-Anwendungen wie GitHub Copilot oder Codeium wird dieser Kontext von der Anwendung selbst und nicht vom Benutzer verwaltet. Aus Gründen von Kosten und Latenz können diese Modelle nur etwa ~150 Codezeilen als Kontext übergeben. Eine Erhöhung auf sogar 10 Dateien als Kontext würde etwa 50-100-mal mehr kosten, ganz zu schweigen von der Geschwindigkeit, die praktisch unbrauchbar wäre, ohne den Arbeitsfluss des Entwicklers zu unterbrechen. Bei Code weist der Schulungsdatensatz viel häufiger Beispiele auf, bei denen derselbe Begriff auf unterschiedliche Konzepte verweist. Wenn Sie das tatsächliche Schema nicht zur Inferenzzeit angeben, kann das Modell durchaus selbstbewusst ein falsches Schema aus einer anderen Quelle "auswählen".

Wenn man all diese Gründe zusammenführt, wird deutlich, warum Unternehmen möglicherweise unsicher sind, ob ein Code-Autocomplete für ihre privaten Codebasen funktioniert. Mit mehr als 10 Dateien in Repositories und zunehmender Komplexität besteht das Risiko, dass es später bei der Fehlersuche zu einem Zeitverlust wird.

Derzeit sind Codeium (in generischer Basisform) und GitHub Copilot die beiden bewundertesten KI-Codierungswerkzeuge, laut der neuesten Entwicklerumfrage von StackOverflow: [https://survey.stackoverflow.co/2023/#section-admired-and-desired-ai-developer-tools](https://survey.stackoverflow.co/2023/#section-admired-and-desired-ai-developer-tools)

Hier sind einige andere KI-Assistenten-Tools, von denen jedes einige Kompromisse hat:

## Tabnine

Tabnine ist ähnlich wie GitHub CoPilot. Es hat Befehle wie: '/explain-code', der die eingegebene Eingabe erklärt, nicht immer korrekt z.B. Zeitkomplexität. '/generate-test-for-code' gibt zufällige Testfälle aus. '/document-code' fügt Kommentare für den ausgewählten Code hinzu. Es ist oft zu offensichtlich und nicht nützlich, z.B. fehlen bei JSDoc-Typkommentaren Kommentare zu den Arten von Eingabe- und Ausgabeparametern. Inline-Kommentare wie '//Testfälle' fügen Vorschläge im Code hinzu. '/fix-code' fügt Vorschläge zur Problembehebung hinzu, z.B.

```js
function factorial(n) {
  if (n == 1) return; // die Bedingung sollte n <= 1 sein
  return n * factorial(n - 1);
}
```

Mit dieser Änderung gibt die Funktion das korrekte Ergebnis für n=1 und alle anderen Werte von n zurück.

## ChatGPT

Während viele KI-Tools auf OpenAI-APIs basieren, ist die Benutzeroberfläche von ChatGPT selbst nicht nützlich für die Entwicklung aufgrund des fehlenden Kontexts aus den Codebasen. Das einfache Problem in der ChatGPT-Benutzeroberfläche erfordert ständiges Wechseln des Kontexts, während allgemeine Fehler im Chat vermieden und die Komplexität von Code, Dateigröße und die Kompatibilität der Codeerweiterung sichergestellt wird. Fehlende Informationen über Quellen in der Programmierung führen oft zu falschen Antworten. 2 Jahre in der Webentwicklung führen von den mythologischen Archetypen des Guten zum Bösen - Informationen und Code veralten.

Chat GPT 3.5 zu GPT 4 kostenloser Zugang [https://www.forefront.ai/](https://www.forefront.ai/)

## GitHub Copilot

GitHub Copilot hat Kontext für Codebasen und IDE-Befehle ähnlich wie Tabnine. Es teilt Befehle wie: '/tests' erstellt Tests innerhalb eines Testrahmens wie dem Jest-Testumfeld '/explain' erklärt die eingegebene Eingabe, wie z.B. die Zeitkomplexität '/doc' fügt den Kommentar mit den Eingabeparametern und der Rückgabe hinzu '/fix' fügt einen Vorschlag hinzu, der Git-Konflikte zu lösen scheint - Akzeptieren oder Verwerfen Beispiel für die Fehlerbehebung: 'Umgang mit negativen Zahlen im Fakultät', und wenden Sie den Vorschlag an:

```js
function factorial(n) {
  if (num < 0) { // Anfang des Vorschlags
    return NaN;
  } // Ende des Vorschlags
  if (n == 0) return 1;
  return n * factorial(n - 1);
}
```

GitHub Copilot hat umfassendere Testvorschläge, zum Beispiel enthält die Tests für den Merge-Sort-Sortieralgorithmus Duplikate, negative und dezimale Zahlen.

```js
function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const middle = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
  }
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

// Testfall 1 - Leeres Array
mergeSort([]); // []
// Testfall 2 - Array mit einem Element
mergeSort([5]); // [5]
// Testfall 3 - Array mit zwei Elementen
mergeSort([5, 2]); // [2, 5]
// Testfall 4 - Array mit mehreren Elementen
mergeSort([5,

 2, 4, 7, 1, 3, 2, 6]); // [1, 2, 3, 4, 5, 6, 7]
// Testfall 4 - Array mit Duplikatelementen
mergeSort([5, 2, 4, 7, 1, 3, 2, 6, 4, 5]); // [1, 2, 2, 3, 4, 5, 5, 6, 7]
// Testfall 5 - Array mit negativen Elementen
mergeSort([5, -2, 4, -7, 1, 3, -2, 6]); // [-7, -2, -2, 1, 3, 4, 5, 6]
// Testfall 6 - Array mit Dezimalelementen
mergeSort([5.5, 2.2, 4.4, 7.7, 1.1, 3.3, 2.2, 6.6]); [1.1, 2.2, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
```

## Bard

Das Bard AI-Tool hat eine ähnliche Benutzeroberfläche wie ChatGPT. Da Open AI-Modelle mit Datensätzen auf gemeinsamer Grundlage mit dem Bart geschult wurden, sind die Ergebnisquellen ähnlich, aber das Verarbeitungsmodell von ChatGPT funktioniert genauer. Das neuronale Netzwerk von ChatGPT hat miteinander verbundene Gruppen von Knoten, die es Computern ermöglichen, durch Beispiel zu lernen und Muster in Daten zu erkennen. Es korrigiert sich ständig, um eine nähere Annäherung an Inhalte wie Sprache oder Bilder zu erhalten. Die Sprachverarbeitung von LaMDA hingegen basiert auf dem Modell "Open Domain", bei dem ein einzelnes Modell nicht für unterschiedliche Gespräche oder Themen neu trainiert werden muss. Die Herausforderung für sowohl ChatGPT als auch Bard, ein Tic-Tac-Toe-Spiel mit ReactJS zu erstellen, zeigt, dass Bard im Vergleich zu ChatGPT nicht die Anforderungen an einen Mehrspielermodus, Punkte und ein Spielstufekonzept abdeckte.

## AWS Code Whisper

AWS Code Whisper hat keine KI-Chat-Benutzeroberfläche, sondern die IDE-Erweiterung. Ähnlich wie bei Github Copilot bietet es Befehle für Inline-Autocomplete, Testfälle, Dokumentation gibt jedoch keine Informationen zu Eingabe- und Ausgabeparametern an. Das CodeWhisperer-Referenzprotokoll zeigt akzeptierte Empfehlungen und die Referenzquelle, um sicherzustellen, dass die Code-Lizenz und die Gültigkeit sichergestellt sind. Beispiel für den Code- und Test-Autocomplete mit AWS Code Whisper:

```js
function mergeSort(nums) {
  if (nums.length <= 1) {
    return nums;
  }
  const mid = Math.floor(nums.length / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(left[j]);
    j++;
  }
  return result;
}

// Testfälle für den Mergesort
mergeSort([1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
mergeSort([5, 4, 3, 2, 1]); // [1, 2, 3, 4, 5]
mergeSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
mergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## Sourcegraph Cody AI

Die Sourcegraph IDE ist ähnlich wie Tabnine. Sie unterstützt keine JSdocs, fehlende beschreibende Inline-Kommentare und die Erkennung eines Problems aus einer Eingabe. Im Beispiel der Fakultätsfunktion verbesserte sie nicht die Funktion, die sich mit negativen Zahlen oder Nullen befasst. Sie schlägt stattdessen andere Verbesserungen vor, die in einem anderen Kontext nützlich sein könnten: Verwenden Sie eine for-Schleife anstelle der Rekursion, um Stack-Grenzen bei großen Eingaben zu vermeiden

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

Verwenden Sie Bigint, um größere Eingaben zu ermöglichen:

```js
function factorial(n) {
  if (n === 1n) {
    return 1n;
  } else {
    return n * factorial(n - 1n);
  }
}
```

Verwenden Sie Memoisierung, um Ergebnisse zu speichern und die Leistung bei wiederholten Eingaben zu verbessern:

```js
const cache = {};
function factorial(n) {
  if (n in cache) {
    return cache[n];
  } else {
    if (n === 1) {
      return 1;
    } else {
      let result = n * factorial(n - 1);
      cache[n] = result;
      return result;
    }
  }
}
```

Vereinfachen Sie die bedingte Logik:

```js
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
```

Erneut bittet Cody darum, diese Funktion so zu ändern, dass sie auch Eingaben kleiner als 1 verarbeiten kann. Es wird eine Verbesserung vorgeschlagen, die Nullen abdeckt, aber nicht die negativen Zahlen:

```js
function factorial(n) {
  if (num < 0) {
    return 1;
  } else if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```

Die Testgenerierung für diese Funktion unterstützt Jest, da es sich um ein gängiges JavaScript-Testframework handelt. Tatsächlich generiert es Tests für den Faktorialcode, die fehlschlagen würden und den Fehler erfassen würden:

```js
// Importieren des Jest-Test-Frameworks
import { describe, expect, test } from 'jest';

// Importieren der zu testenden Funktion
import { factorial } from './helper/factorial.js';

describe('factorial', () => {
  test('gibt 1 zurück, wenn n gleich 1 ist', () => {
    expect(factorial(1)).toBe(1);
  });
  test('gibt n Fakultät für positive n zurück', () => {
    expect(factorial(5)).toBe(120);
  });
  test('gibt 1 zurück, wenn n gleich 0 ist', () => {
    expect(factorial(0)).toBe(1);
  });
  test('wirft einen Fehler für negative n aus', () => {
    expect(() => {
      factorial(-1);
    }).toThrow();
  });
});
```

Die Sourcegraph IDE führt keine Integration und Analyse im Repository auf der gleichen Ebene wie eine einzelne Datei durch. Sie kann nicht durch die Codebasis navigieren und die Elemente durch natürliche Sprachverarbeitung erkennen.

## CodiumAI

CodiumAI ist das vielversprechendste KI-Tool in Bezug auf Unit-Tests und Codequalität.

### Testing

Codium AI verfügt über konfigurierbare Einstellungen für Tests mit mehreren Optionen: Frameworks für die Testgenerierung wie Jest, Mocha, Jasmine, RTL-Verhalten für Testfälle (Happy Path, Randfälle, andere Verhaltensweisen) Tests teilen lesbare und detaillierte Testbeschreibungen Jeder einzelne Testfall hat eine Eingabeaufforderung für Fragen/Vorschläge.

### Codequalität

Die Unit-Tests sind umfassend für verschiedene Szenarien und Kontexte erstellt, die nicht abgedeckt sind - sie sollten Entwicklern helfen, Fehler im Code aufgrund von Codequalität oder fehlenden technischen Anforderungen zu finden. Es bietet auch die Dokumentation mit Code-Erklärung - gegebene Eingaben, Ablauf und Ausgaben sowie Beispieleanwendung. Codium hat Code Suggestions, die die technischen Anforderungen, die Schwere des Problems und die Ursache erklären. Für das oben gezeigte Faktorialbeispiel gibt es Vorschläge:

```markdown
### Vorschlag
Der Code sollte überprüfen, ob num eine positive ganze Zahl ist. Andernfalls sollte er einen Fehler auslösen.
### Warum
Es ist wichtig, eine Eingabevalidierung hinzuzufügen, um sicherzustellen, dass die Funktion gültige Eingaben erhält. In diesem Fall verhindert die Überprüfung, ob num eine positive ganze Zahl ist, dass die Funktion bei Verwendung einer nicht positiven Ganzzahl oder einer nicht ganzzahligen Zahl als Argument in eine endlose Rekursion gerät.
```

Es ermöglicht auch die Anwendung von Vorschlägen und das Bearbeiten des Codes:

```js
// Basiscode …
// Vorgeschlagener Code
function factorial(num) {
  if (typeof num !== 'number' || num <= 0 || !Number.isInteger(num)) {
    throw new Error('Die Eingabe muss eine positive Zahl sein');
  }
}
```

```markdown
### Vorschlag
Der Code verwendet Rekursion, um das Faktorial zu berechnen. Stattdessen sollte er eine Schleife verwenden, um potenzielle Stapelüberlauf-Fehler zu vermeiden.
### Warum
Der Vorschlag ist wichtig, weil die Verwendung von Rekursion zur Berechnung des Faktorials potenziell zu Stapelüberlauf-Fehlern führen kann, wenn die Eingangsnummer groß ist. Rekursion verbraucht viel Speicher, da jeder rekursive Aufruf einen neuen Stapelrahmen zum Aufrufstapel hinzufügt. Durch Verwendung einer Schleife können wir diese Stapelüberlauf-Fehler vermeiden und die Leistung des Codes verbessern.
```

```js
// Basiscode …
// Vorgeschlagener Code
function factorial(num) {
  let Ergebnis = 1;
  for (let i = 2; i <= num; i++) {
    Ergebnis *= i;
  }
  return Ergebnis;
}
```
```markdown
### Vorschlag
Der Code sollte überprüfen, ob num größer als 170 ist. In diesem Fall sollte er Unendlich zurückgeben, da JavaScript Zahlen größer als 170! nicht genau darstellen kann.
### Warum
Dieser Vorschlag ist wichtig, weil JavaScript eine Grenze für die maximal darstellbare Zahl hat. Durch Überprüfen, ob num größer als 170 ist und Unendlich zurückzugeben, stellen wir sicher, dass der Code große Faktorialberechnungen korrekt behandelt und potenzielle Ungenauigkeiten oder Fehler vermeidet.
```

```js
// Basiscode …
// Vorgeschlagener Code
function factorial(num) {
  if (num > 170) {
    return Infinity;
  }
}
```

```markdown
### Vorschlag
Der Code sollte überprüfen, ob num NaN ist. In diesem Fall sollte er einen Fehler auslösen.
### Warum
Die Überprüfung, ob num NaN ist, ist wichtig, um sicherzustellen, dass die Funktion nicht mit ungültigen Eingaben arbeitet. Wenn num NaN ist, ergibt die Faktorialberechnung keinen Sinn und könnte zu unerwarteten Ergebnissen führen. Das Auslösen eines Fehlers in diesem Fall hilft, ungültige Eingaben frühzeitig zu erkennen und zu behandeln.
```

Nach Anwendung des Vorschlags:

```js
function factorial(num) {
  if (typeof num !== 'number' || num <= 0 || !Number.isInteger(num)) {
    throw new Error('Die Eingabe muss eine positive Zahl sein');
  }
  if (num > 170) {
    return Infinity;
  }
  if (num === 0) {
    return 1;
  }
  let Ergebnis

 = 1;
  for (let i = 2; i <= num; i++) {
    Ergebnis *= i;
  }
  return Ergebnis;
}
```

## Codeium

Codeiums generisches Basiskodemodell für unbekannten Code führt zu spürbaren Verbesserungen in der Vorschlagsqualität im Vergleich zu anderen Tools wie GitHub Copilot. Codeium konzentriert sich auf Codebeschleunigung und bietet Codevervollständigungstools.

CodiumAI, ein anderes Unternehmen, konzentriert sich auf Codeintegrität und analysiert Code, um sinnvolle Tests zu generieren und Fehler im Code frühzeitig in der Entwicklung zu erkennen.

Codeium hat Modelle für über 70 Programmiersprachen trainiert und unterstützt Erweiterungen für alle gängigen IDEs, einschließlich Visual Studio Code, IntelliJ IDEA und PyCharm. Beispiel für die Faktorialfunktion:

```js
function factorial(n) {
  let Ergebnis = 1;
  for (let i = 1; i <= n; i++) {
    Ergebnis *= i;
  }
  return Ergebnis;
}
console.log(factorial(5));
```

### Weitere Referenzen von Codeium:
[Fine-tuning für Ihren privaten Code](https://codeium.com/blog/what-github-copilot-lacks-finetuning-on-your-private-code)

[Anpassen von KI-Tools an Ihren Code](https://codeium.com/blog/finetuning-with-codeium-for-enterprises)

[Context Aware Everything](https://codeium.com/blog/context-aware-everything-more-advanced-realtime-context-than-github-copilot)

[CodiumAI vs Codeium](https://www.codium.ai/blog/codiumai-or-codeium-which-are-you-looking-for/)

CodiumAI und Codeium sind keine Zwillinge, aber die Parallele beim Namen entwickelt einen Trend, sich an Unternehmen um Unterstützung zu wenden, nur um festzustellen, dass sie ein anderes Produkt verwendet haben. Dieses Paradox ermöglicht es Ingenieuren, Entscheidungen über personalisierte Entwicklungstools zu treffen und die Integration beider KI-Produkte zu nutzen.
```
