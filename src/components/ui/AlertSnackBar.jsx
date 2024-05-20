import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react'

function AlertSnackBar(props) {
    const {open, handleClose, severity, title, message,...other} = props;

    return (
        <div>
            <Snackbar 
                open={open} 
                autoHideDuration={3000} onClose={handleClose} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{mt : 7}}
                >
                <Alert
                onClose={handleClose}
                severity="error"
                variant="filled"
                sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default AlertSnackBar