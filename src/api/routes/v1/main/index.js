const express = require('express')
const userRoutes = require('./user.route')
const carRoutes = require('./car.route')


const router = express.Router()

router.use('/car',carRoutes)
router.use('/user', userRoutes)

module.exports = router