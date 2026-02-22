import React, { useState, useEffect } from 'react';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { getAllVendors } from '../api/vendorApi';
import menuItemApi from '../api/menuItemApi';
import { useCart } from '../context/CartContext';
import VendorCard from '../components/VendorCard';
import Loader from '../components/Loader';
import './Browse.css';

const Browse = () => {
  const [vendors, setVendors] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    const success = addToCart(item, 1);
    if (success) {
      alert(`${item.name} added to cart!`);
    }
  };

  useEffect(() => {
    fetchVendors();
    fetchMenuItems();
  }, []);

  const fetchVendors = async () => {
    try {
      const data = await getAllVendors();
      // Ensure data is always an array
      setVendors(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load vendors');
      setVendors([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const items = await menuItemApi.getAllMenuItems();
      setMenuItems(Array.isArray(items) ? items : []);
    } catch (err) {
      setMenuItems([]);
    } finally {
      setMenuLoading(false);
    }
  };

  const filteredVendors = Array.isArray(vendors) ? vendors.filter(vendor =>
    vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.cuisineType?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (loading) return <Loader fullPage />;

  return (
    <div className="browse-page">
      <div className="browse-header">
        <h1>Browse Restaurants</h1>
        <input
          type="text"
          placeholder="Search by name or cuisine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <section className="browse-menu-items">
        <h2>Explore Meals</h2>
        {menuLoading ? (
          <p className="menu-status">Loading menu items...</p>
        ) : (
          <div className="browse-menu-grid">
            {menuItems.length > 0 ? (
              menuItems.slice(0, 8).map(item => (
                <div key={item.id} className="browse-menu-card">
                  <div className="browse-menu-image">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format'}
                      alt={item.name}
                    />
                  </div>
                  <div className="browse-menu-body">
                    <div className="browse-menu-top">
                      <h3>{item.name}</h3>
                      <span>₹{Number(item.price || 0).toFixed(2)}</span>
                    </div>
                    <p>{item.vendorName || 'Restaurant Partner'}</p>
                    <button 
                      className="browse-add-cart-btn"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.available}
                    >
                      <ShoppingCartOutlined /> Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="menu-status">No menu items yet.</p>
            )}
          </div>
        )}
      </section>

      {error && <div className="error-message">{error}</div>}

      <div className="vendors-grid">
        {filteredVendors.length > 0 ? (
          filteredVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))
        ) : (
          <p className="no-results">No vendors found</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
