import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow'

import {Box, Button, Typography, Stack} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function Home() {
    const { auth } = React.useContext(AuthContext);
    const navigateTo = useNavigate();

    return (
        // <LargeWindow>
            <Stack spacing={2}>
                <Typography variant="h2"> Exam-Portal Home Page </Typography>
                <Typography variant="h5">
                    {(!auth) ? "You are not Logged-in, Login or Register to continue" : "you are logged in"}
                </Typography>
                {
                    (auth) ? 
                        <Button 
                            variant="outlined" 
                            endIcon={<ArrowForwardIosIcon/>}
                            onClick={() => navigateTo('/dashboard')}
                        >
                            Go to Dashboard
                        </Button> : 
                        <Stack direction='row'>
                            <Button variant="outlined" endIcon={<LoginIcon/>} onClick={() => navigateTo('/login')} >
                                Sign in
                            </Button>

                            <Typography variant="h5" paddingX={3} paddingY={2}>OR</Typography>

                            <Button variant="outlined" endIcon={<AssignmentIndIcon />} onClick={() => navigateTo('/register')} >
                                Register
                            </Button>
                        </Stack>
                }
            </Stack>
        // </LargeWindow>
    )
}

export default Home;