---
description: 'Features from TypeScript v4.7 upgrade'
pubDate: 'Apr 30, 2022'
heroImage: 'https://images.prismic.io/syntia/ef08c2fb-19b1-4219-a4aa-cf1f6c011aa5_49257.png?auto=compress,format'
author: 'Syntia'
categories: 'workshops, interfaces, typescript, control flow analysis'
subcategories: 'typescript compiler, variance annotations, type annotations, type instantiation'
---
# **TypeScript v4.7**

## **Features from TypeScript v4.7 upgrade**

##### **Variance annotations**

There are three variant types: contravariant as an input parameter, covariant as an output and invariant as an input and output.

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

With TypeScript 4.7, we’re now able to _explicitly_ specify variance on type parameters.

```markup
type Getter<T> = () => T; // Getter is covariant on T

type Setter<T> = (value: T) => void; // Setter is contravariant on T

```

To make it explicit that `Getter` is covariant on `T`, give it an `out` modifier:

```markup
type Getter<out T> = () => T;

```

To make it explicit that `Setter` is contravariant on `T`, give it an `in` modifier.

```markup
type Setter<in T> = (value: T) => void;

```

`out` and `in` are used here because a type parameter’s variance depends on whether it’s used in in an _output_ or an _input_. Instead of thinking about variance, you can just think about if `T` is used in output and input positions.

```markup
interface State<in out T> {
    get: () => T;
    set: (value: T) => void;
}

```

It can be a useful for a reader to explicitly see how a type parameter is used at a glance. For much more complex types, it can be difficult to tell whether a type is meant to be read, written, or both. TypeScript will also help us out if we forget to mention how that type parameter is used. As an example, if we forgot to specify both `in` and `out` on `State`, we’d get an error.

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

Providing an explicit annotation can speed up type-checking at these circularities and provide better accuracy. For instance, marking invariant annotation in the above example can help stop the problematic assignment.

##### **Instantiations Expressions**

Provides the ability to specify type arguments for generic functions or generic constructors without actually calling them. It is particularly useful for creating specific instantiations of generic class constructors such as the `ErrorMap` (example below). Previously, this could only be accomplished with a type annotation or a redundant subclass. ([TypeScript/pull/47607](https://github.com/microsoft/TypeScript/pull/47607)).

```markup
function makeBox<T>(value: T) {
    return { value };
};

const makeStringBox = makeBox<string>; // (value: string) => { value: string }
const stringBox = makeStringBox('abc');  // { value: string }

const ErrorMap = Map<string, Error>;  // new () => Map<string, Error>
const errorMap = new ErrorMap();  // Map<string, Error>

```

##### **CFA Improved control flow analysis on computed properties**

In following example from the older TypeScript versions compiler wouldn’t verify that `obj[key]` was only a `string`. Instead it would accept that `obj[key]` was a  `string | number` and accessing `toUpperCase()` would trigger an error.

```markup
const key = Symbol();

const objectKey = Math.random() < 0.5 ? 42 : "Hello World";

let obj = {
    [key]: objectKey,
};

if (typeof obj[key] === "string") {
    let str = obj[key].toUpperCase(); // was an error before ✅

```

With `strictPropertyInitialization` TypeScript can correctly check that computed properties are initialised by the end of a constructor body.

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

##### **ESM Node.js support**

```markup
{
    "compilerOptions": {
        "module": "nodenext",
    }
}

```

##### **The confusing part about unions and intersections**

*   Union of object types:
    
    *   Can hold the union of values from consistent types
        
    *   Allow access to an intersection of members
        
*   Intersection of object types
    
    *   Can hold values in the intersection of constituent types
        
    *   Allow access to a union of members
        

##### **Consequences of object types**

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