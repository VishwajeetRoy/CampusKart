import React, { useState } from "react";
import { Box, Typography, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import ProductCard from "../components/ProductCard";

const AdminDashboard = ({ products, onUpdateStatus }) => {
  const [filter, setFilter] = useState("pending");

  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) setFilter(newFilter);
  };

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.status === filter);

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
                    onClick={() => onUpdateStatus(product.id, "active")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onUpdateStatus(product.id, "rejected")}
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
