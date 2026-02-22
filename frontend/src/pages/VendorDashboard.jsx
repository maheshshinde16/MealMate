import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderApi from '../api/orderApi';
import menuItemApi from '../api/menuItemApi';
import Loader from '../components/Loader';
import Button from '../components/Button';
import './VendorDashboard.css';

const VendorDashboard = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    averageRating: 4.8,
    totalCustomers: 1250
  });
  const [menuItems, setMenuItems] = useState([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Main Course',
    price: '',
    description: '',
    available: true
  });

  useEffect(() => {
    // Redirect to vendor login if not authenticated
    if (!isAuthenticated || !user) {
      navigate('/vendor-login');
      return;
    }
    
    fetchVendorOrders();
    fetchMenuItems();
  }, [isAuthenticated, user, navigate]);

  const fetchVendorOrders = async () => {
    try {
      const data = await orderApi.getAllOrders();
      setOrders(data);
      calculateStats(data);
    } catch (err) {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (orders) => {
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
    const completedOrders = orders.filter(o => o.status === 'DELIVERED').length;
    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.totalAmount || 0), 0).toFixed(2);

    setStats(prev => ({
      ...prev,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue
    }));
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    // Update order status logic
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    calculateStats(updatedOrders);
  };

  const fetchMenuItems = async () => {
    try {
      if (user?.id) {
        const items = await menuItemApi.getMenuItemsByVendor(user.id);
        setMenuItems(Array.isArray(items) ? items : []);
      } else {
        const items = await menuItemApi.getAllMenuItems();
        setMenuItems(Array.isArray(items) ? items : []);
      }
    } catch (err) {
      console.error('Failed to load menu items');
      setMenuItems([]);
    }
  };

  const toggleAddItem = () => {
    setShowAddItem(prev => !prev);
  };

  const handleNewItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name.trim() || !newItem.price) {
      return;
    }

    const payload = {
      vendorId: user?.id || '',
      vendorName: user?.fullName || user?.email || 'Vendor',
      name: newItem.name.trim(),
      category: newItem.category,
      price: parseFloat(newItem.price),
      description: newItem.description.trim(),
      available: newItem.available
    };

    try {
      const createdItem = await menuItemApi.createMenuItem(payload);
      setMenuItems(prev => [createdItem, ...prev]);
      setNewItem({
        name: '',
        category: 'Main Course',
        price: '',
        description: '',
        available: true
      });
      setShowAddItem(false);
    } catch (err) {
      console.error('Failed to add menu item');
    }
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="vendor-dashboard">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Welcome back, {user?.fullName || 'Partner'}!</h1>
            <p className="header-subtitle">Here's what's happening with your restaurant today</p>
          </div>
          <div className="header-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 8H3l2 11h14l2-11z"></path>
            <path d="M7 8V6a5 5 0 0 1 10 0v2"></path>
          </svg>
          Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="4" cy="6" r="1"></circle>
            <circle cx="4" cy="12" r="1"></circle>
            <circle cx="4" cy="18" r="1"></circle>
            <path d="M8 6h13M8 12h13M8 18h13"></path>
          </svg>
          Menu
        </button>
        <button 
          className={`tab-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18"></path>
            <path d="M7 13l4-4 4 4 5-6"></path>
          </svg>
          Analytics
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon stat-icon-orders">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 8H3l2 11h14l2-11z"></path>
                  <path d="M7 8V6a5 5 0 0 1 10 0v2"></path>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Orders</p>
                <p className="stat-value">{stats.totalOrders}</p>
                <p className="stat-change">+12% from last week</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-pending">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M12 7v6l4 2"></path>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Pending Orders</p>
                <p className="stat-value">{stats.pendingOrders}</p>
                <p className="stat-change">Awaiting confirmation</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-completed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M8 12l3 3 5-6"></path>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Completed Orders</p>
                <p className="stat-value">{stats.completedOrders}</p>
                <p className="stat-change">+8% this month</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-revenue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"></path>
                  <path d="M3 8l9-6 9 6"></path>
                  <path d="M12 10v7"></path>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Revenue</p>
                <p className="stat-value">₹{stats.totalRevenue}</p>
                <p className="stat-change">+15% this month</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-rating">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 19l-6.2 3.3 1.2-6.8-5-4.9 6.9-1z"></path>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Average Rating</p>
                <p className="stat-value">{stats.averageRating}</p>
                <p className="stat-change">Excellent performance</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon stat-icon-customers">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Customers</p>
                <p className="stat-value">{stats.totalCustomers}</p>
                <p className="stat-change">+45 this month</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions-section">
            <h2>Quick Actions</h2>
            <div className="quick-actions-grid">
              <div className="action-card" onClick={() => setActiveTab('menu')}>
                <span className="action-icon action-icon-menu">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 6h13M8 12h13M8 18h13"></path>
                    <circle cx="4" cy="6" r="1"></circle>
                    <circle cx="4" cy="12" r="1"></circle>
                    <circle cx="4" cy="18" r="1"></circle>
                  </svg>
                </span>
                <h3>Manage Menu</h3>
                <p>Update dishes and prices</p>
              </div>
              <div className="action-card" onClick={() => setActiveTab('orders')}>
                <span className="action-icon action-icon-orders">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 8H3l2 11h14l2-11z"></path>
                    <path d="M7 8V6a5 5 0 0 1 10 0v2"></path>
                  </svg>
                </span>
                <h3>View Orders</h3>
                <p>Check pending orders</p>
              </div>
              <div className="action-card">
                <span className="action-icon action-icon-settings">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V22a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H2a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H8a1.7 1.7 0 0 0 1-1.5V2a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V8c0 .7.4 1.3 1 1.5H22a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.5 1z"></path>
                  </svg>
                </span>
                <h3>Settings</h3>
                <p>Manage restaurant info</p>
              </div>
              <div className="action-card">
                <span className="action-icon action-icon-support">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M4.9 19.1a9 9 0 0 1 14.2 0"></path>
                    <path d="M8 12h.01M16 12h.01"></path>
                  </svg>
                </span>
                <h3>Support</h3>
                <p>Contact our team</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="tab-content">
          <div className="orders-section">
            <h2>Recent Orders</h2>
            {orders.length === 0 ? (
              <div className="no-data">
                <div className="no-data-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16v12H4z"></path>
                    <path d="M22 7l-10 6L2 7"></path>
                    <path d="M8 20h8"></path>
                  </svg>
                </div>
                <p>No orders yet</p>
                <p>Your orders will appear here once customers start ordering</p>
              </div>
            ) : (
              <div className="orders-table">
                <div className="table-header">
                  <div className="col-id">Order ID</div>
                  <div className="col-amount">Amount</div>
                  <div className="col-status">Status</div>
                  <div className="col-time">Time</div>
                  <div className="col-actions">Actions</div>
                </div>
                {orders.slice(0, 10).map(order => (
                  <div key={order.id} className="table-row">
                    <div className="col-id"><strong>#{order.id}</strong></div>
                    <div className="col-amount">₹{order.totalAmount}</div>
                    <div className="col-status">
                      <span className={`status-badge status-${order.status?.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="col-time">2 hours ago</div>
                    <div className="col-actions">
                      {order.status === 'PENDING' && (
                        <>
                          <Button 
                            variant="success" 
                            size="small"
                            onClick={() => updateOrderStatus(order.id, 'CONFIRMED')}
                          >
                            Confirm
                          </Button>
                          <Button 
                            variant="danger"
                            size="small"
                            onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Menu Tab */}
      {activeTab === 'menu' && (
        <div className="tab-content">
          <div className="menu-section">
            <div className="menu-header">
              <h2>Menu Management</h2>
              <button className="btn-add-item" onClick={toggleAddItem}>
                {showAddItem ? 'Close' : '+ Add New Item'}
              </button>
            </div>
            <div className="menu-content">
              {showAddItem && (
                <form className="menu-form" onSubmit={handleAddItem}>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Item Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newItem.name}
                        onChange={handleNewItemChange}
                        placeholder="e.g., Chicken Biryani"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Category</label>
                      <select
                        name="category"
                        value={newItem.category}
                        onChange={handleNewItemChange}
                      >
                        <option>Main Course</option>
                        <option>Appetizers</option>
                        <option>Desserts</option>
                        <option>Beverages</option>
                        <option>Specials</option>
                      </select>
                    </div>
                    <div className="form-field">
                      <label>Price (₹)</label>
                      <input
                        type="number"
                        name="price"
                        value={newItem.price}
                        onChange={handleNewItemChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-field full">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={newItem.description}
                      onChange={handleNewItemChange}
                      placeholder="Add a short description"
                      rows="3"
                    />
                  </div>
                  <div className="form-actions">
                    <label className="checkbox-field">
                      <input
                        type="checkbox"
                        name="available"
                        checked={newItem.available}
                        onChange={handleNewItemChange}
                      />
                      Available for orders
                    </label>
                    <button type="submit" className="btn-save-item">
                      Save Item
                    </button>
                  </div>
                </form>
              )}

              {menuItems.length === 0 ? (
                <div className="menu-empty">
                  <div className="placeholder-text">
                    <svg className="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M8 6h13M8 12h13M8 18h13"></path>
                      <circle cx="4" cy="6" r="1"></circle>
                      <circle cx="4" cy="12" r="1"></circle>
                      <circle cx="4" cy="18" r="1"></circle>
                    </svg>
                    No menu items yet
                  </div>
                  <p>Add your first menu item to start taking orders.</p>
                </div>
              ) : (
                <div className="menu-list">
                  {menuItems.map(item => (
                    <div key={item.id} className="menu-item">
                      <div className="menu-item-main">
                        <div>
                          <h4>{item.name}</h4>
                          <p className="menu-item-meta">{item.category}</p>
                          {item.description && <p className="menu-item-desc">{item.description}</p>}
                        </div>
                        <div className="menu-item-price">₹{item.price.toFixed(2)}</div>
                      </div>
                      <span className={`menu-item-status ${item.available ? 'available' : 'unavailable'}`}>
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="tab-content">
          <div className="analytics-section">
            <h2>Analytics & Reports</h2>
            <div className="analytics-content">
              <div className="placeholder-text">
                <svg className="placeholder-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18"></path>
                  <path d="M7 13l4-4 4 4 5-6"></path>
                </svg>
                Detailed analytics coming soon
              </div>
              <p>Track:</p>
              <ul>
                <li>Sales trends and revenue graphs</li>
                <li>Popular menu items</li>
                <li>Customer feedback and ratings</li>
                <li>Peak order times</li>
                <li>Monthly performance reports</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
