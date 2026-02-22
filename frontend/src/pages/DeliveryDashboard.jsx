import React, { useState, useEffect } from 'react';
import { getAllOrders } from '../api/orderApi';
import Loader from '../components/Loader';
import Button from '../components/Button';
import './DeliveryDashboard.css';

const DeliveryDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    try {
      const data = await getAllOrders();
      // Filter only orders that need delivery
      const deliveryOrders = data.filter(
        order => order.status === 'OUT_FOR_DELIVERY' || order.status === 'CONFIRMED'
      );
      setDeliveries(deliveryOrders);
    } catch (err) {
      console.error('Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  const updateDeliveryStatus = (orderId, status) => {
    alert(`Delivery ${orderId} status updated to ${status}`);
    // Update delivery status logic
  };

  const filteredDeliveries = filter === 'ALL' 
    ? deliveries 
    : deliveries.filter(d => d.status === filter);

  if (loading) return <Loader fullPage />;

  return (
    <div className="delivery-dashboard">
      <h1>Delivery Dashboard</h1>

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
          Ready for Pickup
        </Button>
        <Button 
          variant={filter === 'OUT_FOR_DELIVERY' ? 'primary' : 'secondary'}
          onClick={() => setFilter('OUT_FOR_DELIVERY')}
        >
          Out for Delivery
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
                <p><strong>Amount:</strong> ${delivery.totalAmount}</p>
                <p><strong>Status:</strong> {delivery.status}</p>
              </div>
              <div className="delivery-actions">
                {delivery.status === 'CONFIRMED' && (
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
                    Mark Delivered
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
