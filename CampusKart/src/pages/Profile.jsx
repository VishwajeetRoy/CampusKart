import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Avatar, Divider, Tabs, Tab } from '@mui/material'
import ProductCard from '../components/ProductCard'
import { usersAPI } from '../services/api'

const Profile = ({ products, loggedInUser, fetchProducts }) => {
  const [activeTab, setActiveTab] = useState(0)
  const [userListings, setUserListings] = useState([])
  const [purchases, setPurchases] = useState([])
  const navigate = useNavigate()

  // Fallback user for display purposes if not logged in
  const user = loggedInUser || {
    _id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/63.jpg',
  }

  // Fetch user-specific data (listings and purchases) when the user is available
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

  // Function to navigate to the add listing page with product data to edit
  const handleResubmit = (product) => {
    navigate('/add-listing', { state: { product } });
  };

  // Determine which product list to use
  const userProducts = loggedInUser ? userListings : products.filter((p) => p.sellerId === user._id)

  const purchasedItems = purchases

  // Filter listings based on status for the tabs
  const pendingListings = userProducts.filter((p) => p.status === 'pending')
  const approvedListings = userProducts.filter((p) => p.status === 'active')
  const rejectedListings = userProducts.filter((p) => p.status === 'rejected')

  // Helper function to render a list of products, accepts onResubmit for rejected list
  const renderProductList = (products, emptyMessage, provideResubmit = false) => {
    if (products.length === 0) {
      return <Typography color="text.secondary">{emptyMessage}</Typography>
    }
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 3,
        }}
      >
        {products.map((p) => (
          <ProductCard
            key={p._id || p.id}
            // Handle purchased items which might have product data nested under 'productId'
            product={p.productId || p} 
            showStatus
            // Pass the resubmit handler only if provideResubmit is true
            onResubmit={provideResubmit ? handleResubmit : undefined}
          />
        ))}
      </Box>
    )
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* User Profile Header */}
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

      {/* Tabs */}
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

      {/* Tab Panels */}
      {activeTab === 0 && renderProductList(userProducts, "You haven’t posted anything yet.")}
      {activeTab === 1 && renderProductList(pendingListings, "You don’t have any pending listings.")}
      {activeTab === 2 && renderProductList(approvedListings, "No approved listings yet.")}
      {/* Set the 'provideResubmit' flag to true only for the rejected list */}
      {activeTab === 3 && renderProductList(rejectedListings, "No rejected listings.", true)}
      {activeTab === 4 && renderProductList(purchasedItems, "You haven’t bought anything yet.")}
    </Box>
  )
}

export default Profile