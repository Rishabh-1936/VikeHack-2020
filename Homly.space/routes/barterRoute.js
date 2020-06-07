var express = require('express')
var route = express.Router({ mergeParams: true });
var barterModel = require('../models/barter');
var non_volunteerModel = require('../models/normal-person');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
var { traverse, non_Auth_traverse } = require('../public/js/distance');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({ storage: storage });

route.get('/', (req, res) => {

    barterModel.find().populate({ path: 'user' }).exec((err, data) => {
        var location = {};
        if (req.session.isAuthenticated) {
            non_volunteerModel.findById(req.session.userId, "location", (err, loc) => {
                location['curlat'] = loc.location['lat'];
                location['curlng'] = loc.location.lng;
                res.render("barter", { items: traverse(data, location) });
            })
        } else {
            res.render('barter', { items: non_Auth_traverse(data) });
        }
    });
});

route.get('/my/items', isLoggedIn, (req, res) => {

    non_volunteerModel.findById(req.session.userId).populate('barter').exec((err, data) => {
        res.render('my-barter', { items: data.barter, mode: "display" });
    });
});

route.get('/my/items/modify/:id', isLoggedIn, (req, res) => {

    barterModel.findById(req.params.id, (err, data) => {
        res.render('my-barter', { item: data, mode: "modify" });
    });
});

route.post('/my/items/modify/:id', isLoggedIn, (req, res) => {

    var obj = {
        pname: req.body.pname,
        pdesc: req.body.pdesc,
        pcategory: req.body.pcategory
    }
    barterModel.findByIdAndUpdate(req.params.id, obj, (err, data) => {
        // barterModel.updateOne({ _id: req.params.id }, obj, (err, data) => {
        res.redirect('/barter/my/items');
    });
});

route.get('/my/items/delete/:id', isLoggedIn, (req, res) => {

    barterModel.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/barter/my/items');
    });
});

route.post('/', isLoggedIn, upload.single('pimage'), (req, res, next) => {
    non_volunteerModel.findById(req.session.userId, (err, user) => {

        console.log('barter user', user);
        if (err) {
            console.log(err);
            res.redirect('/signUp');
        }
        else {
            var obj = {
                pname: req.body.pname,
                pdesc: req.body.pdesc,
                img: {
                    data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
                    contentType: 'image/png'
                },
                pcategory: req.body.pcategory
            }

            barterModel.create(obj, (err, barter_item) => {
                if (err) {
                    console.log(err)
                }
                else {
                    barter_item.user = req.session.userId;
                    barter_item.save();
                    // console.log('barter item', barter_item);
                    // console.log('user', user)

                    user.barter.push(barter_item)
                    user.save();
                    res.redirect('/barter');
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

// function distance(lat1, lon1, lat2, lon2) {
//     var p = 0.017453292519943295;    // Math.PI / 180
//     var c = Math.cos;
//     var a = 0.5 - c((lat2 - lat1) * p) / 2 +
//         c(lat1 * p) * c(lat2 * p) *
//         (1 - c((lon2 - lon1) * p)) / 2;

//     return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
// }

// function traverse(items, loc) {
//     let curlat = loc['curlat'];
//     let curlng = loc['curlng'];
//     var arr = [];

//     items.forEach(ele => {
//         arr.push({
//             ele: ele,
//             diff: distance(curlat, curlng, ele.user.location.lat, ele.user.location.lng)
//         })
//         arr.sort(function (a, b) {
//             return a.diff - b.diff
//         })

//     });
//     return arr;
// }

// function non_Auth_traverse(items) {

//     var arr = [];

//     items.forEach(ele => {
//         arr.push({
//             ele: ele,
//         })
//     });
//     return arr;
// }


module.exports = route;