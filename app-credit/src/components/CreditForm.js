import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
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
  const [savingSimulation, setSavingSimulation] = useState(false);

  useEffect(() => {
    // Verification si le client est connecté
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
      id_type_credit: rules.typeId,
      saveSimulation: false // Ne pas sauvegarder automatiquement
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
        console.log('Résultat de la simulation:', responseData.data);
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

  const saveSimulation = async () => {
    setSavingSimulation(true);
    setError(null);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // Envoyer les données du résultat actuel
      // incluant la mensualité déjà calculée
      const formData = {
        montant: parseFloat(result.montant),
        duree: parseInt(result.duree, 10),
        id_type_credit: rules.typeId,
        mensualite: parseFloat(result.mensualite)
      };

      console.log('Données à envoyer:', formData);

      const response = await fetch('http://localhost:8000/api/simulations/save', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      console.log('Statut de la réponse:', response.status);
      
      const responseData = await response.json();
      console.log('Réponse du serveur:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || "Erreur lors de l'enregistrement");
      }

      // Afficher une notification de succès
      Swal.fire({
        icon: 'success',
        title: 'Simulation enregistrée!',
        text: 'Votre simulation a été enregistrée avec succès.',
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
    } catch (err) {
      console.error('Erreur complète:', err);
      setError(err.message);
      
      // Afficher une notification d'erreur
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: err.message || "Une erreur est survenue lors de l'enregistrement",
        showConfirmButton: true,
        confirmButtonColor: '#3498db',
        confirmButtonText: 'OK',
        background: '#FDF5F5',
        iconColor: '#e74c3c'
      });
    } finally {
      setSavingSimulation(false);
    }
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const title = creditType === "immobilier" ? "Crédit Immobilier" : "Crédit Consommation";
    const date = new Date().toLocaleDateString('fr-FR');
    
    // Ajouter un en-tête avec style
    doc.setFillColor(52, 152, 219); // Bleu
    doc.rect(0, 0, pageWidth, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text(`Simulation de ${title}`, pageWidth/2, 20, { align: 'center' });
    
    // Informations du client
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${date}`, 20, 50);
    
    
    // Ligne séparatrice
    doc.setDrawColor(220, 220, 220);
    doc.line(20, 55, pageWidth - 20, 55);
    
    // Tableau des détails
    doc.setFillColor(240, 240, 240);
    doc.rect(20, 70, pageWidth - 40, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text("DÉTAILS DE VOTRE SIMULATION", pageWidth/2, 77, { align: 'center' });
    
    // Contenu du tableau
    const startY = 85;
    const lineHeight = 10;
    
    // Styles
    doc.setDrawColor(200, 200, 200);
    doc.setFillColor(249, 249, 249);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    
    // Lignes du tableau
    const items = [
      {label: "Montant emprunté:", value: `${data.montant.toLocaleString()} MAD`},
      {label: "Durée du prêt:", value: `${data.duree} ans (${data.duree * 12} mois)`},
      {label: "Taux d'intérêt annuel:", value: data.taux_annuel},
      {label: "Mensualité:", value: `${data.mensualite.toLocaleString()} MAD`},
      {label: "Coût total du crédit:", value: `${data.cout_total.toLocaleString()} MAD`}
    ];
    
    // Dessiner les lignes du tableau
    items.forEach((item, i) => {
      const y = startY + (i * lineHeight);
      // Alterner les couleurs de fond
      if (i % 2 === 0) {
        doc.setFillColor(249, 249, 249);
        doc.rect(20, y - 2, pageWidth - 40, lineHeight, 'F');
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text(item.label, 25, y + 3);
      doc.setFont('helvetica', 'normal');
      doc.text(item.value, pageWidth - 25, y + 3, { align: 'right' });
    });
    
    // Pied de page
    const footerY = startY + (items.length * lineHeight) + 20;
    doc.setDrawColor(52, 152, 219);
    doc.setLineWidth(0.5);
    doc.line(20, footerY, pageWidth - 20, footerY);
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
   
    
    // Enregistrer le PDF
    doc.save(`simulation_${title.toLowerCase().replace(' ', '_')}_${date.replace(/\//g, '-')}.pdf`);
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
                <span className="result-value">{result.taux_annuel}</span>
              </div>
              <div className="result-item">
                <span className="result-label">Coût total du crédit :</span>
                <span className="result-value">{result.cout_total.toLocaleString()} MAD</span>
              </div>
              <div className="result-actions">
                <button 
                  type="button" 
                  className="download-button" 
                  onClick={() => generatePDF(result)}
                >
                  Télécharger PDF
                </button>
                <button 
                  type="button" 
                  className="save-button" 
                  onClick={saveSimulation} 
                  disabled={savingSimulation}
                >
                  {savingSimulation ? "Enregistrement..." : "Enregistrer cette simulation"}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreditForm;
