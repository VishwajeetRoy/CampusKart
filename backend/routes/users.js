const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  getUserListings,
  getUserPurchases,
  purchaseProduct,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.get('/listings', protect, getUserListings);
router.get('/purchases', protect, getUserPurchases);
router.post('/purchase/:productId', protect, purchaseProduct);

module.exports = router;
