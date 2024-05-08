import React from 'react'
import { useNavigate, Link as RouterLink } from 'react-router-dom';

import MediumWindow from 'layouts/MediumWindow';

import LoginForm from 'components/form/LoginForm';

import {Grid,
        Typography,
        Divider} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';

function Login() {
    return (
        <MediumWindow>
            <Grid container height='100%' direction='row'>
                <Grid item xs={0} lg={6} bgcolor='lightskyblue'>
                    <Divider orientation="vertical" variant="fullWidth" />
                </Grid>
                <Grid item xs={12} lg={6} >
                    <Typography variant='h4' padding={2} align='center'> Sign In </Typography>
                    <LoginForm />
                </Grid>
            </Grid>

            
        </MediumWindow>
      );
}

export default Login;
