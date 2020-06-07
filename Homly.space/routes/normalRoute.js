var express = require('express')
var route = express.Router();
var normal = require('../models/normal-person')

route.get('');












function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/login');
    }
}
module.exports = route;