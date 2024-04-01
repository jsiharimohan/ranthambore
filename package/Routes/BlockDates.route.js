const express = require('express');
const router = express.Router();

const PackageController = require('../Controllers/Package.Controller');

router.post('/add-block-date',PackageController.AddBlockDate);
router.get('/block-dates',PackageController.getAllBlockDates);
router.get('/get-block-date/:id',PackageController.getBlockDateById);
router.post('/update-block-date/:id',PackageController.updateBlockDate);
router.get('/delete-block-date/:id',PackageController.deleteBlockDate);

module.exports = router;