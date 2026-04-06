// src/components/auth/LoginForm.tsx

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginRequest, AuthError } from '../../types/auth.types';
import { validationRules } from '../../utils/validation.utils';
import { AppConfig } from '../../config/app.config';

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => Promise<boolean>;
  isLoading: boolean;
  error: AuthError | null;
  onClearError: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
  onClearError,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
  } = useForm<LoginRequest>({ mode: 'onTouched' });

  const handleFormSubmit = async (data: LoginRequest) => {
    onClearError();
    await onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="lgt-form">

      {/* Global error alert */}
      {error && (
        <div className="lgt-alert lgt-alert--error" role="alert">
          <span className="lgt-alert__icon">⚠</span>
          <span className="lgt-alert__text">{error.message}</span>
          <button
            type="button"
            className="lgt-alert__close"
            onClick={onClearError}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
      )}

      {/* Email field */}
      <div className={`lgt-field ${errors.email ? 'lgt-field--error' : ''} ${touchedFields.email && !errors.email ? 'lgt-field--valid' : ''}`}>
        <label htmlFor="email" className="lgt-field__label">
          Correo electrónico
        </label>
        <div className="lgt-field__wrapper">
          <span className="lgt-field__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </span>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="usuario@logitrack.com"
            className="lgt-field__input"
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email', validationRules.email)}
          />
          {touchedFields.email && !errors.email && (
            <span className="lgt-field__check" aria-hidden="true">✓</span>
          )}
        </div>
        {errors.email && (
          <p id="email-error" className="lgt-field__error" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password field */}
      <div className={`lgt-field ${errors.password ? 'lgt-field--error' : ''} ${touchedFields.password && !errors.password ? 'lgt-field--valid' : ''}`}>
        <label htmlFor="password" className="lgt-field__label">
          Contraseña
        </label>
        <div className="lgt-field__wrapper">
          <span className="lgt-field__icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </span>
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            className="lgt-field__input"
            aria-describedby={errors.password ? 'password-error' : undefined}
            {...register('password', validationRules.password)}
          />
          <button
            type="button"
            className="lgt-field__toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p id="password-error" className="lgt-field__error" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !isValid}
        className="lgt-btn lgt-btn--primary"
        aria-busy={isLoading}
      >
        {isLoading ? (
          <>
            <span className="lgt-btn__spinner" aria-hidden="true" />
            Autenticando...
          </>
        ) : (
          `Iniciar sesión`
        )}
      </button>

      <p className="lgt-form__hint">
        Sistema gestionado por <strong>{AppConfig.app.name}</strong>
      </p>
    </form>
  );
};
