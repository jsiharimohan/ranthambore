const createError = require('http-errors');
const mongoose = require('mongoose');

const Category = require('../Models/Category.model');

module.exports = {
  getAllCategorys: async (req, res, next) => {
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

      var  totalPosts = await Category.find({}).countDocuments().exec();

      Category.find({},{},
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

  createNewCategory: async (req, res, next) => {
    try {
      const package = new Category(req.body);
      const result = await package.save();
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

  findCategoryById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const package = await Category.findById(id);
      if (!date) {
        throw createError(404, 'Category does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: package
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Category id'));
        return;
      }
      next(error);
    }
  },

  updateACategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Category.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Category does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Category Id'));
      }

      next(error);
    }
  },

  deleteACategory: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Category.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Category does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Category id'));
        return;
      }
      next(error);
    }
  },
};