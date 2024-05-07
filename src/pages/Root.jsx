import React from 'react';
import { Outlet } from 'react-router-dom'

import { Box } from '@mui/material';
import NavBar from 'components/NavBar';

function Root() {

    return (
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <Box 
                sx={{
                    pt: 1,
                    width: '90%',
                    height: '10%'
                }}
            >
                <NavBar />
            </Box>
            
            <Box 
                sx={{
                    py : 2,
                    width: '90%',
                    height: '90%'
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default Root;
