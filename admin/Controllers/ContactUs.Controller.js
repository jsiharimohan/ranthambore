const createError = require('http-errors');
const mongoose = require('mongoose');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
  fetch(...args));

const ContactUs = require('../Models/ContactUs.model');

module.exports = {
  getAllContactUss: async (req, res, next) => {
    try {

      const filter_created_at = req.query.filter_created_at
        ? {
          createdAt: {
            $regex: req.query.filter_created_at
          }
        }
        : {};

      const filter_name = req.query.filter_name
        ? {
          name: {
            $regex: req.query.filter_name,
            $options: "i",
          },
        }
        : {};

      const filter_email = req.query.filter_email
        ? {
          email: {
            $regex: req.query.filter_email,
            $options: "i",
          }
        }
        : {};

      const filter_phone = req.query.filter_phone
        ? {
          phone: {
            $regex: req.query.filter_phone,
            $options: "i",
          }
        }
        : {};

      var page = parseInt(req.query.page) || 1;
      var size = parseInt(req.query.size) || 15;
      var type = req.query.type || 'general';
      var query = {}
      if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
      }
      query.skip = size * (page - 1);
      query.limit = size;

      var totalPosts = await ContactUs.find({ ...filter_email, ...filter_name, ...filter_phone, ...filter_created_at }).countDocuments().exec();

      const data = await ContactUs.find({ ...filter_email, ...filter_name, ...filter_phone, ...filter_created_at }, { createdAt: 0, updatedAt: 0, __v: 0 },
        query).sort({ $natural: -1 });

      if (!data) {
        response = { "error": true, "message": "Error fetching data" + err };
      } else {
        response = { "success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
      }

      return res.json(response);

    } catch (error) {
      console.log(error.message);
    }
  },

  createNewContactUs: async (req, res, next) => {
    try {

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;

      req.body.createdAt = today;

      const date = new ContactUs(req.body);

      const result = await date.save();
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

  deleteAContactUs: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await ContactUs.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'ContactUs does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid ContactUs id'));
        return;
      }
      next(error);
    }
  },
};