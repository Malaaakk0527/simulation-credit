import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import "./Login.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setName("");
    setPasswordConfirmation("");
    setError("");
    setPasswordStrength(0);
  };

  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
    return strength;
  };

  const getPasswordStrengthText = () => {
    switch(passwordStrength) {
      case 0: return "Très faible";
      case 1: return "Faible";
      case 2: return "Moyen";
      case 3: return "Fort";
      case 4: return "Très fort";
      default: return "";
    }
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case 1: return "#e74c3c"; // rouge
      case 2: return "#f39c12"; // orange
      case 3: return "#3498db"; // bleu
      case 4: return "#2ecc71"; // vert
      default: return "#bdc3c7"; // gris
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (isSignUp) {
      checkPasswordStrength(newPassword);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Succès!',
      text: message,
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
  };

  const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: message,
      showConfirmButton: true,
      confirmButtonColor: '#3498db',
      confirmButtonText: 'OK',
      background: '#FDF5F5',
      iconColor: '#e74c3c'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Mode inscription
        if (password !== passwordConfirmation) {
          setError("Les mots de passe ne correspondent pas");
          showErrorAlert("Les mots de passe ne correspondent pas");
          setIsLoading(false);
          return;
        }

        if (password.length < 8) {
          setError("Le mot de passe doit contenir au moins 8 caractères");
          showErrorAlert("Le mot de passe doit contenir au moins 8 caractères");
          setIsLoading(false);
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
        showSuccessAlert('Inscription réussie! Bienvenue chez Crédit Facile.');
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
          throw new Error(data.message || 'Erreur lors de la connexion : email ou mot de passe incorrect');
        }

        localStorage.setItem("token", data.token);
        setUser(data.user);
        showSuccessAlert('Connexion réussie! Heureux de vous revoir.');
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      showErrorAlert(error.message || "Erreur lors de la connexion : email ou mot de passe incorrect");
    } finally {
      setIsLoading(false);
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
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Votre mot de passe (min. 8 caractères)"
              required
            />
            <button
              type="button"
              className="toggle-password-visibility"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
          {isSignUp && password && (
            <div className="password-strength-container">
              <div className="password-strength-meter">
                <div 
                  className="password-strength-meter-bar" 
                  style={{ 
                    width: `${passwordStrength * 25}%`,
                    backgroundColor: getPasswordStrengthColor()
                  }}
                ></div>
              </div>
              <div className="password-strength-text" style={{ color: getPasswordStrengthColor() }}>
                Force: {getPasswordStrengthText()}
              </div>
            </div>
          )}
        </div>
        {isSignUp && (
          <div className="form-group">
            <label htmlFor="passwordConfirmation">Confirmer le mot de passe</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="passwordConfirmation"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirmez votre mot de passe"
                required
              />
              <button
                type="button"
                className="toggle-password-visibility"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {passwordConfirmation && password !== passwordConfirmation && (
              <div className="password-mismatch">
                Les mots de passe ne correspondent pas
              </div>
            )}
          </div>
        )}
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? (
            <span className="button-loader"></span>
          ) : (
            isSignUp ? "S'inscrire" : "Se connecter"
          )}
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