import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Browse from '../pages/Browse';
import Cart from '../pages/Cart';
import Orders from '../pages/Orders';
import VendorDashboard from '../pages/VendorDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import DeliveryDashboard from '../pages/DeliveryDashboard';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && !user?.roles?.includes(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/browse" element={<Browse />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vendor-dashboard"
            element={
              <ProtectedRoute requiredRole="ROLE_VENDOR">
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="ROLE_ADMIN">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delivery-dashboard"
            element={
              <ProtectedRoute requiredRole="ROLE_DELIVERY">
                <DeliveryDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AppRoutes;
