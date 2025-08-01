import React, { useState } from 'react'
import { Box, Typography, Avatar, Divider, Tabs, Tab } from '@mui/material'
import ProductCard from '../components/ProductCard'

const Profile = ({ products }) => {
  const [activeTab, setActiveTab] = useState(0) 

  // Dummy logged-in user
  const user = {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/63.jpg' //'/placeholder.png', 
  }

  const userProducts = products.filter((p) => p.sellerId === user.id)

  // Dummy purchased items 
  const purchasedItems = [
    {
      id: 101,
      title: 'Headphones',
      price: '1,000',
      category: 'Electronics',
      images: 'https://sonyworld.qa/cdn/shop/files/1_WH-1000XM5_standard_smokypink-Large_707d7e02-993b-4e38-96a3-d107efa9cd42.jpg?v=1728287183&width=1080',
    },
    {
      id: 102,
      title: 'Backpack',
      price: '500',
      category: 'Clothes',
      images: 'https://www.furjaden.com/cdn/shop/files/Website1_b82bff56-474e-4bc6-9c6f-f20c037518a7.jpg?v=1732465038' ,
    },
  ]

  return (
    <Box sx={{ padding: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Avatar src={user.avatar} sx={{ width: 80, height: 80 }} />
        <Box>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="body1" color="text.secondary">
            {user.email}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Tabs
        value={activeTab}
        onChange={(e, val) => setActiveTab(val)}
        textColor="primary"
        indicatorColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label={`My Listings (${userProducts.length})`} />
        <Tab label={`Purchased Items (${purchasedItems.length})`} />
      </Tabs>

      {activeTab === 0 && (
        <>
          {userProducts.length === 0 ? (
            <Typography color="text.secondary">
              You haven't posted anything yet.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
              }}
            >
              {userProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Box>
          )}
        </>
      )}

      {activeTab === 1 && (
        <>
          {purchasedItems.length === 0 ? (
            <Typography color="text.secondary">
              You haven't bought anything yet.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
              }}
            >
              {purchasedItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default Profile
