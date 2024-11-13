import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import SignIn from './pages/Login/SignIn';
import Registration from '../src/pages/register/Registration';
import Lander from './components/Lander';
import Dashboard from './pages/Dashboard/Dashboard';
import Services from './pages/Dashboard/sidebar-components/Services';
import About from './pages/Dashboard/sidebar-components/About';
import Contactus from './pages/Dashboard/sidebar-components/Contactus';
import Policy from './pages/Dashboard/sidebar-components/Policy';
import Support from './pages/Dashboard/sidebar-components/Support';
import Vacancy from './pages/Dashboard/sidebar-components/Vacancy';
import Notifications from './pages/Dashboard/Notification/Notifications';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import  { useState, useEffect } from 'react';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';


function App() {
  return (
    <Router>
      <div className='page-container'>
        <Header />
      </div>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path='/register' element={<Registration/>} />
        <Route path='/' element={<Lander/>}/>
        <Route path='/forget-password' element={<ForgetPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/vacancy" element={<Vacancy />} />
          <Route path="/support" element={<Support />} />
          <Route path='/notification' element={<Notifications/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
