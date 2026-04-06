import axios, { AxiosError } from 'axios';
import { AppConfig } from '../config/app.config';
import { LoginRequest, LoginResponse, AuthError } from '../types/auth.types';

const authApi = axios.create({
  baseURL: AppConfig.api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

const parseError = (error: AxiosError): AuthError => {
  if (!error.response) {
    return {
      message: 'No se pudo conectar al servidor. Verifica tu conexión.',
      field: 'general',
    };
  }

  const { status, data } = error.response as { status: number; data: any };

  if (status === 401) {
    return {
      message: 'Credenciales inválidas. Verifica tu correo y contraseña.',
      statusCode: 401,
      field: 'general',
    };
  }

  if (status === 400) {
    return {
      message: 'Datos de entrada inválidos.',
      statusCode: 400,
      field: 'general',
    };
  }

  if (status >= 500) {
    return {
      message: 'Error interno del servidor. Inténtalo más tarde.',
      statusCode: status,
      field: 'general',
    };
  }

  return {
    message: data?.error || data?.message || 'Ocurrió un error inesperado.',
    statusCode: status,
    field: 'general',
  };
};

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const { data } = await authApi.post<LoginResponse>(
        `/api/${AppConfig.api.version}/auth/login`,
        credentials
      );
      return data;
    } catch (error) {
      throw parseError(error as AxiosError);
    }
  },

  saveSession: (response: LoginResponse): void => {
    localStorage.setItem(AppConfig.app.jwtStorageKey, response.token);
    localStorage.setItem('logitrack_user', JSON.stringify(response));
  },

  clearSession: (): void => {
    localStorage.removeItem(AppConfig.app.jwtStorageKey);
    localStorage.removeItem('logitrack_user');
  },

  getStoredUser: (): LoginResponse | null => {
    const raw = localStorage.getItem('logitrack_user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as LoginResponse;
    } catch {
      return null;
    }
  },

  isSessionActive: (): boolean => {
    return Boolean(localStorage.getItem(AppConfig.app.jwtStorageKey));
  },
};
