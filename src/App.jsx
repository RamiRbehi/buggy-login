import react, { useState } from 'react';
import LoginForm from './components/LoginForm';
import WelcomePage from './components/WelcomePage';
import LanguageToggle from './components/LanguageToggle';
import { translations } from './translations';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [language, setLanguage] = useState('en');

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <LanguageToggle 
        language={language}
        onToggle={toggleLanguage}
      />
      {isLoggedIn ? (
        <WelcomePage 
          username={user} 
          onLogout={handleLogout}
          translations={translations[language]}
        />
      ) : (
        <LoginForm 
          onLogin={handleLogin}
          translations={translations[language]}
        />
      )}
    </div>
  );
}

export default App;