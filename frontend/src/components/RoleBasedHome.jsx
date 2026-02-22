import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from '../pages/Home';

const RoleBasedHome = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user?.roles) {
      // Redirect based on user role
      if (user.roles.includes('ROLE_DELIVERY')) {
        navigate('/delivery-home', { replace: true });
      } else if (user.roles.includes('ROLE_VENDOR')) {
        navigate('/vendor-home', { replace: true });
      } else if (user.roles.includes('ROLE_ADMIN')) {
        navigate('/admin-dashboard', { replace: true });
      }
      // If ROLE_USER only, stay on regular home page
    }
  }, [isAuthenticated, user, navigate]);

  // Show regular home page for non-authenticated users or regular customers
  return <Home />;
};

export default RoleBasedHome;
