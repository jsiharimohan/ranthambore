const createError = require('http-errors');
const mongoose = require('mongoose');
const validator = require('../helpers/validate');
const ApiFeatures = require("../Utils/ApiFeatures");


//const amqp = require('amqplib');

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => 
 fetch(...args));

const { body, validationResult } = require('express-validator');

const Validator = require('validatorjs');

const asyncHandler = require('../Middleware/asyncHandler')

const Customer = require('../Models/Customer.model');
const SafariBooking = require('../Models/SafariBooking.model');
const PackageBooking = require('../Models/PackageBooking.model');
const ChambalBooking = require('../Models/ChambalBooking.model');
const BookingCustomer = require('../Models/BookingCustomer.model');


// let channel;

// async function connect() {
//   const amqpServer = process.env.RABBITMQ_URL;
//   const connection = await amqp.connect(amqpServer);
//   channel = await connection.createChannel();
//   await channel.assertQueue('booking');
// }
// connect();


async function checkNameIsUnique(email,type) {

  totalPosts = await Customer.find({email: email, type: type}).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  }else{
    return false;
  }
};

async function checkCustomerIsUnique(email, type, mobile) {

  totalPosts = await Customer.find({email: email, type: type, mobile: mobile}).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  }else{
    return false;
  }
};

module.exports = {
  
  getAllCustomers: asyncHandler(async (req, res, next) => {

    const resultPerPage = req.query.size||15;

    const apiFeature1 = new ApiFeatures(Customer.find(), req.query)
    .search();
    // .filter();

    var productsCount = await apiFeature1.query;

    productsCount = productsCount.length;

    const apiFeature = new ApiFeatures(Customer.find(), req.query)
    .search()
    // .filter()
    .pagination(resultPerPage);

    let products = await apiFeature.query;

    return res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      page:Number(req.query.page||1),
    });

    var page = parseInt(req.query.page)||1;
    var size = parseInt(req.query.size)||15;

    if (req.query.type) {
      var condition = {
        type: req.query.type
      }
    }else{
      var condition = {

      }
    }

    var query = {}
    if(page < 0 || page === 0) {
      response = {"error" : true,"message" : "invalid page number, should start with 1"};
      return res.json(response);
    }
    query.skip = size * (page - 1);
    query.limit = size;

    var  totalPosts = await Customer.find(condition).countDocuments().exec();

    Customer.find(condition,{},
      query,function(err,data) {
        if(err) {
          response = {"error": true, "message": "Error fetching data"+err};
        } else {
          response = {"success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage:size };
        }
        res.json(response);
      }).sort({ $natural: -1 }).populate(['booking_customers','safari_booking','chambal_booking']);
  }),


  getAllCustomersList: asyncHandler(async (req, res, next) => {
    try {
      const result = await Customer.distinct('name');
      if (!result) {
        throw createError(404, 'Customer does not exist.');
      }
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
  }),

  countAllCustomers: async (req, res, next) => {
    try {
      const results = await Customer.estimatedDocumentCount();
      res.send({
          success: true,
          message: "data fetched",
          data: results
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewCustomer: async (req, res, next) => {

    var checkCount = await checkCustomerIsUnique(req.body.email, req.body.type, req.body.mobile);

    if (checkCount) {
      return res.status(412)
          .send({
            success: false,
            message: 'Validation failed',
            data: 'duplicate customer'
          });
    }

    try {

      const customer_data = new Customer({
        name : req.body.name,
        mobile : req.body.mobile,
        email : req.body.email,
        type : req.body.type,
        address : req.body.address,
        state : req.body.state,
      });        

      const customer_data_result = await customer_data.save();

      res.send({
        success: true,
        message: 'Data inserted',
        data: customer_data_result
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

  createNewCustomerSafari: async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let rules = {
      name: 'required',
      mobile: 'required',
      email: 'required',
      address: 'required',
      state: 'required',
      country: 'required',
      date: 'required',
      zone: 'required',
      amount: 'required',
      vehicle: 'required',
      timing: 'required',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: validation.errors
      });
    }

    const customer_data = new Customer({
      name : req.body.name,
      mobile : req.body.mobile,
      email : req.body.email,
      type : 'safari',
      address : req.body.address,
      state : req.body.state,
      country: req.body.country
    });

    const customer_data_result = await customer_data.save();
     
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const safari_booking_data = new SafariBooking({
      date : req.body.date,
      zone : req.body.zone,
      customer_id : customer_data_result._id,
      customer_name : customer_data_result.name,
      customer_email : customer_data_result.email,
      customer_mobile : customer_data_result.mobile,
      customer : customer_data_result._id,
      vehicle : req.body.vehicle,
      timing : req.body.timing,
      transaction_id : req.body.transaction_id,
      amount : req.body.amount,
      addedAt : today,
      status : 'unpaid'
    });

    const safari_booking_result = await safari_booking_data.save();

    customer_data_result.safari_booking = safari_booking_result._id;
    await customer_data_result.save();

    for (const persons of req.body.booked_persons) 
    { 

      const booking_customer_data = new BookingCustomer({
        name : persons.name,
        customer_id : customer_data_result._id,
        booking_id : safari_booking_result._id,
        gender : persons.gender,
        nationality : persons.nationality,
        id_proof : persons.id_proof,
        idnumber : persons.idnumber
      });

      const booking_customer_result = await booking_customer_data.save();

      safari_booking_result.booking_customers.push(booking_customer_result._id);

      customer_data_result.booking_customers.push(booking_customer_result._id);
    }

    await safari_booking_result.save();
    await customer_data_result.save();

    /*save data to crm*/  

    const params2 = new URLSearchParams();

    params2.append('name', req.body.name);
    params2.append('mobile', req.body.mobile);
    params2.append('email', req.body.email);
    params2.append('website', 'ranthamboretigerreserve');
    params2.append('custom_date', '');

    const response2 = await fetch(`${process.env.CRM_LEAD_URL}/update-lead-data`, {method: 'POST', body: params2});
    const data2 = await response2.json(); 

    const params3 = new URLSearchParams();

    params3.append('name', req.body.name);
    params3.append('mobile', req.body.mobile);
    params3.append('website', 'ranthamboretigerreserve');
    params3.append('email', req.body.email);
    params3.append('address', req.body.address);
    params3.append('state', req.body.state);
    params3.append('booking_type', 'safari');

    const response3 = await fetch(`${process.env.CRM_LEAD_URL}/update-lead-status`, {method: 'POST', body: params3});
    const data3 = await response3.json(); 

    if (req.body.transaction_id && req.body.transaction_id != '') {

      const params = new URLSearchParams();

      params.append('name', req.body.name);
      params.append('email', req.body.email);
      params.append('mobile', req.body.mobile);
      params.append('address', req.body.address);
      params.append('state', req.body.state);
      params.append('website', 'ranthamboretigerreserve.in');
      params.append('custom_data', '');
      params.append('payment_status', 'unpaid');
      params.append('lead_status', 4);
      params.append('date', req.body.date);
      params.append('time', req.body.timing);
      params.append('adult', 0);
      params.append('child', 0);
      params.append('mode', req.body.vehicle);
      params.append('zone', req.body.zone);
      params.append('sanctuary', 'ranthambore');
      params.append('amount', req.body.amount);
      params.append('transaction_id', req.body.transaction_id);
      params.append('booked_customers', JSON.stringify(req.body.booked_persons));

      const response = await fetch(`${process.env.CRM_LEAD_URL}/ranthambore-booking`, {method: 'POST', body: params});

      const data = await response.json();        

    }

    /*save data to crm*/

    res.send({
      success: true,
      message: 'Data inserted',
      data: customer_data_result
    });

  },

  createNewCustomerChambal: async (req, res, next) => {

    let rules = {
      name: 'required',
      mobile: 'required',
      email: 'required',
      address: 'required',
      state: 'required',
      date: 'required',
      zone: 'required',
      amount: 'required',
      vehicle: 'required',
      time: 'required',
      id_proof_no: 'required',
      // transaction_id: 'required',
      no_of_persons_indian: 'required',
      no_of_persons_foreigner: 'required',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: validation.errors
      });
    }

    try {

     switch (Number(req.body.zone)) {
      case 1:
      var booking_name = 'Chambal safari booking';
      var booking_option = 'Chambal Safari Option 1';
      break;
      case 2:
      var booking_name = 'Chambal Safari Booking with Pickup and Drop from Resort';
      var booking_option = 'Chambal Safari Option 2';
      break;
      case 3:
      var booking_name = 'Chambal Safari Booking with Lunch';
      var booking_option = 'Chambal Safari Option 3';
      break;
      case 4:
      var booking_name = 'Chambal Safari Booking with Luch including Pickup and Drop from Resort';
      var booking_option = 'Chambal Safari Option 4';
      break;
    }  

    const customer_data = new Customer({
        name : req.body.name,
        mobile : req.body.mobile,
        type : 'chambal',
        email : req.body.email,
        address : req.body.address,
        state : req.body.state
      });

      const customer_data_result = await customer_data.save();

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;

      const safari_booking_data = new ChambalBooking({
        date : req.body.date,
        zone : req.body.zone,
        customer_id : customer_data_result._id,
        customer_name : customer_data_result.name,
        customer_email : customer_data_result.email,
        customer_mobile : customer_data_result.mobile,
        customer : customer_data_result._id,
        booking_name : booking_name,
        booking_option : booking_option,
        vehicle : req.body.vehicle,
        time : req.body.time,
        transaction_id : req.body.transaction_id,
        amount : req.body.amount,
        id_proof_no : req.body.id_proof_no,
        no_of_persons_indian : req.body.no_of_persons_indian,
        no_of_persons_foreigner : req.body.no_of_persons_foreigner,
        addedAt : today,
        status : 'unpaid',
        transaction_id: ''
      });

      const safari_booking_result = await safari_booking_data.save();

      customer_data_result.chambal_booking = safari_booking_result._id;

      await customer_data_result.save();


      /*save data to crm*/

      const params2 = new URLSearchParams();

      params2.append('name', req.body.name);
      params2.append('mobile', req.body.mobile);
      params2.append('email', req.body.email);
      params2.append('website', 'ranthamboretigerreserve');
      params2.append('custom_date', '');

      const response2 = await fetch(`${process.env.CRM_LEAD_URL}/update-lead-data`, {method: 'POST', body: params2});
      const data2 = await response2.json(); 

      const params3 = new URLSearchParams();

      params3.append('name', req.body.name);
      params3.append('mobile', req.body.mobile);
      params3.append('website', 'ranthamboretigerreserve');
      params3.append('email', req.body.email);
      params3.append('address', req.body.address);
      params3.append('state', req.body.state);
      params3.append('booking_type', 'safari');

      const response3 = await fetch(`${process.env.CRM_LEAD_URL}/update-lead-status`, {method: 'POST', body: params3});
      const data3 = await response3.json(); 

      if (req.body.transaction_id && req.body.transaction_id != '') {

        const params = new URLSearchParams();

        params.append('name', req.body.name);
        params.append('email', req.body.email);
        params.append('mobile', req.body.mobile);
        params.append('address', req.body.address);
        params.append('state', req.body.state);
        params.append('website', 'ranthamboretigerreserve.in');
        params.append('custom_data', '');
        params.append('date', req.body.safari_date);
        params.append('time', req.body.time);
        params.append('adult', req.body.no_of_persons_indian);
        params.append('child', req.body.no_of_persons_foreigner);
        params.append('mode', 'Boat');
        params.append('payment_status', 'paid');
        params.append('lead_status', 4);
        params.append('area', booking_name);
        params.append('zone', 'All Zone');
        params.append('sanctuary', 'ranthambore');
        params.append('amount', req.body.amount);
        params.append('transaction_id', req.body.transaction_id);

        const response = await fetch(`${process.env.CRM_LEAD_URL}/ranthambore-booking`, {method: 'POST', body: params});
        const data = await response.json(); 
    }
             
      /*save data to crm*/

      res.send({
        success: true,
        message: 'Data inserted',
        data: customer_data_result
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


createNewCustomerPackage: async (req, res, next) => {

  let rules = {
    date:'required',
    name:'required',
    email:'required',
    mobile:'required',
    nationality_type:'required',
    package_option_id:'required',
    package_id:'required',
    no_of_kids:'required',
    amount:'required',
    category_name:'required',
  };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: validation.errors
      });
    }

    try {

      const customer_data = new Customer({
        name : req.body.name,
        mobile : req.body.mobile,
        type : 'package',
        email : req.body.email,
        address : req.body.address,
        state : req.body.state,
      });

      const customer_data_result = await customer_data.save();

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;

      const safari_booking_data = new PackageBooking({
        date : req.body.date,
        customer_id : customer_data_result._id,
        customer_name : customer_data_result.name,
        customer_email : customer_data_result.email,
        customer_mobile : customer_data_result.mobile,
        customer : customer_data_result._id,
        transaction_id : req.body.transaction_id,
        amount : req.body.amount,
        price : req.body.price,
        nationality_type : req.body.nationality_type,
        room_type : req.body.room_type,
        package_option_id : req.body.package_option_id,
        package_id : req.body.package_id,
        package_name : req.body.package_name,
        no_of_kids : req.body.no_of_kids,
        no_of_rooms : req.body.no_of_rooms,
        no_of_adult : req.body.no_of_adult,
        category_name : req.body.category_name,
        addedAt : today,
        status : 'unpaid',
        transaction_id: ''
      });

      const safari_booking_result = await safari_booking_data.save();

      customer_data_result.package_booking = safari_booking_result._id;

      customer_data_result.save();


      /*save data to crm*/


      const params2 = new URLSearchParams();

      params2.append('name', req.body.name);
      params2.append('email', req.body.email);
      params2.append('mobile', req.body.mobile);
      params2.append('website', 'ranthamboretigerreserve');
      params2.append('payment_status', 'unpaid');


      const response2 = await fetch(`${process.env.CRM_LEAD_URL}/update-lead-data`, {method: 'POST', body: params2});
      const data2 = await response2.json(); 

      const params3 = new URLSearchParams();

      params3.append('name', req.body.name);
      params3.append('email', req.body.email);
      params3.append('mobile', req.body.mobile);
      params3.append('website', 'ranthamboretigerreserve');
      params3.append('address', req.body.address);
      params3.append('state', req.body.state);
      params3.append('assigned_to', null);
      params3.append('booking_type', 'package');
      params3.append('lead_status', 'unpaid');
      params3.append('payment_status', 'unpaid');


      const response3 = await fetch(`${process.env.CRM_LEAD_URL}/update-lead-status`, {method: 'POST', body: params3});
      const data3 = await response3.json(); 


        

      /*save data to crm*/

      res.send({
        success: true,
        message: 'Data inserted',
        data: customer_data_result
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

  findCustomerById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Customer.findById(id);
      if (!result) {
        throw createError(404, 'Customer does not exist.');
      }
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

  updateACustomer: async (req, res, next) => {
    try {
      const id = req.user._id;
      const updates = req.body;
      const options = { new: true };

      const result = await Customer.findByIdAndUpdate(id.toString(), updates, options);
      if (!result) {
        throw createError(404, 'Customer does not exist');
      }
      res.send({
          success: true,
          message: "data updated",
          data: result
        });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Customer Id'));
      }
      next(error);
    }
  },

  DeleteCustomers: async (req, res, next) => {

    const id = req.params.id;
    const slug = req.params.slug;

    console.log(id,slug);

    try {

      if (slug === 'safari') {

        await SafariBooking.findOneAndDelete({customer_id : id});
        await BookingCustomer.deleteMany({customer_id : id});
        const result = await Customer.findByIdAndDelete(id);

        if (!result) {
          throw createError(404, 'Customer does not exist.');
        }
        
        res.send({
          success: true,
          message: "data deleted",
        });

      }else if (slug === 'package') {

        await PackageBooking.findOneAndDelete({customer_id : id});
        const result = await Customer.findByIdAndDelete(id);

        if (!result) {
          throw createError(404, 'Customer does not exist.');
        }

        res.send({
          success: true,
          message: "data deleted",
        });
      }else {

        await ChambalBooking.findOneAndDelete({customer_id : id});
        const result = await Customer.findByIdAndDelete(id);

        if (!result) {
          throw createError(404, 'Customer does not exist.');
        }

        res.send({
          success: true,
          message: "data deleted",
        });
      }

    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Customer id'));
        return;
      }
      next(error);
    }
  }
};
