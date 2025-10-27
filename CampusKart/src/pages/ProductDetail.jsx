import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { productsAPI } from '../services/api' // Assuming this is your API service

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)

  // Fetch product data from the API when the component mounts or 'id' changes
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await productsAPI.getById(id)
        setProduct(response.data)
      } catch (error) {
        console.error('Failed to fetch product:', error)
        setProduct(null) // Ensure product is null on error
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id]) // Dependency array ensures this runs when 'id' changes

  // Handler for the previous image
  const handlePrev = () => {
    if (!product) return // Guard against null product
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  // Handler for the next image
  const handleNext = () => {
    if (!product) return // Guard against null product
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  // Show loading state
  if (loading) {
    return <Typography variant="h5" sx={{ padding: 4 }}>Loading...</Typography>
  }

  // Show "not found" state if fetching failed or no product was returned
  if (!product) {
    return <Typography variant="h5" sx={{ padding: 4 }}>Product not found</Typography>
  }

  // Once loading is false and product exists, render the details
  return (
    <Box sx={{ padding: 4 }}>
      {/* Image Carousel */}
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

      {/* Product Information */}
      <Typography variant="h4" gutterBottom>{product.title}</Typography>
      <Typography variant="h5" color="primary" gutterBottom>₹{product.price}</Typography>
      <Typography variant="body1" gutterBottom><strong>Category:</strong> {product.category?.name || product.category || 'N/A'}</Typography>
      <Typography variant="body1" gutterBottom><strong>Seller:</strong> {product.sellerId?.name || 'Unknown'}</Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>{product.description}</Typography>

      {/* Action Buttons */}
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