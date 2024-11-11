import React from "react";

const LanguageToggle = ({ language, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
      aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
    >
      <div className="w-8 h-8 relative">
        {language === 'en' ? (
          <img
            src="https://flagcdn.com/w40/fr.png"
            alt="Switch to French"
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <img
            src="https://flagcdn.com/w40/gb.png"
            alt="Switch to English"
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>
    </button>
  );
};

export default LanguageToggle;