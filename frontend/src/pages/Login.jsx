import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../store/authSlice';
import authApi from '../api/authApi';
import Input from '../components/Input';
import Button from '../components/Button';
import './Login.css';

const Login = () => {
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
