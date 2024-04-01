const createError = require('http-errors');
const mongoose = require('mongoose');

const asyncHandler = require('../Middleware/asyncHandler')

const Customer = require('../Models/Customer.model');
const SafariBooking = require('../Models/SafariBooking.model');
const PackageBooking = require('../Models/PackageBooking.model');
const ChambalBooking = require('../Models/ChambalBooking.model');
const BookingCustomer = require('../Models/BookingCustomer.model');
const CurrentBooking = require('../Models/CurrentBooking.model');


module.exports = {
  getAllSafariBookings: asyncHandler(async (req, res, next) => {

    const filter_date = req.query.filter_date
        ? {
          date: {
            $regex: req.query.filter_date
          },
        }
        : {};

    const filter_created_at = req.query.filter_created_at
      ? {
        addedAt: {
          $regex: req.query.filter_created_at
        }
      }
      : {};


    const filter_name = req.query.filter_name
        ? {
          customer_name: {
            $regex: req.query.filter_name,
            $options: "i",
          },
        }
        : {};

    const filter_customer = req.query.filter_customer
        ? {
          customer_id: req.query.filter_customer
        }
        : {};

      const filter_email = req.query.filter_email
        ? {
          customer_email: {
            $regex: req.query.filter_email,
            $options: "i",
          },
        }
        : {};

      const filter_mobile = req.query.filter_mobile
        ? {
          customer_mobile: {
            $regex: req.query.filter_mobile,
            $options: "i",
          }
        }
        : {};

    const filter_zone = req.query.filter_zone
      ? {
          zone : req.query.filter_zone
      }
      : {};

    const filter_status = req.query.filter_status
      ? {
        status: req.query.filter_status
      }
      : {};

    const filter_vehicle = req.query.filter_vehicle
      ? {
        vehicle: req.query.filter_vehicle
      }
      : {};

    const filter_timing = req.query.filter_timing
      ? {
        timing: req.query.filter_timing
      }
      : {};

    var page = parseInt(req.query.page)||1;
    var size = parseInt(req.query.size)||15;

    var query = {}
    if(page < 0 || page === 0) {
      response = {"error" : true,"message" : "invalid page number, should start with 1"};
      return res.json(response);
    }
    query.skip = size * (page - 1);
    query.limit = size;

    var  totalPosts = await SafariBooking.find({...filter_date, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing, ...filter_email, ...filter_mobile, ...filter_name, ...filter_customer}).countDocuments().exec();

    SafariBooking.find({...filter_date, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing, ...filter_email, ...filter_mobile, ...filter_name, ...filter_customer},{booking_customers: 0, customer: 0, __v: 0},
      query,function(err,data) {
        if(err) {
          response = {"error": true, "message": "Error fetching data"+err};
        } else {
          response = {"success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
        }
        res.json(response);
      }).sort({ $natural: -1 });
  }),


  getAllPackageBookings: asyncHandler(async (req, res, next) => {

    const filter_date = req.query.filter_date
        ? {
          date: {
            $regex: req.query.filter_date
          },
        }
        : {};

    const filter_created_at = req.query.filter_created_at
      ? {
        addedAt: {
          $regex: req.query.filter_created_at
        }
      }
      : {};


    const filter_name = req.query.filter_name
        ? {
          customer_name: {
            $regex: req.query.filter_name,
            $options: "i",
          },
        }
        : {};

    const filter_customer = req.query.filter_customer
        ? {
          customer_id: req.query.filter_customer
        }
        : {};

      const filter_email = req.query.filter_email
        ? {
          customer_email: {
            $regex: req.query.filter_email,
            $options: "i",
          },
        }
        : {};

      const filter_mobile = req.query.filter_mobile
        ? {
          customer_mobile: {
            $regex: req.query.filter_mobile,
            $options: "i",
          }
        }
        : {};

    const filter_zone = req.query.filter_zone
      ? {
          zone : req.query.filter_zone
      }
      : {};

    const filter_status = req.query.filter_status
      ? {
        status: req.query.filter_status
      }
      : {};

    const filter_vehicle = req.query.filter_vehicle
      ? {
        vehicle: req.query.filter_vehicle
      }
      : {};

    const filter_timing = req.query.filter_timing
      ? {
        timing: req.query.filter_timing
      }
      : {};

    var page = parseInt(req.query.page)||1;
    var size = parseInt(req.query.size)||15;

    var query = {}
    if(page < 0 || page === 0) {
      response = {"error" : true,"message" : "invalid page number, should start with 1"};
      return res.json(response);
    }
    query.skip = size * (page - 1);
    query.limit = size;

    var  totalPosts = await PackageBooking.find({...filter_date, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing, ...filter_email, ...filter_mobile, ...filter_name, ...filter_customer}).countDocuments().exec();

    PackageBooking.find({...filter_date, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing, ...filter_email, ...filter_mobile, ...filter_name, ...filter_customer},{ booking_customers: 0, customer: 0, __v: 0, updatedAt: 0},
      query,function(err,data) {
        if(err) {
          response = {"error": true, "message": "Error fetching data"+err};
        } else {
          response = {"success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
        }
        res.json(response);
      }).sort({ $natural: -1 });
  }),

  getAllChambalBookings: asyncHandler(async (req, res, next) => {

    const filter_date = req.query.filter_date
        ? {
          date: {
            $regex: req.query.filter_date
          },
        }
        : {};

    const filter_created_at = req.query.filter_created_at
      ? {
        addedAt: {
          $regex: req.query.filter_created_at
        }
      }
      : {};


    const filter_name = req.query.filter_name
        ? {
          customer_name: {
            $regex: req.query.filter_name,
            $options: "i",
          },
        }
        : {};

    const filter_customer = req.query.filter_customer
        ? {
          customer_id: req.query.filter_customer
        }
        : {};

      const filter_email = req.query.filter_email
        ? {
          customer_email: {
            $regex: req.query.filter_email,
            $options: "i",
          },
        }
        : {};

      const filter_mobile = req.query.filter_mobile
        ? {
          customer_mobile: {
            $regex: req.query.filter_mobile,
            $options: "i",
          }
        }
        : {};

    const filter_zone = req.query.filter_zone
      ? {
          zone : req.query.filter_zone
      }
      : {};

    const filter_status = req.query.filter_status
      ? {
        status: req.query.filter_status
      }
      : {};

    const filter_vehicle = req.query.filter_vehicle
      ? {
        vehicle: req.query.filter_vehicle
      }
      : {};

    const filter_timing = req.query.filter_timing
      ? {
        time: {
            $regex: req.query.filter_timing,
            $options: "i",
          }
      }
      : {};

    var page = parseInt(req.query.page)||1;
    var size = parseInt(req.query.size)||15;

    var query = {}
    if(page < 0 || page === 0) {
      response = {"error" : true,"message" : "invalid page number, should start with 1"};
      return res.json(response);
    }
    query.skip = size * (page - 1);
    query.limit = size;

    var  totalPosts = await ChambalBooking.find({...filter_date, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing, ...filter_email, ...filter_mobile, ...filter_name, ...filter_customer}).countDocuments().exec();

    ChambalBooking.find({...filter_date, ...filter_created_at, ...filter_zone, ...filter_status, ...filter_vehicle, ...filter_timing, ...filter_email, ...filter_mobile, ...filter_name, ...filter_customer},{booking_customers: 0, customer: 0, __v: 0, updatedAt: 0},
      query,function(err,data) {
        if(err) {
          response = {"error": true, "message": "Error fetching data"+err};
        } else {
          response = {"success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
        }
        res.json(response);
      }).sort({ $natural: -1 }).populate(['customer']);
  }),

  findSafariBookingById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await SafariBooking.findById(id, '_id date customer_id customer zone booking_customers vehicle timing amount transaction_id status addedAt createdAt').populate(['booking_customers','customer']);
      if (!result) {
        throw createError(404, 'Customer does not exist.');
      }

      await SafariBooking.updateOne({_id : id},{seen: 1});

      res.send({
          success: true,
          message: "data fetched",
          data: result
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  },

  findPackageBookingById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await PackageBooking.findById(id, '_id date package_name category_name customer_name customer_email customer_mobile nationality_type room_type package_option_id no_of_kids no_of_rooms no_of_adult price amount status createdAt transaction_id').populate(['customer']);
      if (!result) {
        throw createError(404, 'Customer does not exist!.');
      }

      await PackageBooking.updateOne({_id : id},{seen: 1});

      res.send({
          success: true,
          message: "data fetched",
          data: result
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  },

  findChambalBookingById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await ChambalBooking.findById(id,'_id date zone customer booking_name booking_option vehicle time amount id_proof_no no_of_persons_indian no_of_persons_foreigner transaction_id createdAt').populate(['customer']);
      if (!result) {
        throw createError(404, 'Customer does not exist.');
      }

      await ChambalBooking.updateOne({_id : id},{seen: 1});
      
      res.send({
          success: true,
          message: "data fetched",
          data: result
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  },

  deleteSafariBooking: async (req, res, next) => {
    const id = req.params.id;
    try {

      const resultDelete = await BookingCustomer.deleteMany({booking_id: id});

      const result = await SafariBooking.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Safari booking does not exist.');
      }
      res.send({
          success: true,
          message: "data deleted",
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Safari booking id'));
        return;
      }
      next(error);
    }
  },

  deletePackageBooking: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await PackageBooking.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Package Booking does not exist.');
      }
      res.send({
          success: true,
          message: "data deleted",
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Package Booking id'));
        return;
      }
      next(error);
    }
  },

  deleteChambalBooking: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await ChambalBooking.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Chambal Booking does not exist.');
      }
      res.send({
          success: true,
          message: "data deleted",
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Chambal Booking id'));
        return;
      }
      next(error);
    }
  },

  saveCurrentBookings: async (req, res, next) => {
    try {

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;

      req.body.addedAt = today;

      const date = new CurrentBooking(req.body);

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

  getCurrentBookings: async (req, res, next) => {
    try {

      const filter_zone = req.query.filter_zone
      ? {
          zone : req.query.filter_zone
      }
      : {};

    const filter_vehicle = req.query.filter_vehicle
      ? {
        vehicle: req.query.filter_vehicle
      }
      : {};

    const filter_timing = req.query.filter_timing
      ? {
        time: req.query.filter_timing
      }
      : {};

      const filter_date = req.query.filter_date
        ? {
          date: {
            $regex: req.query.filter_date
          },
        }
        : {};

      const filter_created_at = req.query.filter_created_at
        ? {
          addedAt: {
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
          },
        }
        : {};

      const filter_mobile = req.query.filter_mobile
        ? {
          mobile: {
            $regex: req.query.filter_mobile,
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

      var totalPosts = await CurrentBooking.find({ ...filter_date, ...filter_name, ...filter_mobile, ...filter_created_at, ...filter_email, ...filter_timing, ...filter_vehicle, ...filter_zone }).countDocuments().exec();

      const data = await CurrentBooking.find({ ...filter_date, ...filter_name, ...filter_mobile, ...filter_created_at, ...filter_email, ...filter_timing, ...filter_vehicle, ...filter_zone }, {},
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

  deleteCurrentBookings: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await CurrentBooking.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Booking does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Booking id'));
        return;
      }
      next(error);
    }
  },

  getCurrentBooking: async (req, res, next) => {
    const id = req.params.id;
    try {
      const date = await CurrentBooking.findById(id);
      if (!date) {
        throw createError(404, 'Booking does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: date
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Booking id'));
        return;
      }
      next(error);
    }
  },

  getCurrentBookingCustomers: async (req, res, next) => {
    try {
      const date = await CurrentBooking.distinct('name');
      if (!date) {
        throw createError(404, 'Booking does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: date
      });
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Booking id1'));
        return;
      }
      next(error);
    }
  },

};