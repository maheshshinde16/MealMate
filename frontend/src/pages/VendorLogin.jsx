import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../store/authSlice';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import VendorNavbar from '../components/VendorNavbar';
import './VendorLogin.css';

const VendorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      const response = await authApi.login({ ...formData, role: 'vendor' });
      dispatch(loginAction({
        user: response.user,
        token: response.token
      }));
      navigate('/vendor-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
            <p className="vendor-auth-eyebrow">Partner Portal</p>
            <h1>Run your restaurant like a pro.</h1>
            <p className="vendor-auth-subtitle">
              Sign in to manage menus, track orders, and grow revenue with real-time insights.
            </p>
            <div className="vendor-auth-points">
              <span>Live order updates</span>
              <span>Menu and pricing control</span>
              <span>Weekly payout tracking</span>
            </div>
          </div>

          <div className="vendor-login-container">
            <h2>Vendor Login</h2>
            {error && <div className="error-alert">{error}</div>}

            <form onSubmit={handleSubmit} className="vendor-login-form">
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
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <p className="vendor-register-link">
              New partner? <Link to="/vendor-register">Register your restaurant</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;
