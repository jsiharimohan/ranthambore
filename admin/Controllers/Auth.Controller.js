const createError = require('http-errors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
var bcrypt = require("bcrypt");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) =>
  fetch(...args));

const Auth = require('../Models/Auth.model');

module.exports = {
  getAllAuths: async (req, res, next) => {
    try {
      const results = await Auth.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  getAllAdmins: async (req, res, next) => {
    try {
      const results = await Auth.find({}, { __v: 0 });
      // const results = await Auth.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Auth.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  verifyAToken: async (req, res, next) => {
    try {
      const results = await Auth.find({}, { __v: 0 });
      // const results = await Auth.find({}, { name: 1, price: 1, _id: 0 });
      // const results = await Auth.find({ price: 699 }, {});
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  adminLogout: async (req, res, next) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
      })
      await req.user.save()
      res.send('user Logout')
    } catch (error) {
      res.status(500).send(error)
    }
  },

  adminRegister: async (req, res, next) => {
    try {

      const user = {
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
      };

      const user1 = new Auth({
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
      });

      user1.save((err, user) => {
        if (err) {
          res.status(500)
            .send({
              message: err
            });
          return;
        } else {
          res.status(200)
            .send({
              message: "User Registered successfully"
            })
        }
      });
      /*const auth = new Auth(user);
      const result = await auth.save();
      res.send(result);*/

    } catch (error) {
      console.log(error);
      if (error.name === 'ValidationError') {
        next(createError(201, error.message));
        return;
      }
      next(error);
    }
  },

  adminLoginWithOtp: async (req, res, next) => {
    const { mobile } = req.body;

    if (mobile.length > 10) {
      return next(createError(201, 'Invalid mobile number!'));
    }

    const user = await Auth.find({ mobile: mobile }).count();

    if (user<=0) {
      return next(createError(201, 'Mobile number not exist!'));
    }

    var otp = Math.floor(1000 + Math.random() * 9000);
/*senderid=JUNGSI&channel=Trans&DCS=0&flashsms=0&number=9718717115&text=Your one time password to activate your account is Ranthambore_' . $otp . '. Jungle Safari India'*/
    const response = await fetch(`http://login.pacttown.com/api/mt/SendSMS?user=N2RTECHNOLOGIES&password=994843&senderid=JUNGSI&channel=Trans&DCS=0&flashsms=0&number=${mobile}&text=Your one time password to activate your account is Ranthambore_${otp}. Jungle Safari India`, {method: 'GET'});
    const data = await response.json();
    // console.log('logg',data);

    await Auth.updateOne(
      { mobile: mobile },
      { $set: { otp: otp } },
      { new: true }
      );

    res.status(200)
    .send({
      message: "Login Otp sended successfully",
      mobile: mobile,
    });

  },


  verifyAndLoginWithOtp: async (req, res, next) => {
    const { mobile, otp } = req.body;

    const user = await Auth.find({ mobile: mobile, otp: otp }).count();

    if (user) {


      const user = await Auth.findOne({ mobile: mobile });

      var token = jwt.sign({
        id: user.id
      }, process.env.JWT_SEC, {
        expiresIn: 86400
      });

      user.tokens = user.tokens.concat({ token })
      await user.save();

      res.status(200)
      .send({
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          name: user.name,
        },
        message: "Login successfull",
        accessToken: token,
      });


    }else{
      return next(createError(201, 'Invalid Otp'));
    }

    
  },

  adminLogin: async (req, res, next) => {

    const { email, password } = req.body;

    const user = await Auth.find({ email: email }).count();

    if (user) {

      const user = await Auth.findOne({ email: email });

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(201)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }

      var token = jwt.sign({
        id: user.id
      }, process.env.JWT_SEC, {
        expiresIn: 86400
      });

      user.tokens = user.tokens.concat({ token })
      await user.save();

      res.status(200)
        .send({
          user: {
            id: user._id,
            email: user.email,
            username: user.username,
            name: user.name,
          },
          message: "Login successfull",
          accessToken: token,
        });

    } else {
      next(createError(201, 'Username or password incorrect'));
    }

  },

  findAuthById: async (req, res, next) => {
    const id = req.params.id;
    try {
      const auth = await Auth.findById(id);
      // const auth = await Auth.findOne({ _id: id });
      if (!auth) {
        throw createError(201, 'Auth does not exist.');
      }
      res.send(auth);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(201, 'Invalid Auth id'));
        return;
      }
      next(error);
    }
  },


  resetPassword: async (req, res, next) => {

    if (req.body.password !== req.body.password_confirmation) {

      next(createError(201, "Pass and Confirm Password does not match!"));
      return;
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.current_password,
      req.user.password
    );

    if (!passwordIsValid) {

      next(createError(201, "Invalid or expired current password"));
      return;
    }
    await Auth.updateOne(
      { _id: req.user._id.toString() },
      { $set: { password: bcrypt.hashSync(req.body.password, 8) } },
      { new: true }
    );
    const user = await Auth.findById({ _id: req.user._id.toString() });

    res.send({
      success: true,
      message: 'user fetched!',
      data: user
    });

  },

  profile: async (req, res, next) => {
    try {
      const auth = await Auth.findOne({ _id: req.user._id }, { __v: 0, tokens: 0 });
      if (!auth) {
        throw createError(201, 'Auth does not exist.');
      }
      res.send({
        success: true,
        message: 'user fetched!',
        data: auth
      });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(201, 'Invalid Auth id'));
        return;
      }
      next(error);
    }
  },

  updateAAuth: async (req, res, next) => {
    try {
      const id = req.user._id;

      if (req.file) {
        req.body.avatar = req.file.path;
      }

      const updates = req.body;
      const options = { new: true };

      const result = await Auth.findByIdAndUpdate(id, updates, options);
      if (!result) {
        throw createError(201, 'Auth does not exist');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        return next(createError(201, 'Invalid Auth Id'));
      }
      next(error);
    }
  },

  deleteAAuth: async (req, res, next) => {
    const id = req.params.id;
    try {
      const result = await Auth.findByIdAndDelete(id);
      if (!result) {
        throw createError(201, 'Auth does not exist.');
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(201, 'Invalid Auth id'));
        return;
      }
      next(error);
    }
  }
};