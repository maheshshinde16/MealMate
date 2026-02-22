import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { loginSuccess, logout } from '../redux/slices/authSlice';
import authService from '../services/authService';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const login = useCallback(
    async (email, password) => {
      try {
        const response = await authService.login(email, password);
        dispatch(
          loginSuccess({
            user: response.data.user,
            token: response.data.token,
          })
        );
        return response.data;
      } catch (err) {
        throw err;
      }
    },
    [dispatch]
  );

  const logoutUser = useCallback(() => {
    dispatch(logout());
    authService.logout();
  }, [dispatch]);

  return {
    user,
    token,
    isAuthenticated,
    loading,
    error,
    login,
    logout: logoutUser,
  };
};
