import './App.css';
import React from 'react'
import AuthContextProvider from './Context/AuthContextProvider';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Router';

function App() {

  return (
    <AuthContextProvider>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </AuthContextProvider>
  );
}

export default App;