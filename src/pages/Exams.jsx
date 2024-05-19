import React, { useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import ExamDialog from 'components/dialog/ExamDialog';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { examColumns } from 'data/columnDefinitions';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createNewExam, getAllExams } from 'services/examService';
import { Action, Click } from 'utils/Enums';
import { useNavigate } from 'react-router-dom';

function Exams() {
    const {auth} = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [action, setAction] = React.useState(Action.NEW_RECORD);
    const [exam, setExam] = React.useState({});

    const navigateTo = useNavigate();

    const handleView = (e, params) => {
        e.preventDefault();
        setAction(Action.DISPLAY_RECORD);
        navigateTo("/exam/" + params.id)
    }
    
    const handleEdit = (e, params) => {
        e.preventDefault();
        setAction(Action.MODIFY_RECORD);
        setExam(params.row);
        setOpen(true);
    }
    
    const handleDelete = (e, params) => {
        e.preventDefault();
        //TODO : Call API to Delete Record
        setAction(Action.DELETE_RECORD);
        let newRows = rows.filter((row) => row.id !== params.id);
        setRows(newRows);
    }

    const handleClickOpen = () => {
        setAction(Action.NEW_RECORD);
        setExam({});
        setOpen(true);
    };
  
    const handleClose = (callback) => {
        if (callback.click === Click.SUBMIT) {
            switch(action) {
                case (Action.NEW_RECORD) : {
                    //TODO : Call API to create Record
                    let data = createNewExam(exam);
                    setRows([...rows, data]);
                    break;
                }
                case (Action.MODIFY_RECORD) : {
                    //TODO : Call API to modify Record
                    let filteredRows = rows.filter((row) => row.id !== exam.id);
                    let data = [...filteredRows, exam];
                    data.sort((a, b) => {return a.id - b.id});
                    setRows(data);
                    break;
                }
                default : {
                    break;
                }
            }
        }
        setOpen(false);
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
                    

    useEffect(() => {
        const examList = getAllExams();
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
            <ExamDialog 
                open= {open}
                action={action}
                exam={exam}
                setExam={setExam}
                onCloseDialog= {handleClose}
            /> 
        </LargeWindow>
    )
}

export default Exams;