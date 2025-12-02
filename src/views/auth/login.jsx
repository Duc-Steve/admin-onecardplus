/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: SignIn1.js
=========================================================================
=================================================================================== */

import { NavLink } from 'react-router-dom';

// react-bootstrap
import { Card, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';

// third party
import FeatherIcon from 'feather-icons-react';

// assets
import logo from 'assets/images/logo.jpg';

/**
 * Composant SignIn1 - Page de connexion/authentification
 * Ce composant représente la page de connexion avec:
 * - Formulaire d'authentification (email et mot de passe)
 * - Options "Se souvenir de moi", "Mot de passe oublié" et "Créer un compte"
 * - Logo de l'application
 * - Design responsive et centré
 */
export default function SignIn1() {
  return (
    <div className="auth-wrapper">
      <div className="auth-content text-center">
        <Card className="borderless">
          <Row className="align-items-center text-center">
              <Card.Body className="authBody">
                {/* Logo de l'application */}
                <img 
                  src={logo} 
                  alt="Logo de l'application" 
                  className="img-fluid mb-4" 
                />
                
                {/* Titre de la page de connexion */}
                <h4 className="mb-3 f-w-400">Connexion</h4>
                
                {/* Champ de saisie pour l'adresse email */}
                <InputGroup className="mb-3">
                  <InputGroup.Text aria-label="Icône email">
                    <FeatherIcon icon="mail" />
                  </InputGroup.Text>
                  <Form.Control 
                    type="email" 
                    placeholder="Adresse email" 
                    aria-label="Adresse email"
                  />
                </InputGroup>
                
                {/* Champ de saisie pour le mot de passe */}
                <InputGroup className="mb-3">
                  <InputGroup.Text aria-label="Icône mot de passe">
                    <FeatherIcon icon="lock" />
                  </InputGroup.Text>
                  <Form.Control 
                    type="password" 
                    placeholder="Mot de passe" 
                    aria-label="Mot de passe"
                  />
                </InputGroup>
                
                {/* Case à cocher "Se souvenir de moi" */}
                <Form.Group>
                  <Form.Check 
                    type="checkbox" 
                    className="text-left text-white mb-4 mt-2" 
                    label="Se souvenir de mes identifiants" 
                    defaultChecked 
                  />
                </Form.Group>
                
                {/* Bouton de soumission du formulaire */}
                <Button className="btn btn-block btn-primary mb-4">
                  Se connecter
                </Button>
                
                {/* Lien pour réinitialiser le mot de passe */}
                <p className="mb-2 text-white">
                  Mot de passe oublié ?{' '}
                  <NavLink to="#" className="f-w-400 text-orange">
                    Réinitialiser
                  </NavLink>
                </p>
              </Card.Body>
          </Row>
        </Card>
      </div>
    </div>
  );
}