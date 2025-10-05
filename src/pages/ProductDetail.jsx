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

const ProductDetail = ({ products }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((p) => p._id === id || p.id === parseInt(id))

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
        <IconButton onClick={handlePrev} sx={{ position: 'absolute', left: 20 }}>
          <ArrowBackIosIcon />
        </IconButton>

        <img
          src={product.images[currentImage]}
          alt={`${product.title}`}
          style={{
            maxWidth: '500px',
            maxHeight: '400px',
            borderRadius: '8px',
            objectFit: 'cover',
          }}
        />

        <IconButton onClick={handleNext} sx={{ position: 'absolute', right: 20 }}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Typography variant="h4" gutterBottom>{product.title}</Typography>
      <Typography variant="h5" color="primary" gutterBottom>₹{product.price}</Typography>
      <Typography variant="body1" gutterBottom><strong>Category:</strong> {product.category}</Typography>
      <Typography variant="body1" gutterBottom><strong>Seller:</strong> {product.sellerId?.name || 'Unknown'}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>{product.description}</Typography>

      <Box sx={{ marginTop: 3 }}>
        <Button
          variant="contained"
          sx={{ marginRight: 2 }}
          onClick={() => navigate(`/chat/${product._id || product.id}`)}
        >
          Contact Seller
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>Go Back</Button>
      </Box>
    </Box>
  )
}

export default ProductDetail
