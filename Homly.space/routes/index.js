var express = require('express')
var route = express.Router();
var volunteerModel = require('../models/volunteer')
var non_volunteerModel = require('../models/normal-person')

route.get('/', (req, res) => {
    req.session.msg = "";
    console.log('Home', req.session.userId, req.session.user)
    res.render('home')
})

route.get('/signUp', (req, res) => {
    console.log('hi')
    req.session.msg = "";
    res.render('login-register');
});

route.post('/signUp', (req, res) => {

    var type = req.body.signUp_category;
    var obj = dataFetch(req, type);

    if (type == "volunteer") {
        volunteerModel.create(new volunteerModel(obj), (err, volunteer) => {
            if (err) {
                console.log('Error in registering the volunteer', err);
                req.session.msg = "Error in Registration";
                return res.redirect('/signUp');
            }
            else {
                req.session.msg = "User registered successfully.Please Login.";
                console.log('Successful registration');
                return res.redirect('/login');//redirect to login page for login
            }
        });
    }
    else if (type == "normal") {
        non_volunteerModel.create(new volunteerModel(obj), (err, volunteer) => {
            if (err || volunteer.length == 0) {
                req.session.msg = "Error in Registration";
                console.log('Error in registering the volunteer', err);
                return res.redirect('/signUp');
            }
            else {
                console.log('Successful registration')
                req.session.msg = "User registered successfully.Please Login.";
                return res.redirect('/login');
            }
        });
    }
})

route.get('/login', (req, res) => {
    req.session.msg = "";
    res.render('login-register');
});

route.post('/login', (req, res) => {

    if (req.body.login_category == "volunteer") {

        volunteerModel.find({ email: req.body.email, password: req.body.password }, (err, user) => {
            if (err || user.length == 0) {
                req.session.msg = "Error !!!. Credentials are not correct";
                console.log('Credentials are not correct', err)
                res.redirect('/login');
            }
            else {
                req.session.msg = "Successful login";
                console.log('Successful login', user);

                req.session.isAuthenticated = true;
                req.session.role = "volunteer";
                req.session.user = user[0].fname + user[0].lname;
                req.session.userId = user[0]._id;
                res.redirect('/');
            }
        });

    }
    else if (req.body.login_category == "normal") {
        non_volunteerModel.find({ email: req.body.email, password: req.body.password }, (err, user) => {
            if (err || user.length == 0) {
                req.session.msg = "Error !!!. Credentials are not correct";
                console.log('Credentials are not correct', err)
                res.redirect('/login');
            }
            else {
                req.session.msg = "Successful login";
                console.log('Successful login', user[0]._id);

                req.session.isAuthenticated = true;
                req.session.role = "normal";
                req.session.user = user[0].fname + user[0].lname;
                req.session.userId = user[0]._id;

                res.redirect('/');
            }
        });
    }
})

route.get('/logout', (req, res) => {
    // req.session.isAuthenticated = false;
    // req.session.role = "";
    // req.session.user = "";
    // req.session._id = "";
    req.session = null;

    res.redirect('/');
});

function dataFetch(req, type) {
    var obj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        address: {
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        },
        phone: req.body.phone,
        location: {
            lat: req.body.latitude,
            lng: req.body.longitude,
        }
    }
    if (type == "volunteer") {
        obj["maxDays"] = req.body.delivery_days;
        obj["health"] = req.body.checking.length;
    }
    return obj;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}



module.exports = route;