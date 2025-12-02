/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: NavRight.js
=========================================================================
=================================================================================== */

import { Link } from 'react-router-dom';

// react-bootstrap
import { ListGroup, Dropdown, Form } from 'react-bootstrap';

// third party
import FeatherIcon from 'feather-icons-react';

// assets
import avatar2 from 'assets/images/user/avatar-2.jpg';

/**
 * Composant NavRight - Section droite de la barre de navigation supérieure
 * Contient les éléments suivants:
 * 1. Barre de recherche (occupant l'espace disponible)
 * 2. Menu utilisateur avec avatar et options
 */
export default function NavRight() {
  return (
    <ListGroup as="ul" bsPrefix=" " className="d-flex flex-column-between w-100">
      {/* Barre de recherche - Version étendue sans dropdown */}
      <ListGroup.Item as="li" bsPrefix=" " className="pc-h-item search-container">
        <Form className="search-form">
          <div className="form-group mb-0 d-flex align-items-center w-100">
            {/* Icône de recherche */}
            <div className="searchIconDiv">
              <FeatherIcon icon="search" />
            </div>
            {/* Champ de recherche avec placeholder */}
            <Form.Control 
              type="search" 
              className="border-0 shadow-none search-input" 
              placeholder="Search here. . ." 
              aria-label="Search"
            />
          </div>
        </Form>
      </ListGroup.Item>

      {/* Menu utilisateur avec avatar et options */}
      <ListGroup.Item as="li" bsPrefix=" " className="pc-h-item">
        <Dropdown className="drp-user">
          {/* Bouton du menu utilisateur */}
          <Dropdown.Toggle as="a" variant="link" className="pc-head-link arrow-none me-0 user-name">
            {/* Avatar de l'utilisateur */}
            <img 
              src={avatar2} 
              alt="userimage" 
              className="user-avatar" 
              aria-label="User avatar"
            />
            {/* Informations utilisateur */}
            <span className="user-info">
              {/* Nom de l'utilisateur */}
              <span className="userPlus-name d-none d-lg-block">Joseph William</span>
              {/* Rôle de l'utilisateur */}
              <span className="userPlus-desc d-none d-lg-block">Administrator</span>
            </span>
          </Dropdown.Toggle>

          {/* Menu déroulant des options utilisateur */}
          <Dropdown.Menu className="dropdown-menu-end pc-h-dropdown" style={{borderBottom: '3px solid #000', borderLeft: '3px solid #000', borderRight: '3px solid #000'}}>

            {/* Option: Profil utilisateur */}
            <Link to="/users/user-profile" className="dropdown-item">
              <i className="feather icon-user" /> Profile
            </Link>

            {/* Option: Écran de verrouillage */}
            <Link to="/auth/signin-2" className="dropdown-item">
              <i className="feather icon-lock" /> Lock Screen
            </Link>

            {/* Option: Déconnexion */}
            <Link to="#" className="dropdown-item">
              <i className="material-icons-two-tone">chrome_reader_mode</i> Logout
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </ListGroup.Item>
    </ListGroup>
  );
}