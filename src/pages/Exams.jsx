import React, { useCallback, useEffect } from 'react';

import LargeWindow from 'layouts/LargeWindow';
import ExamDialog from 'components/dialog/ExamDialog';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { examColumns } from 'data/columnDefinitions';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExamService from 'services/ExamService';
import { Action, Click } from 'utils/Enums';
import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useLoading from 'hooks/useLoading';
import useAlert from 'hooks/useAlert';
import BreadcrumbsPath from 'components/ui/BreadcrumbsPath';
import HomeIcon from '@mui/icons-material/Home';

function Exams() {
    // const {alert, setAlert} = React.useContext(AlertContext);
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = React.useState([]);
    const [action, setAction] = React.useState(Action.NEW_RECORD);
    const [exam, setExam] = React.useState({});

    const {startLoading, stopLoading} = useLoading();
    const {setAlert} = useAlert();

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
        
    const fetchAllExams = useCallback(async () => {
        startLoading();
        
        try {
            const examList = await ExamService.getAllExams();
            setRows(examList);
        }catch(error) {
            setAlert(error, 'error');
        }

        stopLoading();
    });

    const createNewExam = useCallback(async () => {
        startLoading();

        try {
            let data = await ExamService.createNewExam(exam);
            setRows([...rows, data]);
        }catch(error) {
            setAlert(error, 'error');
        }

        stopLoading();
    });

    const modifyExam = useCallback(async () => {
        startLoading();
        
        try {
            let modifiedExam = await ExamService.modifyExam(exam);
            let filteredRows = rows.filter((row) => row.id !== modifiedExam.id);
            let data = [...filteredRows, modifiedExam];
            data.sort((a, b) => {return a.id - b.id});
            setRows(data);
        }catch(error) {
            setAlert(error, 'error');
        }

        stopLoading();
    });

    const deleteExam = useCallback(async (id) => {
        startLoading();

        try {
            let deletedExam = await ExamService.deleteExamById(id);
            let newRows = rows.filter((row) => row.id !== deletedExam.id);
            setRows(newRows);
        }catch(error) {
            setAlert(error, 'error');
        }

        stopLoading();
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

    const path = [{name : 'Home', path : '/dashboard', icon : <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}]

    return (
        <LargeWindow>
            <Grid container direction='column' p={2}>
                <Grid item pb={1}>
                    <Box display='flex' justifyContent='space-between'>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='h4'>Exams</Typography> 
                            <BreadcrumbsPath path={path} currLocation='Exams'/>
                        </Box>
                        <Box alignSelf='center'>
                            <Button size='medium' variant='contained'  startIcon={<AddIcon/>} onClick={handleClickOpen}>New</Button>
                        </Box>
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
