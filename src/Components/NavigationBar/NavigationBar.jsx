import React from "react";
import './NavigationBar.css'

import AuthContext from '../../Context/AuthContext/AuthContext';
import {useNavigate} from 'react-router-dom'

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

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

    const buttons = [
        <Button key="login">Login</Button>,
        <Button key="register">Register</Button>,
      ];

    return (
        <>
        <div className="navbar">
            <div className="navbar-wrapper">
                <div className="nav-left">
                    <span className="logo">Test</span>
                </div>

                <ButtonGroup color="primary" aria-label="Medium-sized button group">
                    {buttons}
                </ButtonGroup>
        
                <div className="nav-right">
                {!auth && ((showLogin) ? <span id='login' className='top-avatar' onClick={handleClick}>Login</span>
                                     : <span id='login' className='top-avatar' onClick={handleClick}>Register</span>)}
                </div>
            </div>
        </div>
        </>
    );
}


export default NavigationBar;