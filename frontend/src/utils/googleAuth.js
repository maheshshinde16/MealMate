// Utility functions for Google Authentication

export const decodeJWT = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
};

export const extractGoogleUserData = (credentialResponse) => {
  if (!credentialResponse?.credential) {
    throw new Error('No credential provided');
  }

  const decodedToken = decodeJWT(credentialResponse.credential);

  return {
    email: decodedToken.email,
    fullName: decodedToken.name,
    googleId: decodedToken.sub,
    picture: decodedToken.picture,
    token: credentialResponse.credential
  };
};

export const isGoogleAuthEnabled = () => {
  return !!process.env.REACT_APP_GOOGLE_CLIENT_ID;
};

export default {
  decodeJWT,
  extractGoogleUserData,
  isGoogleAuthEnabled
};
