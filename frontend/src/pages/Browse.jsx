import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { getAllVendors } from '../api/vendorApi';
import menuItemApi from '../api/menuItemApi';
import { useCart } from '../context/CartContext';
import { getMealImageUrl } from '../config/mealImages';
import VendorCard from '../components/VendorCard';
import Loader from '../components/Loader';
import './Browse.css';

const Browse = () => {
  const [searchParams] = useSearchParams();
  const [vendors, setVendors] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuLoading, setMenuLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const { addToCart } = useCart();

  const getMealImage = (item) => {
    if (item?.imageUrl) return item.imageUrl;
    // Check if we have a specific image for this meal
    const specificImage = getMealImageUrl(item?.name);
    if (specificImage) return specificImage;
    // Fallback to dynamic Unsplash search if no specific mapping
    const mealName = item?.name || 'food';
    return `https://source.unsplash.com/featured/400x300/?${encodeURIComponent(mealName)}`;
  };

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

  useEffect(() => {
    const foodParam = searchParams.get('food') || '';
    const locationParam = searchParams.get('location') || '';
    setSearchTerm(foodParam);
    setLocationTerm(locationParam);
  }, [searchParams]);

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
    (vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.cuisineType?.toLowerCase().includes(searchTerm.toLowerCase())) &&
    vendor?.name && vendor.name.trim().length > 2
  ) : [];

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const normalizedLocation = locationTerm.trim().toLowerCase();
  const vendorLocationById = Array.isArray(vendors)
    ? vendors.reduce((acc, vendor) => {
        const locationParts = [
          vendor?.address,
          vendor?.city,
          vendor?.area,
          vendor?.state,
          vendor?.zip,
          vendor?.postalCode,
          vendor?.pincode
        ].filter(Boolean);
        if (vendor?.id) {
          acc[vendor.id] = locationParts.join(' ').toLowerCase();
        }
        return acc;
      }, {})
    : {};

  const matchesSearch = (item) => {
    if (!normalizedSearch) return true;
    const haystack = [
      item?.name,
      item?.description,
      item?.category,
      item?.vendorName
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedSearch);
  };

  const matchesLocation = (item) => {
    if (!normalizedLocation) return true;
    if (!Array.isArray(vendors) || vendors.length === 0) return true;
    const vendorLocation = vendorLocationById[item?.vendorId] || '';
    return vendorLocation.includes(normalizedLocation);
  };

  if (loading) return <Loader fullPage />;

  // Get unique cuisines from vendors
  const cuisines = Array.isArray(vendors) 
    ? ['all', ...new Set(vendors.map(v => v?.cuisineType).filter(Boolean))]
    : ['all'];

  // Get unique categories from menu items
  const categories = Array.isArray(menuItems)
    ? ['all', ...new Set(menuItems.map(item => item?.category).filter(Boolean))]
    : ['all'];

  // Filter menu items based on all filters
  const getFilteredItems = () => {
    let filtered = Array.isArray(menuItems)
      ? menuItems
          .filter(item => item?.name && item?.price && item.name.trim().length > 2)
          .filter(item => matchesSearch(item) && matchesLocation(item))
      : [];

    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(item => {
        const vendor = vendors.find(v => v?.id === item?.vendorId);
        return vendor?.cuisineType === selectedCuisine;
      });
    }

    if (priceFilter !== 'all') {
      const price = Number(priceFilter);
      filtered = filtered.filter(item => 
        Number(item?.price || 0) <= price
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item?.category === categoryFilter);
    }

    if (availabilityFilter === 'available') {
      filtered = filtered.filter(item => item?.available === true);
    } else if (availabilityFilter === 'unavailable') {
      filtered = filtered.filter(item => item?.available === false);
    }

    // Sort items
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => (a?.price || 0) - (b?.price || 0));
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => (b?.price || 0) - (a?.price || 0));
    }

    return filtered;
  };

  const filteredMenuItems = getFilteredItems();

  return (
    <div className="browse-page">
      <div className="browse-hero">
        <div className="browse-hero-content">
          <h1>Browse Restaurants & Meals</h1>
          <p>Discover delicious food from top-rated restaurants near you</p>
        </div>
      </div>

      <div className="browse-filters-section">
        <div className="browse-search-bar">
          <input
            type="text"
            placeholder="Search meals, cuisines, or vendors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Filter by location..."
            value={locationTerm}
            onChange={(e) => setLocationTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="browse-filter-controls">
          <select 
            value={selectedCuisine} 
            onChange={(e) => setSelectedCuisine(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Cuisines</option>
            {cuisines.filter(c => c !== 'all').map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>

          <select 
            value={priceFilter} 
            onChange={(e) => setPriceFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Prices</option>
            <option value="100">Under ₹100</option>
            <option value="200">Under ₹200</option>
            <option value="500">Under ₹500</option>
            <option value="1000">Under ₹1000</option>
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <select 
            value={availabilityFilter} 
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Items</option>
            <option value="available">Available Only</option>
            <option value="unavailable">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Featured Restaurants Section */}
      {!menuLoading && (
        <section className="featured-restaurants">
          <div className="section-header">
            <h2>Featured Restaurants</h2>
            <p className="section-subtitle">Top-rated restaurants in your area</p>
          </div>
          {Array.isArray(vendors) && vendors.length > 0 ? (
            <div className="featured-vendors-grid">
              {vendors.slice(0, 6).map(vendor => (
                <div key={vendor.id} className="featured-vendor-card">
                  <div className="vendor-image-container">
                    <img
                      src={`https://source.unsplash.com/featured/400x250/?${encodeURIComponent(vendor?.cuisineType || 'restaurant')}`}
                      alt={vendor.name}
                      className="vendor-image"
                    />
                    <span className="vendor-cuisine-badge">{vendor?.cuisineType || 'Restaurant'}</span>
                  </div>
                  <div className="vendor-info">
                    <h3>{vendor.name}</h3>
                    <p className="vendor-location">{vendor?.area || vendor?.city}, {vendor?.state}</p>
                    <div className="vendor-stats">
                      <span className="rating">⭐ 4.5</span>
                      <span className="distance">2.5 km away</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results">No restaurants available</p>
          )}
        </section>
      )}

      {/* Explore Meals Section */}
      <section className="browse-menu-items">
        <div className="section-header">
          <h2>Explore Meals</h2>
          <p className="section-subtitle">
            {filteredMenuItems.length} meal{filteredMenuItems.length !== 1 ? 's' : ''} available
            {categoryFilter !== 'all' && ` in ${categoryFilter}`}
            {availabilityFilter === 'available' && ' (Available only)'}
          </p>
        </div>
        {menuLoading ? (
          <p className="menu-status">Loading menu items...</p>
        ) : (
          <div className="browse-menu-grid">
            {menuItems.length > 0 ? (
              filteredMenuItems.length > 0 ? (
                filteredMenuItems.map(item => {
                  const vendor = vendors.find(v => v?.id === item?.vendorId);
                  return (

                  <div key={item.id} className="browse-menu-card">
                    <Link to={`/meals/${item.id}`} className="browse-menu-link">
                      <div className="browse-menu-image">
                        <img
                          src={getMealImage(item)}
                          alt={item.name}
                          onError={(e) => {
                            const mealName = item?.name || 'food';
                            e.target.src = `https://source.unsplash.com/featured/400x300/?${encodeURIComponent(mealName)}`;
                          }}
                        />
                        {item.category && <span className="category-badge">{item.category}</span>}
                        {!item.available && <span className="unavailable-badge">Out of Stock</span>}
                      </div>
                    </Link>
                    <div className="browse-menu-body">
                      <div className="browse-menu-top">
                        <Link to={`/meals/${item.id}`} className="browse-menu-link">
                          <h3>{item.name}</h3>
                        </Link>
                        <span className="meal-price">₹{Number(item.price || 0).toFixed(2)}</span>
                      </div>
                      <p className="browse-menu-vendor">
                        {item.vendorName || vendor?.name || 'Restaurant Partner'}
                        {vendor?.cuisineType && ` • ${vendor.cuisineType}`}
                      </p>
                      <p className="browse-menu-desc">
                        {item.description || 'Freshly prepared meal made with quality ingredients.'}
                      </p>
                      <button 
                        className="browse-add-cart-btn"
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.available}
                      >
                        <ShoppingCartOutlined /> {item.available ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                  );
                })
              ) : (
                <div className="no-results-container">
                  <p className="no-results">No meals match your search criteria.</p>
                  <p className="no-results-hint">Try adjusting your filters or search terms</p>
                </div>
              )
            ) : (
              <p className="menu-status">No menu items yet.</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Browse;
