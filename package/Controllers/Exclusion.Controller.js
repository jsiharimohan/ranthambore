const createError = require('http-errors');
const mongoose = require('mongoose');
const Validator = require('validatorjs');

const Exclusion = require('../Models/Exclusion.model');

async function checkNameIsUnique(name) {

  totalPosts = await Exclusion.countDocuments({ exclusion: name });
  if (totalPosts > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllExclusions: async (req, res, next) => {
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

      var  totalPosts = await Exclusion.find({}).countDocuments().exec();

      Exclusion.find({},{},
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

  createNewExclusion: async (req, res, next) => {

    let rules = {
      exclusion: 'required',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return next(createError(400, 'Exclusion Field Required!'));
    }

    var checkCount = await checkNameIsUnique(req.body.exclusion);

    if (checkCount) {
      return next(createError(400, 'Duplicate Exclusion!'));
    }

    try {
      const exclusion = new Exclusion(req.body);
      const result = await exclusion.save();
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

  findExclusionById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const exclusion = await Exclusion.findById(id);
      if (!exclusion) {
        throw createError(404, 'Exclusion does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: exclusion
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Exclusion id'));
        return;
      }
      next(error);
    }
  },

  updateAExclusion: async (req, res, next) => {

    let rules = {
      exclusion: 'required',
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

      const result = await Exclusion.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Exclusion does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Exclusion Id'));
      }

      next(error);
    }
  },

  deleteAExclusion: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Exclusion.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Exclusion does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Exclusion id'));
        return;
      }
      next(error);
    }
  },
};