var mongoose = require('mongoose');

// var barterSchema = new mongoose.Schema({
//     user: {
//         id: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Person'
//         },
//         username: String
//     },
//     pname: String,
//     pdesc: String,
//     img:
//         { data: Buffer, contentType: String },
//     pcategory: String
// });


var barterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    pname: String,
    pdesc: String,
    img:
        { data: Buffer, contentType: String },
    pcategory: String
});


module.exports = new mongoose.model('Barter', barterSchema);
