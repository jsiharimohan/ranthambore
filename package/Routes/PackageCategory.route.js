const express = require('express');
const router = express.Router();

const PackageCategoryController = require('../Controllers/PackageCategory.Controller');

//Get a list of all packagecategorys
router.get('/', PackageCategoryController.getAllPackageCategorys);

//Create a new packagecategory
router.post('/', PackageCategoryController.createNewPackageCategory);

//Get a packagecategory by id
router.get('/:id', PackageCategoryController.findPackageCategoryById);

//Update a packagecategory by id
router.patch('/:id', PackageCategoryController.updateAPackageCategory);

//Delete a packagecategory by id
router.delete('/:id', PackageCategoryController.deleteAPackageCategory);

module.exports = router;