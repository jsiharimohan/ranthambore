const express = require('express');
const router = express.Router();

const ContactUsController = require('../Controllers/ContactUs.Controller');

router.get('/', ContactUsController.getAllContactUss);

router.post('/', ContactUsController.createNewContactUs);

//Delete a enquery by id
router.delete('/:id', ContactUsController.deleteAContactUs);

module.exports = router;