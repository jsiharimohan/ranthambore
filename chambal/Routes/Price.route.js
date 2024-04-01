const express = require('express');
const router = express.Router();

const PriceController = require('../Controllers/Price.Controller');

//Get a list of all products
router.get('/', PriceController.getAllPrices);

//Create a new product
router.post('/', PriceController.createNewPrice);

//Get a product by id
router.get('/:id', PriceController.findPriceById);

//Update a product by id
router.patch('/:id', PriceController.updateAPrice);

//Delete a product by id
router.delete('/:id', PriceController.deleteAPrice);

module.exports = router;