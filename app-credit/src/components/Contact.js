import React from 'react';
import { Layout, Row, Col, Card, Typography, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default function Contact() {
  const gradientBg = 'linear-gradient(135deg, #2c3e50, #1e2a3a)';
  const accentColor = '#3498db';
  const accentGradient = 'linear-gradient(90deg, #3498db, #1abc9c)';

  // Formes décoratives CSS
  const decorStyles = {
    shape1: {
      position: 'absolute',
      top: '50px',
      right: '10%',
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      background: hexToRgba('#3498db', 0.05),
      zIndex: 0,
    },
    shape2: {
      position: 'absolute',
      bottom: '100px',
      left: '5%',
      width: '150px',
      height: '150px',
      borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
      background: hexToRgba('#1abc9c', 0.07),
      zIndex: 0,
    },
    shape3: {
      position: 'absolute',
      top: '30%',
      left: '15%',
      width: '80px',
      height: '80px',
      transform: 'rotate(45deg)',
      background: hexToRgba('#3498db', 0.05),
      zIndex: 0,
    }
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: gradientBg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Formes décoratives */}
      <div style={decorStyles.shape1}></div>
      <div style={decorStyles.shape2}></div>
      <div style={decorStyles.shape3}></div>

      <Layout.Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '60px 20px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* En-tête de la page */}
        <div style={{ textAlign: 'center', marginBottom: '50px', maxWidth: '800px' }}>
          <Title style={{ color: '#fff', fontWeight: 'bold', fontSize: '36px', marginBottom: '16px' }}>
            Contactez-nous
          </Title>
          <Paragraph style={{ color: '#bdc3c7', fontSize: '18px' }}>
            Notre équipe est à votre disposition pour répondre à vos questions et vous accompagner dans vos projets financiers.
          </Paragraph>
        </div>

        {/* Section des services (les cards existantes) */}
        <div style={{ width: '100%', maxWidth: '1200px', marginBottom: '60px' }}>
          <Title level={2} style={{ color: '#fff', textAlign: 'center', marginBottom: '30px', position: 'relative', paddingBottom: '15px', display: 'inline-block' }}>
            Nos Services
            <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '80px', height: '3px', background: accentGradient }}></div>
          </Title>

          <Row gutter={[24, 24]} style={{ width: '100%' }}>
            {/* Service 1: Prêt Personnel */}
            <Col xs={24} sm={24} md={8}>
              <Card
                hoverable
                cover={<img alt="Prêt Personnel" src="/images/premium_photo-1.avif" style={{ height: '180px', objectFit: 'cover' }} />}
                style={{
                  borderRadius: '15px',
                  backgroundColor: '#fff',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Title level={4} style={{ color: '#2c3e50' }}>Prêt Personnel</Title>
                <Paragraph style={{ color: '#7f8c8d' }}>
                  Bénéficiez de notre service de prêt personnel avec des taux compétitifs et des options de remboursement flexibles.
                </Paragraph>
              </Card>
            </Col>

            {/* Service 2: Compte Bancaire */}
            <Col xs={24} sm={24} md={8}>
              <Card
                hoverable
                cover={<img alt="Compte Bancaire" src="/images/photo-15.avif" style={{ height: '180px', objectFit: 'cover' }} />}
                style={{
                  borderRadius: '15px',
                  backgroundColor: '#fff',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Title level={4} style={{ color: '#2c3e50' }}>Compte Bancaire</Title>
                <Paragraph style={{ color: '#7f8c8d' }}>
                  Ouvrez un compte bancaire chez nous et profitez de services bancaires modernes et d'une gestion simplifiée.
                </Paragraph>
              </Card>
            </Col>

            {/* Service 3: Crédits */}
            <Col xs={24} sm={24} md={8}>
              <Card
                hoverable
                cover={<img alt="Crédit" src="/images/CREDIT.jpg" style={{ height: '180px', objectFit: 'cover' }} />}
                style={{
                  borderRadius: '15px',
                  backgroundColor: '#fff',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  height: '100%',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-10px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Title level={4} style={{ color: '#2c3e50' }}>Crédits</Title>
                <Paragraph style={{ color: '#7f8c8d' }}>
                  Réalisez vos projets avec nos solutions de crédit personnalisées et adaptées à votre situation.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Section de contact */}
        <div style={{ width: '100%', maxWidth: '1200px', marginBottom: '40px' }}>
          <Card
            style={{
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              background: 'white',
            }}
          >
            <Title level={3} style={{ color: '#2c3e50', marginBottom: '25px', position: 'relative', paddingBottom: '15px' }}>
              Informations de contact
              <div style={{ position: 'absolute', bottom: 0, left: 0, width: '50px', height: '3px', background: accentGradient }}></div>
            </Title>

            <Row gutter={[30, 30]}>
              <Col xs={24} md={12}>
                <div style={{ marginBottom: '25px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <EnvironmentOutlined style={{ fontSize: '20px', color: accentColor, marginRight: '15px' }} />
                    <div>
                      <Text strong style={{ fontSize: '16px', color: '#2c3e50', display: 'block' }}>Adresse</Text>
                      <Text style={{ color: '#7f8c8d' }}>123 Avenue Mohammed V, Casablanca, Maroc</Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                    <PhoneOutlined style={{ fontSize: '20px', color: accentColor, marginRight: '15px' }} />
                    <div>
                      <Text strong style={{ fontSize: '16px', color: '#2c3e50', display: 'block' }}>Téléphone</Text>
                      <Text style={{ color: '#7f8c8d' }}>+212 5 22 43 21 00</Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MailOutlined style={{ fontSize: '20px', color: accentColor, marginRight: '15px' }} />
                    <div>
                      <Text strong style={{ fontSize: '16px', color: '#2c3e50', display: 'block' }}>Email</Text>
                      <Text style={{ color: '#7f8c8d' }}>baridbank@gmail.com</Text>
                    </div>
                  </div>
                </div>
              </Col>
              
              <Col xs={24} md={12}>
                {/* Horaires d'ouverture */}
                <Title level={4} style={{ color: '#2c3e50', marginBottom: '15px' }}>Horaires d'ouverture</Title>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Text style={{ color: '#7f8c8d' }}>Lundi - Vendredi</Text>
                  <Text strong style={{ color: '#2c3e50' }}>8h30 - 16h30</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: '#7f8c8d' }}>Samedi-Dimanche</Text>
                  <Text strong style={{ color: '#2c3e50' }}>Fermé</Text>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Section carte et adresse */}
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          <Card
            style={{
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              padding: 0,
            }}
           
          >
            <div style={{ width: '100%', height: '400px', position: 'relative' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53528.82979850831!2d-7.664557795897115!3d33.59113916137287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2855b9254c7%3A0x6ec6f26a00986894!2sAvenue%20Mohammed%20V%2C%20Casablanca%2C%20Maroc!5e0!3m2!1sfr!2sfr!4v1650985257599!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation"
              ></iframe>

              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                padding: '15px 25px',
                display: 'flex',
                alignItems: 'center',
              }}>
                <EnvironmentOutlined style={{ fontSize: '24px', color: accentColor, marginRight: '15px' }} />
                <div>
                  <Text strong style={{ fontSize: '16px', color: '#2c3e50', display: 'block' }}>Notre adresse</Text>
                  <Text style={{ color: '#7f8c8d' }}>123 Avenue Mohammed V, Casablanca, Maroc</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Section avantages */}
        <div style={{ width: '100%', maxWidth: '1200px', marginTop: '60px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  textAlign: 'center',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                }}
              >
                <CheckCircleOutlined style={{ fontSize: '48px', color: accentColor, marginBottom: '15px' }} />
                <Title level={4} style={{ color: '#2c3e50' }}>Équipe de professionnels</Title>
                <Paragraph style={{ color: '#7f8c8d' }}>
                  Une équipe d'experts financiers à votre service pour vous conseiller au mieux.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  textAlign: 'center',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                }}
              >
                <CheckCircleOutlined style={{ fontSize: '48px', color: accentColor, marginBottom: '15px' }} />
                <Title level={4} style={{ color: '#2c3e50' }}>Solutions personnalisées</Title>
                <Paragraph style={{ color: '#7f8c8d' }}>
                  Des solutions adaptées à votre situation personnelle et à vos objectifs.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  textAlign: 'center',
                  borderRadius: '15px',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                }}
              >
                <CheckCircleOutlined style={{ fontSize: '48px', color: accentColor, marginBottom: '15px' }} />
                <Title level={4} style={{ color: '#2c3e50' }}>Accompagnement continu</Title>
                <Paragraph style={{ color: '#7f8c8d' }}>
                  Un suivi personnalisé tout au long de la réalisation de vos projets.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </Layout.Content>
    </Layout>
  );
}