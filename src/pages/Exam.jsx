import React, { useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import NewModule from 'components/dialog/NewModule';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { moduleColumns } from 'data/columnDefinitions';
import { getExamById } from 'services/examService';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createNewModule, getAllModules } from 'services/moduleService';
import { useNavigate, useParams } from 'react-router-dom';

function Exam() {
  const { id } = useParams();
  const {auth} = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const navigateTo = useNavigate();

  const handleView = (e, params) => {
    e.preventDefault();
    navigateTo("/module/" + params.id)
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

  const handleClose = (newModule) => {
    if (newModule) {
      let data = createNewModule(newModule);
      setOpen(false);
      setRows([...rows, data]);
    }
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
               
  const exam = getExamById(id); 
  const moduleList = getAllModules();

  useEffect(() => {
      setRows(moduleList);
  },[])

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
          <NewModule 
              open= {open}
              title='Create New Module'
              onCloseDialog= {handleClose}
          /> 
      </LargeWindow>
  )
}

export default Exam;
