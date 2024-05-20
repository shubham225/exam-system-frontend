import React from "react";
import { useNavigate } from 'react-router-dom'

import { AuthContext } from 'context/AuthContext';

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from "hooks/useAuth";

const NavBar = () => {
    // const { auth, setAuth } = React.useContext(AuthContext);
    const navigateTo = useNavigate();
    const {token, setToken} = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        setToken({});
        navigateTo('/');
    }

    return (
        <Paper elevation={6} sx= {{ borderRadius: '10px' }} >
            <Toolbar>
                <Typography variant="h6" component="div" onClick={() => {navigateTo('/');}}>
                    Exam-Portal
                </Typography>
                
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    
                </Typography>
                {
                    (token) && 
                    <Button 
                        color="inherit"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                }
            </Toolbar>
        </Paper>
    );
}


export default NavBar;