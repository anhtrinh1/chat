-Thao tác với dữ liệu
$ npm install --save bluebird

-Tạo table
C:\NodeJS\notes>sqlite3 db.sqlite3

 CREATE TABLE users (
 userId INTEGER PRIMARY KEY AUTOINCREMENT,
 userName VARCHAR(30) UNIQUE NOT NULL,
 password VARCHAR(20) NOT NULL
 );

 CREATE TABLE messages (
 messageId INTEGER PRIMARY KEY AUTOINCREMENT,
 body TEXT NOT NULL,
 createDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 userIdSent INTEGER NOT NULL,
 userIdReceive INTEGER NOT NULL
 );

https://viblo.asia/p/xay-dung-app-don-gian-voi-nodejs-expressjs-va-socketio-3Q75wqeeZWb