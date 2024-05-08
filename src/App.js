import React from 'react'
import AuthContextProvider from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './pages/Router';
import { CssBaseline } from '@mui/material';

function App() {

  return (    
    <AuthContextProvider>
      <div>
        <CssBaseline />
        <RouterProvider router={router} />
      </div>
    </AuthContextProvider>
  );
}

export default App;
