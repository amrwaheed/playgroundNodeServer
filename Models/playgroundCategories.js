const mongoose = require("mongoose"),
autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
autoIncrement.initialize(connection); // mongoose to connect db


//schema 
const playgroundCaregoriesschbema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true
    },

    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }

});



playgroundCaregoriesschbema.plugin(autoIncrement.plugin, { model: 'playgroundCategories', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model('playgroundCategories', playgroundCaregoriesschbema);