import React from 'react'
import { useNavigate } from 'react-router-dom';

import {Box, Grid, Paper, Button, Typography} from '@mui/material';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default function AdminDashboard() {
    const navigateTo = useNavigate();

    return (
        <Grid container direction={'column'} >
            <Grid item >
                <Button
                    variant="outlined"
                    startIcon={<MenuBookIcon/>}
                    onClick={() => navigateTo("/exam")}
                >
                    View/Edit Exams
                </Button>
            </Grid>
            <Grid item >
                <Button
                    variant="outlined"
                    startIcon={<AssessmentIcon/>}
                >
                    View Results
                </Button>
            </Grid>
        </Grid> 
    )
}
