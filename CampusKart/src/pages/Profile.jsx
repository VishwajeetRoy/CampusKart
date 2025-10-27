import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import ProductCard from '../components/ProductCard';
import { usersAPI } from '../services/api';

const Profile = ({ products, loggedInUser, fetchProducts, setLoggedInUser }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [userListings, setUserListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [avatarHover, setAvatarHover] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  // const [soldItems, setSoldItems] = useState([]);
  const navigate = useNavigate();

  // Fallback user for display purposes if not logged in
  const user = loggedInUser || {
    _id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://xsgames.co/randomusers/assets/avatars/male/63.jpg',
  };

  // Fetch user-specific data (listings, purchases, and sold items)
  useEffect(() => {
    if (loggedInUser) {
      fetchUserData();
    }
  }, [loggedInUser]);

  const fetchUserData = async () => {
    try {
      const [listingsRes, purchasesRes] = await Promise.all([
        usersAPI.getListings(),
        usersAPI.getPurchases(),
      ]);
      setUserListings(listingsRes.data);
      setPurchases(purchasesRes.data);
      // No need to combine here - we'll handle this in the rendering
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


  // Function to navigate to the add listing page with product data to edit
  const handleResubmit = (product) => {
    navigate('/add', { state: { product } });
  };

  // Function to handle marking product as sold
  const handleMarkAsSold = async (product) => {
    if (window.confirm('Are you sure you want to mark this product as sold?')) {
      try {
        await usersAPI.markAsSold(product._id);
        // Refresh user data to update the lists
        fetchUserData();
        alert('Product marked as sold successfully!');
      } catch (error) {
        console.error('Error marking product as sold:', error);
        alert('Failed to mark product as sold. Please try again.');
      }
    }
  };

  // Handle avatar file upload
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size (5MB limit)
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await usersAPI.updateProfile(formData);

      // Update the logged in user state with new avatar
      setLoggedInUser((prev) => ({
        ...prev,
        avatar: response.data.avatar,
      }));

      setUploadDialogOpen(false);
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Error updating avatar:', error);
      alert('Failed to update profile picture. Please try again.');
    }
  };

  // Determine which product list to use (API data if logged in, otherwise fallback)
  const userProducts = loggedInUser
    ? userListings
    : products.filter((p) => p.sellerId === user._id);
  const purchasedItems = purchases;
  
  // Get sold items from user listings
  const soldItems = userProducts.filter((p) => p.status === 'sold');
  
  // Combine purchases and sold items for the Items tab
  const allItems = [
    ...purchasedItems,
    ...soldItems.map(item => ({
      ...item,
      isSoldItem: true,
      productId: item
    }))
  ];

  // Filter listings based on status for the tabs
  const pendingListings = userProducts.filter((p) => p.status === 'pending');
  const approvedListings = userProducts.filter((p) => p.status === 'active');
  const rejectedListings = userProducts.filter((p) => p.status === 'rejected');

  // Helper function to render a list of products
  const renderProductList = (
    products,
    emptyMessage,
    provideResubmit = false,
    provideMarkAsSold = false
  ) => {
    if (products.length === 0) {
      return <Typography color="text.secondary">{emptyMessage}</Typography>;
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
            onMarkAsSold={provideMarkAsSold ? handleMarkAsSold : undefined}
            isOwner={true}
            isSoldItem={p.isSoldItem || false}
          />
        ))}
      </Box>
    );
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* User Profile Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setAvatarHover(true)}
          onMouseLeave={() => setAvatarHover(false)}
        >
          <Avatar
            src={user.avatar}
            sx={{ width: 80, height: 80, cursor: 'pointer' }}
            onClick={() => setUploadDialogOpen(true)}
          />
          {avatarHover && (
            <IconButton
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                },
              }}
              onClick={() => setUploadDialogOpen(true)}
            >
              <EditIcon />
            </IconButton>
          )}
        </Box>
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
        {/* <Tab label={`Sold Items (${soldItems.length})`} /> */}
        <Tab label={` Items (${allItems.length})`} />
      </Tabs>

      {/* Tab Panels */}
      {activeTab === 0 &&
        renderProductList(userProducts, "You haven't posted anything yet.")}
      {activeTab === 1 &&
        renderProductList(pendingListings, "You don't have any pending listings.")}
      {/* Approved listings allow 'Mark as Sold' action */}
      {activeTab === 2 &&
        renderProductList(approvedListings, 'No approved listings yet.', false, true)}
      {/* Rejected listings allow 'Resubmit' action */}
      {activeTab === 3 &&
        renderProductList(rejectedListings, 'No rejected listings.', true)}
      {/* Combined Items tab (purchases + sold items) */}
      {activeTab === 4 &&
        renderProductList(allItems, "You haven't bought or sold anything yet.")}

      {/* // ... existing code ... */}

      {/* Avatar Upload Dialog */}
      <Dialog open={uploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>Update Profile Picture</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Select a new profile picture. Maximum file size: 5MB. Supported
            formats: JPEG, PNG, GIF, WebP.
          </Typography>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="avatar-upload"
            type="file"
            onChange={handleAvatarUpload}
          />
          <label htmlFor="avatar-upload">
            <Button variant="contained" component="span">
              Choose File
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;