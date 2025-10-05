const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@campuskart.com',
      password: 'admin123',
      role: 'admin',
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
    });

    // Create regular users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'user',
      avatar: 'https://xsgames.co/randomusers/assets/avatars/male/63.jpg',
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'user',
      avatar: 'https://xsgames.co/randomusers/assets/avatars/female/44.jpg',
    });

    console.log('Users created successfully');

    // Create sample products
    const products = [
      {
        title: 'Used Laptop - Dell Inspiron',
        images: [
          'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/inspiron-notebooks/15-3535-amd/spi/plastic/black/ng/notebook-inspiron-15-3535-plastic-black-campaign-hero-504x350-ng.psd?fmt=jpg&wid=570&hei=400',
          'https://m.media-amazon.com/images/I/81zDEfedPCL.jpg',
        ],
        category: 'Electronics',
        price: '30,000',
        description:
          'Used Laptop, Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae aperiam odio impedit nesciunt iusto nam ducimus explicabo commodi maxime amet.',
        sellerId: user1._id,
        status: 'active',
      },
      {
        title: 'Engineering Maths - II Textbook',
        images: [
          'https://www.tcetmumbai.in/image/Staff/hns/Resource/MATHS-II.webp',
        ],
        category: 'Books',
        price: '150',
        description:
          'Engineering Maths 2 Textbook. Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        sellerId: user2._id,
        status: 'active',
      },
      {
        title: 'Scientific Calculator',
        images: [
          'https://scoffco.com/cdn/shop/products/61YjIY_0fDL._SX425.jpg?v=1682332707&width=1445',
        ],
        category: 'Electronics',
        price: '500',
        description: 'Scientific Calculator in good condition.',
        sellerId: user1._id,
        status: 'active',
      },
      {
        title: 'WMP Lab Coat',
        images: [
          'https://kewalson.com/cdn/shop/files/Blue_Cotton_Lab_Coat___KS_COLABD_668764dd-4c66-4ddf-8a70-68e3759f6ef3.jpg?v=1740643424',
        ],
        category: 'Clothes',
        price: '200',
        description: 'WMP Lab Coat, barely used.',
        sellerId: user2._id,
        status: 'active',
      },
    ];

    await Product.insertMany(products);

    console.log('Sample products created successfully');
    console.log('\n=== Seed Data Summary ===');
    console.log('Admin User:');
    console.log('  Email: admin@campuskart.com');
    console.log('  Password: admin123');
    console.log('\nRegular Users:');
    console.log('  Email: john@example.com | Password: password123');
    console.log('  Email: jane@example.com | Password: password123');
    console.log('\nProducts: 4 active products created');
    console.log('========================\n');

    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
