const mongoose = require("mongoose"),
    autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
autoIncrement.initialize(connection); // mongoose to connect db

// create schema 
const citiesSchema = new mongoose.Schema({
    // _id:false,
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
      
    },

    governorate_id: {
        type: Number,
        ref: "governorates"
    }
})
citiesSchema.plugin(autoIncrement.plugin, { model: 'cities', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("cities", citiesSchema) 