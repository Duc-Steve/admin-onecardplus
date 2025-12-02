/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: NavCollapse.js
=========================================================================
=================================================================================== */

import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// react-bootstrap
import { ListGroup } from 'react-bootstrap';

// third party
import FeatherIcon from 'feather-icons-react';

// project imports
import NavItem from '../NavItem';
import LoopNavCollapse from './index';
import NavIcon from '../NavIcon';
import { ConfigContext } from 'contexts/ConfigContext';
import * as actionType from 'store/actions';
import useWindowSize from 'hooks/useWindowSize';


/**
 * Composant NavCollapse - Gère l'affichage et le comportement des éléments de navigation dépliables
 * @param {Object} props - Les propriétés du composant
 * @param {Object} props.collapse - Configuration de l'élément dépliable
 * @param {string} props.type - Type d'élément ('main' ou 'sub')
 */
export default function NavCollapse({ collapse, type }) {
  // Récupération du contexte de configuration pour la gestion de l'état
  const configContext = useContext(ConfigContext);
  const { dispatch } = configContext;
  
  // Hook personnalisé pour obtenir la taille de la fenêtre
  const windowSize = useWindowSize();
  
  /* eslint-disable @typescript-eslint/no-unused-vars */
  // @ts-ignore - Location non utilisée mais conservée pour référence future
  const location = useLocation();

  // Extraction des états pertinents du contexte
  const { isOpen, isTrigger, collapseLayout } = configContext.state;

  /**
   * Effet pour vérifier si l'élément dépliable doit être ouvert automatiquement
   * basé sur l'URL actuelle
   */
  useEffect(() => {
    // Vérifie si l'ID du collapse est présent dans le chemin de l'URL
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === collapse.id);
    
    // Si trouvé, déclenche l'ouverture du menu
    if (currentIndex > -1) {
      dispatch({ 
        type: actionType.COLLAPSE_TOGGLE, 
        menu: { id: collapse.id, type: type } 
      });
    }
  }, [collapse, dispatch, type]);

  // Génération des éléments enfants du menu dépliable
  let navItems;
  if (collapse.children) {
    const collapses = collapse.children;
    navItems = Object.keys(collapses).map((item) => {
      item = collapses[item];
      
      // Traitement différent selon le type d'élément enfant
      switch (item.type) {
        case 'collapse':
          // Récursion pour les sous-menus dépliables
          return <LoopNavCollapse key={item.id} collapse={item} type="sub" />;
        case 'item':
          // Élément simple de navigation
          return <NavItem key={item.id} item={item} />;
        default:
          return false;
      }
    });
  }

  // Formatage du titre avec icône si présente
  let itemTitle = collapse.title;
  if (collapse.icon) {
    itemTitle = <span className="pc-mtext">{collapse.title}</span>;
  }

  // Classes CSS pour le lien de navigation
  let navLinkClass = ['pc-link'];
  
  // Classes CSS pour l'élément de navigation
  let navItemClass = ['pc-item', 'pc-hasmenu'];
  
  // Vérifie si l'élément est actuellement ouvert
  const openIndex = isOpen.findIndex((id) => id === collapse.id);
  if (openIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
    navLinkClass = [...navLinkClass, 'active'];
  }

  // Vérifie si l'élément est déclenché (hover ou focus)
  const triggerIndex = isTrigger.findIndex((id) => id === collapse.id);
  if (triggerIndex > -1) {
    navItemClass = [...navItemClass, 'pc-trigger'];
  }

  // Vérifie si l'élément correspond à l'URL actuelle
  const currentIndex = document.location.pathname
    .toString()
    .split('/')
    .findIndex((id) => id === collapse.id);
  if (currentIndex > -1) {
    navItemClass = [...navItemClass, 'active'];
    navLinkClass = [...navLinkClass, 'active'];
  }

  /**
   * Contenu du sous-menu dépliable
   * Inclut le lien principal et les éléments enfants
   */
  const subContent = (
    <>
      {/* Lien principal pour déplier/replier */}
      <Link
        to="#"
        className={navLinkClass.join(' ')}
        onClick={() => dispatch({ 
          type: actionType.COLLAPSE_TOGGLE, 
          menu: { id: collapse.id, type } 
        })}
      >
        {/* Icône de l'élément */}
        <NavIcon items={collapse} />
        
        {/* Titre de l'élément */}
        {itemTitle}
        
        {/* Flèche indicateur de dépliable */}
        <span className="pc-arrow">
          <FeatherIcon icon="chevron-right" />
        </span>
      </Link>
      
      {/* Affichage conditionnel des éléments enfants selon le layout et la taille d'écran */}
      {(!collapseLayout || windowSize.width < 992) && (
        <ul className="pc-submenu">{navItems}</ul>
      )}
      
      {collapseLayout && windowSize.width >= 992 && (
        <ListGroup 
          variant="flush" 
          bsPrefix=" " 
          as="ul" 
          className="pc-submenu"
        >
          {navItems}
        </ListGroup>
      )}
    </>
  );

  // Contenu principal de l'élément
  let mainContent;
  mainContent = (
    <ListGroup.Item 
      as="li" 
      bsPrefix=" " 
      className={navItemClass.join(' ')}
    >
      {subContent}
    </ListGroup.Item>
  );

  return <>{mainContent}</>;
}

// Définition des types des propriétés
NavCollapse.propTypes = { 
  collapse: PropTypes.object, // Configuration de l'élément dépliable
  type: PropTypes.string      // Type d'élément ('main' ou 'sub')
};