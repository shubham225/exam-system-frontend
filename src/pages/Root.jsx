import React from 'react';

import { Outlet } from 'react-router-dom';

import { AppContext } from 'context/AppContext';

import useAlert from 'hooks/useAlert';
import useLoading from 'hooks/useLoading';

import { Backdrop, 
         Box, 
         CircularProgress, 
         Container} from '@mui/material';

import NavBar from 'components/NavBar';
import AlertSnackBar from 'components/ui/AlertSnackBar';

function Root() {
    const {appContext, setAppContext} = React.useContext(AppContext);
    const {closeAlert} = useAlert();
    const {stopLoading} = useLoading();

    return (
        <Container fixed maxWidth={false} sx={{width: '100vw', height: '100vh'}}>
            <Box pt={1} height='10%' >
                <NavBar />
            </Box>
            <Box display='flex' py={2} height='90%' width='100%' alignItems='center' justifyContent='center' >
                <Outlet />
                <AlertSnackBar 
                    open={appContext.alert.open}
                    message={appContext.alert.message}
                    severity={appContext.alert.severity}
                    handleClose={() => closeAlert()}
                />
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={appContext.loading}
                    onClick={() => stopLoading()}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Box>
        </Container>
    )
}

export default Root;
