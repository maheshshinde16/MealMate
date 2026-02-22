import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, EditOutlined } from '@ant-design/icons';
import './Profile.css';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call API to update profile
    console.log('Updating profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <UserOutlined />
          </div>
          <h1>My Profile</h1>
        </div>

        {!isEditing ? (
          <div className="profile-view">
            <div className="profile-info">
              <div className="info-group">
                <label className="info-label">
                  <UserOutlined /> Full Name
                </label>
                <p className="info-value">{user?.fullName || 'Not set'}</p>
              </div>

              <div className="info-group">
                <label className="info-label">
                  <MailOutlined /> Email
                </label>
                <p className="info-value">{user?.email || 'Not set'}</p>
              </div>

              <div className="info-group">
                <label className="info-label">
                  <PhoneOutlined /> Phone Number
                </label>
                <p className="info-value">{user?.phoneNumber || 'Not set'}</p>
              </div>

              <div className="info-group">
                <label className="info-label">
                  <EnvironmentOutlined /> Address
                </label>
                <p className="info-value">{user?.address || 'Not set'}</p>
              </div>
            </div>

            <button 
              className="btn-edit"
              onClick={() => setIsEditing(true)}
            >
              <EditOutlined /> Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="profile-edit">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-save"
              >
                Save Changes
              </button>
              <button 
                type="button" 
                className="btn-cancel"
                onClick={() => {
                  setIsEditing(false);
                  setFormData({
                    fullName: user?.fullName || '',
                    email: user?.email || '',
                    phoneNumber: user?.phoneNumber || '',
                    address: user?.address || ''
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
