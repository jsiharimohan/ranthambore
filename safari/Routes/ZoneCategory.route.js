const express = require('express');
const router = express.Router();
var multer      = require('multer');

var storage = multer.diskStorage({  
  destination:(req,file,cb)=>{  
    cb(null,'./uploads');  
  },  
  filename:(req,file,cb)=>{  
    cb(null,file.originalname);  
  }  
});  
var uploads = multer({storage:storage});

const ZoneCategoryController = require('../Controllers/ZoneCategory.Controller');

//Get a list of all dates
router.get('/front', ZoneCategoryController.getAllZoneCategorysFront);

router.get('/', ZoneCategoryController.getAllZoneCategorys);


//Create a new date
router.post('/', ZoneCategoryController.createNewZoneCategory);

//Get a date by id
router.get('/:id', ZoneCategoryController.findZoneCategoryById);

//Update a date by id
router.patch('/:id', ZoneCategoryController.updateAZoneCategory);

//Delete a date by id
router.delete('/:id', ZoneCategoryController.deleteAZoneCategory);

module.exports = router;