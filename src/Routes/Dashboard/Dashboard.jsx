import React from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import NoAuthorization from '../../Components/NoAuthorization';

import {Box, Grid, Paper, Button, Typography} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';
import Layouts from '../../Components/Layouts';

function Dashboard() {
    const {auth} = React.useContext(AuthContext);
    const navigateTo = useNavigate();

    //if (!auth) return (<NoAuthorization/>);

    return (
        <Layouts.LargeWindow>
                <Grid container>
                    <Grid item sm={12} margin='10px'>
                        <Button
                            variant="outlined"
                            startIcon={<MenuBookIcon/>}
                            onClick={() => navigateTo("/exams")}
                        >
                            View/Edit Exams
                        </Button>
                    </Grid>
                    <Grid item sm={12} margin='10px'>
                        <Button
                            variant="outlined"
                            startIcon={<AssessmentIcon/>}
                        >
                            View Results
                        </Button>
                    </Grid>
                </Grid> 
            </Layouts.LargeWindow>
    )
}

export default Dashboard;