const express = require('express');
const router = express.Router();

const EnquiryController = require('../Controllers/Enquiry.Controller');


router.get('/dashboard', EnquiryController.getAllEnquiesDashboard);

router.post('/save-enquery', EnquiryController.SveEnquiry);

router.get('/customer', EnquiryController.getAllEnquiriesCustomer);

router.get('/', EnquiryController.getAllEnquirys);

router.post('/', EnquiryController.createNewEnquiry);

//Get a enquery by id
router.get('/:id', EnquiryController.findEnquiryById);

//Delete a enquery by id
router.delete('/:id', EnquiryController.deleteAEnquiry);

module.exports = router;