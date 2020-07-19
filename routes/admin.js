const router = require('express').Router()
const adminController = require('../controller/adminController')

router.get('/dashboard', adminController.viewDashboard)

// category
router.get('/category', adminController.viewCategory);
router.post('/category', adminController.addCategory);
router.delete('/category/:id', adminController.deleteCategory);
router.put('/category/', adminController.editCategory)

// bank
router.get('/bank', adminController.viewBank)


//  item
router.get('/item', adminController.viewItem)


// booking
router.get('/booking', adminController.viewBooking)

module.exports = router