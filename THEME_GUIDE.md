# Guide du Système de Thème

Ce projet implémente un système de thème complet avec support pour les thèmes clair, sombre et automatique.

## Fonctionnalités

### Thèmes Disponibles
- **Thème Clair** : Interface claire avec couleurs douces
- **Thème Sombre** : Interface sombre pour une utilisation confortable en basse luminosité
- **Thème Système** : S'adapte automatiquement au thème défini dans les préférences système de l'utilisateur

### Fonctionnalités Avancées
- **Persistance** : Le choix de thème est sauvegardé dans le localStorage
- **Détection automatique** : Le thème système détecte les changements de préférences en temps réel
- **Transitions fluides** : Animations douces lors du changement de thème
- **Variables CSS** : Système basé sur les custom properties CSS pour une personnalisation facile

## Utilisation

### Changer de Thème
Utilisez le composant `ThemeToggle` dans le header de l'application pour basculer entre les thèmes.

### Utiliser le Hook useTheme
```jsx
import { useTheme } from '../contexts/ThemeContext';

function MonComposant() {
  const { theme, effectiveTheme, changeTheme } = useTheme();
  
  return (
    <div>
      <p>Thème actuel: {theme}</p>
      <p>Thème effectif: {effectiveTheme}</p>
      <button onClick={() => changeTheme('dark')}>
        Passer au thème sombre
      </button>
    </div>
  );
}
```

### Variables CSS Disponibles

#### Couleurs de Fond
- `--bg-primary` : Couleur de fond principale
- `--bg-secondary` : Couleur de fond secondaire
- `--bg-tertiary` : Couleur de fond tertiaire
- `--bg-hover` : Couleur de fond au survol

#### Couleurs de Texte
- `--text-primary` : Couleur de texte principale
- `--text-secondary` : Couleur de texte secondaire
- `--text-tertiary` : Couleur de texte tertiaire

#### Couleurs de Bordure
- `--border-color` : Couleur de bordure par défaut
- `--border-hover` : Couleur de bordure au survol

#### Couleurs d'Accent
- `--accent-color` : Couleur d'accent principale
- `--accent-text` : Couleur de texte sur accent
- `--accent-hover` : Couleur d'accent au survol

#### Ombres
- `--shadow-light` : Ombre légère
- `--shadow-medium` : Ombre moyenne
- `--shadow-heavy` : Ombre forte

### Exemple d'Utilisation dans CSS
```css
.mon-composant {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 8px var(--shadow-light);
  transition: all 0.3s ease;
}

.mon-composant:hover {
  background-color: var(--bg-hover);
  border-color: var(--border-hover);
}
```

## Structure du Code

### ThemeContext (`src/contexts/ThemeContext.jsx`)
- Gère l'état global du thème
- Détecte les changements du thème système
- Persiste les préférences dans localStorage

### ThemeToggle (`src/components/ThemeToggle/`)
- Interface utilisateur pour changer de thème
- Boutons avec icônes et labels
- Design responsive

### Variables CSS (`src/index.css`)
- Définition des variables CSS pour chaque thème
- Sélecteurs `[data-theme="light"]` et `[data-theme="dark"]`

## Personnalisation

Pour ajouter de nouvelles couleurs ou modifier les existantes, éditez les variables CSS dans `src/index.css` :

```css
[data-theme="light"] {
  --ma-nouvelle-couleur: #123456;
}

[data-theme="dark"] {
  --ma-nouvelle-couleur: #654321;
}
```

Puis utilisez-la dans vos composants :
```css
.mon-element {
  color: var(--ma-nouvelle-couleur);
}
```

## Composants Mis à Jour

Les composants suivants ont été adaptés pour le système de thème :
- `Layout` : Header, main et footer avec thème
- `PokeCard` : Cartes Pokémon adaptées aux thèmes
- `ThemeToggle` : Sélecteur de thème

## Responsive Design

Le système de thème inclut des breakpoints responsive :
- **Desktop** : Affichage complet avec labels
- **Tablet** (≤768px) : Layout adapté
- **Mobile** (≤480px) : Icônes seulement pour économiser l'espace

## Support Navigateur

Le système de thème est compatible avec tous les navigateurs modernes supportant :
- CSS Custom Properties (variables CSS)
- `prefers-color-scheme` media query
- `matchMedia` API JavaScript 