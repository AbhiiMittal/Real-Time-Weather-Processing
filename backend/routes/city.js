const express = require("express");
const { addCity, deleteCity, getCities } = require("../controllers/addCity");
const router = express.Router();

router.get("/cities/:id", getCities);
router.post("/cities", addCity);
router.delete("/cities/:name", deleteCity);
module.exports = router;
