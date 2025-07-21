import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddListing from './pages/AddListing'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ProductDetail from './pages/ProductDetail'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <>
  <Navbar />
  <SearchBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddListing />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/search/:query" element={<SearchResults />} />
    </Routes>
    </>
  )
}

export default App
