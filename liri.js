var fs = require('fs');
var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');


var action = process.argv[2];
var value = process.argv[3]; 

var nodeArgs = process.argv;
var value = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        value = value + "+" + nodeArgs[i];
    } else {
        value = value + nodeArgs[i];
    }
}

switch (action) {
    case 'my-tweets':
        twitter();
        break;

    case 'spotify-this-song':
        spotifyThis();
        break;

    case 'movie-this':
        omdb();
        break;

    case 'do-what-it-says':
        says();
        break;
}

//Twitter
function twitter() {
    var client = new Twitter(keys.twitterKeys);

        var params = { screen_name: 'bmarti57', count: 20 };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
                    console.log("Date: " + tweets[i].created_at);
                    console.log(tweets[i].text);
                }

            } else {
                console.log(error);
            }
        });
}//end twitter function

//Spotify
function spotifyThis() {

    var spotify = new Spotify ({
        id: '481a407feba14f4a8ad74ca76552eafe',
        secret: 'a7e60ade726646dbaa7db3e804177e95'
    });
    
        if (value != false) {
    
            spotify.search({type: 'track', query: value}, function(error, data) {
                if (error) {
                    console.log('Error occurred: ' + error);
                    return;
                }
                console.log("Artist: " + data.tracks.items[0].artists[0].name);                
                console.log("Title: " + data.tracks.items[0].name);
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.items[0].album.name);                
            });
        } else {    
                spotify.search({
                    type: 'track',
                    query: 'ace+of+base+sign'
                }, function(error, data) {
                    if (error) {
                        console.log('Error occurred: ' + error);
                        return;
                    }
                    // DO SOMETHING WITH 'data'
                    console.log("Artist: " + data.tracks.items[0].artists[0].name);                    
                    console.log("Title: " + data.tracks.items[0].name);
                    console.log("Preview URL: " + data.tracks.items[0].preview_url);
                    console.log("Album: " + data.items[0].album.name);
                });
            
    
        }
}//end spotify function

//OMDB
function omdb() {

    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        if (value != false) {
            console.log("Title: " + JSON.parse(body).Title);   
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } else {
            request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&r=json', function(error, response, body) {
                console.log("Title: " + JSON.parse(body).Title);   
                console.log("Release Year: " + JSON.parse(body).Year);
                console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
                //console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
                console.log("Country: " + JSON.parse(body).Country);
                console.log("Language: " + JSON.parse(body).Language);
                console.log("Plot: " + JSON.parse(body).Plot);
                console.log("Actors: " + JSON.parse(body).Actors);
            });    
        }

    });
}//end omdb function    

//Do What it Says
