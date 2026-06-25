# CampusKart - Marketplace for Students

A full-stack campus marketplace application where students can buy and sell items. Built with React (frontend) and Express.js + MongoDB (backend).

## Features

### User Features
- **Authentication**: Register and login with JWT-based authentication
- **Product Listings**: Browse active products on the marketplace
- **Search & Filter**: Search products by name or filter by category
- **Add Listings**: Post items for sale with images (up to 5 images)
- **User Profile**: View your listings and purchase history
- **Product Details**: View detailed information about products

### Admin Features
- **Admin Dashboard**: Manage all product listings
- **Approve/Reject**: Review and approve or reject pending listings
- **Product Management**: View all products with different statuses (pending, active, rejected)

## Tech Stack

### Frontend
- React 19
- Material-UI (MUI)
- React Router DOM
- Axios
- Vite

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (File Upload)
- bcryptjs (Password Hashing)

## Project Structure

```
camptest/
├── CampusKart/          # Frontend (React)
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   └── data/        # Static data
│   └── package.json
│
└── backend/             # Backend (Express + MongoDB)
    ├── config/          # Database configuration
    ├── controllers/     # Route controllers
    ├── middleware/      # Custom middleware
    ├── models/          # Mongoose models
    ├── routes/          # API routes
    ├── uploads/         # Uploaded images
    ├── server.js        # Entry point
    └── seed.js          # Database seeder
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. The `.env` file is already configured with MongoDB URI

4. Seed the database with sample data:
```bash
node seed.js
```

5. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd CampusKart
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Default Credentials

### Admin Account
- **Email**: `admin@campuskart.com`
- **Password**: `admin123`

### Test User Accounts
- **Email**: `john@example.com` | **Password**: `password123`
- **Email**: `jane@example.com` | **Password**: `password123`

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

### Admin (Protected - Admin Only)
- `GET /api/admin/products` - Get all products
- `PUT /api/admin/products/:id/status` - Update product status
- `DELETE /api/admin/products/:id` - Delete any product

### Users (Protected)
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/listings` - Get user's listings
- `GET /api/users/purchases` - Get user's purchases
- `POST /api/users/purchase/:productId` - Purchase product

## Features Overview

### For Students (Users)
1. **Browse Products**: View all active listings on the homepage
2. **Search**: Search for specific items or browse by category
3. **Post Listings**: Add new items for sale with images and descriptions
4. **Manage Listings**: View and track your posted items (pending, approved, rejected)
5. **Profile**: Access your profile to see all your listings and purchases

### For Admins
1. **Dashboard Access**: Special admin panel for managing the marketplace
2. **Review Listings**: Approve or reject pending product listings
3. **Product Management**: View all products regardless of status
4. **User Management**: Monitor all marketplace activities

## Image Upload

- Images are stored locally in the `backend/uploads/` directory
- Maximum 5 images per product
- Maximum file size: 5MB per image
- Supported formats: JPEG, PNG, GIF, WebP

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes with middleware
- Role-based access control (User/Admin)
- Input validation with express-validator

## Development Notes

- The backend uses CORS to allow requests from `http://localhost:5173`
- MongoDB connection is configured for MongoDB Atlas
- File uploads are handled by Multer middleware
- All passwords are hashed before storing in the database
- JWT tokens expire in 30 days

## Future Enhancements

- [ ] Chat feature between buyers and sellers
- [ ] Email notifications
- [ ] Payment integration
- [ ] Product ratings and reviews
- [ ] Advanced search filters
- [ ] User verification system
- [ ] Mobile responsive improvements

## Troubleshooting

### Backend Issues
- **MongoDB Connection Error**: Check if MongoDB URI is correct in `.env`
- **Port Already in Use**: Change PORT in `.env` or kill the process using port 5000

### Frontend Issues
- **API Connection Error**: Ensure backend is running on port 5000
- **CORS Error**: Check if backend CORS is configured for `http://localhost:5173`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For support, email support@campuskart.com or open an issue in the repository.
>>>>>>> 7277924 (Initial commit: Added the backend and integrated with frontend)
