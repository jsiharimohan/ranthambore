const express = require('express');
const router = express.Router();
const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null, 'uploads/hotels/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });


const HotelController = require('../Controllers/Hotel.Controller');

//Get a list of all products
router.get('/dashboard', HotelController.getAllHotelsCount);

router.get('/by-ids', HotelController.findHotelByIds);

router.get('/', HotelController.getAllHotels);
router.get('/front', HotelController.getAllHotelsFront);
router.get('/home', HotelController.getAllHotelsHome);

//Create a new product
router.post('/', uploads.any(), HotelController.createNewHotel);

//Get a product by id
router.get('/:id', HotelController.findHotelById);


router.get('/by-slug/:slug', HotelController.findHotelBySlug);

router.get('/:id/rooms', HotelController.findHotelRoomsById);

router.get('/:id/amenities', HotelController.findHotelAmenitiesById);

//Update a product by id
router.patch('/:id', uploads.any(), HotelController.updateAHotel);

router.put('/:id', HotelController.updateAHotelAvilability);

router.patch('/:id/amenities', HotelController.updateHotelAmenities);

//Delete a product by id
router.delete('/:id', HotelController.deleteAHotel);

router.delete('/image/:id', HotelController.deleteHotelImage);

module.exports = router;