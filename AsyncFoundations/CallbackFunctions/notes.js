/* 
- A callback function is: a function that is passed into another function as a 
parameter, then invoked by that other function

- A higher order function is: a function that accepts a callback as a parameter

- What are callbacks used for? Advanced Array Methods, Browser events, AJAX Requests,
 React Development
*/




// Example 1

function callback() {
    console.log("Coming from callback");
}

function higherOrder(fn) {
    console.log("About to call callback");
    fn(); // Callback function is invoked
    console.log("Callback has been invoked");
}

higherOrder(callback);



// Example 2 

function callback() {
    console.log("Coming from callback");
}

function higherOrder(fn) {
    console.log("About to call callback");
    fn(); // Callback function is invoked
    console.log("Callback has been invoked");
}

higherOrder(callback);


// Example 3 

function sendMessageConsole(message) {
    console.log(message);
}

function sendMessageAlert(message) {
    alert(message);
}

function sendMessageConfirm(message) {
    return confirm(message);
}

sendMessageAlert("Lots of duplication");


// Example 4 - The callback way of Example 3 (prevents duplication)

function sendMessage(message, callback) {
    return callback(message);
}

sendMessage("Message for console",
    console.log);

sendMessage("Message for alert", alert);

var answer = sendMessage("Are you sure??",
    confirm);



// Example 5

function greet(name, formatter) {
    return "Hello, " + formatter(name);
}

function upperCaseName(name) {
    return name.toUpperCase();
}

greet("Tim", upperCaseName);




// Example 6

function greet(name, formatter) {
    return "Hello, " + formatter(name);
}

greet("Tim", function (name) {
    return name.toUpperCase();
});

greet("Tim", function (name) {
    return name + "!!!!!";
});
