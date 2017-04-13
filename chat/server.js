/**
 * Created by ventinc on 13/04/17.
 */
const http = require("http");
const fs = require("fs");

const hostname = "127.0.0.1";
const port = "1337";

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    fs.readFile(__dirname + "/index.html", 'utf8', (error, respond) => {
        if (error) {
            res.statusCode = 404;
            res.end("ERROR 404 NOT FOUND");
        } else {
            res.end(respond);
        }
    });
});

const io = require("socket.io")(server);

io.on('connection', (socket) => {
    console.log()
});

io.on('message', (data) => {

});

server.listen(port, hostname, () => {
    console.log(`Server started http://${hostname}:${port}`);
});
