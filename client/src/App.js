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
import Otp from './pages/Otp';
import Cookies from 'js-cookie'
import Admin from './pages/Admin';
import AdminPortal from './pages/AdminPortal';
import Viewuser from './pages/Viewuser';
import Recharge from './pages/Recharge';

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          {Cookies.get("session_id") && (<Route path="/" element={<React.Fragment><Navbar /><Home /><Footer /></React.Fragment>} />)}
          {Cookies.get("admin_session_id") && (<Route path="/administ/portal" element={<React.Fragment><AdminPortal /><Footer /></React.Fragment>} />)}
          {!Cookies.get("session_id") && (<Route path='/login' element={<Login />} />)}
          {Cookies.get("admin_session_id") && (<Route path='/administ/viewuser/:userId' element={<Viewuser />} />)}
          {Cookies.get("admin_session_id") && (<Route path='/administ/recharge/:userId' element={<Recharge/>} />)}
          {!Cookies.get("session_id") && (<Route path='/administ/login' element={<Admin/>} />)}
          {!Cookies.get("session_id") && (<Route path='/signup' element={<Signup />} />)}
          {!Cookies.get("session_id") && (<Route path="/forgot-password" element={<ForgotPassword />}/>)}
          {Cookies.get("session_id") && (<Route path='/vip' element={<React.Fragment><Navbar /><VIP /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/task' element={<React.Fragment><Navbar /><Task /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/team' element={<React.Fragment><Navbar /><Team /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/profile' element={<React.Fragment><Navbar /><Profile /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/orders' element={<React.Fragment><Navbar /><Orders /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/income' element={<React.Fragment><Navbar /><IncomingDetails /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/withdraw-record' element={<React.Fragment><Navbar /><WithdrawRecord /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/recharge-record' element={<React.Fragment><Navbar /><RechargeRecord /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/change-password' element={<React.Fragment><Navbar /><ChangePassword /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/add-card' element={<React.Fragment><Navbar /><AddBankCard /><Footer /></React.Fragment>} />)}
          {Cookies.get("session_id") && (<Route path='/bank-card' element={<React.Fragment><Navbar /><BankCard /><Footer /></React.Fragment>} />)}
          <Route path="/otp" element={<Otp/>} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
