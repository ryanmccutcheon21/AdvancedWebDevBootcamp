/*
Asynchronous JavaScript and XML, XML has been replaced
by JSON

AJAX is not:

- a library

- a framework

- a technology


AJAX is:

- an approach to web development, an approach/way of building websites


What it boils down to:

- With AJAX, websites can send and request data from a server in the background
without disturbing the current page


Making requests with JavaScript: Different Methods

1. XMLHTTPRequest
2. The Fetch API
3. 3rd party libraries: jQuery, Axios, etc.



What's the deal with JSON and XML?

- XML has been replaced with JSON
- JSON syntax looks like a JS object
- AJAX is actually AJAJ now, just still called AJAX becuase AJAJ doesn't sound as
good.



Making our first XMLHTTPRequest:

- See codepen for an example of this, and how we connect to the API

- first we want to create a new variable that is equal to new XMLHttpRequest();

- this makes a new instance of the XMLHttpRequest

- our end goal is to conncet to our API URL, so we need to reference our variable,
and the use .open, and then make another reference using .send(), which is where
we'll actually send off our request and initiate everything. .open is where we
tell it what type of request to make.

- we make a get request because we are retrieving information

- second thing we need to provide to .open is the url

- in the example it looks like: XHR.open("GET", "https://api.github.com/zen");

- if you open the console right now, you won't see anything and that's because we
aren't actually doing anything with the information. To understand more about this,
reference the mdn docs about .readyState

- want we want to do is check if the readyState is done so we can do something with
the information

- the way we do that, is by taking advantage of an event called onreadystatechange

- onreadystatechange change calls a function every time the ready state changes so
set XHR.onreadystatechange = function()

- if you console.log('Ready state is...', + XHR.readyState); you will see: Ready state
is... 1, 2, 3, 4

- Ready state 4 means it's done, so we make an if statement saying if the
ready state is 4, we'll get the data from the request using responseText that is
sent to us automatically

- looks like this: XHR.responseText

- if we don't use the if statement it won't work because responseText isn't available
until the request is finished, so we want to make sure we're waiting until the
response is done with the if statement

- should be able to get e response in the console now, and get a new one everytime
you refresh

- if the server is down, we need to have code to handle this

- so we need to make sure we have a status code of 200 to make sure we have a good
response from the server in case something has messed up

- so we add another if statement making sure the status code is good





AJAX Workflow: Building the Random Image App

- in Random Dod Pictures AJAX, we want to get a random url to make a request from
the API, and use that inforamtion to change the source of the image to therefore
render a new image inside the div

- we start by selecting the button in the JS using let btn = #btn

- then we add an event listener to when that button is clicked

- Now we want to make a new XMLHttpRequest whenever the button is clicked.

-  inside the eventListener function, we add the JS to open a GET request to the API
url, then send that information

- now we need to do something with the date, so we add XHR.onreadystatechange = a function

- if you console.log(XHR.responseText) right now, you will get JSON with a message
and the status of the response. We want to take the information from the message and
add it as the source of our image

- so instead of just console.log(XHR.responseText), to get to the message inforamation
in the JSON we add .message. So now the console.log should look like this:
console.log(XHR.responseText.message)

- but if you just do that, you'll get undefined returned because message doesn't exist.
That's because it's not a JS object. It's JSON, but it's still all just a string.
What we need to do is convert it to a JS object from that string

- To do this, we need to parse the JSON like this: JSON.parse(XHR.responseText) and
we can save that to a variable, then console.log the variable

- you'll now see that an object is returned, so now we have access to message. Now,
we can add .message to XHR.responseText or. It now looks like:
let url = JSON.parse(XHR.responseText).message;

- now that we have access to the random url through the .message, we can change
the images src by selecting the image and saving it to a variable, then using
the variable name (in this case img) and it looks like:
img.src = url;



Intro to Fetch:

- Problems with XHR:
1. Ugly, bulky syntax
2. it's old, 16 years old
3. no streaming


- Fetch is the replacement to XHR

- it has cleaner syntax, it's more powerful, exposes more of the underlying data
in a request that XHR's don't

- this is how you make Fetch happen (example of a simple GET request):
fetch(url)
.then(function(res) {
    console.log(res);
})
.catch(function(error) {
    console.log(error);
})

- fetch returns a promise

- Parsing JSON with Fetch:
fetch(url)
.then(function(res) {
    return res.json();
}).then(function(data) {
    console.log(data);
}).catch(function() {
    console.log('Problem!');
});


- Fetch Options
fetch(url, {
    method: 'POST',
    body: JSON.stringify({
    name: 'blue',
    login: 'bluecat',
    })
})
.then((data) => {
    //do something
})
.catch((error) => {
    //handle error
})


- Fetch Error Handling:

    - What does .catch actually catch?

    - the code in catch will run if there is a problem with the request itself, ie
    the user's internet is off
    - a 404 code won't cause catch to run
    - to see what the request status is, you can console.log(request.status) in the
    request .then
    - in codepen example, notice how he uses a built in property called
    request.ok to check if there was an error, if there was then he made code
    to run for that
    - Example:
    fetch(url)
    .then((res) => {
    if(!res.ok) {
    throw Error(404); // can be whatever you want in the parentheses
    }
    return res;
    }).then((res) => {
    console.log('ok');
    }).catch((error) {
    console.log(error);
    });

    - in codepen, he he makes an error handling function, and calls it in the first
    .then so that if there is an error, none of the other code will run after
    - outside of the if statement, we return the request so that if the request is
    ok and doesn't throw an error, we still get the request so we have access to it
    in the subsequent .thens
    - we can also put in request.status in the error parentheses to see what the
    status code was of the error


- Random User Generator CodePen Exercise with Fetch:
    - Refactoring Fetch Example:
    fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(updateProfile)
        .catch(printError)

- The Problem with Fetch:
    - fetch is cool, it's easy to use
    - but browser support isn't great



            jQuery & Axios:


- AJAX with jQuery:

    - jQuery is the most popular JS library of all time
    - slogan is: "Write less, do more"
    - Without jQuery:
    function fadeIn(el) {
    el.style.opacity = 0;

    var last = +new Date();
    var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
    last = +new Date();

    if(+el.style.opacity < 1) {
    (window.requestAnimationFrame && requestAnimationFrame(tick))
    || setTimeout(tick, 16);
    }
    };
    tick();
    }
    fadeIn(el);

    - With jQuery:
    $(el).fadeIn();


    - the same applies for making requests! It's a nicer interface to make requests
    with

    - Making a Request and Parsing JSON w/o jQuery:
    var request = new XMLHttpRequest();
    request.open('GET', '/my/url');

    request.onload = function() {
    if(request.status >= 200 && request.status < 400) {
    // Success!
    var data = JSON.parse(request.responseText);
    } else {
    //do something
    }
    };

    request.onerror = function() {
    // There was a connection error
    };

    request.send();


    - Making a Request and Parsing JSON with jQuery:
    $.getJSON('/my/url', function(data) {

    });


    - notice how much less code it takes to do an action with jQuery
    - List of jQuery AJAX Methods:
        - $.ajax
        - $.get
        - $.post
        - $.getJSON

    - the last three are shorthand methods, but $.ajax is the key method that
    everything else is built on top of
    - to include jQuery, go to jQuery CDN bookmark and include it with script tag
    in HTML

    - $.ajax (the 'base' jQuery Method):
        - This creates an XMLHttpRequest under the hood:
        $.ajax({
        method: 'GET,
        url: 'some.api.com',
    })
    .done(function(res) {
    console.log(res);
    })
    .fail(function() {
    // do something
    })


    - in jQuery we don't have to check the status code for the .fail method like
    we do with Fetch
    - in codepen, see how we selected the button and then use .click method
    to add an event listener and run an ajax function when it's clicked. In the .done
    method, if we pass in data as the paramater and console.log(data) we see that
    what we are returned is already parsed JSON
    - $('p').text(data[0]) sets the text of our paragraph to the data we are returned
    and [0] is used to just get the first paragraph from this api
    - if you look at the jQuery AJAX source code that I bookmarked, you can see that
    $.ajax just makes an XHR request



- jQuery AJAX Shorthand Methods:
    - $.get, $.post, $.getJSON

    - Example:

    $('#getBtn').click(() => {
  $.get('https://api.github.com/users/ryan')
  .done(data => {
    console.log(data)
  })
  .fail(() => {
    console.log('Error!')
  })
});

$('#postBtn').click(() => {
  let data = {
    name: 'Charlie',
    city: 'Florence'
  };
  $.post('www.catsarecoolandsoaredogs.com', data)
  .done(data => {
    console.log('Hi!')
  })
  .fail(() => {
    console.log('Post error!')
  })
})

$('#getJSONBtn').click(() => {
  $.getJSON('https://api.github.com/users/ryan')
  .done(data => {
    console.log(data);
  })
  .fail(() => {
    console.log('Get JSON error!');
  })
})





Axios Intro:

- a lightweight HTTP request library
- can make XMLHttpRequests from the browser
- make http requests from node.js
- supports the promise API

Basic Syntax:
axios.get(url)
.then(function(res) {
    console.log(res.data);
})
.catch(function(e) {
    console.log(e);
})

- axios.get makes a get request
- this just creates an XMLHttpRequest under the hood

- first we need to include axios to have access to it
- go to the docs on github, you can use the cdn or install it with npm

- Takeaways:
    - jQuery is great, but if we only want the AJAX functionality, just use axios



- Handling Errors with Axios:
    - see codepen for example


*/