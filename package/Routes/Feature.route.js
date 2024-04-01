const express = require('express');
const router = express.Router();

const FeatureController = require('../Controllers/Feature.Controller');

//Get a list of all features
router.get('/', FeatureController.getAllFeatures);

//Create a new feature
router.post('/', FeatureController.createNewFeature);

//Get a feature by id
router.get('/:id', FeatureController.findFeatureById);

//Update a feature by id
router.patch('/:id', FeatureController.updateAFeature);

//Delete a feature by id
router.delete('/:id', FeatureController.deleteAFeature);

module.exports = router;