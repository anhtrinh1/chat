"use strict";

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/chat.sqlite3');
module.exports = {
    get(idSent, idReceive) { 
        var sql = "SELECT * FROM messages WHERE (userIdSent = ? AND userIdReceive = ?) OR (userIdSent = ? AND userIdReceive = ?) ORDER BY createDate";
        console.log(sql);
        db.all(sql, [idSent, idReceive, idReceive, idSent], function(err, rows) {
            console.log(sql); 
            if(err){
                return{
                    error:err
                };
            } else {
                return rows;
            }            
        });  
    },
    sent(body ,idSent, idReceive){
        // let data = req.body;
        console.log("insertRows");
        var sql = "INSERT INTO messages(body,userIdSent,userIdReceive) VALUES (?,?,?)";
        return db.run(sql, [body, idSent, idReceive] ,
            function(err){
            if(err){
                return {
                    stt: err
                };
            } else {
                return{
                    stt: "sent",
                    message: body,
                    idSent: idSent,
                    idReceive: idReceive

                };
            } 
        });
    }
}


