const express = require('express');
const router = express.Router();

const PriceController = require('../Controllers/Price.Controller');

const DisableDateController = require('../Controllers/DisableDate.Controller');

//Get a list of all products
router.get('/getBookingPrices', PriceController.getBookingPrices);

router.post('/getBookingPrice', PriceController.getBookingPrice);

router.get('/getDisableDates', DisableDateController.getDisableDates);

module.exports = router;