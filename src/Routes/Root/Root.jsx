import React from 'react';
import { Outlet } from 'react-router-dom'
import NavigationBar from '../../Components/NavigationBar';
import WindowContextProvider from '../../Context/WindowContext/WindowContextProvider';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

function Root() {

    return (
        <WindowContextProvider>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Box 
                    sx={{
                        mt: 1,
                        width: '90%',
                        height: '10vh',
                        display: 'flex'
                    }}
                >
                    <NavigationBar />
                </Box>
                
                <Box 
                    sx={{
                        my : 2,
                        width: '90%',
                        height: '84vh',
                        display: 'flex'
                    }}
                >
                    <Outlet />
                </Box>
            </Box>
        </WindowContextProvider>
    )
}

export default Root;
