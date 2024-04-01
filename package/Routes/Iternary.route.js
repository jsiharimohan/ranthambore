const express = require('express');
const router = express.Router();

const IternaryController = require('../Controllers/Iternary.Controller');

//Get a list of all iternarys
router.get('/', IternaryController.getAllIternarys);

//Create a new iternary
router.post('/', IternaryController.createNewIternary);

//Get a iternary by id
router.get('/:id', IternaryController.findIternaryById);

//Update a iternary by id
router.patch('/:id', IternaryController.updateAIternary);

//Delete a iternary by id
router.delete('/:id', IternaryController.deleteAIternary);

module.exports = router;