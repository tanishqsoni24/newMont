import './App.css';
import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VIP from './pages/VIP';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from './components/global/Navbar';
import Task from './pages/Task';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import IncomingDetails from './pages/IncomeDetails';
import Footer from './components/general/Footer';


function App() {
  return (
    <React.Fragment>
      <Router>
      <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<h1>Not Found</h1>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path='/vip' element={<VIP/>} />
          <Route path='/task' element={<Task/>} />
          <Route path='/team' element={<Team/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/orders' element={<Orders/>} />
          <Route path='/income' element={<IncomingDetails/>} />
        </Routes>
        <Footer/>
      </Router>
      
    </React.Fragment>
  );
}

export default App;
