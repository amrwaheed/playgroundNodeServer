const mongoose = require("mongoose"),
    autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
autoIncrement.initialize(connection); // mongoose to connect db

// create schema 
const governorateSchema = new mongoose.Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
     
    }
})
governorateSchema.plugin(autoIncrement.plugin, { model: 'governorates', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("governorates", governorateSchema) 