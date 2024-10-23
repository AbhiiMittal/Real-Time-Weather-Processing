const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  alertId : {
    type : Number
  },
  userId : {
    type : mongoose.Schema.Types.ObjectId,
    required : true
  },
  type: {
    type: String, // e.g., "temperature" or "weather"
    required: true,
  },
  threshold: {
    type: Number, // Temperature threshold if the condition is temperature-based
    default: null, // Default to null if not specified
  },
  consecutiveDays: {
    type: Number, // Number of consecutive days the condition must be met
    default: 1, // Default to 1 if not specified
  },
  targetWeather: {
    type: String, // Weather condition if the alert is weather-based (e.g., "Rainy")
    default: null, // Default to null if not
  },
  metDaysCount: {
    type: Number, // Track how many consecutive days the condition has been met
    default: 0,
  }
});

module.exports = mongoose.model('Alert', alertSchema);