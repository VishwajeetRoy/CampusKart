import React from "react";
import { Box } from "@mui/material";
import ProductCard from "../components/ProductCard";

const Home = ({ products }) => {
  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 3,
          width: '100%',
          alignItems: 'stretch',
        }}
      >
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </Box>
    </Box>
  );
};

export default Home;
