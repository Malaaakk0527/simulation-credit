import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu, Input, Button, Form, Drawer } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ContactsOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false); // Pour basculer entre login et inscription

  // Gestion de l'ouverture du Drawer
  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  // Gestion de la fermeture du Drawer
  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  // Bascule entre inscription et connexion
  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Basculer entre inscription et connexion
  };

  const handleSubmit = (values) => {
    // Ajoutez votre logique de soumission ici, par exemple l'authentification ou l'inscription
    console.log(values);
  };

  // Menu Items
  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Accueil</Link>,
    },
    {
      key: '/account',
      icon: <UserOutlined />,
      label: <span onClick={showDrawer}>Mon Compte</span>,
    },
    {
      key: '/contact',
      icon: <ContactsOutlined />,
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  return (
    <Header
      style={{
        background: 'linear-gradient(to right, #003366, #0066cc)', // Dégradé de bleu
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Ombre portée subtile
      }}
    >
      {/* Logo et Texte de la Banque */}
      <div style={{ display: 'flex', alignItems: 'center', marginRight: '40px' }}>
        <img
          src="/images/téléchargement.jpeg" // Remplacer par le chemin vers votre image
          alt="BaridBank Logo"
          style={{
            width: '40px',
            height: 'auto',
            marginRight: '10px',
            objectFit: 'contain', // Assurer que l'image ne déforme pas
          }}
        />
        <div style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold' }}>
          BaridBank
        </div>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems} // Utilisation des items définis plus haut
        style={{
          background: 'transparent',
          flex: 1,
          borderBottom: 'none', // Enlever la bordure du bas de la navbar
        }}
      />

      {/* Drawer pour le formulaire de connexion ou inscription */}
      <Drawer
        open={isDrawerVisible}
        onClose={closeDrawer}
        width={400} // Vous pouvez ajuster la largeur du Drawer si nécessaire
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
          >
            <Input type="email" placeholder="Votre email" />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe!' }]}
          >
            <Input.Password placeholder="Votre mot de passe" />
          </Form.Item>

          <div style={{ marginBottom: '10px' }}>
            {isSignUp ? (
              <Button type="link" onClick={toggleForm}>Vous avez déjà un compte ? Connectez-vous</Button>
            ) : (
              <Button type="link" onClick={toggleForm}>Pas encore inscrit ? Créez un compte</Button>
            )}
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              {isSignUp ? 'S\'inscrire' : 'Se connecter'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Header>
  );
};
export default Navbar;