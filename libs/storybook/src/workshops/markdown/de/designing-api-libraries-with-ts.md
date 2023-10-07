# **Entwicklung von Bibliotheks-APIs mit TypeScript**

![](https://images.prismic.io/syntia/cce75ff1-51be-44db-ab22-63811da9106d_e0928a1a-483d-491d-869f-1ba5b06ad345.png?auto=compress,format)

JavaScript ist eine stark dynamische Sprache, und es kann schwierig sein, sie mit statischen TypeScript-Typen zu erfassen. Die Typenunterstützung kann anzeigen, ob die Bibliothek für Entwickler einfach zu verwenden ist und ordnungsgemäß entwickelt wurde.

Die Verwendung von TypeScript zwingt Entwickler dazu, einfachere APIs zu entwerfen, die leichter zu typisieren sind und so viel wie möglich ableiten, um die Typen zu minimieren, die der Benutzer bereitstellen muss. Mit _Util-Typen_ können "vordefinierte" Funktionen die endgültigen Typen dynamisch bereitstellen.

Ab React-Redux v8 exportieren beispielsweise die React-Redux-Typen einige Hilfsprogramme, um das Schreiben von typensicheren Schnittstellen zu erleichtern:

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Verwenden Sie diese im gesamten Projekt anstelle von einfachem `useDispatch` und `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

### **Pflege von Bibliothekstypen**

##### **Ideal**

*   👍 Bibliothek in TS geschrieben, Typen werden beim Veröffentlichen generiert

*   👍 Typen sind garantiert mit dem tatsächlichen Verhalten übereinzustimmen, da sie aus dem Quellcode generiert werden

*   👍 Typen werden zum Zeitpunkt der Veröffentlichung aktualisiert

##### **Akzeptabel**

*   👍 Bibliothek in JS geschrieben, manuell hinzugefügte Typen im Repository

*   👍 Typen werden wahrscheinlich von den Maintainers geschrieben

*   👎 Typen und JS-Quellcode können voneinander abweichen

##### **Fallback**

*   👎 Bibliothek in JS geschrieben, Typen in `DefinitelyTyped` geschrieben

*   👎 Typen werden nicht von den Maintainers geschrieben

*   👎 Typen und Bibliotheksversionen nicht gleichzeitig

*   👍 Die Community übernimmt die Pflege

##### **Verbesserung der Typenunterstützung im Laufe der Zeit**

Die meisten gängigen Redux-Bibliotheken haben unterschiedliche Ansätze gewählt:

*   TS-Quellcode: Redux Toolkit, Reselect 4.1+, React-redux 8, Redux 5

*   JS-Quellcode mit eingeschlossenen Typen: Reselect <=4.0, Redux 4.x

*   JS-Quellcode mit DT-Typen: React-redux <= 7.x

### **Verwaltung der Versionierung öffentlicher Typen**

##### **TypeScript-Major-Version-Upgrades**

*   TypeScript verwendet keine semantische Versionsverwaltung (Major-Minor-Patches-Version `semver`), sondern inkrementelle Veröffentlichungen.

*   Jede TypeScript-Version hat einige "Breaking" Änderungen.

##### **Variationen der TS-Konfiguration**

*   Der TS-Compiler ändert sich erheblich mit dem strikten Modus `strict: true/false`

*   Zusätzliche Änderungen, die durch bestimmte TypeScript-[Compileroptionen](https://www.typescriptlang.org/docs/handbook/compiler-options.html) erforderlich sind

##### **Rückwärtskompatibilität**

*   Jede Anpassung der Bibliothekstypen, selbst nur eine Fehlerbehebung, könnte dazu führen, dass der Compiler die Analyse unterbricht und die Builds stoppt.

*   Jede Veröffentlichung erfordert möglicherweise eine Aktualisierung der Hauptversion.

### **Ausrichtung auf alte TypeScript-Versionen**

*   TypeScript-Veröffentlichungen alle drei Monate mit zweimal im Jahr veröffentlichten "Breaking" Änderungen.

*   Probleme für Bibliotheken:

    *   Wie lange wird alte TS-Versionen unterstützt?

    *   Wann können Entwickler neuere Syntax und Funktionen übernehmen?

    *   Wie testen Entwickler gegen mehrere TS-Versionen?

*   DefinitelyTyped zielt auf ein 2-Jahres-Support-Fenster ab.

*   Wichtige Änderungen im Überblick:

    *   TS **2.8**: Bedingte Typen

    *   TS **3.0**: _unknown_, Verbreitung von Parameter-Typen, Tupel-Typen

 mit optionalen/verbreiteten Elementen

    *   TS **3.2/4.0/4.2/4.4**: verbesserte Strenge

    *   TS **4.0/4.2**: variadische Tupel

    *   TS **4.1**: Zeichenketten-Manipulationstypen, Schlüssel-Umsetzung

    *   TS **4.2**: Restelemente in Tupeln

    *   TS **4.5**: Typ-Schweifrekursion

### **Migration von JS-Bibliotheken zu TS**

*   Aufbau der Build-Infrastruktur und Konfiguration

    *   Beispiel: Führen Sie `tsc` aus, um die Typen zu überprüfen, und verwenden Sie Babel zum Transpilieren und Jest für Tests

*   Stellen Sie sicher, dass Typdefinitionen-Dateien korrekt konfiguriert und ausgegeben werden.

    *   Beispiel: Fügen Sie dem `package.json` den _types_-Schlüssel hinzu (zeigt normalerweise auf den Ausgabeordner). Verwenden Sie `yalc`, um das Paket lokal "zu veröffentlichen", und überprüfen Sie das Paketverhalten in einem Testprojekt.

*   Tatsächlicher Codekonvertierungsprozess:

    *   Verwenden Sie vorhandene Typdefinitionen (`DefinitelyTyped` oder interne) als Ausgangspunkt, einschließlich etwaiger Typentests (z.B. `tsd`-Tests).

    *   Wählen Sie Schlüsseldateien aus und konvertieren Sie sie in TS.

    *   Benennen Sie einzelne Dateien von _.js_ in _.ts_ um.

    *   Möglicherweise müssen Sie während der anfänglichen Konvertierung Platzhaltertypen wie Typ `$FixTypeLater = any` verwenden.

    *   Konvertieren Sie Tests in TS.

    *   Exportieren Sie Typen aus `src/index.ts`.

**Die meisten gängigen Bibliotheken migrieren zu TS, um die Code-Wiederverwendung zu verbessern**

*   Mehrere Redux-Bibliotheken wurden zu TS migriert:

    *   Redux-Kern: migriert 2019, Änderungen im Master, aber noch nicht veröffentlicht (5.x).

    *   React-redux: 2021 migriert, v8.0 kommt bald.

    *   Reselect: Ende 2021 migriert, als 4.1.x verfügbar.

#### **Unterstützung mehrerer TS-Versionen**

*   Erwägen Sie zuerst, mit welchen Versionen Ihre aktuellen Typen ohne Bruch arbeiten.

    *   Legen Sie eine CI-Testmatrix gegen mehrere TS-Versionen (einschließlich _next_) mit parametrisierter TS-Version in CI fest.

    *   Verwenden Sie in der Workspace eine ältere TS-Version, um festzulegen, was verwendet werden kann.

    *   Setzen Sie "typescript.tsdk": "node\_modules/typescript/lib" in VS Code, um sicherzustellen, dass die TS-Version aus dem Workspace nicht global überschrieben wird.

*   Verwenden Sie das _typesVersions_-Feld in _package.json_, um alternative Typdefinitionen zu versenden, die mit früheren TS-Versionen funktionieren.

    *   Geben Sie einen Versionsvergleichsstring an und zeigen Sie auf eine alternative Typdefinitionendatei.

    *   Beispiel: `"<4.2": {"*": ["./src/typesVersions/ts4.1/index.d.ts"]}`

    *   Hinweis: Die Syntax zum Zeigen auf Dateien ist nicht einfach und außergewöhnlich.

    *   Einige TS-Syntax kann mit dem Tool [downlevel-dts](https://www.npmjs.com/package/downlevel-dts) auf ältere TS-Versionen "transpiliert" werden.

    *   Die Verwendung früherer TS-Versionen sollte nur ein Rückfall sein, um Brüche zu vermeiden.

### **Typenprobleme und Debuggen**

*   Bug-Berichte erfordern Details zur Reproduktion: TS-Version, vollständiger Fehler und ein Beispiel, das das genaue Setup zeigt.

*   Viele TS-Probleme werden durch Änderungen in den tsconfig-Einstellungen verursacht:

    *   Am häufigsten führt _strict: false_ dazu, dass komplexe TS-Typen sich unterschiedlich verhalten.

    *   Viele Bibliotheken können keine Unterstützung für Probleme bieten, die durch _strict: false_ verursacht werden.

*   Ab TypeScript 4.3 im August 2021 aktiviert das Flag -strict die folgenden acht Compileroptionen:

    *   [\--alwaysStrict](https://www.typescriptlang.org/tsconfig#alwaysStrict): Dateien werden im ECMAScript-Striktemodus analysiert und für jede Quelldatei "use strict" erzeugt.

    *   [\--strictBindCallApply](https://www.typescriptlang.org/tsconfig#strictBindCallApply): Die integrierten Methoden von Funktionen `call`, `bind` und `apply` werden mit korrekten Argumenten für die zugrunde liegende Funktion aufgerufen.

    *   [\--strictFunctionTypes](https://www.typescriptlang.org/tsconfig#strictFunctionTypes): Veranlasst die Überprüfung der Parameter von Funktionen

 und validiert Zuweisungen.

    *   [\--strictNullChecks](https://www.typescriptlang.org/tsconfig#strictNullChecks) `true`, `null` und `undefined` haben eigene distinkte Typen und werfen einen Typfehler, wenn Sie versuchen, sie dort zu verwenden, wo ein bestimmter Wert erwartet wird.

    *   [\--strictPropertyInitialization](https://www.typescriptlang.org/tsconfig#strictPropertyInitialization): Löst einen Fehler aus, wenn eine Klasseneigenschaft deklariert, aber nicht im Konstruktor festgelegt wurde.

    *   [\--noImplicitAny](https://www.typescriptlang.org/tsconfig#noImplicitAny): Wirft einen Fehler, wenn der bestimmte Typ nicht abgeleitet werden kann, und fällt auf den Typ `any` zurück.

    *   [\--noImplicitThis](https://www.typescriptlang.org/tsconfig#noImplicitThis): Fehler bei 'this'-Ausdrücken mit einem implizierten Typ 'any'.

    *   [\--useUnknownInCatchVariables](https://www.typescriptlang.org/tsconfig#useUnknownInCatchVariables) erfordert nicht die zusätzliche Syntax (`: unknown`) und keine Linting-Regel zur Durchsetzung eines Subtyps im Voraus.

*   Der strikte Modus "use strict" erleichtert das sicherere Schreiben von JavaScript und ist zukunftssicher. Mit einem strikten Modus ist Folgendes nicht erlaubt:

    *   Verwenden einer Variable oder eines Objekts, ohne sie zu deklarieren.

    *   Löschen einer Variablen, einer Funktion oder eines Objekts.

    *   Duplizieren eines Parameternamens.

    *   Verwenden von oktalen numerischen Literalen oder Escape-Zeichen.

    *   Schreiben eines schreibgeschützten oder get-only-Eigentums.

    *   Löschen einer integrierten Eigenschaft wie `Object.prototype`.

    *   Das Wort `eval` kann nicht als Variable verwendet werden.

    *   Das Wort `arguments` kann nicht als Variable verwendet werden.

    *   Die `with`-Anweisung ist nicht zulässig.

    *   `eval()` darf aus Sicherheitsgründen keine Variablen im Bereich erstellen, aus dem es aufgerufen wurde.

    *   Das Schlüsselwort `this` bezieht sich auf das Objekt, das die Funktion aufgerufen hat. Wenn das Objekt nicht angegeben ist, geben Funktionen im strengen Modus `undefined` zurück, und Funktionen im normalen Modus geben das globale Objekt (window) zurück.

    *   Schlüsselwörter, die für zukünftige JavaScript-Versionen reserviert sind, dürfen in striktem Modus NICHT als Variablennamen verwendet werden. Dazu gehören:

        *   implements

        *   interface

        *   let

        *   package

        *   private

        *   protected

        *   public

        *   static

        *   yield

*   Typfehler sind möglicherweise nicht einfach zu debuggen. TS/VSC begrenzen oft die Anzeige von Variablen und beschränken die Ausgabegröße und dehnen sich nicht rekursiv aus. TypeScript beginnt die Ausgabe abzuschneiden, wenn das Standard-Hartlimit von 160 \* 10 Zeichen erreicht wird, um zu verhindern, dass der Server zu lange hängen bleibt, selbst wenn `"noErrorTruncation": true` in der TS-Konfiguration festgelegt ist. Für VS Code wäre eine vorübergehende Lösung:

    *   Öffnen Sie `<Microsoft VS Code Installationsordner>/resources/app/extensions/node_modules/typescript/lib/tsserver.js`

    *   Ändern Sie `ts.defaultMaximumTruncationLength = 160` in etwa Zeile 12797 auf einen höheren Wert wie `ts.defaultMaximumTruncationLength = 800`

*   Es gibt keine Möglichkeit, Zwischentypen in der Berechnung zu sehen oder Breakpoints zu verwenden. Teilen Sie Zwischentypen auf und erstellen Sie Schritt-für-Schritt-Typtransformationen, um die Ergebnisse zu sehen.

### **Typen testen**

*   Es ist entscheidend, "typetest"-Dateien neben den Unittests zu haben!

    *   Der Zweck von Typetests besteht darin, die korrekte Kompilierung eines bestimmten Codeabschnitts zu überprüfen, der die API der Bibliothek ausführt.

    *   Der TS-Code sollte ohne Fehler kompiliert werden, oft mit Aussagen über erwartete Typen.

    *   Es können grundlegende TS-Dateien mit als Funktionen/Blöcke geschriebenen "Tests" oder zusätzliche Tests in Unittestdateien sein.

*   Nützliche Hilfsprogramme:

    *   `expectType`: Assertion auf Typenebene

    *   `expectNotAny`, `expectUnknown`: spezifische Aussagen

*   Suchen Sie nach Beispielen aus anderen Bibliotheks-Repositories für die Typetest-Setups und -Utils.

Beispiel für eine Typetest-Datei:

```typescript
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
// Beispielverwendung
const result

 = calculateResult(34);
// Kompiliert nicht, wenn die Typen nicht übereinstimmen
expectType<SomeType>(result);

```

### **Bedingte Typen für generische Typen**

*   `X extends Y`:

    *   Bedeutet grob "größer oder gleich"

    *   In Generika begrenzt es die möglichen Typen dieses generischen Arguments

    *   In bedingten Typen fungiert es als boolescher Vergleich

*   Bedingte Typen entsprechen Ternär-Anweisungen

*   Mit dem Schlüsselwort `infer` kann man Typen innerhalb einer bedingten Prüfung "extrahieren"

*   `never` kann schwer zu vergleichen sein – `x extends [never]` hilft, "distributive" Vergleiche zu vermeiden

Beispiele aus der Redux-Quelle:

```typescript
// Grundlegende bedingte Typen
type NotFunction<T> = T extends Function ? never : T;

// Fortgeschrittenere Bedingungen
type ThunkMiddlewareFor<
  S,
  O extends GetDefaultMiddlewareOptions= {}
> = O extends { thunk: false }
  ? never
  : O extends { thunk: { extraArgument: infer E } }
  ? ThunkMiddleware<S, AnyAction, E>
  : ThunkMiddleware<S, AnyAction>;

// Vermeiden der "distribution" durch Einwickeln in ein Tupel
type ExtendState<State, Extension> = [Extension] extends [never]
  ? State
  : State & Extension;

// Alles zusammen
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

###### **Hinweis: Vielen Dank an Mark Erikson für Einblicke in "Lessons Maintaining TS Libs" und Titian Cernicova Dragomir für "Understanding types as sets" und andere Entwickler für das Teilen ihrer Arbeitserfahrung mit TypeScript beim TS Congress 2022.**