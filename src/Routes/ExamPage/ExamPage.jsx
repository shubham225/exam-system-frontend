import React from 'react';
import AuthContext from '../../Context/AuthContext/AuthContext';
import Layouts from '../../Components/Layouts';
import ExamList from '../../Components/ExamList/ExamList';
import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialogs from '../../Components/Dialogs';

function ExamPage() {
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
        <Layouts.LargeWindow>
            <Box sx={{
                display:'flex',
                justifyContent: 'space-between',
                padding: '10px'
            }}>
                <Typography variant='h3'>EXAMS</Typography>
                <Button variant='outlined' size='medium' startIcon={<AddIcon/>} onClick={handleClickOpen}>New Exam</Button>
            </Box>
            <ExamList />
            <Dialogs.NewExamDialog 
                open= {open}
                onCloseDialog= {handleClose}
            /> 
        </Layouts.LargeWindow>
    )
}

export default ExamPage;