var mongoose = require('mongoose');

var volunteerSchema = new mongoose.Schema({
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
    maxDays: Number,
    health: Number,

    requestTaken: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
    }],

    currentRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
    }
});

module.exports = new mongoose.model('Volunteer', volunteerSchema);

// lat: mongoose.Decimal128,
// lng: mongoose.Decimal128