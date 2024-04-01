const createError = require('http-errors');
const mongoose = require('mongoose');

const Page = require('../Models/Page.model');

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


module.exports = {
  getAllPages: async (req, res, next) => {
    try {

      var page = parseInt(req.query.page) || 1;
      var size = parseInt(req.query.size) || 15;
      var query = {}

      query.skip = size * (page - 1);
      query.limit = size;

      var totalPosts = await Page.countDocuments({});

      if (totalPosts <= 0) {


        const keyword = new Page({
          'title' : 'About Us',
          'content' : '',
          'slug' : 'about-us'
        });

        await keyword.save();

        const keyword1 = new Page({
          'title' : 'Terms And Conditions',
          'content' : '',
          'slug' : 'terms-and-conditions'
        });

        await keyword1.save();

        const keyword2 = new Page({
          'title' : 'Privacy Policy',
          'content' : '',
          'slug' : 'privacy-policy'
        });

        await keyword2.save();

        const keyword3 = new Page({
          'title' : 'Cancellation Policy',
          'content' : '',
          'slug' : 'cancellation-policy'
        });

        await keyword3.save();
      }else{
        var exists = await Page.countDocuments({slug: 'privacy-policy'});
        if (exists <= 0) {
          const keyword5 = new Page({
            'title' : 'Privacy Policy',
            'content' : '',
            'slug' : 'privacy-policy'
          });
          await keyword5.save();
        }

        var exists1 = await Page.countDocuments({slug: 'cancellation-policy'});
        if (exists1 <= 0) {
          const keyword4 = new Page({
            'title' : 'Cancellation Policy',
            'content' : '',
            'slug' : 'cancellation-policy'
          });
          await keyword4.save();
        }


        var exists2 = await Page.countDocuments({slug: 'terms-and-conditions'});
        if (exists2 <= 0) {
          const keyword6 = new Page({
            'title' : 'Terms And Conditions',
            'content' : '',
            'slug' : 'terms-and-conditions'
          });
          await keyword6.save();
        }

        var exists3 = await Page.countDocuments({slug: 'about-us'});
        if (exists3 <= 0) {
          const keyword7 = new Page({
            'title' : 'About Us',
            'content' : '',
            'slug' : 'about-us'
          });
          await keyword7.save();
        }
      }

      var totalPosts = await Page.countDocuments({});

      Page.find({}, {__v: 0, updatedAt: 0},
        query, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "success": true, "message": 'data fetched', 'data': data, 'page': page, 'total': totalPosts, perPage: size };
          }
          res.json(response);
        }).sort({ $natural: -1 });
    } catch (error) {
      console.log(error.message);
    }
  },

  getPages: async (req, res, next) => {
    try {

      Page.find({}, {__v:0, updatedAt: 0}, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "success": true, "message": 'data fetched', 'data': data};
          }
          res.json(response);
        }).sort({ $natural: -1 });
    } catch (error) {
      console.log(error.message);
    }
  },


  getPagesByType: async (req, res, next) => {
    try {

      const type = req.params.type;

      Page.find({type: type}, {__v:0, updatedAt: 0}, function (err, data) {
          if (err) {
            response = { "error": true, "message": "Error fetching data" + err };
          } else {
            response = { "success": true, "message": 'data fetched', 'data': data};
          }
          res.json(response);
        }).sort({ $natural: -1 });
    } catch (error) {
      console.log(error.message);
    }
  },

  findPageById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const review = await Page.findById(id,{__v: 0, updatedAt: 0});
      if (!review) {
        throw createError(404, 'Page does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: review
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Page id'));
        return;
      }
      next(error);
    }
  },

  findPageBySlug: async (req, res, next) => {
    const id = req.params.slug;
    try {
      const review = await Page.findOne({slug:id},{__v: 0, updatedAt: 0});
      if (!review) {
        throw createError(404, 'Page does not exist.');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: review
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Page id'));
        return;
      }
      next(error);
    }
  },

  createNewPage: async (req, res, next) => {
    try {
      req.body.slug = await titleToSlug(req.body.title);
      const keyword = new Page(req.body);
      const result = await keyword.save();
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

  updatePage: async (req, res, next) => {
    try {
      const id = req.params.id;
      req.body.slug = await titleToSlug(req.body.title);
      const updates = req.body;
      const options = { new: true };

      const result = await Page.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(404, 'Page does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Page Id'));
      }

      next(error);
    }
  },

  updateHomePageText: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updates = req.body;
      const options = { new: true };

      const result = await Page.findOneAndUpdate({'slug': 'home-page-text'}, updates, options);
      if (!result) {
        throw createError(404, 'Page does not exist');
      }
      res.send({
        success: true,
        message: 'Data updated',
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Page Id'));
      }

      next(error);
    }
  },

  getHomePageText: async (req, res, next) => {
    try {

      const result = await Page.findOne({'slug': 'home-page-text'});
      if (!result) {

      const keyword = new Page({
        'title' : 'Home Page Text',
        'slug' : 'home-page-text',
        'content': ''
      });

      const result = await keyword.save();

        throw createError(404, 'Page does not exist');
      }
      res.send({
        success: true,
        message: 'Data fetched',
        data: result
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(400, 'Invalid Page Id'));
      }

      next(error);
    }
  },

  deletePage: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Page.findByIdAndDelete(id);
      if (!result) {
        throw createError(404, 'Page does not exist.');
      }
      res.send({
        success: true,
        message: 'Data deleted',
      });Page
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(400, 'Invalid Page id'));
        return;
      }
      next(error);
    }
  }
};