import React from 'react';

import { Link as RouterLink } from 'react-router-dom';

import MediumWindow from 'layouts/MediumWindow';

import RegisterationForm from 'components/form/RegistrationForm';

import { Box, Typography } from '@mui/material';

function Register() {

    return (
        <MediumWindow>
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
        </MediumWindow>
      );
}


export default Register;