import React from 'react';

import useAuth from 'hooks/useAuth';

import { Outlet } from 'react-router-dom';

import Login from './Login';

function ProtectedRoutes() {
    const {token, setToken} = useAuth();
    
    if (!token) {
        return (<Login />)
    } 

  return (
    <Outlet />
  )
}

export default ProtectedRoutes