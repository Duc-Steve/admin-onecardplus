/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: NavItem/index.jsx
=========================================================================
=================================================================================== */

import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

// react-bootstrap
import { ListGroup } from 'react-bootstrap';

// third party
import FeatherIcon from 'feather-icons-react';

// project imports
import NavIcon from '../NavIcon';
import { ConfigContext } from 'contexts/ConfigContext';
import * as actionType from 'store/actions';
import useWindowSize from 'hooks/useWindowSize';


/**
 * Composant NavItem - Représente un élément individuel de navigation
 * Gère les liens internes et externes avec différents états d'affichage
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.item - Configuration de l'élément de navigation
 */
export default function NavItem({ item }) {
  // Hook pour obtenir la taille de la fenêtre (responsive design)
  const windowSize = useWindowSize();
  
  // Récupération du contexte de configuration
  const configContext = useContext(ConfigContext);
  const { dispatch } = configContext;
  
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // @ts-ignore - Location non utilisée mais conservée pour compatibilité future
  const location = useLocation();

  // Vérification de la validité de l'item
  if (!item || !item.id || !item.title) {
    console.error('Item de navigation invalide:', item);
    return null;
  }

  /**
   * Formatage du titre de l'élément
   * Ajoute une flèche si l'élément est de type 'collapse'
   */
  let itemTitle = item.title;
  if (item.icon) {
    itemTitle = (
      <>
        {/* Texte principal avec classe spécifique pour le style */}
        <span className="pc-mtext">{item.title}</span>
        {item.type === 'collapse' && (
          <span 
            className="pc-arrow" 
            aria-hidden="true"
          >
            <FeatherIcon 
              icon="chevron-right" 
              size="16" 
            />
          </span>
        )}
      </>
    );
  }

  /**
   * Gestion de la cible pour les liens
   * Par défaut: même fenêtre, sinon nouvelle fenêtre
   */
  let itemTarget = '';
  if (item.target) {
    itemTarget = '_blank';
  }

  /**
   * Classes CSS pour l'élément de navigation
   * Détermine si l'élément est actif basé sur l'URL courante
   */
  let navItemClass = ['pc-item'];
  const currentIndex = document.location.pathname
    .toString()
    .split('/')
    .findIndex((id) => id === item.id);
  
  // Ajoute la classe 'active' si l'élément correspond à l'URL actuelle
  if (currentIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
  }

  // Classes CSS pour le lien de navigation
  const navLinkClass = ['pc-link'];

  /**
   * Contenu du sous-élément (le lien lui-même)
   * Différencie les liens externes des liens internes
   */
  let subContent;
  
  if (item.external) {
    // Pour les liens externes (vers d'autres sites)
    subContent = (
      <Link 
        to={item.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className={navLinkClass.join(' ')}
        aria-label={`${item.title} (ouvre dans un nouvel onglet)`}
      >
        <NavIcon items={item} />
        {itemTitle}
      </Link>
    );
  } else {
    // Pour les liens internes (application React Router)
    subContent = (
      <NavLink 
        to={item.url || '#'} 
        className={({ isActive }) => 
          [...navLinkClass, isActive ? 'active' : ''].join(' ')
        }
        end={item.exact} // Utilise "end" pour les correspondances exactes
        aria-current={currentIndex > -1 ? 'page' : undefined}
      >
        <NavIcon items={item} />
        {itemTitle}
      </NavLink>
    );
  }

  /**
   * Contenu principal de l'élément
   * Différencie le comportement mobile et desktop
   */
  let mainContent;
  
  // Comportement pour les écrans mobiles (largeur < 992px)
  if (windowSize.width < 992) {
    mainContent = (
      <ListGroup.Item 
        as="li" 
        bsPrefix=" " 
        className={navItemClass.join(' ')} 
        onClick={() => dispatch({ type: actionType.COLLAPSE_MENU })}
        role="menuitem"
      >
        {subContent}
      </ListGroup.Item>
    );
  } else {
    // Comportement pour les écrans desktop
    mainContent = (
      <ListGroup.Item 
        as="li" 
        bsPrefix=" " 
        className={navItemClass.join(' ')}
        role="menuitem"
      >
        {subContent}
      </ListGroup.Item>
    );
  }

  return <>{mainContent}</>;
}

/**
 * Validation des propriétés du composant
 * @property {Object} item - Configuration de l'élément de navigation
 * Doit contenir au minimum:
 * - id: Identifiant unique (string)
 * - title: Titre à afficher (string)
 * - url: URL de destination (string, optionnel)
 * - icon: Nom de l'icône (string, optionnel)
 * - type: Type d'élément ('item' ou 'collapse', optionnel)
 * - external: Boolean indiquant un lien externe (optionnel)
 * - target: Boolean pour ouvrir dans un nouvel onglet (optionnel)
 */
NavItem.propTypes = { 
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.oneOf(['item', 'collapse']),
    external: PropTypes.bool,
    target: PropTypes.bool,
    exact: PropTypes.bool,
  }).isRequired
};

/**
 * Notes techniques:
 * 1. Responsive design: comportement différent sur mobile/desktop
 * 2. Accessibilité: rôles ARIA et attributs d'accessibilité
 * 3. Sécurité: rel="noopener noreferrer" pour les liens externes
 * 4. Gestion des états actifs via React Router NavLink
 * 5. Intégration avec le système de navigation globale
 * 6. Support des icônes Feather Icons
 */