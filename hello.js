var http = require('http') // add the http module
var myServer = http.createServer(function(request, response)
{
response.writeHead(200, {"content-Type" : "text/html"});
response.write("<b>Hello</b> world");
response.end();
});//create = server

myServer.listen(3000);

console.log("http://127.0.0.1:3000 on your browser")