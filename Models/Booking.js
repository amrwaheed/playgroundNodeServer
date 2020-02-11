const mongoose = require("mongoose"),
autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_CONNECT, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });

autoIncrement.initialize(connection); // mongoose to connect db

// create schema 
const bookingSchema =new mongoose.Schema({
    _id:{
        type: Number ,
        required: true
        } ,
        hour:{
            type:Number,
            required: true,
            
        },
        day:{
            type:Number,
            required: true,
            default:1
            // default: () => Date.now() + 7*24*60*60*1000
        },
        user_id:{
            type:Number,
            required:true,
            ref:"users"
        },
        playground_id:{
            type:Number,
            required:true,
            ref:"playgrounds"
        }            
});
bookingSchema.plugin(autoIncrement.plugin, { model: 'bookings', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("bookings",bookingSchema);