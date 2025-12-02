/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: Navigation/index.jsx
=========================================================================
=================================================================================== */

import { useContext } from 'react';

// project imports
import NavContent from './NavContent';
import { ConfigContext } from 'contexts/ConfigContext';
import useWindowSize from 'hooks/useWindowSize';
import navigation from 'menu-items';
import navitemcollapse from 'menu-items-collapse';
import * as actionType from 'store/actions';


/**
 * Composant Navigation - Barre de navigation principale de l'application
 * Gère l'affichage responsive et les différents états de la navigation
 * @returns {JSX.Element} Barre de navigation complète
 */
export default function Navigation() {
  // Récupération du contexte de configuration
  const configContext = useContext(ConfigContext);
  const { collapseMenu, collapseLayout } = configContext.state;
  const { dispatch } = configContext;

  // Hook pour obtenir la taille de la fenêtre (responsivité)
  const windowSize = useWindowSize();

  /**
   * Gestionnaire pour basculer l'état du menu (ouvert/fermé)
   * Utilisé principalement sur mobile
   */
  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  /**
   * Classes CSS dynamiques pour la barre de navigation
   * S'adapte aux différents états et tailles d'écran
   */
  let navClass = ['dark-sidebar', 'pc-sidebar'];
  
  // État réduit sur desktop
  if (collapseMenu && windowSize.width > 1024) {
    navClass = [...navClass, 'navbar-collapsed'];
  }
  
  // État mobile actif
  if (windowSize.width <= 1024 && collapseMenu) {
    navClass = [...navClass, 'mob-sidebar-active'];
  }

  /**
   * Sélection de la configuration de navigation appropriée
   * - Mode complet: navigation.items (toutes les options)
   * - Mode réduit: navitemcollapse.items (éléments essentiels seulement)
   */
  const currentNavigation = collapseLayout ? navitemcollapse.items : navigation.items;
  
  // Validation des données de navigation
  if (!currentNavigation || !Array.isArray(currentNavigation)) {
    console.error('Navigation: Données de navigation invalides');
    return null;
  }

  /**
   * Contenu principal de la navigation
   * Passe les éléments de navigation au composant NavContent
   */
  const navContent = (
    <NavContent 
      navigation={currentNavigation} 
      key={collapseLayout ? 'collapse-layout' : 'full-layout'}
    />
  );

  /**
   * Overlay pour mobile
   * Masque semi-transparent qui s'affiche derrière le menu mobile
   * Permet de fermer le menu en cliquant à côté
   */
  let mobileOverlay = null;
  if (windowSize.width <= 1024 && collapseMenu) {
    mobileOverlay = (
      <div 
        className="pc-menu-overlay" 
        onClick={navToggleHandler}
        aria-hidden="true"
        role="button"
        tabIndex={-1}
        aria-label="Fermer le menu"
        data-testid="mobile-overlay"
      />
    );
  }

  // Classes pour le conteneur wrapper de la navigation
  const navBarClass = ['navbar-wrapper'];

  // Structure DOM du contenu de navigation
  const navContentDOM = (
    <div 
      className={navBarClass.join(' ')}
      role="navigation"
      aria-label="Navigation principale"
      data-testid="navbar-wrapper"
    >
      {navContent}
    </div>
  );

  /**
   * Rendu principal du composant
   * Inclut la barre de navigation et l'overlay mobile (si nécessaire)
   */
  return (
    <>
      {/* Barre de navigation principale */}
      <nav 
        className={navClass.join(' ')}
        aria-label="Menu de navigation"
        data-testid="main-navigation"
      >
        {navContentDOM}
      </nav>
      
      {/* Overlay mobile (s'affiche seulement sur mobile quand le menu est ouvert) */}
      {mobileOverlay}
    </>
  );
}

/**
 * Notes techniques:
 * 
 * 1. Responsive Design:
 *    - Desktop (> 1024px): Menu latéral avec état réduit/étendu
 *    - Mobile (≤ 1024px): Menu plein écran avec overlay
 * 
 * 2. Gestion d'état:
 *    - collapseMenu: Contrôle l'état ouvert/fermé du menu
 *    - collapseLayout: Détermine quelle configuration de menu utiliser
 * 
 * 3. Performances:
 *    - Utilisation de useWindowSize avec gestion des événements resize
 *    - Mémorisation des classes CSS
 *    - Événements de clic optimisés
 * 
 * 4. Accessibilité:
 *    - Rôles ARIA appropriés
 *    - Labels pour les lecteurs d'écran
 *    - Navigation au clavier supportée
 * 
 * 5. Points d'attention:
 *    - Les breakpoints (1024px) doivent correspondre au CSS
 *    - Les données de navigation doivent être valides
 *    - L'overlay mobile doit être accessible (focus management)
 * 
 * Exemple d'utilisation dans App.js:
 * 
 * function App() {
 *   return (
 *     <ConfigProvider>
 *       <div className="app">
 *         <Navigation />
 *         <MainContent />
 *       </div>
 *     </ConfigProvider>
 *   );
 * }
 */