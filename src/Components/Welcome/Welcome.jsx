import React from 'react'
import AuthContext from '../../Context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

import {Box, Paper, Button, Typography} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

function Welcome() {
    const {auth} = React.useContext(AuthContext);
    const navigateTo = useNavigate();

    return (
        <>
            <Typography variant="h2" paddingY={2} >
                Exam-Portal Home Page
            </Typography>
            <Typography variant="h5" paddingY={2} >
                {(!auth) ? "You are not Logged-in, Login or Register to continue" : "you are logged in"}
            </Typography>
            {
                (auth) ? <Button 
                        variant="outlined" 
                        endIcon={<ArrowForwardIosIcon/>}
                        onClick={() => navigateTo('/dashboard')}
                    >
                        Go to Dashboard
                    </Button> : 
                    (<Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Button
                            variant="outlined" 
                            endIcon={<LoginIcon/>}
                            onClick={() => navigateTo('/login')}
                        >
                            Sign in
                        </Button>

                        <Typography variant="h5" paddingX={3} paddingY={2}>OR</Typography>

                        <Button
                            variant="outlined" 
                            endIcon={<AssignmentIndIcon />}
                            onClick={() => navigateTo('/register')}
                        >
                            Register
                        </Button>
                    </Box>
                    )
            }
        </>
      );
}


export default Welcome;
