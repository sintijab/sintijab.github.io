\---
description: "Fonctionnalités de la mise à jour TypeScript v4.7"   
pubDate: "Apr 30, 2022"   
heroImage: "ef08c2fb-19b1-4219-a4aa-cf1f6c011aa5_49257.png?auto=compress,format"   
author: "Syntia"   
categories: "ateliers, interfaces, typescript, analyse de flux de contrôle"   
subcategories: "compilateur typescript, annotations de variance, annotations de type, instantiation de type"   
\---

## **Fonctionnalités de la mise à jour TypeScript v4.7**

##### **Annotations de variance**

Il existe trois types de variantes : contravariant en tant que paramètre d'entrée, covariant en tant que sortie et invariant en tant qu'entrée et sortie.
```markup
// Value is contravariant on A
interface Value<A> {
  _A: (_: A) => void
}
// Value is covariant on A
interface Value<A> {
  _A: () => A
}
// Value is invariant on A
interface Value<A> {
  _A: (_: A) => A
}

```

```markup
// Value is covariant on A
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
a = b;  // Error - correct ✅
b = a;  // Error - correct ✅
b = c;  // Error - correct ✅
c = b;  // Should be an error but isn't ❌

```

Avec TypeScript 4.7, nous pouvons désormais spécifier explicitement la variance sur les paramètres de type.

```markup
type Getter<T> = () => T; // Getter is covariant on T

type Setter<T> = (value: T) => void; // Setter is contravariant on T

```
Pour rendre explicite que `Getter` est covariant sur `T`, ajoutez un modificateur `out` :

```markup
type Getter<out T> = () => T;

```
Pour rendre explicite que le `Setter` est contravariant sur `T`, ajoutez un modificateur `in`.

```markup
type Setter<in T> = (value: T) => void;

```

`out` et `in` sont utilisés ici parce que la variance d'un paramètre de type dépend de son utilisation en sortie ou en entrée. Au lieu de penser à la variance, vous pouvez simplement vous demander si `T` est utilisé en position de sortie et d'entrée.

```markup
interface State<in out T> {
    get: () => T;
    set: (value: T) => void;
}

```
Il peut être utile pour un lecteur de voir explicitement comment un paramètre de type est utilisé en un coup d'œil. Pour des types beaucoup plus complexes, il peut être difficile de dire si un type est destiné à être lu, écrit ou les deux. TypeScript nous aidera également si nous oublions de mentionner comment ce paramètre de type est utilisé. Par exemple, si nous avons oublié de spécifier à la fois `in` et `out` sur `State`, nous obtiendrions une erreur.

```markup
interface State<out T> {
    //          ~~~~~
    // types of parameters are incompatible. ❌
    get: () => T;
    set: (value: T) => void;
}

interface State<in out T> {
    // correct ✅
    get: () => T;
    set: (value: T) => void;
}

```

Fournir une annotation explicite peut accélérer la vérification des types dans ces circularités et fournir une meilleure précision. Par exemple, marquer une annotation invariante dans l'exemple ci-dessus peut aider à arrêter l'assignation problématique.

##### **Expressions d'instanciation**
Offre la possibilité de spécifier des arguments de type pour les fonctions génériques ou les constructeurs génériques sans les appeler réellement. C'est particulièrement utile pour créer des instanciations spécifiques de constructeurs de classes génériques comme `ErrorMap` (exemple ci-dessous). Auparavant, cela ne pouvait être accompli qu'avec une annotation de type ou une sous-classe redondante. ([TypeScript/pull/47607](https://github.com/microsoft/TypeScript/pull/47607)).

```markup
function makeBox<T>(value: T) {
    return { value };
};

const makeStringBox = makeBox<string>; // (value: string) => { value: string }
const stringBox = makeStringBox('abc');  // { value: string }

const ErrorMap = Map<string, Error>;  // new () => Map<string, Error>
const errorMap = new ErrorMap();  // Map<string, Error>

```
##### **Amélioration de l'analyse de flux de contrôle sur les propriétés calculées**

Dans l'exemple suivant des versions antérieures de TypeScript, le compilateur ne vérifierait pas que `obj[key]` était uniquement une chaîne. Au lieu de cela, il accepterait que `obj[key]` soit une `string | number` et l'accès à `toUpperCase()` déclencherait une erreur.

```markup
const key = Symbol();

const objectKey = Math.random() < 0.5 ? 42 : "Hello World";

let obj = {
    [key]: objectKey,
};

if (typeof obj[key] === "string") {
    let str = obj[key].toUpperCase(); // was an error before ✅

```
Avec `strictPropertyInitialization`, TypeScript peut vérifier correctement que les propriétés calculées sont initialisées à la fin du corps d'un constructeur.

```markup
const key = Symbol();

class C {
    [key]: string;

    constructor(str: string) {
        // oops, forgot to set this[key]
    }

    screamString() {
        return this[key].toUpperCase();
    }
}

```

##### **Prise en charge ESM Node.js**

```markup
{
    "compilerOptions": {
        "module": "nodenext",
    }
}

```

##### **La partie déroutante des unions et des intersections
*   Union des types d'objets :

    *   Peut contenir l'union des valeurs de types cohérents

    *   Autorise l'accès à une intersection de membres

*   Intersection des types d'objets

    *   Peut contenir des valeurs dans l'intersection des types constitutifs

    *   Autorise l'accès à une union de membres

##### **Conséquences des types d'objets

```markup
type Person = { name: string }

function withPerson(p: Person) {
    for (const key of Object.keys(p)) {
        console.log(p[key].toUpperCase()); // throws error ❌
    }
}

function withPerson(p: Person) {
    for (const key of Object.keys(p) as Array<keyof Person>) {
        console.log(p[key].toUpperCase()); // correct ✅
    }
}

withPerson({ name: "Jane" });
let p1 = { name: "Jane", age: 26 };
withPerson(p1);

```