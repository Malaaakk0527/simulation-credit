 
import React from 'react';
import { Layout, Row, Col, Card, Typography } from 'antd';

// Style du conteneur
const { Title, Paragraph } = Typography;

export default function Services() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right,rgba(0, 0, 0, 0.1))', 
      }}
    >
      <Layout.Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '50px 0',
          width: '100%',
        }}
      >
        <Title style={{ color: '#fff', fontWeight: 'bold' }}>Nos Services</Title>

        <Row gutter={[16, 16]} style={{ maxWidth: '1200px', width: '100%' }}>
          {/* Service 1: Prêt Personnel */}
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Prêt Personnel" src="/images/premium_photo-1.avif" />}
              style={{
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Title level={4} style={{ color: '#00478f' }}>Prêt Personnel</Title>
              <Paragraph>
                Bénéficiez de notre service de prêt personnel pour financer vos projets personnels en toute simplicité.
              </Paragraph>
            </Card>
          </Col>

          {/* Service 2: Compte Bancaire */}
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Compte Bancaire" src="/images/photo-15.avif" />}
              style={{
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(23, 84, 170, 0.49)',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Title level={4} style={{ color: '#00478f' }}>Compte Bancaire</Title>
              <Paragraph>
                Ouvrez un compte bancaire chez nous et profitez de nombreux avantages et services bancaires.
              </Paragraph>
            </Card>
          </Col>

          {/* Service 3: Crédit Immobilier */}
          <Col span={8}>
            <Card
              hoverable
              cover={<img alt="Crédit " src="/images/Al-Barid-Bank.webp" />}
              style={{
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <Title level={4} style={{ color: '#00478f' }}>Crédits</Title>
              <Paragraph>
                Réalisez vos projets avec notre crédit  adapté à vos besoins.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Layout.Content>
    </Layout>
  );
}