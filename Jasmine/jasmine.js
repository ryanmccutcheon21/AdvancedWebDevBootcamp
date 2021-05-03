/*


Testing with Jasmine:

- Writing Tests in the Browser:
    - How do we test our code to make sure it does what we want
    it to do?
        - With tests! Specifically unit tests!
        - Unit tests, test parts of an application, (or units).
        Very commonly, each unit is tested individually and
        independently to ensure an application is running as
        expected.
    - What we need:
        - a framework to write tests
        - a way of describing the code we are testing
        - a tool where we can make assertions or expectations
        about our code
    - Introducing Jasmine:
        - comes with everything we need to test our code
        - works with all kinds of JavaScript environments
        - simple syntax to quickly get up and running
    - How it works:
        - create an html file
        - link css and javascript tags
        - start writing tests
    - Jasmine Syntax and Matchers:
        - Essential Keywords:
            - describe
                - what we use to organize our tests
                - you can think of this like talking to someone
                and telling them, "Let me describe something to you"
            - it
                - inside of the it function, we write code in more
                detail, what we expect this piece of funcitonality to do
                - can think of the it function like telling someone, "Let
                me tell you about ___ in more detail" now that I've
                described it to you
            - expect
                - lives inside of the it function
                - where we make expectations about the functionality
                we are testing
                - if one of our expectations aren't met, the test
                fails
        - Plain English Example:
            - describe('Earth')
                it('is round')
                    expect(earth.isRound.toBe(true))
                it('is the third planet from the sun')
                    expect(earth.numberFromSun).toBe(3)
        - In Code:
            - const earth = {
                isRound: true,
                numberFromSun: 3
            }

            describe('Earth', function() {
                it('is round', function() {
                    expect(earth.isRound).toBe(true)
                });
                it('is the third planet from the sun', function() {
                    expect(earth.numberFromSun).toBe(3)
                });
            });

            - inside the callback to our describe function, we place
            the it function. Inside of the it function, we place
            the expect function
            - the expect function returns an object to us, which we
            can attach other methods to
            - the methods we attach onto the result of the expect
            function are called 'Matchers'
            - the first matcher we are looking at in the example is .toBe
            - .toBe uses the === comparison operator and comapres the
            result of the expect function with the value we pass
            to the toBe function
        - In practice, you'll typically have external JavaScript
        files. One of them is call a spec file which contains all
        the tests. Spec is short for specifications.
        - Matchers:
            - are the functions that we attach to the result of the
            expect function
            - toBe/not.toBe
            - toBeCloseTo
                - accepts two values, and a second parameter for precision
            - toBeDefined
                - helpful when making sure certain variables have a
                specific value and not undefined
            - toBeFalsey/toBeTruthy
            - toBeGreaterThan/toBeLessThan
            - toContain
            - toEqual
                - this is like using == instead of === like with toBe
            - jasmine.any()
                - not exactly a matcher, but a helpful tool when doing
                type checking
        - Examples:
            describe('Jasmine Matchers', function() {
                it('allows for === and deep equality', function() {
                    expect(1+1).toBe(2);
                    expect([1, 2, 3]).toEqual([1, 2, 3]);
                });
                it('allows for easy precision checking', function() {
                    expect(3.1415).toBeCloseTo(3.14,2);
                });
            })


    - Writing Better Tests with Hooks:
        - What is wrong with this code? It's testing the push
        method on arrays
            describe('#push', function() {
                it('adds elements to an array', function() {
                    let arr = [1, 3, 5];
                    arr.push(7);
                    expect(arr).toEqual([1, 3, 5, 7]);
                });

                it('returns the new length of the array', function() {
                    let arr = [1, 3, 5];
                    expect(arr.push(7)).toBe(4);
                });
                it('adds anything into the array', function() {
                    let arr = [1, 3, 5];
                    expect(arr.push({})).toBe(4);
                });
            });

        - if we ran this test, everything would pass, so what's
        not great about it?
        - there is a lot of repetition
        - we define the arr variable multiple times
        - we can use a built in function in Jasmine to help with this
        - the function is called BeforeEach
        - run before each 'it' callback

    - BeforeEach Example:
         describe('Arrays', function() {
            let arr;
            beforeEach(function() {
                arr = [1, 3, 5];
            });
         });

         - why is the arr variable declared in the describe function?
         - because of JavaScript scope
         - if it was placed inside the beforeEach function, then that
         variable would only be accessable in that function

    - now the same code from earlier using beforeEach:
         describe('Arrays', function() {
            let arr;
            beforeEach(function() {
                arr = [1, 3, 5];
            });
            it('adds elements to an array', function() {
                arr.push(7);
                expect(arr).toEqual([1, 3, 5, 7]);
            });
            it('returns the new length of the array', function() {
                expect(arr.push(7)).toBe(4);
            });
            it('adds anything into the array', function() {
                expect(arr.push({})).toBe(4);
            });
         });


    - the same way we use beforeEach, we can use afterEach
        - run after each 'it' callback - useful for teardown
        - will commonly use teardown code when working with
        databases to ensure that you start and end with the same
        sample data

    - If you want to create a variable that persists among all tests,
    you can use beforeAll and afterAll
    - this is not as common, and can lead unintended side effects
    - run before/after all tests! Does not reset in between


    - Nesting describe:
         - we can nest describe blocks if we are describing
         multiple things

    - Pending Tests:
        - commonly done when we don't know exactly what we will
        be testing or if we don't want to run a specific test
        - we can mark a test as pending by omitting a callback function
        to the it function, adding a pending function inside, or placing
        an x before the it function

            describe('Pending specs', function() {
                xit('can start with an xit', function() {
                    expect(true).toBe(true);
                });
                it('is pending test if there is no callback function');
                it('is pending if the pending function is invoked inside
                the callback', function() {
                    expect(2).toBe(2);
                    pending();
                });
            });

    - How many expect functions should we use per it block:
        - Rule of thumb:
            - if the testing of one unit needs more than one expect,
            then use more, just make sure you are not testing several
            aspects of a unit which do not belong together in a single
            one test case


    - Spies:
        - when unit testing, we strive to isolate specific
        functionality and how this functionality behaves under
        a variety of circumstances
        - a mop is a fake object that poses as a function without
        having to go through the overhead of creating the real object
        - when you create a mock object, it creates a fake object
        that takes the place of the real object, we can then define
        what methods are called and the returns values from within
        our mock object
        - mocks can be used to retrieve certain values like how many
        times the mock function was called, what value the function returned
        and how many parameters the function was called with
        - in Jasmine, mocks are referred to as spies
        - a spy can stub (mimic) any function and track calls to
        it and all arguments
        - spies only exists in the describe or it block in which it
        is defined
        - spies are removed after each spec

    - Creating a Spy:
        - function add(a, b, c) {
            return a+b+c;
        }
        describe('add', function() {
            let addSpy, result;
            beforeEach(function() {
                addSpy = spyOn(window, 'add')'
                result = addSpy();
            })
            it('it can have params tested', function() {
                expect(addSpy).toHaveBeenCalled();
            });
        });
        - notice how we don't care about any kind of return value,
        we just want to make sure that our function is called

    - Testing Parameters:
        - use the toHaveBeenCalledWith matcher

        function add(a,b,c) {
            return a+b+c;
        }

        describe('add', function(0) {
            let addSpy, result;
            beforeEach(function() {
                addSpy = spyOn(window, 'add');
                result = addSpy(1,2,3);
            });
            it('it can have params tested', function() {
                expect(addSpy).toHaveBeenCalled();
                expect(addSpy).toHaveBeenCalledWith(1,2,3);
            });
        });

    - Testing Frequency:
        - to specify the testing frequency use the call method

          function add(a,b,c) {
            return a+b+c;
        }

        describe('add', function(0) {
            let addSpy, result;
            beforeEach(function() {
                addSpy = spyOn(window, 'add').and.callThrough();
                result = addSpy(1,2,3);
            });
            it('it can have params tested', function() {
                expect(addSpy.calls.any()).toBe(true);
                expect(addSpy.calls.count()).toBe(1);
                expect(result).toEqual(6);
            });
        });


    - Testing time Dependent code with Clock
        - the Jasmine Clock is available for testing time dependent
        code
        - it is installed by invoking jasmine.clock().install()
        - be sure to uninstall the clock after you're done to restore
        the original functions
        - Here is an example with setTimeout

            describe('a simple setTimeout', function() {
            var sample;
            beforeEach(function() {
                sample = jasmine.createSpy('sampleFunction');
                jasmine.clock().install();
            });
            afterEach(function() {
                jasmine.clock().uninstall();
            });
            it('is only invoked after 1000 milliseconds', fucntion() {
                setTimeout(function() {
                    sample();
                }, 1000);
                jasmine.clock().tick(999);
                expect(sample).not.toHaveBeenCalled();
                jasmine.clock().tick(1);
                expect(sample).toHaveBeenCalled();
            });
        });

        - Example with setInterval
            describe('a simple setInterval', function() {
            var dummyFunction;
            beforeEach(function() {
                dummyFunction = jasmine.createSpy('dummyFunction');
                jasmine.clock().install();
            });
            afterEach(function() {
                jasmine.clock().uninstall();
            });
            it('checks to see the number of times the function is invoked', fucntion() {
                setInterval(function() {
                    dummyFunction();
                }, 1000);
                jasmine.clock().tick(999);
                expect(dummyFunction.calls.count()).toBe(0);
                jasmine.clock().tick(1000);
                expect(dummyFunction.calls.count()).toBe(2);
            });
        });


    - Testing Async Code:
        - Jasmine also has support for running psecs that require
        testing async code
        - beforeAll, afterAll, beforeEach, afterEach, and it takes
        an optional single argument (commonly called 'done') that
        should be called when the async work is complete
        - a test will not complete until it's 'done' is called
            function getUserInfo(username) {
            return $.getJSON('https://api.github.com/users/' + username);
            }

            describe('#getUserInfo)', function(){
                it('returns the correct name for the user', function(done){
                    getUserInfo('elie').then(function(data){
                        expect(data.name).toBe('Elie Shoppik');
                        done();
                    });
                });
            });

        - notice 'done' being passed and used in the callback function
        - Jasmine will wait 5 seconds for the done callback to run by default
        or the test will timeout and you can modify the
        internal timer with jasmine.DEFAULT_TIMEOUT_INTERVAL


    - TDD (Test Driven Development) and BDD:
        - with TDD you write your test before your application code
        - in stark contrast to other testing strategies
        - in TDD, we follow a pattern called red and green refactoring
            - this means we develop products by starting with the tests
            - we first write the tests for our code
            - since we don't have any code yet, these tests will fail
            - after we see the tests fail, we write the code necessary to
            pass the tests
            - we then refactor our code as needed
            - TDD is not universally accepted, but is popular
            - developing using the TDD method may be slower, but the code
            is way less likely to have bugs
    - BDD (Behavior Driven Development)
        - if you open Jasmine, you'll see that this is the method
        Jasmine uses
        - BDD is a subset of TDD, you can have BDD without using TDD
        and vice versa
        - not mutually exclusive with TDD
        - involves being verbose with our style and describing the
        behavior of the functionality
        - helpful when testing the design of the software


    - Other kinds of tests:
        - Integration tests
            - builds on unit tests
        - Acceptance tests
            - involves performing tests on the full systsem
            - could be using your app on the browser or on a device
            to see whether the app's functionality satisfies a specification
            provided
        - Stress tests
            - determine how effective our app's can be under unfavorable
            conditions





*/