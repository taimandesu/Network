var foo = require('./foo');
var gamma = require('gamma');

var n = gamma(foo(5) * 3);
var txt = document.createTextNode(n);
document.body.appendChild(txt);

OAuth.initialize("cIxalOHx1TiOlmcV-j5mwxgNm3g");
OAuth.popup("twitter", function(err, res) { /* 処理 */});