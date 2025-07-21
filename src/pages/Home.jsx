import React from "react";
import { Box } from "@mui/material";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const displayedProducts = products.slice(0, 9); 

  return (
    <>
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
          {displayedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Home;
