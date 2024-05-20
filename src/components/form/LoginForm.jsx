import React, { useCallback } from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {Box, 
        TextField,
        Typography,
        Button,
        Stack} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import AuthService from 'services/AuthService';
import useAuth from 'hooks/useAuth'; 
import useAlert from 'hooks/useAlert';

function LoginForm() {

    const [username, setUsername] = React.useState('');
    const [password, setPassowrd] = React.useState('');

    const {token, setToken} = useAuth();
    const {setAlert} = useAlert();

    const navigateTo = useNavigate();

    const loginWithCredentials = useCallback(async (creds) => {
        try {
            const data = await AuthService.loginWithEmailIdPassword(creds); 
            setToken(data);
        }catch(error) {
            setToken({});
            setAlert(error, 'error');
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const creds = {username : username, password : password};
        loginWithCredentials(creds);
        console.log("Token ", token)
        if(token) {
            console.log("Token ", token)
            navigateTo('/dashboard');
            navigateTo(0);
        }
    };

    return (
        <Box component='form' onSubmit={(event) => handleLogin(event)}>
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

export default LoginForm;
