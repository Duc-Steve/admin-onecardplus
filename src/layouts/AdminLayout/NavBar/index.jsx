/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: AdminLayout/NavBar/index.jsx
=========================================================================
=================================================================================== */

import { useContext } from 'react';

// project imports
import NavRight from './NavRight';
import { ConfigContext } from 'contexts/ConfigContext';

/**
 * Composant NavBar - Barre de navigation supérieure principale
 * Ce composant contient la barre d'en-tête supérieure avec:
 * - Les éléments de navigation à droite (composant NavRight)
 * - Gestion des classes CSS dynamiques pour l'apparence
 * - Overlay pour les menus mobiles lorsqu'ils sont ouverts
 */
export default function NavBar() {
  // Récupère le contexte de configuration de l'application
  const configContext = useContext(ConfigContext);
  // Récupère les états nécessaires depuis le contexte
  const { headerBackColor, collapseTabMenu, collapseHeaderMenu } = configContext.state;

  // Classes CSS dynamiques pour l'en-tête principal
  // La couleur de fond est déterminée par headerBackColor
  let headerClass = ['pc-header', headerBackColor];
  // Ajoute la classe 'mob-header-active' si le menu d'en-tête mobile est ouvert
  if (collapseHeaderMenu) {
    headerClass = [...headerClass, 'mob-header-active'];
  }

  // Classes CSS pour le menu déroulant mobile
  // 'me-auto' pour la marge automatique à droite, 'pc-mob-drp' pour le style
  let mobDrpClass = ['me-auto pc-mob-drp t'];
  // Ajoute la classe 'mob-drp-active' si le menu tab est ouvert
  if (collapseTabMenu) {
    mobDrpClass = [...mobDrpClass, 'mob-drp-active'];
  }

  /**
   * Contenu principal de la barre de navigation
   * Contient:
   * - Le wrapper principal avec les éléments de navigation à droite
   * - Un overlay semi-transparent qui s'affiche quand les menus mobiles sont ouverts
   */
  let navBar = (
    <>
      {/* Conteneur principal de l'en-tête */}
      <div className="header-wrapper">
        {/* Conteneur pour les éléments de navigation à droite */}
        <div className="ms-auto">
          {/* Composant NavRight qui contient les éléments de navigation à droite */}
          <NavRight />
        </div>
      </div>
      
      {/* Overlay semi-transparent pour les versions mobiles */}
      {/* S'affiche quand soit collapseTabMenu soit collapseHeaderMenu est vrai */}
      {(collapseTabMenu || collapseHeaderMenu) && <div className="pc-md-overlay" />}
    </>
  );

  // Retourne l'élément header avec les classes dynamiques et le contenu de la barre de navigation
  return <header className={headerClass.join(' ')}>{navBar}</header>;
}