const router = require('express').Router()
const apiController = require('../controller/apiController')
const { uploadMultiple, uploadsingle } = require('../middleware/multer')

router.get('/landing-page', apiController.landingPage)


module.exports = router