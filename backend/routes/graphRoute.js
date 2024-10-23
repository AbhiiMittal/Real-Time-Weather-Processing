const express = require('express');
const router = express.Router();
const {sevenDay} = require('../controllers/graphData');

router.get('/sevenDay/:city', sevenDay);

module.exports = router;