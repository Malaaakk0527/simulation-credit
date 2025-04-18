import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setName("");
    setPasswordConfirmation("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        // Mode inscription
        if (password !== passwordConfirmation) {
          setError("Les mots de passe ne correspondent pas");
          return;
        }

        if (password.length < 8) {
          setError("Le mot de passe doit contenir au moins 8 caractères");
          return;
        }

        const response = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nom: name,
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          if (response.status === 422 && data.errors) {
            const errorMessages = Object.values(data.errors).flat().join(', ');
            throw new Error(errorMessages);
          }
          throw new Error(data.message || 'Erreur lors de l\'inscription');
        }

        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/");
      } else {
        // Mode connexion
        const response = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Erreur lors de la connexion');
        }

        localStorage.setItem("token", data.token);
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h2>{isSignUp ? "Inscription" : "Connexion"}</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              required
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ex: user@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Votre mot de passe (min. 8 caractères)"
            required
          />
        </div>
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="passwordConfirmation">Confirmer le mot de passe</label>
            <input
              type="password"
              id="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>
        )}
        <button type="submit" className="submit-button">
          {isSignUp ? "S'inscrire" : "Se connecter"}
        </button>
        <p className="toggle-link">
          {isSignUp ? "Déjà inscrit ?" : "Pas encore de compte ?"}
          <button type="button" onClick={toggleForm} className="toggle-button">
            {isSignUp ? "Se connecter" : "S'inscrire"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;