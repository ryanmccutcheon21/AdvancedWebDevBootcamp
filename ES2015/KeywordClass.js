/*
What is class?
    - a reserved keyword provided by ES2015
    - the class keyword creates a constant - can't be redeclared
    - the class keyword is an abstraction of constructor functions
    and prototypes. JavaScript doesn't have built in support for
    object oriented programming
    - the class keyword doesn't hoist
    - still use the new keyword to create objects





ES5 Object Oriented:
    function Student(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastNaem;
    }

    const ryan = new Student('Ryan', 'McCutcheon');

- create a constructor function
- use the new keyword to create objects





ES6 Object Oriented:
    class Student {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }
    }

    const ryan = new Student('Ryan', 'McCutcheon');

    - use the clas keyword instead of creating a function
    - inside, use a special method constructor which is run when
    new is used
    - use the new keyword to create objects



Instance Methods:
    - ES5 Instance Methods:
        function Student(firstName, lastName){
            this.firstName = firstName;
            this.lastName = lastName;
        }

        Student.prototype.sayHello = function() {
            return 'Hello' + this.firstNaem + ' ' + this.lastName;
        }

        - shared methods and properties are placed directly on
        the function's prototype

    - ES6 Instance Methods:
        class Student {
            constructor(firstName, lastName){
                this.firstName = firstName;
                this.lastName = lastName;
            }
            sayHello() {
                return `Hello ${this.firstName} ${this.lastName}`;
            }
        }

        - placed inside of class keyword
        - no 'function' keyword - similar to object shorthand notation
        - under the hood, it is placing methods on the prototype object



Class Methods:
        ES5 Class Methods:
            function Student(firstName, lastName){
                this.firstName = firstName;
                this.lastName = lastName;
            }

            Student.prototype.sayHello = function() {
                return 'Hello' + this.firstNaem + ' ' + this.lastName;
           }

           Student.isStudent = function() {
            return obj.constructor === Student;
           }

           - class methods are placed directly on the constructor function


        ES6 Class Methods:
           class Student {
            constructor(firstName, lastName) {
                this.firstName = firstName;
                this.lastName = lastName;
            }
            sayHello() {
                return `Hello ${this.firstName} ${this.lastName}`;
            }
            static isStudent(obj){
                return obj.constructor === Student;
            }
        }

        - class methods are created using the static keyword




Inheritance with ES6:
    - Before with ES5
        function Person(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        Person.prototype.sayHello(){
            return 'Hello' + this.firstName + ' ' + this.lastName;
        }

        function Student(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        Student.prototype = Object.create(Person.prototype);
        Student.prototype.constructor = Student;

        - set the prototype property of a constructor to be an object
        created from another prototype propoerty
        - reset the constructor property on a constructor function


    - Now, with ES6:
        class Person {
            constructor(firstName, lastName){
                this.firstName = firstName;
                this.lastName = lastName;
           }
           sayHello() {
                return `Hello ${this.firstName} ${this.lastName}`;
           }
        }

        class Student extends Person {

        }


    - Super keyword:
        with ES5:
             function Person(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        Person.prototype.sayHello(){
            return 'Hello' + this.firstName + ' ' + this.lastName;
        }

        function Student() {
            Person.apply(this, arguments);
        }

        - notice the duplication
        - use call or apply in a constructor function = apply is
        handy when there are many arguments


        with ES6:
        class Person {
            constructor(firstName, lastName) {
                this.firstName = firstName;
                this.lastName = lastName;
            }
            sayHello() {
                return `Hello ${this.firstName} ${this.lastName}`;
            }
        }

        class Student extends Person {
            constructor() {
                // you must use super here!
                super(...arguments);
            }
        }

        - super can only be used if a method by the same name is
        implemented in the parent class



Maps:
    - also called 'hash maps' in other languages
    - until ES6 = objects were replacements for maps
    - similar to objects, except the keys can be ANY data type!

    const firstMap = new Map;

    firstMap.set(1, 'Ryan');
    firstMap.set(false, 'a boolean');
    firstMap.set('nice', 'a string');
    firstMap.delete('nice'); // true
    firstMpa.size // 2

    - Extracting Values:

    firstMap.get(1); // 'Ryan'
    firstMap.get(false); // a boolean
    firstMap.get(arrayKey); // [1,2,3,4,5]
    firstMap.get(objectKey); // (a:1)

    - We can easily iterate over the map!

    firstMap.forEach(v => console.log(v));

    // Ryan
    // a boolean
    // [1,2,3,4,5]
    // {a:1}

    - Maps implement a Symbol.iterator which means we can use a
    for...of loop!

    firstMap.values(); // MapIterator of values
    firstMap.keys(); // MapIterator of keys


    - Why use maps?
        - finding the size is easy - no more loops or Object.keys()
        - the keys can be any data type
        - you can accidentally overwrite keys on the Object.prototype
        in an object you make - maps don't have that issue
        - iterating over keys and values in a map is quite easy as well

    - When to use a map
        - if you need to look up keys dynamically (they are not hard coded
            strings)
        - if you need keys that are not strings
        - if you are frequently adding and removing key/value pairs
        - are key-value pairs frequently added or removed?
        - if you are operating on multiple keys at a time

    - WeakMap
        - similar to a map, but all keys MUST be objects
        - values in a WeakMap can be cleared from memory if there is no
        reference to them
        - more performant than maps, but can't be iterated over




- Sets
    - All values in a set are unique
    - any type of value can exist in a set
    - created using the new keyword
    - exist in quite a few other languages, ES6 finally brings them
    to JavaScript

    - Syntax
        - const s = new Set;

        // can also be created from an array
        const s2 = new Set([3,1,4,1,2,1,5]); // [3,1,4,2,5]

        s.add(10); // (10)
        s.add(20); // (20, 10)
        s.add(10); // (20, 10)

        s.size; // 2
        s.has(10); // true
        s.delete(20); // true
        s.size; // 1

        s2[Symbol.iterator]; // function() {}...
        // we can use a for...of loop!

        - WeakSet
            - similar to a set, but all values MUST be objects
            - values in a WeakSet can be cleared from memory if there is
            no reference to them
            - more performant than sets, but can't be iteratied over



    - Promsies:
        - What are they?
            - a one time guaranteed return of some future value
            - when that value is figured out - the promise is resolved/fulfilled
            or rejected
            - friendly way to refactor callback code
            - libraries have implemented Promises for a while

        - Story example:
            - you're hungry = so you go to McDonald's
            - you place your order and get a ticket (a promise)
            - after some time, you either get your food and the promise
            is resolved or you don't get your food and the promise is rejected
            - if you want another order, you need a new Promise!


        - We can now create our own promises with ES6
            - created using the new keyword
            - every promise constructor accepts a callback function which
            contains two parameters, resolve and reject
            - you can call these parameters whatever you like, resolve and
            reject are most common
            - these parameters are both function to be run if the promise is
            resolved or rejecteds

            - A simple example:
                function displayAtRandomTime() {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if(Math.random() > .5) {
                                resolve('Yes');
                            } else {
                                reject('No');
                            }
                        }, 1000);
                    });
                }

                - the returned value from a promise will always contain a .then
                and .catch method which are function to be executed when the promise
                is resolved or rejected

                displayAtRandomTime().then(val => {
                    console.log(val);
                })
                .catch(err => {
                    console.log(err);
                })

            - since a promise always returns something that has a .then (thenable) -
            we can chain promises together and return values from one promies to another!

            let years = [];
            $.getJSON('url')
            .then(movie => {
                years.push(movie.Year);
                return $.getJSON('ur');
            })
            .then(movie => {
                years.push(move.Year);
                console.log(years);
            })



    - Promise.all
        - accepts an array of promises and resolves all of them or rejects
        once a single one of the promises has been first rejected (fail fast)
        - if all of the passed-in promises fulfill, Promise.all is fulfilled
        with an array of the values from the passed-in promises, in the
        same order as the promises passed in
        - may have seen something like this in $.when in jQuery or Q
        - the promises don't resolve sequentially, but Promise.all waits
        for them

        function getMovie(title) {
            return $.getJSON('https://omdbapi.com/q=${title)&apikey=thewdb');
        }

        const titanicPromise = getMovie('titanic');
        const shrekPromise = getMovie('shrek');
        const braveheartPromise = getMovie('braveheart');

        - instead of using .then and another .then and another, we can use
        Promise.all to see if all the promises are resolved

        Promise.all([titanicPromise, shrekPromise, braveheartPromise]).then(movies => {
            return movies.forEach(val => {
                console.log(val.Year);
            });
        };

        // 1997
        // 2001
        // 1995





- Generators:
    - a special kind of function which can pause execution and resume at
    any time
    - created using a *
    - when invoked, a generator object is returned to us with the
    keys of value and done
    - value is what is returned from the paused function using the yield
    keyword
    - done is a boolean which returns true when the function has completed


    - Our first generator:
        function* pauseAndReturnValues(num) {
            for(let i = 0; i < num; i++) {
                yield i;
            }
        }

        const gen = pauseAndReturnValue(5);

        gen.next(); // {value: 0, done: false}
        gen.next(); // {value: 1, done: false}
        gen.next(); // {value: 2, done: false}
        gen.next(); // {value: 3, done: false}
        gen.next(); // {value: 4, done: false}
        gen.next(); // {value: undefined, done: true}


    - Yield multiple values:
        function* printValue() {
            yield 'First';
            yield 'Second';
            yield 'Third';
        }

        const g = printValues();
        g.next().value; // 'First'
        g.next().value; // 'Second'
        g.next().value; // 'Third'

        - we can plave multiple yield keywords inside of a generator function
        to pause multiple times

    - Iterating over a generator:
        function* pauseAndReturnValue(num) {
            for(let i = 0; i < num; i++) {
                yield i;
            }
        }

        for(val of pauseAndReturnValue(3)) {
            console.log(val);
        }

        // 0
        // 1
        // 2


    - Async Generators
        - we can use generators to pause asynchronous code!

        function* getMovieData(movieName) {
            console.log('starting')
            yield $.getJSON(`https://ombdapi.com?t=${movieName}&apikey=thewdb`);
            console.log('ending')
        }

        - the next value returned is a promise so let's resolve it!

        const movieGetter = getMovieData('titanic');
        movieGetter.next().value.then(val => console.log(val));



    - Object.assign:
        - create copies of objects without the same reference!

        // ES5

        const o = {name: 'Ryan'};
        const o2 = o;

        o2.name = 'Kayla';
        o.name; // 'Kayla'

        - fixing up with Object.assign(notice the first parameter)

        // ES6

        const o = {name: 'Ryan'};
        const o2 = Object.assign({}, o);

        o2.name = 'Kayla';
        o.name; // 'Ryan'

    - Object.assign doesn't create a deep clone

        // ES6

        const o = {instructors: ['Ryan', 'Kayla']};
        const o2 = Object.assign({}, o);

        o2.instructors.push('Colt');

        o.instructors; // ['Elie', 'Tim', 'Colt'];

        - if we have objects inside of the object we are copying - those
        still have a reference!





- Array.from
    - convert other data types into arrays

    // ES6

    const divs = document.getElementByTagName('div'); // returns an array-like object

    divs.reduce // undefined, since it is not an actual array

    - how this was done with ES5 - using call

    const converted = [].slice.call(divs) // convert the array-like object
    into an array

    converted.reduce // function reduce() {...}




- Using Array.from
    - convert array-like objects into arrays

    // ES6
    const divs = document.getElementByTagName('div');
    const converted = Array.from(divs);

    - convert different types of objects into arrays

    const firstSet = new Set([1,2,3,4,3,2,1]); // {1,2,3,4}

    const arrayFromSet = Array.from(firstSet); // [1,2,3,4]




- Additional helpful ES6 Methods:
    - find:
        - invoked on arrays
        - accepts a callback with value, index and array (just like
            forEach, map, filter, etc.)
        - returns the value found or undefined if not found

    const instructors = [{name: 'Ryan'}, {name: 'Kayla'}, {name: 'Raiden'}, {name: 'Nolan'}];

    instructors.find(val => {
        return val.name === 'Raiden';
    }); // {name: 'Raiden'}


    - findIndex
        - similar to find, but returns an index or -1 if the value is not found

    const instructors = [{name: 'Ryan'}, {name: 'Kayla'}, {name: 'Raiden'}, {name: 'Nolan'}];

    instructors.findIndex(val => {
        return val.name === 'Raiden';
    }); // 2




    - includes:
        - returns a boolean if a value is in a string - easier than using
        indexOf

        From:

        // ES5
        'awesome'.indexOf('some') > -1 //true

        To:

        // ES6
        'awesome'.includes('some'); // true



    - Number.isFinite
        - a handy way for handling Nan being a typeof number

        From:
        // ES5
        function seeIfNumber(val) {
            if(typeof val === 'number' && !isNan(val)) {
                returns 'It is a number!';
            }
        }

        To:
        // ES6
        function seeIfNumber(val) {
            if(Number.isFinite(val)) {
                return 'It is a number!';
            }
        }
*/