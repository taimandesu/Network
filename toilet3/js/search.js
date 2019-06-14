const twitter = require("twitter");
//const module = require("twitter/lib/twitter.js");
const fs = require("fs");

const client = new twitter(JSON.parse(fs.readFileSync("secret.json","utf-8")));

const keyword = 'クソ';
const params = {count:5,q:keyword};

//url = "https://api.twitter.com/1.1/statuses/user_timeline.json"
//url = 'https://api.twitter.com/1.1/search/tweets.json'
client.get('search/tweets', params, function(error,tweets,response){
  if (!error) {
      console.log(tweets["statuses"][0]["text"]);

      //html書き換え
      //document.getElementById('text').textContent = tweets["statuses"][0]["text"];
      //document.getElementsByClassName('time').textContent = ["statuses"][0]["created_at"];
      fs.appendFileSync("search.json",JSON.stringify(tweets) + "\n","utf-8");
  }
});

//['members'][1]['powers'][2]