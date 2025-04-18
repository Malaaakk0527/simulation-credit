import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreditForm.css";

const CreditForm = () => {
  const { creditType } = useParams();
  const navigate = useNavigate();

  const [montant, setMontant] = useState(5000);
  const [duree, setDuree] = useState(12); // en mois
  const [taux, setTaux] = useState(creditType === "immobilier" ? 4.5 : 6.5);
  const [mensualite, setMensualite] = useState(0);
  const [totalRemboursement, setTotalRemboursement] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = {
    immobilier: {
      minMontant: 5000,
      maxMontant: 10000000,
      minDuree: 12,
      maxDuree: 25 * 12,
      taux: 4.5,
    },
    consommation: {
      minMontant: 5000,
      maxMontant: 300000,
      minDuree: 12,
      maxDuree: 7 * 12,
      taux: 6.5,
    },
  };

  const rules = config[creditType] || null;

  useEffect(() => {
    if (!rules) navigate("/");
    setTaux(rules?.taux || 0);
    
    // Vérifier l'authentification
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (token) {
        // Vérifier si le token est valide
        fetch('http://localhost:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
        .then(response => {
          setIsAuthenticated(response.ok);
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
        });
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [creditType, navigate, rules]);

  const handleSimulate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        if (window.confirm('Vous devez être connecté pour faire une simulation. Voulez-vous vous connecter maintenant ?')) {
          navigate('/login');
        }
        return;
      }

      // Appel à l'API pour le calcul
      const calculateResponse = await fetch('http://localhost:8000/api/simulations/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          montant: parseFloat(montant),
          duree: parseInt(duree),
          taux: parseFloat(taux),
          id_type_credit: creditType === 'immobilier' ? 1 : 2
        })
      });

      if (!calculateResponse.ok) {
        if (calculateResponse.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        const errorData = await calculateResponse.json();
        throw new Error(errorData.message || 'Erreur lors du calcul');
      }

      const calculateData = await calculateResponse.json();
      setMensualite(calculateData.mensualites);
      setTotalRemboursement(calculateData.total_a_rembourser);
      setShowResults(true);

      // Sauvegarder la simulation
      const saveResponse = await fetch('http://localhost:8000/api/simulations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          montant: parseFloat(montant),
          duree: parseInt(duree),
          taux: parseFloat(taux),
          mensualites: calculateData.mensualites,
          total_a_rembourser: calculateData.total_a_rembourser,
          id_type_credit: creditType === 'immobilier' ? 1 : 2
        })
      });

      if (!saveResponse.ok) {
        if (saveResponse.status === 401) {
          setIsAuthenticated(false);
          localStorage.removeItem('token');
          throw new Error('Session expirée. Veuillez vous reconnecter.');
        }
        const errorData = await saveResponse.json();
        throw new Error(errorData.message || 'Erreur lors de la sauvegarde');
      }

      // Rediriger vers l'historique
      navigate('/history');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      alert(error.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  if (!rules) return null;

  return (
    <div className="credit-form-container">
      <div className="credit-form-card">
        <h2 className="credit-form-title">
          Simulation de {creditType === "immobilier" ? "Crédit Immobilier" : "Crédit Consommation"}
        </h2>

        <form onSubmit={handleSimulate} className="credit-form">
          <div className="form-group">
            <label htmlFor="montant">Montant : {montant.toLocaleString()} MAD</label>
            <input
              type="range"
              id="montant"
              min={rules.minMontant}
              max={rules.maxMontant}
              step={100}
              value={montant}
              onChange={(e) => setMontant(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="duree">Durée : {duree} mois</label>
            <input
              type="range"
              id="duree"
              min={rules.minDuree}
              max={rules.maxDuree}
              step={5}
              value={duree}
              onChange={(e) => setDuree(Number(e.target.value))}
            />
          </div>

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Calcul en cours...' : 'Simuler'}
          </button>

          {showResults && (
            <div className="results-section">
              <div className="result-item">
                <span className="result-label">Taux d'intérêt :</span>
                <span className="result-value">{taux}%</span>
              </div>
              <div className="result-item">
                <span className="result-label">Mensualité :</span>
                <span className="result-value">{mensualite.toFixed(2)} MAD</span>
              </div>
              <div className="result-item">
                <span className="result-label">Total à rembourser :</span>
                <span className="result-value">{totalRemboursement.toFixed(2)} MAD</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreditForm;