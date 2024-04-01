const createError = require('http-errors');

const SeoManager = require('../Models/SeoManager.model');


module.exports = {
  seedSeoData: async (req, res, next) => {   
    try {
      await SeoManager.deleteMany({});

      const seo_managers = [

          new SeoManager({
            page_name: "cancellation policy",
            page_url: "cancellation-policy",
            seo_title: 'cancellation policy',
            seo_description: 'cancellation policy',
          }),

          new SeoManager({
            page_name: "privacy policy",
            page_url: "privacy-policy",
            seo_title: 'privacy policy',
            seo_description: 'privacy policy',
          }),

          new SeoManager({
            page_name: "about us",
            page_url: "about-us",
            seo_title: 'about us',
            seo_description: 'about us',
          }),

          new SeoManager({
            page_name: "contact us",
            page_url: "contact-us",
            seo_title: 'contact us',
            seo_description: 'contact us',
          }),

          new SeoManager({
            page_name: "online ranthambore safari booking",
            page_url: "online-ranthambore-safari-booking",
            seo_title: 'online ranthambore safari booking',
            seo_description: 'online ranthambore safari booking',
          }),

          new SeoManager({
            page_name: "online chambal moter boat safari booking",
            page_url: "online-chambal-moter-boat-safari-booking",
            seo_title: 'online chambal moter boat safari booking',
            seo_description: 'online chambal moter boat safari booking',
          }),

          new SeoManager({
            page_name: "terms and conditions",
            page_url: "terms-and-conditions",
            seo_title: 'terms and conditions',
            seo_description: 'terms and conditions',
          }),

          new SeoManager({
            page_name: "ranthambore national park",
            page_url: "ranthambore-national-park",
            seo_title: 'ranthambore national park',
            seo_description: 'ranthambore national park',
          }),

      ];

      let done = 0;

      for (let i = 0; i < seo_managers.length; i++) {
        seo_managers[i].save(function (err, result) {
          done++;
        });
      }

      res.send({
        success: true,
        message: "data seeded success!",
        data: done
      });

    } catch (err) {
      console.error(err);
    }
  }
};