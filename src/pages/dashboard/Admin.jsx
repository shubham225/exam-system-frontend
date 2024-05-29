import React from 'react'

import { useNavigate } from 'react-router-dom';

import {Box, Grid, Button } from '@mui/material';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';

const fullSpaceCenter = {
                            height: '100%', 
                            width: '100%',
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center'
                        }


export default function Admin() {
    const navigateTo = useNavigate();

    return (
        <Box sx={fullSpaceCenter}>
            <Grid container spacing={2} direction='row' height='60%' width='60%' >
                <Grid item xs={6} textAlign='center'>
                    <Button fullWidth variant="outlined" 
                        startIcon={<MenuBookIcon/>} 
                        onClick={() => navigateTo("/exam")} 
                        sx={{height:'-webkit-fill-available'}}>
                            View/Edit Exams
                    </Button>
                </Grid>
                <Grid item xs={6} textAlign='center'>
                    <Button fullWidth variant="outlined" 
                        startIcon={<AssessmentIcon/>} 
                        onClick={() => navigateTo("/results")} 
                        sx={{height:'-webkit-fill-available'}}>
                            View Results
                    </Button>
                </Grid>
            </Grid> 
        </Box>
    )
}
