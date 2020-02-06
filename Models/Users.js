const mongoose = require("mongoose"),
autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
autoIncrement.initialize(connection); // mongoose to connect db

// create schema 
const userSchema =new mongoose.Schema({
    _id:{
        type: Number ,
        required: true
        } ,
    name: {
        type: String ,
        required: true,
        min: 3,
        max: 255
    },

    email: {
        type: String,
        required: true,
        unique:true,
        min: 8,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },
    type: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    date: {
        type: Date,
        default: Date.now
    }
})
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("User",userSchema) 