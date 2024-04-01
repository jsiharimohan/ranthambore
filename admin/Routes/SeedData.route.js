const express = require('express');
const router = express.Router();

const SeedDataController = require('../Controllers/SeedData.Controller');

router.get('/seo', SeedDataController.seedSeoData);

module.exports = router;