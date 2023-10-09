---
description: "Écrire un meilleur JavaScript avec TypeScript en 10 étapes"
pubDate: "Jun 28, 2021"
heroImage: "https://images.prismic.io/syntia/6e6c9a03-e07f-463d-bc1a-47f11ef2279f_typescript.jpg?auto=compress,format"
author: "Syntia"
categories: "ateliers, interfaces, typescript, analyse du flux de contrôle"
subcategories: "compilateur typescript, annotations de variance, annotations de type, règles typescript"
---

Effective TypeScript, 62 moyens spécifiques pour améliorer votre TypeScript par Dan Vanderkam

TypeScript est un outil puissant pour JavaScript. Il nécessite l'ajout de types pour détecter et analyser le code qui générerait une exception à l'exécution sans exécuter la base de code, aussi simple que la prévention des erreurs en temps de développement.

Le livre "Effective TypeScript, 62 moyens spécifiques pour améliorer votre TypeScript" de Dan Vanderkam est rempli d'exemples pratiques et répond à au moins une question que tout développeur TypeScript recherche.

Au cours des deux dernières années, [TypeScript](https://www.typescriptlang.org/docs/) a modifié l'importance des règles en fonction de la version de la publication et de la pratique avec des exemples de code.

J'ai répertorié 10 points (éléments) avec des notes à retenir tout au long de ce livre que je considère essentiels pour écrire du TypeScript et du JavaScript de manière plus efficace.

### **Point 9 : Préférez les déclarations de type (: Type) aux assertions de type (as Type)**

La déclaration de type garantit que la valeur est conforme au type (par exemple, `interface Person { name: string }; const alice: Person = { name: Alice };`), tandis que l'assertion de type suppose le type et est plus appropriée à utiliser lorsque les sous-types ont un type connu, c'est-à-dire pour les interfaces Web Api et les types DOM (par exemple, `element.addEventListener('click', e => { const button = e.currentTarget as HTMLButtonElement; // sous-type vers EventTarget avec une affectation de valeur pour détecter un élément de bouton DOM }`)).

### **Point 27 : Utilisez des constructions fonctionnelles et des bibliothèques pour faciliter la circulation des types**

À titre d'exemple, la conversion des données CSV avec un style impératif :

```javascript
const csvData = “...”;
const rawRows = csvData.split(‘\n’);
const headers = rawRows[0].split(‘,’);
const rows = rawRows.slice(1).map(rowStr => {
  const row = {};
  rowStr.split(‘,’).forEach((val, j) => {
    row[headers[j] = val; //~~~~ No index signature with parameter of type ‘string’ was found on type ‘{}’`
  });
  return row;
});
```


ou la création d'objets de ligne avec reduce :

```javascript
const rows = rawRows.slice(1).map(rowStr => rowStr.split(‘,’).reduce((row, val, i) => (row[headers[i] = val, row), {}));
```
La solution dans chaque cas est de fournir l'annotation de type pour {}, soit `{[column: string]: string}` ou `Record<string, string>`.

Avec la dépendance à la bibliothèque Lodash, le code passera la vérification de type sans modification et permettra d'économiser trois lignes de code, cependant, sans utiliser un bundleur, cela pourrait probablement prendre une grande partie de la taille du projet.

```javascript
import _ from ‘lodash’;
const rows = rawRows.slice(1).map(rowStr => _.zipObject(headers, rowStr.split(‘,’)));
```

### **Point 35 : Générez des types à partir de spécifications et non de données**

Certains des types sont susceptibles de provenir de l'extérieur du programme sous forme de formats de fichier, d'API ou de spécifications. Générer les types à partir des spécifications plutôt que des exemples de données garantira une définition explicite en considérant non seulement les exemples de données. À titre d'exemple, les déclarations de type pour GeoJSON fournissent des types sans que le développeur comprenne et ait de l'expérience avec le format.

```javascript
const geometryHelper = (g: Geometry) => {
  if (geometry.type === ‘GeometryCollection’) {
    geometry.geometries.forEach(geometryHelper);
  } else {
    helper(geometry.coordinates);
  }
};
```
Des considérations similaires s'appliquent aux appels d'API en générant des types à partir de la spécification d'une API telle que GraphQL. Une API GraphQL est livrée avec un schéma qui spécifie toutes les requêtes possibles et les interfaces en utilisant un système de type similaire à TypeScript. Il existe des outils qui génèrent des types TypeScript, comme Apollo Client pour les requêtes GraphQL :

`$ apollo client: codegen --endpoint` [https://api.github.com/graphql](https://api.github.com/graphql) \\ --includes license.graphql --target typescript

### **Point 2 : Connaissez les options TypeScript que vous utilisez**

### **Point 44 : Suivez votre couverture de type pour éviter les régressions en matière de sécurité des types**

La règle TypeScript `noImplicitAny` contrôle si les variables ont des types connus et génère une erreur pour les déclarations de type non définies. La règle `strictNullCheck` contrôle si `null` et `undefined` sont des valeurs admissibles dans chaque type. Pour suivre le nombre de types `any` dans votre base de code, incluez le package `type-coverage` sur npm. L'exécution de `type-coverage` avec le drapeau `--detail` affichera l'emplacement de chaque occurrence de type "any" dans le code. Cela peut également se produire à partir de déclarations tierces, en particulier avec une déclaration où tout le code du module sera importé sans aucune vérification de type.

### **Point 54 : Itération sur les objets**

Pour itérer sur les clés de l'objet sans erreurs de type, utilisez une boucle `for-in` et `keyof typeof list` lorsque la clé a le même type de valeurs, comme dans l'exemple suivant :

```javascript
const obj = {
  one: ‘uno’,
  two: ‘dos’,
  three:

 ‘tres’,
};

for (const k in obj) {
  const v = obj[k]; // ~~~~ Element implicitly has an ‘any’ type because type … has no index signature`
}
```

Le type de `k` est une chaîne, mais il doit indexer un objet avec trois clés spécifiques : "one', 'two' et 'three', ce qui provoque une erreur avec le drapeau TypeScript.

L'ajout d'une déclaration de type plus étroite pour `k` résout le problème :

```javascript
let k: keyof typeof obj; // Typ ist “one” | “two” | “three”
for (k in obj) {
  const v = obj[k]; // OK
}
```

Cependant, les valeurs assignées peuvent être différentes de la chaîne, comme un nombre, une date ou toute autre chose qui rend la variable de type "any". Pour cette raison, utilisez soit une déclaration `keyof` (`let k: keyof T`) soit `Object.entries` pour itérer sur les clés et les valeurs de n'importe quel objet :

```javascript
Interface ABC {
  a: string;
  b: string;
  c: number;
}

function foo(abc: ABC) {
  for (const [k, v] of Object.entries(abc)) {
    // k has Type string
    // v has Typ any
  }
}
```

### **Point 57 : Utilisez des cartes source pour déboguer TypeScript**

Lorsque vous exécutez du code TypeScript, vous exécutez en réalité un code JavaScript généré par le compilateur TypeScript.

Avec la règle `noEmit`, TypeScript n'émet pas de fichiers de sortie du compilateur tels que le code source JavaScript, les cartes sources ou les déclarations. Cela permet de décider d'utiliser un autre outil de compilation tel que Babel ou swc pour gérer la conversion du fichier TypeScript en un fichier pouvant être exécuté dans un environnement JavaScript. Vous pouvez ensuite utiliser TypeScript comme un outil d'intégration de l'éditeur et comme un vérificateur de type de code source.

Avec les règles activées pour les cartes sources, les positions et les symboles dans un fichier généré sont mappés aux positions et aux symboles correspondants dans le code source d'origine. Cela est essentiel pour le débogage du code. Sans les cartes sources, le compilateur génère du JavaScript qui ne ressemble pas étroitement au code TypeScript d'origine, ce qui rend le débogage difficile.

Par exemple, pour prendre en charge `async/await` dans les anciens navigateurs, le compilateur doit réécrire le gestionnaire d'événements en tant que machine à états qui exécute le code mais ne ressemble plus autant à sa source d'origine.

### **Point 58 : Écrivez un JavaScript moderne**

TypeScript est conçu pour fonctionner avec du JavaScript moderne, et comme TypeScript est une surensemble de JavaScript, apprendre à écrire un JavaScript plus moderne signifie que vous apprenez également à écrire un meilleur TypeScript. Les éléments les plus importants pour adopter TypeScript sont les modules ECMAScript et les classes ES2015.

Les détails varieront en fonction de votre configuration, mais si vous utilisez CommonJS comme ceci :

```javascript
// CommonJS
// a.js
const b = require(‘./b’);
// b.js
const name = ‘Module B’;
module.exports = { name };
```
alors l'équivalent en module ECMAScript ressemblerait à ceci :

```javascript
// ECMAScript-Modul
// a.ts
Import * as b from ‘./b’;
// b.ts
export const name = ‘Module B’;
```


#### **Utilisez des classes au lieu de prototypes.**

Au lieu de :


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


Écrivez :

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

### **Point 25 : Utilisez async/await au lieu de Promesses brutes ou de rappels pour le code asynchrone**

Le JavaScript classique modélisait le comportement asynchrone à l'aide de rappels, ce qui conduisait à la fameuse "pyramide de l'enfer". L'exécution est inverse à l'ordre du code et rend le code difficile à lire.

ES2015 a introduit le concept de Promesse pour rompre la pyramide de l'enfer : corriger l'ordre du code, consolider la gestion des erreurs et utiliser des outils de haut niveau comme Promise.all.

ES2017 a introduit les mots-clés `async` et `await` pour rendre l'exécution des Promesses plus simple. Le mot-clé `await` met en pause l'exécution de la fonction jusqu'à ce que la Promesse soit résolue ou rejetée et génère une exception. Il est également pratique d'encadrer la Promesse avec une instruction `try/catch`.


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
L'utilisation de la déstructuration avec `await` peut également être utile, par exemple :

```javascript
async function fetchSimultaneous(urls: string[]) {
  const [response1, response2, response3] = await Promise.all([ fetch(url1), fetch(url2), fetch(url3)]);
  // ...
}
```

Une fonction asynchrone renvoie toujours une Promesse, même si elle n'implique pas d'attente. Créez des fonctions fléchées asynchrones :

```javascript
const getNumber = async () => 42; // Type is () => Promise<number>
```

La Promesse brute est équivalente :

```javascript
const getNumber = () => Promise.resolve(42);  // Type is () => Promise<number>
```


### **Point 60 : Utilisez allowJs pour mélanger TypeScript et JavaScript**

Pour un petit projet, la conversion de JavaScript en TypeScript peut être simple, pour les grands projets, la règle du compilateur `allowJs` peut être une option qui ne nécessite pas une conversion immédiate. Avec `allowJs`, les fichiers TypeScript et les fichiers JavaScript peuvent s'importer mutuellement. À moins que vous n'utilisiez `@ts-check` en haut du fichier JavaScript pour activer la vérification de type, les seules erreurs que vous verrez sont des erreurs de syntaxe. Cependant, convertir le projet en .ts n'est pas une grande réussite. Ne considérez pas la migration comme terminée tant que la règle `noImplicitAny` n'est pas activée.



