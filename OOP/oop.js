/*

- Intro to Object Oriented Programming:
    - What is it?
        - a programming model based around the idea of objects
        - these objects are constructed from what are called 'classes', which
        we can think of like a blueprint. We call these objects created from classes
        'instances'
        - we strive to make our classes abstract and modular
    - OOP in JavaScript
        - JavaSCript does not have 'classe' built into it- so what do we do?
            - we use functions and objects!
    - Why this is useful
        - Imagine we want to make a few house objects, they will all have
        bedrooms, bathrooms, and numSqft

        const house = {
            bedrooms: 2,
            bathrooms: 2,
            sqFeet: 1000
        }

        const house2 = {
            bedrooms: 2,
            bathrooms: 2,
            sqFeet: 1000
        }

        const house3 = {
            bedrooms: 2,
            bathrooms: 2,
            sqFeet: 1000
        }

        - imageine if we had to make 100 of these with all of that duplication
        - let's solve this by making a blueprint of what a house should look like
        - instead of making an infinite number of different objects, let's see
        if we can create a function to construct these similar 'house' objects
        - in JavaScript, these are called constructor funciton
    - Constructor Functions:
        function House(bedrooms, bathrooms, numSqft) {
            this.bedrooms = bedrooms;
            this.bathrooms = bathrooms;
            this.numSqft = numSqft;
        }

        - notice the function name is capitalized
        - this isn't necessary, but is best practice and lets other developers
        know that this is a constructor function
        - we are attaching properties onto the keyword 'this'. We would like the 
        keyword 'this' to refer to the object we will create from our constructore
        function, how might we do that?
    - Creating an object
        - How do we use our constructor to create an object?
        function House(bedrooms, bathrooms, numSqft) {
            this.bedrooms = bedrooms;
            this.bathrooms = bathrooms;
            this.numSqft = numSqft;
        }
        const firstHouse = House(2, 2, 1000);
        // Does this work?
        firstHouse;
        // undefined... guess not!

        - Why is this not working?
            - we are not returning anything from the function so our House function
            returns undefined
            - we are not explicitly binding the keyword 'this' or placing it
            inside a declared object. This means the value of the keyword 'this'
            will be the global object, which is not what we want.
    
    
    - The 'new' keyword
        - solution to the last problemt
        function House(bedrooms, bathrooms, numSqft) {
            this.bedrooms = bedrooms;
            this.bathrooms = bathrooms;
            this.numSqft = numSqft;
        }

        const firstHouse = new House(2, 2, 1000);

        firstHouse.bedrooms;
        // 2
        firstHouse.bathrooms;
        // 2
        firstHouse.numSqft;
        // 1000

        - So what does the 'new' keyword do? A lot more than we might think...
            - It first creates an empty object
            - it then sets the keyword 'this' to be that empty object
            - it adds the line 'return this' to the end of the function, which 
            follows it
            - it adds a property onto the empty object called '__proto__', which
            links the prototype property on the constructor function to the empty 
            object

        - Create a dog object that has a name and age and has a method called bark
        function Dog(name, age) {
            this.name = name
            this.age = age
            this.bark = () => {
                console.log(`${this.name} just barked!`)
            }
        }

            const bentley = new Dog('Bentley', 11)

            console.log(bentley.name)
            // 'Bentley'
            console.log(bentley.age)
            // 11
            bentley.bark()
            'Bentley jsut barked!'

    - Refactoring with multiple constructors
        - Let's create two constructor functions, one for a Car and one for
        a Motorcycle - here is what it might look like

        function Car(make, model, year) {
            this.make = make;
            this.model = model;
            this.year = year;
            // We can also set properties on the keyword 'this'
            // that are preset values
            this.numWheels = 4;
        }

        function Motorcycle(make, model, year) {
            this.make = make;
            this.model = model;
            this.year = year;
            this.numWheels = 2;
        }

        - What's not great about this code?
            - look at all of the duplication
            - Is there any way to 'borrow' the Car function and invoke it inside
            the Motorcycle function?
            - Yes, by using call/apply
            - We can refactor our code quite a bit using call + apply

            function Car(make, model, year) {
                this.make = make;
                this.model = model;
                this.year = year;
                this.numWheels = 4;
            }

                // using call

            function Motorcycle(make, model, year) {
                Car.call(this, make, model, year);
                this.numWheels = 2;
            }

            // Using apply

            function Motorcycle(make, model, year) {
                // using apply
                Car.apply(this, [make, model, year]);
                this.numWheels = 2;
            }

            // Or

            function Motorcycle(make, model, year) {
                // using apply
                Car.apply(this, arguments);
                this.numWheels = 2;
            }

        - to see how arguments works, go to the console and type
        function listArguments() {
            return arguments;
        }
        // undefined

        listArguments(1, 2, 3);
        // We get back and array [1, 2, 3]
        - so since apply expects an array for the second parameter, we can use 
        arguments in our function above as the second parameter


    - Intro to Prototypes:
        - Example:
            - go to console and type
            function Person() {
                this.name = name;
            }
            // undefined

            - since we've created a constructor function, we can see that there 
            is a property created on it automatically called prototype
            - in JS, every function has this property

            - now type
            Person.prototype
            // Object {constructor: function}

            - now let's create two objects
            // these are objects created from the Person constructor
            const ryan = new Person('Ryan');
            const kayla = new Person('Kayla');

            - since we used the 'new' keyword, a property has been added to these
            objects __proto__ ('dunder proto' in speech)

            - type this in console
            ryan.__proto__ === Person.prototype
            // true, because it points to the prototype property on the Person
            // constructor

            - the prototype object has a property on it called constructor, which
            points back to the original function
            - type
            Person.prototype.constructor === Person
            // true

            - constructor property is an important part of inheritance, which we'll
            discuss later

    - The Prototype Chain:
        - Why is this useful?
            - the prototype object can have methods and properties placed on it,
            they shared and accessable by any object that is created from the 
            constructor function when the 'new' keyword is used
        
        // this is the constructor function
        function Person(name) {
            this.name = name;
        }

        // this is an object created from the Person constructor
        const ryan = new Person('Ryan');
        const kayla = new Person('Kayla');

        Person.prototype.isInstructor = true;

        ryan.isInstructor;
        // true
        kayla.isInstructor;
        // true

        // How were we able to access properties on the prototype?
        // __proto__ !

    - How does JavaScript find methods and properties?
        - try this in the console
        let arr = []
        // undefined
        let arr = new Array
        // undefined

        arr.push
        // function push() { [native code] }

        - let arr = [] is shorthand for let arr = new Array
        - Array is a built in constructor in JavaScript, and by setting our variable 
        arr to it, we created a new object from it
        - how does JavaScript know where to find the .push method? It is in
        the __proto__ method
        
        - now type this
        console.dir(arr)
        // Array(0)
            // length: 0
            // __proto__ : Array(0)
        - inspect the __proto__ method, there you can find the push method and other 
        methods built in to the JavaScript Array constructor

        arr.__proto__ === Array.prototype
        // true

    - in JavaScript, every object has a method called hasOwnProperty, which accepts
    a parameter and returns true if the object has that property

    arr.hasOwnProperty('length')
    // true
    arr.hasOwnProperty('foo')
    // false 

    
    - Adding Method to the Prototype
        - Now that we know that objects created by the same constructor have a shared
        prototype, let's refactor some code:

        function Person(name) {
            this.name = name;
            this.sayHit = function() {
                return `Hi ${this.name}`;
            }
        }

        ryan = new Person('Ryan')
        ryan.sayHi();
        // Hi Ryan

        - The code works, but it is inefficient.
        - Every time we make an object using the new keyword we have to redefine
        the sayHi function!
        - if we made 1000 objects, we would have to redefine the sayHi function 1000 times
        - it would be more efficient if there was a place where we could define the sayHi
        function once and have it shared amongst all objects created from the Person
        constructor when the 'new' keyword is used
        - we know what that property is, it's the prototype property
        - let's refactor the last function by putting sayHi on the prototype instead!

        function Person(name) {
            this.name = name;
        }

        Person.prototype.sayHi = function() {
            return `Hi ${this.name}`;
        }

        ryan = new Person('Ryan');
        ryan.sayHi();
        // Hi Ryan

    - Challenge:
        - Create a constructor function for a Vehicle; every object created from this
        constructor should have a make, model, and year property. Each object should 
        also have a property called isRunning, which should be set to false
        - Every object created from the Vehicle constructor should have a function called
        turnOn, which changes the isRunning property to true
        - Every object created from the Vehicle constructor should have a function called 
        turnOff, which changes the isRunning property to false
        - Every object created from the Vehicle constructor should have a method called
        honk, which returns the string 'beep' ONLY if the isRunning property is true

        function Vehicle(make, model, year) {
            this.make = make;
            this.model = model;
            this.year = year;
            this.isRunning = false;
        }

        Vehicle.prototype.turnOn = function() {
            this.isRunning = true;
        }

        Vehicle.prototype.turnOff = function() {
            this.isRunning = false;
        }

        Vehicle.prototype.honk = function() {
            if(this.isRunning) {
                return 'beep!';
            }
        }
    
    
        - Prototypal Inheritance:
            - What is it?
                - The passing of methods and properties from one class to another
                - in JavaScript inheritance, we don't actually pass one constructor to
                another, we pass the prototype property from one constructor to the other

                - Why?

                function Person(firstName, lastName) {
                    this.firstName = firstName;
                    this.lastName = lastName;
                }

                Person.prototype.sayHi = function() {
                    return `Hello ${this.firstName} ${this.lastName}`;
                }

                function Student(firstName, lastName) {
                    return Person.apply(this, arguments);
                }

                Student.prototype.sayHi = function() {
                    return `Hello ${this.firstName} ${this.lastName}`;
                }

                - do we really need to redifine sayHi on the Student.prototype? That
                seems repetitive...
                - How?

                 function Person(firstName, lastName) {
                    this.firstName = firstName;
                    this.lastName = lastName;
                }

                Person.prototype.sayHi = function() {
                    return `Hello ${this.firstName} ${this.lastName}`;
                }

                function Student(firstName, lastName) {
                    return Person.apply(this, arguments);
                }

                Student.prototype = Person.prototype;

                - assign the prototype property of one object to be another's!

                const ryan = new Student('Ryan', 'McCutcheon');
                ryan.sayHi();
                // 'Hello Ryan McCutcheon'

                - it works!
                - Not exactly...

                - let's add something onto the Student.prototype object
                - if we implimented this correctly, our Person objects should not
                be able to be modified from the Student constructor function
                - let's now add something onto the Student prototype object

                Student.prototype.status = function() {
                    return 'I am currently a student!';
                }

                - now let's create a new object from the Person constructor

                const ryan = new Person('Ryan', 'McCutcheon');
                ryan.status();
                // 'I am currently a student!'

                - The person prototype should not have properties from the Student.prototype
                - Student inherits from Person, not the other way around...
                - see this work in the console 
                let obj = {name: 'Ryan'}
                // undefined
                let obj2 = o
                // undefined
                obj2.name = 'Kayla'
                // 'Kayla'
                obj.name
                // 'Kayla

            - The problem
                - We can't assign one object to another - it will just create a reference
                - this means if we change the Student.prototype, it will affect the 
                Parent.prototype!
                - We still want all of the methods and properties from the Parent.prototype,
                but we want two totally separate objects = not a reference!

                - the solution/ better alternative is Object.create
                - Object.create creates a brand new object and accaepts as its first parameter,
                what the __proto__ object should be for the newly created object

                - Object.create in action
                function Student(firstName, lastName) {
                    return Person.apply(this, arguments);
                }

                Student.prototype = Object.create(Person.prototype);

                Student.prototype.status = function () {
                    return 'I am currently a student!'
                }

                const ryan = new Person('Ryan', 'McCutcheon');
                ryan.status;
                // undefined

                - the Student.prototype doens't affect the Person one now

                - Why not 'new'?
                function Student(firstName, lastName) {
                    return Person.apply(this, arguments);
                }

                Student.prototype = new Person;

                - this will do almost the same thing, but add additional unnecessary properties
                on the prototype object (since it is creating an object with undefined properties
                just for the prototype)
                - so use Object.create when dealing with inheritance

                - One missing piece
                 function Student(firstName, lastName) {
                    return Person.apply(this, arguments);
                }

                Student.prototype.sayHi = function() {
                    return `Hello ${this.firstName} ${this.lastName}`
                }

                Student.prototype = Object.create(Person.prototype);

                Student.prototype.constructor;
                // Person

                - remember that every prototype object has a property on it called
                constructor that points back to the constructor function
                - the Student.prototype.constructor is the Person constructor because
                when using Object.create, we overwrote the constructor property
                - so we need to make sure and set it back

                Student.prototype.constructor = Student;






*/