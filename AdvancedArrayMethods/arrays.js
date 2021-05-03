/*

- forEach
    - iterates through an array
    - runs a callback function on each value in the array
    - returns 'undefinde'
    - forEach ALWAYS returns undefined
    - if you try to store the result of forEach in a variable, or try to
    return the result in a function, you will still always get undefined
    - inside of the callback function we have access to each value, the index
    of the value, and the array itself
    - anatomy of forEach:
        array   method  callback funciton
        [1,2,3].forEach(function(value, index, array){

        });
    - the value is each value in the array is passed in
    - each index in the array is passed in the callback
    - the entire array is passed in as the third callback
    - since the example array has three values, the callback function
    will be executed 3 times
    - we can call the params to the callback function whatever we want, but
    devs typically use the same keywords of value, index, and array
    - we do not always need all three parameters, use whichever ones
    you need, just remember the order is important
    - Example:
        let arr = [1, 2, 3];

        arr.forEach(function(value, index, array) {
            console.log(value);
        });

        // 1
        // 2
        // 3
        // undefined

    - function forEach(array, callback){
        for(let i = 0; i < array.length; i++){
            callback(array[i], i, array);
        }
    }

    - Using forEach in a function:
        function halfValues(arr){
            let newArr = [];
            arr.forEach(function(value){
                newArr.push(value / 2);
            })
            return newArr;
        }

        halfValues([2, 4, 6]);

        // [1, 2, 3]



- map
    - the first thing map does is create a new array
    - then it iterates through the array it was called on
    - next, it runs a callback function for each value in the array
    - then it adds the result of that callback function to the new array
    - returns the new array
    - map ALWAYS returns a new array of the SAME length

    - Example:
        let arr = [1, 2, 3];

        arr.map(function(value, index, array){
            return value * 2;
        });

        // [2, 4, 6]

    - have to return a value inside of the callback, because the value that we return
    is what will be placed inside the new array that map creates

        function map(arr, callback){
            let newArr = [];
            for(let i = 0; i < arr.length; i++){
                newArr.push(callback(arr[i], i, arr))
            }
            return newArr;
        }

    - Using map in a function:
        function tripleValues(arr){
            return arr.map(function(value){
                return value * 3;
            });
        }

        tripleValues([1, 2, 3]);
        // [3, 6, 9]

    - we could've used forEach for this last example, but map is a little more
    friendly because it already returns a new array to us
    - forEach can be used if you want to overrite values in an array or change
    something externally
    - use map when you want a new array returned to you

    - Another example:
        function onlyFirstName(arr){
            return arr.map(function(val){
                return val.first;
            });
        }

        onlyFirstName([{first: 'Tim', last: 'Garcia'}, {first: 'Matt', last: 'Lane'}]);

        // ['Tim', 'Matt']

    - map is helpful when you want to extract values from an object and place them in
    an array


- Filter
    - creates new array
    - iterates through the array
    - runs a callback function on each value in the array
    - if the callback function returns true, that value
    will be added to the new array
    - if the callback function returns false, that value
    will be ignored from the new array
    - the result of the callback will ALWAYS be a boolean
    - Example:
        let arr = [1, 2, 3];

        arr.filter(function(value, index, array){
            // no need for an if statement
            // just return an expression
            // that evaluates to true or false
            return value > 2;
        });

        // [3]

    - Another example:
        let instructors = [
            {name: 'Elie'},
            {name: 'Tim'},
            {name: 'Matt'},
            {name: 'Colt'}
        ];

        instructors.filter(function(value, index, array){
            return value.name.length > 3;
        });

        // [{name: 'Elie'}, {name: 'Matt'}, {name: 'Colt'}];



    - function filter(array, callbaack){
        let newArr = [];
        for(let i = 0; i < array.length; i++){
            if(callback(array[i], i, array)){
                newArr.push(array[i]);
            }
        }
        return newArr;
    }

    - Using filter in a function:
        function onlyFourLetterNames(arr){
            return arr.filter(function(value){
                return value.length === 4;
            });
        }

        onlyFourLetterNames(['Rusty', 'Matt', 'Moxie', 'Colt']);

        // ['Matt', 'Colt']

    - function divisibleByThree(arr){
        return arr.filter(function(value){
            return value % 3 == 0;
        });
    }

    divisibleByThree([1,2,3,4,5,6,7,8,9]);

    // [3,6,9]



- Some
    - iterates through an array
    - runs a callback on each value in the array
    - if the callback returns true for at least on single value,
    return true
    - otherwise, return false
    - the result of the callback will ALWAYS be a boolean

    - Example:
        let arr = [1, 2, 3];

        arr.some(function(value, index, array){
            return value < 2;
        });

        // true

    - Example 2:
        let arr = [1, 2, 3];

        arr.some(function(value, index, array){
            return value > 4;
        });

        // false

    - Example 3:
        function some(array, callback){
            for(let i = 0; i < array.length; i++){
                if(callback(array[i], i, array)){
                    return true;
                }
            }
            return false;
        }

    - Using some in a function:
        function hasEvenNumber(arr){
            return arr.some(function(value){
                return value % 2 === 0;
            });
        }

        hasEvenNumber([1,2,3,4]);
        // true

        hasEvenNumber([1,3,5]);
        // false

    - Example 5:
        function hasComma(str){
            return str.split('').some(function(value){
                return value === ',';
            });
        }

        hasComma('This is wonderful');
        // false

        hasComma('This, is wonderful');
        // true


- Every
    - iterates through an array
    - runs a callback on each value in the array
    - if the callback returns false for any single value,
    return false
    - otherwise, return true
    - the result of the callback will ALWAYS be a boolean

    - Example:
        let arr = [-1, -2, -3];

        arr.every(function(value, index, array){
            return value < 0;
        });

        // true

    - Example 2:
        let arr = [1, 2, 3];

        arr.every(function(value, index, array){
            return value > 2;
        });

        // false

    - Example 3:
        function every(array, callback){
            for(let i = 0; i < array.length; i++){
                if(callback(array[i], i, array) === false){
                    return false;
                }
            }
            return true;
        }

    - Using every in a function:
        function allLowerCase(str){
            return str.split('').every(function(value){
                return value === value.toLowerCase();
            });
        }

        allLowerCase('this is really nice');
        // true

        allLowerCase('this is Really nice');
        // false

    - Example 5:
        function allArrays(arr){
            return arr.every(Array.isArray);
        }

        allArrays([[1], [2], [3]]);
        // true

        allArrays([[1], [2], {}]);
        // false



- Reduce
    - accepts a callback funciton and an optional second parameter
    - iterates through an array
    - runs a callback on each value in the array
    - the first parameter to the callback is either the first value
    in the array or the optional second paramter
    - the first aparameter to the callback is often called the
    'accumulator'
    - the returned value from the callback becomes the new value
    of accumulator

    - Example:
        array   method  callback function   first value,  second value,  each index in array,  the entire array
        [1,2,3].reduce(function(accumulator, nextValue, index, array){

            whatever is returned inside here, will be the value of
            accumulator in the next iteration

        }, optional second parameter)

            - the accumulator can be the first value in the array, or
            the optional second parameter
            - nextValue is the second value in array or first if optional
            second parameter is passed


    - Example 2:
        let arr = [1,2,3,4,5];

        arr.reduce((accumulator, nextValue) => {
            return accumulator + nextValue;
        });

        - when we do not pass a second parameter to reduce, the
        value of the accumulator starts as the first value in the array
        - in example 2, that default value would be 1
        - each iteration would look like this in the above example

        accumulator     nextValue       returned value
        1                   2                 3
        3                   3                 6
        6                   4                 10
        10                  5                 15


    - Adding a second parameter example:
        let arr = [1,2,3,4,5];

        arr.reduce((accumulator, nextValue) => {
            return accumulator + nextValue;
        }, 10);

        - since the second parameter was used in this reduce funciton
        (10), the accumulator value in the first iteration will be 10
        - since the first accumulator value is hard coded and isn't the
        default value of the first value in the array, the nextValue
        in the first iteration will be the first value in the array
        - see the table to see how this looks

        accumulator     nextValue       returnedValue
        10                  1                 11
        11                  2                 13
        13                  3                 16
        16                  4                 20
        20                  5                 25

        - if you don't return the value, the accumulator on the next
        iteration will be undefined, which will make the funciton not work


    - How about strings?
        let name = ['Tim', 'Matt', 'Colt', 'Elie'];

        names.reduce((accumulator, nextValue) => {
            return accumulator += ' ' + nextValue;
        }, 'The instructors are');

        accumulator                 nextValue                returnedValue
        'The instructors are'       'Tim'                   'The instructors are Tim'
        'The instructors are Tim'   'Matt'                  'The instructors are Tim Matt'
        'The instructors are Tim    'Colt'                  'The instructors are Tim Matt Colt'
        Matt'
        'The instructors are Tim
        Matt Colt'                  'Elie'                  'The instructors are Tim Matt Colt Elie'


    - How about objects?
        let arr = [5,4,3,2,1];

        arr.reduce((accumulator, nextValue) => {
            if(nextValue in accumulator){
                accumulator[nextValue]++;
            } else {
                accumulator[nextValue] = 1;
            }
            return accumulator;
        }, {});

        - imagine we want to build an object with the key as each
        number, and the value as the count as each number in the array
        - this is an efficient way to see if there are any duplicates,
        or to count how many occurrences of a value exists in an array
        - we use the 'if in' condition to check if the key is already
        in an object

        accumulator         nextValue           returnedValue
        {}                  5                   {5:1}
        {5:1}               4                   {5:1, 4:1}
        {5:1, 4:1}          1                   {5:1, 4:1, 1:1}
        {5:1, 4:1, 1:1}     4                   {5:1, 4:2, 1:1,}
        {5:1, 4:2, 1:1}     5                   {5:2, 4:2, 1:1}


    - Using reduce in a function
        function sumOddNumbers(arr){
            return arr.reduce((accumulator, nextValue) => {
                if(nextValue % 2 !== 0){
                    accumulator += nextValue;
                }
                return accumulator;
            }, 0);
        }

        sumOddNumbers([1,2,3,4,5]);
        // 9


        function createFullName(arr){
            return arr.reduce((accumulator, nextValue) => {
                accumulator.push(nextValue.first + ' ' + nextValue.last);
                return accumulator;
            }, []);

            createFullName([{first: 'Colt', last: 'Steele'}, {first: 'Matt', last: 'Lane'}]);
            // ['Colt Steele', 'Matt Lane']
        }

*/