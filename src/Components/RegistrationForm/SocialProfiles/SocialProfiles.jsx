import React from 'react'

import {Box, 
        Stack,
        Grid,  
        Button,
        TextField,
        Typography} from '@mui/material';

function SocialProfiles() {

    return (
        <Box component='form' noValidate sx={{width:'100%'}}>
            <Stack spacing={3} 
                padding={4}
                sx={{
                    display: 'flex',
                }}
            >
                <TextField
                    id="standard-search"
                    label="Username"
                    type="search"
                    variant="standard"
                />
                <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                />
                <Button variant="contained" type='submit'>
                    Sign In
                </Button>
            </Stack>
        </Box>
      );
}


export default SocialProfiles;