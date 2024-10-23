const express = require("express");
const app = express();
const mongoose = require("mongoose");
const weatherReport = require("./routes/weatherReport");
const city = require("./routes/city");
const alertRoute = require("./routes/alertRoute");
const {startCityCycle, startForecast} = require("./helper/fetchData")
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const graphRoute = require("./routes/graphRoute");
const forecastModel = require("./models/forecastModel");
require("dotenv").config();


mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json())

app.use(cors());

// startCityCycle();

// startForecast();

app.use("/api", city);

app.use("/api", weatherReport);

app.use("/api", authRoute);

app.use("/api",alertRoute);

app.use("/api",graphRoute);

app.get("/api/forecast/:city", async(req,res)=>{
  const {city} = req.params;
  const data = await forecastModel.find({city : city});
  res.json(data);
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
