import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login as loginAction, logout } from '../store/authSlice';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear non-user credentials on page load/refresh
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // If stored user has vendor or delivery role, clear the credentials
        if (parsedUser?.roles?.some(role => ['ROLE_VENDOR', 'ROLE_DELIVERY', 'ROLE_ADMIN'].includes(role))) {
          dispatch(logout());
          authApi.logout();
        }
      } catch (e) {
        console.error('Error parsing stored user:', e);
      }
    }
  }, [dispatch]);

  // Prevent accessing login page if already authenticated as regular user
  useEffect(() => {
    if (isAuthenticated) {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const isRegularUser = !parsedUser?.roles?.some(role => ['ROLE_VENDOR', 'ROLE_DELIVERY', 'ROLE_ADMIN'].includes(role));
          if (isRegularUser) {
            navigate('/');
          }
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }
  }, [isAuthenticated, navigate]);

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
      // Clear any previous authentication before logging in as user
      dispatch(logout());
      authApi.logout();
      
      const response = await authApi.login({ ...formData, role: 'user' });
      dispatch(loginAction({
        user: response.user,
        token: response.token
      }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login to MealMate</h1>
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
            variant="primary" 
            fullWidth 
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
