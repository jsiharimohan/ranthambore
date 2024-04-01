const express = require('express');
const router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/packages/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const PackageController = require('../Controllers/Package.Controller');


//Get a list of all packages
router.get('/', PackageController.getAllPackages);

router.get('/front', PackageController.getAllPackagesFront);
router.get('/home', PackageController.getAllPackagesHome);

router.get('/dashboard', PackageController.countAllPackages);

router.get('/:id/categories', PackageController.getAllPackageCategories);

router.get('/:id/features', PackageController.getAllPackageFeatures);

router.get('/:id/inclusions', PackageController.getAllPackageInclusions);

router.get('/:id/exclusions', PackageController.getAllPackageExclusions);

router.get('/:id/iternaries', PackageController.getAllPackageIternaries);

//Create a new package
router.post('/', uploads.single('image'), PackageController.createNewPackage);

//Get a package by id
router.get('/:id', PackageController.findPackageById);

//Get a package by slug
router.get('/slug/:slug', PackageController.findPackageBySlug);

//Update a package by id
router.patch('/:id', uploads.single('image'), PackageController.updateAPackage);

router.patch('/:id/features', PackageController.updateAPackageFeatures);
router.patch('/:id/exclusions', PackageController.updateAPackageExclusions);
router.patch('/:id/inclusions', PackageController.updateAPackageInclusions);
router.patch('/:id/iternaries', PackageController.updateAPackageIternaries);

//Update a package by id
router.put('/avilability/:id', PackageController.updateAvilability);

//Delete a package by id
router.delete('/:id', PackageController.deleteAPackage);
router.post('/getOptions',PackageController.getOptionsByDate);
module.exports = router;