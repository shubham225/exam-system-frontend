import React from 'react';
import { Outlet } from 'react-router-dom'

import { Box, Container, CssBaseline, Grid } from '@mui/material';
import NavBar from 'components/NavBar';
import { Height } from '@mui/icons-material';
import { AlertContext } from 'context/AlertContext';
import AlertSnackBar from 'components/ui/AlertSnackBar';

function Root() {
    const {alert, setAlert} = React.useContext(AlertContext);

    return (
        <Container fixed maxWidth={false} sx={{width: '100vw', height: '100vh'}}>
            <Box pt={1} height='10%' >
                <NavBar />
            </Box>
            <Box display='flex' py={2} height='90%' width='100%' alignItems='center' justifyContent='center' >
                <Outlet />
                <AlertSnackBar 
                    open={alert.open}
                    message={alert.message}
                    handleClose={() => setAlert({...alert, open : false})}
                />
            </Box>
        </Container>
    )
}

export default Root;
