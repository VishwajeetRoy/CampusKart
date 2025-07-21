import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  TextField,
  InputAdornment,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'

const SearchBar = () => {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchText.trim())}`)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingX: 2,
        paddingY: 1,
        width: '100%',
        gap: 1,
        overflowX: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Search for an item"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={handleKeyPress}
        fullWidth
        sx={{
          flexBasis: '70%',
          borderRadius: '12px',
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: {
            borderRadius: '12px',
            height: '48px',
          },
        }}
      />

      <Button
        variant="contained"
        onClick={handleSearch}
        sx={{
          backgroundColor: 'steelblue',
          color: 'white',
          textTransform: 'none',
          borderRadius: '12px',
          height: '48px',
          px: 3,
        }}
      >
        Search
      </Button>

      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        sx={{
          textTransform: 'none',
          borderRadius: '12px',
          height: '48px',
          px: 14,
          whiteSpace: 'nowrap',
        }}
      >
        Post an item
      </Button>
    </Box>
  )
}

export default SearchBar
