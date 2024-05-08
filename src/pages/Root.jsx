import React from 'react';
import { Outlet } from 'react-router-dom'

import { Box, Container, CssBaseline, Grid } from '@mui/material';
import NavBar from 'components/NavBar';
import { Height } from '@mui/icons-material';

function Root() {

    return (
        <Container fixed maxWidth={false} sx={{width: '100vw', height: '100vh'}}>
            <Box pt={1} height='10%' >
                <NavBar />
            </Box>
            <Box display='flex' py={2} height='90%' width='100%' alignItems='center' justifyContent='center' >
                <Outlet />
            </Box>
        </Container>
    )
}

export default Root;
