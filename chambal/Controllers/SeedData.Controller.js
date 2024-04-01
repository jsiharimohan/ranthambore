const createError = require('http-errors');

const Price = require('../Models/Price.model');


module.exports = {
  seedPriceData: async (req, res, next) => {   
    try {
      await Price.deleteMany({});

      const prices = [

          new Price({
            name: "Safari Per Person Price Indian",
            price: 1800
          }),

          new Price({
            name: "Safari Per Person Price Foreigner",
            price: 2500
          }),

          new Price({
            name: "Pickup Drop Per Jeep Price",
            price: 3200
          }),

          new Price({
            name: "Pickup Drop Per Canter Price",
            price: 6500
          }),

          new Price({
            name: "Lunch Per Person Price",
            price: 750
          })
      ];

      let done = 0;

      for (let i = 0; i < prices.length; i++) {
        prices[i].save(function (err, result) {
          done++;
        });
      }

      res.send({
        success: true,
        message: "data seeded success!",
      });

    } catch (err) {
      console.error(err);
    }
  }
};