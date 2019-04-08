-Thao tác với dữ liệu
$ npm install --save bluebird

-Tạo table
C:\NodeJS\notes>sqlite3 db.sqlite3
SQLite version 3.7.15.2 2013-01-09 11:53:05
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite> CREATE TABLE users (
 userId INTEGER PRIMARY KEY AUTOINCREMENT,
 userName VARCHAR(30) UNIQUE NOT NULL,
 password VARCHAR(20) NOT NULL
 );
sqlite>

 CREATE TABLE messages (
 messageId INTEGER PRIMARY KEY AUTOINCREMENT,
 body TEXT NOT NULL,
 createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 userIdSent INTEGER NOT NULL,
 userIdReceive INTEGER NOT NULL
 );
