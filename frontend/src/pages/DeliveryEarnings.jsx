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
      if (!user || !user.id) {
        console.error('User not found');
        setLoading(false);
        return;
      }
      const data = await orderApi.getRiderOrders(user.id);
      // Filter only delivered orders
      const delivered = data.filter(order => order.status === 'DELIVERED');
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
        <div className="header-content">
          <h1>💰 Earnings Dashboard</h1>
          <p>Track your delivery earnings and performance metrics</p>
        </div>
      </div>

      {/* Period Selector */}
      <div className="period-selector-wrapper">
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
      </div>

      {/* Main Stats Cards */}
      <div className="earnings-cards">
        <div className="earnings-card total">
          <div className="card-icon icon-total"></div>
          <div className="card-content">
            <p className="card-label">Total Earnings</p>
            <p className="card-value">₹{currentData.total.toLocaleString()}</p>
            <p className="card-change">+12% from last {selectedPeriod}</p>
          </div>
        </div>

        <div className="earnings-card deliveries">
          <div className="card-icon icon-deliveries"></div>
          <div className="card-content">
            <p className="card-label">Deliveries</p>
            <p className="card-value">{currentData.deliveries}</p>
            <p className="card-change">Completed this {selectedPeriod}</p>
          </div>
        </div>

        <div className="earnings-card bonus">
          <div className="card-icon icon-bonus"></div>
          <div className="card-content">
            <p className="card-label">Bonus Earned</p>
            <p className="card-value">₹{currentData.bonus}</p>
            <p className="card-change">Performance bonus</p>
          </div>
        </div>

        <div className="earnings-card average">
          <div className="card-icon icon-average"></div>
          <div className="card-content">
            <p className="card-label">Avg Per Delivery</p>
            <p className="card-value">₹{currentData.deliveries > 0 ? Math.round(currentData.total / currentData.deliveries) : 0}</p>
            <p className="card-change">Per delivery average</p>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="additional-stats">
        <div className="stat-box">
          <div className="stat-label">Base Earnings</div>
          <div className="stat-value">₹{currentData.baseAmount.toLocaleString()}</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Completion Rate</div>
          <div className="stat-value">{currentData.deliveries > 0 ? '98' : '-'}%</div>
        </div>
        <div className="stat-box">
          <div className="stat-label">Earnings Efficiency</div>
          <div className="stat-value">{currentData.deliveries > 0 ? Math.round((currentData.total / (currentData.deliveries * 200)) * 100) : '-'}%</div>
        </div>
      </div>

      {/* Earnings Breakdown */}
      <div className="earnings-breakdown">
        <h2>Earnings Breakdown</h2>
        <div className="breakdown-items">
          <div className="breakdown-item">
            <div className="breakdown-label">
              <span className="breakdown-title">Base Earnings (60%)</span>
              <span className="breakdown-amount">₹{currentData.baseAmount.toLocaleString()}</span>
            </div>
            <div className="breakdown-bar">
              <div className="breakdown-fill" style={{width: '60%'}}></div>
            </div>
          </div>
          <div className="breakdown-item">
            <div className="breakdown-label">
              <span className="breakdown-title">Performance Bonus</span>
              <span className="breakdown-amount">₹{currentData.bonus.toLocaleString()}</span>
            </div>
            <div className="breakdown-bar">
              <div className="breakdown-fill bonus-fill" style={{width: `${currentData.deliveries > 0 ? Math.min((currentData.bonus / currentData.total * 100), 40) : 0}%`}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Deliveries */}
      <div className="recent-deliveries">
        <div className="section-header">
          <h2>Recent Delivered Orders</h2>
          <p className="section-subtitle">{currentData.deliveries} completed deliveries</p>
        </div>
        {deliveredOrders.length > 0 ? (
          <div className="deliveries-list">
            {deliveredOrders.slice(0, 10).map((order) => (
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
        ) : (
          <div className="empty-state">
            <p className="empty-icon">📦</p>
            <p className="empty-message">No deliveries completed yet. Accept orders to start earning!</p>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="payment-section">
        <div className="section-header">
          <h2>Payment Methods</h2>
          <p className="section-subtitle">Add or manage your payment methods</p>
        </div>
        <div className="payment-methods">
          <div className="payment-method">
            <div className="method-icon"></div>
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
          <div className="withdrawal-content">
            <div className="withdrawal-info">
              <p className="withdrawal-available">Available Balance</p>
              <p className="withdrawal-amount">₹{currentData.total.toLocaleString()}</p>
              <p className="withdrawal-note">Minimum withdrawal: ₹100</p>
            </div>
            <button className="btn-withdraw" disabled={currentData.total < 100}>
              {currentData.total >= 100 ? 'Withdraw Now' : 'Insufficient Balance'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarnings;
