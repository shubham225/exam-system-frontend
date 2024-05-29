import React from "react";

import { useNavigate } from 'react-router-dom';

import {Box, 
        Button,
        Typography} from '@mui/material';

import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

const NoAuthorization = () => {
    const navigateTo = useNavigate();

    return(
        <Box 
            sx={{
                height: '100%',
                alignContent: 'center'
            }}
        >
            <Typography variant="h4" padding={2}>
                User do not have Authorizations to view this page.
            </Typography>
            <Box
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
        </Box>
    )
}

export default NoAuthorization;