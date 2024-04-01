const express = require('express');
const router = express.Router();

const BookingController = require('../Controllers/Booking.Controller');

router.get('/safari', BookingController.getAllSafariBookings);

router.delete('/safari/:id', BookingController.deleteSafariBooking);

router.delete('/package/:id', BookingController.deletePackageBooking);

router.delete('/chambal/:id', BookingController.deleteChambalBooking);

router.get('/safari/:id', BookingController.findSafariBookingById);

router.get('/package', BookingController.getAllPackageBookings);

router.get('/current/customers', BookingController.getCurrentBookingCustomers);
router.get('/current', BookingController.getCurrentBookings);
router.get('/current/:id', BookingController.getCurrentBooking);
router.post('/current', BookingController.saveCurrentBookings);
router.delete('/current/:id', BookingController.deleteCurrentBookings);

router.get('/package/:id', BookingController.findPackageBookingById);

router.get('/chambal', BookingController.getAllChambalBookings);

router.get('/chambal/:id', BookingController.findChambalBookingById);

module.exports = router;