import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { CartProvider } from './context/CartContext';
import './App.css';

// Customer Pages
import Home from './pages/Home';
import Browse from './pages/Browse';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import SubscriptionMeals from './pages/SubscriptionMeals';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MealDetails from './pages/MealDetails';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import CookiePolicy from './pages/CookiePolicy';
import Explore from './pages/Explore';
import News from './pages/News';
import NotFound from './pages/NotFound';

// Vendor Portal Pages
import VendorHome from './pages/VendorHome';
import VendorLogin from './pages/VendorLogin';
import VendorRegister from './pages/VendorRegister';
import VendorDashboard from './pages/VendorDashboard';
import VendorProfile from './pages/VendorProfile';
import VendorSettings from './pages/VendorSettings';
import WhyPartner from './pages/WhyPartner';
import Pricing from './pages/Pricing';
import Support from './pages/Support';

// Auth Pages
import UnifiedLogin from './pages/UnifiedLogin';
import RoleSelection from './pages/RoleSelection';
import RiderRegister from './pages/RiderRegister';
import RiderLogin from './pages/RiderLogin';

// Delivery Portal Pages
import DeliveryHome from './pages/DeliveryHome';
import DeliveryDashboard from './pages/DeliveryDashboard';
import DeliveryProfile from './pages/DeliveryProfile';
import DeliveryEarnings from './pages/DeliveryEarnings';
import DeliveryFAQ from './pages/DeliveryFAQ';
import DeliverySettings from './pages/DeliverySettings';

// Layouts
import VendorLayout from './layouts/VendorLayout';
import DeliveryLayout from './layouts/DeliveryLayout';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const theme = {
  token: {
    colorPrimary: '#ff6b35',
    borderRadius: 8,
    fontFamily: "'Segoe UI', 'Roboto', sans-serif",
  },
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <CartProvider>
        <Router>
        <Routes>
          {/* Customer-Facing Routes */}
          <Route path="/*" element={
            <div className="App">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="" element={<Home />} />
                  <Route path="login" element={<Login />} />
                  <Route path="unified-login" element={<UnifiedLogin />} />
                  <Route path="register" element={<Register />} />
                  <Route path="role-selection" element={<RoleSelection />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="browse" element={<Browse />} />
                  <Route path="explore-meals" element={<Browse />} />
                  <Route path="meals/:id" element={<MealDetails />} />
                  <Route path="how-it-works" element={<HowItWorks />} />
                  <Route path="about" element={<About />} />
                  <Route path="careers" element={<Careers />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="cookie-policy" element={<CookiePolicy />} />
                  <Route path="explore" element={<Explore />} />
                  <Route path="news" element={<News />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="subscriptions" element={<SubscriptionMeals />} />
                </Routes>
              </main>
              <Footer />
            </div>
          } />

          {/* Vendor Partner Portal */}
          <Route path="/partners" element={
            <VendorLayout>
              <VendorHome />
            </VendorLayout>
          } />
          <Route path="/partners/about" element={<WhyPartner />} />
          <Route path="/partners/pricing" element={<Pricing />} />
          <Route path="/partners/support" element={<Support />} />

          <Route path="/vendor-login" element={<VendorLogin />} />
          <Route path="/vendor-register" element={<VendorRegister />} />
          <Route path="/rider-login" element={<RiderLogin />} />
          <Route path="/rider-register" element={<RiderRegister />} />
          <Route path="/vendor-dashboard" element={
            <VendorLayout>
              <VendorDashboard />
            </VendorLayout>
          } />
          <Route path="/vendor-profile" element={
            <VendorLayout>
              <VendorProfile />
            </VendorLayout>
          } />
          <Route path="/vendor-settings" element={
            <VendorLayout>
              <VendorSettings />
            </VendorLayout>
          } />

          {/* Delivery Partner Portal */}
          <Route path="/delivery-partners" element={
            <DeliveryLayout>
              <DeliveryHome />
            </DeliveryLayout>
          } />
          <Route path="/delivery-dashboard" element={
            <DeliveryLayout>
              <DeliveryDashboard />
            </DeliveryLayout>
          } />
          <Route path="/delivery-profile" element={
            <DeliveryLayout>
              <DeliveryProfile />
            </DeliveryLayout>
          } />
          <Route path="/delivery-partners/earnings" element={
            <DeliveryLayout>
              <DeliveryEarnings />
            </DeliveryLayout>
          } />
          <Route path="/delivery-partners/faq" element={
            <DeliveryLayout>
              <DeliveryFAQ />
            </DeliveryLayout>
          } />
          <Route path="/delivery-settings" element={
            <DeliveryLayout>
              <DeliverySettings />
            </DeliveryLayout>
          } />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      </CartProvider>
    </ConfigProvider>
  );
}

export default App;
