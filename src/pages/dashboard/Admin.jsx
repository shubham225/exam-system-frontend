import React from 'react'

import { useNavigate } from 'react-router-dom';

import {Box, Grid, Button } from '@mui/material';

import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuButton from 'components/ui/MenuButton';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

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
                <Grid item xs={4} textAlign='center'>
                    <MenuButton 
                        title="Manage Exams" 
                        description="View, Modify or Create new Exams" 
                        onClick={() => navigateTo("/exam")}
                        menuIcon={<MenuBookIcon />} />
                </Grid>
                <Grid item xs={4} textAlign='center'>
                    <MenuButton 
                        title="Assign Exams" 
                        description="Assign exams to students" 
                        onClick={() => navigateTo("/assignment")}
                        menuIcon={<AssignmentIndIcon />} />
                </Grid>
                <Grid item xs={4} textAlign='center'>
                    <MenuButton 
                        title="Results" 
                        description="View results of all students" 
                        onClick={() => navigateTo("/results")}
                        menuIcon={<AssessmentIcon />} />
                </Grid>
            </Grid> 
        </Box>
    )
}
