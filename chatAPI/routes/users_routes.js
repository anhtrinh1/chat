"use strict";
module.exports = function(app) {
    let usersModels = require('../models/users');
    // todoList Routes
    app.route('/users/login')
      .post(usersModels.login);
    app.route('/users/getList').get(usersModels.getListUser);
  };