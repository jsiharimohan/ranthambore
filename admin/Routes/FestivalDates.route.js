const express = require('express');
const router = express.Router();

const SettingController = require('../Controllers/Setting.Controller');

router.post('/add-festival',SettingController.AddFestivalDate);
router.get('/get-festivals',SettingController.getAllFestivalDates);
router.get('/get-festival/:id',SettingController.getFestivalById);
router.post('/update-festival/:id',SettingController.updateFestival);
router.get('/delete-festival/:id',SettingController.deleteDate);
module.exports = router;