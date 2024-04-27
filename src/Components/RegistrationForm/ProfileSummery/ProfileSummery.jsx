import React from 'react'

import {Box, 
        Stack,
        Grid,  
        Button,
        TextField,
        Typography} from '@mui/material';

function ProfileSummery() {

    return (
        <Box component='form' noValidate sx={{width:'100%'}}>
            <Stack spacing={3} 
                padding={4}
            >
                <Button variant="contained" type='submit'>
                    Register
                </Button>
            </Stack>
        </Box>
      );
}


export default ProfileSummery;