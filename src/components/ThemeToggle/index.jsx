import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './index.css';

const ThemeToggle = () => {
  const { theme, changeTheme, themes } = useTheme();

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'pink':
        return '🌸';
      case 'light':
        return '☀️';
      case 'dark':
        return '🌙';
      case 'system':
        return '💻';
      default:
        return '💻';
    }
  };

  const getThemeLabel = (themeName) => {
    switch (themeName) {
      case 'pink':
        return 'Rose';
      case 'light':
        return 'Clair';
      case 'dark':
        return 'Sombre';
      case 'system':
        return 'Système';
      default:
        return 'Système';
    }
  };

  return (
    <div className="theme-toggle">
      <label className="theme-toggle-label">Thème:</label>
      <div className="theme-options">
        {themes.map((themeName) => (
          <button
            key={themeName}
            className={`theme-option ${theme === themeName ? 'active' : ''}`}
            onClick={() => changeTheme(themeName)}
            title={`Basculer vers le thème ${getThemeLabel(themeName).toLowerCase()}`}
          >
            <span className="theme-icon">{getThemeIcon(themeName)}</span>
            <span className="theme-label">{getThemeLabel(themeName)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle; 