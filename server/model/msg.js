const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    //普通消息
    name:{ type:String },
    time:{ type:String },
    msg:{type:String},
    type:{type:String},
    //音乐信息
    musicname:{type:String},
    author:{type:String},
    img:{type:String},
    url:{type:String},

})

module.exports = mongoose.model('msg',Schema)