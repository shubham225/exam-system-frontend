import React from "react";
// import './NavigationBar.css'

import AuthContext from '../../Context/AuthContext/AuthContext';
import {useNavigate} from 'react-router-dom'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { MenuPaper } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const NavigationBar = () => {
    const [showLogin, setShowLogin] = React.useState(true);
    const { auth } = React.useContext(AuthContext);
    const navigateTo = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        setShowLogin(!showLogin);
        console.log(e.target.id);
        (showLogin) ? navigateTo('/login') : navigateTo('/register');
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
                    <Typography variant="h6" component="div">
                        Exam-Portal
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        
                    </Typography>
                    <Button 
                        color="inherit"
                        onClick={handleClick}
                    >
                    {(showLogin) ? "Login" : "Register"}
                    </Button>
                </Toolbar>
            </Paper>
        </>
    );
}


export default NavigationBar;