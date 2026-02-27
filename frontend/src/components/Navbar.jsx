import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { UserOutlined, LogoutOutlined, ShoppingOutlined, PhoneOutlined, ShoppingCartOutlined, MenuOutlined, CloseOutlined, HomeOutlined, FileTextOutlined } from '@ant-design/icons';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useCart();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  const handleLogout = () => {
    dispatch(logout());
    setShowProfileMenu(false);
    navigate('/login');
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          {/* <span className="brand-icon">MM</span> */}
          <span className="brand-text">MealMate</span>
        </Link>
        
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {showMobileMenu ? <CloseOutlined /> : <MenuOutlined />}
        </button>
        
        <ul className={`navbar-menu ${showMobileMenu ? 'active' : ''}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMobileMenu}>
              <HomeOutlined /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/browse" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMobileMenu}>
              <ShoppingOutlined /> Explore Meals
            </NavLink>
          </li>
          <li>
            <NavLink to="/how-it-works" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMobileMenu}>
              <FileTextOutlined /> How it Works
            </NavLink>
          </li>
        </ul>

        <div className={`navbar-actions ${showMobileMenu ? 'active' : ''}`}>
          {isAuthenticated ? (
            <>
              {user?.roles?.includes('ROLE_VENDOR') && (
                <Link to="/vendor-dashboard" className="nav-link role-link" onClick={closeMobileMenu}>Dashboard</Link>
              )}
              {user?.roles?.includes('ROLE_ADMIN') && (
                <Link to="/admin-dashboard" className="nav-link role-link" onClick={closeMobileMenu}>Admin</Link>
              )}
              {user?.roles?.includes('ROLE_DELIVERY') && (
                <Link to="/delivery-dashboard" className="nav-link role-link" onClick={closeMobileMenu}>Delivery</Link>
              )}
              <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link cart-link active' : 'nav-link cart-link'} onClick={closeMobileMenu}>
                <ShoppingCartOutlined />
                <span className="cart-text">Cart</span>
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </NavLink>
              
              <div className="profile-menu-container">
                <button className="profile-button" onClick={toggleProfileMenu}>
                  <div className="profile-avatar">{user?.fullName?.charAt(0)?.toUpperCase()}</div>
                  <span className="profile-greeting">Hi, {user?.fullName?.split(' ')[0]}</span>
                </button>
                
                {showProfileMenu && (
                  <div className="profile-dropdown">
                    <div className="dropdown-header">
                      <div className="avatar-large">{user?.fullName?.charAt(0)?.toUpperCase()}</div>
                      <div className="user-info">
                        <p className="user-name">{user?.fullName}</p>
                        <p className="user-email">{user?.email}</p>
                      </div>
                    </div>
                    <div className="dropdown-divider"></div>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'} onClick={() => setShowProfileMenu(false)}>
                      <UserOutlined /> My Profile
                    </NavLink>
                    <NavLink to="/orders" className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'} onClick={() => setShowProfileMenu(false)}>
                      <ShoppingOutlined /> My Orders
                    </NavLink>
                    <NavLink to="/contact" className={({ isActive }) => isActive ? 'dropdown-item active' : 'dropdown-item'} onClick={() => setShowProfileMenu(false)}>
                      <PhoneOutlined /> Help & Support
                    </NavLink>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item logout-item" onClick={handleLogout}>
                      <LogoutOutlined /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-signin" onClick={closeMobileMenu}>Sign In</Link>
              <Link to="/register" className="btn-signup" onClick={closeMobileMenu}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
