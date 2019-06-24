var data[];

function SendTwitter(tweets_txt){

    //以下POST先のURLの作成

    let options = {
        method: "POST",
        apiURL: "https://api.twitter.com/1.1/statuses/update.json",
        consumerKey: "2XbZ8L11u91rOfXErQSNt0OmD ",
        consumerSecret: "e2IazQMAyVEVG3cmYfZHMk8Q0JMNUN63cigk1WVYqE0MJWn8Ld",
        accessToken:  localStorage.getItem("oauth_token"),
        tokenSecret:  localStorage.getItem("oauth_token_secret")
    };

    let accessor = {
        consumerSecret: options.consumerSecret,
        tokenSecret: options.tokenSecret
    };

    //parameterの値はちゃんとリファレンス読んで理解しないと書けないぜ
    let message = {
        method: options.method,
        action: options.apiURL,
        parameters: {
            oauth_version: "1.0" ,
            oauth_signature_method:"HMAC-SHA1" ,
            oauth_consumer_key: options.consumerKey ,
            oauth_token: options.accessToken,
            status: tweets_txt + "nodeはクソ",
            callback: "callback1"
        }      
    };

    //以下OAuth1は本来OAuthであるが先に書いた理由から改変
    OAuth1.setTimestampAndNonce(message);
    OAuth1.SignatureMethod.sign(message, accessor);

    //ここでPOSTするURIを作成しています。
    let url = OAuth1.addToURL(message.action, message.parameters);

    //GET_requestの場合、ヘッダドメイン名の回避が必要だがPOSTでは必要ない
    //回避処理を書くとエラー吐かないのにPOSTできない泥沼
    $.ajax({
        type: options.method,
        url: url
    });
}
//以下のコールバック関数内の処理は適当にやってください
function callback1(data){
    JSON.stringify(data);
}