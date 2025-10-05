const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  updateProductStatus,
  deleteProduct,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

router.get('/products', protect, admin, getAllProducts);
router.put('/products/:id/status', protect, admin, updateProductStatus);
router.delete('/products/:id', protect, admin, deleteProduct);

module.exports = router;
