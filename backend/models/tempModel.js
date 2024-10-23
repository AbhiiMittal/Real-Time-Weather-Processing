const mongoose = require('mongoose');

const tempModel = new mongoose.Schema({
    city: {
        type: String,
        required: true
    },
    weather: {
        type: String,
        required: true
    },
    temp : {
        type : Number,
        required : true
    },
    feels_like : {
        type : Number,
        required : true
    },
    humidity : {
        type : Number,
        required : true
    },
    wind_speed : {
        type : Number,
        required : true
    },
    sunrise : {
        type : Number,
        required : true
    },
    sunset : {
        type : Number,
        required : true
    },
    dt :{
        type : Number,
        required : true
    }
});

module.exports = mongoose.model("temperature",tempModel);