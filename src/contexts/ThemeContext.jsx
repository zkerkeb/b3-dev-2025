import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [effectiveTheme, setEffectiveTheme] = useState('light');

  // Fonction pour détecter le thème système
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Mettre à jour le thème effectif basé sur le thème sélectionné
  const updateEffectiveTheme = (selectedTheme) => {
    let newEffectiveTheme;
    
    if (selectedTheme === 'system') {
      newEffectiveTheme = getSystemTheme();
    } else {
      newEffectiveTheme = selectedTheme;
    }
    
    setEffectiveTheme(newEffectiveTheme);
    
    // Appliquer le thème au document
    document.documentElement.setAttribute('data-theme', newEffectiveTheme);
    
    // Stocker dans localStorage
    localStorage.setItem('theme', selectedTheme);
  };

  // Charger le thème depuis localStorage au démarrage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    updateEffectiveTheme(savedTheme);
  }, []);

  // Écouter les changements du thème système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        updateEffectiveTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    updateEffectiveTheme(newTheme);
  };

  const value = {
    theme,
    effectiveTheme,
    changeTheme,
    themes: ['light', 'dark', 'system', 'pink']
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 