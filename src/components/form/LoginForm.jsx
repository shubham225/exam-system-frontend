import React from 'react';

import { useNavigate, Link as RouterLink } from 'react-router-dom';

import useAuth from 'hooks/useAuth'; 
import useAlert from 'hooks/useAlert';

import {Box, 
        TextField,
        Typography,
        Button,
        Stack} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';

import AuthService from 'services/AuthService';

function LoginForm() {

    const [username, setUsername] = React.useState('');
    const [password, setPassowrd] = React.useState('');
    const [disableLogin, setDisableLogin] = React.useState(false);

    const {token, setToken} = useAuth();
    const {setAlert} = useAlert();

    const navigateTo = useNavigate();

    React.useEffect(() => {
        if (token) {
            navigateTo('/dashboard');
        }
    }, []);

    const loginWithCredentials = React.useCallback(async (creds) => {
        try {
            setDisableLogin(true);
            const data = await AuthService.loginWithEmailIdPassword(creds); 
            setToken(data);

            if(data) {
                navigateTo('/dashboard');
                navigateTo(0);
            }
            setDisableLogin(false);
        }catch(error) {
            setToken({});
            setAlert(error, 'error');
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const creds = {username : username, password : password};
        loginWithCredentials(creds);
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
                <Button disabled={disableLogin} variant="contained" type='submit' endIcon={<LoginIcon />} >
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
