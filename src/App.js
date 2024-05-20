import React from 'react'
import AppContextProvider from './context/AppContext';
import { RouterProvider } from 'react-router-dom';
import router from './pages/Router';
import { CssBaseline } from '@mui/material';
import AlertContextProvider from 'context/AlertContext';

function App() {

  return (    
    <AppContextProvider>
      <AlertContextProvider>
        <div>
          <CssBaseline />
          <RouterProvider router={router} />
        </div>
      </AlertContextProvider>
    </AppContextProvider>
  );
}

export default App;
