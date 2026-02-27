import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderApi from '../api/orderApi';
import menuItemApi from '../api/menuItemApi';
import Loader from '../components/Loader';
import Button from '../components/Button';
import ImageUploadModal from '../components/ImageUploadModal';
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
  const [editingItemId, setEditingItemId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [savingItemId, setSavingItemId] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedItemForImage, setSelectedItemForImage] = useState(null);
  const [savingImageItemId, setSavingImageItemId] = useState(null);
  const statusPriority = {
    PENDING: 1,
    CONFIRMED: 2,
    PREPARING: 3,
    OUT_FOR_DELIVERY: 4,
    DELIVERED: 5,
    CANCELLED: 6
  };

  const getStatusLabel = (status) => {
    if (status === 'PREPARING') return 'READY TO PICK';
    if (status === 'OUT_FOR_DELIVERY') return 'OUT FOR DELIVERY';
    return status || 'UNKNOWN';
  };

  useEffect(() => {
    // Redirect to vendor login if not authenticated
    if (!isAuthenticated || !user) {
      navigate('/vendor-login');
      return;
    }
    
    fetchVendorOrders();
    fetchMenuItems();

    const intervalId = setInterval(() => {
      fetchVendorOrders();
    }, 8000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, user, navigate]);

  const fetchVendorOrders = async () => {
    try {
      const vendorId = user?.vendorId || user?.id;
      if (!vendorId) {
        setOrders([]);
        calculateStats([]);
        return;
      }

      const data = await orderApi.getVendorOrders(vendorId);
      const orderList = Array.isArray(data) ? data : [];
      const sortedOrders = sortOrders(orderList);
      setOrders(sortedOrders);
      calculateStats(sortedOrders);
    } catch (err) {
      console.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const sortOrders = (orderList) => {
    return [...orderList].sort((a, b) => {
      const statusA = statusPriority[a.status] || 99;
      const statusB = statusPriority[b.status] || 99;
      if (statusA !== statusB) {
        return statusA - statusB;
      }

      const timeA = new Date(a.orderDate || 0).getTime();
      const timeB = new Date(b.orderDate || 0).getTime();
      return timeB - timeA;
    });
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
    try {
      // Call backend API to update order status
      const orderToUpdate = orders.find(o => o.id === orderId);
      if (!orderToUpdate) {
        alert('Order not found');
        return;
      }

      const updatedOrderData = {
        ...orderToUpdate,
        status: newStatus
      };

      await orderApi.updateOrder(orderId, updatedOrderData);

      // Update local state only after successful API call
      const updatedOrders = orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      calculateStats(updatedOrders);

      // Show success message based on status
      const statusMessages = {
        'CONFIRMED': 'Order confirmed successfully!',
        'PREPARING': 'Order marked as preparing',
        'CANCELLED': 'Order has been cancelled'
      };

      alert(statusMessages[newStatus] || `Order status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status. Please try again.');
    }
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

  const startEditDescription = (item) => {
    setEditingItemId(item.id);
    setEditDescription(item.description || '');
    setEditPrice(item.price || '');
    setEditCategory(item.category || 'Main Course');
  };

  const cancelEditDescription = () => {
    setEditingItemId(null);
    setEditDescription('');
    setEditPrice('');
    setEditCategory('');
  };

  const saveDescription = async (item) => {
    const trimmedDescription = editDescription.trim();
    const updatedPrice = parseFloat(editPrice);
    
    if (!updatedPrice || updatedPrice <= 0) {
      alert('Please enter a valid price');
      return;
    }
    
    setSavingItemId(item.id);
    try {
      const payload = {
        ...item,
        description: trimmedDescription,
        price: updatedPrice,
        category: editCategory
      };
      const updatedItem = await menuItemApi.updateMenuItem(item.id, payload);
      const resolvedItem = updatedItem?.id ? updatedItem : payload;
      setMenuItems(prev => prev.map(existing =>
        existing.id === item.id ? { ...existing, ...resolvedItem } : existing
      ));
      cancelEditDescription();
    } catch (err) {
      console.error('Failed to update menu item');
      alert('Failed to update menu item. Please try again.');
    } finally {
      setSavingItemId(null);
    }
  };

  const openImageModal = (item) => {
    setSelectedItemForImage(item);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedItemForImage(null);
  };

  const handleSaveImage = async (imageData) => {
    if (!selectedItemForImage) return;
    
    setSavingImageItemId(selectedItemForImage.id);
    try {
      const payload = {
        ...selectedItemForImage,
        imageUrl: imageData
      };
      const updatedItem = await menuItemApi.updateMenuItem(selectedItemForImage.id, payload);
      const resolvedItem = updatedItem?.id ? updatedItem : payload;
      setMenuItems(prev => prev.map(existing =>
        existing.id === selectedItemForImage.id ? { ...existing, ...resolvedItem } : existing
      ));
      console.log('Image saved successfully');
    } catch (err) {
      console.error('Failed to save image:', err);
      alert('Failed to save image. Please try again.');
    } finally {
      setSavingImageItemId(null);
      closeImageModal();
    }
  };

  const toggleAvailability = async (item) => {
    try {
      const payload = {
        ...item,
        available: !item.available
      };
      const updatedItem = await menuItemApi.updateMenuItem(item.id, payload);
      const resolvedItem = updatedItem?.id ? updatedItem : payload;
      setMenuItems(prev => prev.map(existing =>
        existing.id === item.id ? { ...existing, ...resolvedItem } : existing
      ));
    } catch (err) {
      console.error('Failed to toggle availability:', err);
      alert('Failed to update availability. Please try again.');
    }
  };

  const deleteMenuItem = async (item) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
      return;
    }
    
    try {
      await menuItemApi.deleteMenuItem(item.id);
      setMenuItems(prev => prev.filter(existing => existing.id !== item.id));
      alert('Menu item deleted successfully');
    } catch (err) {
      console.error('Failed to delete menu item:', err);
      alert('Failed to delete menu item. Please try again.');
    }
  };

  const totalMenuItems = menuItems.length;
  const availableItems = menuItems.filter(item => item.available).length;
  const unavailableItems = totalMenuItems - availableItems;
  const totalRevenueValue = Number(stats.totalRevenue || 0);
  const averageOrderValue = stats.totalOrders
    ? totalRevenueValue / stats.totalOrders
    : 0;
  const completionRate = stats.totalOrders
    ? Math.round((stats.completedOrders / stats.totalOrders) * 100)
    : 0;

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
                        {getStatusLabel(order.status)}
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
                      {order.status === 'CONFIRMED' && (
                        <Button 
                          variant="primary"
                          size="small"
                          onClick={() => updateOrderStatus(order.id, 'PREPARING')}
                        >
                          Ready to Pick
                        </Button>
                      )}
                      {order.status === 'PREPARING' && (
                        <Button 
                          variant="secondary"
                          size="small"
                          disabled
                        >
                          Ready to Pick
                        </Button>
                      )}
                      {(order.status === 'DELIVERED' || order.status === 'CANCELLED') && (
                        <Button 
                          variant="secondary"
                          size="small"
                          disabled
                        >
                          {order.status}
                        </Button>
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
                      {/* Item Image Section */}
                      <div className="menu-item-image-section">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="menu-item-image" />
                        ) : (
                          <div className="menu-item-image-placeholder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                              <circle cx="8.5" cy="8.5" r="1.5"></circle>
                              <polyline points="21 15 16 10 5 21"></polyline>
                            </svg>
                            <span>No image</span>
                          </div>
                        )}
                        <button
                          type="button"
                          className="btn-edit-image"
                          onClick={() => openImageModal(item)}
                          title="Edit item image"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                      </div>

                      <div className="menu-item-main">
                        <div className="menu-item-details">
                          <h4>{item.name}</h4>
                          {editingItemId === item.id ? (
                            <div className="menu-edit-form">
                              <div className="menu-edit-row">
                                <div className="menu-edit-field">
                                  <label>Category</label>
                                  <select
                                    className="menu-edit-select"
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                  >
                                    <option>Main Course</option>
                                    <option>Appetizers</option>
                                    <option>Desserts</option>
                                    <option>Beverages</option>
                                    <option>Specials</option>
                                  </select>
                                </div>
                                <div className="menu-edit-field">
                                  <label>Price (₹)</label>
                                  <input
                                    type="number"
                                    className="menu-edit-input"
                                    value={editPrice}
                                    onChange={(e) => setEditPrice(e.target.value)}
                                    min="0"
                                    step="0.01"
                                    placeholder="0.00"
                                  />
                                </div>
                              </div>
                              <div className="menu-edit-field">
                                <label>Description</label>
                                <textarea
                                  className="menu-edit-textarea"
                                  rows="3"
                                  value={editDescription}
                                  onChange={(event) => setEditDescription(event.target.value)}
                                  placeholder="Add a short description"
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="menu-item-meta">{item.category}</p>
                              {item.description && <p className="menu-item-desc">{item.description}</p>}
                            </>
                          )}
                        </div>
                        {editingItemId !== item.id && (
                          <div className="menu-item-price">₹{item.price.toFixed(2)}</div>
                        )}
                      </div>
                      <div className="menu-item-actions">
                        {editingItemId === item.id ? (
                          <>
                            <button
                              type="button"
                              className="btn-menu-action primary"
                              onClick={() => saveDescription(item)}
                              disabled={savingItemId === item.id}
                            >
                              {savingItemId === item.id ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                              type="button"
                              className="btn-menu-action secondary"
                              onClick={cancelEditDescription}
                              disabled={savingItemId === item.id}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="btn-menu-action ghost"
                              onClick={() => startEditDescription(item)}
                            >
                              Edit Item
                            </button>
                            <button
                              type="button"
                              className={`btn-menu-action ${item.available ? 'warning' : 'success'}`}
                              onClick={() => toggleAvailability(item)}
                              title={item.available ? 'Mark as unavailable' : 'Mark as available'}
                            >
                              {item.available ? 'Disable' : 'Enable'}
                            </button>
                            <button
                              type="button"
                              className="btn-menu-action danger"
                              onClick={() => deleteMenuItem(item)}
                              title="Delete menu item"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                      <span className={`menu-item-status ${item.available ? 'available' : 'unavailable'}`}>
                        {item.available ? '● Available' : '● Unavailable'}
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
              <div className="analytics-grid">
                <div className="analytics-card">
                  <span className="analytics-kicker">Revenue</span>
                  <h3>₹{totalRevenueValue.toFixed(2)}</h3>
                  <p>Total revenue from delivered orders</p>
                  <div className="analytics-trend positive">+12% vs last month</div>
                </div>
                <div className="analytics-card">
                  <span className="analytics-kicker">Orders</span>
                  <h3>{stats.totalOrders}</h3>
                  <p>All orders received this period</p>
                  <div className="analytics-trend positive">+8% weekly</div>
                </div>
                <div className="analytics-card">
                  <span className="analytics-kicker">Avg Order</span>
                  <h3>₹{averageOrderValue.toFixed(2)}</h3>
                  <p>Average order value</p>
                  <div className="analytics-trend neutral">Based on delivered orders</div>
                </div>
                <div className="analytics-card">
                  <span className="analytics-kicker">Completion</span>
                  <h3>{completionRate}%</h3>
                  <p>Delivered vs total orders</p>
                  <div className="analytics-trend positive">Strong reliability</div>
                </div>
                <div className="analytics-card">
                  <span className="analytics-kicker">Menu Items</span>
                  <h3>{availableItems}</h3>
                  <p>Items available for ordering</p>
                  <div className="analytics-trend positive">{totalMenuItems} total</div>
                </div>
                <div className="analytics-card">
                  <span className="analytics-kicker">Out of Stock</span>
                  <h3>{unavailableItems}</h3>
                  <p>Items currently unavailable</p>
                  <div className="analytics-trend warning">Review availability</div>
                </div>
              </div>

              <div className="analytics-reports">
                <div className="report-card">
                  <h4>Weekly Highlights</h4>
                  <p>Completed orders: {stats.completedOrders} • Pending: {stats.pendingOrders}</p>
                  <span className="report-meta">Updated today</span>
                </div>
                <div className="report-card">
                  <h4>Peak Hours</h4>
                  <p>Highest demand between 7:00 PM and 9:00 PM</p>
                  <span className="report-meta">Based on last 14 days</span>
                </div>
                <div className="report-card">
                  <h4>Customer Feedback</h4>
                  <p>Average rating: {stats.averageRating} • Returning customers rising</p>
                  <span className="report-meta">Ratings & reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Upload Modal */}
      <ImageUploadModal
        isOpen={showImageModal}
        item={selectedItemForImage}
        onClose={closeImageModal}
        onSave={handleSaveImage}
        isSaving={savingImageItemId === selectedItemForImage?.id}
      />
    </div>
  );
};

export default VendorDashboard;
