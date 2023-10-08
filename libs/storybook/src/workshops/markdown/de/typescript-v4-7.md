\---  
description: 'Neuerungen aus TypeScript v4.7-Upgrade'  
pubDate: 'Apr 30, 2022'  
heroImage: 'ef08c2fb-19b1-4219-a4aa-cf1f6c011aa5_49257.png?auto=compress,format'  
author: 'Syntia'  
categories: 'Workshops, Schnittstellen, TypeScript, Kontrollflussanalyse'  
subcategories: 'TypeScript Compiler, Varianznotationen, Typnotationen, Typinstantiierung'  
\---  

# **TypeScript v4.7**

![TypeScript v4.7](https://images.prismic.io/syntia/ef08c2fb-19b1-4219-a4aa-cf1f6c011aa5_49257.png?auto=compress,format)

## **Neue Funktionen des TypeScript v4.7-Updates**

##### **Variantenannotationen**

Es gibt drei Variantentypen: kontravariant als Eingabeparameter, kovariant als Ausgabe und invariant als Eingabe und Ausgabe.

```typescript
// Value ist kontravariant für A
interface Value<A> {
  _A: (_: A) => void
}
// Value ist kovariant für A
interface Value<A> {
  _A: () => A
}
// Value ist invariant für A
interface Value<A> {
  _A: (_: A) => A
}
```

```typescript
// Value ist kovariant für A
interface Value<A> {
  _A: () => A;
}
const number: Value<number> = {
  _A: () => 0,
}
const string: Value<string> = {
  _A: () => "0",
}
const unknown: Value<unknown> = {
  _A: () => "0",
}
let a = number._A();
let b = string._A();
let c = unknown._A();
a = b;  // Fehler - korrekt ✅
b = a;  // Fehler - korrekt ✅
b = c;  // Fehler - korrekt ✅
c = b;  // Sollte ein Fehler sein, ist es aber nicht ❌
```

Mit TypeScript 4.7 können wir jetzt die Variante für Typparameter _explizit_ angeben.

```typescript
type Getter<T> = () => T; // Getter ist kovariant für T

type Setter<T> = (value: T) => void; // Setter ist kontravariant für T
```

Um explizit zu machen, dass `Getter` kovariant für `T` ist, fügen Sie ihm einen `out`-Modifier hinzu:

```typescript
type Getter<out T> = () => T;
```

Um explizit zu machen, dass `Setter` kontravariant für `T` ist, fügen Sie ihm einen `in`-Modifier hinzu.

```typescript
type Setter<in T> = (value: T) => void;
```

`out` und `in` werden hier verwendet, weil die Variante eines Typparameters davon abhängt, ob er in einer _Ausgabe-_ oder einer _Eingabe-_Position verwendet wird. Anstatt über Variante nachzudenken, können Sie einfach darüber nachdenken, ob `T` in Ausgabe- und Eingabe-Positionen verwendet wird.

```typescript
interface State<in out T> {
    get: () => T;
    set: (value: T) => void;
}
```

Es kann für einen Leser nützlich sein, auf einen Blick zu sehen, wie ein Typparameter verwendet wird. Bei viel komplexeren Typen kann es schwer sein zu erkennen, ob ein Typ zum Lesen, Schreiben oder beidem gedacht ist. TypeScript wird uns auch helfen, wenn wir vergessen haben anzugeben, wie dieser Typparameter verwendet wird. Zum Beispiel, wenn wir vergessen hätten, sowohl `in` als auch `out` bei `State` anzugeben, würden wir einen Fehler erhalten.

```typescript
interface State<out T> {
    //          ~~~~~
    // Typen der Parameter sind inkompatibel. ❌
    get: () => T;
    set: (value: T) => void;
}

interface State<in out T> {
    // korrekt ✅
    get: () => T;
    set: (value: T) => void;
}
```

Eine explizite Annotation kann die Typüberprüfung in diesen Zirkularitäten beschleunigen und eine bessere Genauigkeit bieten. Beispielsweise kann die Markierung der invarianten Annotation im obigen Beispiel dazu beitragen, die problematische Zuweisung zu stoppen.

##### **Instantiations Expressions**

Bietet die Möglichkeit, Typargumente für generische Funktionen oder generische Konstruktoren anzugeben, ohne sie tatsächlich aufzurufen. Dies ist besonders nützlich für die Erstellung spezifischer Instanziierungen generischer Klassenkonstruktoren wie des `ErrorMap` (siehe Beispiel unten). Bisher konnte dies nur mit einer Typannotation oder einer redundanten Unterklasse erreicht werden. ([TypeScript/pull/47607](https://github.com/microsoft/TypeScript/pull/47607)).

```typescript
function makeBox<T>(value: T) {
    return { value };
};

const makeStringBox = makeBox<string>; // (value: string) => { value: string }
const stringBox = makeStringBox('abc');  // { value: string }

const ErrorMap = Map<string, Error>;  // new () => Map<string, Error>
const errorMap = new ErrorMap();  // Map<string, Error>
```

##### **Verbesserte Steuerungsflussanalyse für berechnete Eigenschaften (CFA)**

In folgendem Beispiel aus älteren TypeScript-Versionen würde der Compiler nicht überprüfen, ob `obj[key]` nur eine `string` war. Stattdessen würde er akzeptieren, dass `obj[key]` ein `string | number` war, und das Zugreifen auf `toUpperCase()` würde einen Fehler auslösen.

```typescript
const key = Symbol();

const objectKey = Math.random() < 0.5 ? 42 : "Hello World";

let obj = {
    [key]: objectKey,
};

if (typeof obj[key] === "string") {
    let str = obj[key].toUpperCase(); // war vorher ein Fehler ✅
}
```

Mit `strictPropertyInitialization` kann TypeScript korrekt überprüfen, ob berechnete Eigenschaften am Ende eines Konstruktorbodens initialisiert sind.

```typescript
const key = Symbol();

class C {
    [key]: string;

    constructor(str: string) {
        // Ups, vergessen, this[key] zu setzen
    }

    screamString() {
        return this[key].toUpperCase();
    }
}
```

##### **ESM-Unterstützung für Node.js**

```json
{
    "compilerOptions": {
        "module": "nodenext",
    }
}
```

##### **Die verwirrende Seite von Vereinigungen und Schnittstellen**

*   Vereinigung von Objekttypen:
    
    *   Kann die Vereinigung von Werten aus konsistenten Typen halten
        
    *   Ermöglichen den Zugriff auf eine Schnittmenge von Mitgliedern
        
*   Schnittmenge von Objekttypen
    
    *   Kann Werte in der Schnittmenge von Bestand

stypen halten
        
    *   Ermöglichen den Zugriff auf eine Vereinigung von Mitgliedern

##### **Auswirkungen von Objekttypen**

```typescript
type Person = { name: string }

function withPerson(p: Person) {
    for (const key of Object.keys(p)) {
        console.log(p[key].toUpperCase()); // wirft einen Fehler ❌
    }
}

function withPerson(p: Person) {
    for (const key of Object.keys(p) as Array<keyof Person>) {
        console.log(p[key].toUpperCase()); // korrekt ✅
    }
}

withPerson({ name: "Jane" });
let p1 = { name: "Jane", age: 26 };
withPerson(p1);
```