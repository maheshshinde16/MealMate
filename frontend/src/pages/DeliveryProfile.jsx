import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './DeliveryProfile.css';

const DeliveryProfile = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    vehicleType: 'bicycle',
    licenseNumber: '',
    bankAccount: '',
    accountHolder: ''
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/rider-login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    console.log('Profile saved:', profileData);
    setEditMode(false);
  };

  return (
    <div className="delivery-profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>Delivery Partner Profile</h1>
          <button 
            className={`edit-btn ${editMode ? 'cancel' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-avatar">
          <div className="avatar-circle">
            <span className="avatar-icon">🏍️</span>
          </div>
          <h2>{profileData.fullName || 'Delivery Partner'}</h2>
          <p className="status-badge">Active Partner</p>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>Personal Information</h3>
            <div className="profile-grid">
              <div className="form-group">
                <label>Full Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="display-value">{profileData.fullName || 'N/A'}</p>
                )}
              </div>

              <div className="form-group">
                <label>Email</label>
                <p className="display-value">{profileData.email}</p>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                {editMode ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                ) : (
                  <p className="display-value">{profileData.phoneNumber || 'N/A'}</p>
                )}
              </div>

              <div className="form-group">
                <label>Address</label>
                {editMode ? (
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                ) : (
                  <p className="display-value">{profileData.address || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Vehicle & License Information</h3>
            <div className="profile-grid">
              <div className="form-group">
                <label>Vehicle Type</label>
                {editMode ? (
                  <select
                    name="vehicleType"
                    value={profileData.vehicleType}
                    onChange={handleChange}
                  >
                    <option value="bicycle">Bicycle</option>
                    <option value="scooter">Scooter</option>
                    <option value="motorcycle">Motorcycle</option>
                    <option value="car">Car</option>
                  </select>
                ) : (
                  <p className="display-value capitalized">{profileData.vehicleType}</p>
                )}
              </div>

              <div className="form-group">
                <label>License Number</label>
                {editMode ? (
                  <input
                    type="text"
                    name="licenseNumber"
                    value={profileData.licenseNumber}
                    onChange={handleChange}
                    placeholder="Enter your driver license number"
                  />
                ) : (
                  <p className="display-value">{profileData.licenseNumber || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>Bank & Payment Information</h3>
            <div className="profile-grid">
              <div className="form-group">
                <label>Account Holder Name</label>
                {editMode ? (
                  <input
                    type="text"
                    name="accountHolder"
                    value={profileData.accountHolder}
                    onChange={handleChange}
                    placeholder="Name on bank account"
                  />
                ) : (
                  <p className="display-value">{profileData.accountHolder || 'N/A'}</p>
                )}
              </div>

              <div className="form-group">
                <label>Bank Account Number</label>
                {editMode ? (
                  <input
                    type="text"
                    name="bankAccount"
                    value={profileData.bankAccount}
                    onChange={handleChange}
                    placeholder="Enter your bank account number"
                  />
                ) : (
                  <p className="display-value">
                    {profileData.bankAccount ? `****${profileData.bankAccount.slice(-4)}` : 'N/A'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {editMode && (
            <div className="profile-actions">
              <button className="save-btn" onClick={handleSave}>
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="profile-stats">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <p className="stat-label">Total Deliveries</p>
              <p className="stat-value">0</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-content">
              <p className="stat-label">Rating</p>
              <p className="stat-value">-</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <p className="stat-label">Total Earnings</p>
              <p className="stat-value">₹0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryProfile;
