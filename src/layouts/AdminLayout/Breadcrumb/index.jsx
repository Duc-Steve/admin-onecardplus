/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: Breadcrumb.js
=========================================================================
=================================================================================== */

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// react-bootstrap
import { ListGroup, Row, Col, Button, Dropdown } from 'react-bootstrap';

// third party
import { Link, useLocation } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

// project imports
import navigation from 'menu-items';
import { BASE_TITLE } from 'config/constant';


/**
 * Composant Breadcrumb - Affiche le fil d'Ariane et le titre de la page
 * Permet aux utilisateurs de comprendre leur position dans l'application
 * @returns {JSX.Element} Fil d'Ariane et titre de page
 */
export default function Breadcrumb() {
  const [parent, setParent] = useState(null);
  const [item, setItem] = useState(null);
  const location = useLocation();

  /**
   * Fonction pour trouver l'élément de navigation actif
   * Parcourt l'arborescence des éléments de menu
   */
  const findActiveItem = useCallback(() => {
    const currentPath = location.pathname;
    let foundParent = null;
    let foundItem = null;

    // Fonction pour parcourir les éléments enfants
    const searchInItems = (items, parentItem = null) => {
      for (const navItem of items) {
        // Si c'est un élément simple
        if (navItem.type === 'item') {
          const itemPath = navItem.url || '';
          // Vérification de correspondance avec l'URL actuelle
          if (currentPath === itemPath || 
              (navItem.exact !== false && currentPath.startsWith(itemPath))) {
            foundParent = parentItem;
            foundItem = navItem;
            return true;
          }
        }
        // Si c'est un collapse, chercher dans les enfants
        else if (navItem.type === 'collapse' && navItem.children) {
          // D'abord vérifier si le collapse lui-même est la page active
          if (navItem.url && (currentPath === navItem.url || currentPath.startsWith(navItem.url))) {
            foundParent = null;
            foundItem = navItem;
            return true;
          }
          // Sinon chercher dans les enfants
          if (searchInItems(navItem.children, navItem)) {
            return true;
          }
        }
      }
      return false;
    };

    // Rechercher dans tous les items de navigation
    searchInItems(navigation.items);
    
    setParent(foundParent);
    setItem(foundItem);
  }, [location.pathname]);

  /**
   * Effet pour déterminer le chemin actuel à chaque changement de location
   */
  useEffect(() => {
    findActiveItem();
  }, [findActiveItem]);

  /**
   * Mise à jour du titre du document
   */
  useEffect(() => {
    if (item && item.title) {
      document.title = `${item.title} ${BASE_TITLE}`;
    }
  }, [item]);

  /**
   * Génération du contenu du fil d'Ariane
   */
  const { breadcrumbContent, title } = useMemo(() => {
    let breadcrumbContent = null;
    let title = '';

    if (item && item.title) {
      title = item.title;

      // Affichage conditionnel du breadcrumb (désactivable via breadcrumbs: false)
      if (item.breadcrumbs !== false) {
        breadcrumbContent = (
          <div 
            className="page-header" 
            role="navigation" 
            aria-label="Fil d'Ariane"
            style={{borderBottom: '3px solid #000000', boxShadow: '0 0 3px #000000'}}
          >
            <div className="page-block">
              <Row className="align-items-center">
                {/* Section gauche: Titre et breadcrumb */}
                <Col md={8}>
                  <div className="page-header-title">
                    <h1 className="m-b-10" id="page-title">
                      {title}
                    </h1>
                  </div>
                  <ListGroup 
                    as="ul" 
                    bsPrefix=" " 
                    className="breadcrumb"
                    aria-label="Chemin de navigation"
                  >
                    {/* Lien Accueil */}
                    <ListGroup.Item 
                      as="li" 
                      bsPrefix=" " 
                      className="breadcrumb-item"
                    >
                      <Link 
                        to="/" 
                        aria-label="Retour à l'accueil"
                      >
                        <FeatherIcon icon="home" size="16" />
                        <span className="visually-hidden">Accueil</span>
                      </Link>
                    </ListGroup.Item>
                    
                    {/* Élément parent (si existant) */}
                    {parent && (
                      <ListGroup.Item 
                        as="li" 
                        bsPrefix=" " 
                        className="breadcrumb-item"
                        aria-current="false"
                      >
                        <Link to="#" aria-label={`Section: ${parent.title}`}>
                          {parent.title}
                        </Link>
                      </ListGroup.Item>
                    )}
                    
                    {/* Élément courant */}
                    <ListGroup.Item 
                      as="li" 
                      bsPrefix=" " 
                      className="breadcrumb-item active"
                      aria-current="page"
                    >
                      <Link to="#" aria-label={`Page actuelle: ${title}`}>
                        {title}
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>

                {/* Section droite: Boutons d'action (conditionnel) */}
                {/* Vous pouvez ajouter des boutons conditionnels ici */}
                {parent && parent.title === 'Utilisateurs' && (
                  <Col md={4} className="text-md-end action_button">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="rounded-pill"
                      aria-label="Ajouter un utilisateur"
                    >
                      <FeatherIcon icon="plus" size="14" />
                      Ajouter
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        );
      }
    }

    return { breadcrumbContent, title };
  }, [parent, item]);

  return <>{breadcrumbContent}</>;
}
