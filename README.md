# TypeScript Coroutines

This package provides a `coroutine` function that allows you to write asynchronous code in a synchronous manner, using TypeScript's Generator functions.

## Installation

You can install `typescript-coroutines` with npm:

```bash
npm install typescript-coroutines
```

## Usage
First, import the coroutine function from the typescript-coroutines package:

```typescript
import { coroutine } from 'typescript-coroutines';
```
Then, create a generator function where yield is used to pause and resume the execution:

```typescript
const result = coroutine(function* () {
  const response = yield fetch('https://api.example.com');
  const data = yield response.json();
  return data;
});
```
The coroutine function returns a promise that resolves with the value returned from the generator function.

## Error Handling
Errors can be handled inside the generator function with a try-catch block:

```typescript
coroutine(function* () {
    try {
        const result = yield new Promise((_, reject) => setTimeout(() => reject('Error'), 500));
        console.log(result);
    } catch (error) {
        console.error(error);  // 'Error'
    }
});
```
If an error is thrown and not caught inside the generator function, it will reject the promise returned by the coroutine function.