import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Input, Button, Form, Drawer, Typography, message } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ContactsOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header } = Layout;
const { Title } = Typography;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Si le token est invalide, on le supprime
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
    }
  };

  const showDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => {
    setIsDrawerVisible(false);
    form.resetFields();
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    form.resetFields();
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('http://localhost:8000/api/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }

    // Supprimer le token et les informations utilisateur
    localStorage.removeItem('token');
    setUser(null);
    message.success('Déconnexion réussie');
  };

  const handleSubmit = async (values) => {
    try {
      const requestData = isSignUp
        ? { ...values, nom: values.name }
        : values;

      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        message.success(isSignUp ? 'Inscription réussie' : 'Connexion réussie');
        closeDrawer();
        navigate('/history'); // Redirection vers la page historique après connexion
      } else {
        message.error(data.message || 'Une erreur est survenue');
      }
    } catch (error) {
      console.error('Erreur de connexion ou d\'inscription:', error);
      message.error('Erreur de connexion au serveur');
    }
  };

  const userMenuItems = user ? [
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label: <Link to="/history" style={{ color: 'black' }}>Historique</Link>,
    },
    {
      key: '/logout',
      icon: <LogoutOutlined />,
      label: <span onClick={handleLogout} style={{ cursor: 'pointer', color: 'black' }}>Déconnexion</span>,
    }
  ] : [];

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
        <span onClick={user ? null : showDrawer} style={{ cursor: 'pointer', color: 'black' }}>
          {user ? `Bonjour, ${user.nom}` : 'Mon Compte'}
        </span>
      ),
      children: userMenuItems.length > 0 ? userMenuItems : null,
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
          background: 'transparent',
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
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {isSignUp && (
            <Form.Item
              label="Nom"
              name="name"
              rules={[{ required: true, message: 'Veuillez entrer votre nom!' }]}>
              <Input placeholder="Votre nom" />
            </Form.Item>
          )}

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Veuillez entrer votre email !' }]}>
            <Input type="email" placeholder="baridbank@gmail.ma" />
          </Form.Item>

          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}>
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          {isSignUp && (
            <Form.Item
              label="Confirmer le mot de passe"
              name="password_confirmation"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Veuillez confirmer votre mot de passe !' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Les mots de passe ne correspondent pas !'));
                  },
                }),
              ]}>
              <Input.Password placeholder="••••••••" />
            </Form.Item>
          )}

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
              }}>
              {isSignUp ? "S'inscrire" : 'Se connecter'}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Header>
  );
};

export default Navbar;
