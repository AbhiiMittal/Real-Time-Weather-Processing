const tempModel = require("../models/tempModel");
const summaryModel = require("../models/summaryModel");

const location = async (req, res) => {
  const cityName = req.body.cityName != undefined ? req.body.cityName : null;
  const apiKey = process.env.API_KEY;
  const zipCode = req.body.zipCode != undefined ? req.body.zipCode : null;
  const countryCode =
    req.body.countryCode != undefined ? req.body.countryCode : null;
  let data = null;
  try {
    if (cityName) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&APPID=${apiKey}`;
      const response = await fetch(url);
      data = await response.json();
    } else {
      const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${apiKey}`;
      const response = await fetch(url);
      data = await response.json();
    }
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

const getCityData = async (req, res) => {
  try{
    const city = req.params.cityName;
    const latestUpdate = await tempModel
      .findOne({ city: city})
      .sort({ dt: -1 })
      .limit(1);
      // console.log(latestUpdate)
    if (latestUpdate) {
      res.send(latestUpdate);
    } else {
      res.status(404).send({ message: "No data found for the selected city" });
    }
  }catch(error){
    console.log(error);
  }
};

const getSummary = async (req, res) => {
  try{
    const re = await summaryModel.find({ city: req.params.cityName})
    const data = {
      date : re[0].date,
      min_temp : re[0].min_temp,
      max_temp : re[0].max_temp,
      avg_temp : re[0].avg_temp,
      dominant_weather : re[0].dominant_weather,
    }
    res.send(data);
  }catch(error){
    console.log(error);
    res.send({error});
  }
};

const getAllData = async (req, res) => {
  try{
    const re = await tempModel.find({city : req.params.city});
    res.send(re);
  }catch(error){
    console.log(error);
    res.send({error});
  }
}
module.exports = { location, getCityData, getSummary, getAllData };
