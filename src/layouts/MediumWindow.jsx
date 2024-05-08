import React from 'react';
import {Paper} from '@mui/material';

export default function MediumWindow(props) {
    return (
        <Paper elevation={6} sx={{ width : '55%', height: '70%', borderRadius: '10px' }}>
            {props.children}
        </Paper>
    )
}
