import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';

const ProtectedRoute = () => {
    const auth=localStorage.getItem('authtoken')
    console.log(auth)
  return auth ? 
    <div className='body-layout'>
        <Sidebar/>
        <div className='outlet'>
            <Outlet />
        </div> 
    </div>
    : 
    <Navigate to="/signin" />;
};

export default ProtectedRoute;
