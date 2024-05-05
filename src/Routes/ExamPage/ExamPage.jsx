import React from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import Layouts from '../../Components/Layouts';
import ExamList from '../../Components/ExamList/ExamList';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function ExamPage() {
    const {auth} = React.useContext(AuthContext);

    //if (!auth) return (<div>No Auth</div>);

    return (
        <Layouts.LargeWindow>
            <Box sx={{
                display:'flex',
                justifyContent: 'space-between',
                padding: '10px'
            }}>
                <Typography variant='h3'>EXAMS</Typography>
                <Button variant='outlined' size='medium' startIcon={<AddIcon/>}>New Exam</Button>
            </Box>
            <ExamList />
        </Layouts.LargeWindow>
    )
}

export default ExamPage;