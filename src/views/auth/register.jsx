/**======================================================================
=========================================================================
Author: BRENDOLY Consulting
Web Site: brendoly-consulting.com
Email: contact@brendoly-consulting.com
File: SignUp1.js
=========================================================================
=================================================================================== */

import { NavLink } from 'react-router-dom';

// react-bootstrap
import { Card, Row, Col, Button, InputGroup, Form } from 'react-bootstrap';

// third party
import FeatherIcon from 'feather-icons-react';

// assets
import logo from 'assets/images/logo.jpg';

/**
 * Composant SignUp1 - Page d'inscription/authentification
 * Ce composant représente la page de création de compte avec:
 * - Formulaire d'inscription (nom d'utilisateur, email et mot de passe)
 * - Option pour s'abonner à la newsletter
 * - Lien vers la page de connexion pour les utilisateurs existants
 * - Logo de l'application
 * - Design responsive et centré
 */
export default function SignUp1() {
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
              
              {/* Titre de la page d'inscription */}
              <h4 className="mb-3 f-w-400">Inscription</h4>
              
              {/* Champ de saisie pour le nom d'utilisateur */}
              <InputGroup className="mb-3">
                <InputGroup.Text aria-label="Icône utilisateur">
                  <FeatherIcon icon="user" />
                </InputGroup.Text>
                <Form.Control 
                  type="text" 
                  placeholder="Nom d'utilisateur" 
                  aria-label="Nom d'utilisateur"
                />
              </InputGroup>
              
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
              <InputGroup className="mb-4">
                <InputGroup.Text aria-label="Icône mot de passe">
                  <FeatherIcon icon="lock" />
                </InputGroup.Text>
                <Form.Control 
                  type="password" 
                  placeholder="Mot de passe" 
                  aria-label="Mot de passe"
                />
              </InputGroup>
              
              {/* Bouton de soumission du formulaire d'inscription */}
              <Button className="btn-block mb-4">
                S'inscrire
              </Button>
              
            </Card.Body>
          </Row>
        </Card>
      </div>
    </div>
  );
}