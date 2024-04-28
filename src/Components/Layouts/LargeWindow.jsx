import React from 'react';
import {Box, Paper} from '@mui/material';

export default function LargeWindow(props) {

    return (
        <Box 
            sx={{
                height: '100%',
                alignContent: 'center'
            }}
        >
            <Paper elevation={3}
                sx= {{
                    height: '100%',
                    borderRadius: '10px'
                }}
            >
                {props.children}
            </Paper>
        </Box>
    )
}
