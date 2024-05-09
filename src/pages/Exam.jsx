import React, { useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import NewExam from 'components/dialog/NewExam';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { moduleColumns } from 'data/columnDefinitions';
import { createNewExam, getExamById } from 'services/examService';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getAllModules } from 'services/moduleService';
import { useParams } from 'react-router-dom';

function Exams() {
  const { id } = useParams();
  const {auth} = React.useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (newModule) => {
      let data = createNewExam(newModule);
      setOpen(false);
      setRows([...rows, data]);
  };

    
  const columns = [...moduleColumns, 
                  {
                    field: 'action',
                    headerName: 'Action',
                    type: 'action',
                    width: 200,
                    renderCell: (params)=> (
                      <EditActions {...{params}}/>
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
                      <Typography variant='h3'>Exam - {exam.id + "[ " + exam.examName + " ]"} </Typography>
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
              onCloseDialog= {handleClose}
          /> 
      </LargeWindow>
  )
}

export default Exams
