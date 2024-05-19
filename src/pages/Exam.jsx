import React, { useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import ModuleDialog from 'components/dialog/ModuleDialog';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { moduleColumns } from 'data/columnDefinitions';
import { getExamById } from 'services/examService';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createNewModule, getAllModules } from 'services/moduleService';
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

  const navigateTo = useNavigate();

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
    //TODO : Call API to Delete Record
    let newRows = rows.filter((row) => row.id !== params.id);
    setRows(newRows);
  }


  const handleClickOpen = () => {
    setAction(Action.NEW_RECORD);
    setModule({});
    setOpen(true);
  };

  const handleClose = (callback) => {
    if (callback.click === Click.SUBMIT) {
        switch(action) {
            case (Action.NEW_RECORD) : {
                //TODO : Call API to create Record
                let data = createNewModule(module);
                setRows([...rows, data]);
                break;
            }
            case (Action.MODIFY_RECORD) : {
                //TODO : Call API to modify Record
                let filteredRows = rows.filter((row) => row.id !== module.id);
                let data = [...filteredRows, module];
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
               
  
  useEffect(() => {
      const examDetail = getExamById(id); 
      const moduleList = getAllModules();
      setExam(examDetail);
      setRows(moduleList);
  },[id])

  //if (!auth) return (<div>No Auth</div>);

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
      </LargeWindow>
  )
}

export default Exam;
