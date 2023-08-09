const express = require('express');
const http = require('http');

const app = express();

const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.get('/',(req,res)=>{
    // res.send('hello there guys');
   res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
 socket.on('chat message', (msg) => {
    // console.log('message: ' + msg);
  });
});

// io.on('connection', (socket) => {
//   socket.broadcast.emit('hi');
// });

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000,()=>{
    console.log('server running on port 3000');
});
