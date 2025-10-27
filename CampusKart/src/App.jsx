import { useState, useMemo, useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import AddListing from "./pages/AddListing";
import AdminDashboard from "./pages/AdminDashboard";
import ChatPage from "./pages/ChatPage";
import { Snackbar, Alert, CssBaseline, CircularProgress, Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { productsAPI } from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

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

  // Fetch products from backend
  useEffect(() => {
    const fetchData = async () => {
      // Simulate a delay to ensure backend is up
      await new Promise((resolve) => setTimeout(resolve, 2000));
      fetchProducts();
    };
    fetchData();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setToast({ 
        open: true, 
        message: "Failed to load products", 
        severity: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await productsAPI.create(newProduct);
      setProducts((prev) => [response.data, ...prev]);
      setToast({ 
        open: true, 
        message: "Item submitted for approval!", 
        severity: "success" 
      });
      navigate("/profile");
    } catch (error) {
      console.error("Error adding product:", error);
      setToast({ 
        open: true, 
        message: error.response?.data?.message || "Failed to add product", 
        severity: "error" 
      });
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await productsAPI.update(id, { status: newStatus });
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, status: newStatus } : p))
      );
      setToast({ 
        open: true, 
        message: `Item marked as ${newStatus}`, 
        severity: "success" 
      });
      fetchProducts(); // Refresh products
    } catch (error) {
      console.error("Error updating status:", error);
      setToast({ 
        open: true, 
        message: "Failed to update status", 
        severity: "error" 
      });
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setToast={setToast}
      />
      <SearchBar />

      <Routes>
        <Route
          path="/"
          element={<Home products={products.filter((p) => p.status === "active")} />}
        />
        <Route
          path="/profile"
          element={<Profile products={products} loggedInUser={loggedInUser} fetchProducts={fetchProducts} />}
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
          element={<AddListing onAddProduct={handleAddProduct} loggedInUser={loggedInUser} />}
        />
        <Route
          path="/admin"
          element={
            loggedInUser?.role === "admin" ? (
              <AdminDashboard
                products={products}
                onUpdateStatus={handleUpdateStatus}
                fetchProducts={fetchProducts}
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
        <Alert severity={toast.severity || "success"} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
