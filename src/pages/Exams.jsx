import React, { useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import NewExam from 'components/dialog/NewExam';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { examColumns } from 'data/columnDefinitions';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createNewExam, getAllExams } from 'services/examService';
import { useNavigate } from 'react-router-dom';

function Exams() {
    const {auth} = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const navigateTo = useNavigate();

    const handleView = (e, params) => {
        e.preventDefault();
        navigateTo("/exam/" + params.id)
    }
    
    const handleEdit = (e, params) => {
        e.preventDefault();
        console.log('Edit Clicked...');
    }
    
    const handleDelete = (e, params) => {
        e.preventDefault();
        console.log('Delete Clicked for id : ' + params.id);
        console.log(params);
    }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (newExam) => {
        if (newExam) {
            let data = createNewExam(newExam);
            setOpen(false);
            setRows([...rows, data]);
        }
    };

    const columns = [...examColumns, 
                    {
                    field: 'action',
                    headerName: 'Action',
                    type: 'action',
                    width: 200,
                    renderCell: (params)=> (
                        <EditActions {...{params, handleView, handleEdit, handleDelete}}/>
                    )
                    }];
                    
    const examList = getAllExams();

    useEffect(() => {
        setRows(examList);
    },[])

    //if (!auth) return (<div>No Auth</div>);

    return (
        <LargeWindow>
            <Grid container direction='column' p={2}>
                <Grid item pb={2}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='h3'>Exams</Typography>
                        <Button variant='outlined' startIcon={<AddIcon/>} onClick={handleClickOpen}>New Exam</Button>
                    </Box>
                </Grid>
                <Divider />
                <Grid item alignSelf='center' pt={2}>
                    <DataTable 
                        columns={columns}
                        rows={rows}
                    />
                </Grid>
            </Grid>
            <NewExam 
                open= {open}
                title='Create New Exam'
                onCloseDialog= {handleClose}
            /> 
        </LargeWindow>
    )
}

export default Exams;