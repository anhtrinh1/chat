"use strict";

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/chat.sqlite3');
module.exports = {
    get: (req, res) => {
        let data = req.body;
        let idSent = data.userIdSent;
        let idReceive = data.userIdReceive;
        console.log(idSent+"-" + idReceive);
        var sql = "SELECT * FROM messages WHERE (userIdSent = ? AND userIdReceive = ?) OR (userIdSent = ? AND userIdReceive = ?) ORDER BY createDate";
        console.log(sql);
        db.all(sql, [idSent, idReceive, idReceive, idSent], function(err, rows) {
            console.log(sql); 
            if(err){
                res.json({
                    error:err
                });
            } else {
                res.json(rows);
            }            
        });   
    },
    sent: (req, res) => {
        let data = req.body;
        console.log("insertRows");
        var sql = "INSERT INTO messages(body,userIdSent,userIdReceive) VALUES (?,?,?)";
        db.run(sql, [data.body, data.userIdSent, data.userIdReceive] ,
            function(err){
            if(err){
                res.json({
                    message: err
                });
            } else {
                res.json({
                    message: "sent"
                });
            } 
        });
    }
};

