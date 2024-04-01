const createError = require('http-errors');
const mongoose = require('mongoose');

const Validator = require('validatorjs');

const Term = require('../Models/Term.model');

async function checkNameIsUnique(name) {

  totalPosts = await Term.find({ term: name }).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllTerms: async (req, res, next) => {
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

      var  totalPosts = await Term.find({}).countDocuments().exec();

      Term.find({},{},
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

  createNewTerm: async (req, res, next) => {

    let rules = {
      term: 'required',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return next(createError(400, 'Term Field Required!'));
    }

    var checkCount = await checkNameIsUnique(req.body.term);

    if (checkCount) {
     return next(createError(400, 'Duplicate Term!'));
    }

    try {
      const terms = new Term(req.body);
      const result = await terms.save();
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

  findTermById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const terms = await Term.findById(id);
      if (!terms) {
        throw createError(404, 'Term does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: terms
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Term id'));
        return;
      }
      next(error);
    }
  },

  updateATerm: async (req, res, next) => {

    let rules = {
      term: 'required',
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

      const result = await Term.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Term does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Term Id'));
      }

      next(error);
    }
  },

  updateAvilability: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Term.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Term does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Term Id'));
      }

      next(error);
    }
  },

  deleteATerm: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Term.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Term does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Term id'));
        return;
      }
      next(error);
    }
  },
};