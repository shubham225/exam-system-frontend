import React from 'react'
import AuthContext from "../../Context/AuthContext/AuthContext";
import request, { setAuthToken } from "../../Utils/AxiosHelper";
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassowrd] = React.useState('');

    const {setAuth} = React.useContext(AuthContext);

    const navigateTo = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        request(
            "POST",
            "/auth/login",
            {
                username : username,
                password : password
            }
        ).then((response) => {
            setAuthToken(response.data.token);
            console.log("login : " + JSON.stringify(response.data));
            setAuth(response.data);
            navigateTo("/home")
        }).catch((error) => {
            setAuth({});
            window.localStorage.removeItem("auth_token");
            console.log("error" + error);
        });
    }

    return (
        <>
        <Box 
            sx={{
                height: '100%',
                flexGrow: 1,
                alignContent: 'center',
                flex: 'column'
            }}
        >
            <div className="login-container">
                <div className="form-container">
                    <form onSubmit={handleLogin} >
                        <h1>Sign In</h1>
                        <label for="email">Email or phone number</label>
                        <input type="text" id="email" name="email" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} required />

                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" 
                            value={password} 
                            onChange={(e) => setPassowrd(e.target.value)} required />
                        <input type="submit" value="Sign In" />
                    </form> 
                    <p className="signup-link">Don't have an Account? <Link to={"/home"}>Register now</Link>.</p>
                    <p className="help-link">Forgot your email or password? <a href="/home">Click here</a>.</p>
                </div>
            </div> 
        </Box>
        </>
      );
}


export default Login;
