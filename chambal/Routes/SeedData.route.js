const express = require('express');
const router = express.Router();

const SeedDataController = require('../Controllers/SeedData.Controller');

router.get('/price', SeedDataController.seedPriceData);

module.exports = router;