const express = require('express');
const router = express.Router();

const SeedDataController = require('../Controllers/SeedData.Controller');

router.get('/zone-categories', SeedDataController.seedSeoData);

module.exports = router;