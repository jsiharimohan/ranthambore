const express = require('express');
const router = express.Router();

const PaymentController = require('../Controllers/Payment.Controller');

router.post('/safari/:id', PaymentController.updateSafariPayment);
router.post('/package/:id', PaymentController.updatePackagePayment);
router.post('/chambal/:id', PaymentController.updateChambalPayment);

module.exports = router;