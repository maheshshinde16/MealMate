import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import orderApi from '../api/orderApi';
import Loader from '../components/Loader';
import Button from '../components/Button';
import './DeliveryDashboard.css';

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  const getStatusLabel = (status) => {
    if (status === 'PREPARING') return 'READY TO PICK';
    if (status === 'OUT_FOR_DELIVERY') return 'OUT FOR DELIVERY';
    return status || 'UNKNOWN';
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/rider-login');
      return;
    }
    fetchDeliveries();
    
    // Auto-refresh deliveries every 5 seconds
    const intervalId = setInterval(() => {
      fetchDeliveries();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated]);

  const fetchDeliveries = async () => {
    try {
      // Fetch available orders for pickup (CONFIRMED, PREPARING statuses)
      const availableOrders = await orderApi.getAvailableOrdersForRiders();
      
      // Fetch orders assigned to this rider (OUT_FOR_DELIVERY, DELIVERED)
      let assignedOrders = [];
      if (user?.id) {
        try {
          assignedOrders = await orderApi.getRiderOrders(user.id);
        } catch (err) {
          console.log('No assigned orders yet');
        }
      }
      
      // Combine both lists and remove duplicates by order ID
      const allOrders = [...(Array.isArray(availableOrders) ? availableOrders : []), 
                          ...(Array.isArray(assignedOrders) ? assignedOrders : [])];
      const uniqueOrders = allOrders.filter((order, index, self) =>
        index === self.findIndex((o) => o.id === order.id)
      );
      
      setDeliveries(uniqueOrders);
    } catch (err) {
      console.error('Failed to load deliveries:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryStatus = async (orderId, status) => {
    try {
      const deliveryToUpdate = deliveries.find(d => d.id === orderId);
      if (!deliveryToUpdate) {
        alert('Delivery not found');
        return;
      }

      const updatedDeliveryData = {
        ...deliveryToUpdate,
        status: status,
        deliveryPartnerId: user?.id  // Include rider ID for OUT_FOR_DELIVERY status
      };

      await orderApi.updateOrder(orderId, updatedDeliveryData);

      // Update local state only after successful API call
      const updatedDeliveries = deliveries.map(delivery =>
        delivery.id === orderId ? { ...delivery, status: status, deliveryPartnerId: user?.id } : delivery
      );
      setDeliveries(updatedDeliveries);

      // Show success message
      const statusMessages = {
        'OUT_FOR_DELIVERY': 'Pickup confirmed! Order is now out for delivery',
        'DELIVERED': 'Great! Order marked as delivered',
        'CANCELLED': 'Order has been cancelled'
      };

      alert(statusMessages[status] || `Delivery status updated to ${status}`);
    } catch (err) {
      console.error('Failed to update delivery status:', err);
      alert('Failed to update delivery status. Please try again.');
    }
  };

  const filteredDeliveries = filter === 'ALL' 
    ? deliveries 
    : filter === 'CONFIRMED'
      ? deliveries.filter(d => d.status === 'CONFIRMED' || d.status === 'PREPARING')
      : deliveries.filter(d => d.status === filter);

  if (loading) return <Loader fullPage />;

  if (!isAuthenticated) {
    return <div>Please login to view deliveries</div>;
  }

  return (
    <div className="delivery-dashboard">
      <h1>Delivery Dashboard</h1>
      <p className="welcome-msg">Welcome, {user?.fullName || 'Delivery Partner'}!</p>

      <div className="filter-buttons">
        <Button 
          variant={filter === 'ALL' ? 'primary' : 'secondary'}
          onClick={() => setFilter('ALL')}
        >
          All
        </Button>
        <Button 
          variant={filter === 'CONFIRMED' ? 'primary' : 'secondary'}
          onClick={() => setFilter('CONFIRMED')}
        >
          Available ({deliveries.filter(d => d.status === 'CONFIRMED' || d.status === 'PREPARING').length})
        </Button>
        <Button 
          variant={filter === 'OUT_FOR_DELIVERY' ? 'primary' : 'secondary'}
          onClick={() => setFilter('OUT_FOR_DELIVERY')}
        >
          Active ({deliveries.filter(d => d.status === 'OUT_FOR_DELIVERY').length})
        </Button>
      </div>

      {filteredDeliveries.length === 0 ? (
        <p className="no-deliveries">No deliveries available</p>
      ) : (
        <div className="deliveries-list">
          {filteredDeliveries.map(delivery => (
            <div key={delivery.id} className="delivery-card">
              <div className="delivery-info">
                <h3>Order #{delivery.id}</h3>
                <p><strong>Customer:</strong> {delivery.customerName || 'N/A'}</p>
                <p><strong>Address:</strong> {delivery.deliveryAddress}</p>
                <p><strong>Amount:</strong> ₹{delivery.totalAmount}</p>
                <p><strong>Status:</strong> <span className={`status-badge ${delivery.status}`}>{getStatusLabel(delivery.status)}</span></p>
              </div>
              <div className="delivery-actions">
                {(delivery.status === 'CONFIRMED' || delivery.status === 'PREPARING') && (
                  <Button 
                    variant="primary"
                    onClick={() => updateDeliveryStatus(delivery.id, 'OUT_FOR_DELIVERY')}
                  >
                    Pick Up
                  </Button>
                )}
                {delivery.status === 'OUT_FOR_DELIVERY' && (
                  <Button 
                    variant="success"
                    onClick={() => updateDeliveryStatus(delivery.id, 'DELIVERED')}
                  >
                    Delivered
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboard;
