import React, { useEffect, useCallback } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import ModuleDialog from 'components/dialog/ModuleDialog';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { moduleColumns } from 'data/columnDefinitions';
import ExamService from 'services/ExamService';
import ModuleService from 'services/ModuleService';

import { Backdrop, Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { Action, Click } from 'utils/Enums';

function Exam() {
  const { id } = useParams();
  const {auth} = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [action, setAction] = React.useState(Action.NEW_RECORD);
  const [exam, setExam] = React.useState({});
  const [module, setModule] = React.useState({});
  const [loading, setLoading] = React.useState(false);

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
               
  //if (!auth) return (<div>No Auth</div>);
          
  const getExamById = useCallback(async (id) => {
    setLoading(true);
    const examDetail = await ExamService.getExamById(id);
    setExam(examDetail);
    console.log("detail : " + JSON.stringify(examDetail));
    setLoading(false);
  });
    
  const getAllModules = useCallback(async () => {
    setLoading(true);
    const moduleList = await ModuleService.getAllModules();
    setRows(moduleList);
    setLoading(false);
  });

  const createNewModule = useCallback(async () => {
    setLoading(true);
    let data = await ModuleService.createNewModule(module);
    setRows([...rows, data]);
    setLoading(false);
  });

  const modifyModule = useCallback(async () => {
      setLoading(true);
      let modifiedModule = await ModuleService.modifyModule(module);
      let filteredRows = rows.filter((row) => row.id !== modifiedModule.id);
      let data = [...filteredRows, modifiedModule];
      data.sort((a, b) => {return a.id - b.id});
      setRows(data);
      setLoading(false);
  });

  const deleteModule = useCallback(async (id) => {
      setLoading(true);
      let deletedModule = await ModuleService.deleteModuleById(id);
      let newRows = rows.filter((row) => row.id !== deletedModule.id);
      setRows(newRows);
      setLoading(false);
  });

  useEffect(() => {
      getExamById(id); 
      getAllModules();
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
    deleteModule();
  }


  const handleClickOpen = () => {
    setAction(Action.NEW_RECORD);
    setModule({});
    setOpen(true);
  };

  const stopLoading = () => {
      setLoading(false);
  }

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
                      <Typography variant='h3'>{ exam.examName + " [ #" + exam.id + " ]"} </Typography>
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

export default Exam;
