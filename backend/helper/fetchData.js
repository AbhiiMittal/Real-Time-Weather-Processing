const cron = require("node-cron");
const cityModel = require("../models/cityModel");
const tempModel = require("../models/tempModel");
const summaryModel = require("../models/summaryModel");
const alertModel = require("../models/alertModel");
const {sendMail} = require('../helper/mailer');
const userModel = require("../models/userModel");
const forecastModel = require("../models/forecastModel");
require("dotenv").config();
const apiKey = process.env.API_KEY;



const checkAlerts = async (weatherData) => {
  const { city, temp, weather, dt } = weatherData;
  const alerts = await alertModel.find({ city});

  alerts.forEach(async (alert) => {
    let conditionMet = false;

    if (alert.condition === 'temperature' && temp > alert.threshold) {
      conditionMet = true;
    } else if (alert.condition === 'weather' && weather === alert.targetWeather) {
      conditionMet = true;
    }

    if (conditionMet) {
      alert.metDaysCount += 1; 
      if (alert.metDaysCount >= alert.consecutiveDays) {
        const user = await userModel.findOne({_id : alert.userId});
        sendAlertToUser(user.email, `Alert for ${city}: ${alert.condition} condition met!`);
        alert.metDaysCount = 0;
      }
    } else {
      alert.metDaysCount = 0;
    }

    await alert.save();
  });
};

const sendAlertToUser = (email, message) => {
  sendMail(email,"Weather Alert",message)
};




const updateCitySummary = async (data) => {
  const { city, weather, temp, feels_like, dt } = data;
  const date = new Date(dt * 1000).toISOString().split("T")[0];
  const summary = await summaryModel.findOne({ city, date });
  if (summary) {
    const updatedCount = summary.data_count + 1;
    const updatedAvgTemp =
      (summary.avg_temp * summary.data_count + temp) / updatedCount;
    const updatedMinTemp = Math.min(summary.min_temp, temp);
    const updatedMaxTemp = Math.max(summary.max_temp, temp);
    const weatherCounts = summary.weather_counts || {};
    weatherCounts[weather] = (weatherCounts[weather] || 0) + 1;

    const updatedDominantWeather = getDominantWeather(weatherCounts);

    summary.avg_temp = updatedAvgTemp;
    summary.min_temp = updatedMinTemp;
    summary.max_temp = updatedMaxTemp;
    summary.dominant_weather = updatedDominantWeather;
    summary.data_count = updatedCount;
    await summary.save();
  } else {
    const newSummary = {
      city,
      date,
      min_temp: temp,
      max_temp: temp,
      avg_temp: temp,
      dominant_weather: weather,
      weather_counts: { [weather]: 1 },
      data_count: 1,
    };
    await summaryModel.create(newSummary);
  }
};

const getDominantWeather = (weatherCounts) => {
  const weatherPriority = {
    thunderstorm: 5,
    snow: 4,
    rain: 3,
    cloudy: 2,
    clear: 1
  };

  let dominantWeather = null;
  let maxCount = 0;
  let maxPriority = 0;

  for (const [weather, count] of Object.entries(weatherCounts)) {
    const priority = weatherPriority[weather] || 0;
    if (priority > maxPriority || (priority === maxPriority && count > maxCount)) {
      dominantWeather = weather;
      maxCount = count;
      maxPriority = priority;
    }
  }

  return dominantWeather;
};


const fetchCityData = async (city) => {
  try {
    // Example API endpoint (replace with your actual API URL)
    const countryCode = "in";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=${apiKey}`;
    const response = await fetch(url);
    if (response.status==200) {
      const data = await response.json();
      const weather = {
        city: city,
        weather: data.weather[0].main,
        temp: data.main.temp,
        feels_like: data.main.feels_like,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        dt: data.dt,
      };
      await tempModel.create(weather);
      await updateCitySummary(weather);
      await checkAlerts(weather);
    } else {
      console.log(
        `Failed to retrieve data for ${city}. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error(
      `An error occurred while fetching data for ${city}:`,
      error.message
    );
  }
};

const startCityCycle = async () => {
  const cities = await cityModel.find().select("name -_id");
  let cityIndex = 0;
  const iterateCities = async () => {
    if (cityIndex < cities.length) {
      const city = cities[cityIndex].name;
      await fetchCityData(city);
      console.log("data fetched")
      cityIndex++;
      setTimeout(iterateCities, 10);
    } else {
      console.log("Completed iterating over all cities.");
    }
  };

  iterateCities();
};

const startForecast = async () => {
  const cities = await cityModel.find().select("name -_id");
  const callForecastForAllCities = async () => {
    for (let city of cities) {
      const cityName = city.name;
      await fetchForecastData(cityName);
      console.log(`Data fetched for ${cityName}`);
    }
    setTimeout(callForecastForAllCities, 24 * 60 * 60 * 1000); // 24 hours
  };
  callForecastForAllCities();
};



const fetchForecastData = async (city) => {
  try {
    const countryCode = "in";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${countryCode}&APPID=${apiKey}`;
    const response = await fetch(url);
    console.log("fetched");
    if (response.status==200) {
      const data = await response.json();
      const forecastData = data.list.map((item) => {
        return {
          city: city,
          weather: item.weather[0].main,
          temp: item.main.temp,
          min_temp: item.main.temp_min,
          max_temp: item.main.temp_max,
          dt: item.dt,
        };
      });
      await forecastModel.insertMany(forecastData);
    } else {
      console.log(
        `Failed to retrieve data for ${city}. Status code: ${response.status}`
      );
    }
  } catch (error) {
    console.error(
      `An error occurred while fetching data for ${city}:`,
      error.message
    );
  }
}



module.exports = { startCityCycle , startForecast };
