var http2 = require('es3m-secure-http2'),
	//http = require('http'),
	httpProxy = require('http-proxy'),
	fs = require('fs');

var options = {
	key: fs.readFileSync('keys/key.pem'),
	cert: fs.readFileSync('keys/cert.pem'),
	ca:	fs.readFileSync('keys/csr.pem')
};

//ターゲットサーバ
var proxy = httpProxy.createServer({
	ssl:options,
	target:'https://localhost:4000',
	secure: false
});

//プロキシサーバ
var server = http2.createServer(options, function(req,res){
	proxy.web(req,res);
});

console.log("listening on port 8000");
server.listen(8000);