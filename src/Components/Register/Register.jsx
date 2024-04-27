import React from 'react'
import { Link as RouterLink } from 'react-router-dom';

import {Box, 
        Paper,
        Typography} from '@mui/material';
import RegisterationForm from '../RegistrationForm/RegistrationForm';

function Register() {

    return (
        <Box 
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Paper elevation={3}
                sx= {{
                        height: '70%',
                        width: '60%',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start'
                    }}
            >
                <Box
                    padding={3}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Typography variant='h4'>       
                            Registration
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow : 1
                        }}
                    >
                        <RegisterationForm />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse'
                        }}
                    >
                        <Typography variant='h9' padding={1}>
                            Already have an Account? <RouterLink to={'/login'}>Sign in</RouterLink>.
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
      );
}


export default Register;