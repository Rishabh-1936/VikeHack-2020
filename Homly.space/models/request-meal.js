var mongoose = require('mongoose');
var mongoose_autopopulate = require('mongoose-autopopulate');

var requestSchema = new mongoose.Schema({
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Person',
            autopopulate: true
        },
        username: String
    },
    delivery_list: String,
    pay_method: String,
    delivery_delay: Number,
    additional_request: String,
    status: String
});
requestSchema.plugin(mongoose_autopopulate);

module.exports = new mongoose.model('Request', requestSchema);

// var mongoose = require('mongoose');
// var mongoose_autopopulate = require('mongoose-autopopulate');

// var requestSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Person'
//     },
//     delivery_list: String,
//     pay_method: String,
//     delivery_delay: Number,
//     additional_request: String,
//     status: String
// });

// module.exports = new mongoose.model('Request', requestSchema);