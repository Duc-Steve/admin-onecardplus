/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: NavContent/index.jsx
=========================================================================
=================================================================================== */

import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

// react-bootstrap
import { ListGroup } from 'react-bootstrap';

// project imports
import NavCollapse from './NavCollapse';
import NavItem from './NavItem';
import { ConfigContext } from 'contexts/ConfigContext';

// third party
import SimpleBar from 'simplebar-react';

// assets
import logo from 'assets/images/logo.jpg';


/**
 * Composant NavContent - Gère l'affichage du contenu principal de la navigation
 * Affiche le logo et la liste des éléments de navigation
 * @param {Object} props - Les propriétés du composant
 * @param {Array} props.navigation - Tableau des éléments de navigation à afficher
 */
export default function NavContent({ navigation }) {
  // Récupération du contexte de configuration
  const configContext = useContext(ConfigContext);
  const { collapseLayout } = configContext.state;

  /**
   * Fonction pour générer dynamiquement les éléments de navigation
   * @param {Array} navItems - Tableau d'éléments de navigation
   * @returns {Array} Tableau d'éléments JSX de navigation
   */
  const generateNavItems = (navItems) => {
    return navItems.map((item) => {
      // Vérification de la structure de l'élément
      if (!item || !item.type || !item.id) {
        console.error('Élément de navigation invalide:', item);
        return null;
      }

      // Gestion des différents types d'éléments
      switch (item.type) {
        case 'collapse':
          // Pour les éléments dépliables (avec enfants)
          return (
            <NavCollapse 
              key={`nav-collapse-${item.id}`} 
              collapse={item} 
              type="main" 
            />
          );
        case 'item':
          // Pour les éléments simples (sans enfants)
          return (
            <NavItem 
              key={`nav-item-${item.id}`} 
              item={item} 
            />
          );
        default:
          // Gestion des types non reconnus
          console.warn(`Type d'élément de menu non reconnu: ${item.type}`, item);
          return null;
      }
    }).filter(item => item !== null); // Filtrage des éléments null
  };

  // Générer les éléments de navigation à partir des données reçues
  const navItems = generateNavItems(navigation);

  /**
   * Gestion du contenu de navigation avec défilement pour les grands menus
   * Utilise SimpleBar pour un défilement personnalisé et élégant
   */
  let navContentNode;

  if (collapseLayout) {
    // Version réduite pour le layout collapse (sans défilement)
    navContentNode = (
      <ListGroup 
        variant="flush" 
        as="ul" 
        bsPrefix=" " 
        className="pc-navbar"
      >
        {navItems}
      </ListGroup>
    );
  } else {
    // Version normale avec défilement personnalisé
    navContentNode = (
      <SimpleBar 
        style={{ 
          height: 'calc(100vh - 70px)', // Hauteur calculée pour occuper tout l'espace disponible
          maxHeight: '100%' 
        }}
        autoHide={false} // Désactive la dissimulation automatique de la barre de défilement
      >
        <ListGroup 
          variant="flush" 
          as="ul" 
          bsPrefix=" " 
          className="pc-navbar"
        >
          {navItems}
        </ListGroup>
      </SimpleBar>
    );
  }

  /**
   * En-tête avec le logo de l'application
   * Lié à la page de tableau de bord des ventes
   */
  const mHeader = (
    <div className="m-header">
      <Link 
        to="/dashboard/sales" 
        className="b-brand"
        aria-label="Accueil - Retour au tableau de bord"
      >
        <img 
          src={logo} 
          alt="Logo de l'application" 
          className="logo logo-lg" 
          width={160}
          height="auto"
          loading="lazy" // Optimisation du chargement
        />
      </Link>
    </div>
  );

  /**
   * Contenu principal de la navigation
   * Combine l'en-tête avec logo et la liste de navigation
   */
  const mainContent = (
    <>
      {/* En-tête avec logo */}
      {mHeader}
      
      {/* Contenu de navigation avec défilement */}
      <div 
        className="navbar-content next-scroll"
        role="navigation"
        aria-label="Navigation principale"
      >
        {navContentNode}
      </div>
    </>
  );

  return <>{mainContent}</>;
}

/**
 * Validation des propriétés du composant
 * @property {Array} navigation - Tableau d'objets représentant les éléments de navigation
 * Chaque objet doit contenir au minimum:
 * - id: Identifiant unique
 * - type: Type d'élément ('collapse' ou 'item')
 * - title: Titre à afficher
 */
NavContent.propTypes = { 
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['collapse', 'item']).isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      url: PropTypes.string,
      children: PropTypes.array,
    })
  ).isRequired
};

/**
 * Notes techniques:
 * 1. Utilise SimpleBar pour un défilement personnalisé et cross-browser
 * 2. S'adapte au layout collapse (mode réduit)
 * 3. Gère deux types d'éléments: 'collapse' (avec enfants) et 'item' (simple)
 * 4. Hauteur calculée dynamiquement: 100vh - hauteur de l'en-tête
 * 5. Accessibilité: rôle navigation et label ARIA
 * 6. Optimisation des images: lazy loading pour le logo
 */