import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Slider, Button, Typography, message } from "antd";

const { Title } = Typography;

const CreditForm = () => {
  const { creditType } = useParams();
  const navigate = useNavigate();

  const [montant, setMontant] = useState(5000);
  const [duree, setDuree] = useState(12); // en mois
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Configurations selon le type
  const config = {
    immobilier: {
      minMontant: 5000,
      maxMontant: 10000000,
      minDuree: 12,
      maxDuree: 25 * 12,
    },
    consommation: {
      minMontant: 5000,
      maxMontant: 300000,
      minDuree: 12,
      maxDuree: 7 * 12,
    },
  };

  const rules = config[creditType] || null;

  useEffect(() => {
    if (!rules) navigate("/");
  }, [creditType, navigate, rules]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      montant,
      duree,
      typeBien: creditType === "immobilier" ? "appartement" : null,
    };

    try {
      // Utiliser Axios ou Fetch pour envoyer la requête au backend
      const response = await fetch(
        `http://localhost:8000/simulation/${creditType}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-CSRF-TOKEN": document
              .querySelector('meta[name="csrf-token"]')
              .getAttribute("content"),
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      // Log complet de la réponse pour debugging
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);

      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setResult(data);
        message.success("Simulation effectuée avec succès !");
      } else {
        // Détail du message d'erreur
        const errorMsg =
          data.message || data.error || "Une erreur est survenue";
        message.error(errorMsg);
        console.error("Erreur détaillée:", data);
      }
    } catch (error) {
      console.error("Erreur de requête:", error);
      message.error(
        `Erreur: ${error.message || "Problème de connexion au serveur"}`
      );
    } finally {
      setLoading(false);
    }
  };

  if (!rules) return null;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <Title level={3}>
        Simulation de{" "}
        {creditType === "immobilier"
          ? "Crédit Immobilier"
          : "Crédit Consommation"}
      </Title>

      <Form
        onSubmitCapture={handleSubmit}
        layout="vertical"
        style={{ maxWidth: "600px", margin: "0 auto" }}>
        <Form.Item
          label={`Montant du Crédit : ${montant.toLocaleString()} MAD`}>
          <Slider
            min={rules.minMontant}
            max={rules.maxMontant}
            step={1000}
            value={montant}
            tooltip={{ open: true }}
            onChange={(value) => setMontant(value)}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item
          label={`Durée : ${(duree / 12).toFixed(1)} ans (${duree} mois)`}>
          <Slider
            min={rules.minDuree}
            max={rules.maxDuree}
            step={12}
            value={duree}
            tooltip={{ open: true }}
            onChange={(value) => setDuree(value)}
            disabled={loading}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Simuler
          </Button>
        </Form.Item>
      </Form>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "5px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}>
          <h3>Résultat de la simulation</h3>
          <p>
            💸 Mensualité estimée : <strong>{result.mensualites} MAD</strong>
          </p>
          <p>
            📄 Type de crédit :{" "}
            <strong>
              {result.typeCredit ||
                (creditType === "immobilier"
                  ? "Crédit Immobilier"
                  : "Crédit Consommation")}
            </strong>
          </p>
          {result.montant && (
            <p>
              💰 Montant :{" "}
              <strong>{result.montant.toLocaleString()} MAD</strong>
            </p>
          )}
          {result.duree && (
            <p>
              ⏱️ Durée : <strong>{result.duree} ans</strong>
            </p>
          )}
          {result.taux && (
            <p>
              📊 Taux d'intérêt : <strong>{result.taux}%</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CreditForm;
