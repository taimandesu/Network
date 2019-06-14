const twitter = require("twitter");
const fs = require("fs");

const client = new twitter(JSON.parse(fs.readFileSync("secret.json","utf-8")));

const params = {count:50};

client.get('statuses/home_timeline', params, function(error,tweets,response){
  if (!error) {
      console.log(tweets);
      fs.appendFileSync("hometimeline.json",JSON.stringify(tweets) + "\n","utf-8");
  }
});