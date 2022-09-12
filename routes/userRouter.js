const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/login').post(authController.login);
router.route('/register').post(authController.register);

router.route('/');
router.route('/:id');

module.exports = router;
