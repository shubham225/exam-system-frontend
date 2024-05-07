import React from 'react';
import { Outlet } from 'react-router-dom'
import NavigationBar from 'components/NavigationBar';
import WindowContextProvider from 'context/WindowContext/WindowContextProvider';

import { Box } from '@mui/material';
function Root() {

    return (
        <WindowContextProvider>
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
                    <NavigationBar />
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
        </WindowContextProvider>
    )
}

export default Root;
