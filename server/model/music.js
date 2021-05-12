const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    musicname:{ type:String },
    author:{ type:String },
    url:{type:String},
    img:{type:String},
})

module.exports = mongoose.model('music',Schema)