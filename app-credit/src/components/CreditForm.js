import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Slider, Button, Select, Typography, message } from 'antd';

const { Title } = Typography;

const CreditForm = () => {
  const { creditType } = useParams();
  const navigate = useNavigate();

  const [montant, setMontant] = useState(5000);
  const [duree, setDuree] = useState(12); // en mois
  const [typeBien, setTypeBien] = useState('');
  const [result, setResult] = useState(null);

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

  const rules = config[creditType];

  useEffect(() => {
    if (!rules) navigate('/');
  }, [creditType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      montant,
      duree,
      typeBien: creditType === 'immobilier' ? typeBien : null,
      nom: creditType === 'immobilier' ? 'Crédit Immobilier' : 'Crédit Consommation'
    };

    try {
      const response = await fetch(`http://localhost:8000/credit-types`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        message.error('Une erreur est survenue.');
      }
    } catch (error) {
      message.error('Erreur de connexion au serveur.');
    }
  };

  if (!rules) return null;

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <Title level={3}>
        Simulation de {creditType === 'immobilier' ? 'Crédit Immobilier' : 'Crédit Consommation'}
      </Title>

      <Form onSubmitCapture={handleSubmit} layout="vertical" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Form.Item label={`Montant du Crédit : ${montant.toLocaleString()} MAD`}>
          <Slider
            min={rules.minMontant}
            max={rules.maxMontant}
            step={1000}
            value={montant}
            tooltip={{ open: true }}
            onChange={(value) => setMontant(value)}
          />
        </Form.Item>

        <Form.Item label={`Durée : ${(duree / 12).toFixed(1)} ans (${duree} mois)`}>
          <Slider
            min={rules.minDuree}
            max={rules.maxDuree}
            step={12}
            value={duree}
            tooltip={{ open: true }}
            onChange={(value) => setDuree(value)}
          />
        </Form.Item>

       

        <Form.Item>
          <Button type="primary" htmlType="submit">Simuler</Button>
        </Form.Item>
      </Form>

      {result && (
        <div style={{ marginTop: '30px' }}>
          <h3>Résultat de la simulation</h3>
          <p>💸 Mensualité estimée : <strong>{result.mensualites} MAD</strong></p>
          <p>📄 Type de crédit : <strong>{creditType === 'immobilier' ? 'Crédit Immobilier' : 'Crédit Consommation'}</strong></p>
        </div>
      )}
    </div>
  );
};

export default CreditForm;
