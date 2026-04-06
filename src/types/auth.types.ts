export type UserRole = 'ADMIN' | 'OPERATOR' | 'VIEWER';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  type: string;
  email: string;
  roles: string;
}

export interface AuthError {
  message: string;
  statusCode?: number;
  field?: 'email' | 'password' | 'general';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: LoginResponse | null;
  isLoading: boolean;
  error: AuthError | null;
}
