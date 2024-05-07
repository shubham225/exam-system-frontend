import React from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import Exam from 'components/dialog/Exam';
import ExamTable from 'components/form/ExamTable';

import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Exams() {
    const {auth} = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (data) => {
      setOpen(false);
      console.log(data);
    };
  

    //if (!auth) return (<div>No Auth</div>);

    return (
        <LargeWindow>
            <Box sx={{
                display:'flex',
                justifyContent: 'space-between',
                padding: '10px'
            }}>
                <Typography variant='h3'>EXAMS</Typography>
                <Button variant='outlined' size='medium' startIcon={<AddIcon/>} onClick={handleClickOpen}>New Exam</Button>
            </Box>
            <ExamTable />
            <Exam 
                open= {open}
                onCloseDialog= {handleClose}
            /> 
        </LargeWindow>
    )
}

export default Exams;