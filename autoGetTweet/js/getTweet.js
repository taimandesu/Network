
    var consumerKey    = "2XbZ8L11u91rOfXErQSNt0OmD";
    var consumerSecret = "e2IazQMAyVEVG3cmYfZHMk8Q0JMNUN63cigk1WVYqE0MJWn8Ld";
    var accessToken    = "1126760512346136576-HRchGRixDXCuPRvBAywquQbyQNBtOY";
    var tokenSecret    = "o9d3eSz76Y6GQiMyzUycj57FWZ6WytbUUvKbo0NL4kNmv";

    var url = "https://api.twitter.com/1.1/search/tweets.json";
    var keywords = "クソ";
    var count = 5; // 表示する件数

    var searchCount = 0;
    var searchResults = new Array();
 
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
                callback: "update" // 取得したデータをupdate関数に渡すよう設定
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

        
    }

function update(data){ // 引数(data)に取得したデータが入ってくる
    ////autoGet()で呼び出される

    var result = data.statuses; // 取得したデータから、メソッドチェーンで必要なものを取得
    var resultCount = result.length;
    searchResults.push(result); //データを配列にどんどん追加
    searchCount = searchResults.length;
    console.log(searchResults);

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
}

////20秒毎にツイート取得(20秒ごとに更新の仕様っぽい)
//ツイート取得
function autoGet(){ 
    // Tweet検索関数の呼び出し
    getTwitter();
    //タイマー呼び出し
    refresh();
}
//タイマー
function refresh(){
	setTimeout(function(){autoGet()}, 20000);
}
function autoGet(){ 
    // Tweet検索関数の呼び出し
    getTwitter();
    timer = 20;//カウントダウンリセット
    //タイマー呼び出し
    refresh();
}


//タイマーのカウントダウン
var timer = 20; //残り秒数
function refreshtimer(){
    setTimeout(function(){countSeconds()}, 1000);
}
function countSeconds(){
    timer--;
    $(".Countdown").empty(); // 表示エリアを空にする
    $(".Countdown").append(timer + '</p>');

    refreshtimer();
}

 // ウィンドウを読み込み後に実行される
 $(window).on('load', function(){
    refreshtimer();
    autoGet();
});
