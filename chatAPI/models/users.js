"use strict";

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/chat.sqlite3');
module.exports = {
    login: (req, res) => {
        let data = req.body;
        console.log(data);
        db.get("SELECT userName FROM users where userName = ? and password = ?", [data.userName, data.password], function(err, rows) {
            if(rows){
                console.log(rows);
                res.json(
                    {
                        status: true, 
                        message: 'Login success!',        
                        users: data.userName
                    }
                );
            } else {
                res.json(
                    {
                        status: false, 
                        message: 'Login error!',        
                        users: data.userName
                    }
                );     
            }         
        });   
    }
};

