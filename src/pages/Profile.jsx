import React, { useState, useEffect } from 'react'
import { Box, Typography, Avatar, Divider, Tabs, Tab } from '@mui/material'
import ProductCard from '../components/ProductCard'
import { usersAPI } from '../services/api'

const Profile = ({ products, loggedInUser, fetchProducts }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [userListings, setUserListings] = useState([])
  const [purchases, setPurchases] = useState([])

  const user = loggedInUser || {
    _id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/63.jpg',
  }

  useEffect(() => {
    if (loggedInUser) {
      fetchUserData();
    }
  }, [loggedInUser]);

  const fetchUserData = async () => {
    try {
      const [listingsRes, purchasesRes] = await Promise.all([
        usersAPI.getListings(),
        usersAPI.getPurchases()
      ]);
      setUserListings(listingsRes.data);
      setPurchases(purchasesRes.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const userProducts = loggedInUser ? userListings : products.filter((p) => p.sellerId === user._id)

  const purchasedItems = purchases

  const pendingListings = userProducts.filter((p) => p.status === 'pending')
  const approvedListings = userProducts.filter((p) => p.status === 'active')
  const rejectedListings = userProducts.filter((p) => p.status === 'rejected')

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
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 3 }}
      >
        <Tab label={`My Current Listings (${userProducts.length})`} />
        <Tab label={`Pending (${pendingListings.length})`} />
        <Tab label={`Approved (${approvedListings.length})`} />
        <Tab label={`Rejected (${rejectedListings.length})`} />
        <Tab label={`Purchased Items (${purchasedItems.length})`} />
      </Tabs>

      {activeTab === 0 && (
        <>
          {userProducts.length === 0 ? (
            <Typography color="text.secondary">
              You haven’t posted anything yet.
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
                <ProductCard key={p._id || p.id} product={p} showStatus />
              ))}
            </Box>
          )}
        </>
      )}

      {activeTab === 1 && (
        <>
          {pendingListings.length === 0 ? (
            <Typography color="text.secondary">
              You don’t have any pending listings.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
              }}
            >
              {pendingListings.map((p) => (
                <ProductCard key={p._id || p.id} product={p} showStatus />
              ))}
            </Box>
          )}
        </>
      )}

      {activeTab === 2 && (
        <>
          {approvedListings.length === 0 ? (
            <Typography color="text.secondary">
              No approved listings yet.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
              }}
            >
              {approvedListings.map((p) => (
                <ProductCard key={p._id || p.id} product={p} showStatus />
              ))}
            </Box>
          )}
        </>
      )}

      {activeTab === 3 && (
        <>
          {rejectedListings.length === 0 ? (
            <Typography color="text.secondary">No rejected listings.</Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 3,
              }}
            >
              {rejectedListings.map((p) => (
                <ProductCard key={p._id || p.id} product={p} showStatus />
              ))}
            </Box>
          )}
        </>
      )}

      {activeTab === 4 && (
        <>
          {purchasedItems.length === 0 ? (
            <Typography color="text.secondary">
              You haven’t bought anything yet.
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
                <ProductCard key={p._id || p.id} product={p.productId || p} showStatus />
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  )
}

export default Profile
