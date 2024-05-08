import React from 'react';
import {Paper} from '@mui/material';

export default function LargeWindow(props) {

    return (
        <Paper  elevation={6} 
                sx= {{ height: '100%', 
                       width: '100%', 
                       borderRadius: '10px'
                    }}
        >
                {props.children}
        </Paper>
    )
}
