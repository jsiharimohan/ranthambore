const createError = require('http-errors');
const mongoose = require('mongoose');
const Validator = require('validatorjs');

const asyncHandler = require('../Middleware/asyncHandler')

const CancellationPolicy = require('../Models/CancellationPolicy.model');

async function checkNameIsUnique(name) {

  totalPosts = await CancellationPolicy.find({ policy: name }).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllCancellationPolicys: async (req, res, next) => {
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

      var  totalPosts = await CancellationPolicy.find({}).countDocuments().exec();

      CancellationPolicy.find({},{},
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

  createNewCancellationPolicy: asyncHandler(async (req, res, next) => {

    let rules = {
      policy: 'required',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return next(createError(400, 'Cancellation Policy Field Required!'));
    }

    var checkCount = await checkNameIsUnique(req.body.policy);

    if (checkCount) {
      return next(createError(400, 'Duplicate Cancellation Policy!'));
    }

    const cpolicy = new CancellationPolicy(req.body);
    const result = await cpolicy.save();
    res.send({
      success: true,
      message: 'Data inserted',
      data: result
    });
  }),

  findCancellationPolicyById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const cpolicy = await CancellationPolicy.findById(id);
      if (!cpolicy) {
        throw createError(404, 'Cancellation Policy does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: cpolicy
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Cancellation Policy id'));
        return;
      }
      next(error);
    }
  },

  updateACancellationPolicy: async (req, res, next) => {

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

      const result = await CancellationPolicy.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Cancellation Policy does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Cancellation Policy Id'));
      }

      next(error);
    }
  },

  deleteACancellationPolicy: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await CancellationPolicy.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Cancellation Policy does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Cancellation Policy id'));
        return;
      }
      next(error);
    }
  },
};