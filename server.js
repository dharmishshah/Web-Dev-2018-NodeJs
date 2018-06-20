var express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_cp7fwdnc:n9f70lk4dkajehigpqaj2lgnf3@ds163300.mlab.com:63300/heroku_cp7fwdnc');

var app = express()



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://webdev-angular-2018.herokuapp.com");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


var session = require('express-session')
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'any string'
}));


app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/api/session/set/:name/:value',
  setSession);
app.get('/api/session/get/:name',
  getSession);
app.get('/api/session/logout',
    resetSession);
// app.get('/api/session/get',
//   getSessionAll);
// app.get('/api/session/reset',
//   resetSession);

function setSession(req, res) {
  var name = req.params['name'];
  var value = req.params['value'];
  req.session[name] = value;
  res.send(req.session);
}

function getSession(req, res) {
  var name = req.params['name'];
  var value = req.session[name];
  res.send(value);
}

function resetSession(req, res) {
    req.session['currentUser'] = {}
    req.session.destroy();
    res.send('session destroyed');
}


var userService = require('./services/user.service.server');
userService(app);

var sectionService = require('./services/section.service.server')(app);
userService(app);



app.listen(process.env.PORT || 4000);