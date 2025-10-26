const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

console.log('--- Loading Cloudinary Config ---');
console.log('Cloud Name:', process.env.CLOUD_NAME);
console.log('API Key Loaded:', !!process.env.API_KEY);
console.log('API Secret Loaded:', !!process.env.API_SECRET);
console.log('---------------------------------');


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;