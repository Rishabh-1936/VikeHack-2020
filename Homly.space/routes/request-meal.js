var express = require('express')
var route = express.Router({ mergeParams: true });
var mealModel = require('../models/request-meal')
var non_volunteerModel = require('../models/normal-person')


route.get('/', (req, res) => {

    if (req.session.isAuthenticated) {
        if (req.session.role == "normal") {
            non_volunteerModel.findById(req.session.userId, function (err, user) {
                if (err || user.length == 0) {
                    req.session.msg = "Error in Login !!!. Please Login Again.";
                    console.log(err);
                    res.redirect('/request')
                }
                else {
                    req.session.msg = "Logged in";
                    console.log('user', user)
                    res.render('request-meal');
                }
            });
        }
        else {
            res.render('request-meal');
        }
    } else {
        res.render('request-meal');
    }

});

route.post('/', isLoggedIn, (req, res) => {
    non_volunteerModel.findById(req.session.userId, (err, user) => {
        if (err || user.length == 0) {
            req.session.msg = "Error in Login !!!. Please Login Again.";
            console.log(err);
            res.redirect('/login');
        }
        else {

            var obj = {
                delivery_list: req.body.delivery_list,
                pay_method: req.body.pay_method,
                delivery_delay: req.body.delivery_delay,
                additional_request: req.body.additional_request,
                status: 'Pending'
            }

            mealModel.create(obj, (err, delivery) => {
                if (err) {
                    console.log(err)
                }
                else {
                    delivery.user.id = req.session.userId;
                    delivery.user.username = req.session.user;
                    delivery.save();
                    user.meal.push(delivery)
                    user.save();
                    res.redirect('/status');
                }
            })
        }
    });
});


function isLoggedIn(req, res, next) {
    if (req.session.isAuthenticated && req.session.role == "normal") {
        req.session.msg = "Logged_in";
        return next();
    } else {
        req.session.msg = "Error !!!. Please Login";
        res.redirect('/login');
    }
}
module.exports = route;