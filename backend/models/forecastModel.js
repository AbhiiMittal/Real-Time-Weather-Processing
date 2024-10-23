const mongoose = require("mongoose");

const forecastSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  weather: {
    type: String,
    required: true,
  },
  temp: {
    type: Number,
    required: true,
  },
  min_temp: {
    type: Number,
    required: true,
  },
  max_temp: {
    type: Number,
    required: true,
  },
  dt: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("forecast", forecastSchema);
