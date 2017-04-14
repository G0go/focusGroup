/**
 * Created by ventinc on 13/04/17.
 */
const http = require("http");
const fs = require("fs");
const ent = require("ent");

const hostname = "127.0.0.1";
const port = "1337";

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    fs.readFile(__dirname + "/index.html", 'utf8', (error, respond) => {
        if (error) {
            res.statusCode(404).end("ERROR 404 NOT FOUND");
        } else {
            res.end(respond);
        }
    });
});

const io = require("socket.io")(server);

io.on('connection', (socket) => {
    let address = socket.request.connection.remoteAddress;

    socket.on('message', (message) => {
        message = ent.encode(message);
        socket.broadcast.emit('message', {user: socket.user, message: message});
        socket.emit('message', {user: socket.user, message: message});
    });
    socket.on('newUser', (user) => {
        console.log("new user " + user + " " + address);
        user = ent.encode(user);
        socket.user = user;
        socket.broadcast.emit('message', {user: socket.user, message: "joined the room"});
        socket.emit('message', {user: socket.user, message: "joined the room"});
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('message', {user: socket.user, message: "leave the room"});
        socket.emit('message', {user: socket.user, message: "leave the room"});
    });
});

server.listen(port, hostname, () => {
    console.log(`Server started http://${hostname}:${port}`);
});
