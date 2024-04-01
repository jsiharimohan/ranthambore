const express = require('express');
const router = express.Router();
const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({  
  destination:(req,file,cb)=>{  
    cb(null, 'uploads/hotels/rooms/');  
  },  
  filename:(req,file,cb)=>{  
    cb(null,file.originalname);  
  }  
});  
var uploads = multer({storage:storage});


const HotelRoomController = require('../Controllers/HotelRoom.Controller');

//Get a list of all products
router.get('/', HotelRoomController.getAllHotelRooms);

//Create a new product
router.post('/', uploads.any(), HotelRoomController.createNewHotelRoom);

//Get a product by id
router.get('/:id', HotelRoomController.findHotelRoomById);

router.get('/:id/amenities', HotelRoomController.findHotelRoomAmenitiesById);

//Update a product by id
router.patch('/:id', uploads.any(), HotelRoomController.updateAHotelRoom);

router.patch('/:id/amenities', HotelRoomController.updateHotelRoomAmenities);

//Delete a product by id
router.delete('/:id', HotelRoomController.deleteAHotelRoom);

module.exports = router;