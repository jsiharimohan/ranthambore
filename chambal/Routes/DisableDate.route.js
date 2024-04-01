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


const DisableDateController = require('../Controllers/DisableDate.Controller');

//Get a list of all products
router.get('/', DisableDateController.getAllDisableDates);

router.post('/import-csv', uploads.single('csv'), DisableDateController.uploadCsv);

//Create a new product
router.post('/', DisableDateController.createNewDisableDate);

//Get a product by id
router.get('/:id', DisableDateController.findDisableDateById);

//Update a product by id
router.patch('/:id', DisableDateController.updateADisableDate);

//Delete a product by id
router.delete('/:id', DisableDateController.deleteADisableDate);

module.exports = router;