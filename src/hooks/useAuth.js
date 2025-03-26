import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchCurrentUser,
  clearErrors
} from '../store/slices/authSlice';

/**
 * Хук для работы с авторизацией через Redux
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isSubscribed, status, error } = useSelector(
    (state) => state.auth
  );

  // Получение текущего пользователя при инициализации
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, status]);

  // Авторизация пользователя
  const login = useCallback(
    async (credentials) => {
      try {
        const resultAction = await dispatch(loginUser(credentials));
        if (loginUser.fulfilled.match(resultAction)) {
          return { success: true, data: resultAction.payload };
        } else {
          return {
            success: false,
            error: resultAction.payload || 'Ошибка при входе'
          };
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [dispatch]
  );

  // Регистрация пользователя
  const register = useCallback(
    async (userData) => {
      try {
        const resultAction = await dispatch(registerUser(userData));
        if (registerUser.fulfilled.match(resultAction)) {
          return { success: true, data: resultAction.payload };
        } else {
          return {
            success: false,
            error: resultAction.payload || 'Ошибка при регистрации'
          };
        }
      } catch (error) {
        return { success: false, error: error.message };
      }
    },
    [dispatch]
  );

  // Выход пользователя
  const logout = useCallback(async () => {
    try {
      await dispatch(logoutUser());
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, [dispatch]);

  // Очистка ошибок
  const clearAuthErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isSubscribed,
    status,
    error,
    login,
    register,
    logout,
    clearAuthErrors
  };
};

export default useAuth; 