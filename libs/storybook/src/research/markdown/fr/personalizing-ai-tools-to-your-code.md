# Personnalisation des outils IA pour votre code

![](https://images.prismic.io/syntia/1216f4f2-61e7-4056-8f75-91ec396b6086_IMG_20221212_124532.jpg)

Bien comprendre le contexte de l'IA est particulièrement important et délicat pour l'autocomplétion du code, et ce, pour trois raisons principales :

Pour les applications d'autocomplétion de code telles que GitHub Copilot ou Codeium, contrairement à quelque chose comme ChatGPT, cette collecte de contexte est gérée par l'application plutôt que par l'utilisateur. Pour des raisons de coût et de latence, ces modèles ne peuvent transmettre qu'environ ~150 lignes de code en tant que contexte. Augmenter cela même à 10 fichiers de contexte coûterait environ 50 à 100 fois plus cher, sans parler de la lenteur qui rendrait l'outil pratiquement inutilisable sans perturber le flux du développeur. Pour le code, les données d'entraînement ont beaucoup plus fréquemment des exemples avec le même terme se référant à des concepts différents. Si vous ne spécifiez pas le schéma réel à utiliser au moment de l'inférence, le modèle peut très bien « choisir » en toute confiance un schéma erroné provenant d'une autre source.

En combinant toutes ces raisons, il devient très clair pourquoi les entreprises peuvent hésiter à utiliser une autocomplétion de code pour leurs bases de code privées. Avec plus de 10 fichiers dans les référentiels et une complexité croissante, cela pourrait devenir une perte de temps lors du débogage ultérieur.

Actuellement, Codeium (sous sa forme générique de modèle de base) et GitHub Copilot sont les deux outils de codage IA les plus admirés, selon l'enquête la plus récente des développeurs StackOverflow : [https://survey.stackoverflow.co/2023/#section-admired-and-desired-ai-developer-tools](https://survey.stackoverflow.co/2023/#section-admired-and-desired-ai-developer-tools)

Voici quelques-uns des autres outils d'assistant IA, chacun ayant des compromis :

## Tabnine

Tabnine est similaire à GitHub CoPilot. Il dispose de commandes telles que "/explain-code", qui explique l'entrée donnée, pas toujours correctement, par exemple la complexité temporelle. "/generate-test-for-code" génère des cas de test aléatoires. "/document-code" ajoute des commentaires pour le code sélectionné. Cependant, il est souvent trop évident et peu utile, par exemple, les commentaires de type JSDoc ne fournissent pas d'informations sur les types de paramètres d'entrée et de sortie. Les commentaires en ligne comme "//test cases" ajoutent des suggestions de code. "/fix-code" ajoute des suggestions pour la résolution de problèmes, par exemple :

```js
function factorial(n) {
  if (n == 1) return; // la condition devrait être n <= 1
  return n * factorial(n - 1);
}
```

Avec ce changement, la fonction renverra le résultat correct pour n=1 et toutes les autres valeurs de n.

{/*examples*/}

## ChatGPT

Bien que de nombreux outils IA soient basés sur les API OpenAI, l'interface utilisateur de ChatGPT elle-même n'est pas utile en développement en raison du manque de contexte des bases de code. Le simple problème dans l'interface de ChatGPT nécessite un changement constant de contexte tout en évitant les erreurs générales dans le chat et en assurant la compatibilité avec la complexité du code, la taille du fichier et l'extension du code. Le manque d'informations sur les sources en programmation conduit souvent à de fausses réponses. Deux ans de développement web passent des archétypes mythologiques du bien au mal - les informations et le code deviennent obsolètes.

Chat GPT 3.5 vers GPT 4 accès gratuit [https://www.forefront.ai/](https://www.forefront.ai/)

{/*examples*/}

## GitHub Copilot

GitHub Copilot dispose d'un contexte pour les bases de code et de commandes IDE similaires à Tabnine. Il partage des commandes comme "/tests" qui crée les tests dans un framework de test tel que l'environnement de test Jest. "/explain" explique l'entrée donnée, comme la complexité temporelle. "/doc" ajoute le commentaire avec les paramètres d'entrée et de retour. "/fix" ajoute une suggestion qui ressemble à la résolution de conflits Git - Accepter ou Rejeter. Exemple de la correction :

```js
function factorial(n) {
  if (num < 0) { // début de la suggestion
    return NaN;
  } // fin de la suggestion
  if (n == 0) return 1;
  return n * factorial(n - 1);
}
```

GitHub Copilot a des suggestions de tests plus étendues, par exemple, les tests pour l'algorithme de tri fusion incluent les nombres dupliqués, négatifs, décimaux.

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

// Cas de test 1 - Tableau vide
mergeSort([]); // []
// Cas de test 2 - Tableau avec un élément
mergeSort([5]); // [5]
// Cas de test 3 - Tableau avec deux éléments
mergeSort([5, 2]); // [2, 5]
// Cas de test 4 - Tableau avec plusieurs éléments
mergeSort([5, 2, 4, 7,

 1, 3, 2, 6]); // [1, 2, 3, 4, 5, 6, 7]
// Cas de test 4 - Tableau avec des éléments dupliqués
mergeSort([5, 2, 4, 7, 1, 3, 2, 6, 4, 5]); // [1, 2, 2, 3, 4, 5, 5, 6, 7]
// Cas de test 5 - Tableau avec des éléments négatifs
mergeSort([5, -2, 4, -7, 1, 3, -2, 6]); // [-7, -2, -2, 1, 3, 4, 5, 6]
// Cas de test 6 - Tableau avec des éléments décimaux
mergeSort([5.5, 2.2, 4.4, 7.7, 1.1, 3.3, 2.2, 6.6]); [1.1, 2.2, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
```

{/*examples*/}

## Bard

L'outil IA Bard a une interface utilisateur similaire à ChatGPT. Comme les modèles OpenAI ont été formés avec des ensembles de données sur un terrain commun avec le modèle Bart, les sources de résultats sont similaires, mais le modèle de traitement de ChatGPT fonctionne de manière plus précise. Le réseau neuronal de ChatGPT possède des groupes de nœuds interconnectés qui permettent aux ordinateurs d'apprendre par l'exemple et de reconnaître des motifs dans les données. Il se corrige continuellement pour se rapprocher davantage du contenu, comme la parole ou les images. Le traitement du langage LaMDA, en revanche, est basé sur le modèle de "domaine ouvert", dans lequel un seul modèle n'a pas besoin d'être réentraîné pour différentes conversations ou sujets. En mettant au défi à la fois ChatGPT et Bard de créer un jeu de Tic-Tac-Toe en utilisant ReactJS, Bard, par rapport à ChatGPT, n'a pas couvert les exigences pour un mode multijoueur, des scores et un concept de niveau de jeu.

{/*examples*/}

## AWS Code Whisper

AWS Code Whisper n'a pas d'interface utilisateur de chat IA, mais une extension d'IDE. Tout comme Github Copilot, il propose des commandes pour l'autocomplétion en ligne, les cas de test, les docs sans ajouter d'informations sur les paramètres d'entrée et de sortie. Le journal de référence de CodeWhisperer montre les recommandations acceptées et la source de référence pour s'assurer de la propriété du code et de sa validité. Exemple d'autocomplétion de code et de test avec AWS Code Whisper :

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

// cas de test pour le tri fusion
mergeSort([1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
mergeSort([5, 4, 3, 2, 1]); // [1, 2, 3, 4, 5]
mergeSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
mergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

{/*examples*/}

## Sourcegraph Cody AI

Sourcegraph IDE est similaire à Tabnine. Il ne prend pas en charge les JSdocs, les commentaires en ligne descriptifs manquent et la reconnaissance d'un problème à partir d'une entrée. Dans l'exemple de la fonction factorielle, il n'a pas amélioré la manipulation de la fonction traitant des nombres négatifs ou nuls. Il suggère d'autres améliorations qui pourraient être utiles dans un autre contexte : Utilisez une boucle for au lieu de la récursivité pour éviter les limites de la pile d'appels sur de grandes entrées.

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

Utilisez BigInt pour permettre des entrées plus importantes :

```js
function factorial(n) {
  if (n === 1n) {
    return 1n;
  } else {
    return n * factorial(n - 1n);
  }
}
```

Utilisez la mémorisation pour mettre en cache les résultats et améliorer les performances sur des entrées répétées :

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

Simplifiez la logique conditionnelle :

```js
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
```

Sure, here's the translated Markdown text in French:

```markdown
Encore une fois, demandant à Cody d'ajuster cette fonction pour gérer les entrées inférieures à 1, il propose une suggestion qui prend en compte les zéros mais pas les nombres négatifs :

```js
function factorial(n) {
  if (n < 0) {
    return 1;
  } else  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```

La génération de tests pour cette fonction prend en charge Jest, car il s'agit d'un framework de test JavaScript courant. En fait, il génère des tests pour le code du factoriel qui échoueraient et capturerait l'erreur :

```js
// Importer le framework de test Jest
import { describe, expect, test } from ‘jest’;

// Importer la fonction à tester
import { factorial } from ‘./helper/factorial.js’;

describe(‘factorial’, () => {
  test(‘retourne 1 lorsque n est égal à 1’, () => {
    expect(factorial(1)).toBe(1);
  });
  test(‘retourne n factoriel pour n positif’, () => {
    expect(factorial(5)).toBe(120);
  });
  test(‘retourne 1 lorsque n est égal à 0’, () => {
    expect(factorial(0)).toBe(1);
  });
  test(‘lance une erreur pour n négatif’, () => {
    expect(() => {
      factorial(-1);
    }).toThrow();
  });
});
```

L'IDE Sourcegraph ne réalise pas d'intégration et d'analyse sur le dépôt au même niveau qu'un seul fichier. Il ne peut pas naviguer à travers les bases de code en reconnaissant les éléments par traitement du langage naturel.

## CodiumAI

CodiumAI est l'outil d'IA le plus prometteur en termes de tests unitaires et de qualité de code.

### Tests

Codium AI propose des paramètres configurables sur les tests offrant plusieurs options : Frameworks pour la génération de tests tels que Jest, Mocha, Jasmine, RTL Comportements pour les cas de test (scénario standard, cas limites, autres comportements) Les tests partagent une description lisible et détaillée Chaque cas de test individuel a une invite d'entrée pour des questions/suggestions.

### Qualité du code

Les tests unitaires sont largement créés pour différents scénarios et contextes qui ne sont pas couverts - cela devrait aider les développeurs à trouver les erreurs dans la base de code en raison de la qualité du code ou des exigences techniques manquantes. Il fournit également la documentation avec une Explication du Code - entrées données, flux et sorties, et exemple d'utilisation. Codium propose des Suggestions de Code qui expliquent les exigences techniques, la gravité du problème et la cause. Dans l'exemple du factoriel ci-dessus, il nous donne des suggestions :

```markdown
### Suggestion
Le code devrait vérifier si num est un entier positif. Dans le cas contraire, il devrait générer une erreur.
### Pourquoi
L'ajout d'une validation des entrées est important pour garantir que la fonction reçoit des entrées valides. Dans ce cas, vérifier si num est un entier positif évitera à la fonction d'entrer dans une récursion infinie si un entier non positif ou une valeur non entière est passé en argument.
```

Il permet également d'appliquer des suggestions et d'éditer le code :

```js
// Code de base …
// Code suggéré
function factorial(num) {
  if (typeof num !== ‘number’ || num <= 0 || !Number.isInteger(num)) {
    throw new Error(‘L'entrée doit être un nombre positif’);
  }
}
```

```markdown
### Suggestion
Le code utilise la récursion pour calculer le factoriel. Au lieu de cela, il devrait utiliser une boucle pour éviter d'éventuelles erreurs de débordement de pile.
### Pourquoi
La suggestion est importante car l'utilisation de la récursion pour calculer le factoriel peut entraîner d'éventuelles erreurs de débordement de pile lorsque le nombre d'entrée est grand. La récursion consomme beaucoup de mémoire car chaque appel récursif ajoute une nouvelle trame de pile à la pile d'appels. En utilisant une boucle, nous pouvons éviter ces erreurs de débordement de pile et améliorer les performances du code.
```

```js
// Code de base …
// Code suggéré
function factorial(num) {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}
```

### Suggestion
Le code devrait vérifier si num est supérieur à 170. Si c'est le cas, il devrait renvoyer Infinity car JavaScript ne peut pas représenter avec précision les nombres supérieurs à 170! ### Pourquoi Cette suggestion est importante car JavaScript a une limite sur le nombre maximum qu'il peut représenter avec précision. En vérifiant si num est supérieur à 170 et en renvoyant Infinity, nous nous assurons que le code gère correctement les calculs factoriels importants et évite d'éventuelles imprécisions ou erreurs.

```js
// Code de base …
// Code suggéré
function factorial(num) {
  if (num > 170) {
    return Infinity;
  }
}
```

```markdown
### Suggestion
Le code devrait vérifier si num est NaN. Dans ce cas, il devrait générer une erreur.
### Pourquoi
Vérifier si num est NaN est important car cela garantit que la fonction ne fonctionne pas avec une entrée invalide. Si num est NaN, le calcul factoriel n'aurait pas de sens et pourrait conduire à des résultats inattendus. Générer une erreur dans ce cas aide à détecter et à gérer les entrées invalides dès le début.
```

Après l'application de la suggestion :

```js
function factorial(num) {
  if (typeof num !== ‘number’ || num <= 0 || !Number.isInteger(num)) {
    throw new Error("L'entrée doit être un nombre positif");
  }
  if (num > 170) {
    return Infinity;
  }
  if (num === 0) {
    return 1;
  }
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}
```

## Codeium

Le modèle de code de base générique de Codeium sur du code non vu conduit à des améliorations substantielles et observables dans la qualité des suggestions par rapport à d'autres outils tels que GitHub Copilot. Codeium se concentre sur l'accélération du code et fournit des outils de complétion de code.

CodiumAI, qui est une entreprise différente, se concentre sur l'intégrité du code et analyse le code pour générer des tests significatifs afin de détecter les bugs dans le code dès le début du développement.

Codeium a formé des modèles sur plus de 70 langages de programmation et prend en charge des extensions pour toutes les principales IDE, notamment Visual Studio Code, IntelliJ IDEA et PyCharm. Exemple de fonction factorielle :

```js
function factorial(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}
console.log(factorial(5));
```

### Autres références de Codeium :
[Fine-tuning on Your Private Code](https://codeium.com/blog/what-github-copilot-lacks-finetuning-on-your-private-code)

[Personnaliser les outils IA selon votre code](https://codeium.com/blog/finetuning-with-codeium-for-enterprises)

[Tout conscient du contexte](https://codeium.com/blog/context-aware-everything-more-advanced-realtime-context-than-github-copilot)

[CodiumAI vs Codeium](https://www.codium.ai/blog/codiumai-or-codeium-which-are-you-looking-for/)

CodiumAI et Codeium ne sont pas des jumeaux, mais la coïncidence de partager un nom similaire développe une tendance à solliciter des entreprises pour un soutien, seulement pour réaliser qu'elles utilisaient un autre produit. Cette paradoxalité permet aux ingénieurs de pencher vers des décisions concernant des outils de développement personnalisés et de tirer parti de l'intégration des deux produits d'IA.
