import React, { useState, useEffect } from 'react'
import { Card, CardMedia, CardContent, Typography, Chip, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const statusColors = {
  pending: 'warning',
  active: 'success',
  rejected: 'error',
  purchased: 'info',
}

const ProductCard = ({ product, showStatus = false, onResubmit }) => {
  const [currentImage, setCurrentImage] = useState(0)
  const navigate = useNavigate()

  // Image carousel effect
  useEffect(() => {
    if (!product.images || product.images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }, 6000)
    return () => clearInterval(interval)
  }, [product.images])

  // Handles clicks on the card
  const handleCardClick = (e) => {
    // Check if the click originated from the resubmit button
    if (e.target.closest('.resubmit-button')) {
      e.preventDefault() // Prevent any other click behavior
      onResubmit(product) // Call the resubmit function
    } else {
      // If not the button, navigate to the product detail page
      navigate(`/product/${product._id || product.id}`)
    }
  }

  return (
    // Use a div with onClick instead of Link to handle conditional navigation
    <div 
      onClick={handleCardClick} 
      style={{ textDecoration: 'none', cursor: 'pointer' }}
    >
      <Card
        sx={{
          width: '100%',
          height: 'auto', // Allow height to adjust for the button
          minHeight: 280,  // Keep a minimum height
          borderRadius: 3,
          boxShadow: 2,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          image={
            Array.isArray(product.images)
              ? product.images[currentImage]
              : product.images
          }
          alt={product.title}
          sx={{
            height: 180,
            objectFit: 'contain',
            transition: 'opacity 0.5s ease',
          }}
        />

        {showStatus && product.status && (
          <Chip
            label={
              product.status === 'active'
                ? 'Active'
                : product.status.charAt(0).toUpperCase() + product.status.slice(1)
            }
            color={statusColors[product.status] || 'default'}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontWeight: 'bold',
            }}
          />
        )}

        <CardContent sx={{ textAlign: 'center', paddingY: 1, flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{product.price}
          </Typography>
          {product.status === 'rejected' && product.rejectionReason && (
            <Typography variant="caption" color="error">
              Reason: {product.rejectionReason}
            </Typography>
          )}
          {/* This is the new button from the second file */}
          {product.status === 'rejected' && onResubmit && (
            <Button
              className="resubmit-button"
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                onResubmit(product);
              }}
            >
              Resubmit
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ProductCard