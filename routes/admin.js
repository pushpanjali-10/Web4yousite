const express = require('express')
const router = express.Router()
const adminController = require('../controller/admincontroller')


router.get('/', adminController.getHome);

router.get('/compose',adminController.getCompose)

router.post('/compose',adminController.postCompose)

router.get('/exists',adminController.getExists)

module.exports = router