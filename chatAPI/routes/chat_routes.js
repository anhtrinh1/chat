"use strict";
module.exports = function(app) {
    let chatModels = require('../models/chat');
    // todoList Routes
    app.route('/chat/getMessages').post(chatModels.get);
    app.route('/chat/sent').post(chatModels.sent);
  };