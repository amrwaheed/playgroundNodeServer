const mongoose = require("mongoose"),
autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_CONNECT, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });

autoIncrement.initialize(connection); // mongoose to connect db

// create schema 
const availableHoursSchema =new mongoose.Schema({
    _id:{
        type: Number ,
       
        },
        time:{
            type:String,
            
            // default: () => Date.now() + 7*24*60*60*1000
        }
               
});
availableHoursSchema.plugin(autoIncrement.plugin, { model: 'availablehours', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("availablehours",availableHoursSchema);