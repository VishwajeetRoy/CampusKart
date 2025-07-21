import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import products from '../data/products'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p.id === parseInt(id))

  const [currentImage, setCurrentImage] = useState(0)

  if (!product) {
    return <Typography variant="h5">Product not found</Typography>
  }

  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 2,
        }}
      >
        <IconButton
          onClick={handlePrev}
          sx={{
            position: 'absolute',
            left: 20,
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.7)',
            '&:hover': { backgroundColor: 'white' },
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <img
          src={product.images[currentImage]}
          alt={`${product.title} - ${currentImage + 1}`}
          style={{
            maxWidth: '500px',
            maxHeight: '400px',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />

        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 20,
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.7)',
            '&:hover': { backgroundColor: 'white' },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1,
          marginBottom: 3,
        }}
      >
        {product.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setCurrentImage(index)}
            style={{
              width: '80px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: '4px',
              cursor: 'pointer',
              border: index === currentImage ? '2px solid #1976d2' : '2px solid transparent',
              transition: 'border 0.2s ease',
            }}
          />
        ))}
      </Box>

      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom>
        ₹{product.price}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Category:</strong> {product.category}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Seller:</strong> John Doe
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {product.description}
      </Typography>

      <Box sx={{ marginTop: 3 }}>
        <Button variant="contained" sx={{ marginRight: 2 }}>
          Contact Seller
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    </Box>
  )
}

export default ProductDetail
