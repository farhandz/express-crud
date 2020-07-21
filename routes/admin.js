const router = require('express').Router()
const adminController = require('../controller/adminController')
const { uploadMultiple, uploadsingle } = require('../middleware/multer')

router.get('/dashboard', adminController.viewDashboard)

// category
router.get('/category', adminController.viewCategory);
router.post('/category', adminController.addCategory);
router.delete('/category/:id', adminController.deleteCategory);
router.put('/category/', adminController.editCategory)

// bank
router.get('/bank', adminController.viewBank)
router.post('/bank', uploadsingle ,adminController.addBank)
router.delete('/bank/:id', adminController.deleteBank)
router.put('/bank', uploadsingle, adminController.editBank)


//  item
router.get('/item', adminController.viewItem)
router.get('/item/show-image/:id', adminController.showImageItem)
router.get('/item/:id', adminController.showEDititem)
router.post('/item', uploadMultiple, adminController.addItem)
router.put('/item/:id', uploadMultiple, adminController.editItem)
router.delete('/item/:id/delete',adminController.deleteItem)
router.get('/item/show-detail-item/:id', adminController.viewDetailItem)


// booking
router.get('/booking', adminController.viewBooking)

module.exports = router