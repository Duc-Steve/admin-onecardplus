/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: NavIcon/index.jsx
=========================================================================
=================================================================================== */

import PropTypes from 'prop-types';

/**
 * Composant NavIcon - Gère l'affichage des icônes dans les éléments de navigation
 * Supporte maintenant Remix Icons en plus des autres bibliothèques d'icônes
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.items - Configuration contenant les informations de l'icône
 */
export default function NavIcon({ items }) {
  // Validation de l'entrée
  if (!items) {
    console.warn('NavIcon: items prop is undefined or null');
    return null;
  }

  let navIcons = null;

  // Vérifie si une icône est fournie dans la configuration
  if (items.icon) {
    // Construction de l'élément icône
    navIcons = (
      <span 
        className="pc-micon"
        aria-hidden="true" // Masqué des lecteurs d'écran
        role="img" // Rôle sémantique pour les icônes
      >
        {/* 
          Support des différents types d'icônes :
          - Remix Icons: icon = 'remixicon', iconname = 'ri-nom-de-l-icone'
          - Material Icons: icon = 'material-icons-two-tone', iconname = 'dashboard'
          - Feather Icons: icon = 'feather feather-icon-name'
        */}
        <i 
          className={`${items.icon === 'remixicon' ? items.iconname : items.icon}`} 
          title={items.title || items.iconname || ''}
        >
          {/* 
            Pour Material Icons, le texte est affiché dans l'élément i
            Pour Remix Icons et autres, le texte est vide car l'icône est via classe CSS
          */}
          {items.icon === 'material-icons-two-tone' ? items.iconname : ''}
        </i>
      </span>
    );
  } else if (items.iconname) {
    // Cas où seul iconname est fourni (pour rétrocompatibilité)
    console.warn('NavIcon: iconname without icon class may not display correctly');
    navIcons = (
      <span className="pc-micon" aria-hidden="true">
        <i 
          className={items.iconname} 
          title={items.title || items.iconname}
        >
          {/* Supposer que c'est un Material Icon si pas de classe spécifiée */}
          {items.iconname}
        </i>
      </span>
    );
  }

  // Retourne l'icône ou null si aucune icône n'est configurée
  return <>{navIcons}</>;
}

/**
 * Validation des propriétés du composant
 * @property {Object} items - Configuration de l'élément contenant l'icône
 * Structure attendue:
 * - icon: Type d'icône ou classe CSS ('remixicon', 'material-icons-two-tone', etc.)
 * - iconname: Nom de l'icône ('ri-dashboard-line' pour Remix, 'dashboard' pour Material)
 * - title: Titre de l'élément (utilisé comme fallback) [optionnel]
 */
NavIcon.propTypes = { 
  items: PropTypes.shape({
    icon: PropTypes.string, // Type ou classe CSS de l'icône
    iconname: PropTypes.string, // Nom de l'icône
    title: PropTypes.string, // Titre de l'élément
  })
};

/**
 * Exemples d'utilisation:
 * 
 * 1. Avec Remix Icons:
 *    <NavIcon items={{ icon: "remixicon", iconname: "ri-dashboard-line", title: "Dashboard" }} />
 * 
 * 2. Avec Material Icons (Two-Tone):
 *    <NavIcon items={{ icon: "material-icons-two-tone", iconname: "dashboard" }} />
 * 
 * 3. Avec Feather Icons:
 *    <NavIcon items={{ icon: "feather feather-home", iconname: "home" }} />
 * 
 * 4. Avec FontAwesome:
 *    <NavIcon items={{ icon: "fas fa-home", iconname: "Accueil" }} />
 * 
 * Notes techniques:
 * 1. Support de Remix Icons: utilise le CDN <link href="https://cdn.jsdelivr.net/npm/remixicon@4.0.0/fonts/remixicon.css" rel="stylesheet"/>
 * 2. Flexible: supporte plusieurs bibliothèques d'icônes
 * 3. Accessibilité: aria-hidden="true" car l'information est dans le texte
 * 4. Rétrocompatible: supporte l'ancien format
 */