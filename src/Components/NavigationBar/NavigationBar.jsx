import React from "react";

import AuthContext from '../../Context/AuthContext/AuthContext';
import {useNavigate} from 'react-router-dom'

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NavigationBar = () => {
    const { auth, setAuth } = React.useContext(AuthContext);
    const navigateTo = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        setAuth(null);
        window.localStorage.removeItem("auth_token");
        navigateTo('/');
    }

    return (
        <>
            <Paper
                elevation={3}
                sx= {{
                        flexGrow: 1,
                        alignContent: 'center',
                        borderRadius: '10px'
                    }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" onClick={() => {navigateTo('/');}}>
                        Exam-Portal
                    </Typography>
                    
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        
                    </Typography>
                    {
                        (auth) && 
                        <Button 
                            color="inherit"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    }
                </Toolbar>
            </Paper>
        </>
    );
}


export default NavigationBar;