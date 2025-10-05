import React, { useState, useEffect } from "react";
import { Box, Typography, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { adminAPI } from "../services/api";

const AdminDashboard = ({ products, onUpdateStatus, fetchProducts }) => {
  const [filter, setFilter] = useState("pending");
  const [adminProducts, setAdminProducts] = useState([]);

  useEffect(() => {
    fetchAdminProducts();
  }, [filter]);

  const fetchAdminProducts = async () => {
    try {
      const response = await adminAPI.getAllProducts(filter);
      setAdminProducts(response.data);
    } catch (error) {
      console.error("Error fetching admin products:", error);
    }
  };

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  const handleUpdateStatus = async (productId, newStatus) => {
    try {
      await adminAPI.updateProductStatus(productId, newStatus);
      fetchAdminProducts();
      if (fetchProducts) fetchProducts();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredProducts = adminProducts;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={handleFilterChange}
        sx={{ marginBottom: 3 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="pending">Pending</ToggleButton>
        <ToggleButton value="active">Approved</ToggleButton>
        <ToggleButton value="rejected">Rejected</ToggleButton>
      </ToggleButtonGroup>

      {filteredProducts.length === 0 ? (
        <Typography>No {filter} listings.</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          {filteredProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                border: "1px solid #ddd",
                borderRadius: 2,
                padding: 2,
              }}
            >
              <ProductCard product={product} showStatus />

              {product.status === "pending" && (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdateStatus(product._id, "active")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleUpdateStatus(product._id, "rejected")}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AdminDashboard;
