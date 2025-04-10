import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/reset.css'; // Importation le style Ant Design

// Importation des composants
import Home from './components/Home';
import Contact from './components/Contact';
import SimulationImmobillier from './components/SimulationImmobillier';
import SimulationConsommation from './components/SimulationConsommation';
import Navbar from './components/Navbar'; 
import Piedage from './components/Footer';

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulation-consommation" element={<SimulationConsommation />} />
            <Route path="/simulation-Immobillier" element={<SimulationImmobillier />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        
           <Piedage/>
      </Layout>
    </Router>
  );
}

export default App;
