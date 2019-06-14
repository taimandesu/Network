
$(document).ready(function(){
  var dataURL = 'https://api.twitter.com/1.1/search/tweets.json';
  var photoData;

  var getData = function(url) {
    $.ajax({
      url: url,
      dataType: 'json',
      data: {
        access_token: '＜アクセストークン＞',
        count: 12
      }
    })
    .done(function(data) {
      photoData = data;
      console.dir(photoData);
    })
    .fail(function() {
      $('#gallery').text('データの読み込みに失敗しました。');
    })
  }

  getData(dataURL);
});


$.ajax({
  type: "get",
  url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
  data: {name: 'chara'},
  dataType: "json"
  success: function(data, dataType){}
});


/*
#!/Library/Frameworks/Python.framework/Versions/3.7/bin/python3.7
# -*- coding: utf-8 -*-

import json
import config
from requests_oauthlib import OAuth1Session

# OAuth認証部分
CK      = config.CONSUMER_KEY
CS      = config.CONSUMER_SECRET
AT      = config.ACCESS_TOKEN
ATS     = config.ACCESS_TOKEN_SECRET
twitter = OAuth1Session(CK, CS, AT, ATS)

# Twitter Endpoint(検索結果を取得する)
url = 'https://api.twitter.com/1.1/search/tweets.json'

# Enedpointへ渡すパラメーター
keyword = 'うんこ　OR ピカチュウ'

params ={
         'count' : 10,      # 取得するtweet数
         'q'     : keyword  # 検索キーワード
         }

req = twitter.get(url, params = params)

if req.status_code == 200:
    res = json.loads(req.text)
    for line in res['statuses']:
        print(line['text'])
        print('*******************************************')
else:
    print("Failed: %d" % req.status_code)
*/