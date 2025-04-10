import React from 'react';
import { Row, Col, Typography, Button, Card, Carousel } from 'antd';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const carouselImages = [
  '/images/slide_3.jpg',
  '/images/slide_2.jpg',
  '/images/slide_1.jpg',
];

const Home = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {/* --- Carousel --- */}
      <Carousel autoplay effect="fade" style={{ marginBottom: '200px' }}>
        {carouselImages.map((img, index) => (
          <div key={index}>
            <div
              style={{
                height: '70vh',
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: '',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '2em',
                fontWeight: 'bold',
                textShadow: '2px 2px 5px rgba(0,0,0,0.7)',
              }}
            >
             
            </div>
          </div>
        ))}
      </Carousel>

      {/* --- Intro --- */}
      <Row justify="center" style={{ marginBottom: '40px' }}>
        <Col span={20} style={{ textAlign: 'center' }}>
          <Title level={2} style={{ color: '#003366' }}>Simplifiez votre vie financière</Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Des solutions bancaires innovantes, des crédits personnalisés, et un accompagnement sur mesure.
          </Paragraph>
        </Col>
      </Row>

      {/* --- Services Cards --- */}
      <Row gutter={[24, 24]} justify="center" style={{ padding: '0 50px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Crédit Immobilier"
            hoverable
            style={{ textAlign: 'center', borderRadius: '10px' }}
            cover={<img alt="Crédit Immobilier" src="/images/immobilier.jpg" />}
          >
            <Paragraph>
              Investissez dans l’immobilier avec des taux adaptés et une simulation rapide.
            </Paragraph>
            <Link to="/simulation-Immobillier">
              <Button type="primary">Simuler</Button>
            </Link>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            title="Crédit Consommation"
            hoverable
            style={{ textAlign: 'center', borderRadius: '10px' }}
            cover={<img alt="Crédit Consommation" src="/images/consommation.jpg" />}
          >
            <Paragraph>
              Financez vos projets personnels en toute tranquillité avec notre crédit souple.
            </Paragraph>
            <Link to="/simulation-consommation">
              <Button type="primary">Simuler</Button>
            </Link>
          </Card>
        </Col>
      </Row>

      {/* --- Section Contact --- */}
      <div
        id="contact"
        style={{
          backgroundColor: 'black',
          color: 'white',
          padding: '60px 20px',
          marginTop: '60px',
          textAlign: 'center',
        }}
      >
        <Title level={2} style={{ color: '#fff' }}>Besoin d'aide ?</Title>
        <Paragraph style={{ fontSize: '18px' }}>
          Contactez notre service client au <strong>+212 5 22 43 21 00</strong> ou écrivez-nous à <strong>support@mabanque.com</strong>
        </Paragraph>
      </div>
    </div>
  );
};

export default Home;
