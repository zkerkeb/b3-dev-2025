# Cours : Implémentation d'un Système de Thème Complet en React

## 📚 Objectifs Pédagogiques

À la fin de ce cours, vous serez capable de :
- Comprendre les concepts d'un système de thème moderne
- Implémenter un contexte React pour gérer les thèmes
- Utiliser les CSS Custom Properties (variables CSS)
- Créer des composants theme-aware
- Gérer la persistance des préférences utilisateur
- Implémenter la détection automatique du thème système

---

## 1. 🎯 Introduction aux Concepts

### Qu'est-ce qu'un système de thème ?

Un système de thème permet aux utilisateurs de personnaliser l'apparence d'une application. Les thèmes modernes incluent généralement :

- **Thème Clair** : Interface avec des couleurs claires
- **Thème Sombre** : Interface avec des couleurs sombres
- **Thème Automatique** : S'adapte aux préférences système

### Pourquoi implémenter un système de thème ?

1. **Accessibilité** : Améliore le confort visuel
2. **Préférences utilisateur** : Respecte les choix individuels
3. **Modernité** : Standard dans les applications modernes
4. **Économie d'énergie** : Le thème sombre économise la batterie sur OLED

---

## 2. 🏗️ Architecture du Système

### Vue d'ensemble de l'architecture

```
src/
├── contexts/
│   └── ThemeContext.jsx          # Gestion globale du thème
├── components/
│   ├── ThemeToggle/             # Composant de sélection
│   │   ├── index.jsx
│   │   └── index.css
│   └── Layout/                  # Layout avec thème
│       ├── index.jsx
│       └── index.css
├── index.css                    # Variables CSS globales
└── App.jsx                     # Integration du provider
```

### Flux de données

```
ThemeProvider (Context) 
    ↓
ThemeToggle (UI Component)
    ↓
CSS Variables Update
    ↓
All Components Re-render
```

---

## 3. 💾 Implémentation du Contexte React

### Étape 1 : Création du ThemeContext

```jsx
// src/contexts/ThemeContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

**🔍 Explication :**
- `createContext()` : Crée un contexte React
- `useContext()` : Hook pour consommer le contexte
- Validation d'erreur : Empêche l'utilisation hors provider

### Étape 2 : Logique de détection du thème système

```jsx
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system');
  const [effectiveTheme, setEffectiveTheme] = useState('light');

  // Fonction pour détecter le thème système
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };
```

**🔍 Explication :**
- `window.matchMedia()` : API pour détecter les media queries
- `prefers-color-scheme` : Media query pour les préférences système
- Double état : `theme` (choix utilisateur) vs `effectiveTheme` (thème appliqué)

### Étape 3 : Mise à jour du thème

```jsx
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
```

**🔍 Explication :**
- Logique conditionnelle pour le thème système
- `document.documentElement.setAttribute()` : Applique l'attribut au `<html>`
- `localStorage` : Persistence des préférences utilisateur

### Étape 4 : Effects pour la synchronisation

```jsx
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
```

**🔍 Explication :**
- Premier `useEffect` : Initialisation au montage
- Second `useEffect` : Écoute des changements système en temps réel
- Cleanup function : Supprime les listeners pour éviter les fuites mémoire

---

## 4. 🎨 CSS Custom Properties (Variables CSS)

### Pourquoi utiliser les CSS Custom Properties ?

Les variables CSS permettent :
- Changement dynamique des couleurs
- Centralisation des valeurs
- Performance optimale (pas de re-render CSS)

### Définition des variables pour chaque thème

```css
/* src/index.css */

/* Thème clair (par défaut) */
:root,
[data-theme="light"] {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --bg-hover: #f1f3f4;
  
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-tertiary: #adb5bd;
  
  --border-color: #dee2e6;
  --border-hover: #adb5bd;
  
  --accent-color: #0d6efd;
  --accent-text: #ffffff;
  --accent-hover: #0b5ed7;
  
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.15);
  --shadow-heavy: rgba(0, 0, 0, 0.3);
  
  color-scheme: light;
}

/* Thème sombre */
[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3a3a3a;
  --bg-hover: #404040;
  
  --text-primary: #ffffff;
  --text-secondary: #b3b3b3;
  --text-tertiary: #808080;
  
  --border-color: #404040;
  --border-hover: #606060;
  
  --accent-color: #4dabf7;
  --accent-text: #1a1a1a;
  --accent-hover: #339af0;
  
  --shadow-light: rgba(0, 0, 0, 0.3);
  --shadow-medium: rgba(0, 0, 0, 0.5);
  --shadow-heavy: rgba(0, 0, 0, 0.8);
  
  color-scheme: dark;
}
```

**🔍 Explication :**
- Sélecteur `[data-theme="dark"]` : Cible l'attribut HTML
- `color-scheme` : Indique au navigateur le type de thème
- Convention de nommage cohérente : `--type-variant`

### Application des variables

```css
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  transition: background-color 0.3s ease, color 0.3s ease;
}

button {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: all 0.25s ease;
}

button:hover {
  background-color: var(--bg-hover);
  border-color: var(--border-hover);
}
```

**🔍 Explication :**
- `var()` : Fonction CSS pour utiliser les variables
- `transition` : Animations fluides lors du changement
- Fallback possible : `var(--color, #fallback)`

---

## 5. 🎛️ Composant ThemeToggle

### Structure du composant

```jsx
// src/components/ThemeToggle/index.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import './index.css';

const ThemeToggle = () => {
  const { theme, changeTheme, themes } = useTheme();

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'system': return '💻';
      default: return '💻';
    }
  };

  const getThemeLabel = (themeName) => {
    switch (themeName) {
      case 'light': return 'Clair';
      case 'dark': return 'Sombre';
      case 'system': return 'Système';
      default: return 'Système';
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
```

**🔍 Points clés :**
- Utilisation du hook `useTheme()`
- Fonction helper pour les icônes et labels
- Mapping dynamique des options
- Gestion de l'état actif
- Accessibilité avec `title`

### Styles CSS du ThemeToggle

```css
/* src/components/ThemeToggle/index.css */
.theme-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-primary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  color: var(--text-secondary);
}

.theme-option:hover {
  background-color: var(--bg-hover);
  border-color: var(--border-hover);
  transform: translateY(-1px);
}

.theme-option.active {
  background-color: var(--accent-color);
  border-color: var(--accent-color);
  color: var(--accent-text);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```

**🔍 Design patterns :**
- Utilisation systématique des variables CSS
- États visuels distincts (normal, hover, active)
- Micro-animations avec `transform`
- Cohérence avec le design system

---

## 6. 🏠 Adaptation du Layout

### Mise à jour du composant Layout

```jsx
// src/components/Layout/index.jsx
import { Outlet, Navigate } from "react-router";
import { useNavigate } from "react-router";
import ThemeToggle from "../ThemeToggle";
import './index.css';

function Layout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="app-title">PokeDex</h1>
          <div className="header-controls">
            <ThemeToggle />
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="layout-main">
        <Outlet />
      </main>
      <footer className="layout-footer">
        <p>&copy; 2024 PokeDex - Tous droits réservés</p>
      </footer>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}
```

**🔍 Améliorations :**
- Import du `ThemeToggle`
- Structure sémantique HTML5
- Classes CSS descriptives
- Positionnement logique du toggle

---

## 7. 🃏 Adaptation des Composants Existants

### Exemple : PokeCard theme-aware

```jsx
// Avant (couleurs hardcodées)
<div className="poke-card-base">
  <span>HP: {base?.HP || 0}</span>
  <span>Attack: {base?.Attack || 0}</span>
</div>
```

```jsx
// Après (utilisation de variables CSS)
<div className="poke-card-base">
  <span>HP: <strong>{base?.HP || 0}</strong></span>
  <span>Attack: <strong>{base?.Attack || 0}</strong></span>
</div>
```

```css
/* CSS correspondant */
.poke-card-base {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: 12px;
  border-radius: 10px;
}

.poke-card-base span strong {
  color: var(--accent-color);
  font-weight: 600;
}
```

**🔍 Principe :**
- Remplacer les couleurs fixes par des variables
- Maintenir la hiérarchie visuelle
- Préserver l'identité des types Pokémon

---

## 8. 🔧 Integration dans l'App

### Étape 1 : Wrapper avec le Provider

```jsx
// src/App.jsx
import { RouterProvider } from "react-router";
import { ThemeProvider } from "./contexts/ThemeContext";
import router from "./config/router";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
```

**🔍 Important :**
- Le `ThemeProvider` doit wrapper toute l'application
- Placé au plus haut niveau pour être accessible partout

### Étape 2 : Utilisation dans les composants

```jsx
// Dans n'importe quel composant
import { useTheme } from '../contexts/ThemeContext';

function MonComposant() {
  const { theme, effectiveTheme, changeTheme } = useTheme();
  
  return (
    <div>
      <p>Thème sélectionné: {theme}</p>
      <p>Thème appliqué: {effectiveTheme}</p>
      <button onClick={() => changeTheme('dark')}>
        Mode sombre
      </button>
    </div>
  );
}
```

---

## 9. 📱 Responsive Design

### Adaptation mobile du ThemeToggle

```css
/* Desktop : affichage complet */
.theme-option {
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Tablet : layout vertical */
@media (max-width: 768px) {
  .theme-toggle {
    flex-direction: column;
    gap: 8px;
  }
  
  .theme-options {
    width: 100%;
    justify-content: space-between;
  }
}

/* Mobile : icônes seulement */
@media (max-width: 480px) {
  .theme-option .theme-label {
    display: none;
  }
  
  .theme-option {
    width: 40px;
    height: 40px;
    justify-content: center;
  }
}
```

**🔍 Stratégie mobile :**
- Progressive disclosure : moins d'infos sur petit écran
- Touch-friendly : boutons plus grands
- Économie d'espace : icônes sans texte

---

## 10. 🧪 Tests et Debugging

### Tests à effectuer

1. **Changement de thème manuel**
   ```javascript
   // Dans la console navigateur
   document.documentElement.setAttribute('data-theme', 'dark');
   ```

2. **Simulation changement système**
   ```javascript
   // DevTools > Rendering > Emulate CSS prefers-color-scheme
   ```

3. **Test de persistance**
   ```javascript
   // Vérifier localStorage
   localStorage.getItem('theme');
   ```

### Debugging courant

```javascript
// Debug du contexte
console.log('Theme context:', {
  theme,
  effectiveTheme,
  systemTheme: window.matchMedia('(prefers-color-scheme: dark)').matches
});

// Debug des variables CSS
const computedStyle = getComputedStyle(document.documentElement);
console.log('CSS Variables:', {
  bgPrimary: computedStyle.getPropertyValue('--bg-primary'),
  textPrimary: computedStyle.getPropertyValue('--text-primary')
});
```

---

## 11. 🚀 Bonnes Pratiques

### Performance

1. **Utiliser CSS Variables** plutôt que du re-render React
2. **Transitions** pour des changements fluides
3. **Lazy loading** des thèmes si nombreux

### Accessibilité

1. **`color-scheme`** pour informer le navigateur
2. **Contraste suffisant** dans tous les thèmes
3. **Labels explicites** sur les contrôles

### UX

1. **Feedback visuel** immédiat
2. **Persistance** des préférences
3. **Détection système** par défaut

### Maintenance

1. **Variables CSS centralisées**
2. **Convention de nommage** cohérente
3. **Documentation** des couleurs

---

## 12. 🏋️ Exercices Pratiques

### Exercice 1 : Ajouter un nouveau thème
Créez un thème "High Contrast" pour l'accessibilité :

```css
[data-theme="high-contrast"] {
  --bg-primary: #000000;
  --text-primary: #ffffff;
  --accent-color: #ffff00;
  /* ... autres variables */
}
```

### Exercice 2 : Theme toggle compact
Créez une version compacte du ThemeToggle avec un seul bouton cyclique :

```jsx
const CompactThemeToggle = () => {
  const { theme, changeTheme, themes } = useTheme();
  
  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex]);
  };
  
  return (
    <button onClick={cycleTheme}>
      {getThemeIcon(theme)}
    </button>
  );
};
```

### Exercice 3 : Thème personnalisé
Permettez aux utilisateurs de créer leur propre thème :

```jsx
const CustomThemeCreator = () => {
  const [customColors, setCustomColors] = useState({
    primary: '#ff6b6b',
    secondary: '#4ecdc4'
  });
  
  const applyCustomTheme = () => {
    document.documentElement.style.setProperty('--bg-primary', customColors.primary);
    document.documentElement.style.setProperty('--accent-color', customColors.secondary);
  };
  
  // Interface pour modifier les couleurs...
};
```

---

## 13. 📖 Ressources Complémentaires

### Documentation officielle
- [CSS Custom Properties - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [prefers-color-scheme - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- [React Context - React Docs](https://react.dev/reference/react/useContext)

### Outils utiles
- [Coolors.co](https://coolors.co/) : Génération de palettes
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) : Vérification contraste
- [CSS Variables Preview](https://marketplace.visualstudio.com/items?itemName=phoenisx.cssvar) : Extension VSCode

### Exemples en production
- GitHub (theme system)
- Discord (appearance settings)
- Twitter/X (display settings)

---

## 14. 🎯 Résumé et Points Clés

### Architecture résumée

```
Context (State Management)
    ↓
CSS Variables (Styling)
    ↓
Component Integration (UI)
    ↓
User Experience (UX)
```

### Points essentiels à retenir

1. **Contexte React** : Gestion d'état global propre
2. **CSS Variables** : Performance et flexibilité
3. **Persistance** : localStorage pour l'UX
4. **Détection système** : Respect des préférences utilisateur
5. **Responsive** : Adaptation multi-device
6. **Accessibilité** : Contraste et sémantique

### Checklist finale

- [ ] ThemeContext implémenté
- [ ] Variables CSS définies pour tous les thèmes
- [ ] ThemeToggle fonctionnel
- [ ] Persistance localStorage
- [ ] Détection système automatique
- [ ] Composants adaptés aux variables
- [ ] Design responsive
- [ ] Tests effectués
- [ ] Documentation à jour

---

**🎓 Félicitations !** Vous maîtrisez maintenant l'implémentation complète d'un système de thème moderne en React. Cette base solide vous permettra d'adapter et d'étendre le système selon vos besoins spécifiques. 