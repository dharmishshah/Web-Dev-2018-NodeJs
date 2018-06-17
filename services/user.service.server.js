module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.post('/api/profile', updateProfile);
  app.post('/api/user/findUserByCredentials', findUserByCredentials);

  var userModel = require('../models/user/user.model.server');

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

  function findUserByCredentials(req, res){
      var user = req.body;
      var username = user.username;
      var password = user.password;
      var user = userModel.findUserByCredentials(username, password).then(function (user){
          if(user){
              req.session['currentUser'] = user;
              res.json(user)
              res.send(user);
          }else{
            res.json('User not found');
          }

      })

  }

  function profile(req, res) {
    res.send(req.session['currentUser']);
  }

  function updateProfile(req, res){
      var user = req.body;
      var sessionUser = req.session['currentUser']
      var userId = sessionUser._id;
      userModel.updateUser(userId, user)
          .then(function (user) {
              res.send(user);
          })
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      })
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }
}
