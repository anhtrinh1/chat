"use strict";
let chatModels = require('../models/chat');
module.exports = {    
    // todoList Routes
    // app.route('/chat/getMessages').post(chatModels.get);
    // app.route('/chat/sent').post(chatModels.sent);
    get(idSent, idReceive){
      var res = chatModels.get(idSent, idReceive);
      return res;
    },
    sent(body,idSent, idReceive) {
      var res = chatModels.sent(body,idSent, idReceive);
      return res;
    } 
}