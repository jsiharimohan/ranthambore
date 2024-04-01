const express = require('express');
const router = express.Router();

const SeoManagerController = require('../Controllers/SeoManager.Controller');

router.get('/by-url/:url', SeoManagerController.getSeoDataByUrl);

router.get('/by-page/:page', SeoManagerController.getSeoDataByPage);

router.get('/', SeoManagerController.getAllSeoManagers);

router.post('/', SeoManagerController.createNewSeoManager);

//Get a seo manager by id
router.get('/:id', SeoManagerController.findSeoManagerById);

router.patch('/:id', SeoManagerController.updateASeoManager);

//Delete a seo manager by id
router.delete('/:id', SeoManagerController.deleteASeoManager);

module.exports = router;