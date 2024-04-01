const createError = require('http-errors');

const ZoneCategory = require('../Models/ZoneCategory.model');


module.exports = {
  seedSeoData: async (req, res, next) => {   
    try {
      await ZoneCategory.deleteMany({});

      const zone_category = [

          new ZoneCategory({
            name: "Zone 1",
            sort: "1",
            availability: 0
          }),

          new ZoneCategory({
            name: "Zone 2",
            sort: "2",
            availability: 0
          }),

          new ZoneCategory({
            name: "Zone 3",
            sort: "3",
            availability: 0
          }),
          new ZoneCategory({
            name: "Zone 4",
            sort: "4",
            availability: 0
          }),
          new ZoneCategory({
            name: "Zone 5",
            sort: "5",
            availability: 0
          }),
          new ZoneCategory({
            name: "Zone 6",
            sort: "6",
            availability: 0
          }),
          new ZoneCategory({
            name: "Zone 7",
            sort: "7",
            availability: 0
          }),
          new ZoneCategory({
            name: "Zone 8",
            sort: "8",
            availability: 0
          }),
          new ZoneCategory({
            name: "Zone 9",
            sort: "9",
            availability: 0
          }),
          new ZoneCategory({
            name: "Zone 10",
            sort: "10",
            availability: 0
          }),

          /*new ZoneCategory({
            name: "Zone 4",
            sort: "4",
            availability: 1
          }),

          new ZoneCategory({
            name: "Zone 5",
            sort: "5",
            availability: 1
          }),

          new ZoneCategory({
            name: "Zone 6",
            sort: "6",
            availability: 1
          }),

          new ZoneCategory({
            name: "Zone 7",
            sort: "7",
            availability: 1
          }),

          new ZoneCategory({
            name: "Zone 8",
            sort: "8",
            availability: 1
          }),

          new ZoneCategory({
            name: "Zone 9",
            sort: "9",
            availability: 1
          }),

          new ZoneCategory({
            name: "Zone 10",
            sort: "10",
            availability: 1
          }),

          new ZoneCategory({
            name: "Zone 11",
            sort: "11",
            availability: 1
          }),

          new ZoneCategory({
            name: "Zone 12",
            sort: "12",
            availability: 1
          })*/
      ];

      let done = 0;

      for (let i = 0; i < zone_category.length; i++) {
        zone_category[i].save(function (err, result) {
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