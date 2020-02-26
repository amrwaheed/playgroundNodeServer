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
    firstName: {
        type: String ,
        required: true,
        min: 3,
        max: 255
    },
    lastName: {
        type: String ,
        required: true,
        min: 3,
        max: 255
    },
    username: {
        type: String ,
        required: true,
        min: 6,
        max: 255
    },

    email: {
        type: String,
        required: true,
        unique:true,
        min: 8,
        max: 255
    },
    phone: {
        type: Number,
        required: true,
        // min: 8,
        // max: 12
    },

    password: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },
    verificationCode:{
        type: String,
    },
    address: {
        governorate_id: {
              type: Number,
              ref:"governorates"
        },
        city_id: {
            type: Number,
            ref:"cities"
      }

    },
    type: {
        type: String,
        default: 'user'
    },
    date: {
        type: Date,
        default: Date.now
    },
    imageProfile: {
        type: String
    },
    
    flag:{
        type:Boolean,
        default:false
    }
    
})
userSchema.plugin(autoIncrement.plugin, { model: 'users', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("users",userSchema) 