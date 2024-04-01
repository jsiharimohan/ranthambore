const express = require('express');
const router = express.Router();

const PaymentController = require('../Controllers/Payment.Controller');

router.post('/', PaymentController.createNewPayment);

module.exports = router;