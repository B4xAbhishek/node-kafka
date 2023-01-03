const mongoose = require('mongoose')
const express = require('express');
const router = express.Router();
const { authUser } = require('../controllers/userController')

router.route('/').post(authUser)

module.exports = router