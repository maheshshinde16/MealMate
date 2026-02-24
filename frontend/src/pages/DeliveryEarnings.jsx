import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderApi from '../api/orderApi';
import './DeliveryEarnings.css';

const DeliveryEarnings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/rider-login');
      return;
    }
    fetchDeliveredOrders();
    
    // Auto-refresh earnings every 5 seconds to show newly delivered orders
    const intervalId = setInterval(() => {
      fetchDeliveredOrders();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const fetchDeliveredOrders = async () => {
    try {
      const data = await orderApi.getAllOrders();
      // Filter only delivered orders assigned to this rider
      const delivered = data.filter(order => 
        order.status === 'DELIVERED' && 
        order.deliveryPartnerId && 
        String(order.deliveryPartnerId).trim() === String(user?.id).trim()
      );
      setDeliveredOrders(delivered);
    } catch (err) {
      console.error('Failed to load delivered orders');
    } finally {
      setLoading(false);
    }
  };

  const calculateEarnings = (period) => {
    const now = new Date();
    let startDate = new Date();

    if (period === 'today') {
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'week') {
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'month') {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
    }

    const filtered = deliveredOrders.filter(order => {
      const orderDate = new Date(order.createdAt || order.orderDate);
      return orderDate >= startDate;
    });

    let total = 0;
    filtered.forEach(order => {
      // Base earning: 60% of order amount
      total += order.totalAmount * 0.6;
      // Bonus: ₹10-20 per order
      total += 15;
    });

    return {
      total: Math.round(total),
      deliveries: filtered.length,
      bonus: Math.round(filtered.length * 15),
      baseAmount: Math.round(total - (filtered.length * 15))
    };
  };

  const currentData = calculateEarnings(selectedPeriod);

  if (loading) {
    return <div className="earnings-container">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="earnings-container">Please login to view earnings</div>;
  }

  return (
    <div className="earnings-container">
      <div className="earnings-header">
        <h1>Earnings Dashboard</h1>
        <p>Track your delivery earnings and performance</p>
      </div>

      {/* Period Selector */}
      <div className="period-selector">
        <button 
          className={`period-btn ${selectedPeriod === 'today' ? 'active' : ''}`}
          onClick={() => setSelectedPeriod('today')}
        >
          Today
        </button>
        <button 
          className={`period-btn ${selectedPeriod === 'week' ? 'active' : ''}`}
          onClick={() => setSelectedPeriod('week')}
        >
          This Week
        </button>
        <button 
          className={`period-btn ${selectedPeriod === 'month' ? 'active' : ''}`}
          onClick={() => setSelectedPeriod('month')}
        >
          This Month
        </button>
      </div>

      {/* Earnings Cards */}
      <div className="earnings-cards">
        <div className="earnings-card total">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <p className="card-label">Total Earnings</p>
            <p className="card-value">₹{currentData.total.toLocaleString()}</p>
          </div>
        </div>

        <div className="earnings-card deliveries">
          <div className="card-icon">🚚</div>
          <div className="card-content">
            <p className="card-label">Deliveries Completed</p>
            <p className="card-value">{currentData.deliveries}</p>
          </div>
        </div>

        <div className="earnings-card bonus">
          <div className="card-icon">🎁</div>
          <div className="card-content">
            <p className="card-label">Bonus Earned</p>
            <p className="card-value">₹{currentData.bonus}</p>
          </div>
        </div>

        <div className="earnings-card average">
          <div className="card-icon">⭐</div>
          <div className="card-content">
            <p className="card-label">Avg Per Delivery</p>
            <p className="card-value">₹{currentData.deliveries > 0 ? Math.round(currentData.total / currentData.deliveries) : 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Deliveries */}
      {deliveredOrders.length > 0 && (
        <div className="recent-deliveries">
          <h2>Recent Delivered Orders</h2>
          <div className="deliveries-list">
            {deliveredOrders.slice(0, 10).map((order, index) => (
              <div key={order.id} className="delivery-item">
                <div className="delivery-order">
                  <p className="order-no">#{order.orderNumber || order.id}</p>
                  <p className="order-time">{new Date(order.createdAt || order.orderDate).toLocaleDateString()}</p>
                </div>
                <div className="delivery-earnings">
                  <p className="base-amount">₹{Math.round(order.totalAmount * 0.6)}</p>
                  <p className="bonus-amount">+₹15 bonus</p>
                </div>
                <div className="delivery-status">
                  <span className="status-badge">Delivered</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {deliveredOrders.length === 0 && (
        <div className="recent-deliveries">
          <h2>No Deliveries Yet</h2>
          <p className="empty-message">Complete your first delivery to see earnings here!</p>
        </div>
      )}

      {/* Payment Methods */}
      <div className="payment-section">
        <h2>Payment Methods</h2>
        <div className="payment-methods">
          <div className="payment-method">
            <div className="method-icon">🏦</div>
            <div className="method-details">
              <p className="method-name">Bank Account</p>
              <p className="method-info">Account ending with ****{user?.bankAccount?.slice(-4) || '5678'}</p>
            </div>
            <button className="method-action">Set as Default</button>
          </div>
        </div>
      </div>

      {/* Withdrawal Section */}
      <div className="withdrawal-section">
        <h2>Withdraw Earnings</h2>
        <div className="withdrawal-card">
          <div className="withdrawal-info">
            <p className="withdrawal-available">Available Balance</p>
            <p className="withdrawal-amount">₹{currentData.total}</p>
            <p className="withdrawal-note">Minimum withdrawal: ₹100</p>
          </div>
          <button className="btn-withdraw" disabled={currentData.total < 100}>Withdraw Now</button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarnings;
