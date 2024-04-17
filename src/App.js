import './App.css';
import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';  
import Home from './Routes/Home';
import Login from './Routes/Login';
import UserContext from './Context/UserContext';

function App() {
  const [user, setUser] = React.useState({isAuthenticated : false});
  let location = useLocation();

  return (
    <div className="App">
      <UserContext.Provider value= {{ user, setUser }}>
        <Routes>  
          <Route 
            exact path='/login' 
            element={< Login />}>
          </Route>  
          <Route 
            exact path='/home' 
            element={user.isAuthenticated ? (
                      < Home />
                    ) : (
                      <Login />
                    )}>
          </Route>  
        </Routes>  
      </UserContext.Provider>
    </div>
  );
}

export default App;
