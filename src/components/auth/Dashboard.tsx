// src/components/auth/Dashboard.tsx
// Placeholder shown after successful login

import React from 'react';
import { LoginResponse } from '../../types/auth.types';

interface DashboardProps {
  user: LoginResponse;
  onLogout: () => void;
}

const ROLE_LABELS: Record<string, { label: string; color: string }> = {
  ADMIN:    { label: 'Administrador', color: '#ef4444' },
  OPERATOR: { label: 'Operador',      color: '#f59e0b' },
  VIEWER:   { label: 'Visualizador',  color: '#10b981' },
};

export const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const role = user.roles?.split(',')[0]?.trim();
  const roleInfo = ROLE_LABELS[role] || { label: role, color: '#6b7280' };

  return (
    <div className="lgt-dashboard">
      <div className="lgt-dashboard__card">
        <div className="lgt-dashboard__avatar">
          {user.email.charAt(0).toUpperCase()}
        </div>
        <h2 className="lgt-dashboard__title">¡Bienvenido de vuelta!</h2>
        <p className="lgt-dashboard__email">{user.email}</p>
        <span
          className="lgt-dashboard__role"
          style={{ backgroundColor: `${roleInfo.color}22`, color: roleInfo.color, borderColor: `${roleInfo.color}55` }}
        >
          {roleInfo.label}
        </span>
        <div className="lgt-dashboard__token">
          <span className="lgt-dashboard__token-label">JWT Token</span>
          <code className="lgt-dashboard__token-value">
            {user.token.slice(0, 32)}…
          </code>
        </div>
        <button className="lgt-btn lgt-btn--outline" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};
