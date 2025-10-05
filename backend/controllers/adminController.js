const Product = require('../models/Product');

// @desc    Get all products (all statuses)
// @route   GET /api/admin/products
// @access  Private/Admin
exports.getAllProducts = async (req, res) => {
  try {
    const { status } = req.query;

    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }

    const products = await Product.find(query)
      .populate('sellerId', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product status
// @route   PUT /api/admin/products/:id/status
// @access  Private/Admin
exports.updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['pending', 'active', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.status = status;
    const updatedProduct = await product.save();

    const populatedProduct = await Product.findById(updatedProduct._id).populate(
      'sellerId',
      'name email avatar'
    );

    res.json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete any product
// @route   DELETE /api/admin/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    res.json({ message: 'Product removed by admin' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
