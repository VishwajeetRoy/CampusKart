import React, { useState } from 'react'
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

const AddListing = ({ onAddProduct }) => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = files.map((file) => URL.createObjectURL(file))
    setImages((prev) => [...prev, ...imageUrls])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title || !price || !category) {
      alert('Please fill in all required fields')
      return
    }

    const newProduct = {
      title,
      price,
      description,
      category,
      images: images.length ? images : ['/placeholder.png'],
    }

    onAddProduct(newProduct)

    setTitle('')
    setPrice('')
    setDescription('')
    setCategory('')
    setImages([])
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
        Post a New Item
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
        {images.map((img, idx) => (
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
        Post Item
      </Button>
    </Box>
  )
}

export default AddListing
