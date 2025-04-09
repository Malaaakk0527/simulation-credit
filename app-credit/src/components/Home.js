import React from 'react';
import { Row, Col, Typography, Button, Card } from 'antd';
import { Link } from 'react-router-dom';
import SimulationConsommation from './SimulationConsommation';
import Simulation2 from './Simulation2';

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div 
      style={{
        padding: '50px', 
        backgroundImage: 'url(/images/photo-1.avif)', // Lien vers une image valide
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh', // Permet d'étirer le fond sur toute la hauteur de la page
      }}
    >
      {/* Contenu principal de la page d'accueil */}
      <Row justify="center" style={{ marginBottom: '50px' }}>
        <Col span={16} style={{ textAlign: 'center' }}>
          <Title level={2} style={{ color: '#002A5C' }}>Bienvenue à Ma Banque</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Gérez vos finances, découvrez nos produits et services bancaires, et faites des simulations de crédit.
          </Paragraph>
        </Col>
      </Row>

      {/* Section de choix de crédits */}
      <Row gutter={16} justify="center" style={{ marginBottom: '50px' }}>
        {/* Crédit Immobilier */}
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Crédit Immobilier"
            
            hoverable
            style={{ textAlign: 'center' }}
          >
            <Paragraph>
              Vous souhaitez acheter un bien immobilier ? Découvrez nos solutions de crédit immobilier avec des taux compétitifs.
            </Paragraph>
          <Link to='/Simulation2'>
  <Button type="primary" style={{ marginTop: '10px' }}>
    Simuler
  </Button>
</Link>
          </Card>
        </Col>

        {/* Crédit Consommation */}
        <Col xs={24} sm={12} md={8}>
          <Card
         
            title="Crédit Consommation"
            
            hoverable
            style={{ textAlign: 'center' }}
          >
            <Paragraph>
              Besoin de financer vos projets personnels ? Explorez nos options de crédit consommation adaptées à vos besoins.
            </Paragraph>
            <Link to='/simulation-consommation'>
  <Button type="primary" style={{ marginTop: '10px' }}>
    Simuler
  </Button>
</Link>

          </Card>
        </Col>
      </Row>

      {/* Section Contact à la fin de la page d'accueil */}
      <div id="contact" style={{ backgroundColor: '#002A5C', color: '#fff', padding: '50px 20px', marginTop: '50px' }}>
        <Row justify="center">
          <Col span={16} style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: '#fff' }}>Contactez-Nous</Title>
            <Paragraph style={{ fontSize: '18px', color: '#fff' }}>
              
              Vous pouvez nous joindre par téléphone au <strong>01 23 45 67 89</strong>
            </Paragraph>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
