
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './Pages/Home.jsx'
import Aboutus from './Pages/Aboutus.jsx'
import Collection from './Pages/Collection.jsx'
import ProductDetail from './Pages/ProductDetail.jsx'
import BestSellers from './Pages/BestSellers.jsx'
import NewArrivals from './Pages/NewArrivals.jsx'
import Location from './Pages/Location.jsx'
import Terms from './Pages/Terms.jsx'
import Admin from './Pages/Admin.jsx'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/bestsellers" element={<BestSellers />} />
          <Route path="/new" element={<NewArrivals />} />
          <Route path="/location" element={<Location />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
