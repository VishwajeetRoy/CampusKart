import { useState, useMemo, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import productsData from "./data/products";
import AddListing from "./pages/AddListing";
import AdminDashboard from "./pages/AdminDashboard";
import ChatPage from "./pages/ChatPage";
import { Snackbar, Alert, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [products, setProducts] = useState(productsData);
  const [toast, setToast] = useState({ open: false, message: "" });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const saved = localStorage.getItem("loggedInUser");
    return saved ? JSON.parse(saved) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem("loggedInUser");
    }
  }, [loggedInUser]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: darkMode ? "#90caf9" : "#1976d2" },
          secondary: { main: "#4682b4" },
        },
      }),
    [darkMode]
  );

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => {
      const newId = prev.length + 1;
      const productWithId = {
        ...newProduct,
        id: newId,
        sellerId: loggedInUser?.name || "user1",
        status: "pending",
      };
      const updatedProducts = [productWithId, ...prev];
      setToast({ open: true, message: "Item submitted for approval!" });
      navigate("/profile");
      return updatedProducts;
    });
  };

  const handleUpdateStatus = (id, newStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
    setToast({ open: true, message: `Item marked as ${newStatus}` });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <SearchBar />

      <Routes>
        <Route
          path="/"
          element={<Home products={products.filter((p) => p.status === "active")} />}
        />
        <Route
          path="/profile"
          element={<Profile products={products} loggedInUser={loggedInUser} />}
        />
        <Route
          path="/product/:id"
          element={<ProductDetail products={products} />}
        />
        <Route
          path="/chat/:id"
          element={<ChatPage products={products} />}
        />
        <Route
          path="/search/:query"
          element={<SearchResults products={products} />}
        />
        <Route
          path="/add"
          element={<AddListing onAddProduct={handleAddProduct} />}
        />
        <Route
          path="/admin"
          element={
            loggedInUser?.role === "admin" ? (
              <AdminDashboard
                products={products}
                onUpdateStatus={handleUpdateStatus}
              />
            ) : (
              <Navigate to="/" />
            )
          }
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
    </ThemeProvider>
  );
}

export default App;
