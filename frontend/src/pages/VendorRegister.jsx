import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../store/authSlice';
import authApi from '../api/authApi';
import vendorApi from '../api/vendorApi';
import Input from '../components/Input';
import Button from '../components/Button';
import GoogleLoginButton from '../components/GoogleLoginButton';
import VendorNavbar from '../components/VendorNavbar';
import './VendorRegister.css';

const VendorRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    cuisineType: '',
    description: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleGoogleSuccess = async (googleUserData) => {
    setError('');
    setLoading(true);

    try {
      const response = await authApi.googleRegister(googleUserData, 'vendor');
      authApi.setAuthData(response.token, response.user);
      dispatch(loginAction({
        user: response.user,
        token: response.token
      }));

      // Create vendor profile with Google data
      await vendorApi.createVendor({
        name: googleUserData.fullName || 'My Restaurant',
        description: 'Restaurant description',
        address: '',
        phoneNumber: '',
        cuisineType: 'General'
      });

      navigate('/vendor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Google registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = (errorMessage) => {
    setError(errorMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const registerPayload = {
        fullName: formData.ownerName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        role: 'vendor',  // Specify vendor role
        restaurantName: formData.restaurantName,
        cuisineType: formData.cuisineType,
        description: formData.description
      };

      const authResponse = await authApi.register(registerPayload);
      authApi.setAuthData(authResponse.token, authResponse.user);
      dispatch(loginAction({
        user: authResponse.user,
        token: authResponse.token
      }));

      await vendorApi.createVendor({
        name: formData.restaurantName,
        description: formData.description,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        cuisineType: formData.cuisineType
      });

      navigate('/vendor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vendor-auth">
      <VendorNavbar />
      <div className="vendor-auth-body">
        <div className="vendor-auth-shell">
          <div className="vendor-auth-hero">
            <p className="vendor-auth-eyebrow">Partner Onboarding</p>
            <h1>Open your doors to more customers.</h1>
            <p className="vendor-auth-subtitle">
              Create your partner account and set up your restaurant in minutes.
            </p>
            <div className="vendor-auth-points">
              <span>Profile and menu setup</span>
              <span>Flexible delivery coverage</span>
              <span>Priority partner support</span>
            </div>
          </div>

          <div className="vendor-register-container">
            <h2>Register Your Restaurant</h2>
            {error && <div className="error-alert">{error}</div>}

            <form onSubmit={handleSubmit} className="vendor-register-form">
              <Input
                label="Restaurant Name"
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder="Enter restaurant name"
                required
              />

              <Input
                label="Owner Name"
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                required
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />

              <Input
                label="Restaurant Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter restaurant address"
                required
              />

              <Input
                label="Cuisine Type"
                type="text"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                placeholder="e.g., Italian, Indian, Mexican"
                required
              />

              <Input
                label="Short Description"
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your restaurant"
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />

              <Button
                type="submit"
                variant="success"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </form>

            <div className="auth-divider">
              <span className="auth-divider-text">Or register with</span>
            </div>

            <GoogleLoginButton 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              role="vendor"
              disabled={loading}
            />

            <p className="vendor-login-link">
              Already a partner? <Link to="/vendor-login">Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
