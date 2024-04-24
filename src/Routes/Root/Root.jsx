import React from 'react';
import './Root.css'
import { Outlet, useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext';

function Root() {
    const [showLogin, setShowLogin] = React.useState(true);
    const { auth } = React.useContext(AuthContext);
    const navigateTo = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        setShowLogin(!showLogin);
        console.log(e.target.id);
        (showLogin) ? navigateTo("/") : navigateTo("/register");
    }

    return (
        <>
        <div className="topbar">
            <div className="topbar-wrapper">
                <div className="topleft">
                    <span className="logo">Online Test</span>
                </div>
        
                <div className="top-right">
                {!auth && ((showLogin) ? <span id='login' className='top-avatar' onClick={handleClick}>Login</span>
                                     : <span id='login' className='top-avatar' onClick={handleClick}>Register</span>)}
                </div>
            </div>
        </div>

        <Outlet />
        </>
    )
}

export default Root;
