import './App.css';
import React from 'react';
import Home from './pages/Home';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<h1>Not Found</h1>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
