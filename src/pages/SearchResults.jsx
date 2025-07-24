import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import categories from '../data/categories'
import ProductCard from '../components/ProductCard'

const SearchResults = ({ products }) => {
  const { query } = useParams()
  const rawSearch = query.toLowerCase()

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
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
      )}
    </Box>
  )
}

export default SearchResults
