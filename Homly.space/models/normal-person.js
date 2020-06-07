var mongoose = require('mongoose');

var normalSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    address: {
        address: String,
        city: String,
        state: String,
        zip: Number
    },
    phone: Number,
    location: {
        lat: Number,
        lng: Number
    },
    meal: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Request'
        }
    ],
    barter: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Barter'
        }
    ],
    requestMade: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
    }]
});

// var model = mongoose.model('Registration', registration);
// module.exports = model;
module.exports = new mongoose.model('Person', normalSchema);