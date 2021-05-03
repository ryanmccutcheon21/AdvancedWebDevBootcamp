/*
Promise Basics:

Objectives:

- define a promise

- Add a .then callback to a promise

- Add a .catch callback to a promise

- Wrap a setTimeout call in a promise


What is a promise?

- A promise is an object that represents a task that will be completed in the future

- Analogy: Taking a number at a government office before you can get helped. The piece
of paper you get is like your promise. The help you get at the counter is like the
invocation of your callback.
*/

const { randomInt } = require("crypto");
const { readSync } = require("fs");



// Example 1

let p1 = new Promise(function (resolve, reject) {
    resolve([1, 2, 3, 4]);
});

p1.then(function (arr) {
    console.log('Promise p1 resolved with data:', arr);
});

/*
First we are using the promise constructor with the keyword Promise, which takes a
single callback function. That function has two parameters, either a resolve function
or a reject function. If the asynchronous task completes successfully, resolve will
be invoked. Then we define a callback in the .then function that is attached to our
variable we saved the promise to, p1. The .then callback when resolved is invoked
inside the promise.

This promise only handles the resolve function, it doesn't handle any errors, which 
will be taken care of in Example 2.
*/


// Example 2

let p1 = new Promise(function (resolve, reject) {
    reject('Error');
});

p1.then(function (data) {
    console.log('Promise p1 resolved with data:', data);
}).catch(function (data) {
    console.log('Promise p1 was rejected with data:', data);
});

/*
When the reject function is invoked, the callback goes directly to the .catch.
*/



// Example 3, with both resolve and reject with randomly occuring errors

let p1 = new Promise(function (resolve, reject) {
    let num = Math.random();
    if (num < 0.5) {
        resolve(num);
    } else {
        reject(num);
    }
});

p1.then(function (result) {
    console.log('Success:', result);
}).catch(function (error) {
    console.log('Error:', error);
});


// Example 4 with Asynchronous code. Wrap setTimeout with Promise 

let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        let randomInt = Math.floor(Math.random() * 10);
        resolve(randomInt);
    }, 4000);
});

promise.then(function (data) {
    console.log('Random int passed to resolve:', data);
});



// Promise Chaining

/*
Objectives:

- Describe the disadvantages of using nested callbacks

- Return a promise from a .then callback, this is known as promise chaining

- Use a promise to make asynchronous code seem sequential
*/


// Nested Async Callbacks - this example doesn't use promises 

let counter = 0;
setTimeout(function () {
    counter++;
    console.log('Counter:', counter);
    setTimeout(function () {
        counter++;
        console.log('Counter:', counter);
        setTimeout(function () {
            counter++;
            console.log('Counter:', counter);
        }, 3000);
    }, 2000);
}, 1000);

// This really messy, and hard to read

/*
Disadvantages of Nested Callbacks:

- The code is hard to read

- Logic is difficult to reason about

- The code is not modular, a lot of duplication of code but not a good way of
putting it into a separate function
*/




// Promise Chaining: Returning a Promise 

let promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        randomInt = Math.floor(Math.random() * 10);
        resolve(randomInt);
    }, 500);
});

promise.then(function (data) {
    console.log('Random int passed to resolve:', data);
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(Math.floor(Math.random() * 10));
        }, 3000);
    });
}).then(function (data) {
    console.log('Second random int passed to resolve:', data);
});


// Promise Chaining: Returning Data 

let promise = new Promise(function (resolve, reject) {
    resolve(5);
});

promise.then(function (data) {
    return data * 2;
}).then(function (data) {
    return data + 20;
}).then(function (data) {
    console.log(data);
});



// Refactoring the Nested Callbacks to be better

// Step: 1, Create a Function Declaration

let counter = 0;
function incCounter() {
    counter++;
    console.log('Counter:', counter);
}

// Step 2: Create a runLater Function

function runLater(callback, timeInMs) {
    let p = new Promise(function (resolve, reject) {
        setTimeout(function () {
            let res = callback();
            resolve(res);
        }, timeInMs);
    });
    return p;
}

// Step 3: Chain Promises 

runLater(incCounter, 1000).then(function () {
    return runLater(incCounter, 2000);
}).then(function () {
    return runLater(incCounter, 3000);
});