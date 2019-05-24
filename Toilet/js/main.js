const Twitter = require('twitter')

const consumer_key = 'ksFNTX5zOF8ti1YVtED6h77B7'
const consumer_secret = 'parr7rhpNR8NNU82MF82kFeyv38EKL0WaclXHmcZ7FtWcqEDGw'
const access_token_key = '1126760512346136576-pIj3cfzmha1VBPllZdBlcQq1U7xVoK '
const access_token_secret = 'qoHhNphZVr8jHo8EyFsSfClMHvydQ8mBK5NiP2M2s1usA'

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})

const params = {count: 50}//200件まで取得可能。デフォルトは20
client.get('statuses/home_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets)
  }
})