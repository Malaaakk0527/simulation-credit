import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Input, Button, Form, Drawer, Typography } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const location = useLocation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);
  const toggleForm = () => setIsSignUp(!isSignUp);

  const handleSubmit = (values) => {
    console.log(values);
  };

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/" style={{ color: 'black' }}>Accueil</Link>,  
    },
    {
      key: '/account',
      icon: <UserOutlined />,
      label: (
        <span onClick={showDrawer} style={{ cursor: 'pointer', color: 'black' }}>  
          Mon Compte
        </span>
      ),
    },
    {
      key: '/contact',
      icon: <ContactsOutlined />,
      label: <Link to="/contact" style={{ color: 'black' }}>Contact</Link>,  
    },
  ];
  

  return (
    <Header
    style={{
      background: 'yellow',  
      display: 'flex',
      alignItems: 'center',
      padding: '0 30px',
      height: '70px',
      boxShadow: '0 2px 12px, #A76844',
      zIndex: 1000,
    }}
  >
    {/* Logo & Nom Banque */}
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
      <img
        src="/images/téléchargement.jpeg"
        alt="SimuCredit Logo"
        style={{
          width: '50px',
          height: '50px',
          marginRight: '12px',
        }}
      />
      <div style={{ color: '#1a2238', fontSize: '22px', fontWeight: 'bold', letterSpacing: '1px' }}>
        BaridBank
      </div>
    </div>
  
    {/* Menu principal */}
    <Menu
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={menuItems}
      style={{
        background: 'transparent',  // Garde le fond du menu transparent
        flex: 1,
        justifyContent: 'end',
        fontWeight: '500',
        fontSize: '16px',
        borderBottom: 'none',
      }}
    />
  
    {/* Drawer : Connexion / Inscription */}
    <Drawer
      title={
        <Title level={4} style={{ marginBottom: 0 }}>
          {isSignUp ? 'Créer un compte' : 'Connexion'}
        </Title>
      }
      placement="right"
      open={isDrawerVisible}
      onClose={closeDrawer}
      width={400}
    >
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Veuillez entrer votre email !' }]}
        >
          <Input type="email" placeholder="baridbank@gmail.ma" />
        </Form.Item>
  
        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
        >
          <Input.Password placeholder="••••••••" />
        </Form.Item>
  
        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
          <Button type="link" onClick={toggleForm} style={{ padding: 0 }}>
            {isSignUp ? 'Déjà inscrit ? Se connecter' : 'Pas encore inscrit ? Créer un compte'}
          </Button>
        </div>
  
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              backgroundColor: '#21e6c1',
              borderColor: '#21e6c1',
              color: '#1a2238',
              fontWeight: 'bold',
            }}
          >
            {isSignUp ? "S'inscrire" : 'Se connecter'}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  </Header>
  
  );
};

export default Navbar;
