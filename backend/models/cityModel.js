const mongoose = require('mongoose');

const cityModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // Ensure the city name is unique to prevent duplicates
  },
  userIds: [{
    type: mongoose.Schema.Types.ObjectId, // Array of userId references
    ref: 'User', // Reference to the User model
  }]
});

module.exports = mongoose.model("City", cityModel);
