/* 
findIndex returns the index of the first element in the array for which the 
callback returns a truthy value. -1 is returned if the callback never returns 
a truthy value.
*/

// Example 1 

var arr = [3, 4, 6, 2, 1];
findIndex(arr, function (num, index, array) {
    return num === 6;
});
// will return 2 because the truthy value is found at the index of 2


// Example 2 

var arr = [5, 11, 13, 8, 6, 7];
findIndex(arr, function (num, index, array) {
    return num % 2 === 0;
});
// return '3' because the truthy value will be returned on 8 at the index of 
3


// Example 3 

var langs = ["Java", "C++", "Python", "Ruby"];
findIndex(langs, function (lang, index, arr) {
    return lang === "JavaScript";
});
// This will return -1 because all of the results are falsey


// Example 4 

var langs = ["Java", "C++", "JavaScript"];
findIndex(langs, function (lang, index, arr) {
    lang === "JavaScript";
});
// this is a bad callback, and the returned value will always be -1 because
// nothing is returned in the function