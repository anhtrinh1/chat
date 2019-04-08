"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//importing route
let userRoutes = require('./routes/users_routes'); 
userRoutes(app);
let chatRoutes = require('./routes/chat_routes'); 
chatRoutes(app);
 

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
})


app.listen(port);

console.log('RESTful API server started on: ' + port);