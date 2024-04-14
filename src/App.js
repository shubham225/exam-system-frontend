import './App.css';
import React from 'react'
import { Routes, Route } from 'react-router-dom';  
import Home from './Routes/Home';
import Login from './Routes/Login';

function App() {
  return (
    <div className="App">
      <Routes>  
        <Route exact path='/' element={< Login />}></Route>  
        <Route exact path='/home' element={< Home />}></Route>  
    </Routes>  
    </div>
  );
}

export default App;
