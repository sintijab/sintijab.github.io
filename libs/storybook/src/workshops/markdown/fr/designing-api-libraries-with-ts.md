\---  
description: "Conception d'API de bibliothèque avec TypeScript"   
pubDate: "May 1, 2022"   
heroImage: "cce75ff1-51be-44db-ab22-63811da9106d_e0928a1a-483d-491d-869f-1ba5b06ad345.png?auto=compress,format"   
author: "Syntia"   
categories: "ateliers, interfaces, typescript, conception architecturale"   
subcategories: "typescript, interface de type, migration typescript, types de test, outils de développement, conception architecturale"   
\---  

Le JavaScript est un langage hautement dynamique, et capturer ses types statiques avec TypeScript peut être difficile. Le support des types peut indiquer si une bibliothèque est facile à utiliser pour les développeurs et si elle est correctement conçue.

En utilisant TypeScript, les développeurs sont encouragés à concevoir des API plus simples, plus faciles à typer, et à inférer autant que possible pour réduire au minimum les types que l'utilisateur doit fournir. Avec les "types utilitaires", les fonctions "pré-typer" peuvent fournir les types finaux de manière dynamique.

À partir de React-Redux v8, par exemple, les types de React-Redux exportent certaines aides pour faciliter l'écriture d'interfaces sécurisées par rapport aux types :

```markup
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux"   
import type { RootState, AppDispatch } from './store"   

// Utilisez-les dans toute votre application au lieu de simplement `useDispatch` et `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

```

### **Maintenance des types de bibliothèque**

##### **Idéal**

*   👍 Bibliothèque écrite en TypeScript, les types sont générés lors de la publication.

*   👍 Les types sont garantis pour correspondre au comportement réel, car ils sont générés à partir de la source.

*   👍 Les types sont mis à jour au moment de la publication.

##### **Acceptable**

*   👍 Bibliothèque écrite en JavaScript, les types sont ajoutés manuellement dans le référentiel.

*   👍 Les types sont probablement rédigés par les mainteneurs.

*   👎 Les types peuvent différer du code JavaScript source.

##### **Solution de repli**

*   👎 Bibliothèque écrite en JavaScript, les types sont écrits dans `DefinitelyTyped`.

*   👎 Les types ne sont pas rédigés par les mainteneurs.

*   👎 Les versions des types et de la bibliothèque ne sont pas synchronisées.

*   👍 La communauté prend en charge la maintenance.

##### **Amélioration du support des types au fil du temps**

La plupart des bibliothèques Redux courantes ont adopté différentes approches :

*   Source TypeScript : Redux Toolkit, Reselect 4.1+, React-redux 8, Redux 5.

*   Source JavaScript avec des types inclus : Reselect <= 4.0, Redux 4.x.

*   Source JavaScript avec des types DT : React-redux <= 7.x.

### **Gestion de la version des types publics**

##### **Mises à jour majeures de TypeScript**

*   TypeScript n'utilise pas la version sémantique majeure-mineure-correctif `semver`, mais une version de publication incrémentielle.

*   Chaque version de TypeScript comporte des "changements de rupture".

##### **Variantes de configuration TypeScript**

*   Le compilateur TypeScript change considérablement avec le mode strict `strict: true/false`.

*   Des changements supplémentaires sont requis pour certaines options du compilateur TypeScript [compiler options](https://www.typescriptlang.org/docs/handbook/compiler-options.html).

##### **Compatibilité ascendante**

*   La moindre modification des types de bibliothèque, même une simple correction de bogue, peut perturber l'analyse du compilateur et arrêter les constructions.

*   Chaque nouvelle version peut nécessiter une mise à jour majeure.

### **Ciblage des anciennes versions de TypeScript**

*   Les versions de TypeScript sont publiées tous les trois mois, introduisant des "changements de rupture" deux fois par an.

*   Problèmes pour les bibliothèques :

    *   Combien de temps prendront-elles en charge les anciennes versions de TypeScript ?

    *   Quand les développeurs peuvent-ils adopter la syntaxe et les fonctionnalités plus récentes ?

    *   Comment les développeurs testent-ils contre plusieurs versions de TypeScript ?

*   DefinitelyTyped vise une fenêtre de support de 2 ans.

*   Principaux changements à noter :

    *   TS **2.8** : types conditionnels.

    *   TS **3.0** : _unknown_, types de paramètres étalés, types de tuples avec des éléments facultatifs/étalés.

    *   TS **3.2/4.0/4.2/4.4** : renforcement de la rigueur.

    *   TS **4.0/4,2** : tuples variadiques.

    *   TS **4.1** : types de manipulation de chaînes, remappage de clés.

    *   TS **4.2** : éléments de tuple restants.

    *   TS **4.5** : récursion de type de queue.

### **Migration des bibliothèques JavaScript vers TypeScript**

*   Configuration de l'infrastructure et du système de construction.

    *   Exemple : exécution de `tsc` pour vérifier les types, utilisation de Babel pour la transpilation et de Jest pour les tests.

*   Assurez-vous que les fichiers de typedefs sont configurés et générés correctement.

    *   Exemple : ajoutez une clé _types_ au fichier `package.json` (qui pointe généralement vers le dossier de sortie). Utilisez `yalc` pour "publier" localement le package et vérifier son comportement dans un projet de test.

*   Processus réel de conversion du code :

    *   Utilisez les typedefs existants (DefinitelyTyped ou internes) comme point de départ, y compris les tests de type (par exemple, les tests `tsd`).

    *   Sélectionnez les fichiers clés et convertissez-les en TypeScript.

    *   Renommez les fichiers individuels de _.js_ à _.ts_.

    *   Il se peut que vous deviez utiliser des types de placeholder comme le type `$FixTypeLater = any` pendant la conversion initiale.

    *   Convertissez les tests

 en TypeScript.

    *   Exportez les types depuis `src/index.ts`.

**La plupart des bibliothèques courantes migrent vers TypeScript pour améliorer la réutilisation du code.**

*   Plusieurs bibliothèques Redux ont été migrées vers TypeScript :

    *   Noyau Redux : migré en 2019, les changements sont en cours mais n'ont pas encore été publiés (5.x).

    *   React-redux : migré en 2021, v8.0 arrive bientôt.

    *   Reselect : migré fin 2021, disponible en tant que 4.1.x.

#### **Prise en charge de plusieurs versions de TypeScript**

*   Première considération : quelles versions vos types actuels fonctionnent-ils sans provoquer de problèmes ?

    *   Configurez une matrice de tests CI pour plusieurs versions de TypeScript (y compris _next_) avec une version de TypeScript paramétrée dans CI.

    *   Utilisez une ancienne version de TypeScript dans l'espace de travail pour limiter ce qui peut être utilisé.

    *   Définissez "typescript.tsdk": "node\_modules/typescript/lib" dans VS Code pour garantir que la version de TypeScript de l'espace de travail ne soit pas écrasée globalement.

*   Utilisez le champ _typesVersions_ dans _package.json_ pour fournir des typedefs alternatifs compatibles avec des versions antérieures de TypeScript.

    *   Spécifiez une chaîne de comparaison de version et pointez vers un fichier typedefs alternatif.

    *   Exemple : `"<4.2": {"*": ["./src/typesVersions/ts4.1/index.d.ts"]}`.

    *   Remarque : la syntaxe pour pointer vers les fichiers n'est pas simple et est exceptionnelle.

    *   Certaines syntaxes TypeScript peuvent être "transpilées" vers des versions plus anciennes de TypeScript avec l'outil [downlevel-dts](https://www.npmjs.com/package/downlevel-dts).

    *   L'utilisation de versions antérieures de TypeScript ne doit être qu'une solution de repli pour éviter les problèmes.

### **Problèmes de types et débogage**

*   Les rapports de bogues nécessitent des détails sur la reproduction : version de TypeScript, erreur complète et exemple montrant la configuration exacte.

*   De nombreux problèmes TypeScript sont causés par des modifications des paramètres de tsconfig :

    *   La plupart du temps, _strict: false_ provoque des comportements différents pour les types TypeScript complexes.

    *   De nombreuses bibliothèques ne peuvent pas fournir de support pour les problèmes liés à _strict: false_.

*   À partir de TypeScript 4.3 en août 2021, le drapeau --strict active les huit options du compilateur suivantes :

    *   [\--alwaysStrict](https://www.typescriptlang.org/tsconfig#alwaysStrict) : les fichiers sont analysés en mode strict ECMAScript, et "use strict" est émis pour chaque fichier source.

    *   [\--strictBindCallApply](https://www.typescriptlang.org/tsconfig#strictBindCallApply) : les méthodes intégrées des fonctions `call`, `bind`, et `apply` sont invoquées avec les arguments corrects pour la fonction sous-jacente.

    *   [\--strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes) : les paramètres des fonctions sont vérifiés et les assignations sont validées.

    *   [\--strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks) : `true`, `null` et `undefined` ont leurs propres types distincts et généreront une erreur de type si vous essayez de les utiliser là où une valeur spécifique est attendue.

    *   [\--strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization) : générera une erreur lorsque la propriété d'une classe est déclarée mais non initialisée dans le constructeur.

    *   [\--noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny) : génère une erreur chaque fois qu'un certain type n'a pas été inféré, en revenant au type `any`.

    *   [\--noImplicitThis](https://www.typescriptlang.org/tsconfig#noImplicitThis) : génère une erreur sur les expressions 'this' avec un type 'any' implicite.

    *   [\--useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables) : n'exige pas la syntaxe supplémentaire (`: unknown`) ni une règle de linter pour imposer une sous-classe à l'avance.

*   Le mode strict `"use strict"` rend plus facile l'écriture de JavaScript de manière plus sécurisée et pérenne. Avec le mode strict, il n'est pas autorisé de :

    *   Utiliser une variable ou un objet sans le déclarer.

    *   Supprimer une variable, une fonction ou un objet.

    *   Dupliquer un nom de paramètre.

    *   Utiliser des littéraux numériques octaux ou des caractères d'échappement.

    *   Écrire une propriété en lecture seule ou en lecture seule.

    *   Supprimer une propriété intégrée telle que `Object.prototype`.

    *   Le mot `eval` ne peut pas être utilisé comme variable.

    *   Le mot `arguments` ne peut pas être utilisé comme variable.

    *   L'instruction `with` n'est pas autorisée.

    *   `eval()` n'est pas autorisé à créer des variables dans la portée à partir de laquelle il a été appelé, pour des raisons de sécurité.

    *   Le mot-clé `this` fait référence à l'objet qui a appelé la fonction. Si l'objet n'est pas spécifié, les fonctions en mode strict renverront `undefined`, tandis que les fonctions en mode normal renverront l'objet global (fenêtre).

    *   Les mots-clés réservés pour les versions futures de JavaScript NE PEUVENT PAS être utilisés comme noms de variables en mode strict. Il s'agit de :

        *   implements

        *   interface

        *   let

        *   package

        *   private

        *   protected

        *   public

        *   static

        *   yield

*   Les erreurs de type peuvent ne pas être faciles à déboguer. La couverture d'affichage des variables de TS/VSC limite souvent la taille de la sortie et n'étend pas récursivement. TypeScript commence à tronquer la sortie lorsqu'il atteint la limite de troncation par défaut de 160 \* 10 caractères pour éviter que le serveur ne mette trop de temps à répondre

, même si "noErrorTruncation": true" est défini dans la configuration TS. Pour VS Code, un correctif temporaire serait :

    *   ouvrez `<Microsoft VS Code install folder>/resources/app/extensions/node_modules/typescript/lib/tsserver.js`

    *   et changez `ts.defaultMaximumTruncationLength = 160` à environ la ligne 12797

    *   pour une valeur plus élevée comme `ts.defaultMaximumTruncationLength = 800`

*   Il n'est pas possible de voir les types intermédiaires dans les calculs ou d'utiliser des points d'arrêt. Séparez les types intermédiaires et recréez manuellement les transformations de type étape par étape pour voir les résultats à chaque étape.

### **Tests de types**

*   Il est essentiel d'avoir des fichiers "typetest" à côté des tests unitaires !

    *   Le but des tests de type est de vérifier la compilation correcte d'un morceau de code spécifique qui exerce l'API de la bibliothèque.

    *   Le code TypeScript doit être compilé sans erreurs, souvent avec des assertions sur les types attendus.

    *   Ils peuvent être de simples fichiers TypeScript avec des "tests" écrits sous forme de fonctions/blocs ou des tests supplémentaires dans les fichiers de tests unitaires.

*   Utilitaires utiles :

    *   `expectType` : assertion au niveau du type.

    *   `expectNotAny`, `expectUnknown` : assertions spécifiques.

*   Recherchez les exemples provenant d'autres référentiels de bibliothèques pour les configurations de typetests et les utilitaires.

Exemple de fichier de test de type :

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
// Exemple d'utilisation
const result = calculateResult(34);
// Échoue à la compilation si les types ne correspondent pas
expectType<SomeType>(result);
```

### **Conditions de type pour les types génériques**

*   `X extends Y` :

    *   Signifie approximativement `>=`.

    *   Dans les génériques, limite les types possibles de cet argument générique.

    *   Dans les types conditionnels, agit comme une comparaison booléenne.

*   Les types conditionnels sont équivalents aux instructions ternaires.

*   Vous pouvez "extraire" des types avec le mot-clé `infer` à l'intérieur d'une vérification conditionnelle.

*   Il peut être difficile de comparer avec `never` - `x extends [never]` aide à éviter les comparaisons "distributives".

Exemples provenant de la source Redux :

```markup
// Type conditionnel de base
type NotFunction<T> = T extends Function ? never : T;

// Types conditionnels plus avancés
type ThunkMiddlewareFor<
  S,
  O extends GetDefaultMiddlewareOptions= {}
> = O extends { thunk: false }
  ? never
  : O extends { thunk: { extraArgument: infer E } }
  ? ThunkMiddleware<S, AnyAction, E>
  : ThunkMiddleware<S, AnyAction>;

// Évitez de "distribuer" la valeur en l'encapsulant dans un tuple
type ExtendState<State, Extension> = [Extension] extends [never]
  ? State
  : State & Extension;

// Tout ensemble
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

###### **Remarque : Merci à Mark Erikson pour les enseignements sur la maintenance des bibliothèques TypeScript et à Titian Cernicova Dragomir pour "Comprendre les types comme des ensembles", ainsi qu'aux autres développeurs pour avoir partagé leur expérience de travail avec TypeScript lors du TS Congress 2022.**

