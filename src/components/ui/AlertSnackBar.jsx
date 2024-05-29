import { Alert, Snackbar } from '@mui/material';
import React from 'react'

function AlertSnackBar(props) {
    const {open, handleClose, severity, message,...other} = props;
    
    return (
        <div>
            <Snackbar 
                open={open?open:false} 
                autoHideDuration={3000} 
                onClose={handleClose} 
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                sx={{mt : 7}}
                >
                <Alert
                onClose={handleClose}
                severity= {severity ? severity : 'error'}
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