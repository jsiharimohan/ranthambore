const express = require('express');
const router = express.Router();

const CancellationPolicyController = require('../Controllers/CancellationPolicy.Controller');

//Get a list of all cancelation policys
router.get('/', CancellationPolicyController.getAllCancellationPolicys);

//Create a new cancelation policy
router.post('/', CancellationPolicyController.createNewCancellationPolicy);

//Get a cancelation policy by id
router.get('/:id', CancellationPolicyController.findCancellationPolicyById);

//Update a cancelation policy by id
router.patch('/:id', CancellationPolicyController.updateACancellationPolicy);

//Delete a cancelation policy by id
router.delete('/:id', CancellationPolicyController.deleteACancellationPolicy);

module.exports = router;