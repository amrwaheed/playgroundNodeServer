const mongoose = require("mongoose"),
autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
autoIncrement.initialize(connection); // mongoose to connect db

// create schema 
const playgroundSchema = new mongoose.Schema({
    _id: {
        type: Number ,
        required: true
        } ,
    name: {
        type: String ,
        required: true,
        min: 3,
        max: 255
    },
   
    image: {
        type: String ,
        required: true,
    },
    address: {
        governorate_id: {
            type: Number,
            required: true,
            ref:'governorates'

        },
        city_id: {
            type: Number,
            required: true,
            ref:'cities'
        }
    },
    location: {
        lat: {
            type: Number,
            required: true,

        },
        lng: {
            type: Number,
            required: true,
        }, 
        accuracy: {
            type: Number,
            required: true,
        } 
    },
    dayPrice: {
        type: Number,
        required: true,
    } , 
    nightPrice:  Number, 
    covered: {
        type: Boolean,
        required: true,
        default: false

    },
    details: {
        type: String,
        required: true
    },
    category_id: {
        type: Number,
        required: true
    },
    owner_id: {
        type: Number,
        required: true
    }
})
playgroundSchema.plugin(autoIncrement.plugin, { model: 'playgrounds', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("playgrounds",playgroundSchema) 