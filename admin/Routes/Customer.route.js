const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');


const CustomerController = require('../Controllers/Customer.Controller');

router.get('/', CustomerController.getAllCustomers);
router.get('/customers', CustomerController.getAllCustomersList);

router.delete('/:slug/:id', CustomerController.DeleteCustomers);

router.get('/dashboard', CustomerController.countAllCustomers);

router.post('/', CustomerController.createNewCustomer);

router.post('/safari', [
    body('booked_persons').isArray(),
    body('booked_persons.*.name', 'Booking Customers name required!').notEmpty(),
    body('booked_persons.*.gender', 'Booking Customers gender field required!').notEmpty(),
    body('booked_persons.*.nationality', 'Booking Customers nationality field required!').notEmpty(),
    body('booked_persons.*.id_proof', 'Booking Customers id_proof field required!').notEmpty(),
    body('booked_persons.*.idnumber', 'Booking Customers idnumber field required!').notEmpty(),
], CustomerController.createNewCustomerSafari);

router.post('/chambal', CustomerController.createNewCustomerChambal);

router.post('/package', CustomerController.createNewCustomerPackage);

module.exports = router;