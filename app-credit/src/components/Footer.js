import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Link } = Typography;

export default function Piedage() {
  return (
    <AntFooter style={{ backgroundColor: '#5D4037', color: '#fff', padding: '40px 50px' }}>
      <Row gutter={[32, 16]}>
        {/* Colonne 1 : À propos */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: '#fff' }}>À propos</Title>
          <Paragraph style={{ color: '#f5f5f5' }}>
            Nous sommes une banque engagée à offrir des services accessibles, rapides et fiables à nos clients.
          </Paragraph>
        </Col>

        {/* Colonne 2 : Services */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={{ color: '#fff' }}>Services</Title>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            <li><Link style={{ color: '#f5f5f5' }}>Prêt Personnel</Link></li>
            <li><Link style={{ color: '#f5f5f5' }}>Compte Bancaire</Link></li>
            <li><Link style={{ color: '#f5f5f5' }}>Crédit Immobilier</Link></li>
          </ul>
        </Col>

        {/* Colonne 3 : Contact */}
        <Col xs={24} sm={24} md={8}>
          <Title level={4} style={{ color: '#fff' }}>Contact</Title>
          <Paragraph style={{ color: '#f5f5f5' }}>
            Email : contact@banqueexemple.com<br />
            Téléphone : +212 5 22 43 21 00<br />
            Adresse : 123 Avenue Mohammed V, Casablanca
          </Paragraph>
        </Col>
      </Row>

      {/* Copyright */}
      <div style={{ textAlign: 'center', marginTop: '30px', color: '#d7ccc8' }}>
        © {new Date().getFullYear()} BanqueExemple. Tous droits réservés.
      </div>
    </AntFooter>
  );
}
