var express = require('express')
var route = express.Router({ mergeParams: true });
var mealModel = require('../models/request-meal')
var non_volunteerModel = require('../models/normal-person')
var volunteerModel = require('../models/volunteer')


route.get('/', (req, res) => {

    if (req.session.isAuthenticated) {
        if (req.session.role == "normal") {
            non_volunteerModel
                .findById(req.session.userId)
                .populate('meal')
                .exec((err, meal) => {
                    console.log("meal ", meal)
                    res.render('status', { requests: meal });
                });
        }

        else if (req.session.role == "volunteer") {
            mealModel.find({ status: "Pending" }, (err, meals) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("===================================================")
                    volunteerModel.findById(req.session.userId, 'location', (err, user) => {
                        if (err) {
                            console.log(err);
                        } else {
                            // var [lat, lng] = user.location;
                            // console.log("user", user.location['lat']);
                            // console.log("user", user, req.session.userId);
                            res.render('status', { requests: meals, currentUserLoc: user });
                            // findDist(meals, user);
                        }
                    })
                }
            })
        }
    }
    else {
        res.render('login');
    }
});


function distance(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function findDist(meals, user) {
    var curLat = user.location['lat'];
    var curLng = user.location['lng'];

    for (let i = 0; i < 3; ++i) {
        var obj = meals[i].user.id["location"]
        console.log(" distance(curLat, curLng, obj['lat'], obj['lng'])", curLat, typeof (parseFloat(curLng)), typeof (obj['lat']), obj['lng']);
        meals[i]["diff"] = distance(curLat, curLng, obj['lat'], obj['lng'])
        console.log(meals[i]["diff"])
        console.log(meals);
    }

    // meals.forEach(ele => {
    //     var obj = ele.user.id["location"]
    //     ele["diff"] = distance(curLat, curLng, obj['lat'], obj['lng'])
    // });
    // console.log(meals);
}


function isLoggedIn(req, res, next) {
    if (req.session.isAuthenticated && req.session.role == "normal") {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = route;