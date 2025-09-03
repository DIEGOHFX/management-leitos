import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TabNavigation from './components/TabNavigation';
import BedsTab from './components/BedsTab';
import ElectiveMapTab from './components/ElectiveMapTab';
import ManagementTab from './components/ManagementTab';
import DischargesTab from './components/DischargesTab';
import HistoryTab from './components/HistoryTab';
import UsersTab from './components/UsersTab';
import LoginModal from './components/LoginModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState('tab-painel');
  const { user, isAuthenticated } = useAuth();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'tab-painel':
        return <BedsTab />;
      case 'tab-mapa-eletivo':
        return <ElectiveMapTab />;
      case 'tab-gestao':
        return <ManagementTab />;
      case 'tab-altas-historico':
        return <DischargesTab />;
      case 'tab-historico':
        return <HistoryTab />;
      case 'tab-usuarios':
        return <UsersTab />;
      default:
        return <BedsTab />;
    }
  };

  if (!isAuthenticated) {
    return <LoginModal />;
  }

  return (
    <div className="container">
      <Header />
      <main>
        <TabNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          userType={user?.tipo}
        />
        <div className="tab-content active">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
