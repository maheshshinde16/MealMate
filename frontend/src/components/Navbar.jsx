import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { UserOutlined, LogoutOutlined, ShoppingOutlined, PhoneOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { getCartCount } = useCart();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const cartCount = getCartCount();

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
    navigate('/login');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          {/* <span className="brand-icon">�️</span> */}
          <span className="brand-text">MealMate</span>
        </Link>
        
        <ul className="navbar-menu">
          <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
          <li><NavLink to="/browse" className={({ isActive }) => isActive ? 'active' : ''}>Explore Meals</NavLink></li>
          <li><NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'active' : ''}>How it Works</NavLink></li>
        </ul>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              {user?.roles?.includes('ROLE_VENDOR') && (
                <Link to="/vendor-dashboard" className="nav-link">Dashboard</Link>
              )}
              {user?.roles?.includes('ROLE_ADMIN') && (
                <Link to="/admin-dashboard" className="nav-link">Admin</Link>
              )}
              {user?.roles?.includes('ROLE_DELIVERY') && (
                <Link to="/delivery-dashboard" className="nav-link">Delivery</Link>
              )}
              <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link cart-link active' : 'nav-link cart-link'}>
                <ShoppingCartOutlined />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </NavLink>
              
              <div className="profile-menu-container">
                <button className="profile-button" onClick={toggleProfileMenu}>
                  <span className="profile-greeting">Hi, {user?.fullName?.split(' ')[0]}</span>
                  <UserOutlined className="profile-icon" />
                </button>
                
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <NavLink to="/profile" className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'} onClick={() => setShowProfileMenu(false)}>
                      <UserOutlined /> Profile
                    </NavLink>
                    <NavLink to="/orders" className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'} onClick={() => setShowProfileMenu(false)}>
                      <ShoppingOutlined /> Orders
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'} onClick={() => setShowProfileMenu(false)}>
                      <PhoneOutlined /> Contact
                    </NavLink>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      <LogoutOutlined /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-signin">Sign In</Link>
              <Link to="/register" className="btn-signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
