var http = require("http");
var url = require("url");
var fs = require("fs");

var server = http.createServer(function (request, response) {

    var page = url.parse(request.url).pathname;

    if (page === "/") {
        console.log("url -> ", page);
        fs.readFile('index.html', function (err, html) {
            if (err) {
                throw err;
            }
            response.writeHeader(200, { "Content-Type": "text/html" });
            response.write(html);
            response.end();
        });
    } else if (page.startsWith("/styles")) {
        var pathFile = "." + page;
        console.log("css -> ", pathFile);

        fs.exists(pathFile, function (exist) {
            if (exist) {
                fs.readFile(pathFile, function (err, css) {
                    if (err) {
                        throw err;
                    }

                    response.writeHead(200, { "Content-Type": "text/css" });
                    response.write(css);
                    response.end();
                });
            } else {
                fs.readFile('./404.html', function (err, html) {
                    if (err) {
                        throw err;
                    }
                    response.writeHeader(200, { "Content-Type": "text/html" });
                    response.write(html);
                    response.end();
                });
            }
        });
    } else {
        var pathFile = "." + page;
        console.log("app -> ", pathFile);

        fs.exists(pathFile, function (exist) {
            if (exist) {
                fs.readFile(pathFile, function (err, data) {
                    if (!err) {
                        response.writeHead(200, { "Content-Type": "application/vnd.android.package-archive" });
                        response.end(data);
                    } else {
                        response.statusCode = 500;
                        response.end();
                    }
                });
            } else {
                fs.readFile('./src/404.html', function (err, html) {
                    if (err) {
                        throw err;
                    }
                    response.writeHeader(200, { "Content-Type": "text/html" });
                    response.write(html);
                    response.end();
                });
            }
        });
    }
});

server.listen(3000);
console.log("------------------------------------------------------------")
console.log("Simple Private Store")
console.log("------------------------------------------------------------")

console.log("[Server] Server start !")
console.log("[Server] Store is online on 192.168.1.15:3000")
console.log("------------------------------------------------------------")
