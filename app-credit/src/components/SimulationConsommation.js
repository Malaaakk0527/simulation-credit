import React, { useState } from 'react';
import { Input, Button, Select, Form, InputNumber, Typography, Row, Col } from 'antd';
import 'antd/dist/reset.css'; // Import du style d'Ant Design

const { Title } = Typography;

export default function SimulationConsommation() {
  // États pour chaque champ du formulaire
  const [montant, setMontant] = useState('');
  const [taux, setTaux] = useState('');
  const [duree, setDuree] = useState('');
  const [typeCredit, setTypeCredit] = useState('');
  const [resultat, setResultat] = useState('');

  // Fonction pour simuler le calcul
  const simulerCredit = () => {
    if (montant && taux && duree && typeCredit) {
      const montantInt = parseFloat(montant);
      const tauxInt = parseFloat(taux) / 100 / 12; // taux mensuel
      const dureeInt = parseInt(duree);

      // Calcul de la mensualité estimée
      const mensualite = (montantInt * tauxInt) / (1 - Math.pow(1 + tauxInt, -dureeInt));

      setResultat(`Votre mensualité estimée est de : ${mensualite.toFixed(2)} MAD`);
    } else {
      setResultat('Veuillez remplir tous les champs.');
    }
  };

  return (
    <div className="simulation-container" style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <Title level={1}>Simulation de Crédit</Title>

      <Form layout="vertical" onFinish={simulerCredit}>
        <Form.Item label="Montant" required>
          <InputNumber
            min={0}
            value={montant}
            onChange={(value) => setMontant(value)}
            placeholder="Entrez le montant"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Taux d'intérêt annuel (%)" required>
          <InputNumber
            min={0}
            value={taux}
            onChange={(value) => setTaux(value)}
            placeholder="Entrez le taux d'intérêt"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Durée (en mois)" required>
          <InputNumber
            min={1}
            value={duree}
            onChange={(value) => setDuree(value)}
            placeholder="Entrez la durée"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Type de Crédit" required>
          <Select
            value={typeCredit}
            onChange={(value) => setTypeCredit(value)}
            placeholder="Sélectionnez un type"
            style={{ width: '100%' }}
          >
            <Select.Option value="Consommation">Crédit à la consommation</Select.Option>
            <Select.Option value="Immobilier">Crédit immobilier</Select.Option>
            <Select.Option value="Auto">Crédit auto</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Simuler
          </Button>
        </Form.Item>
      </Form>

      <div className="resultat" style={{ marginTop: '20px', padding: '10px', borderTop: '1px solid #ccc' }}>
        <Title level={2}>Résultat de la simulation</Title>
        <p>{resultat}</p>
      </div>
    </div>
  );
}
