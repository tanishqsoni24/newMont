import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import VIP from './pages/VIP';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/global/Navbar';
import Task from './pages/Task';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import IncomingDetails from './pages/IncomeDetails';
import Footer from './components/general/Footer';
import WithdrawRecord from './pages/WithdrawRecord';
import RechargeRecord from './pages/RechargeRecord';
import ChangePassword from './pages/ChangePassword';
import AddBankCard from './pages/AddBankCard';
import BankCard from './pages/BankCard';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<React.Fragment><Navbar /><Home /><Footer /></React.Fragment>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />}/>
          <Route path='/vip' element={<React.Fragment><Navbar /><VIP /><Footer /></React.Fragment>} />
          <Route path='/task' element={<React.Fragment><Navbar /><Task /><Footer /></React.Fragment>} />
          <Route path='/team' element={<React.Fragment><Navbar /><Team /><Footer /></React.Fragment>} />
          <Route path='/profile' element={<React.Fragment><Navbar /><Profile /><Footer /></React.Fragment>} />
          <Route path='/orders' element={<React.Fragment><Navbar /><Orders /><Footer /></React.Fragment>} />
          <Route path='/income' element={<React.Fragment><Navbar /><IncomingDetails /><Footer /></React.Fragment>} />
          <Route path='/withdraw-record' element={<React.Fragment><Navbar /><WithdrawRecord /><Footer /></React.Fragment>} />
          <Route path='/recharge-record' element={<React.Fragment><Navbar /><RechargeRecord /><Footer /></React.Fragment>} />
          <Route path='/change-password' element={<React.Fragment><Navbar /><ChangePassword /><Footer /></React.Fragment>} />
          <Route path='/add-card' element={<React.Fragment><Navbar /><AddBankCard /><Footer /></React.Fragment>} />
          <Route path='/bank-card' element={<React.Fragment><Navbar /><BankCard /><Footer /></React.Fragment>} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
