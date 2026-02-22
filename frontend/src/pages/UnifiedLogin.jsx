import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../store/authSlice';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import './UnifiedLogin.css';

const UnifiedLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

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
      const response = await authApi.login({ ...formData, role });

      dispatch(loginAction({
        user: response.user,
        token: response.token
      }));

      // Redirect based on role
      if (role === 'vendor') {
        navigate('/vendor-dashboard');
      } else if (role === 'rider') {
        navigate('/delivery-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const roleInfo = {
    user: { icon: '🍽️', title: 'Customer', color: '#667eea' },
    vendor: { icon: '👨‍🍳', title: 'Restaurant', color: '#f97316' },
    rider: { icon: '🏍️', title: 'Rider', color: '#10b981' }
  };

  const current = roleInfo[role];

  return (
    <div className="unified-login-page">
      <div className="unified-login-wrapper">
        <div className="login-form-side">
          <div className="login-header">
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          <div className="role-selector">
            <label>I'm signing in as</label>
            <div className="role-buttons">
              {Object.entries(roleInfo).map(([key, info]) => (
                <button
                  key={key}
                  type="button"
                  className={`role-btn ${role === key ? 'active' : ''}`}
                  onClick={() => setRole(key)}
                  style={{ '--role-color': info.color }}
                >
                  <span className="role-icon">{info.icon}</span>
                  <span className="role-text">{info.title}</span>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="error-alert">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
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
              style={{ background: current.color }}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/role-selection">Sign up here</Link>
          </p>
        </div>

        <div className="login-hero-side">
          <div className="hero-content">
            <div className="hero-icon" style={{ color: current.color }}>
              {current.icon}
            </div>
            <h2>{current.title}</h2>
            {role === 'user' && (
              <ul className="hero-points">
                <li>Browse thousands of restaurants</li>
                <li>Order meals with one click</li>
                <li>Fast and reliable delivery</li>
              </ul>
            )}
            {role === 'vendor' && (
              <ul className="hero-points">
                <li>Manage orders in real-time</li>
                <li>Grow your restaurant business</li>
                <li>Track earnings and analytics</li>
              </ul>
            )}
            {role === 'rider' && (
              <ul className="hero-points">
                <li>Flexible delivery schedule</li>
                <li>Earn competitive rates</li>
                <li>Access 24/7 support</li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedLogin;
