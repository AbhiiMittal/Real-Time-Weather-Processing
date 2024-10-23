const express = require('express');
const router = express.Router();
const {location, getCityData, getSummary, getAllData} = require('../controllers/location');
router.post('/report',location);
router.get('/currentData/:cityName',getCityData);
router.get('/summary/:cityName',getSummary);
router.get('/getAllData/:city',getAllData);

module.exports = router;