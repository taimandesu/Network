var http = require('http');
var fs = require('fs');

var indexPage = fs.readFileSync('./index.html', 'utf8');
var nextPage = fs.readFileSync('./next.html', 'utf8');

var server = http.createServer(function(req, res){
    var target = '';
    switch(req.url){
        case '/':
        case '/index':
            target = indexPage;
            break;
        case '/next':
            target = nextPage;
            break;
        default:
            res.writeHead(404, {'ContentType': 'text/plain'});
            res.end('not found');
            return;
    }   
    
    res.writeHead(200, {'ContentType': 'text/html'});
    res.write(target);
    res.end();
});

server.listen(1234);
console.log('サーバを起動しました');
