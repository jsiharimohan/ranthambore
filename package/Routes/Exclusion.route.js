const express = require('express');
const router = express.Router();

const ExclusionController = require('../Controllers/Exclusion.Controller');

//Get a list of all exclusions
router.get('/', ExclusionController.getAllExclusions);

//Create a new exclusion
router.post('/', ExclusionController.createNewExclusion);

//Get a exclusion by id
router.get('/:id', ExclusionController.findExclusionById);

//Update a exclusion by id
router.patch('/:id', ExclusionController.updateAExclusion);

//Delete a exclusion by id
router.delete('/:id', ExclusionController.deleteAExclusion);

module.exports = router;