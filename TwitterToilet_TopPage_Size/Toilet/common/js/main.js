////アニメーションの変数
var
cursor = $(".cursor"),
poo = $(".poo"),
cWidth = 20, //カーソルの大きさ
pWidth = 10, //うんちの大きさ
mouseX = 0, //マウスのX座標
mouseY = 0, //マウスのY座標
posX = 0, //フォロワーのX座標
posY = 0, //フォロワーのX座標
screenY = 0,


windowWidth = window.innerWidth,
windowHeight = window.innerHeight,
birdSpeedX = 2.0,
birdSpeedY = 5.0,
time = 0.0,
birdPosX = windowWidth / 2.0,
birdPosY0 = windowHeight / 5.0,
count = 0; //うんこの数

var $wrapper = document.querySelector('#js-wrapper'); //クローンの収納場所

var imgSize = 20;//ウンチの大きさ
var nowTextTotalLength = 0;//ツイートの分量

////tweet取得の変数
var consumerKey    = "2XbZ8L11u91rOfXErQSNt0OmD";
var consumerSecret = "e2IazQMAyVEVG3cmYfZHMk8Q0JMNUN63cigk1WVYqE0MJWn8Ld";
var accessToken    = "1126760512346136576-HRchGRixDXCuPRvBAywquQbyQNBtOY";
var tokenSecret    = "o9d3eSz76Y6GQiMyzUycj57FWZ6WytbUUvKbo0NL4kNmv";

var url = "https://api.twitter.com/1.1/search/tweets.json";
var keywords = "クソ";
var count = 5; // 表示する件数

var resultCount = 0;
var searchCount = 0;
var searchResults = new Array();



////tweet取得
// Twitter APIを使用してTweetを取得する部分
function getTwitter() {
  var action = url;

  var accessor = {
      consumerSecret: consumerSecret,
      tokenSecret: tokenSecret
  };

  /*
  //検索用のメモ（未実装）だから無視してね
  if(searchCount == 0){
  }
  else{
      keywords =
  }
  Sun Jun 30 09:15:30 +0000 2019
  since:2018-12-31_23:59:59_JST
  */

  // 送信するパラメータを連想配列で作成
  var message = {
      method: "GET", // リクエストの種類
      action: action,
      parameters: {
          oauth_version: "1.0",
          oauth_signature_method: "HMAC-SHA1",
          oauth_consumer_key: consumerKey, // コンシューマーキー
          oauth_token: accessToken, // アクセストークン
          count: count, // 取得する件数
          "q": keywords, // 検索するキーワード
          "lang": "ja", // 日本語に設定
          "result_type": "recent", // 最新の情報を取得するように設定
          callback: "getdata" // 取得したデータをgetdata関数に渡すよう設定
          //// ↑↑↑↑JSON（JSONP?）データだよ
      }
  };

  // OAuth認証関係
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  var searchUrl = OAuth.addToURL(message.action, message.parameters);

  // ajaxによる通信
  $.ajax({
      type: message.method,
      url: searchUrl, // リクエスト先のURL
      dataType: "jsonp",
      jsonp: false,
      cache: true,
  });

  //タイマー呼び出し
  refresh();

}

function getdata(data){ // 引数(data)に取得したデータが入ってくる
  ////autoGet()で呼び出される

  var result = data.statuses; // 取得したデータから、メソッドチェーンで必要なものを取得
  resultCount = result.length;
  searchResults.push(result); //データを配列にどんどん追加
  searchCount = searchResults.length;
  //console.log(searchResults);

  /*
  //$(".Tweet表示エリア").empty(); // 表示エリアを空にする
  //取得回数分繰り返し
  // for(var j = 0; j < searchCount; j++){
    //取得件数分繰り返し
    for( var i = 0; i < resultCount; i++ ) {
        ////↓↓↓↓3回目あたりからエラー出る
        var name = searchResults[searchCount-1][i]["user"]["name"]; // ツイートした人の名前
        var id = searchResults[searchCount-1][i]["user"]["screen_name"]; // ツイートした人の名前
        //var imgsrc = searchResults[searchCount-1][i]["user"]["name"]["profile_image_url"]; // ツイートした人のプロフィール画像
        var text = searchResults[searchCount-1][i]["text"]; // ツイートの内容
        var updated = searchResults[searchCount-1][i]["created_at"]; // ツイートした時間

        // Tweet表示エリアに取得したデータを追加していく
        $(".Tweet表示エリア").append(name + ' (@' + id + ')' + ' | ' + text + ' | ' + updated + '</p>');
    }
    $(".Tweet表示エリア").append('////////////////////////////////////////' + '</p>');
  // }
  */
}


////鳥のアニメーション
//毎フレーム実行
function update(){

	birdPosX += birdSpeedX;
	if(birdPosX > windowWidth || birdPosX < 0){
		birdSpeedX = -birdSpeedX;
	}

	time += 0.015;
	var birdPosY = birdPosY0 + Math.sin(time) * 50;

	cursor.css({
    left: birdPosX - (cWidth / 2),
    top: birdPosY - (cWidth / 2)
    })

	poo.css({
    left: birdPosX - (pWidth / 2),
    top: birdPosY + pWidth * 4
    })

	requestAnimationFrame(update);
}

//クローン元っぽい
var $cloneItem = document.querySelector('.poo');

//ツイート取得とともに呼び出し
function createPoo()
{
  const $clone = $cloneItem.cloneNode(true);
  var $pooimg = $clone.children[0]; //画像部分
  var $popup = $clone.children[1]; //ポップアップ部分

  $wrapper.appendChild($clone);
  TweenMax.to($clone, 2, {top:windowHeight - 100});//ウンチの位置を調整
  TweenMax.to($pooimg, 0.5, {alpha:1});
  //ウンチのサイズを初期化
  imgSize = 20;
  nowTextTotalLength = 0;

  // var text = searchResults;
  // //$popup.append(searchResults[searchCount-1][1]["text"]);
  //orgWidth = 0;
  //orgHeight = 0;
  for( var i = 0; i < resultCount; i++ ) {
    ////↓↓↓↓3回目あたりからエラー出る
    //var name = searchResults[searchCount-1][i]["user"]["name"]; // ツイートした人の名前
    //var id = searchResults[searchCount-1][i]["user"]["screen_name"]; // ツイートした人の名前
    //var imgsrc = searchResults[searchCount-1][i]["user"]["name"]["profile_image_url"]; // ツイートした人のプロフィール画像
    var text = searchResults[searchCount-1][i]["text"]; // 前のツイートの内容
    //var updated = searchResults[searchCount-1][i]["created_at"]; // ツイートした時間

    // Tweet表示エリアに取得したデータを追加していく
    //$popup.append('@' + id + ':' + text);

    var textLength = text.length;//取得したtextの文字数
    nowTextTotalLength += textLength;//ツイートの総文字数

    $popup.append("(" + i + ")" + text);

  }
  console.log(nowTextTotalLength);
  imgSize = nowTextTotalLength * 0.2;//ツイートの量によってサイズを指定
  TweenMax.to($pooimg, 0.5, {width:imgSize,height:imgSize * 0.8});//アニメーションでサイズを変更

  // console.log($clone);
  // console.log($clone.childNodes[5]);
  // console.log($clone.children[1]);
  // console.log($wrapper);
  //console.log($wrapper.children('$clone'));

  //マウスオーバーでポップアップ表示、非表示
  $pooimg.addEventListener('mouseover', function() {
    TweenMax.to($popup, 0.5, {alpha:1});
  });
  $pooimg.addEventListener('mouseout', function() {
    TweenMax.to($popup, 0.5, {alpha:0});
  });

  pooTimer();
};


////20秒毎にツイート取得(20秒ごとに更新の仕様っぽい)
//ツイート取得タイマー
function refresh(){
  setTimeout(function(){getTwitter()}, 20000);
}

//うんこのタイマー
function pooTimer(){
  setTimeout(function(){createPoo()},20000);
}

// ウィンドウを読み込み後に実行される
$(window).on('load', function(){
  getTwitter();
  setTimeout(function(){createPoo()},2000);

  requestAnimationFrame(update); //アニメーション呼び出し
});
