import React from 'react';
import {Box, Paper} from '@mui/material';

export default function MediumWindow(props) {
    return (
        <Box 
            sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Paper elevation={6}
            sx= {{
                    height: '70%',
                    width: '60%',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'flex-start'
                }}
                >
                    {props.children}
            </Paper>
        </Box>
    )
}
