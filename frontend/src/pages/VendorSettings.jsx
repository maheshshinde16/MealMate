import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import VendorNavbar from '../components/VendorNavbar';
import './VendorSettings.css';

const VendorSettings = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderAlerts: true,
    promotionalEmails: false,
    smsNotifications: true,
    language: 'English',
    timezone: 'UTC+5'
  });

  const [activeTab, setActiveTab] = useState('account');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/vendor-login');
    }
  }, [isAuthenticated, navigate]);

  const handleSettingChange = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  const handleSelectChange = (e, key) => {
    setSettings(prev => ({
      ...prev,
      [key]: e.target.value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Settings saved:', settings);
    alert('Settings updated successfully!');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/vendor-login');
  };

  const handleDeleteAccount = () => {
    console.log('Account deletion requested');
    // In a real app, this would make an API call
    alert('Account deletion request submitted. Our team will review this within 48 hours.');
    setShowDeleteConfirm(false);
  };

  return (
    <div className="vendor-settings-page">
      <VendorNavbar />

      <div className="settings-container">
        <h1>Settings</h1>

        <div className="settings-layout">
          {/* Sidebar Tabs */}
          <div className="settings-sidebar">
            <button 
              className={`tab-btn ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Account
            </button>
            <button 
              className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('notifications')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              Notifications
            </button>
            <button 
              className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Security
            </button>
          </div>

          {/* Tab Content */}
          <div className="settings-content">
            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="tab-panel">
                <h2>Account Settings</h2>
                <div className="settings-group">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Email Address</h3>
                      <p>{user?.email}</p>
                    </div>
                    <button className="secondary-btn">Change Email</button>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Password</h3>
                      <p>Last changed 3 months ago</p>
                    </div>
                    <button className="secondary-btn">Change Password</button>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Language</h3>
                      <p>Choose your preferred language</p>
                    </div>
                    <select 
                      value={settings.language} 
                      onChange={(e) => handleSelectChange(e, 'language')}
                      className="select-input"
                    >
                      <option>English</option>
                      <option>Urdu</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h3>Timezone</h3>
                      <p>Set your business timezone</p>
                    </div>
                    <select 
                      value={settings.timezone} 
                      onChange={(e) => handleSelectChange(e, 'timezone')}
                      className="select-input"
                    >
                      <option>UTC+5</option>
                      <option>UTC+0</option>
                      <option>UTC+1</option>
                      <option>UTC+2</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="tab-panel">
                <h2>Notification Preferences</h2>
                <div className="settings-group">
                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h3>Email Notifications</h3>
                      <p>Receive important updates via email</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={settings.emailNotifications}
                        onChange={() => handleSettingChange('emailNotifications')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h3>Order Alerts</h3>
                      <p>Get notified for every new order</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={settings.orderAlerts}
                        onChange={() => handleSettingChange('orderAlerts')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h3>SMS Notifications</h3>
                      <p>Get instant alerts via SMS</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={settings.smsNotifications}
                        onChange={() => handleSettingChange('smsNotifications')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item">
                    <div className="toggle-info">
                      <h3>Promotional Emails</h3>
                      <p>Receive tips and promotional offers</p>
                    </div>
                    <label className="toggle-switch">
                      <input 
                        type="checkbox" 
                        checked={settings.promotionalEmails}
                        onChange={() => handleSettingChange('promotionalEmails')}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="settings-actions">
                  <button className="primary-btn" onClick={handleSaveSettings}>Save Preferences</button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="tab-panel">
                <h2>Security Settings</h2>
                <div className="settings-group">
                  <div className="security-item">
                    <div className="security-info">
                      <h3>Two-Factor Authentication</h3>
                      <p>Add an extra layer of security to your account</p>
                      <p className="status">Not enabled</p>
                    </div>
                    <button className="secondary-btn">Enable 2FA</button>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h3>Login Activity</h3>
                      <p>Monitor your account access</p>
                    </div>
                    <button className="secondary-btn">View Activity</button>
                  </div>

                  <div className="security-item">
                    <div className="security-info">
                      <h3>Connected Apps</h3>
                      <p>Manage third-party applications</p>
                    </div>
                    <button className="secondary-btn">Manage Apps</button>
                  </div>

                  <div className="divider"></div>

                  <div className="danger-zone">
                    <h3>Danger Zone</h3>
                    <div className="danger-action">
                      <div className="danger-info">
                        <h4>Logout from all devices</h4>
                        <p>Sign out from all other active sessions</p>
                      </div>
                      <button className="danger-btn" onClick={handleLogout}>Logout All</button>
                    </div>

                    <div className="danger-action">
                      <div className="danger-info">
                        <h4>Delete Account</h4>
                        <p>Permanently delete your account and data</p>
                      </div>
                      <button 
                        className="danger-btn delete" 
                        onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                      >
                        Delete Account
                      </button>
                    </div>

                    {showDeleteConfirm && (
                      <div className="confirm-dialog">
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="confirm-actions">
                          <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                          <button className="confirm-delete-btn" onClick={handleDeleteAccount}>Delete Forever</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorSettings;
