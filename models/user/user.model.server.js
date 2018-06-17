var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserById(userId) {
  return userModel.findById(userId);
}

function createUser(user) {
  return userModel.create(user);
}

function updateUser(userId, user){
    return userModel.update({
        _id: userId
    }, {
        $set: {firstName: user.username,
                lastName:user.lastName,
                email:user.email,
                username:user.username}
    });
}

function findAllUsers() {
  return userModel.find();
}

function findUserByUsername(username) {

}
function findUserByCredentials(
    username, password) {
  return userModel.findOne({username: username,password:password})

}


var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials
};

module.exports = api;