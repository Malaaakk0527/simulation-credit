import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) {
      onLogout();
    }
    navigate("/");
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