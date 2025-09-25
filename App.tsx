import React, { useState, useCallback, useEffect } from 'react';
import { AppView, User, ProfileData } from './types';
import Header from './components/Header';
import AccessScreen from './views/AccessScreen';
import IntensivePortal from './views/intensive/IntensivePortal';
import EadPortal from './views/ead/EadPortal';
import CustomCursor from './components/CustomCursor';
import PublicCvView from './views/PublicCvView';
import { initialProfileData } from './data/profileData';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ACCESS);
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<ProfileData>(initialProfileData);

  const handleLogin = useCallback((type: 'intensive' | 'ead', name?: string) => {
    if (type === 'intensive') {
      // In a real app, you'd fetch user data here. We'll use the default profile name.
      setUser({ name: profileData.name, type: 'intensive' });
      setCurrentView(AppView.INTENSIVE_PORTAL);
    } else {
      setUser({ name: name || 'Visitante EAD', type: 'ead' });
      setCurrentView(AppView.EAD_PORTAL);
    }
  }, [profileData.name]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setCurrentView(AppView.ACCESS);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderCurrentView = () => {
    switch (currentView) {
      case AppView.INTENSIVE_PORTAL:
        return <IntensivePortal onNavigate={setCurrentView} profileData={profileData} setProfileData={setProfileData} />;
      case AppView.EAD_PORTAL:
        return <EadPortal />;
      case AppView.PUBLIC_CV:
        return <PublicCvView onNavigate={setCurrentView} profileData={profileData} setProfileData={setProfileData} />;
      case AppView.ACCESS:
      default:
        return <AccessScreen onLogin={handleLogin} />;
    }
  };

  return (
    <>
      <CustomCursor />
      <Header user={user} onLogout={handleLogout} />
      <main>
        {renderCurrentView()}
      </main>
    </>
  );
};

export default App;