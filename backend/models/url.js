const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: String,
    longUrl: String,
    shortUrl: String,
    createdDate: {type:String, default: Date.now},
    lastOpened: {type:String, default: Date.now},
});

module.exports = mongoose.model('Url', urlSchema);