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
import { optionList } from 'data/dummyData';
import { Action } from 'utils/Enums';
import { getQuestionById } from 'services/questionService';

function Module() {
  const { id } = useParams();
  const {auth} = React.useContext(AuthContext);
  const [openQuestionDlg, setOpenQuestionDlg] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [question, setQuestion] = React.useState({options: []});
  const [action, setAction] = React.useState(Action.NEW_RECORD);

  const navigateTo = useNavigate();

  const handleViewRecord = (e, selectedRow) => {
    e.preventDefault();

    setAction(Action.DISPLAY_RECORD);
    setQuestion(getQuestionById(selectedRow.id));
    setOpenQuestionDlg(true);
  }

  const handleEditRecord = (e, selectedRow) => {
    e.preventDefault();

    setAction(Action.MODIFY_RECORD);
    setQuestion(getQuestionById(selectedRow.id));
    setOpenQuestionDlg(true);
  }

  const handleDeleteRecord = (e, selectedRow) => {
    e.preventDefault();
    console.log('Delete Clicked for id : ' + selectedRow.id);
  }


  const handleNewRecord = (e) => {
    e.preventDefault();

    setAction(Action.NEW_RECORD);
    setOpenQuestionDlg(true);
    setQuestion({options: []});
  };

  const handleCloseQuestionDlg = (updatedRow) => {
    if (action == Action.NEW_RECORD && updatedRow) {
      updatedRow = {...updatedRow, id:999}
      setRows([...rows, updatedRow]);
    }
    setOpenQuestionDlg(false);
  };

    
  const columns = [...questionColumns, 
                  {
                    field: 'action',
                    headerName: 'Action',
                    type: 'action',
                    width: 200,
                    renderCell: (params)=> (
                      <EditActions {...{params, handleView: handleViewRecord, handleEdit: handleEditRecord, handleDelete: handleDeleteRecord}}/>
                    )
                  }];
               
  const module = getModuleById(id); 
  const questionList = getQuestionsByModule(id);

  useEffect(() => {
      setRows(questionList);
  },[id])

  //if (!auth) return (<div>No Auth</div>);

  return (
      <LargeWindow>
          <Grid container direction='column' p={2}>
              <Grid item pb={2}>
                  <Box display='flex' justifyContent='space-between'>
                      <Typography variant='h3'>{ module.moduleName + " [ #" + module.id + " ]"} </Typography>
                      <Button variant='outlined' startIcon={<AddIcon/>} onClick={(e) => handleNewRecord(e)}>New Question</Button>
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
              open={openQuestionDlg}
              action={action}
              question={question}
              setQuestion={setQuestion}
              onCloseDialog= {handleCloseQuestionDlg}
          /> 
      </LargeWindow>
  )
}

export default Module;
