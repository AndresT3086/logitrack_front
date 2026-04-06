// src/hooks/useAuth.ts
// Encapsulates all authentication business logic away from UI components.

import { useState, useCallback } from 'react';
import { authService } from '../services/auth.service';
import { LoginRequest, AuthState, AuthError } from '../types/auth.types';

const INITIAL_STATE: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

export const useAuth = () => {
  const [state, setState] = useState<AuthState>(INITIAL_STATE);

  const setLoading = (isLoading: boolean) =>
    setState((prev) => ({ ...prev, isLoading, error: null }));

  const setError = (error: AuthError) =>
    setState((prev) => ({ ...prev, error, isLoading: false }));

  const login = useCallback(async (credentials: LoginRequest): Promise<boolean> => {
    setLoading(true);
    try {
      const response = await authService.login(credentials);
      authService.saveSession(response);
      setState({
        isAuthenticated: true,
        user: response,
        isLoading: false,
        error: null,
      });
      return true;
    } catch (error) {
      setError(error as AuthError);
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    authService.clearSession();
    setState(INITIAL_STATE);
  }, []);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    login,
    logout,
    clearError,
  };
};
