const createError = require('http-errors');
const mongoose = require('mongoose');
const asyncHandler = require('../Middleware/asyncHandler')
const ResponseHandler = require('../Middleware/responseHandler')

const imageUpload = require('../util/imageUpload.util')

let responseHandler = new ResponseHandler();

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
  fetch(...args));

fs = require('fs')

const validator = require('../helpers/validate');
const Validator = require('validatorjs');

const Package = require('../Models/Package.model');
const PackageCategory = require('../Models/PackageCategory.model');
const PackageFeature = require('../Models/PackageFeature.model');
const PackageInclusion = require('../Models/PackageInclusion.model');
const PackageExclusion = require('../Models/PackageExclusion.model');
const PackageIternary = require('../Models/PackageIternary.model');

const PaymentPolicy = require('../Models/PaymentPolicy.model');
const Term = require('../Models/Term.model');
const CancellationPolicy = require('../Models/CancellationPolicy.model');

const PackageCategoryHotel = require('../Models/PackageCategoryHotel.model');
const PackageIndianOption = require('../Models/PackageIndianOption.model');
const PackageForeignerOption = require('../Models/PackageForeignerOption.model');
const BlockDate = require('../Models/BlockDates.model');
async function checkNameIsUnique(name) {

  totalPosts = await Package.find({ name: name }).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  } else {
    return false;
  }
};


module.exports = {
  getAllPackages: async (req, res, next) => {
    try {

      var page = parseInt(req.query.page) || 1;
      var size = parseInt(req.query.size) || 10;

      if (req.query.filter_name && !req.query.filter_rating && !req.query.filter_availability) {
        var search = {
          name: new RegExp(req.query.filter_name, 'i')
        }
      } else if (!req.query.filter_name && req.query.filter_rating && !req.query.filter_availability) {
        var search = {
          rating: req.query.filter_rating
        }
      } else if (!req.query.filter_name && !req.query.filter_rating && req.query.filter_availability) {
        var search = {
          availability: req.query.filter_availability
        }
      } else if (req.query.filter_availability && req.query.filter_rating && req.query.filter_name) {
        var search = {
          availability: req.query.filter_availability,
          rating: req.query.filter_rating,
          name: new RegExp(req.query.filter_name, 'i')
        }
      } else if (req.query.filter_availability && req.query.filter_rating && !req.query.filter_name) {
        var search = {
          availability: req.query.filter_availability,
          rating: req.query.filter_rating,
        }
      } else if (req.query.filter_rating && req.query.filter_name && !req.query.filter_availability) {
        var search = {
          rating: req.query.filter_rating,
          name: new RegExp(req.query.filter_name, 'i')
        }
      } else if (req.query.filter_availability && req.query.filter_name && !req.query.filter_rating) {
        var search = {
          availability: req.query.filter_availability,
          name: new RegExp(req.query.filter_name, 'i')
        }
      } else {
        var search = {};
      }

      if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
      }

      const offset = size * (page - 1);
      const limit = size;
      const sort = ({ $natural: -1 });

      Package.paginate(search,
        {
          select: '_id name slug rating price description meta_title meta_description availability image createdAt',
          offset,
          limit,
          sort
        }).then((data) => {

          const response = {
            totalItems: data.totalDocs,
            data: data.docs,
            totalPages: data.totalPages,
            currentPage: data.page
          }

          return responseHandler.successWithProperty(res, 'data fetched', response);
        }).catch((err) => {
          next(createError(400, 'Error in inserting data.'));
          return;
        });
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllPackagesFront: async (req, res, next) => {
    try {

      var page = parseInt(req.query.page) || 1;
      var size = parseInt(req.query.size) || 15;

      var query = {}
      if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
      }
      query.skip = size * (page - 1);
      query.limit = size;

      var totalPosts = await Package.find({ availability: 1 }).countDocuments().exec();

      Package.find({ availability: 1 }, {__v: 0, updatedAt: 0, status: 0},
        query, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "error": false, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
          }
          res.json(response);
        }).sort({ $natural: 1 }).populate('inclusions', 'inclusion').populate('exclusions', 'exclusion').populate('features', 'feature').populate('iternaries', 'title description');
    } catch (error) {
      console.log(error.message);
    }
  },


  getAllPackagesHome: async (req, res, next) => {
    try {

      Package.find({ availability: 1, homepage: 1 }, {__v: 0, updatedAt: 0, status: 0}, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "error": false, "message": 'data fetched', 'data': data };
          }
          res.json(response);
        }).sort({ $natural: 1 }).populate('inclusions', 'inclusion').populate('exclusions', 'exclusion').populate('features', 'feature').populate('iternaries', 'title description');
    } catch (error) {
      console.log(error.message);
    }
  },

  countAllPackages: async (req, res, next) => {
    try {

      var totalPackage = await Package.estimatedDocumentCount();

      res.send({
        success: true,
        message: 'Data fetched',
        package_count: totalPackage
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllPackageCategories: async (req, res, next) => {
    try {

      var page = parseInt(req.query.page) || 1;
      var size = parseInt(req.query.size) || 15;
      var query = {}
      if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
      }
      query.skip = size * (page - 1);
      query.limit = size;

      var totalPosts = await PackageCategory.find({ package_id: req.params.id }).countDocuments().exec();

      PackageCategory.find({ package_id: req.params.id }, { __v: 0 },
        query, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "error": false, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
          }
          res.json(response);
        }).sort({ $natural: -1 }).populate(['hotels', 'foreignerOptions', 'indianOptions']);
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllPackageFeatures: async (req, res, next) => {
    try {

      var package = await Package.findById(req.params.id).populate('features');

      res.send({
        success: true,
        message: 'Data fetched',
        data: package
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllPackageIternaries: async (req, res, next) => {
    try {

      var package = await Package.findById(req.params.id).populate('iternaries');

      res.send({
        success: true,
        message: 'Data fetched',
        data: package
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllPackageInclusions: async (req, res, next) => {
    try {

      var package = await Package.findById(req.params.id).populate('inclusions');

      res.send({
        success: true,
        message: 'Data fetched',
        data: package
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllPackageExclusions: async (req, res, next) => {
    try {

      var package = await Package.findById(req.params.id).populate('exclusions');

      res.send({
        success: true,
        message: 'Data fateched',
        data: package
      });
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewPackage: asyncHandler(async (req, res, next) => {
    let rules = {
      name: 'required',
      rating: 'required',
      price: 'required',
    };

    const validation = new Validator(req.body, rules);

    if (validation.fails()) {
      return res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: validation.errors
      });
    }

    var checkCount = await checkNameIsUnique(req.body.name);

    if (checkCount) {
      return next(createError(412, 'Duplicate package name!'));
    }

      

    if (req.file) {
      const fileName = await imageUpload(req);
      req.body.image = fileName;
    }

    const package = new Package(req.body);
    const result = await package.save();
    res.send({
      success: true,
      message: 'Data inserted',
      data: result
    });
  }),

  findPackageById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const package = await Package.findById(id).select({ __v: 0 }).populate(['inclusions', 'exclusions', 'features', 'iternaries']);;
      if (!package) {
        throw createError(404, 'Package does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: package
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Package id'));
        return;
      }
      next(error);
    }
  },

  findPackageBySlug: async (req, res, next) => {
    const slug = req.params.slug;
    try {
      const package = await Package.findOne({ slug: slug }).populate('inclusions', 'inclusion').populate('exclusions', 'exclusion').populate('features', 'feature').populate('iternaries', 'title description');
      if (!package) {
        throw createError(404, 'Package does not exist.');
      }
      const package_category = await PackageCategory.find({ package_id: package._id.toString() }).populate(['hotels', 'indianOptions', 'foreignerOptions']);


      let CategoryList = [];

      for (let category of package_category) {

        const hotel_ids = [];

        for (let hotel of category.hotels) {
          hotel_ids.push(hotel.hotel_id);
        }

        const apiResponse = await fetch(`${process.env.HOTEL_MICROSERVICE_URL}/hotels/by-ids?ids=` + hotel_ids.toString());

        const apiResponseJson = await apiResponse.json();

        CategoryList.push({
          _id: category._id,
          category: category.category,
          package_id: category.package_id,
          foreignerOptions: category.foreignerOptions,
          indianOptions: category.indianOptions,
          status: category.status,
          hotels: apiResponseJson.data
        })
      }

      const paymentpolicy = await PaymentPolicy.find({},'policy');
      const term = await Term.find({},'term');
      const cancellationpolicy = await CancellationPolicy.find({},'policy');

      const data = {};
      data.package = package;
      data.categories = CategoryList;
      data.payment_policies = paymentpolicy;
      data.terms = term;
      data.cancellation_policies = cancellationpolicy;

      res.send({
        success: true,
        message: 'Data fetched',
        data: data
      });

    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Package id'));
        return;
      }
      next(error);
    }
  },

  updateAPackage: async (req, res, next) => {

    let rules = {
      name: 'required',
      rating: 'required',
      price: 'required',
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
      const id = req.params.id;

      const package = await Package.findById(id);

      if (req.file) {

        if (fs.existsSync(package.image)) {
          fs.unlinkSync(package.image);
        }

        req.body.image = req.file.path;
      }

      const updates = req.body;
      const options = { new: true };

      const result = await Package.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Package does not exist');
      }

      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });

    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Package Id'));
      }
      next(error);
    }
  },

  updateAPackageFeaturesOld: async (req, res, next) => {
    try {
      const id = req.params.id;
      const features = [];

      await PackageFeature.deleteMany({ package_id: req.params.id });

      for (const feature of req.body.features) {
        const package = new PackageFeature({
          package_id: req.params.id,
          feature: feature.feature
        });

        const result = await package.save();

        features.push(result._id);
      }

      req.body.features = features;
      const updates = req.body;
      const options = { new: true };

      const result = await Package.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Package does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Package Id'));
      }

      next(error);
    }
  },

  updateAPackageFeatures: async (req, res, next) => {
    try {
      const id = req.params.id;

      const package = await Package.findById(id);

      await PackageFeature.deleteMany({ package_id: req.params.id });

      package.features = [];
      await package.save();

      for (const feature of req.body.features) {
        const package_fet = new PackageFeature({
          package_id: req.params.id,
          feature: feature.feature
        });

        const result = await package_fet.save();
        package.features.push(result._id);
      }

      await package.save();

      return responseHandler.successWithProperty(res, 'data updated', { data: package });

    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Package Id'));
      }

      next(error);
    }
  },

  updateAPackageExclusions: async (req, res, next) => {
    try {
      const id = req.params.id;
      const exclusions = [];

      await PackageExclusion.deleteMany({ package_id: req.params.id });

      for (const exclusion of req.body.exclusions) {
        const package = new PackageExclusion({
          package_id: req.params.id,
          exclusion: exclusion.exclusion
        });

        const result = await package.save();

        exclusions.push(result._id);
      }

      req.body.exclusions = exclusions;
      const updates = req.body;
      const options = { new: true };

      const result = await Package.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Package does not exist');
      }

      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });

    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Package Id'));
      }

      next(error);
    }
  },

  updateAPackageInclusions: async (req, res, next) => {
    try {
      const id = req.params.id;
      const inclusions = [];

      await PackageInclusion.deleteMany({ package_id: req.params.id });

      for (const inclusion of req.body.inclusions) {
        const package = new PackageInclusion({
          package_id: req.params.id,
          inclusion: inclusion.inclusion
        });

        const result = await package.save();

        inclusions.push(result._id);
      }

      req.body.inclusions = inclusions;
      const updates = req.body;
      const options = { new: true };

      const result = await Package.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Package does not exist');
      }

      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });

    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Package Id'));
      }

      next(error);
    }
  },

  updateAPackageIternaries: async (req, res, next) => {
    try {
      const id = req.params.id;
      const iternariesArr = [];

      await PackageIternary.deleteMany({ package_id: req.params.id });

      for (const iternary of req.body.iternaries) {
        const package = new PackageIternary({
          package_id: req.params.id,
          title: iternary.title,
          description: iternary.description,
          status: iternary.status,
        });

        const result = await package.save();

        iternariesArr.push(result._id);
      }

      req.body.iternaries = iternariesArr;
      const updates = req.body;
      const options = { new: true };

      const result = await Package.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Package does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Package Id'));
      }

      next(error);
    }
  },

  updateAvilability: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Package.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Package does not exist');
      }

      res.send({
        success: true,
        message: 'Data updated',
        data: result
      });

    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Package Id'));
      }

      next(error);
    }
  },

  deleteAPackage: async (req, res, next) => {

    try {

      const id = req.params.id;

      const package = await Package.findByIdAndDelete(id);

      if (fs.existsSync(package.image)) {
        fs.unlinkSync(package.image);
      }

      await PackageInclusion.deleteMany({ package_id: id });
      await PackageExclusion.deleteMany({ package_id: id });
      await PackageFeature.deleteMany({ package_id: id });
      await PackageCategory.deleteMany({ package_id: id });
      await PackageCategoryHotel.deleteMany({ package_id: id });
      await PackageIndianOption.deleteMany({ package_id: id });
      await PackageForeignerOption.deleteMany({ package_id: id });

      const result = await Package.findByIdAndDelete(id);
      /*if (!result) {
        throw createError(404, 'Package does not exist.');
      }*/

      res.send({
        success: true,
        message: 'Data deleted',
      });

    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Package id'));
        return;
      }

      next(error);
    }
  },

  //block dates

  getAllBlockDates: async(req,res,next)=>{
    try{
     // const type = req.params.slug;
     BlockDate.find({},function(err,data){

        if(err)
        response = {"error": true, "message": "Error fetching data"+err};
        else
        response =  {"success": true, "data": data};
    
      res.json(response);
    })
    } catch (error) {console.log(error)}

  },

  getBlockDateById: async(req,res,next)=>{
    try{
      const id = req.params.id;
      BlockDate.find({"_id":id},function(err,data){

        if(err)
        response = {"error": true, "message": "Error fetching data"+err};
        else
        response =  {"success": true, "data": data};
    
      res.json(response);
    })
    } catch (error) 
    {console.log(error)}

  },

  updateBlockDate: async(req,res,next)=>{
    try{
       
         const id     = req.params.id;
         const op     = {new:true};
         const result = await BlockDate.findByIdAndUpdate(id, req.body, op);
         if(!result){
         throw createError(404, 'Festival date does not exist');
         }
         res.send({
          success:true,
          status:200,
          msg:"date updated"
         });

    }catch(e)
    {console.log(e.message)}
  },
  
  AddBlockDate: async ( req, res, next) =>{
   try {
      
      const date = new BlockDate(req.body);
      const result = await date.save();
  
      res.send({
        success: true,
        message: 'Dates Inserted',
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

  deleteBlockDate : async(req , res, next) =>{
     try{
       
      const id = req.params.id;
      let result = await BlockDate.findByIdAndDelete(id);
      if(!result){
        throw createError(404, 'Date Not Exist!');
      }
      res.send({
        success:true,
        msg:"Date Deleted",
        data_status:200
      });

     } catch(error){console.log(error)}
  },

  getOptionsByDate : async(req, res, next) =>{
    try{

      const date          = req.body.date;
      const cdata         = req.body.cdata;
      const blockDates    = await BlockDate.find().lean().exec();
      const festApi       = await fetch(`${process.env.ADMIN_MICROSERVICE_URL}/festival/get-festivals`);
      const festDates     = await festApi.json();
      const festivalDates = festDates.data;
      const data = [];
      let   checkBlock     = false;
      let   checkFest      = false;
      let   block          = 0;
      let   msg = ""; 
      if(blockDates.length != 0){

      for (let blockDate of blockDates) {
        
        const start = Date.parse( blockDate.startDate);
        const end = Date.parse(blockDate.endDate);
        const d = Date.parse(date);
        
         if(d >= start && d <= end){
            msg = "Booking Not Available";
            checkBlock = true;
            block = 1;
         }
        }
        
      } 
     
      if(festivalDates.length != 0){

      for (let festivalDate of festivalDates) {
        
        const start2 = Date.parse( festivalDate.startDate);
        const end2 = Date.parse(festivalDate.endDate);
        const d2 = Date.parse(date);
         if(d2 >= start2 && d2 <= end2){
            msg = "Festival Data"; 
            checkFest = true;
         }
        }

      } 
      if(checkBlock == false){

        if(cdata.length == 0){ throw createError(404,'No OtionData Added');}
        const iop = (cdata[0]);
      
      if( checkFest == true ){

        const readyDataIop = {
          opid    : iop._id,
          price   : iop.fes_room_price,
          eadult  : iop.fes_ad_price,
          echild  : iop.fes_ch_price,
          safari_price:iop.safari_fes_price 
        }
       
        data.push({"pricingData":readyDataIop}); 

       } else {
         var safari_cst = 0;
         var dt = new Date(date);
         if(dt.getDay() == 6 || dt.getDay() == 0)
          {
            safari_cst = iop.safari_we_price;
  
          } else{
            safari_cst = iop.safari_de_price;
          }

        const readydDataIop = {
          opid    : iop._id,
          price   : iop.room_price,
          eadult  : iop.extra_ad_price,
          echild  : iop.extra_ch_price,
          safari_price:safari_cst
        }
       
        data.push({"pricingData":readydDataIop}); 

       }

    
    }
      if( checkBlock == false && checkFest == false ) {
          msg = "Default Data";  
      }
  
      res.send({
        success:true,
        msg:msg,
        block:block,
        data:data,
        data_status:200,
      });

    } catch(error){
      console.log(error);
    }
  }

};