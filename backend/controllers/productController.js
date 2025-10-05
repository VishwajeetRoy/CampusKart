const Product = require('../models/Product');
const User = require('../models/User');

// @desc    Get all active products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: 'active' })
      .populate('sellerId', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'sellerId',
      'name email avatar'
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private
exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, category, images } = req.body;

    // Handle uploaded files
    let imageUrls = images || [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(
        (file) => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      );
    }

    const product = await Product.create({
      title,
      price,
      description,
      category,
      images: imageUrls,
      sellerId: req.user._id,
      status: 'pending',
    });

    const populatedProduct = await Product.findById(product._id).populate(
      'sellerId',
      'name email avatar'
    );

    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the owner
    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Not authorized to update this product' });
    }

    const { title, price, description, category, images } = req.body;

    product.title = title || product.title;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.images = images || product.images;

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

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user is the owner
    if (product.sellerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: 'Not authorized to delete this product' });
    }

    await product.deleteOne();

    res.json({ message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search products
// @route   GET /api/products/search/:query
// @access  Public
exports.searchProducts = async (req, res) => {
  try {
    const query = req.params.query;

    const products = await Product.find({
      status: 'active',
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    })
      .populate('sellerId', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({
      status: 'active',
      category: { $regex: category, $options: 'i' },
    })
      .populate('sellerId', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
