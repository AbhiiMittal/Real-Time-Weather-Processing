const alertModel = require('../models/alertModel');
const setAlert = async (req, res) => {
  const alertData = req.body.alertData;
  let alert;  // Declare the alert variable outside the if-else blocks
  
  try {
    if (alertData.type === "temperature") {
      alert = new alertModel({
        city: alertData.city,
        type: alertData.type,
        condition: alertData.condition,
        consecutiveDays: alertData.days,
        userId: alertData.userId,
        alertId: alertData.alertId,
        threshold: alertData.threshold,
      });
    } else {
      alert = new alertModel({
        city: alertData.city,
        type: alertData.type,
        userId: alertData.userId,
        alertId: alertData.alertId,
        targetWeather: alertData.condition,
      });
    }
    console.log(alert);
    await alert.save().then((result) => {
      console.log(result);
    });
    return res.status(201).json({ message: 'Alert created successfully!', alert });
  } catch (error) {
    res.status(400).json({ message: 'Error creating alert', error: error.message });
  }
};


const getAlert = async (req, res) => {
  try {
    const userId = req.body.userId;
    const alerts = await alertModel.find({ userId: userId });

    // If no alerts are found, return a not-found response
    if (alerts.length === 0) {
      return res.status(200).json([]);
    }

    // Map through each alert and structure the response data accordingly
    const alertData = alerts.map(alert => {
      if (alert.condition === "weather") {
        return {
          id : alert.alertId,
          city: alert.city,
          type : alert.type,
          condition: alert.condition,
          targetWeather: alert.targetWeather,
        };
      } else {
        return {
          id : alert.alertId,
          city: alert.city,
          type : alert.type,
          condition: alert.condition,
          threshold: alert.threshold,
          consecutiveDays: alert.consecutiveDays,
        };
      }
    });

    res.status(200).json(alertData);
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};


const deleteAlert = async (req, res) => {
  const id = req.params.id; // Assuming this is the alert's ID
  const userId = req.params.userId; // User ID is also passed as a parameter
  try {
    // First, find the alert by its ID to ensure it exists
    const alert = await alertModel.findOne({ alertId: id, userId: userId });
    // console.log("done");
    if (alert) {
      // If the alert exists, delete it
      await alertModel.deleteOne({ alertId: id, userId: userId });
      res.status(200).json({ message: 'Alert deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Alert not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting alert', error: error.message });
  }
}


module.exports = {setAlert, deleteAlert, getAlert}