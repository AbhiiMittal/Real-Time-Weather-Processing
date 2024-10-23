const mongoose = require('mongoose');

const summaryModel = new mongoose.Schema({
    city: {
      type: String,
      required: true,
    },
    date: {
      type: String,
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
    avg_temp: {
      type: Number,
      required: true,
    },
    dominant_weather: {
      type: String,
      required: true,
    },
    weather_counts: {
      type: Map,
      of: Number, // A map to store weather conditions and their frequency counts
      default: {},
    },
    data_count: {
      type: Number,
      required: true,
      default: 0,
    },
  });
  
module.exports = mongoose.model('DailySummary', summaryModel);