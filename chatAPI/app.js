"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//importing route
let userRoutes = require('./routes/users_routes'); 
userRoutes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'});
})

var server = require("http").Server(app);
var io = require("socket.io")(server);
io.on('connection', socket => {
  console.log('New client connected')
  
  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('sendMessage', (data) => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    let chatRoutes = require('./routes/chat_routes'); 
    // chatRoutes(app); 
    var sented = chatRoutes.sent(data.message, data.userId, data.userIdReceive);
    console.log(sented);
    // console.log(data);
    io.sockets.emit('sendMessage', data);
   
  })
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
server.listen(port);


console.log('RESTful API server started on: ' + port);