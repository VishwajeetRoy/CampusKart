import React, { useState, useEffect } from 'react'
import { Card, CardMedia, CardContent, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }, 6000)
    return () => clearInterval(interval)
  }, [product.images.length])

  return (
    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
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
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          image={product.images[currentImage]}
          alt={product.title}
          sx={{
            height: 180,
            objectFit: 'contain',
            transition: 'opacity 0.5s ease',
          }}
        />

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
