/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: MobileHeader.js
=========================================================================
=================================================================================== */

import { useContext } from 'react';

// third party
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

// project imports
import { ConfigContext } from 'contexts/ConfigContext';
import * as actionType from 'store/actions';

// assets
import logo from 'assets/images/logo.jpg';

/**
 * Composant MobileHeader - En-tête mobile pour les appareils mobiles
 * Ce composant s'affiche uniquement sur les petits écrans et contient:
 * - Le logo de l'application
 * - Un bouton hamburger pour ouvrir/fermer le menu de navigation
 * - Un bouton avec trois points verticaux pour les options supplémentaires de l'en-tête
 */
export default function MobileHeader() {
  // Récupère le contexte de configuration de l'application
  const configContext = useContext(ConfigContext);
  // État indiquant si le menu d'en-tête est ouvert ou fermé
  const { collapseHeaderMenu } = configContext.state;
  // Fonction pour dispatcher des actions (modifier l'état global)
  const { dispatch } = configContext;

  /**
   * Gestionnaire pour basculer l'état du menu de navigation principal
   * Envoie une action pour ouvrir ou fermer le menu latéral
   */
  const navToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_MENU });
  };

  /**
   * Gestionnaire pour basculer l'état du menu d'options de l'en-tête
   * Inverse l'état actuel de collapseHeaderMenu (ouvert/fermé)
   */
  const headerToggleHandler = () => {
    dispatch({ type: actionType.COLLAPSE_HEADERMENU, collapseHeaderMenu: !collapseHeaderMenu });
  };

  return (
    <div className="pc-mob-header pc-header">
      {/* Section logo - Contient le logo de l'application */}
      <div className="pcm-logo">
        <img src={logo} alt="" className="logo logo-lg" />
      </div>
      {/* Section outils - Contient les boutons d'action */}
      <div className="pcm-toolbar">
        {/* Bouton hamburger pour ouvrir/fermer le menu de navigation */}
        <Link to="#" className="pc-head-link" id="mobile-collapse" onClick={navToggleHandler}>
          <div className="hamburger hamburger--arrowturn">
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </div>
        </Link>
        {/* Bouton avec trois points verticaux pour les options d'en-tête */}
        <Link to="#" className="pc-head-link" id="header-collapse" onClick={headerToggleHandler}>
          <FeatherIcon icon="more-vertical" title="more" />
        </Link>
      </div>
    </div>
  );
}