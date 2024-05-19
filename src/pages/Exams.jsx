import React, { useCallback, useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import ExamDialog from 'components/dialog/ExamDialog';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { examColumns } from 'data/columnDefinitions';

import { Backdrop, Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExamService from 'services/ExamService';
import { Action, Click } from 'utils/Enums';
import { useNavigate } from 'react-router-dom';

function Exams() {
    const {auth} = React.useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [action, setAction] = React.useState(Action.NEW_RECORD);
    const [exam, setExam] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const navigateTo = useNavigate();

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

    //if (!auth) return (<div>No Auth</div>);
        
    const fetchAllExams = useCallback(async () => {
        setLoading(true);
        const examList = await ExamService.getAllExams();
        setRows(examList);
        setLoading(false);
    });

    const createNewExam = useCallback(async () => {
        setLoading(true);
        let data = await ExamService.createNewExam(exam);
        setRows([...rows, data]);
        setLoading(false);
    });

    const modifyExam = useCallback(async () => {
        setLoading(true);
        let modifiedExam = await ExamService.modifyExam(exam);
        let filteredRows = rows.filter((row) => row.id !== modifiedExam.id);
        let data = [...filteredRows, modifiedExam];
        data.sort((a, b) => {return a.id - b.id});
        setRows(data);
        setLoading(false);
    });

    const deleteExam = useCallback(async (id) => {
        setLoading(true);
        let deletedExam = await ExamService.deleteExamById(id);
        let newRows = rows.filter((row) => row.id !== deletedExam.id);
        setRows(newRows);
        setLoading(false);
    });

    useEffect(() => {
        fetchAllExams();
    }, [])

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
        
        setAction(Action.DELETE_RECORD);
        deleteExam(params.id);
    }

    const handleClickOpen = () => {
        setAction(Action.NEW_RECORD);
        setExam({});
        setOpen(true);
    };

    const stopLoading = () => {
        setLoading(false);
    }
  
    const handleClose = (callback) => {
        if (callback.click === Click.SUBMIT) {
            switch(action) {
                case (Action.NEW_RECORD) : {
                    createNewExam();
                    break;
                }
                case (Action.MODIFY_RECORD) : {
                    modifyExam();
                    break;
                }
                default : {
                    break;
                }
            }
        }
        setOpen(false);
    };

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
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={stopLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        </LargeWindow>
    )
}

export default Exams;