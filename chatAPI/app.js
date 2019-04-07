"use strict";

var sqlite3 = require('sqlite3').verbose();
var db;

function createDb() {
    console.log("createDb");
    db = new sqlite3.Database('./db/chat.sqlite3', createTable);
}


function createTable() {
    console.log("createTable");
    db.run("CREATE TABLE IF NOT EXISTS users ("+
        "userId INTEGER PRIMARY KEY AUTOINCREMENT,"+
        "userName VARCHAR(30) UNIQUE NOT NULL," +
        "password VARCHAR(20) NOT NULL );", insertRows);
}

function insertRows() {
    console.log("insertRows");
    var stmt = db.prepare("INSERT INTO users VALUES (?,?,?)");

    for (var i = 0; i < 3; i++) {
        stmt.run(i,"TrinhNA" + i, "1234");
    }
    stmt.finalize(readAllRows);
}

function readAllRows() {
    console.log("readAllRows");
    db.all("SELECT * FROM users", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.userId + ": " + row.userName);
        });
        closeDb();
    });
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function runChainExample() {
    createDb();
}

runChainExample();