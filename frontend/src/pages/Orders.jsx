import React, { useState, useEffect } from 'react';
import orderApi from '../api/orderApi';
import authApi from '../api/authApi';
import Loader from '../components/Loader';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const currentUser = authApi.getCurrentUser();
      if (!currentUser || !currentUser.id) {
        setError('Please log in to view your orders');
        setLoading(false);
        return;
      }
      const data = await orderApi.getUserOrders(currentUser.id);
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      PENDING: '#f39c12',
      CONFIRMED: '#3498db',
      PREPARING: '#9b59b6',
      OUT_FOR_DELIVERY: '#1abc9c',
      DELIVERED: '#27ae60',
      CANCELLED: '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  if (loading) return <Loader fullPage />;

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {error && <div className="error-message">{error}</div>}

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order.id}</span>
                <span 
                  className="order-status" 
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
              </div>
              
              <div className="order-details">
                <p><strong>Vendor:</strong> {order.vendorName || 'N/A'}</p>
                <p><strong>Restaurant:</strong> {order.restaurantName || 'N/A'}</p>
                <p><strong>Items:</strong> {order.items?.length || 0} items</p>
                <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
