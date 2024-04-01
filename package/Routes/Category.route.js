const express = require('express');
const router = express.Router();

const CategoryController = require('../Controllers/Category.Controller');

//Get a list of all categorys
router.get('/', CategoryController.getAllCategorys);

//Create a new category
router.post('/', CategoryController.createNewCategory);

//Get a category by id
router.get('/:id', CategoryController.findCategoryById);

//Update a category by id
router.patch('/:id', CategoryController.updateACategory);

//Delete a category by id
router.delete('/:id', CategoryController.deleteACategory);

module.exports = router;