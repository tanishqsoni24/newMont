import './App.css';
import React from 'react';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/global/Navbar';
function App() {
  return (
    <Router>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
  );
}

export default App;
