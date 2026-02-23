import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../store/authSlice';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import './RiderRegister.css';

const RiderRegister = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    vehicleType: 'bicycle',
    licenseNumber: '',
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
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        role: 'rider'
      };

      const authResponse = await authApi.register(registerPayload);
      authApi.setAuthData(authResponse.token, authResponse.user);
      dispatch(loginAction({
        user: authResponse.user,
        token: authResponse.token
      }));

      navigate('/delivery-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rider-auth">
      <div className="rider-auth-container">
        <div className="rider-auth-header">
          <div className="rider-logo">🏍️</div>
          <h1>Become a Delivery Partner</h1>
          <p>Join thousands earning on their own schedule</p>
        </div>

        <form onSubmit={handleSubmit} className="rider-register-form">
          {error && <div className="error-alert">{error}</div>}

          <div className="form-grid">
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />

            <Input
              label="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              required
            />

            <div className="form-group">
              <label>Vehicle Type</label>
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                required
              >
                <option value="bicycle">Bicycle</option>
                <option value="scooter">Scooter</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="car">Car</option>
              </select>
            </div>

            <Input
              label="License Number"
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Enter your driver license number"
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
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            className="btn-register"
          >
            {loading ? 'Creating Account...' : 'Start Earning'}
          </Button>
        </form>

        <p className="rider-login-link">
          Already a delivery partner? <Link to="/rider-login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RiderRegister;
