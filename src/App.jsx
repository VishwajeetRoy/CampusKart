import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import productsData from "./data/products";
import AddListing from "./pages/AddListing";
import { Snackbar, Alert } from "@mui/material";

function App() {
  const [products, setProducts] = useState(productsData);
  const [toast, setToast] = useState({ open: false, message: "" });
  const navigate = useNavigate();

  const handleAddProduct = (newProduct) => {
  setProducts((prev) => {
    const newId = prev.length + 1
    const productWithId = { ...newProduct, id: newId, sellerId: 'user1' } 

    const updatedProducts = [productWithId, ...prev].slice(0, 9)

    setToast({ open: true, message: 'Item posted successfully!' })
    navigate(`/product/${newId}`)

    return updatedProducts
  })
}


  return (
    <>
      <Navbar />
      <SearchBar />

      <Routes>
        <Route path="/" element={<Home products={products} />} />
        <Route path="/profile" element={<Profile products={products} />} />
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} />}
        />
        <Route
          path="/search/:query"
          element={<SearchResults products={products} />}
        />
        <Route
          path="/add"
          element={<AddListing onAddProduct={handleAddProduct} />}
        />
      </Routes>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
