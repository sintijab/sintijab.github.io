---
description: 'Data flow analysis in Web applications'
pubDate: 'May 6, 2022'
heroImage: 'https://images.prismic.io/syntia/f3906029-cc44-46a2-b42c-7d95f6475bda_12976875.jpg?auto=compress,format'
author: 'Syntia'
categories: 'workshops, cloud infrastructure, data analysis'
subcategories: 'data structures, application state, computational complexity, memoization, caching, performance optimization'
---

# **Data flow analysis in Web applications**

Fibonacci “Golden Ratio in art, design and photography”, painting “Girl with a Pearl Earring” by Johannes Vermeer

Data state management is the process of controlling application’s input across multiple data entries throughout a session. 

It makes the state of a data flow handled by the form of data structures. Developers have the ability to decide how to manage it. State management libraries provide the tools to create the data structures in order to manage the application’s state.

**Data structure** is a way of organizing data so that it can be managed, organized and updated effectively. The knowledge of how to use the algorithms and data structures can impact the quality of code from disastrous to outstanding.

**Abstract data** types can only provide an interface to which data structure must adhere to. It does not give any details about the programming language nor how the implementation should look like. It simply defines instructions of how the data structures behave and what methods it has.

There are two questions that every programmer should ask:

1.  How much time does this algorithm need to finish? How much time does it take for the program to complete the task?
    
2.  How much space does the algorithm need for its computation? How much memory the program will use?
    

In order to understand performance that the data structures are providing we must know **computational complexity analysis**. 

**Big-O** notation gives an upper bound of the complexity **in the worst case**. It describes the limiting behavior of a function when the argument tends towards a particular value or infinity- the complexity of your code.

To understand what Big O notation is, let’s have a look at a typical example, O(n²) pronounced “Big O squared”. The letter “n” here represents the input size, and the function “g(n) = n²” inside the “O()” gives us an idea of how complex the algorithm is with respect to the input size.

A typical algorithm that has the complexity of O(n²) would be the selection sort algorithm. Selection sort is a sorting algorithm that iterates through the list to ensure every element at index i is the smallest/largest element of the list. In following example

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

to make sure the element is the smallest element from the list, this algorithm first iterates through the list with a _for_ loop. Then for every element it uses another _for_ loop to find the smallest element in the remaining part of the list.

The variable _List_ is the input, thus input size n is the number of elements inside _List_. Considering the time it takes for the if statement and the value assignment bounded by, the big O notation for the _SelectionSort_ function can be analyzed based on how many times the statements are executed in a certain period of time which makes the time and space complexity.

For _O(n)_, the time to process increases by the same as the time to process a single item the same way. For _O(n^2)_, the time to perform increases quadratically. In Big-O notation is more important how an algorithm scales, because any algorithm runs quickly on small data sets. However it would make a difference on Amazon’s orders database, for instance, if the algorithm runs in O(1.5N) rather than O(2N) linear scale performing 25% faster.

**Arrays** are one of the most used data structures and makes a core basis for many other data structures. Array is a fixed length container containing n slots referenced its index number from the range 0 to n-1.

Arrays are used for storing and accessing sequential data, temporarily storing objects, IO routines and buffers, lookup tables, return values from a function and dynamic programming.

## **Dynamic programming**

Dynamic programming is a way of making algorithms more efficient by storing intermedium results. It improves the performance when the algorithm has repetitive computations not to repeat it all over again.

**Exercise:**

The following example with Fibonacci sequence 1, 1, 2, 3, 5, 8 … represents a series of numbers in which each number is the sum of the last two.

The problem or task is to **find the n’th Fibonacci number** with a function fib(n) which takes a positive integer and finds and returns a positive number. For instance, if the given argument is 3, then the Fibonacci number from the given sequence is nr 2.

To **solve the problem** the first three steps is to:

1.  Find a **recursive solution** to find the repetitive computations performed and store the intermedium results, called a memoization.
    
2.  **Memoization** is an optimization technique used primarily to speed up programs by **storing** the results of expensive function calls and returning the cached result when the same inputs occur again.
    
3.  Determine a **bottom up** approach to integrate recursive solution as a whole to build up the complete solution.
    

##### **Recursive solution**

With given 1, 1, 2, 3, 5, 8 …

```markup
def fib(n):
  if n == 1 or n == 2
    result = 1
  else:
    result = fib(n - 1) + fib(n - 2)
  return result

```

In this example if the index of number from the list is 1 or two, the returned result will be one, and if greater then the sum of the previous two fibonacci numbers. The result is stored in a temporary variable result. It works but is inefficient, because it requires repetitive computations in expense of argument increase. When finding the 5th fibonacci number by calling fib(5), for instance, the computation performs recursively not only looking for the fifth number but assigning the recursive call fib(n) for every number that is lower than 5 (n <=5).

The time T(n) which takes to find the n’th fibonacci number grows exponentially, O(2n) has an exponential time complexity. It denotes an algorithm whose growth doubles with each addition to the input data set. In order to reduce complexity the return values could be memoized from fib(3) in computation.

##### **Memoized solution**

With given array to find the n’th fibonacci number fib(5) the values will be temporary stored to identify the repetition based on returned values in algorithm:

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

Time complexity T(n) it takes to fibonacci number is calculated by multiplying the number of time the function is called (<= 2n +1) with the time it takes to execute each of those calls with constant time operation O(I), resulting in O(2n +1) = O(n). 

##### **Bottom up approach**

Bottom up approach with the same time O(n) but reduced space complexity would be building up the array instead of replacing the values recursively. The advantage is that it doesn’t make recursive calls in the call stack therefore is more scalable approach:

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

##### **Fibonacci Sequence: Writing, Testing, and Benchmarking Algorithms**

Although the golden ratio has been a subject of study for centuries and was known to the ancient Greeks, the mathematician Fibonacci determined this sequence. It is the also key of understanding the golden ratio represented with the Greek letter Phi. Golden ratio is found in various arts, architecture, designs, retracement tools, software design and agile development.

```markup
A/B = (A+B)/A = 1.618033987 = Φ
```

Significance of the Fibonacci numbers in Agile are exponential. The estimation of solving a certain problem (user story) is a combination of 3 factors: complexity, uncertainty and effort. As the numbers increase, the difference between two succeeding numbers also increases exponentially, which leads to less realistic estimates and uncertainty of how to break down the problems.

Writing an implementation of the Fibonacci sequence is a step in the journey of becoming a better programmer.

There are different ways to generate and determine the sequences, but all different approaches is based on the data flow characteristics, strictly defined on each step, using a generator or recursive solutions. With many different styles and paradigms of programming, such as procedural, functional, object-oriented, and so forth brings a different approaches of writing the code. The best solution could be considered a **dynamic programming** approach to manage the large problems by solving the smaller problems first.

### **Share this:**

*   [  
    ](https://syntia.org/2022/05/06/data-flow-analysis-in-web-applications/?share=twitter&nb=1)