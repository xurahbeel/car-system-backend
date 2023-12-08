const express = require('express');
const controller = require('../../../controller/main/car.controller');
const router = express.Router();


router.route('/add').post(controller.uploadMultiImage)


module.exports = router;