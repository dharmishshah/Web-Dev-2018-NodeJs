var express = require('express');
var app = express();


var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));

app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.get('/message/:messageId', function(req, res) {
        var m = req.params['messageId']
        res.send(m)
});
app.get('/message', function(req, res) {

    res.send('helo worl')
});


//app.listen(3000);
