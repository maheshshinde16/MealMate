import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../store/authSlice';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import './RiderLogin.css';

const RiderLogin = () => {
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
      const response = await authApi.login({ ...formData, role: 'rider' });
      dispatch(loginAction({
        user: response.user,
        token: response.token
      }));
      navigate('/delivery-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rider-auth">
      <div className="rider-auth-container">
        <div className="rider-auth-header">
          <div className="rider-logo">🏍️</div>
          <h1>Delivery Partner Login</h1>
          <p>Sign in to manage your deliveries</p>
        </div>

        <div className="rider-login-card">
          <h2>Sign In</h2>
          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="rider-login-form">
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
              fullWidth
              disabled={loading}
              className="btn-login"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="rider-signup-link">
            New rider? <Link to="/rider-register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiderLogin;
