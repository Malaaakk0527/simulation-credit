// Navbar.js
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2'; 
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Input,
  Button,
  Form,
  Drawer,
  Typography,
  message,
} from "antd";
import axios from "../utils/axiosConfig";
import {
  HomeOutlined,
  UserOutlined,
  ContactsOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const { Header } = Layout;
const { Title } = Typography;

// Axios config
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

// Add CSRF token to all requests
axios.interceptors.request.use(function (config) {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute("content");
  config.headers["X-CSRF-TOKEN"] = token;
  return config;
});

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserInfo(token);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      localStorage.removeItem("token");
      setUser(null);
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
      const token = localStorage.getItem("token");
      if (token) {
        // Ici, on effectue une simple requête de déconnexion pour invalider la session côté serveur
        await axios.post("/api/logout", null, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Suppression du token uniquement côté client
        localStorage.removeItem("token");
        setUser(null);
        message.success("Déconnexion réussie");
        navigate("/"); // Redirection vers la page d'accueil ou autre
      }
    } catch {
      message.error("Erreur lors de la déconnexion");
    }
  };
  

  // Assure-toi d'importer SweetAlert

const handleSubmit = async (values) => {
  try {
    // Get CSRF cookie first
    await axios.get("/sanctum/csrf-cookie", {
      withCredentials: true,
    });

    const endpoint = isSignUp ? "/api/register" : "/api/login";
    const payload = isSignUp
      ? {
          nom: values.name,
          email: values.email,
          password: values.password,
          password_confirmation: values.password_confirmation,
        }
      : {
          email: values.email,
          password: values.password,
        };

    const response = await axios.post(endpoint, payload, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      withCredentials: true,
    });

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      Swal.fire({
        title: isSignUp ? "Inscription réussie" : "Connexion réussie",
        icon: "success",
        confirmButtonText: "Ok",
      });
      closeDrawer();
      navigate("/history");
    } else {
      Swal.fire({
        title: "Erreur",
        text: response.data.message || "Erreur inconnue",
        icon: "error",
        confirmButtonText: "Réessayer",
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    Swal.fire({
      title: "Erreur",
      text: error.response?.data?.message || "Erreur de connexion",
      icon: "error",
      confirmButtonText: "Réessayer",
    });
  }
};


  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Accueil</Link>,
    },
    {
      key: "/account",
      icon: <UserOutlined />,
      label: user ? (
        `Bonjour, ${user.name}`
      ) : (
        <span onClick={showDrawer} style={{ cursor: "pointer" }}>
          Mon Compte
        </span>
      ),
      children: user && [
        {
          key: "/history",
          icon: <HistoryOutlined />,
          label: <Link to="/history">Historique</Link>,
        },
        {
          key: "/logout",
          icon: <LogoutOutlined />,
          label: (
            <span onClick={handleLogout} style={{ cursor: "pointer" }}>
              Déconnexion
            </span>
          ),
        },
      ],
    },
    {
      key: "/contact",
      icon: <ContactsOutlined />,
      label: <Link to="/contact">Contact</Link>,
    },
  ];

  return (
    <Header
      style={{
        background: "yellow",
        display: "flex",
        alignItems: "center",
        padding: "0 30px",
        height: "70px",
      }}>
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "40px" }}>
        <img
          src="/images/téléchargement.jpeg"
          alt="Logo"
          style={{ width: 50, height: 50, marginRight: 12 }}
        />
        <div style={{ fontSize: 22, fontWeight: "bold", color: "#1a2238" }}>
          BaridBank
        </div>
      </div>

      <Menu
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{
          background: "transparent",
          flex: 1,
          justifyContent: "end",
          fontWeight: 500,
          fontSize: 16,
        }}
      />

      <Drawer
        title={
          <Title level={4}>{isSignUp ? "Créer un compte" : "Connexion"}</Title>
        }
        placement="right"
        open={isDrawerVisible}
        onClose={closeDrawer}
        width={400}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {isSignUp && (
            <Form.Item
              label="Nom"
              name="name"
              rules={[
                { required: true, message: "Veuillez entrer votre nom" },
              ]}>
              <Input placeholder="Votre nom" />
            </Form.Item>
          )}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Veuillez entrer votre email" },
            ]}>
            <Input type="email" placeholder="ex: user@example.com" />
          </Form.Item>
          <Form.Item
            label="Mot de passe"
            name="password"
            rules={[
              { required: true, message: "Veuillez entrer votre mot de passe" },
            ]}>
            <Input.Password />
          </Form.Item>
          {isSignUp && (
            <Form.Item
              label="Confirmation du mot de passe"
              name="password_confirmation"
              rules={[
                {
                  required: true,
                  message: "Veuillez confirmer le mot de passe",
                },
              ]}>
              <Input.Password />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isSignUp ? "Créer un compte" : "Se connecter"}
            </Button>
            <Button type="link" onClick={toggleForm} block>
              {isSignUp
                ? "Déjà inscrit ? Se connecter"
                : "Pas encore de compte ? S'inscrire"}
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Header>
  );
};

export default Navbar;
