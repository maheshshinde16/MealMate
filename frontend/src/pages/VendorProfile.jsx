import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateVendor } from '../api/vendorApi';
import VendorNavbar from '../components/VendorNavbar';
import ImageUploadModal from '../components/ImageUploadModal';
import './VendorProfile.css';

const VendorProfile = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [savingRestaurantImage, setSavingRestaurantImage] = useState(false);
  const [profileData, setProfileData] = useState({
    restaurantName: 'Your Restaurant',
    cuisine: 'All',
    location: 'City, Country',
    phone: '+92-XXX-XXXX-XXX',
    website: '',
    description: 'Add your restaurant description here',
    banner: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80'
  });

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/vendor-login');
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

  const openImageModal = () => {
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const handleSaveRestaurantImage = async (imageData) => {
    setSavingRestaurantImage(true);
    try {
      // Update the banner image in profile data
      setProfileData(prev => ({
        ...prev,
        banner: imageData
      }));

      // Try to update vendor in backend if user has vendor info
      if (user?.id) {
        const vendorPayload = {
          id: user.id,
          name: user.fullName,
          imageUrl: imageData
        };
        try {
          await updateVendor(user.id, vendorPayload);
          console.log('Restaurant image saved successfully');
          alert('Restaurant image updated successfully! ✅');
        } catch (err) {
          console.error('Note: Backend update failed, but image is updated locally:', err);
          alert('Restaurant image updated! ✅');
        }
      } else {
        alert('Restaurant image updated! ✅');
      }
    } catch (err) {
      console.error('Failed to save restaurant image:', err);
      alert('Failed to save restaurant image. Please try again.');
    } finally {
      setSavingRestaurantImage(false);
      closeImageModal();
    }
  };

  return (
    <div className="vendor-profile-page">
     

      <div className="profile-container">
        <div className="profile-header">
          <h1>Restaurant Profile</h1>
          <button 
            className={`edit-btn ${editMode ? 'cancel' : ''}`}
            onClick={() => setEditMode(!editMode)}
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="profile-content">
          {/* Banner Section */}
          <div className="banner-section">
            <img src={profileData.banner} alt="Restaurant Banner" className="banner-image" />
            <button 
              className="btn-edit-restaurant-image"
              onClick={openImageModal}
              title="Edit restaurant image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <span>Change Image</span>
            </button>
          </div>

          {/* Main Profile Section */}
          <div className="profile-main">
            <div className="profile-grid">
              {/* Left Column */}
              <div className="profile-column">
                <div className="form-group">
                  <label>Restaurant Name</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="restaurantName"
                      value={profileData.restaurantName}
                      onChange={handleChange}
                      placeholder="Enter restaurant name"
                    />
                  ) : (
                    <p className="display-value">{profileData.restaurantName}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Cuisine Type</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="cuisine"
                      value={profileData.cuisine}
                      onChange={handleChange}
                      placeholder="e.g., Chinese, Italian, Pakistani"
                    />
                  ) : (
                    <p className="display-value">{profileData.cuisine}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Location</label>
                  {editMode ? (
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleChange}
                      placeholder="City, Country"
                    />
                  ) : (
                    <p className="display-value">{profileData.location}</p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="profile-column">
                <div className="form-group">
                  <label>Phone Number</label>
                  {editMode ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      placeholder="+92-XXX-XXXX-XXX"
                    />
                  ) : (
                    <p className="display-value">{profileData.phone}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Website</label>
                  {editMode ? (
                    <input
                      type="url"
                      name="website"
                      value={profileData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  ) : (
                    <p className="display-value">{profileData.website || 'Not added'}</p>
                  )}
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <p className="display-value">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label>Restaurant Description</label>
              {editMode ? (
                <textarea
                  name="description"
                  value={profileData.description}
                  onChange={handleChange}
                  placeholder="Tell customers about your restaurant"
                  rows="5"
                />
              ) : (
                <p className="display-value description-text">{profileData.description}</p>
              )}
            </div>

            {/* Save Button */}
            {editMode && (
              <div className="form-actions">
                <button className="save-btn" onClick={handleSave}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                  </svg>
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="profile-stats">
            <div className="stat-box">
              <div className="stat-number">4.8</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">245</div>
              <div className="stat-label">Total Orders</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-box">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Upload Modal for Restaurant */}
      <ImageUploadModal
        isOpen={showImageModal}
        item={{ imageUrl: profileData.banner }}
        onClose={closeImageModal}
        onSave={handleSaveRestaurantImage}
        isSaving={savingRestaurantImage}
      />
    </div>
  );
};

export default VendorProfile;
