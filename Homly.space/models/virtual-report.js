var mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person'
    },
    rname: String,
    reportFile: {
        data: Buffer,
        contentType: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: String,
    score: Number,
});


module.exports = new mongoose.model('VirtualReport', reportSchema);
