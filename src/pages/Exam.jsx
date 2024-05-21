import React, { useEffect, useCallback } from 'react';

import LargeWindow from 'layouts/LargeWindow';
import ModuleDialog from 'components/dialog/ModuleDialog';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { moduleColumns } from 'data/columnDefinitions';
import ExamService from 'services/ExamService';
import ModuleService from 'services/ModuleService';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Action, Click } from 'utils/Enums';
import useAlert from 'hooks/useAlert';
import useLoading from 'hooks/useLoading';

function Exam() {
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [action, setAction] = React.useState(Action.NEW_RECORD);
  const [exam, setExam] = React.useState({});
  const [module, setModule] = React.useState({});

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();

  const navigateTo = useNavigate();
  const columns = [...moduleColumns, 
                  {
                    field: 'action',
                    headerName: 'Action',
                    type: 'action',
                    width: 200,
                    renderCell: (params)=> (
                      <EditActions {...{params, handleView, handleEdit, handleDelete}}/>
                    )
                  }];
          
  const getExamById = useCallback(async (id) => {
    startLoading();

    try {
      const examDetail = await ExamService.getExamById(id);
      setExam(examDetail);
      setModule({...module, examId : examDetail.id});
    }catch(error) {
      setAlert(error, 'error');
    }

    stopLoading();
  });
    
  const getModulesByExamId = useCallback(async (id) => {
    startLoading();

    try {
      const moduleList = await ModuleService.getModulesByExamId(id);
      setRows(moduleList);
    }catch(error) {
      setAlert(error, 'error');
    }

    stopLoading();
  });

  const createNewModule = useCallback(async () => {
    startLoading();

    try {
      let data = await ModuleService.createNewModule(module);
      setRows([...rows, data]);
    }catch(error) {
      setAlert(error, 'error');
    }

    stopLoading();
  });

  const modifyModule = useCallback(async () => {
    startLoading();

    try {
      let modifiedModule = await ModuleService.modifyModule(module);
      let filteredRows = rows.filter((row) => row.id !== modifiedModule.id);
      let data = [...filteredRows, modifiedModule];
      data.sort((a, b) => {return a.id - b.id});
      setRows(data);
    }catch(error) {
      setAlert(error, 'error');
    }

    stopLoading();
  });

  const deleteModule = useCallback(async (id) => {
    startLoading();

    try {
      let deletedModule = await ModuleService.deleteModuleById(id);
      let newRows = rows.filter((row) => row.id !== deletedModule.id);
      setRows(newRows);
    }catch(error) {
      setAlert(error, 'error');
    }

    stopLoading();
  });

  useEffect(() => {
      getExamById(id); 
      getModulesByExamId(id);
  },[id])


  const handleView = (e, params) => {
    e.preventDefault();
    setAction(Action.DISPLAY_RECORD);
    navigateTo("/module/" + params.id)
  }

  const handleEdit = (e, params) => {
    e.preventDefault();
    setAction(Action.MODIFY_RECORD);
    setModule(params.row);
    setOpen(true);
  }

  const handleDelete = (e, params) => {
    e.preventDefault();
    deleteModule(params.id);
  }


  const handleClickOpen = () => {
    setAction(Action.NEW_RECORD);
    setModule({...module, examId : exam.id});
    setOpen(true);
  };

  const handleClose = (callback) => {
    if (callback.click === Click.SUBMIT) {
        switch(action) {
            case (Action.NEW_RECORD) : {
                createNewModule();
                break;
            }
            case (Action.MODIFY_RECORD) : {
                //TODO : Call API to modify Record
                modifyModule();
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
                    <Box display='flex'>
                      <Button startIcon={<ArrowBackIosNewIcon />} onClick={() => navigateTo(-1)} />
                      <Typography variant='h3'>{ exam.examName + " [ #" + exam.id + " ]"} </Typography>
                    </Box>
                    <Button variant='outlined' startIcon={<AddIcon/>} onClick={handleClickOpen}>New Module</Button>
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
          <ModuleDialog 
              open= {open}
              action={action}
              module={module}
              setModule={setModule}
              onCloseDialog= {handleClose}
          /> 
      </LargeWindow>
  )
}

export default Exam;
