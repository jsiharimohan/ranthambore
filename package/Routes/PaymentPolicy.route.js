const express = require('express');
const router = express.Router();

const PaymentPolicyController = require('../Controllers/PaymentPolicy.Controller');

//Get a list of all paymentpolicys
router.get('/', PaymentPolicyController.getAllPaymentPolicys);

//Create a new paymentpolicy
router.post('/', PaymentPolicyController.createNewPaymentPolicy);

//Get a paymentpolicy by id
router.get('/:id', PaymentPolicyController.findPaymentPolicyById);

//Update a paymentpolicy by id
router.patch('/:id', PaymentPolicyController.updateAPaymentPolicy);

//Delete a paymentpolicy by id
router.delete('/:id', PaymentPolicyController.deleteAPaymentPolicy);

module.exports = router;