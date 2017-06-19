// Require Modules && Keys from keys.js file

var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var request = require('request');
var Twitter = require('twitter');

var twitKeys = keys.twitterKeys;
var spotKeys = keys.spotifyKeys;


//Set Variable for twitter, spotify, movie, do what it says
var command = process.argv[2];

var search = process.argv;

var movieName = "";
var songName = "";


//for loop for search variable starting at process.argv[3] determined by a string of movieName
for (var i = 3; i < search.length; i++) {

    if (i > 3 && i < search.length) {
        movieName = movieName + "+" + search[i];
        songName = songName + "+" + search[i];
    } else {

        movieName += search[i];
        songName += search[i];
    }

}

// for (var key in twitKeys) {
// 	console.log("An item: " + key + " has value of " + twitKeys[key] + ".")
// }




//Switch Case Statement to determine the function
switch (command) {
    case "my-tweets":
        callTweets();
        break;

        // WORKING!
    case "spotify-this-song":
        spotSong();
        break;

        // WORKING!
    case "movie-this":
        movieSearch();
        break;

    case "do-what-it-says":
        rollTheBox();
        break;
}

//OMDP Function --WORKING!
function movieSearch() {

    // setting queryURl to omdb api with movieName parameter
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";


    request(queryUrl, function(error, response, body) {

        // * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
        //   * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
        //   * It's on Netflix!

        if (!error && response.statusCode === 200) {

            // console.log(JSON.parse(response.body));
            console.log("User searched for: " + movieName);
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("..requesting data..");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("..responding data..");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("...");
            console.log("..Success!");
            console.log("--------------------------------------------------------------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Rlease Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country of Production: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actresses and Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes URL: https://www.rottentomatoes.com/m/" + movieName + "/");
            console.log("--------------------------------------------------------------------------------------------");
        }

        if (!error && response.statusCode === 200 && movieName == "") {
            var movieName = "Mr. Nobody";
        }

        if (error) {
            console.log("Error");
        }

    });
}


// Spotify Function-WORKING!
function spotSong() {


    var spotify = new Spotify({
        id: keys.spotifyKeys.clientID,
        secret: keys.spotifyKeys.clientSecret
    });

    spotify.search({ type: 'track', query: songName, limit: 5 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        // * This will show the following information about the song in your terminal/bash window
        // * Artist(s)
        // * The song's name
        // * A preview link of the song from Spotify
        // * The album that the song is from

        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song Title : " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Spotify URL: " + data.tracks.items[0].external_urls.spotify);

    });
}


function callTweets() {

    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = { screen_name: 'Nico_Santa_Ana' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

            for (var i = 0; i < 20; i++) {
                console.log("----------------------------------------------------------------------------------------");
                console.log("Tweet: " + tweets[i].text);
                console.log("Time if Tweet: " + tweets[i].created_at);
                console.log("----------------------------------------------------------------------------------------");
            }

            // console.log(JSON.parse(response.body, null, 2));
        }
    });
}


function rollTheBox() {

	fs.readFile("random.txt", "utf8", function(error, data){
		if (error){
			console.log("Error");
		}

		var randomText = data.split(",");
		console.log(randomText);

		spotSong(randomText[1]);
	})
}