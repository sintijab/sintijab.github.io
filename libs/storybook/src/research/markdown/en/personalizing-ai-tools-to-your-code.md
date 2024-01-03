# Personalizing AI Tools to Your Code
![](https://images.prismic.io/syntia/7cf03112-0986-4c73-af67-211f25284d43_IMG_20221212_124550.jpg?auto=compress,format)

Getting context right is especially more important and tricky for code autocomplete for three main reasons:

For code autocomplete applications like GitHub Copilot or Codeium, unlike something like ChatGPT, this context collection is handled by the application rather than the user. For cost and latency reasons these models can only pass ~150 lines of code as context. Increasing it to even 10 files of context would cost approximately 50-100x times more, not to mention how slow that would be and practically unusable without breaking up developer flow. For code, the training data much more commonly has examples with the same term referring to different concepts. If you don’t specify the actual schema to use at inference time, the model very well can confidently “pick” a wrong one from another source.

Combining all of these reasons together it becomes very clear why companies may be unsure whether a code autocomplete will work for their private codebases. With more than 10 files in repositories and increasing complexity it may risk becoming a time sink in later debugging.

Currently, Codeium (in generic base model form) and GitHub Copilot are the two most admired AI coding tools, according to the most recent StackOverflow developer survey: [https://survey.stackoverflow.co/2023/#section-admired-and-desired-ai-developer-tools](https://survey.stackoverflow.co/2023/#section-admired-and-desired-ai-developer-tools)

Here is some of the other AI Assistant tools that each has some trade-offs:

## Tabnine

Tabnine is similar to GitHub CoPilot. It has commands like: ‘/explain-code’ which explains the given input, not always correctly e.g. time complexity. ‘‘/generate-test-for-code’ outputs the random test cases. ‘/document-code’ adds comments for the selected code. It is often too obvious and not useful, e.g. JSDoc type comments are missing comments about types of input and output parameters Inline comments like ‘//test cases’ will add suggestions in code ‘/fix-code’ add suggestions in problem solving, e.g.

```js
function factorial(n) {
  if (n == 1) return; // the condition should be n <= 1
  return n * factorial(n - 1);
}
```

With this change, the function will return the correct result for n=1 and all other values of n.

## ChatGPT

While many AI tools are based on OpenAI APIs, ChatGPT user interface itself isn’t useful in development due to the missing context from the codebases. The simple problem in ChatGPT interface requires constantly switching the context while avoiding the general errors on chat and reassuring the complexity of code, file size and the code extension compatibility. Missing information about sources in programming often leads to false answers. 2 years in web development leads from the mythological archetypes of good to evil- information and code is getting outdated.

Chat GPT 3.5 to GPT 4 free access [https://www.forefront.ai/](https://www.forefront.ai/)

## GitHub Copilot

GitHub Copilot has context for codebases and IDE commands similar to Tabnine. It shares commands like: ‘/tests’ creates the tests within a test framework such as Jest test environment ‘/explain’ explains the given input such as time complexity ‘/doc’ adds the comment with the input parameters and return ‘/fix’ adds a suggestion which looks similar to resolving Git conflicts-Accept or Discard Example of the fix: ‘Handle negative numbers in factorial’, and apply the suggestion:

```js
function factorial(n) {
  if (num < 0) { // start of suggestion
    return NaN;
  } // end of suggestion
  if (n == 0) return 1;
  return n * factorial(n - 1);
}
```

GitHub Copilot has more extensive test suggestions, for instance, tests for merge sort sorting algorithm does include the duplicate, negative, decimal numbers.

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

// Test case 1 - Empty array
mergeSort([]); // []
// Test case 2 - Array with one element
mergeSort([5]); // [5]
// Test case 3 - Array with two elements
mergeSort([5, 2]); // [2, 5]
// Test case 4 - Array with multiple elements
mergeSort([5, 2, 4, 7, 1, 3, 2, 6]); // [1, 2, 3, 4, 5, 6, 7]
// Test case 4 - Array with duplicate elements
mergeSort([5, 2, 4, 7, 1, 3, 2, 6, 4, 5]); // [1, 2, 2, 3, 4, 5, 5, 6, 7]
// Test case 5 - Array with negative elements
mergeSort([5, -2, 4, -7, 1, 3, -2, 6]); // [-7, -2, -2, 1, 3, 4, 5, 6]
// Test case 6 - Array with decimal elements
mergeSort([5.5, 2.2, 4.4, 7.7, 1.1, 3.3, 2.2, 6.6]); [1.1, 2.2, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7]
```

## Bard

Bard AI tool has a similar user interface to ChatGPT. Since Open AI models have been trained with the datasets on the common ground with the Bart, the sources of results are similar but the processing model of ChatGPT works more accurately. ChatGPT’s neural network has interconnected groups of nodes that enables computers to learn by example and recognize patterns in data. It continually corrects itself to get a closer approximation to content like speech or images. LaMDA’s language processing on the contrary is based on the “open domain” model, in which a single model doesn’t have to be re-trained for different conversations or subjects. Challenging both ChatGPT and Bard to create a Tic-Tac-Toe game by using ReactJS, Bard in comparison with ChatGPT didn’t cover requirements for a multiplayer, scores and a game level concept.

## AWS Code Whisper

AWS Code Whisper doesn’t have an AI chat user interface but the IDE extension. Similar to the Github Copilot it offers commands for inline autocomplete, test cases, docs doesn’t add info about input and output parameters. CodeWhisperer reference log shows accepted recommendations and the reference source to make sure of the code licenseship and the validity. Example of the code and test autocomplete with AWS Code Whisper:

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

// test cases for merge sort
mergeSort([1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
mergeSort([5, 4, 3, 2, 1]); // [1, 2, 3, 4, 5]
mergeSort([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
mergeSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

## Sourcegraph Cody AI

Sourcegraph IDE is similar to Tabnine. It has no support for JSdocs, missing descriptive inline comments and recognition of a problem from an input. In example of the factorial function it didn’t improve the function handling negative numbers or zeros. It suggests other improvements instead which might be useful in some other context: Use a for loop instead of recursion to avoid call stack limits on large inputs

```js
function factorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

Use Bigint to allow larger inputs:

```js
function factorial(n) {
  if (n === 1n) {
    return 1n;
  } else {
    return n * factorial(n - 1n);
  }
}
```

Use memoization to cache results and improve performance on repeated inputs:

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

Simplify the conditional logic:

```js
function factorial(n) {
  return n <= 1 ? 1 : n * factorial(n - 1);
}
```

Again asking Cody to make this function handle inputs less than 1 it gives a suggestion that handles zeros but not the negative numbers:

```js
function factorial(n) {
  if (num < 0) {
    return 1;
  } else  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
```

The test generation for this function supports Jest since it is a common JavaScript testing framework. In fact it generates the tests for the factorial code which would fail and catch the error:

```js
// Import Jest test framework
import { describe, expect, test } from ‘jest’;

// Import function to test
import { factorial } from ‘./helper/factorial.js’;

describe(‘factorial’, () => {
  test(‘returns 1 when n is 1’, () => {
    expect(factorial(1)).toBe(1);
  });
  test(‘returns n factorial for positive n’, () => {
    expect(factorial(5)).toBe(120);
  });
  test(‘returns 1 when n is 0’, () => {
    expect(factorial(0)).toBe(1);
  });
  test(‘throws error for negative n’, () => {
    expect(() => {
      factorial(-1);
    }).toThrow();
  });
});
```

Sourcegraph IDE doesn’t perform integration and analysis on the repository at the same level as a single file. It cannot navigate through the codebases recognizing the elements by natural language processing.

## CodiumAI

CodiumAI is the most promising AI tool in terms of unit testing and code quality.

### Testing

Codium AI has configurable settings on tests offering several options: Frameworks for test generation such as Jest, Mocha, Jasmine, RTL Behaviors for test cases (happy path, edge cases, other behaviors) Tests shares readable and detailed test description Each individual test case has an input prompt for questions/suggestions.

### Code Quality

The unit tests are extensively created for the different scenarios and context which isn’t covered- it should help developers find the errors in the codebase due to code quality or missing technical requirements. It also provides the documentation with Code Explanation- given inputs, flow and outputs, and example usage. Codium has Code Suggestions which explains the technical requirements, problem severity and the cause. From the factorial example above it gives us suggestions:

```markdown
### Suggestion
The code should check if num is a positive integer. If not, it should throw an error.
### Why
Adding input validation is important to ensure that the function receives valid input. In this case, checking if num is a positive integer will prevent the function from entering an infinite recursion if a non-positive integer or a non-integer value is passed as an argument.
```

It also allows to apply suggestion and edit code:

```js
// Base code …
// Suggested Code
function factorial(num) {
  if (typeof num !== ‘number’ || num <= 0 || !Number.isInteger(num)) {
    throw new Error(‘Input must be a positive number’);
  }
}
```

```markdown
### Suggestion
The code uses recursion to calculate the factorial. Instead, it should use a loop to avoid potential stack overflow errors.
### Why
The suggestion is important because using recursion to calculate the factorial can lead to potential stack overflow errors when the input number is large. Recursion consumes a lot of memory as each recursive call adds a new stack frame to the call stack. By using a loop, we can avoid these stack overflow errors and improve the performance of the code.

```

```js
// Base code …
// Suggested Code
function factorial(num) {
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  return result;
}
```

### Suggestion The code should check if num is larger than 170. If so, it should return Infinity because JavaScript cannot accurately represent numbers larger than 170!. ### Why This suggestion is important because JavaScript has a limit on the maximum number it can accurately represent. By checking if num is larger than 170 and returning Infinity, we ensure that the code handles large factorial calculations correctly and avoids potential inaccuracies or errors.

```js
// Base code …
// Suggested Code
function factorial(num) {
  if (num > 170) {
    return Infinity;
  }
}
```

```markdown
### Suggestion
The code should check if num is NaN. If so, it should throw an error.
### Why
Checking if num is NaN is important because it ensures that the function is not operating in invalid input. If num is NaN, the factorial calculation would not make sense and could lead to unexpected results. Throwing an error in this case helps to catch and handle invalid input early on.

```

After applying suggestion:

```js
function factorial(num) {
  if (typeof num !== ‘number’ || num <= 0 || !Number.isInteger(num)) {
    throw new Error(‘Input must be a positive number’);
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

Codeium’s generic base code model on unseen code leads to substantial, observable improvements in suggestion quality over other tools such as GitHub Copilot. Codeium focuses on code acceleration and provides code completion tools.

CodiumAI, which is a different company, focuses on code integrity and analyzes code to generate meaningful tests to detect bugs in the code early in development.

Codeium has trained models on 70+ programming languages and it supports extensions for all major IDEs, including Visual Studio Code, IntelliJ IDEA, and PyCharm. Factorial function example:

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

Other references from Codeium: Fine-tuning on Your Private Code [https://codeium.com/blog/what-github-copilot-lacks-finetuning-on-your-private-code](https://codeium.com/blog/what-github-copilot-lacks-finetuning-on-your-private-code) Personalizing AI Tools to Your Code [https://codeium.com/blog/finetuning-with-codeium-for-enterprises](https://codeium.com/blog/finetuning-with-codeium-for-enterprises) Context Aware Everything [https://codeium.com/blog/context-aware-everything-more-advanced-realtime-context-than-github-copilot](https://codeium.com/blog/context-aware-everything-more-advanced-realtime-context-than-github-copilot) CodiumAI vs Codeium [https://www.codium.ai/blog/codiumai-or-codeium-which-are-you-looking-for/](https://www.codium.ai/blog/codiumai-or-codeium-which-are-you-looking-for/)

CodiumAI and Codeium aren’t the twins, but the coincidence of sharing a similar name develops a trend of reaching out to companies for support, only to realize they were using another product. This paradox allows engineers leaning towards making decisions about personalized development tools and taking the advantage of the integration of both AI products.
