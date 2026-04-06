import React from 'react';
import { LoginForm } from './LoginForm';
import { Dashboard } from './Dashboard';
import { useAuth } from '../../hooks/useAuth';
import { AppConfig } from '../../config/app.config';

export const LoginPage: React.FC = () => {
  const { isAuthenticated, user, isLoading, error, login, logout, clearError } = useAuth();

  if (isAuthenticated && user) {
    return <Dashboard user={user} onLogout={logout} />;
  }

  return (
    <div className="lgt-layout">
      {/* Left panel – branding */}
      <aside className="lgt-panel lgt-panel--brand">
        <div className="lgt-panel__brand-content">
          <div className="lgt-logo">
            <svg className="lgt-logo__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="currentColor" fillOpacity="0.15"/>
              <path d="M10 34L18 14l8 12 6-8 6 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="38" cy="14" r="3" fill="currentColor"/>
            </svg>
            <span className="lgt-logo__name">{AppConfig.app.name}</span>
          </div>
          <h1 className="lgt-panel__headline">
            Gestión logística<br/>
            <em>inteligente.</em>
          </h1>
          <p className="lgt-panel__subtext">
            Monitorea, opera y analiza tu cadena de suministro desde un solo lugar.
          </p>

          <ul className="lgt-features">
            {[
              { icon: '⚡', text: 'Tiempo real' },
              { icon: '🔒', text: 'Acceso por roles' },
              { icon: '📊', text: 'Dashboards operativos' },
            ].map((f) => (
              <li key={f.text} className="lgt-features__item">
                <span className="lgt-features__icon">{f.icon}</span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Decorative grid */}
        <div className="lgt-panel__grid" aria-hidden="true">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="lgt-panel__cell" />
          ))}
        </div>
      </aside>

      {/* Right panel – form */}
      <main className="lgt-panel lgt-panel--form">
        <div className="lgt-panel__form-content">
          <header className="lgt-form-header">
            <h2 className="lgt-form-header__title">Iniciar sesión</h2>
            <p className="lgt-form-header__subtitle">
              Accede con tus credenciales corporativas
            </p>
          </header>

          <LoginForm
            onSubmit={login}
            isLoading={isLoading}
            error={error}
            onClearError={clearError}
          />
        </div>
      </main>
    </div>
  );
};
