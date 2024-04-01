const express = require('express');
const router = express.Router();

const DateController = require('../Controllers/Date.Controller');

const PriceController = require('../Controllers/Price.Controller');

router.post('/checkAvilabilityByDate', DateController.checkAvilabilityByDate);
router.post('/checkAvilabilityByData', DateController.checkAvilabilityByData);

router.post('/checkAvilability', DateController.checkAvilability);

router.get('/getBookingPrices', PriceController.getBookingPrices);

router.post('/getBookingPricesByDate', PriceController.getBookingPricesByDate);

module.exports = router;