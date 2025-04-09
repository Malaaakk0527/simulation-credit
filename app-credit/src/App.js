import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css'; // Importer le style Ant Design

// Importation des composants
import Home from './components/Home';
import Contact from './components/Contact';
import Simulation2 from './components/Simulation2';
import SimulationConsommation from './components/SimulationConsommation';
import Navbar from './components/Navbar'; // Importer ta navbar personnalisée

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
       
        <Navbar />

        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulation-consommation" element={<SimulationConsommation />} />
            <Route path="/simulation-immobilier" element={<Simulation2 />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Content>

        <Footer style={{ textAlign: 'center' }}>©2025 Your Bank Name</Footer>
      </Layout>
    </Router>
  );
}

export default App;
