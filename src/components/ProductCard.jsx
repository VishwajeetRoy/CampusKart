import React, { useState, useEffect } from 'react'
import { Card, CardMedia, CardContent, Typography, Chip } from '@mui/material'
import { Link } from 'react-router-dom'

const statusColors = {
  pending: 'warning',
  active: 'success',
  rejected: 'error',
  purchased: 'info',
}

const ProductCard = ({ product, showStatus = false }) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    if (!product.images || product.images.length <= 1) return
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }, 6000)
    return () => clearInterval(interval)
  }, [product.images])

  return (
    <Link to={`/product/${product._id || product.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          width: '100%',
          height: 280,
          borderRadius: 3,
          boxShadow: 2,
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
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

        <CardContent sx={{ textAlign: 'center', paddingY: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₹{product.price}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard
