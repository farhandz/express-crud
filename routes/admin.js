const router = require('express').Router()
const adminController = require('../controller/adminController')
const { uploadMultiple, uploadsingle } = require('../middleware/multer')
const {isLogin} = require('../middleware/auth')


// sign
router.get('/signin', adminController.viewSign)
router.post('/signin' , adminController.actionSignin)
router.use(isLogin)
router.get('/logout', adminController.actionLogout)
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


// feature
router.get('/item/show-detail-item/:itemId', adminController.viewDetailItem)
router.post('/item/add/feature', uploadsingle, adminController.addFeature);
router.put('/item/update/feature', uploadsingle, adminController.editFeature)
router.delete('/item/:itemId/feature/:id', adminController.deleteFeature);


// activity
router.post('/item/add/activity', uploadsingle, adminController.addActivity)
router.put('/item/update/activity', uploadsingle, adminController.editActivity)
router.delete('/item/:itemId/activity/:id', adminController.deleteActivity);



// booking
router.get('/booking', adminController.viewBooking)
router.get('/booking/:id', adminController.showDetailBooking)


router.put('/booking/:id/confirmation', adminController.actionConfirmation);
router.put('/booking/:id/reject', adminController.actionReject);

module.exports = router