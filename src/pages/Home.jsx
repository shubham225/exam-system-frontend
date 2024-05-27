import React from 'react';
import { useNavigate } from 'react-router-dom';

import {Box, Button, Typography, Stack} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import useAuth from 'hooks/useAuth';

function Home() {
    const {token, setToken} = useAuth();
    const navigateTo = useNavigate();

    return (
            <Stack spacing={2} sx={{display: 'flex', alignItems : 'center'}}>
                <Typography variant="h4"> Welcome to Exam-Portal Home Page </Typography>
                <Typography variant="h7">
                    {(!token) ? "You are not Logged-in" : "You are logged in"}
                </Typography>
                {
                    (token) ? 
                        <Button 
                            variant="contained" 
                            size='large'
                            endIcon={<ArrowForwardIosIcon/>}
                            onClick={() => navigateTo('/dashboard')}
                        >
                           Dashboard
                        </Button> : 
                        <Stack direction='row'>
                            <Button variant="contained" 
                                size='large' 
                                endIcon={<LoginIcon/>}
                                sx={{mr : 2}} 
                                onClick={() => navigateTo('/login')} >
                                Sign in
                            </Button>

                            <Button variant="outlined" size='large' endIcon={<AssignmentIndIcon />} onClick={() => navigateTo('/register')} >
                                Register
                            </Button>
                        </Stack>
                }
            </Stack>
    )
}

export default Home;