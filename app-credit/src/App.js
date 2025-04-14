import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "antd";
import "antd/dist/reset.css";

import Home from "./components/Home";
import Contact from "./components/Contact";
import CreditForm from "./components/CreditForm";
import Navbar from "./components/Navbar";
import Piedage from "./components/Footer";
import History from './components/History';

function App() {
  return (
    <Router>
      <Layout>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* Route dynamique : type de crédit dans l'URL */}
          <Route path="/simulation/:creditType" element={<CreditForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/history" element={<History />} />
        </Routes>

        <Piedage />
      </Layout>
    </Router>
  );
}

export default App;
