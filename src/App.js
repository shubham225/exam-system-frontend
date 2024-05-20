import React from 'react'
import AuthContextProvider from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './pages/Router';
import { CssBaseline } from '@mui/material';
import AlertContextProvider from 'context/AlertContext';

function App() {

  return (    
    <AuthContextProvider>
      <AlertContextProvider>
        <div>
          <CssBaseline />
          <RouterProvider router={router} />
        </div>
      </AlertContextProvider>
    </AuthContextProvider>
  );
}

export default App;
