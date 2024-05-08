import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import { AuthContext } from "context/AuthContext";
import request, { setAuthToken } from "utils/AxiosHelper";

import {Box, 
        TextField,
        Typography,
        Button,
        Alert,
        Stack} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassowrd] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('');

    const {setAuth} = React.useContext(AuthContext);

    const navigateTo = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMsg('');
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
            navigateTo("/dashboard")
        }).catch((error) => {
            setAuth(null);
            setErrorMsg(error.message + " : " +  error.response.data.message);
            window.localStorage.removeItem("auth_token");
            console.log("error" + JSON.stringify(error));
        });
    }


    return (
        <Box component='form' onSubmit={(event) => handleLogin(event)}>
            {
                (errorMsg) && 
                <Alert severity="error" color="error">
                    {errorMsg}
                </Alert>
            } 

            <Stack spacing={3} padding={4} >
                <TextField
                    id="standard-search"
                    label="Username"
                    type="search"
                    variant="standard"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    required
                    value={password}
                    onChange={(e) => setPassowrd(e.target.value)}
                />
                <Button variant="contained" type='submit' endIcon={<LoginIcon />} >
                    Sign In
                </Button>
                <Typography variant='h9' padding={1}>
                    Don't have an Account? <RouterLink to={'/register'}>Register now</RouterLink>.
                </Typography>
            </Stack>
        </Box>
    );
}

export default Login;
