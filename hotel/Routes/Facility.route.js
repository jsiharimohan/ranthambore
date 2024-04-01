const express = require('express');
const router = express.Router();

const FacilityController = require('../Controllers/Facility.Controller');

//Get a list of all products
router.get('/', FacilityController.getAllFacilitys);

//Create a new product
router.post('/', FacilityController.createNewFacility);

//Get a product by id
router.get('/:id', FacilityController.findFacilityById);

//Update a product by id
router.patch('/:id', FacilityController.updateAFacility);

//Delete a product by id
router.delete('/:id', FacilityController.deleteAFacility);

module.exports = router;