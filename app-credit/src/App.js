import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";
import History from "./components/History";
import Contact from "./components/Contact";
import Piedage, { Footer } from "./components/Footer";
import CreditForm from "./components/CreditForm";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Réinitialiser l'état user
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/simulation/:creditType" element={<CreditForm />} />
        <Route path="/history" element={<History />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Piedage />
    </Router>
  );
}

export default App;