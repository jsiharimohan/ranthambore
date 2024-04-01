const express = require('express');
const router = express.Router();

const TermController = require('../Controllers/Term.Controller');

//Get a list of all dtermss
router.get('/', TermController.getAllTerms);

//Create a new dterms
router.post('/', TermController.createNewTerm);

//Get a dterms by id
router.get('/:id', TermController.findTermById);

//Update a dterms by id
router.patch('/:id', TermController.updateATerm);

//Delete a dterms by id
router.delete('/:id', TermController.deleteATerm);

module.exports = router;