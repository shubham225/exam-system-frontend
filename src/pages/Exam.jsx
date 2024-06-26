import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import useAlert from 'hooks/useAlert';
import useLoading from 'hooks/useLoading';

import { Box, 
         Button, 
         Divider, 
         Grid, 
         Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import LargeWindow from 'layouts/LargeWindow';

import ModuleDialog from 'components/dialog/ModuleDialog';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import BreadcrumbsPath from 'components/ui/BreadcrumbsPath';

import ExamService from 'services/ExamService';
import ModuleService from 'services/ModuleService';

import { moduleColumns } from 'utils/CommonObjects';

import { Action, Click } from 'utils/Enums';


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

  const path = [{name : 'Home', path : '/dashboard', icon : <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />},
                {name : 'Exams', path : '/exam', icon : <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />}]

  const columns = 
      [...moduleColumns, 
        {
          field: 'action',
          headerName: 'Action',
          type: 'action',
          width: 200,
          renderCell: (params)=> (
            <EditActions {...{params, handleView, handleEdit, handleDelete}}/>
          )
        }
      ];
          
  const getExamById = React.useCallback(async (id) => {
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
    
  const getModulesByExamId = React.useCallback(async (id) => {
    startLoading();

    try {
      const moduleList = await ModuleService.getModulesByExamId(id);
      setRows(moduleList);
    }catch(error) {
      setAlert(error, 'error');
    }

    stopLoading();
  });

  const createNewModule = React.useCallback(async () => {
    startLoading();

    try {
      let data = await ModuleService.createNewModule(module);
      setRows([...rows, data]);
    }catch(error) {
      setAlert(error, 'error');
    }

    stopLoading();
  });

  const modifyModule = React.useCallback(async () => {
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

  const deleteModule = React.useCallback(async (id) => {
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

  React.useEffect(() => {
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
                    <Box display='flex' flexDirection='column'>
                        <Typography variant='h4'>{ exam.examName + " [ #" + exam.id + " ]"}</Typography> 
                        <BreadcrumbsPath path={path} currLocation={exam.examName}/>
                    </Box>
                    <Box alignSelf='center'>
                        <Button size='medium' variant='contained'  
                          startIcon={<AddIcon/>} onClick={handleClickOpen}>New</Button>
                    </Box>
                  </Box>
              </Grid>
              <Divider />
              <Grid item alignSelf='center' pt={2} width='100%'>
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
