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
              }}
            />
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
            <Link to="/simulation/immobilier">
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

<Link to="/simulation/consommation">
  <Button type="primary">Simuler</Button>
</Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
