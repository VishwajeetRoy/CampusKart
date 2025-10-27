const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getUserListings,
  getUserPurchases,
  purchaseProduct,
  markProductAsSold,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.get('/listings', protect, getUserListings);
router.get('/purchases', protect, getUserPurchases);
router.post('/purchase/:productId', protect, purchaseProduct);
router.put('/listings/:productId/sold', protect, markProductAsSold);

module.exports = router;
