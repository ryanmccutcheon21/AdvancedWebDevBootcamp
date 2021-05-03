/* Objectives:

- Describe what the stack is 

- Describe a stack frame

- Describe the heap



What is the stack?

- an ordered data structure

- Keeps track of function invocations

- part of the JS runtime(you don't access it directly)

- an ordered set of stack frames

- most recently invoked function is on the top of the stack

- the bottom of the stack is the first function invoked

- the stack is processed from top to bottom


How your code changes the stack:

- whenever you invoke a function, the details of the invocation are saved 
to the top of the stack (puched to the top)

- whenever a function returns, the information about the invocation is 
taken off the top of the stack (popped off of the top)



Heap Definition:

- an area in memory where the data is stored

*/


// Example 1 (stack)

function multiply(x, y) {
    return x * y;
}

let res = multiply(3, 5);


// Example 1 


// the object is created in the heap. onj is a reference to the object 
let obj = {
    firstName: 'Tim',
    lastName: 'Garcia'
};


// New data is not created, only a copy of the reference 
let referenceCopy = obj;




// Stack Example 

function upperCaseFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function upperCaseWords(sentence) {
    var words = sentence.split(" ");            // function: upperCaseWords, function: split
    for (var i = 0; i < words.length; i++) {
        words[i] = upperCaseFirstLetter(words[i]);
    }
    return words.join(" ");
}

upperCaseWords("lowercase words"); // function: main

// upperCaseWords is called and added to the stack, it goes up and runs the upperCaseWords 
// function and adds it to the stack on top of the invocation of it. .split is also then 
// called and added to the top of the stack. Once it runs, it is taken of the stack,
// then the upperCaseWords function has ran and is also taken off the stack('popped' off)