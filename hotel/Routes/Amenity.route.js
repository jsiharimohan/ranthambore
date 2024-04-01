const express = require('express');
const router = express.Router();

var multer = require('multer');
const fs = require('fs');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/amenities';
    !fs.existsSync(dir) && fs.mkdirSync(dir, { recursive: true });
    return cb(null, dir)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });


const AmenityController = require('../Controllers/Amenity.Controller');

//Get a list of all products
router.get('/', AmenityController.getAllAmenities);

//Get a list of all products
router.get('/hotel', AmenityController.getAllAmenityHotel);


//Create a new product
router.post('/', uploads.single('image'), AmenityController.createNewAmenity);

//Get a product by id
router.get('/:id', AmenityController.findAmenityById);

//Update a product by id
router.patch('/:id', uploads.single('image'), AmenityController.updateAAmenity);

//Delete a product by id
router.delete('/:id', AmenityController.deleteAAmenity);

module.exports = router;