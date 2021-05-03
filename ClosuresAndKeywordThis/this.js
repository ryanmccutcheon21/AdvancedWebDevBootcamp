/*

Intro to Closures:
    - a closure is a function that makes use of variables
    defined in outer function that have previously returned
    - What does that mean? Sometimes an example is worth
    1000 words
    - open console in Chrome Dev Tools
    - in the console:
        function outer(){
            let start = 'Closures are';
            return function inner(){
                return `${start} awesome`;
            }
        }

        - then invoke the outer funciton
        - you will see the definition of the inner function
            outer()

        - then invoke the inner function like this
        outer(){}
        // 'Closures are awesome'

    - Our first Closure:
        function outer(a){
            return function inner(b){
                // the inner function is making use of the variable 'a'
                // which was defined in an outer function called 'outer'
                // and by the time inner is called, that outer function has returned
                // this function called 'inner' is a closure!
                return a + b;
            }

            outer(5)(5);
            // 10

            let storeOuter = outer(5);
            storeOuter(10);
            // 15
        }

    - we have to return the inner function for this to work
    - we can either call the inner function right away by using an extra
    () or we can store the result of the function in a variable
    - we do NOT have to give the inner function a name = we can make
    it anonymous (we just called it 'inner' for learning purposes)

    - Is this a closure?
        function outer(){
            let data = 'something from outer';
            return function inner(){
                return 'Just returned from the inner function';
            }
        }

        // no it is not a closure

    - Is this a closure?
        function outer(){
            let data = 'something from outer';
            return function inner(){
                let innerData = 'something from inner';
                return `${data} ${innerData}`;
            }
        }

        // yes it is a closure

    - Why is the first not a closure and the second is?
        - Because a closure only exists when an inner function
        makes use of variables defined from an outer function
        that has returned. If the inner function does not make
        use of any of the external variables all we have is a
        nested function.

    - How Closures  Work
        - Only variables used in the inner function are remembered!
            function outerFn(){
                let data = 'something from outerFn';
                let fact = 'remember me';
                return function innerFn(){
                    // if you keep the chrome dev tools open
                    // this will pause our code and place us
                    // in the  sources tab where we can examine variables
                    debugger
                    return fact;
                }
            }

            let outer = outerFn();
            outer();

            - if you type this in the console, run outer(){} to invoke
            the inner function like he does in the video
            - we will only have access to the fact variable from outer
            because that is what is returned in the inner function
            - trying to access data will throw an error

    - Closures in the Wild:
        - When would you use closure?
            - To make private variables
                - in other languages, there exists support for variables
                that can not be modified externally. We call those private
                variables, but in JavaScript we don't have that built in.

                - try this in the console

                function counter(){
                    let count = 0;
                    return function inner(){
                        count++;
                        return count;
                    }
                }

                let counter1 = counter();
                counter1;
                // returns the function
                counter1();
                // 1
                counter1();
                //2

                let counter2 = counter();
                counter2();
                //1

                - counter2 starts at 1 just like counter1 and not where
                counter1 left off because they are both each their own
                private variable

            - More Privacy Examples
                function classRoom(){
                    let instructors = ['Elie', 'Colt'];
                    return {
                    getInstructors: function(){
                        return instructors;
                    },
                    addInstructor: function(){
                        instructors.push(instructor);
                            return instructors.slice();
                        }
                    }
                }

                // .slice() makes the instructors variable truly private
                // beacuse without it, a person could just do course1.instructors.pop()
                // of .push() to add and delete instructors

                let course1 = classRoom();
                course1.getInstructors();
                // ['Elie', 'Colt']
                course1.addInstructor('Ryan');
                // ['Elie', 'Colt', 'Ryan']



Intro to the keyword 'this':
    - 'this' is a reserved keyword in JavaScript
    - therefore, we can't set it as the value of a variable
    - usually determined by how a function is called (what we
        call 'execution content)
    - in JS, every time a function is run, two special keywords
    are given to that function. Arguments, and This
    - can be determined using four rules(global, object/implicit,
        explicit, new)
        1. Global Context
            - when 'this' is not inside of a declared object
                console.log(this);
                // window
            - every variable you declare in the global scope, is attached
            to the window object
                let instructor = 'Ryan';
                window.instructor
                // 'Ryan'
                window.instructor === instructor
                // true
    - 'this' with Function and 'use strict'
        - let data = {};
        data
        // Object {}
        data.instructor = 'Ryan';
        data
        // Object {instructor: 'Ryan'}

        - this value of this is still the window object inside
            of a function

            function whatIsThis(){
            return this;
        }
        whatIsThis();
        // window

        - when 'this' is not inside of a declared object, the value
        is always attached to the window object

            function variablesInThis(){
                this.person = 'Ryan'
            }

            variablesInThis();
            // the keyword 'this' inside the funciton is the window

            console.log(person);
            // Ryan

            - we are attaching person onto the global object because this
            is attached to window in the function
            - since the keyword 'this' is attached to the global object window
            through the keyword this, we have access to it globally
            - this is actually bad practice

        - Strict Mode (introduced in ES5)
            'use strict'

            console.log(this);
            // window

            function whatIsThis(){
                return this;
            }

            whatIsThis();
            // undefined

            - in strict mode, the value of 'this' inside of a function is undefind
            - ES5 introduced this to try and help write better code and eliminate bad practice

            'use strict'

            function variablesInThis(){
                // since we are in strict mode this is undefined
                // so what happens if we add a property on undefined?
                // let's see what happens when we call the function..
                this.person = 'Ryan';
            }

            variablesInThis();
            // TypeError, can't set person on undefined

    - Object/Implicit Binding:
        - When the keyword 'this' IS inside of a declared object:
            // strict mode does NOT make a difference here
            let person = {
                firstName: 'Elie',
                sayHi: function(){
                    return "Hi" + this.firstName;
                },
                determineContext: function(){
                    return this === person;
                }
            }

            person.sayHi();
            // 'Hi Elie'

            person.determineContext();
            // true

            - look at the closest parent object to see what the keyword this refers to
            
        - What does 'this' refer to here?
            let person = {
                firstName: 'Elie',
                determineContext: this;
            }

            person.determineContext;
            // window

            - a keyword 'this' is defined when a function is run! There is not a 
            function being run here to create a new value of the keyword 'this'
            so the value of 'this' is still the window!
            - the value of the keyword this will always be the closest parent object

        - What happens when we have a nested object?
            let person = {
                firstName: 'Colt',
                sayHi: function() {
                    return 'Hi' + this.firstName;
                },
                determineContext: function() {
                    return this === person;
                },
                dog: {
                    sayHello: function() {
                        return 'Hello' + this.firstName;
                    },
                    determineContext: function() {
                        return this === person;
                    }
                }
            }

            person.sayHi();
            // 'Hi Colt'

            person.detemineContext();
            // true

            // but what is the value of the keyword this right now?

            person.dog.sayHello();
            // 'Hello udnefined'

            person.dog.determineContext();
            // false

            - since the closest parent of the sayHello function is the dog object, 
            the keyword this does not refer to anything so it is undefined
            - we can set the value of 'this' with explicit binding, which is covered next

- Explicit Binding:
    - choose what we want the context of 'this' to be using call, apply or bind
    - these three methods can only be invoked on functions
    
    - Call:
            - the first argument to this method is what you want the value of 'this' to be 
            - the arguments after are any parameters you want to pass to the function you 
            are changing the value of 'this' in
            - when the call method is used on a funciton, that function is immediately invoked

            - Let's fix the previous section issue returning undefined with Call

            let person = {
                firstName: 'Colt',
                sayHi: function() {
                    return 'Hi' + this.firstName;
                },
                determineContext: function() {
                    return this === person;
                },
                dog: {
                    sayHello: function() {
                        return 'Hello' + this.firstName;
                    },
                    determineContext: function() {
                        return this === person;
                    }
                }
            }

            person.dog.sayHello.call(person);
            // 'Hello Colt'

            person.dog.determineContext.call(person); 
            // true

            // Using call worked
            // Notice that we do NOT invoke sayHello or determineContext, we just 
            // attach call onto it, that's why there are no parentheses

        - call is commonly used to avoid code duplication, like this example:
            let colt = {
                firstName: 'Colt',
                sayHi: function() {
                    return 'Hi' + this.firstName;
                }
            }

            let elie = {
                firstName: 'Elie',
                // Look at all this duplication
                sayHi: function() {
                    return 'Hi' + this.firstName;
                }
            }

            colt.sayHi();
            // Hi Colt

            elie.sayHi();
            // Hi Elie (but we had to copy and paste the function from above...)

        - now let's use call to make this more efficient:
            let colt = {
                firstName: 'Colt',
                sayHi: function() {
                    return 'Hi' + this.firstName;
                }
            }

            let elie = {
                firstName: 'Elie'
            }

            colt.sayHi();
            // Hi Colt

            colt.sayHi.call(elie);
            // Hi Elie

        - now let's make a sayHi function that anyone can use:
            function sayHi() {
                return 'Hi' + this.firstName;
            }

            const colt = {
                firstName: 'Colt'
            }

            const elie = {
                firstName: 'Elie'
            }

            sayHi.call(colt);
            // Hi Colt

            sayHi.call(elie);
            // Hi Elie

    - Another use case for call
        - Imagine we want to select all the divs on a page
            const divs = document.querySelectorAll('div');

            - How can we find all the divs that have the text 'Hello'? Using filter
            would be nice!
            divs.filter
            // undefined because the divs variable is NOT an array

            - The divs variable is an array-like object though
            - So how can we convert an array-like object into an array?
            - Very similar to the way we make copies of arrays - using slice!
            - Let's use the slice method on arrays, but instead of the target of slice
            (the keyword this) being that array, let's set the target of the keyword 
            'this' to be our divs array-like-object
            
            let divsArray = [].slice.call(divs);
            // you might also see this as Array.prototype.slice.call(divs)
            // they do the same thing

            divsArray.filter(val => {
                return val.innerText === 'Hello';
            });

            - What we are doing is trying to slice something that is not actually an
            array! In JavaScript, slice will not work on all data types, but it works
            very well on array-like-objects

    - Apply
            - will only take in two parameters at most
            - first is what we want value of 'this' to be
            - the second parameter is an array of arguments we want to pass to the 
            function in which we are changing the value of this
            - it is also immediately invoked

        - What about apply?
            function sayHi() {
                return 'Hi' + this.firstName;
            }

            const colt = {
                firstName: 'Colt'
            }

            const elie = {
                firstName: 'Elie'
            }

            sayHi.call(colt);
            // Hi Colt

            sayHi.apply(elie);
            // Hi Elie

            // well this seems the same

            - remember, the only difference between apply and call is when we have 
            arguments to the function we are using call or apply on
            
            - What happens if we start adding parameters?
            function addNumbers(a,b,c,d){
                return this.firstName + ' just calculated' + (a+b+c+d);
            }

            const colt = {
                firstName: 'Colt'
            }

            const elie = {
                firstName: 'Elie'
            }

            addNumbers.call(elie, 1, 2, 3, 4)
            // Elie just calculated 10
            
            addNumbers.apply(elie, [1, 2, 3, 4])
            // Elie just calculated 10

            // See the difference? In apply we pass in the second parameter as an array
            // In call, it can take in any amount of parameters so they're just separated 
            // by commas

        - When would apply be valuable?
            - When a function does not accept an array, apply will spread out
            values in an array for us!

            let nums = [5, 7, 1, 4, 2];

            Math.max(nums);
            // Nan

            Math.max.apply(this, nums);
            // 7 


            function sumValues(a,b,c) {
                return a+b+c;
            }

            let values = [4,1,2];

            sumValues(values);
            // '4,1,2undefinedundefined

            sumValues.apply(this, [4,1,2]);
            // 7

    - Bind
            - not immediately invoked
            - The parameters work like call, but bind returns a function with
            the context of 'this' bound already!

            function addNumbers() {
                return this.firstName + ' just calculated' + (a+b+c+d);
            }

            const elie = {
                firstName: 'Elie'
            }

            let elieCalc = addNumbers.bind(elie, 1, 2, 3, 4);
            // function()}{}...

            elieCalc();
            // Elie just calculated 10

            - when is bind usefual?
                - One common usecase is when we do not know all of the arguments
                that wil lbe passed to a function
                - which means we do not want to invoke the function right away
                - we just want to return a new function with some of the parameters, 
                this is called partial application

                // with bind we do NOT need to know all the arguments up front
                let elieCalc = addNumbers.bind(elie, 1, 2);
                // function(){}...
                elieCalc(3,4);
                // Elie just calculated 10

            - Bind in the wild
                - very commonly we lose the context of 'this', but in functions that
                we do not want to execute right away!

                const colt = {
                    firstName: 'Colt',
                    sayHi: () => {
                        setTimeout(() => {
                            console.log('Hi' + this.firstName);
                        }, 1000);
                    }
                }

                // setTimeout is on the window object, so this refers to the window onject

                colt.sayHi();
                // Hi undefined (1000 milliseconds later)

                - Let's fix this with bind, by using bind to set the correct context of 'this'

                 const colt = {
                    firstName: 'Colt',
                    sayHi: () => {
                        setTimeout(() => {
                            console.log('Hi' + this.firstName);
                        }.bind(this), 1000);
                    }
                }

                // can use colt inside the bind method, but if we change the value of firstName
                // our entire function would break, so it's better to use this 

    - The 'new' keyword
        - We can set the context of the keyword 'this' using the 'new' keyword -
        it does quite a bit more as well which we will discuss further when we talk
        about OOP

        function Person(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        const elie = new Person('Elie', 'Schoppik');

        elie.firstName;
        // 'Elie'

        elie.lastName;
        // 'Schoppik'

        - the 'new' keyword creates a new object
        - it is used with a function
        - an implicit return this is added to the function which uses it
            




*/