import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography, CircularProgress } from '@mui/material'
import categories from '../data/categories'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'

const SearchResults = ({ products }) => {
  const { query } = useParams()
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const rawSearch = query.toLowerCase()

  useEffect(() => {
    performSearch()
  }, [query])

  const performSearch = async () => {
    try {
      setLoading(true)
      
      // Check if query is a category
      const isCategory = Object.keys(categories).some(
        cat => cat.toLowerCase() === rawSearch
      )
      
      if (isCategory) {
        const response = await productsAPI.getByCategory(query)
        setSearchResults(response.data)
      } else {
        const response = await productsAPI.search(query)
        setSearchResults(response.data)
      }
    } catch (error) {
      console.error('Search error:', error)
      // Fallback to local filtering
      performLocalSearch()
    } finally {
      setLoading(false)
    }
  }

  const performLocalSearch = () => {
    const searchTerm =
      rawSearch.endsWith('s') && rawSearch.length > 3
        ? rawSearch.slice(0, -1)
        : rawSearch

    let parentCategory = null
    for (const [cat, subcats] of Object.entries(categories)) {
      if (subcats.some((sub) => sub.toLowerCase() === rawSearch)) {
        parentCategory = cat
        break
      }
    }

    const filteredProducts = products.filter((p) => {
      const titleLower = p.title.toLowerCase()
      const categoryLower = p.category.toLowerCase()

      const titleMatch =
        titleLower.includes(searchTerm) || titleLower.includes(rawSearch)
      const categoryMatch =
        categoryLower.includes(searchTerm) || categoryLower.includes(rawSearch)

      const subcategoryMatch =
        parentCategory &&
        categoryLower === parentCategory.toLowerCase() &&
        (titleLower.includes(searchTerm) || titleLower.includes(rawSearch))

      return titleMatch || categoryMatch || subcategoryMatch
    })
    
    setSearchResults(filteredProducts)
  }

  const filteredProducts = searchResults

  if (loading) {
    return (
      <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Search Results for: "{query}"
      </Typography>

      {filteredProducts.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No results found.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 3,
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default SearchResults
