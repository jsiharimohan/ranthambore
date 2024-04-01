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
var storageZone = multer.diskStorage({  
  destination:(req,file,cb)=>{  
    cb(null,`./uploads`);  
  },  
  filename:(req,file,cb)=>{  
    console.log(req);
    cb(null,req.body.zone_id+'.csv');  
  }  
});  
var uploads = multer({storage:storage});
var uploadZone = multer({storage:storageZone});
const DateController = require('../Controllers/Date.Controller');

//Get a list of all dates
router.get('/', DateController.getAllDates);

//Create a new date
router.post('/', DateController.createNewDate);
router.post('/disable-zones', DateController.createNewDisableZones);

//Get a date by id
router.get('/:id', DateController.findDateById);

//Update a date by id
router.patch('/:id', DateController.updateADate);

//Update a date by id
router.put('/avilability/:id', DateController.updateAvilability);

router.post('/update-avilability', DateController.updateAvilabilityFront);

router.post('/import-csv', uploads.single('csv'), DateController.uploadCsv);
router.post('/import-zone-csv',uploadZone.single('csv'),DateController.uploadZoneCsv);
router.get('/getZoneDates/:id',DateController.getZoneDates);
router.post('/date-zone-delete/:id',DateController.dateZoneDelete);
//Delete a date by id
router.delete('/:id', DateController.deleteADate);

module.exports = router;