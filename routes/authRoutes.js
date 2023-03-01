const express = require('express');

const {createUser, checkUser} = require('../services/authServices')

const router = express.Router();

router.route('/register').post( createUser)
router.route('/login').post(checkUser)

module.exports = router

