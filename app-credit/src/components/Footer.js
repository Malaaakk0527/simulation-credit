import React from 'react';
import { Layout, Row, Col, Typography, Space, Divider } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { Footer: AntFooter } = Layout;
const { Title, Paragraph, Link, Text } = Typography;

const footerStyle = {
  background: 'linear-gradient(135deg, #2c3e50, #1e2a3a)',
  color: '#fff',
  padding: '60px 50px 40px',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 -5px 20px rgba(0, 0, 0, 0.08)'
};

const titleStyle = {
  color: '#fff',
  position: 'relative',
  paddingBottom: '12px',
  marginBottom: '20px',
  fontSize: '20px',
  fontWeight: 700
};

const titleAfterStyle = {
  content: '""',
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '40px',
  height: '3px',
  background: 'linear-gradient(90deg, #3498db, #1abc9c)',
  borderRadius: '1.5px'
};

const linkStyle = {
  color: '#f5f5f5',
  display: 'block',
  margin: '10px 0',
  transition: 'all 0.3s ease',
  fontSize: '15px'
};

const linkHoverStyle = {
  color: '#1abc9c',
  transform: 'translateX(5px)'
};

const contactItemStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '15px',
  fontSize: '15px'
};

const iconStyle = {
  marginRight: '10px',
  color: '#3498db',
  fontSize: '18px'
};

export default function Piedage() {
  return (
    <AntFooter style={footerStyle}>
      <Row gutter={[50, 30]}>
        {/* Colonne 1 : À propos */}
        <Col xs={24} sm={24} md={8}>
          <div>
            <Title level={4} style={titleStyle}>
              <div style={titleAfterStyle}></div>
              À propos
            </Title>
            <Paragraph style={{ color: '#bdc3c7', lineHeight: '1.8', fontSize: '15px' }}>
              Nous sommes une institution financière engagée à offrir des solutions adaptées à vos besoins. Notre objectif est de vous accompagner dans tous vos projets avec des services accessibles, transparents et de qualité.
            </Paragraph>
          </div>
        </Col>

        {/* Colonne 2 : Services */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={titleStyle}>
            <div style={titleAfterStyle}></div>
            Services
          </Title>
          <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
            <li>
              <Link 
                style={linkStyle} 
                href="#" 
                onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)} 
                onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
              >
                Crédit Immobilier
              </Link>
            </li>
            <li>
              <Link 
                style={linkStyle} 
                href="#" 
                onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)} 
                onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
              >
                Crédit Consommation
              </Link>
            </li>
            <li>
              <Link 
                style={linkStyle} 
                href="#" 
                onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)} 
                onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
              >
                Épargne & Investissement
              </Link>
            </li>
            <li>
              <Link 
                style={linkStyle} 
                href="#" 
                onMouseEnter={(e) => Object.assign(e.target.style, linkHoverStyle)} 
                onMouseLeave={(e) => Object.assign(e.target.style, linkStyle)}
              >
                Services Bancaires
              </Link>
            </li>
          </ul>
        </Col>

        {/* Colonne 3 : Contact */}
        <Col xs={24} sm={12} md={8}>
          <Title level={4} style={titleStyle}>
            <div style={titleAfterStyle}></div>
            Contact
          </Title>
          <div style={contactItemStyle}>
            <MailOutlined style={iconStyle} />
            <Text style={{ color: '#bdc3c7' }}>contact@financesolution.com</Text>
          </div>
          <div style={contactItemStyle}>
            <PhoneOutlined style={iconStyle} />
            <Text style={{ color: '#bdc3c7' }}>+212 5 22 43 21 00</Text>
          </div>
          <div style={contactItemStyle}>
            <EnvironmentOutlined style={iconStyle} />
            <Text style={{ color: '#bdc3c7' }}>123 Avenue Mohammed V, Casablanca</Text>
          </div>
        </Col>
      </Row>

      <Divider style={{ background: 'rgba(255, 255, 255, 0.1)', margin: '30px 0 20px' }} />

      {/* Copyright */}
      <div style={{ textAlign: 'center', padding: '10px 0', color: '#7f8c8d', fontSize: '14px' }}>
        © {new Date().getFullYear()} Finance Solution. Tous droits réservés.
      </div>
    </AntFooter>
  );
}
