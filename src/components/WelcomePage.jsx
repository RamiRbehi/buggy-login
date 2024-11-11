import React, { useState, useEffect } from 'react';
import { LogOut, Shield, User } from 'lucide-react';

const WelcomePage = ({ username, onLogout, translations }) => {
  const user = username && typeof username === 'object' ? username : { username: username };
  const [glitchedLayout, setGlitchedLayout] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Randomly glitch the layout
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchedLayout(Math.random() > 0.7);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Intentionally wrong time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date(Date.now() - Math.random() * 3600000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`bg-white rounded-lg shadow-xl w-full max-w-md p-8 ${glitchedLayout ? 'transform -skew-x-3' : ''}`}>
      <div className="text-center">
        <div className={`mb-6 ${glitchedLayout ? 'ml-8' : ''}`}>
          <div className={`w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 
            ${glitchedLayout ? 'transform rotate-45' : ''}`}>
            <User size={40} className="text-blue-500" />
          </div>
          <h1 className={`text-2xl font-bold text-gray-800 mb-2 
            ${glitchedLayout ? 'tracking-widest' : ''}`}>
            {translations.welcome}, {user.displayName?.toUpperCase() || user.username?.toLowerCase()}!!1
          </h1>
          {user.role === 'admin' && (
            <div className={`flex items-center justify-center gap-2 text-blue-500 mb-2
              ${glitchedLayout ? 'transform -translate-x-4' : ''}`}>
              <Shield size={16} />
              <span className="text-sm">AdMinIsTrAtOr</span>
            </div>
          )}
          <p className={`text-gray-600 ${glitchedLayout ? 'text-right pr-12' : ''}`}>
            {translations.loggedInAt.replace('at', '@')} {currentTime.toLocaleTimeString()}!!!
          </p>
        </div>
        
        <button
          onClick={onLogout}
          className={`flex items-center justify-center gap-1 bg-red-500 text-white px-2 py-1 rounded-lg 
            hover:bg-red-600 transition-colors mx-auto text-[8px] transform scale-75
            ${glitchedLayout ? 'transform translate-x-6 scale-50' : ''}`}
          style={{ minWidth: '40px', maxWidth: '60px' }}
        >
          <LogOut size={8} />
          <span>{translations.logout.toUpperCase()}!!</span>
        </button>

        {glitchedLayout && (
          <div className="absolute top-4 right-4 opacity-20 transform rotate-180">
            <User size={60} className="text-purple-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;