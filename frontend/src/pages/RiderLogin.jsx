import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction, logout } from '../store/authSlice';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import GoogleLoginButton from '../components/GoogleLoginButton';
import './RiderLogin.css';

const RiderLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear non-rider credentials on page load/refresh
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // If stored user is not a rider, clear the credentials
        if (!parsedUser?.roles?.includes('ROLE_DELIVERY')) {
          dispatch(logout());
          authApi.logout();
        }
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
  }, [dispatch]);

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
      // Clear any previous authentication before logging in as rider
      dispatch(logout());
      authApi.logout();
      
      const response = await authApi.googleLogin(googleUserData, 'rider');
      authApi.setAuthData(response.token, response.user);
      dispatch(loginAction({
        user: response.user,
        token: response.token
      }));
      navigate('/delivery-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Google login failed. Please try again.');
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
    setLoading(true);

    try {
      // Clear any previous authentication before logging in as rider
      dispatch(logout());
      authApi.logout();
      
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

          <div className="auth-divider">
            <span className="auth-divider-text">Or continue with</span>
          </div>

          <GoogleLoginButton 
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            role="rider"
            disabled={loading}
          />

          <p className="rider-signup-link">
            New rider? <Link to="/rider-register">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiderLogin;
