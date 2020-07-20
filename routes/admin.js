const router = require('express').Router()
const adminController = require('../controller/adminController')
const {upload} = require('../middleware/multer')

router.get('/dashboard', adminController.viewDashboard)

// category
router.get('/category', adminController.viewCategory);
router.post('/category', adminController.addCategory);
router.delete('/category/:id', adminController.deleteCategory);
router.put('/category/', adminController.editCategory)

// bank
router.get('/bank', adminController.viewBank)
router.post('/bank', upload ,adminController.addBank)
router.delete('/bank/:id', adminController.deleteBank)
router.put('/bank', upload, adminController.editBank)


//  item
router.get('/item', adminController.viewItem)


// booking
router.get('/booking', adminController.viewBooking)

module.exports = router