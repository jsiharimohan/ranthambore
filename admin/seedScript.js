const SeoManager = require('./Models/SeoManager.model');

const seo_managers = [
new SeoManager({
  page_name: "Tony Stark",
  page_url: "tony-stark",
  seo_title: '',
  seo_description: '',
}),
new SeoManager({
  page_name: "Amelia",
  page_url: "amelia",
  seo_title: '',
  seo_description: '',
}),
];

let done = 0;

module.exports = {
  seedData: async (req, res, next) => {

    try {
      await SeoManager.deleteMany({});

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

  },
}