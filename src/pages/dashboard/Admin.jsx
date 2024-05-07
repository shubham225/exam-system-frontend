import React from 'react'
import { useNavigate } from 'react-router-dom';


import {Stack, Grid, Button } from '@mui/material';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function Admin() {
    const navigateTo = useNavigate();

    return (
        <Stack >
            <Grid container spacing={2} direction='row'>
                <Grid item >
                    <Button variant="outlined" startIcon={<MenuBookIcon/>} onClick={() => navigateTo("/exam")} >
                        View/Edit Exams
                    </Button>
                </Grid>
                <Grid item >
                    <Button variant="outlined" startIcon={<AssessmentIcon/>} >
                        View Results
                    </Button>
                </Grid>
            </Grid> 
        </Stack>
    )
}
