# CampusKart Backend API

Backend API for CampusKart - A campus marketplace application built with Express.js and MongoDB.

## Features

- User Authentication (JWT)
- Product Management (CRUD)
- Admin Dashboard
- Image Upload
- Search & Filter Products
- User Profiles
- Purchase Tracking

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (File Upload)
- bcryptjs (Password Hashing)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Environment variables are already configured in `.env` file

3. Seed the database with sample data:
```bash
node seed.js
```

4. Start the development server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Products
- `GET /api/products` - Get all active products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Protected)
- `PUT /api/products/:id` - Update product (Protected)
- `DELETE /api/products/:id` - Delete product (Protected)
- `GET /api/products/search/:query` - Search products
- `GET /api/products/category/:category` - Filter by category

### Admin
- `GET /api/admin/products` - Get all products (Admin only)
- `PUT /api/admin/products/:id/status` - Update product status (Admin only)
- `DELETE /api/admin/products/:id` - Delete any product (Admin only)

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)
- `GET /api/users/listings` - Get user's listings (Protected)
- `GET /api/users/purchases` - Get user's purchases (Protected)
- `POST /api/users/purchase/:productId` - Purchase product (Protected)

## Default Credentials

### Admin Account
- Email: `admin@campuskart.com`
- Password: `admin123`

### Test Users
- Email: `john@example.com` | Password: `password123`
- Email: `jane@example.com` | Password: `password123`

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── productController.js
│   ├── adminController.js
│   └── userController.js
├── middleware/
│   ├── auth.js            # JWT verification
│   └── upload.js          # File upload config
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Purchase.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   ├── admin.js
│   └── users.js
├── uploads/               # Uploaded images
├── .env                   # Environment variables
├── server.js              # Entry point
└── seed.js                # Database seeder
```

## Notes

- Images are stored locally in the `uploads/` directory
- JWT tokens expire in 30 days
- All passwords are hashed using bcryptjs
- CORS is enabled for frontend integration (http://localhost:5173)
