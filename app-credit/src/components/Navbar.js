import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Afficher une confirmation de déconnexion
    Swal.fire({
      title: 'Déconnexion',
      text: 'Êtes-vous sûr de vouloir vous déconnecter?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3498db',
      cancelButtonColor: '#7f8c8d',
      confirmButtonText: 'Oui, me déconnecter',
      cancelButtonText: 'Annuler'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        
        if (token) {
          try {
            // Appel à l'API de déconnexion pour révoquer le token côté serveur
            await fetch('http://localhost:8000/api/logout', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
              }
            });
          } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
          }
        }
        
        // Suppression du token côté client
        localStorage.removeItem("token");
        
        if (onLogout) {
          onLogout();
        }
        
        // Afficher une notification de déconnexion réussie
        Swal.fire({
          icon: 'success',
          title: 'Déconnecté!',
          text: 'Vous avez été déconnecté avec succès.',
          timer: 2000,
          showConfirmButton: false,
          position: 'top-end',
          toast: true,
          background: '#E8F6EF',
          iconColor: '#2ecc71',
          customClass: {
            popup: 'swal-success-toast'
          }
        });
        
        navigate("/");
      }
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img
          src="/images/téléchargement.jpeg"
          alt="Logo"
          className="logo-image"
        />
        <span className="logo-text">BaridBank</span>
      </div>

      <nav className="navbar-menu">
        <ul className="menu-list">
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">Accueil</Link>
          </li>
          <li className={location.pathname === "/account" ? "active" : ""}>
            {user ? (
              <div className="dropdown">
                <span className="dropdown-toggle">{`Bonjour, ${user.name}`}</span>
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/history">Historique</Link>
                  </li>
                  <li>
                    <span onClick={handleLogout} style={{ cursor: "pointer" }}>
                      Déconnexion
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">Mon Compte</Link>
            )}
          </li>
          <li className={location.pathname === "/contact" ? "active" : ""}>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;