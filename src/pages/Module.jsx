import React, { useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import NewModule from 'components/dialog/NewModule';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { questionColumns } from 'data/columnDefinitions';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { createNewQuestion, getQuestionsByModule } from 'services/questionService';
import { getModuleById } from 'services/moduleService';
import QuestionDialog  from 'components/dialog/QuestionDialog'

function Module() {
  const { id } = useParams();
  const {auth} = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const navigateTo = useNavigate();

  const handleView = (e, params) => {
    e.preventDefault();
    setOpen(true);
    // navigateTo("/question/" + params.id)
  }

  const handleEdit = (e, params) => {
    e.preventDefault();
    setOpen(true);
    console.log('Edit Clicked...' + params.id);
  }

  const handleDelete = (e, params) => {
    e.preventDefault();
    console.log('Delete Clicked for id : ' + params.id);
    setOpen(true);
  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (newQuestion) => {
    console.log(newQuestion)
    if (newQuestion) {
      let data = createNewQuestion(newQuestion);
      setOpen(false);
      setRows([...rows, data]);
    }
  };

    
  const columns = [...questionColumns, 
                  {
                    field: 'action',
                    headerName: 'Action',
                    type: 'action',
                    width: 200,
                    renderCell: (params)=> (
                      <EditActions {...{params, handleView, handleEdit, handleDelete}}/>
                    )
                  }];
               
  const module = getModuleById(id); 
  const questionList = getQuestionsByModule(id);

  useEffect(() => {
      setRows(questionList);
  },[])

  //if (!auth) return (<div>No Auth</div>);

  return (
      <LargeWindow>
          <Grid container direction='column' p={2}>
              <Grid item pb={2}>
                  <Box display='flex' justifyContent='space-between'>
                      <Typography variant='h3'>{ module.moduleName + " [ #" + module.id + " ]"} </Typography>
                      <Button variant='outlined' startIcon={<AddIcon/>} onClick={handleClickOpen}>New Question</Button>
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
          <QuestionDialog
              open= {open}
              title='Create New Module'
              onCloseDialog= {handleClose}
          /> 
      </LargeWindow>
  )
}

export default Module;
