const express = require('express');
const router = express.Router();
const {setAlert, deleteAlert, getAlert} = require('../controllers/alert')

router.post('/setAlert',setAlert);
router.delete('/deleteAlert/:id/:userId',deleteAlert);
router.post('/getAlert',getAlert); 

module.exports = router;