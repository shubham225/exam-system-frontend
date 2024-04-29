import React from 'react'
import AuthContext from "../../Context/AuthContext/AuthContext";
import request, { setAuthToken } from "../../Utils/AxiosHelper";
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import {Box, 
        Paper,
        TextField,
        Typography,
        Button,
        Alert,
        Stack} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import MediumWindow from '../Layouts/MediumWindow';

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
        <MediumWindow>
            <Box 
                sx={{
                    height: '100%',
                    width: '40%',
                    display: 'flex',
                    bgcolor: 'lightblue'
                }}
            >
                <Typography variant='h4' padding={1}>
                    
                </Typography>
            </Box>

            <Box 
                component='form' noValidate
                sx={{
                    height: '100%',
                    width: '60%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                {
                    (errorMsg) && 
                    <Alert severity="error" color="error">
                        {errorMsg}
                    </Alert>
                } 

                <Typography variant='h4' padding={1}>
                    Sign In
                </Typography>
                <Stack spacing={3} 
                    padding={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <TextField
                        id="standard-search"
                        label="Username"
                        type="search"
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id="standard-password-input"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassowrd(e.target.value)}
                    />
                    <Button variant="contained" type='submit' endIcon={<LoginIcon />} onClick={handleLogin}>
                        Sign In
                    </Button>
                    <Typography variant='h9' padding={1}>
                        Don't have an Account? <RouterLink to={'/register'}>Register now</RouterLink>.
                    </Typography>
                </Stack>
            </Box>
        </MediumWindow>
      );
}

export default Login;
