import React from 'react'
import AuthContextProvider from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import router from './pages/Router';

function App() {

  return (    
    <AuthContextProvider>
      <div>
        <RouterProvider router={router} />
      </div>
    </AuthContextProvider>
  );
}

export default App;
