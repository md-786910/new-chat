const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);
const port = 3000 || process.env.PORT;
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

let users = {};
io.on("connection", socket => {
    console.log("connection")
    socket.on("try", name => {
        console.log("connection")
        socket.emit("welcome", `welcome ${name}`)
        users[socket.id] = name;
        socket.broadcast.emit("userJoined", name);

    })

    socket.on("send", messages => {
        socket.broadcast.emit("recieve", { messages: messages, id: users[socket.id] });
    })

    socket.on("disconnect", (name) => {
        console.log("left the chat", users[socket.id])
        io.emit("left", users[socket.id]);
        delete users[socket.id];
    })
})
// console.log(io)
server.listen(port, () => {
    console.log("app is running at ", port)
})