import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './DeliverySettings.css';

const DeliverySettings = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    smsAlerts: true,
    onlineStatus: true,
    autoAccept: false,
    deliveryRadius: 10
  });

  if (!isAuthenticated) {
    navigate('/rider-login');
    return null;
  }

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChangeRadius = (e) => {
    setSettings(prev => ({
      ...prev,
      deliveryRadius: parseInt(e.target.value)
    }));
  };

  const handleSave = () => {
    // TODO: Save settings to backend
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your delivery preferences and account settings</p>
      </div>

      {/* Tabs */}
      <div className="settings-tabs">
        <button 
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>
        <button 
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={`tab-btn ${activeTab === 'delivery' ? 'active' : ''}`}
          onClick={() => setActiveTab('delivery')}
        >
          Delivery
        </button>
        <button 
          className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
      </div>

      <div className="settings-content">
        {/* General Settings */}
        {activeTab === 'general' && (
          <div className="settings-section">
            <h2>General Settings</h2>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Online Status</h3>
                <p>Show your availability to accept orders</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.onlineStatus}
                    onChange={() => handleToggle('onlineStatus')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Language</h3>
                <p>Choose your preferred language</p>
              </div>
              <select className="setting-select">
                <option>English</option>
                <option>Hindi</option>
                <option>Tamil</option>
              </select>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="settings-section">
            <h2>Notification Preferences</h2>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Push Notifications</h3>
                <p>Receive order and delivery notifications</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications}
                    onChange={() => handleToggle('notifications')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Email Updates</h3>
                <p>Receive summary emails about your earnings</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.emailUpdates}
                    onChange={() => handleToggle('emailUpdates')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>SMS Alerts</h3>
                <p>Receive urgent order updates via SMS</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.smsAlerts}
                    onChange={() => handleToggle('smsAlerts')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Delivery Settings */}
        {activeTab === 'delivery' && (
          <div className="settings-section">
            <h2>Delivery Preferences</h2>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Auto-Accept Orders</h3>
                <p>Automatically accept nearby orders</p>
              </div>
              <div className="setting-control">
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={settings.autoAccept}
                    onChange={() => handleToggle('autoAccept')}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Delivery Radius</h3>
                <p>Maximum distance to show available orders (km)</p>
              </div>
              <div className="setting-control">
                <input 
                  type="range" 
                  min="5" 
                  max="25" 
                  value={settings.deliveryRadius}
                  onChange={handleChangeRadius}
                  className="setting-slider"
                />
                <span className="radius-value">{settings.deliveryRadius} km</span>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Vehicle Type</h3>
                <p>Your vehicle type for deliveries</p>
              </div>
              <select className="setting-select">
                <option>Bicycle</option>
                <option>Scooter</option>
                <option>Motorcycle</option>
                <option>Car</option>
              </select>
            </div>
          </div>
        )}

        {/* Account Settings */}
        {activeTab === 'account' && (
          <div className="settings-section">
            <h2>Account Settings</h2>
            
            <div className="setting-item">
              <div className="setting-info">
                <h3>Change Password</h3>
                <p>Update your account password</p>
              </div>
              <button className="setting-btn">Change Password</button>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <button className="setting-btn">Enable 2FA</button>
            </div>

            <div className="setting-item danger">
              <div className="setting-info">
                <h3>Delete Account</h3>
                <p>Permanently delete your account and all data</p>
              </div>
              <button className="setting-btn danger-btn">Delete Account</button>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="settings-footer">
        <button className="btn-save" onClick={handleSave}>Save Changes</button>
        <button className="btn-cancel" onClick={() => navigate('/delivery-dashboard')}>Cancel</button>
      </div>
    </div>
  );
};

export default DeliverySettings;
