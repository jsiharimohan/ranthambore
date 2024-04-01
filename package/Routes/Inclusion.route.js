const express = require('express');
const router = express.Router();

const InclusionController = require('../Controllers/Inclusion.Controller');

//Get a list of all inclusions
router.get('/', InclusionController.getAllInclusions);

//Create a new inclusion
router.post('/', InclusionController.createNewInclusion);

//Get a inclusion by id
router.get('/:id', InclusionController.findInclusionById);

//Update a inclusion by id
router.patch('/:id', InclusionController.updateAInclusion);

//Delete a inclusion by id
router.delete('/:id', InclusionController.deleteAInclusion);

module.exports = router;