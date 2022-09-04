const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth')

//<------------- post request to login ------------->
router
.route('/login')
.post(auth.login);

//<------------- post request to sign up ------------->
router
.route('/register')
.post(auth.signUp);

//<------------- Get user ------------->
router
.route('/user')
.get(auth.getUser);

//<------------- logout user ------------->
router
.route('/logout')
.get(auth.logout);

module.exports = router