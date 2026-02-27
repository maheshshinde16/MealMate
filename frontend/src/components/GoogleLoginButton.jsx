import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { extractGoogleUserData } from '../utils/googleAuth';
import './GoogleLoginButton.css';

const GoogleLoginButton = ({ onSuccess, onError, role = 'user', disabled = false }) => {
  const handleSuccess = (credentialResponse) => {
    try {
      const googleUserData = extractGoogleUserData(credentialResponse);
      if (onSuccess) {
        onSuccess(googleUserData, role);
      }
    } catch (error) {
      console.error('Google authentication error:', error);
      if (onError) {
        onError('Failed to process Google authentication');
      }
    }
  };

  const handleError = () => {
    console.log('Google Login Failed');
    if (onError) {
      onError('Google login failed. Please try again.');
    }
  };

  return (
    <div className="google-login-wrapper">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        width="100%"
        disabled={disabled}
      />
    </div>
  );
};

export default GoogleLoginButton;
