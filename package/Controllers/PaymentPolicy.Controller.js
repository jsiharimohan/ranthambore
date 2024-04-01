const createError = require('http-errors');
const mongoose = require('mongoose');

const Validator = require('validatorjs');

const PaymentPolicy = require('../Models/PaymentPolicy.model');

async function checkNameIsUnique(name) {

  totalPosts = await PaymentPolicy.find({ policy: name }).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllPaymentPolicys: async (req, res, next) => {
    try {

      var page = parseInt(req.query.page)||1;
      var size = parseInt(req.query.size)||15;
      var query = {}
      if(page < 0 || page === 0) {
        response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response);
      }
      query.skip = size * (page - 1);
      query.limit = size;

      var  totalPosts = await PaymentPolicy.find({}).countDocuments().exec();

      PaymentPolicy.find({},{},
        query,function(err,data) {
          if(err) {
            response = {"error": true, "message": "Error fetching data"+err};
          } else {
            response = {"error": false, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
          }
          res.json(response);
        }).sort({ $natural: -1 });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewPaymentPolicy: async (req, res, next) => {

    let rules = {
      policy: 'required',
    };

   const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return next(createError(400, 'Payment Policy Field Required!'));
    }

    var checkCount = await checkNameIsUnique(req.body.policy);

    if (checkCount) {
      return next(createError(400, 'Duplicate Payment Policy!'));
    }

    try {
      const pay_policy = new PaymentPolicy(req.body);
      const result = await pay_policy.save();
      res.send({
        success: true,
        message: 'Data inserted',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error.name === 'ValidationError') {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
  },

  findPaymentPolicyById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const pay_policy = await PaymentPolicy.findById(id);
      if (!pay_policy) {
        throw createError(404, 'PaymentPolicy does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: pay_policy
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid PaymentPolicy id'));
        return;
      }
      next(error);
    }
  },

  updateAPaymentPolicy: async (req, res, next) => {

    let rules = {
      policy: 'required',
    };

   const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.send({
        success: false,
        message: 'Validation failed',
        data: validation.errors
      });
    }

    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await PaymentPolicy.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'PaymentPolicy does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid PaymentPolicy Id'));
      }

      next(error);
    }
  },

  deleteAPaymentPolicy: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await PaymentPolicy.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'PaymentPolicy does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid PaymentPolicy id'));
        return;
      }
      next(error);
    }
  },
};