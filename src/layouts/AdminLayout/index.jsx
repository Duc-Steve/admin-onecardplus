/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: AdminLayout/index.jsx
=========================================================================
=================================================================================== */

import { useContext, useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project imports
import MobileHeader from './MobileHeader';
import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import useWindowSize from 'hooks/useWindowSize';
import { ConfigContext } from 'contexts/ConfigContext';
import * as actionType from 'store/actions';
import Loader from 'components/Loader/Loader';


/**
 * Layout Admin - Structure principale de l'interface d'administration
 * Gère l'organisation des composants et le comportement responsive
 * @returns {JSX.Element} Layout complet de l'administration
 */
export default function AdminLayout() {
  // Récupération de la taille de la fenêtre pour le responsive
  const windowSize = useWindowSize();
  
  // Contexte de configuration pour l'état global
  const configContext = useContext(ConfigContext);
  const { collapseLayout } = configContext.state;
  const { dispatch } = configContext;
  
  // Référence à l'élément body pour les classes CSS globales
  const bodyElement = document.body;

  /**
   * Effet pour gérer le comportement du menu selon la taille de l'écran
   * Ferme automatiquement le menu sur les tailles d'écran intermédiaires
   */
  useEffect(() => {
    // Pour les écrans de taille moyenne (992px à 1024px), ferme le menu
    if (windowSize.width > 992 && windowSize.width <= 1024) {
      dispatch({ type: actionType.COLLAPSE_MENU });
    }
  }, [dispatch, windowSize.width]); // Dépendance sur la largeur seulement

  /**
   * Gestion des classes CSS sur le body
   * Ajoute/retire la classe 'minimenu' selon l'état et la taille d'écran
   */
  useEffect(() => {
    if (windowSize.width > 992 && collapseLayout) {
      bodyElement.classList.add('minimenu');
    } else {
      bodyElement.classList.remove('minimenu');
    }
    
    // Nettoyage: retire la classe quand le composant est démonté
    return () => {
      bodyElement.classList.remove('minimenu');
    };
  }, [windowSize.width, collapseLayout, bodyElement]);

  /**
   * Classes CSS pour le conteneur principal
   * Peut être étendu avec des classes conditionnelles
   */
  let containerClass = ['pc-container'];

  // Ajout de classes responsives si nécessaire
  if (windowSize.width <= 768) {
    containerClass = [...containerClass, 'mobile-view'];
  }

  /**
   * Structure principale du layout d'administration
   * Organise les différents composants d'interface
   */
  const adminLayout = (
    <>
      {/* En-tête mobile (visible seulement sur petits écrans) */}
      <MobileHeader />
      
      {/* Barre de navigation supérieure */}
      <NavBar />
      
      {/* Navigation latérale (sidebar) */}
      <Navigation />
      
      {/* Contenu principal de l'application */}
      <div 
        className={containerClass.join(' ')} 
        role="main"
        aria-label="Contenu principal"
      >
        <div className="pcoded-content">
          <>
            {/* Fil d'Ariane (breadcrumb) pour la navigation */}
            <Breadcrumb />
            
            {/* Contenu dynamique des routes avec chargement asynchrone */}
            <Suspense 
              fallback={
                <div 
                  className="content-loader-wrapper"
                  aria-live="polite"
                  aria-busy="true"
                >
                  <Loader 
                    size="large" 
                    message="Chargement du contenu..." 
                  />
                </div>
              }
            >
              <Outlet /> {/* Point d'injection pour le contenu des routes */}
            </Suspense>
          </>
        </div>
      </div>
    </>
  );

  return <>{adminLayout}</>;
}
