---
description: "Designing library APIs with TypeScript"
pubDate: "May 1, 2022"
heroImage: "https://images.prismic.io/syntia/cce75ff1-51be-44db-ab22-63811da9106d_e0928a1a-483d-491d-869f-1ba5b06ad345.png?auto=compress,format"
author: "Syntia"
categories: "workshops, interfaces, typescript, architectural design"
subcategories: "typescript, type interface, typescript migration, testing types, dev tools, architectural design"
---


JS is a highly dynamic language, and capturing it with static TS types can be difficult. Type support can indicate whether library is easy to use for developers and designed properly.

Using TS enforce developers to design simpler APIs that are easier to type and infer as much as possible to minimize the types the user has to provide. With _util types_ “pre-typed” functions can provide the final types dynamically.

As of React-Redux v8, for instance, React-Redux types export some helpers to make it easier to write typesafe interfaces:

```markup
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux"
import type { RootState, AppDispatch } from './store"

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

```

### **Maintenance of library types**

##### **Ideal**

*   👍Library written in TS, types built while publishing
    
*   👍Types are guaranteed to match the actual behavior, because it’s generated from source
    
*   👍Types get updated in time of release
    

##### **Acceptable**

*   👍Library written in in JS, manually added types in repo
    
*   👍Types likely written by maintainers
    
*   👎Types and JS source might differ
    

##### **Fallback**

*   👎Library written in JS, types written in `DefinitelyTyped`
    
*   👎Types not written by maintainers
    
*   👎Versioning types vs library not simultaneously
    
*   👍Community takes over the maintenance
    

##### **Improving type support over the time**

Most common Redux libraries have taken different approaches:

*   TS source: Redux Toolkit, Reselect 4.1+, React-redux 8, Redux 5
    
*   JS source with included types: Reselect <=4.0, Redux 4.x
    
*   JS source with DT types: React-redux <= 7.x
    

### **Managing versioning of public types**

##### **TypeScript major version upgrades**

*   TypeScript doesn’t use semantic versioning major-minor-patches version `semver` but incremental release.
    
*   Any TypeScript version has some “breaking” changes.
    

##### **Variations of TS configuration**

*   TS compiler changes considerably with strict mode `strict: true/false`
    
*   Additional changes required by certain TypeScript [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
    

##### **Backward compatibility**

*   Any tweak of library types, even just a bugfix could break compiler parse and stop builds.
    
*   Every release may require major version bump.
    

### **Targeting old TypeScript Versions**

*   TS Releases 3 months apart introducing “breaking” changelog twice a year.
    
*   Issues for libraries:
    
    *   How long will it support old TS versions?
        
    *   When can developers adapt newer syntax and features?
        
    *   How do developers test against multiple TS versions?
        
*   DefinitelyTyped aims for a 2 year support window
    
*   Major changes of note:
    
    *   TS **2.8**: conditional types
        
    *   TS **3.0**: _unknown_, spread param types, tuple types with optional/spread elements
        
    *   TS **3.2/4.0/4.2/4.4**: improved strictness
        
    *   TS **4.0/4,2** variadic tuples
        
    *   TS **4.1**: string manipulation types, key remapping
        
    *   TS **4.2**: tuple rest elements
        
    *   TS **4.5**: type tail recursion
        

### **Migrating JS libraries to TS**

*   Setup build infrastructure and config
    
    *   Example: run `tsc` to check types and use Babel for transpiling and Jest for tests
        
*   Ensure typedefs files are configured and output correctly.
    
    *   Example: add _types_ key to `package.json` (usually points to output folder). Use `yalc` to locally “publish” package and verify package behavior in a test project
        
*   Actual code conversion process:
    
    *   Use existing typedefs (`DefinitelyTyped` or internal) as a starting point including any typetests (e.g. `tsd` tests)
        
    *   Pick key files and convert to TS
        
    *   Rename individual files from _.js_ to _.ts_
        
    *   May have to use the placeholder types like type `$FixTypeLater = any` during initial conversion
        
    *   Covert tests to TS
        
    *   Export types from `src/index.ts`
        

**Most common libraries are migrating to TS to improve code reuse**

*   Several Redux libraries were migrated to TS:
    
    *   Redux core: migrated 2019, changes in master but not released yet (5.x)
        
    *   React-redux: migrated in 2021, v8.0 coming soon
        
    *   Reselect: migrated in late 2021, available as 4.1.x
        

#### **Supporting multiple TS versions**

*   First consideration: what versions does your current types work without breaking?
    
    *   Setup a CI test matrix against multiple TS versions (including _next_) with parameterized TS version on CI
        
    *   Use an older TS version in the workspace to limit what can be used.
        
    *   Set “typescript.tsdk”: “node\_modules/typescript/lib” in VS Code to ensure TS Version from the workspace not overwritten globally.
        
*   Use _typesVersions_ field in _package.json_ to ship alternate typedefs that work with earlier TS versions
    
    *   Specify a version comparison string and point to an alternate typedefs file
        
    *   Example: `"<4.2": {"*": ["./src/typesVersions/ts4.1/index.d.ts"]}`
        
    *   Note: syntax for pointing to files is not simple and is exceptional.
        
    *   Some TS syntax can be “transpiled” to older TS versions with tool [downlevel-dts](https://www.npmjs.com/package/downlevel-dts)
        
    *   Using earlier TS versions should only be a fallback to avoid breakage.
        

### **Types issues and debugging**

*   Bug reports require details about reproduction: TS version, full error and example that shows the exact setup.
    
*   Many TS issues are caused by changes in tsconfig settings:
    
    *   Most common _strict: false_ causes complex TS types to behave differently
        
    *   Many libraries can’t provide any support for the issues from _strict: false_
        
*   As of TypeScript 4.3 in August 2021, the –strict flag enables the following eight compiler options:
    
    *   [\--alwaysStrict](https://www.typescriptlang.org/tsconfig#alwaysStrict)  files are parsed in the ECMAScript strict mode, and emit “use strict” for each source file.
        
    *   [\--strictBindCallApply](https://www.typescriptlang.org/tsconfig#strictBindCallApply) built-in methods of functions `call`, `bind`, and `apply` are invoked with correct argument for the underlying function.
        
    *   [\--strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes) causes functions parameters to be verified and validate assignments.
        
    *   [\--strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks) `true`, `null` and `undefined` have their own distinct types and will throw type error if you try to use them where a certain value is expected.
        
    *   [\--strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization) will raise an error when a class property was declared but not set in the constructor.
        
    *   [\--noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny) throws an error whenever the certain type hasn’t inferred falling back to `any` type.
        
    *   [\--noImplicitThis](https://www.typescriptlang.org/tsconfig#noImplicitThis) Raise error on ‘this’ expressions with an implied ‘any’ type.
        
    *   [\--useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables) does not require the additional syntax (`: unknown`) nor a linter rule to enforce having a subclass ahead of time.
        
*   `"use strict"` strict mode mode makes it easier to write JavaScript more securely and future proof. With a strict mode it is not allowed to:
    
    *   Using a variable or object, without declaring it.
        
    *   Deleting a variable, function nor object.
        
    *   Duplicating a parameter name.
        
    *   Using octal numeric literals nor escape characters.
        
    *   Writing a read-only or get-only property.
        
    *   Deleting a built-in property such as `Object.prototype`.
        
    *   The word `eval` cannot be used as a variable.
        
    *   The word `arguments` cannot be used as a variable.
        
    *   The `with` statement is not allowed.
        
    *   `eval()` is not allowed to create variables in the scope from which it was called for security reasons.
        
    *   The `this` keyword refers to the object that called the function. If the object is not specified, functions in strict mode will return `undefined` and functions in normal mode will return the global object (window).
        
    *   Keywords reserved for future JavaScript versions can NOT be used as variable names in strict mode. Those are:
        
        *   implements
            
        *   interface
            
        *   let
            
        *   package
            
        *   private
            
        *   protected
            
        *   public
            
        *   static
            
        *   yield
            
*   Type errors might not be easy to debug. TS/VSC cover display of variables often limits output size and doesn’t recursively expand. Typescript starts truncating the output when it reaches the default hard-limit of 160 \* 10 characters to prevent the server from hanging too long, even with `"noErrorTruncation": true` set in TS config. For VS Code, a temporary fix would be:
    
    *   opening `<Microsoft VS Code install folder>/resources/app/extensions/node_modules/typescript/lib/tsserver.js`
        
    *   and change `ts.defaultMaximumTruncationLength = 160` at around line 12797
        
    *   to higher value as `ts.defaultMaximumTruncationLength = 800`
        
*   There is no see intermediate types in calculation or to use breakpoints. Break out intermediate types and manually recreate step-by-step type transformations to see the results at the time.
    

### **Testing types**

*   Vital to have “typetest” files alongside unit tests!
    
    *   Type test purpose is to verify correct compilation of a specific chunk of code that exercises the lib API
        
    *   TS code to compile without errors, often with assertions about expected types
        
    *   Can be basic TS files with “tests” written as functions/blocks or additional tests in unit test files.
        
*   Useful utilities:
    
    *   `expectType`: type-level assertion
        
    *   `expectNotAny`, `expectUnknown` specific assertions
        
*   Search for the examples from other library repos for the typetest setups and utils.
    

Example of type test file:

```markup
type IsAny<T, True, False = never> = true | false extends (
    T extends never ? true : false
) ? True : False;

function expectType<T>(t: T): T {
    return T;
} 

type Equals<T, U> = IsAny<
  T,
  never,
  IsAny<U, never, [T] extends [U] ? ([U] extends [T] ? any : never) : never>>;

function expectExactType<T>(t: T) {
  return <U extends Equals<T, U>>(u: U) => {};
}

type IsNotAny<T> = IsAny<T, never, any>;
function expectNotAny<T extends IsNotAny<T>>(t: T): T {
  return t;
}
// Example usage
const result = calculateResult(34);
// Fails to compile if the types are not aligned
expectType<SomeType>(result);

```

### **Type conditionals for generic types**

*   `X extends Y`:
    
    *   Roughly means `>=`
        
    *   In generics, limits the possible types of that generic arg
        
    *   In conditional types, acts as a boolean comparison
        
*   Conditional types are equivalent to ternary statements
    
*   Can “extract” types with the `infer` keyword inside of a conditional check
    
*   `never` can be hard to compare against – `x extends [never]` helps avoid “distributive” comparisons
    

Examples from Redux source:

```markup
// Basic conditional type
type NotFunction<T> = T extends Function ? never : T;

// More advanced conditionals
type ThunkMiddlewareFor<
  S,
  O extends GetDefaultMiddlewareOptions= {}
> = O extends { thunk: false }
  ? never
  : O extends { thunk: { extraArgument: infer E } }
  ? ThunkMiddleware<S, AnyAction, E>
  : ThunkMiddleware<S, AnyAction>;

// Avoid "distributing" value by wrapping in a tuple
type ExtendState<State, Extension> = [Extension] extends [never]
  ? State
  : State & Extension;

// All together
type PayloadAction<
  P = void,
  T extends string = string,
  M = never,
  E = never
> = {
  payload: P;
  type: T;
} & ([M] extends [never] ? {} : { meta: M }) &
 ([E] extends [never] ? {} : { error: E });

```

###### **Remark: Thanks to Mark Erikson for insights “Lessons Maintaining TS Libs” and Titian Cernicova Dragomir for “Understanding types as sets” and other devs for sharing their work experience on TypeScript in TS Congress 2022.**