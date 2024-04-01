const createError = require('http-errors');
const mongoose = require('mongoose');
const validator = require('../helpers/validate');
const sharp = require('sharp');
fs = require('fs')
const path = require('path');

const Hotel = require('../Models/Hotel.model');
const HotelImage = require('../Models/HotelImage.model');
const HotelAmenity = require('../Models/HotelAmenity.model');
const HotelRoom = require('../Models/HotelRoom.model');

const titleToSlug = title => {
  let slug;

  // convert to lower case
  slug = title.toLowerCase();

  // remove special characters
  slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
  // The /gi modifier is used to do a case insensitive search of all occurrences of a regular expression in a string

  // replace spaces with dash symbols
  slug = slug.replace(/ /gi, "-");

  // remove consecutive dash symbols 
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');

  // remove the unwanted dash symbols at the beginning and the end of the slug
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  return slug;
};


async function checkNameIsUnique(name) {

  totalPosts = await Hotel.find({ name: name }).countDocuments().exec();
  if (totalPosts > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllHotels: async (req, res, next) => {
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

      var totalPosts = await Hotel.find(search).countDocuments().exec();

      Hotel.find(search, {},
        query, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "error": false, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
          }
          res.json(response);
        }).sort({ $natural: -1 }).populate('images');
    } catch (error) {
      console.log(error.message);
    }
  },


  getAllHotelsFront: async (req, res, next) => {
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

      var totalPosts = await Hotel.find(search).countDocuments().exec();

      const data = await Hotel.find(search, {}, query).sort({ price: 1 }).populate('images');

      let CategoryList = [];

      for (let hotel of data) {
        CategoryList.push({
          _id: hotel._id,
          name: hotel.name,
          image: hotel.image,
          slug: hotel.slug,
          images: hotel.images,
          address: hotel.address,
          city: hotel.city,
          state: hotel.state,
          rating: hotel.rating,
          price: hotel.price,
          description: hotel.description,
          meta_title: hotel.meta_title,
          meta_description: hotel.meta_description,
          availability: hotel.availability,
          homepage:hotel.homepage,
          amenities: await HotelAmenity.find({ hotel_id: hotel._id }).populate('amenity'),
          rooms: await HotelRoom.find({ hotel_id: hotel._id }).populate('facilities')
        })
      }

      if (!data) {
        response = { "error": true, "message": "Error fetching data" + err };
      } else {
        response = { "error": false, "message": 'data fetched', 'data': CategoryList, 'page': page, 'total': totalPosts, perPage: size };
      }
      res.json(response);

    } catch (error) {
      console.log(error.message);
    }
  },

  getAllHotelsHome: async (req, res, next) => {
    try {      

      const data = await Hotel.find({homepage:1, status:1}).sort({ price: 1 });

      let CategoryList = [];

      for (let hotel of data) {
        CategoryList.push({
          _id: hotel._id,
          name: hotel.name,
          image: hotel.image,
          slug: hotel.slug,
          address: hotel.address,
          city: hotel.city,
          state: hotel.state,
          rating: hotel.rating,
          price: hotel.price,
          description: hotel.description,
          meta_title: hotel.meta_title,
          meta_description: hotel.meta_description,
          availability: hotel.status,
          homepage: hotel.homepage,
        })
      }

      if (!data) {
        response = { "error": true, "message": "Error fetching data" + err };
      } else {
        response = { "error": false, "message": 'data fetched', 'data': CategoryList };
      }
      res.json(response);

    } catch (error) {
      console.log(error.message);
    }
  },

  getAllHotelsCount: async (req, res, next) => {
    try {

      var totalPosts = await Hotel.find({}).countDocuments().exec();

      return res
        .send({
          success: true,
          message: 'Data fetched!',
          hotel_count: totalPosts
        });

    } catch (error) {
      console.log(error.message);
    }
  },

  findHotelRoomsById: async (req, res, next) => {
    try {
      var id = req.params.id;

      var page = parseInt(req.query.page) || 1;
      var size = parseInt(req.query.size) || 15;
      var query = {}
      if (page < 0 || page === 0) {
        response = { "error": true, "message": "invalid page number, should start with 1" };
        return res.json(response);
      }
      query.skip = size * (page - 1);
      query.limit = size;

      var totalPosts = await HotelRoom.find({ 'hotel_id': id }).countDocuments().exec();


      HotelRoom.find({ 'hotel_id': id }, { __v: 0 },
        query, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
          }
          res.json(response);
        }).sort({ $natural: -1 }).populate('facilities');

    } catch (error) {
      console.log(error.message);
    }
  },

  createNewHotel: async (req, res, next) => {

    let rules = {
      name: 'required',
      rating: 'required',
      price: 'required'
    };

    await validator(req.body, rules, {}, (err, status) => {
      if (!status) {
        return res.status(412)
          .send({
            success: false,
            message: 'Validation failed',
            data: err
          });
      }
    }).catch(err => console.log(err))

    var checkCount = await checkNameIsUnique(req.body.name);

    if (checkCount) {
     return next(createError(412, 'Duplicate Hotel name!'));
    }

    const package_image = req.files.filter(function (item) {
      return item.fieldname == 'package_image'
    });


    console.log('package_image',package_image[0]);


    /*resize image*/

    if (package_image && package_image[0]) {

      const fileNameFile = package_image[0].originalname.replace(/\..+$/, "");
      const newFilename = `${fileNameFile}-${Date.now()}.jpg`;

      await sharp(package_image[0].path)
      .resize(1140, 300, {fit:"contain"})
      .jpeg({ quality: 95 })
      .toFile(
        path.resolve(package_image[0].destination,newFilename)
        )
      req.body.package_image = package_image[0].destination+''+newFilename;
      // fs.unlinkSync(package_image[0].path);
    }else{
      req.body.package_image = '';
    }


    const image = req.files.filter(function (item) {
      return item.fieldname == 'image'
    });

    /*resize image*/

    if (image && image[0]) {

      const fileName = image[0].originalname.replace(/\..+$/, "");
      const newFilenameFile = `${fileName}-${Date.now()}.jpg`;

      await sharp(image[0].path)
      .resize(335, 257, {fit:"contain"})
      .jpeg({ quality: 95 })
      .toFile(
        path.resolve(image[0].destination,newFilenameFile)
        )
      req.body.image = image[0].destination+newFilenameFile;
      // fs.unlinkSync(image[0].path);
    }else{
      req.body.image = '';
    }

    const imagesArr = req.files.filter(function (item) {
      return (item.fieldname !== 'image' && item.fieldname !== 'package_image')
    });

    try {
      const slug = await titleToSlug(req.body.name);
      req.body.slug = slug;

      const hotel = new Hotel(req.body);
      const result = await hotel.save();

      const image_arr = [];

      if (req.files && req.files.length && imagesArr) {

        for (const image of imagesArr) {


          /*resize image*/

          const fileNamefile = image.originalname.replace(/\..+$/, "");
          const newFilename = `${fileNamefile}-${Date.now()}.jpg`;

          await sharp(image.path)
          .resize(820, 404, {fit:"contain"})
          .jpeg({ quality: 95 })
          .toFile(
            path.resolve(image.destination,newFilename)
            )

          // fs.unlinkSync(image.path);

          /*resize image*/

          const hotel_images = new HotelImage({
            image: image.destination+newFilename,
            hotel_id: result._id
          });

          const result1 = await hotel_images.save();
          image_arr.push(result1._id);
        }
      }

      const id = result._id;
      const updates = { images: image_arr };
      const options = { new: true };

      const result2 = await Hotel.findByIdAndUpdate(id, updates, options);

      res.send({
        success: true,
        message: 'Data inserted',
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

  findHotelById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const hotel = await Hotel.findById(id).populate('images');;
      if (!hotel) {
        throw createError(404, 'Hotel does not exist.');
      }

      const HotelAmenities = await HotelAmenity.find({ hotel_id: hotel._id }).populate('amenity');
      const HotelRooms = await HotelRoom.find({ hotel_id: hotel._id }).populate('facilities');

      const data = {};

      data.hotel = hotel;
      data.hotel_amenities = HotelAmenities;
      data.hotel_rooms = HotelRooms;

      res.send({
        success: true,
        message: 'Data fetched',
        data: hotel
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel id'));
        return;
      }
      next(error);
    }
  },

  findHotelByIds: async (req, res, next) => {
    const ids = req.query.ids;
    try {
      const hotel = await Hotel.find({"_id" : { $in : ids.split(",")  } }).populate('images');;
      if (!hotel) {
        throw createError(404, 'Hotel does not exist.');
      }

      res.send({
        success: true,
        message: 'Data fetched',
        data: hotel
      });
    } catch (error) {
      console.log(error);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel id'));
        return;
      }
      next(error);
    }
  },

  findHotelBySlug: async (req, res, next) => {
    const slug = req.params.slug;
    try {
      const hotel = await Hotel.findOne({ slug: slug }).populate('images');
      if (!hotel) {
        throw createError(404, 'Hotel does not exist.');
      }

      const HotelAmenities = await HotelAmenity.find({ hotel_id: hotel._id }).populate('amenity');
      const HotelRooms = await HotelRoom.find({ hotel_id: hotel._id }).populate('facilities');

      const data = {};

      data.hotel = hotel;
      data.hotel_amenities = HotelAmenities;
      data.hotel_rooms = HotelRooms;

      res.send({
        success: true,
        message: 'Data fetched',
        data: data,
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel id'));
        return;
      }
      next(error);
    }
  },

  findHotelAmenitiesById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const hotel = await HotelAmenity.find({ hotel_id: id }).populate('amenity');
      if (!hotel) {
        throw createError(404, 'Hotel does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: hotel
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel id'));
        return;
      }
      next(error);
    }
  },

  updateAHotel: async (req, res, next) => {
    try {
      const id = req.params.id;

      const hotel = await Hotel.findById(id);

      const image_arr = hotel.images;

      const package_image = req.files.filter(function (item) {
        return item.fieldname == 'package_image'
      });

      if (req.files && package_image && package_image[0]) {

        if (fs.existsSync(hotel.package_image)) {
          fs.unlinkSync(hotel.package_image);
        }

        req.body.package_image = package_image[0].path;
      }else{
        req.body.package_image = hotel.package_image;
      }

      const image = req.files.filter(function (item) {
        return item.fieldname == 'image'
      });

      if (req.files && image && image[0]) {
        if (fs.existsSync(hotel.image)) {
          fs.unlinkSync(hotel.image);
        }
        req.body.image = image[0].path;
      }else{
        req.body.image = hotel.image;
      }

      const imagesArr = req.files.filter(function (item) {
        return (item.fieldname !== 'image' && item.fieldname !== 'package_image')
      });

      if (req.files && req.files.length && imagesArr) {

        for (const image of imagesArr) {
          const hotel_images = new HotelImage({
            image: image.path,
            hotel_id: id
          });

          const result1 = await hotel_images.save();
          image_arr.push(result1._id);
        }
      }

      req.body.images = image_arr;

      const options = { new: true };

      const result = await Hotel.findByIdAndUpdate(id, req.body, options);
      if (!result) {
        throw createError(404, 'Hotel does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Hotel Id'));
      }

      next(error);
    }
  },


  updateAHotelAvilability: async (req, res, next) => {
    try {
      const id = req.params.id;

      const hotel = await Hotel.findById(id);

      const image_arr = hotel.images;

      const options = { new: true };

      const result = await Hotel.findByIdAndUpdate(id, req.body, options);
      if (!result) {
        throw createError(404, 'Hotel does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Hotel Id'));
      }

      next(error);
    }
  },

  updateHotelAmenities: async (req, res, next) => {
    try {
      const id = req.params.id;

      await HotelAmenity.find({ hotel_id: id }).remove();

      for (const amenity of req.body.amenities) {
        const hotel_amenity = new HotelAmenity({
          hotel_id: id,
          amenity: amenity
        });

        const result = await hotel_amenity.save();
      }

      res.send({
        success: true,
        message: 'Hotel Amenity Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Hotel Id'));
      }

      next(error);
    }
  },

  deleteAHotel: async (req, res, next) => {
    const id = req.params.id;
    try {

      const hotel = await Hotel.findById(id);

      const hotel_images = await HotelImage.find({hotel_id:id});

      for (const images of hotel_images) 
      {
        if (fs.existsSync(images.image)) 
        {
          fs.unlinkSync(images.image);
        }
      }      

      if (fs.existsSync(hotel.package_image)) 
      {
        fs.unlinkSync(hotel.package_image);
      }

      if (fs.existsSync(hotel.image)) 
      {
        fs.unlinkSync(hotel.image);
      }

      await HotelAmenity.deleteMany({ hotel_id: id });
      await HotelImage.deleteMany({ hotel_id: id });
      await HotelRoom.deleteMany({ hotel_id: id });
      
      const result = await Hotel.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Hotel does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel id'));
        return;
      }
      next(error);
    }
  },

  deleteHotelImage: async (req, res, next) => {
    const id = req.params.id;
    try {

      const hotel_image = await HotelImage.findById(id);

      if (fs.existsSync(hotel_image.image)) {
        fs.unlinkSync(hotel_image.image);
      }

      const result = await HotelImage.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Hotel does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Hotel id'));
        return;
      }
      next(error);
    }
  }
};