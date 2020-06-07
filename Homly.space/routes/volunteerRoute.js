var express = require('express')
var route = express.Router();
var volunteerModel = require('../models/volunteer')

route.get('/signUp', (req, res) => {
    res.render('signUp-volunteer');
});

route.post('/signUp', (req, res) => {
    var obj = dataFetch(req);
    volunteerModel.create(new volunteerModel(obj), (err, volunteer) => {
        if (err) {
            console.log('Error in registering the volunteer', err);
            // return res.redirect('/volunteer/signUp', { msg: "Error in registering the volunteer" });
            return res.redirect('/volunteer/signUp');
        }

        else {
            console.log('Successful registration')
            return res.redirect('/volunteer/signUp');
            // return res.redirect('/volunteer/signUp', { msg: "Volunteer Registered Successfully" });
        }
    });

})


function dataFetch(req) {
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
        },
        maxDays: req.body.delivery_days,
        health: req.body.checking.length
    }
    return obj;
    // console.log(obj, req.body.delivery_days, req.body.checking)
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}


module.exports = route;