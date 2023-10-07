---
description: 'Datenflussanalyse in Webanwendungen'
pubDate: 'May 6, 2022'
heroImage: 'https://images.prismic.io/syntia/f3906029-cc44-46a2-b42c-7d95f6475bda_12976875.jpg?auto=compress,format'
author: 'Syntia'
categories: 'Workshops, Cloud Infrastruktur, Datenanalyse'
subcategories: 'Datenstrukturen, Anwendungsstatus, Berechnungskomplexität, Memoisierung, Zwischenspeicherung, Leistungsoptimierung'
---

Fibonacci "Goldener Schnitt in Kunst, Design und Fotografie", Gemälde "Mädchen mit einem Perlenohrgehänge" von Johannes Vermeer

Die Datenzustandsverwaltung ist der Prozess der Steuerung der Eingabe in einer Anwendung über mehrere Dateneingaben hinweg während einer Sitzung.

Sie macht den Zustand eines Datenflusses durch die Form von Datenstrukturen steuerbar. Entwickler haben die Möglichkeit zu entscheiden, wie sie ihn verwalten möchten. Zustandsverwaltungsbibliotheken bieten die Tools zur Erstellung der Datenstrukturen, um den Zustand der Anwendung zu verwalten.

_Datenstruktur_ ist eine Möglichkeit, Daten so zu organisieren, dass sie effektiv verwaltet, organisiert und aktualisiert werden können. Das Wissen darüber, wie man Algorithmen und Datenstrukturen verwendet, kann die Qualität des Codes von katastrophal bis hervorragend beeinflussen.

_Abstrakte Datentypen_ können nur eine Schnittstelle bereitstellen, an die sich Datenstrukturen halten müssen. Sie geben keine Details über die Programmiersprache oder das Aussehen der Implementierung preis. Sie definieren lediglich Anweisungen, wie sich die Datenstrukturen verhalten und welche Methoden sie haben.

Es gibt zwei Fragen, die jeder Programmierer stellen sollte:

1.  Wie viel Zeit benötigt dieser Algorithmus, um abzuschließen? Wie viel Zeit benötigt das Programm, um die Aufgabe zu erledigen?
    
2.  Wie viel Speicherplatz benötigt der Algorithmus für seine Berechnung? Wie viel Speicher wird das Programm verwenden?
    

Um die Leistungsfähigkeit der bereitgestellten Datenstrukturen zu verstehen, müssen wir die _Berechnungskomplexitätsanalyse_ kennen.

Die _Big-O-Notation gibt eine obere Schranke für die Komplexität im schlimmsten Fall_ an. Sie beschreibt das begrenzende Verhalten einer Funktion, wenn das Argument gegen einen bestimmten Wert oder Unendlich tendiert - die Komplexität Ihres Codes.

Um zu verstehen, was die Big-O-Notation ist, werfen wir einen Blick auf ein typisches Beispiel, O(n²) ausgesprochen "Big O Quadrat". Der Buchstabe "n" repräsentiert hier die Eingabegröße, und die Funktion "g(n) = n²" innerhalb des "O()" gibt uns eine Vorstellung davon, wie komplex der Algorithmus in Bezug auf die Eingabegröße ist.

Ein typischer Algorithmus mit der Komplexität O(n²) wäre der Selection-Sort-Algorithmus. Selection Sort ist ein Sortieralgorithmus, der durch die Liste iteriert, um sicherzustellen, dass jedes Element an der Stelle i das kleinste/größte Element der Liste ist. In folgendem Beispiel

```py
SelectionSort(List) {
  for(i from 0 to List.Length) {
    SmallestElement = List[i]
    for(j from i to List.Length) {
      if(SmallestElement > List[j]) {
        SmallestElement = List[j]
      }
    }
    Swap(List[i], SmallestElement)
  }
}
```

Um sicherzustellen, dass das Element das kleinste Element in der Liste ist, durchläuft dieser Algorithmus zuerst die Liste mit einer for-Schleife. Dann verwendet er für jedes Element eine weitere for-Schleife, um das kleinste Element im verbleibenden Teil der Liste zu finden.

Die Variable List ist die Eingabe, daher ist die Eingabegröße n die Anzahl der Elemente in List. Wenn man die Zeit berücksichtigt, die für die Ausführung der If-Anweisung und die Wertzuweisung gebunden ist, kann die Big-O-Notation für die SelectionSort-Funktion analysiert werden, basierend darauf, wie oft die Anweisungen in einem bestimmten Zeitraum ausgeführt werden, was die Zeit- und Speicherkomplexität bestimmt.

Für O(n) erhöht sich die Verarbeitungszeit um dasselbe wie die Verarbeitungszeit eines einzelnen Elements. Für O(n^2) erhöht sich die Verarbeitungszeit quadratisch. In der Big-O-Notation ist es wichtiger, wie sich ein Algorithmus skaliert, da jeder Algorithmus auf kleinen Datensätzen schnell ausgeführt wird. Es würde jedoch einen Unterschied in der Datenbank der Bestellungen von Amazon machen, wenn der Algorithmus in O(1.5N) anstelle von O(2N) linear skaliert und 25% schneller ausgeführt wird.

_Arrays_ sind eine der am häufigsten verwendeten Datenstrukturen und bilden die Grundlage für viele andere Datenstrukturen. Ein Array ist ein Container fester Länge mit n Slots, die mit ihrer Indexnummer im Bereich von 0 bis n-1 referenziert werden.

Arrays werden verwendet, um sequenzielle Daten zu speichern und darauf zuzugreifen, Objekte vorübergehend zu speichern, E/A-Routinen und Puffer, Suchtabellen, Rückgabewerte aus einer Funktion und dynamische Programmierung.

## _Dynamische Programmierung_

Die dynamische Programmierung ist eine Möglichkeit, Algorithmen effizienter zu gestalten, indem Zwischenergebnisse gespeichert werden. Dies verbessert die Leistung, wenn der Algorithmus wiederholte Berechnungen durchführt, um sie nicht erneut auszuführen.

_Übung:_

Das folgende Beispiel mit der Fibonacci-Folge 1, 1, 2, 3, 5, 8 ... stellt eine Reihe von Zahlen dar, bei der jede Zahl die Summe der letzten beiden ist.

Das Problem oder die Aufgabe besteht darin, die _n-te Fibonacci-Zahl_ mit einer Funktion fib(n) zu finden, die eine positive ganze Zahl annimmt und eine positive Zahl findet und zurückgibt. Wenn beispielsweise das gegebene Argument 3 ist, ist die Fibonacci-Zahl aus der gegebenen Folge die Nummer 2.

Um das Problem zu _lösen_, sind die ersten drei Schritte:

1.  Finden Sie eine _rekursive Lösung_, um die wiederholten Berechnungen zu finden und die Zwischenergebnisse zu speichern, die als Memoisierung bezeichnet werden.
    
2.  _Memoisierung_ ist eine Optimierungstechnik, die hauptsächlich verwendet wird, um Programme zu beschleunigen, indem die Ergebnisse teurer Funktionsaufrufe gespeichert und das zwischengespeicherte Ergebnis zurückgegeben werden, wenn die gleichen Eingaben erneut auftreten.
    
3.  Ermitteln Sie einen _bottom-up_\-Ansatz, um die rekursive Lösung als Ganzes zu integrieren und die vollständige Lösung aufzubauen.
    

##### _Rekursive Lösung_

Mit den gegebenen 1, 1, 2, 3, 5, 8 ...

```py
def fib(n):
  if n == 1 or n == 2
    result = 1
  else:
    result = fib(n - 1) + fib(n - 2)
  return result
```

In diesem Beispiel wird, wenn der Index der Zahl aus der Liste 1 oder zwei ist, das zurückgegebene Ergebnis eins sein, und wenn er größer ist, die Summe der beiden vorherigen Fibonacci-Zahlen. Das Ergebnis wird in einer temporären Variablen "result" gespeichert. Es funktioniert, ist jedoch ineffizient, da es wiederholte Berechnungen erfordert, die mit der Zunahme des Arguments einhergehen. Wenn beispielsweise die 5. Fibonacci-Zahl durch den Aufruf von fib(5) gefunden wird, erfolgt die Berechnung rekursiv nicht nur für die Suche nach der fünften Zahl, sondern auch für den rekursiven Aufruf von fib(n) für jede Zahl, die kleiner als 5 ist (n <= 5).

Die Zeit T(n), die benötigt wird, um die n-te Fibonacci-Zahl zu finden, wächst exponentiell, O(2n) hat eine exponentielle Zeitkomplexität. Es kennzeichnet einen Algorithmus, dessen Wachstum sich mit jeder Hinzufügung zum Eingabedatensatz verdoppelt. Um die Komplexität zu reduzieren, könnten die Rückgabewerte ab fib(3) in der Berechnung memoisiert werden.

##### _Memoisierte Lösung_

Mit dem gegebenen Array, um die n-te Fibonacci-Zahl fib(5) zu finden, werden die Werte temporär gespeichert, um die Wiederholung basierend auf den zurückgegebenen Werten im Algorithmus zu identifizieren:

```py
def fib(n, memo):
  if memo[n] != null:
    return memo[n]
  if n == 1 or n == 2:
    result == 1
  else:
    result = fib(n-1) + fib(n-2)
  memo[n] = result
  return result
```

Die Zeitkomplexität T(n), die benötigt wird, um die Fibonacci-Zahl zu berechnen, wird durch Multiplizieren der Anzahl der Aufrufe der Funktion (<= 2n + 1) mit der Zeit, die für die Ausführung jeder dieser Aufrufe mit konstanter Zeitoperation O(I) benötigt wird, berechnet, was zu O(2n + 1) = O(n) führt.

##### **Bottom-up-Ansatz**

Der Bottom-up-Ansatz mit derselben Zeit O(n) aber reduzierterer Speicherkomplexität besteht darin, das Array aufzubauen, anstatt die Werte rekursiv zu ersetzen. Der Vorteil besteht darin, dass er keine rekursiven Aufrufe im Aufrufstapel erstellt und daher ein skalierbarerer Ansatz ist:

```py
def fib(n):
  if n == 1 or n == 2:
    return 1
  arr = new int[n + 1]
  arr[1] = 1
  arr[2] = 1
  for i from 3 upto n:
    arr[i] = arr[i - 1] + arr[i - 2]
  return arr[n]
```

##### **Fibonacci-Folge: Schreiben, Testen und Benchmarking von Algorithmen**

Obwohl der Goldene Schnitt seit Jahrhunderten Gegenstand von Studien ist und den antiken Griechen bekannt war, wurde diese Sequenz vom Mathematiker Fibonacci bestimmt. Sie ist auch der Schlüssel zum Verständnis des Goldenen Schnitts, der mit dem griechischen Buchstaben Phi dargestellt wird. Der Goldene Schnitt findet sich in verschiedenen Kunstwerken, Architekturen, Designs, Retracement-Tools, Software-Design und agiler Entwicklung.

```py
A/B = (A+B)/A = 1.618033987 = Φ
```

Die Bedeutung der Fibonacci-Zahlen in der agilen Entwicklung ist exponentiell. Die Schätzung der Lösung eines bestimmten Problems (User Story) basiert auf 3 Faktoren: Komplexität, Unsicherheit und Aufwand. Mit steigenden Zahlen nimmt auch der Unterschied zwischen zwei aufeinanderfolgenden Zahlen exponentiell zu, was zu weniger realistischen Schätzungen und Unsicherheiten darüber führt, wie die Probleme aufgeteilt werden sollen.

Die Implementierung der Fibonacci-Folge zu schreiben, ist ein Schritt auf dem Weg, ein besserer Programmierer zu werden.

Es gibt verschiedene Möglichkeiten, die Folgen zu generieren und zu bestimmen, aber alle verschiedenen Ansätze basieren auf den Datenflussmerkmalen, die in jedem Schritt streng definiert sind, unter Verwendung eines Generators oder rekursiver Lösungen. Mit vielen verschiedenen Stilen und Programmierparadigmen wie prozedural, funktional, objektorientiert usw. ergeben sich verschiedene Ansätze zum Schreiben des Codes. Die beste Lösung könnte als ein **dynamischer Programmieransatz** betrachtet werden, um die großen Probleme zu bewältigen, indem zuerst die kleineren Probleme gelöst werden.