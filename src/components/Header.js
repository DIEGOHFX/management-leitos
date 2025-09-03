import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  useTheme();
  useAuth();

  // Mock bed summary data - in real app this would come from API
  const bedSummary = {
    total: 0,
    available: 0,
    occupied: 0,
    disabled: 0,
    maintenance: 0,
    cleaning: 0,
    reserved: 0,
    isolation: 0
  };

  return (
    <header>
      <div className="header-title">
        <h1>
          <svg fill="none" height="36" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="36">
            <rect height="7" width="7" x="3" y="3"></rect>
            <rect height="7" width="7" x="14" y="3"></rect>
            <rect height="7" width="7" x="14" y="14"></rect>
            <rect height="7" width="7" x="3" y="14"></rect>
          </svg>
          Gestão de Leitos
        </h1>

        <div className="bed-summary-card bed-total">
          <div className="bed-summary-icon">Σ</div>
          <div className="bed-summary-info">
            <span className="bed-summary-number">{bedSummary.total}</span>
            <span className="bed-summary-label">Total</span>
          </div>
        </div>

        <div className="bed-summary-card bed-available">
          <div className="bed-summary-icon">✔</div>
          <div className="bed-summary-info">
            <span className="bed-summary-number">{bedSummary.available}</span>
            <span className="bed-summary-label">Disponíveis</span>
          </div>
        </div>

        <div className="bed-summary-card bed-occupied">
          <div className="bed-summary-icon">🚫</div>
          <div className="bed-summary-info">
            <span className="bed-summary-number">{bedSummary.occupied}</span>
            <span className="bed-summary-label">Ocupados</span>
          </div>
        </div>

        <div className="bed-summary-card bed-disabled">
          <div className="bed-summary-icon">X</div>
          <div className="bed-summary-info">
            <span className="bed-summary-number">{bedSummary.disabled}</span>
            <span className="bed-summary-label">Desativados</span>
          </div>
        </div>

        <div className="bed-summary-card bed-maintenance">
          <div className="bed-summary-icon">🔧</div>
          <div className="bed-summary-info">
            <span className="bed-summary-number">{bedSummary.maintenance}</span>
            <span className="bed-summary-label">Manutenção</span>
          </div>
        </div>

        <div className="bed-summary-card bed-cleaning">
          <div className="bed-summary-icon">🧹</div>
          <div className="bed-summary-info">
            <span className="bed-summary-number">{bedSummary.cleaning}</span>
            <span className="bed-summary-label">Higienização</span>
          </div>
        </div>

        <div className="bed-summary-card bed-reserved">
          <div className="bed-summary-icon">🔒</div>
          <div className="bed-summary-info">
            <span className="bed-summary-number">{bedSummary.reserved}</span>
            <span className="bed-summary-label">Reservados</span>
          </div>
        </div>

        <div className="bed-summary-card bed-isolation">
          <div className="bed-summary-icon">😷</div>
          <div className="bed-summary-info">
            <span className="bed-summary-number">{bedSummary.isolation}</span>
            <span className="bed-summary-label">Isolamento</span>
          </div>
        </div>
      </div>
      <div className="main-actions"></div>
    </header>
  );
};

export default Header;
