import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const TabNavigation = ({ activeTab, setActiveTab, userType }) => {
  const { toggleTheme, isDark } = useTheme();
  const { logout } = useAuth();

  const tabs = [
    { id: 'tab-painel', label: 'Leitos', visible: true },
    { id: 'tab-mapa-eletivo', label: 'Mapa Eletivo', visible: true },
    { id: 'tab-gestao', label: 'Gerenciamento', visible: true },
    { id: 'tab-altas-historico', label: 'Altas', visible: true },
    { id: 'tab-historico', label: 'Histórico', visible: true },
    { id: 'tab-usuarios', label: 'Usuários', visible: userType === 'MASTER' || userType === 'ADMIN' }
  ];

  return (
    <div className="tabs" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', position: 'relative' }}>
      {tabs.map(tab => (
        tab.visible && (
          <button
            key={tab.id}
            className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        )
      ))}
      
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div className="theme-switcher" style={{ marginRight: '10px' }}>
          <input 
            className="sr-only" 
            id="theme-toggle" 
            type="checkbox" 
            checked={!isDark}
            onChange={toggleTheme}
          />
          <label className="toggle-label" htmlFor="theme-toggle">
            <svg className="sun-icon" fill="currentColor" viewBox="0 0 20 20">
              <path clipRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 5.05A1 1 0 116.465 3.636l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zM5 11a1 1 0 100-2H4a1 1 0 100 2h1z" fillRule="evenodd"></path>
            </svg>
            <span className="ball"></span>
          </label>
        </div>
        
        <button 
          className="btn btn-danger" 
          onClick={logout}
          style={{ padding: '8px 16px', fontSize: '0.9rem' }}
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: '6px' }}>
            <path d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
            <path d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
          </svg>
          Sair
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
