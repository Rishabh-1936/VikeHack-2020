
var cookieSession = require('cookie-session')
var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var ejs = require('ejs')
var session = require('express-session')
require('dotenv/config');

app.use(cookieSession({
    name: 'session',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set("view engine", "ejs");

app.use("/public", express.static(__dirname + '/public'));

mongoose.set('useFindAndModify', false);
// console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    })


app.use(function (req, res, next) {
    res.locals.currentUser = req.session.user;
    res.locals.isAuthenticated = req.session.isAuthenticated;
    res.locals.role = req.session.role;
    res.locals.msg = req.session.msg;
    console.log(' -> ', req.session.user, req.session.isAuthenticated)
    console.log("msg", req.session.msg)
    next();
})

var indexRoute = require('./routes/index');
var barterRoute = require('./routes/barterRoute');
var requestRoute = require('./routes/request-meal');
var shelterRoute = require('./routes/requestShelter');
var statusRoute = require('./routes/status');
var covidRoutes = require('./routes/covidRoutes');

app.use('/', indexRoute);
app.use('/status', statusRoute);
app.use('/barter', barterRoute);
app.use('/request/food', requestRoute);
app.use('/request/shelter', shelterRoute);
app.use('/covid', covidRoutes);


app.get('/signUp/volunteer', (req, res) => {
    res.render('signUp-volunteer')
})

app.post('/signUp/volunteer', (req, res) => {
    // dataFetch(req) 
})



app.listen('3000' || process.env.PORT, err => {
    if (err)
        throw err
    console.log('Server started')
})
