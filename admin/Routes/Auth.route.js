const express = require('express');
const router = express.Router();

const path = require('path');

var multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(__dirname);
    cb(null, 'uploads/profile/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
var uploads = multer({ storage: storage });

const AuthController = require('../Controllers/Auth.Controller');

const { verifyUserToken } = require("../Middleware/auth");

router.get('/info', [verifyUserToken], AuthController.verifyAToken);

router.get('/users', [verifyUserToken], AuthController.getAllAdmins);

router.get('/profile', [verifyUserToken], AuthController.profile);

//Create a new user admin
router.post('/login', AuthController.adminLogin);

router.post('/login-by-otp', AuthController.adminLoginWithOtp);
router.post('/verify-and-login', AuthController.verifyAndLoginWithOtp);

router.get('/logout', [verifyUserToken], AuthController.adminLogout);

router.post('/register', AuthController.adminRegister);
router.post('/update-password', [verifyUserToken], AuthController.resetPassword);

//Get a user admin by id
router.get('/:id', AuthController.findAuthById);

//Update a user admin by id
router.patch('/profile', [verifyUserToken], uploads.single('avatar'), AuthController.updateAAuth);

//Delete a user admin by id
router.delete('/:id', AuthController.deleteAAuth);

module.exports = router;