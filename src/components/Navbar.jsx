import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import categories from '../data/categories'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentCategory, setCurrentCategory] = useState(null)
  const navigate = useNavigate()

  const handleCategoryHover = (event, category) => {
    setAnchorEl(event.currentTarget)
    setCurrentCategory(category)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setCurrentCategory(null)
  }

  const handleCategoryClick = (category) => {
    navigate(`/search/${encodeURIComponent(category)}`)
    handleClose()
  }

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo + Site Name */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: 'inherit',
            gap: 1,
          }}
        >
          <Box
            component="img"
            src="/logo.png"
            alt="CampusKart Logo"
            sx={{
              width: 60,    
              height: 60,
              objectFit: 'contain',
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            CampusKart
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          {Object.keys(categories).map((cat) => (
            <Button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              onMouseEnter={(e) => handleCategoryHover(e, cat)}
            >
              {cat}
            </Button>
          ))}

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            {currentCategory &&
              categories[currentCategory].map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleCategoryClick(item)}
                >
                  {item}
                </MenuItem>
              ))}
          </Menu>
        </Box>

        <Button variant="outlined">Login</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
