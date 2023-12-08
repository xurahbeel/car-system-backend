const express = require('express');
const controller = require('../../../controller/main/user.controller');
const router = express.Router();


router.route('/sign-in').post(controller.sigin)


module.exports = router;