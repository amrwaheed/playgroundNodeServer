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
   
    uploadImages: {
        type: String ,
      
    },
    address: {
        governorate_id: {
            type: Number,
            ref:'governorates'

        },
        city_id: {
            type: Number,
            ref:'cities'
        }
    },
    // location: {
    //     lat: {
    //         type: Number

    //     },
    //     lng: {
    //         type: Number,
           
    //     }, 
    //     accuracy: {
    //         type: Number,
           
    //     } 
    // },
    dayPrice: {
        type: Number,
        
    } , 
    nightPrice:  Number, 
    covered: {
        type: Boolean,
        default: false

    },
    details: {
        type: String,
   
    },
    category_id: {
        type: Number,
       
        ref: "playgroundCategories"
    },
    owner_id: {
        type: Number,
        
        ref:"owners"
    }
})
playgroundSchema.plugin(autoIncrement.plugin, { model: 'playgrounds', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("playgrounds",playgroundSchema) 