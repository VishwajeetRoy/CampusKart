import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import categories from '../data/categories'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { productsAPI } from '../services/api'

const AddListing = ({ onAddProduct, loggedInUser }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [imageFiles, setImageFiles] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.state && location.state.product) {
      const { product } = location.state
      setEditingProduct(product)
      setTitle(product.title)
      setPrice(product.price)
      setDescription(product.description)
      setCategory(product.category)
      setImagePreviews(product.images || [])
    }
  }, [location.state])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    
    if (imageFiles.length + files.length > 5) {
      alert('Maximum 5 images allowed')
      return
    }
    
    setImageFiles((prev) => [...prev, ...files])
    
    const previews = files.map((file) => URL.createObjectURL(file))
    setImagePreviews((prev) => [...prev, ...previews])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!loggedInUser) {
      alert('Please login to add a listing')
      return
    }

    if (!title || !price || !category) {
      alert('Please fill in all required fields')
      return
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    
    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      if (editingProduct) {
        if (imageFiles.length === 0) {
          imagePreviews.forEach(url => formData.append('images', url));
        }
        await productsAPI.update(editingProduct._id, formData);
        alert('Product updated successfully and sent for re-approval!');
      } else {
        await onAddProduct(formData);
      }
      navigate('/profile');
    } catch (error) {
      console.error('Failed to submit product:', error);
      alert('Failed to submit product. Please try again.');
    }
  }


  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '30px auto',
        padding: '20px',
        boxShadow: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h5" fontWeight="bold">
        {editingProduct ? 'Edit Your Item' : 'Post a New Item'}
      </Typography>

      <TextField
        label="Product Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TextField
        label="Price"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        InputProps={{
          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
        }}
      />

      <TextField
        select
        label="Category"
        fullWidth
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {Object.keys(categories).map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Button
        variant="outlined"
        component="label"
        startIcon={<AddPhotoAlternateIcon />}
      >
        Upload Images
        <input
          type="file"
          hidden
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
      </Button>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {imagePreviews.map((img, idx) => (
          <Box
            key={idx}
            component="img"
            src={img}
            alt={`Preview ${idx}`}
            sx={{
              width: 100,
              height: 100,
              objectFit: 'cover',
              borderRadius: 1,
              boxShadow: 1,
            }}
          />
        ))}
      </Box>

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {editingProduct ? 'Resubmit for Approval' : 'Post Item'}
      </Button>
    </Box>
  )
}

export default AddListing