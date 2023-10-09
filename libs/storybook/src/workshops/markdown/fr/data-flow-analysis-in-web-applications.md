\---  
description: "Analyse des flux de données dans les applications Web"   
pubDate: "May 6, 2022"   
heroImage: "f3906029-cc44-46a2-b42c-7d95f6475bda_12976875.jpg?auto=compress,format"   
author: "Syntia"   
categories: "ateliers, infrastructure cloud, analyse de données"   
subcategories: "structures de données, état de l'application, complexité computationnelle, mémorisation, mise en cache, optimisation des performances"   
\---  

Fibonacci "Le Nombre d'Or en art, design et photographie", peinture "La Jeune Fille à la perle" de Johannes Vermeer

La gestion de l'état des données est le processus de contrôle des entrées de l'application sur plusieurs données tout au long d'une session.

Elle fait l'état d'un flux de données géré sous forme de structures de données. Les développeurs ont la possibilité de décider comment le gérer. Les bibliothèques de gestion de l'état fournissent les outils pour créer les structures de données afin de gérer l'état de l'application.

**La structure de données** est une manière d'organiser les données de manière à ce qu'elles puissent être gérées, organisées et mises à jour de manière efficace. La connaissance de l'utilisation des algorithmes et des structures de données peut avoir un impact sur la qualité du code, passant de désastreux à exceptionnel.

Les **types de données abstraits** ne fournissent qu'une interface à laquelle la structure de données doit adhérer. Ils ne donnent aucun détail sur le langage de programmation ni sur l'apparence de l'implémentation. Ils définissent simplement les instructions sur la manière dont les structures de données se comportent et quelles méthodes elles possèdent.

Il y a deux questions que chaque programmeur devrait se poser :

1. Combien de temps cet algorithme met-il pour se terminer ? Combien de temps le programme met-il pour accomplir la tâche ?
    
2. Combien d'espace l'algorithme a-t-il besoin pour sa computation ? Combien de mémoire le programme utilisera-t-il ?
    

Pour comprendre les performances fournies par les structures de données, nous devons connaître l'**analyse de la complexité computationnelle**.

La notation **Big-O** donne une borne supérieure de la complexité **dans le pire des cas**. Elle décrit le comportement limitant d'une fonction lorsque l'argument tend vers une valeur particulière ou vers l'infini - la complexité de votre code.

Pour comprendre ce qu'est la notation Big O, regardons un exemple typique, O(n²) prononcé "Big O au carré". La lettre "n" ici représente la taille de l'entrée, et la fonction "g(n) = n²" à l'intérieur de "O()" nous donne une idée de la complexité de l'algorithme par rapport à la taille de l'entrée.

Un algorithme typique ayant une complexité de O(n²) serait l'algorithme de tri par sélection. Le tri par sélection est un algorithme de tri qui parcourt la liste pour s'assurer que chaque élément à l'indice i est l'élément le plus petit/le plus grand de la liste. Dans l'exemple suivant

```markup
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

pour s'assurer que l'élément est le plus petit élément de la liste, cet algorithme parcourt d'abord la liste avec une boucle _for_. Ensuite, pour chaque élément, il utilise une autre boucle _for_ pour trouver le plus petit élément dans la partie restante de la liste.

La variable _List_ est l'entrée, donc la taille de l'entrée n est le nombre d'éléments dans _List_. En considérant le temps nécessaire pour l'instruction if et l'assignation de valeur bornée, la notation Big O pour la fonction _SelectionSort_ peut être analysée en fonction du nombre de fois où les instructions sont exécutées dans une certaine période de temps, ce qui détermine la complexité temporelle et spatiale.

Pour _O(n)_, le temps de traitement augmente de la même manière que le temps de traitement d'un seul élément de la même manière. Pour _O(n^2)_, le temps de traitement augmente de manière quadratique. En notation Big-O, ce qui est plus important, c'est la façon dont un algorithme évolue, car n'importe quel algorithme s'exécute rapidement sur de petits ensembles de données. Cependant, cela ferait une différence dans la base de données des commandes d'Amazon, par exemple, si l'algorithme s'exécute en O(1,5N) plutôt qu'en O(2N), ce qui le fait fonctionner 25% plus rapidement.

**Les tableaux** sont l'une des structures de données les plus utilisées et constituent la base essentielle de nombreuses autres structures de données. Un tableau est un conteneur de longueur fixe contenant n emplacements référencés par son numéro d'index dans la plage de 0 à n-1.

Les tableaux sont utilisés pour stocker et accéder à des données séquentielles, stocker temporairement des objets, des routines et des tampons d'IO, des tables de recherche, des valeurs de retour d'une fonction et de la programmation dynamique.

## **La programmation dynamique**

La programmation dynamique est une manière de rendre les algorithmes plus efficaces en stockant des résultats intermédiaires. Elle améliore les performances lorsque l'algorithme effectue des calculs répétitifs afin de ne pas les répéter intégralement.

**Exercice :**

L'exemple suivant avec la séquence de Fibonacci 1, 1, 2, 3, 5, 8... représente une série de nombres dans laquelle chaque nombre est la somme des deux derniers.

Le problème ou la tâche consiste à **trouver le n-ième nombre de Fibonacci** avec une fonction fib(n) qui prend un entier positif et trouve et renvoie un nombre positif. Par exemple, si l'argument donné est 3, alors le nombre de Fibonacci de la séquence donnée est le numéro 2.

Pour **résoudre le problème**, les trois premières étapes sont les suivantes :

1. Trouver une **solution récursive** pour trouver les calculs répétitifs effectués et stocker les résultats intermédiaires, appelée mémoïsation.
    
2. **La mémoïsation** est une technique d'optimisation utilisée principalement pour accélérer les programmes en **stockant** les résultats des appels de fonction coûteux et en renvoyant le résultat mis en cache lorsque les mêmes entrées se reproduisent.
    
3. Déterminer une approche **par le bas** pour intégrer la solution récursive dans son ensemble afin de construire la solution complète.
    

##### **Solution récursive**

Avec la séquence donnée 1, 1, 2, 3, 5, 8...,

```markup
def fib(n):
  if n == 1 or n == 2
    result = 1
  else:
    result = fib(n - 1) + fib(n - 2)
  return result

```

Dans cet exemple, si l'index du nombre dans la liste est 1 ou deux, le résultat retourné sera un, et s'il est supérieur, alors la somme des deux nombres de Fibonacci précédents. Le résultat est stocké dans une variable temporaire appelée "result". Cela fonctionne, mais c'est inefficace, car cela nécessite des calculs répétitifs au détriment de l'augmentation de l'argument. Lorsque l'on recherche le 5e nombre de Fibonacci en appelant fib(5), par exemple, le calcul est effectué de manière récursive non seulement pour trouver le cinquième nombre, mais aussi en attribuant l'appel récursif fib(n) pour chaque nombre inférieur à 5 (n <= 5).

Le temps T(n) nécessaire pour trouver le n-ème nombre de Fibonacci croît de manière exponentielle, en O(2^n), ce qui signifie une complexité temporelle exponentielle. Cela indique un algorithme dont la croissance double avec chaque ajout à l'ensemble de données d'entrée. Afin de réduire la complexité, les valeurs de retour pourraient être mémorisées à partir de fib(3) lors de la computation.

##### **Solution mémorisée**

Avec un tableau donné pour trouver le n-ème nombre de Fibonacci, fib(5), les valeurs seront temporairement stockées pour identifier les répétitions en fonction des valeurs retournées dans l'algorithme :

```markup
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

La complexité temporelle T(n) nécessaire pour calculer le nombre de Fibonacci est calculée en multipliant le nombre de fois que la fonction est appelée (<= 2n +1) par le temps nécessaire pour exécuter chacun de ces appels avec une opération constante O(1), ce qui donne O(2n +1) = O(n).

##### **Approche ascendante**

L'approche ascendante avec la même complexité temporelle O(n) mais une complexité spatiale réduite consiste à construire le tableau au lieu de remplacer les valeurs de manière récursive. L'avantage est qu'elle n'effectue pas d'appels récursifs dans la pile d'appels, ce qui en fait une approche plus évolutive :

```markup
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


##### **Séquence de Fibonacci : Écriture, Test et Évaluation d'Algorithmes**

Bien que le nombre d'or ait été un sujet d'étude pendant des siècles et qu'il était connu des anciens Grecs, le mathématicien Fibonacci a déterminé cette séquence. C'est également la clé de la compréhension du nombre d'or représenté par la lettre grecque Phi. Le nombre d'or se retrouve dans divers domaines tels que les arts, l'architecture, les designs, les outils de retracement, la conception de logiciels et le développement agile.

```markup
A/B = (A+B)/A = 1.618033987 = Φ
```

L'importance des nombres de Fibonacci dans le contexte de l'Agilité est exponentielle. L'estimation de la résolution d'un problème particulier (histoire utilisateur) est une combinaison de 3 facteurs : complexité, incertitude et effort. À mesure que les nombres augmentent, la différence entre deux nombres successifs augmente également de manière exponentielle, ce qui conduit à des estimations moins réalistes et à une incertitude quant à la manière de découper les problèmes.

Écrire une implémentation de la séquence de Fibonacci est une étape dans le chemin pour devenir un meilleur programmeur.

Il existe différentes façons de générer et de déterminer les séquences, mais toutes les approches différentes sont basées sur les caractéristiques du flux de données, strictement définies à chaque étape, en utilisant un générateur ou des solutions récursives. Avec de nombreux styles et paradigmes de programmation tels que procéduraux, fonctionnels, orientés objet, etc., cela apporte différentes approches pour écrire le code. La meilleure solution pourrait être considérée comme une approche de **programmation dynamique** pour gérer les problèmes complexes en résolvant d'abord les problèmes plus petits.
