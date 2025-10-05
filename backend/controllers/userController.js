const User = require('../models/User');
const Product = require('../models/Product');
const Purchase = require('../models/Purchase');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      createdAt: user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.avatar = req.body.avatar || user.avatar;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's listings
// @route   GET /api/users/listings
// @access  Private
exports.getUserListings = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user._id })
      .populate('sellerId', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's purchases
// @route   GET /api/users/purchases
// @access  Private
exports.getUserPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({ userId: req.user._id })
      .populate({
        path: 'productId',
        populate: {
          path: 'sellerId',
          select: 'name email avatar',
        },
      })
      .sort({ createdAt: -1 });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Purchase a product
// @route   POST /api/users/purchase/:productId
// @access  Private
exports.purchaseProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.status !== 'active') {
      return res.status(400).json({ message: 'Product is not available' });
    }

    if (product.sellerId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot purchase your own product' });
    }

    // Check if already purchased
    const existingPurchase = await Purchase.findOne({
      userId: req.user._id,
      productId: product._id,
    });

    if (existingPurchase) {
      return res.status(400).json({ message: 'Product already purchased' });
    }

    // Create purchase
    const purchase = await Purchase.create({
      userId: req.user._id,
      productId: product._id,
      sellerId: product.sellerId,
    });

    // Update product status to sold
    product.status = 'sold';
    await product.save();

    const populatedPurchase = await Purchase.findById(purchase._id)
      .populate({
        path: 'productId',
        populate: {
          path: 'sellerId',
          select: 'name email avatar',
        },
      });

    res.status(201).json(populatedPurchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
