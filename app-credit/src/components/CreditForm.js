import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreditForm.css";

const CreditForm = () => {
  const { creditType } = useParams();
  const navigate = useNavigate();

  const [montant, setMontant] = useState(5000);
  const [duree, setDuree] = useState(12); // en mois
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error('Erreur de vérification d\'authentification');
        }

        setIsAuthenticated(true);
      } catch (err) {
        console.error('Erreur d\'authentification:', err);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const config = {
    immobilier: {
      minMontant: 5000,
      maxMontant: 10000000,
      minDuree: 12,
      maxDuree: 25 * 12,
      typeId: 1
    },
    consommation: {
      minMontant: 5000,
      maxMontant: 300000,
      minDuree: 12,
      maxDuree: 7 * 12,
      typeId: 2
    }
  };

  const rules = config[creditType];
  if (!rules) return null;
  if (isAuthChecking) return null;
  if (!isAuthenticated) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const formData = {
      montant: montant,
      duree: Math.floor(duree / 12), // en années
      id_type_credit: rules.typeId
    };

    try {
      const response = await fetch('http://localhost:8000/api/simulations/calculate', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/login');
          return;
        }
        throw new Error(responseData.message || "Erreur lors de la simulation");
      }

      if (responseData.success) {
        setResult(responseData.data);
      } else {
        throw new Error(responseData.message || "La simulation a échoué");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="credit-form-container">
      <div className="credit-form-card">
        <h2 className="credit-form-title">
          Simulation de {creditType === "immobilier" ? "Crédit Immobilier" : "Crédit Consommation"}
        </h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="credit-form">
          <div className="form-group">
            <label htmlFor="montant">Montant : {montant.toLocaleString()} MAD</label>
            <input
              type="range"
              id="montant"
              min={rules.minMontant}
              max={rules.maxMontant}
              step={1000}
              value={montant}
              onChange={(e) => setMontant(Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duree">
              Durée : {(duree / 12).toFixed(1)} ans ({duree} mois)
            </label>
            <input
              type="range"
              id="duree"
              min={rules.minDuree}
              max={rules.maxDuree}
              step={12}
              value={duree}
              onChange={(e) => setDuree(Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Calcul en cours..." : "Simuler"}
          </button>

          {result && (
            <div className="results-section">
              <div className="result-item">
                <span className="result-label">Mensualité :</span>
                <span className="result-value">{result.mensualite.toLocaleString()} MAD</span>
              </div>
              <div className="result-item">
                <span className="result-label">Montant emprunté :</span>
                <span className="result-value">{result.montant.toLocaleString()} MAD</span>
              </div>
              <div className="result-item">
                <span className="result-label">Durée :</span>
                <span className="result-value">{result.duree} ans</span>
              </div>
              <div className="result-item">
                <span className="result-label">Taux annuel :</span>
                <span className="result-value">{result.taux_annuel}%</span>
              </div>
              <div className="result-item">
                <span className="result-label">Coût total du crédit :</span>
                <span className="result-value">{result.cout_total.toLocaleString()} MAD</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreditForm;
