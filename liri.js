// Require Keys from keys.js file

var keys = require("./keys.js");

var twitKeys = keys.twitterKeys;

// for (var key in twitKeys) {
// 	console.log("An item: " + key + " has value of " + twitKeys[key] + ".")
// }

var command = process.argv[2];