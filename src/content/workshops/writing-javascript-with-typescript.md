---
description: 'Writing better JavaScript with TypeScript in 10 steps'
pubDate: 'Jun 28, 2021'
heroImage: 'https://images.prismic.io/syntia/6e6c9a03-e07f-463d-bc1a-47f11ef2279f_typescript.jpg?auto=compress,format'
author: 'Syntia'
categories: 'workshops, interfaces, typescript, control flow analysis'
subcategories: 'typescript compiler, variance annotations, type annotations, typescript rules'
---

# **Writing better JavaScript with TypeScript in 10 steps**

![](https://images.prismic.io/syntia/6e6c9a03-e07f-463d-bc1a-47f11ef2279f_typescript.jpg?auto=compress,format)

Effective TypeScript, 62 Specific Ways to Improve Your TypeScript by Dan Vanderkam

TypeScript is a powerful tool for JavaScript. It requires adding a types to detect and parse code that would throw an exception at runtime without running the code base, as simple as prevention of errors in development-time.

The book Effective TypeScript, 62 Specific Ways to Improve Your TypeScript by Dan Vanderkam is packed with practical examples and answers at least one question that any TypeScript developer has been searching for.

In last two years [TypeScript](https://www.typescriptlang.org/docs/) has changed the importance of rules reflects on the version of the release and practice with code samples.

I have marked 10 points (items) with takeaway notes throughout this book which I find essential to write TypeScript and JavaScript more effectively.

### **Item 9: Prefer Type Declarations (: Type) to Type Assertions (as Type)**

Type Declaration ensures that the value conforms to the type (e.g. `interface Person { name: string }; const alice: Person = { name: Alice };` ) while type assertion assumes the type and is more appropriate to use where the subtypes has known type, i.e. for Web Api Interfaces and DOM types, (e.g. `element.addEventListener(‘click’, e => { const button = e.currentTarget as HTMLButtonElement; // subtype to EventTarget with value assignment to detect a DOM button element }` ) ).

### **Item 27: Use Functional Constructs and Libraries to Help Types Flow**

As an example provided CSV data parsing with imperative style:

`const csvData = “...”;`

`const rawRows = csvData.split(‘\n’);`

`const headers = rawRows[0].split(‘,’);`

`const rows = rawRows.slice(1).map(rowStr => {`

`const row = {};`

`rowStr.split(‘,’).forEach((val, j) => {`

`row[headers[j] = val; //~~~~ No index signature with parameter of type ‘string’ was found on type ‘{}’`

`});`

`return row;`

`});`

or building row objects with reduce: 

`const rows = rawRows.slice(1).map(rowStr => rowStr.split(‘,’).reduce( (row, val, i) => (row[headers[i] = val, row), {}));`

The solution in each case is to provide the type annotation for {}, either `{[column: string]: string}` or `Record<string, string>.`

With the dependency as Lodash library would pass the type check without modification and saving three lines of code, however without using a bundler it would probably take up most of a project size.

`import _ from ‘lodash’;`

`const rows = rawRows.slice(1).map(rowStr => _.zipObject(headers, rowStr.split(‘,’)));`

### **Item 35: Generate Types from APIs and Specs, Not Data**

Some of the types are likely to come outside the program as file formats, APIs, or specs. Generating the types from specifications rather than from example data will ensure explicit definition not only considering data examples. As an example, given type declarations for GeoJSON provides types without developer understanding and experience with the format.

`const geometryHelper = (g: Geometry) => {`

`if (geometry.type === ‘GeometryCollection’) {`

`geometry.geometries.forEach(geometryHelper);`

`} else {`

`helper(geometry.coordinates);`

`}`

`};`

Similar considerations apply to API calls by generating types from the specification of an API as it works with GraphQL. A GraphQL API comes with a schema that specifies all the possible queries and interfaces using a type system similar to TypeScript. There are tools which generate TypeScript types as it is Apollo Client for GraphQL queries:

`$ apollo client: codegen --endpoint` [https://api.github.com/graphql](https://api.github.com/graphql) \\ --includes license.graphql --target typescript

### **Item 2: Know Which TypeScript Options You are using,**

### **Item 44: Track Your Type Coverage to Prevent Regressions in Type Safety**

TypeScript rule `noImplicitAny` controls whether variables have known types and throws an error for not defined type declarations. Rule `strictNullCheck` controls whether `null` and `undefined` are permissible values in every type. In order to keep track of a number of any types in your codebase include the `type-coverage` package on npm. Running `type-coverage` with the `--detail` flag will print where every ‘`any`’ type occurs in code. It can also occur from third-party declarations, especially with given an entire module an ‘`any`’ type: `declare module ‘my-module’;` With declaration where any code from the module is going to be imported without any type check.

### **Item 54: Iteration Over Objects**

In order to iterate over the object’s keys without type errors use for-in loop and keyof typeof list when the key has the same type of values as in following example:

`Const obj = {`

`one: ‘uno’,`

`two: ‘dos’,`

`three: ‘tres’,`

`};`

`for (const k in obj) {`

`const v = obj[k];` `// ~~~~ Element implicitly has an ‘any’ type because type … has no index signature`

`}`

The type of k is a string but it has to index into an object of three specific keys: ‘one’, ‘two’ and ‘three’ so it is failing with the TypeScript flag.

Plugging in a narrower type declaration for k fixes the issue:

`let k: keyof typeof obj; // Type is “one” | “two” | “three”`

`for (k in obj) {`

`const v = obj[k]; // OK`

`}`

However values assigned can be different than string as a number, date or anything which makes variable ‘any’ type. For that reason use either a `keyof` declaration (`let k: keyof T)` or `Object.entries` to iterate over the keys and values of any object:

`Interface ABC {`

`a: string;`

`b: string;`

`c: number;`

`}`

`function foo(abc: ABC) {`

`for (const [k, v] of Object.entries(abc)) {`

`// k type is string`

`// v type is any`

`}`

`}`

### **Item 57: Use Source Maps to Debug TypeScript**

When you run TypeScript code, you’re actually running a JavaScript that the TypeScript compiler generates.

With noEmit rule TypeScript does not emit compiler output files like JavaScript source code, source-maps or declarations. It makes it possible to decide for another compiler tool like Babel, or swc to handle converting the TypeScript file to a file which can run inside a JavaScript environment. You can then use TypeScript as a tool for providing editor integration, and as a source code type-checker. 

With enabled sourceMap rules map positions and symbols in a generated file back to the corresponding positions and symbols in the original source. It is essential for debugging the code. Without source maps the compiler generates JavaScript that doesn’t closely resemble the original TypeScript source which makes debugging difficult.

For example, to support the `async/await` in older browsers, the compiler has to rewrite the event handler as a state machine which executes the code but no longer bears such a close resemblance to its original source.

### **Item 58: Write Modern JavaScript**

TypeScript is designed to work with modern JavaScript, and because TypeScript is a superset of JavaScript, learning to write more modern JavaScript means you’re learning to write better TypeScript too. The most important for adopting TypeScript are ECMAScript modules and ES2015 classes.

The details will vary depending on your setup but if you’re using CommonJS like this:

`// CommonJS`

`// a.js`

`const b = require(‘./b’);`

`// b.js`

`const name = ‘Module B’;`

`module.exports = { name };`

then the ES module equivalent would look like:

`// ECMAScript module`

`// a.ts`

`Import * as b from ‘./b’;`

`// b.ts`

`export const name = ‘Module B’;`

#### **Use Classes Instead of Prototypes.**

Instead of: 

`function Person(first, last) {`

`this.first = first;`

`this.last = last;`

`}`

`Person.prototype.getName = function() {`

`return this.first + ‘ ’ + this.last;`

`}`

`const marie = new Person(‘Marie’, ‘Curie’);`

`const personName = marie.getName();`

Write:

`class Person {`

`first: string;`

`last: string;`

`constructor(first: string, last: string) {`

`this.first = first;`

`this.last = last;`

`}`

`getName() {`

``return `${this.first} ${this.last}`;``

`}`

`}`

### **Item 25: Use async/await Instead of Raw Promises or Callbacks for Asynchronous Code**

Classic JavaScript modeled asynchronous behaviour using callbacks which lead to the infamous “pyramid of doom”. The execution is the opposite of the code order and it makes code hard to read. 

ES2015 introduced the concept of a Promise to break the Pyramid of doom: correct the code order, consolidate error handling and use higher-order tools like Promise.all.

ES2017 introduced the `async` and `await` keywords to make Promise execution simpler. The each `await` keyword pauses execution of the each function until Promise resolve or reject and throw an exception. It is also convenient to enclose the promise with a `try/catch` statement.

`async function get() {`

`try {`

`const response = await fetch(url1);`

`const response2 = await fetch(url2);`

`// ...`

`} catch (e) {`

`// ...}`

`}`

Using destructuring assignment with await can be also useful, e.g.

`async function fetchSimultaneous(urls: string[]) {`

`const [response1, response2, response3] = await Promise.all([ fetch(url1), fetch(url2), fetch(url3)]);`

`// ...`

`}`

An async function always returns a Promise, even if it doesn’t involve awaiting anything.

Create async arrow functions:

`const getNumber = async () => 42; // Type is () => Promise<number>`

The raw Promise is equivalent:

`const getNumber = () => Promise.resolve(42);  // Type is () => Promise<number>`

### **Item 60: Use allowJs to Mix TypeScript and JavaScript**

For a small project conversion from JavaScript to TypeScript might be simple, for large projects the `allowJs` compiler rule might be an option not requiring conversion at once. With `allowJs` TypeScript files and JavaScript files may import one another. Unless you use `@ts-check` to the top of the JavaScript file to enable type checking the only errors you will see are syntax errors. However converting the project to .ts is not a big accomplishment. Don’t consider migration complete until enabling `noImplicitAny` rule.