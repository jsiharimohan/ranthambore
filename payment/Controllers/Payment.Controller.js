const createError = require('http-errors');
const mongoose = require('mongoose');

const Payment = require('../Models/Payment.model');

module.exports = {
  getAllPayments: async (req, res, next) => {
    var type = req.query.type || 'default';
    try {
      const results = await Payment.find({type: type}, { __v: 0 });
      res.send({
        success: true,
        message: 'Data fetched',
        data: results
      });
    } catch (error) {
      console.log(error.message);
    }
  },


  getBookingPayments: async (req, res, next) => {
    var type = req.query.type || 'default';
    try {
      const results = await Payment.find({type: type}, { __v: 0 });
      res.send({
        success: true,
        message: 'Data fetched',
        data: results
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewPayment: async (req, res, next) => {
    try {
      const price = new Payment(req.body);
      const result = await price.save();
      res.send({
        success: true,
        message: 'Data inserted',
        data: result
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findPaymentById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const price = await Payment.findById(id);
      if (!price) {
        throw createError(404, 'Payment does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: price
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Payment id'));
        return;
      }
      next(error);
    }
  },

  updateAPayment: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Payment.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Payment does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Payment Id'));
      }

      next(error);
    }
  },

  deleteAPayment: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Payment.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Payment does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Payment id'));
        return;
      }
      next(error);
    }
  }
};