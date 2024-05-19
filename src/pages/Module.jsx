import React, { useEffect, useCallback } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { questionColumns } from 'data/columnDefinitions';

import { Backdrop, Box, Button, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionService from 'services/QuestionService';
import ModuleService from 'services/ModuleService';
import QuestionDialog  from 'components/dialog/QuestionDialog'
import { Action, Click } from 'utils/Enums';

function Module() {
  const { id } = useParams();
  const {auth} = React.useContext(AuthContext);
  const [openQuestionDlg, setOpenQuestionDlg] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [module, setModule] = React.useState({});
  const [question, setQuestion] = React.useState({options: []});
  const [action, setAction] = React.useState(Action.NEW_RECORD);
  const [loading, setLoading] = React.useState(false);

  const navigateTo = useNavigate();

  //if (!auth) return (<div>No Auth</div>);

  const columns = [...questionColumns, 
                  {
                    field: 'action',
                    headerName: 'Action',
                    type: 'action',
                    width: 200,
                    renderCell: (params)=> (
                      <EditActions {...{ params, 
                                         handleView: handleViewRecord, 
                                         handleEdit: handleEditRecord, 
                                         handleDelete: handleDeleteRecord}}/>
                    )
                  }];
        
  const getModuleById = useCallback(async (id) => {
    setLoading(true);
    const moduleDetail = await ModuleService.getModuleById(id); 
    setModule(moduleDetail);
    setLoading(false);
  }, [id]);
    
  const getQuestionsByModuleId = useCallback(async (id) => {
    setLoading(true);
    const questionList = await QuestionService.getQuestionsByModuleId(id);
    setRows(questionList);
    setLoading(false);
  }, [id]);

  const createNewQuestion = useCallback(async () => {
    setLoading(true);
    let data = await QuestionService.createNewQuestion(question);
    setRows([...rows, data]);
    setLoading(false);
  }, [question]);

  const modifyQuestion = useCallback(async () => {
      setLoading(true);
      let modifiedQuestion = await QuestionService.modifyQuestion(question);
      let filteredRows = rows.filter((row) => row.id !== modifiedQuestion.id);
      let data = [...filteredRows, modifiedQuestion];
      data.sort((a, b) => {return a.id - b.id});
      setRows(data);
      setLoading(false);
  }, [question]);

  const deleteQuestionById = useCallback(async (id) => {
      setLoading(true);
      console.log(rows)
      let deletedQuestion = await QuestionService.deleteQuestionById(id);
      let filteredRows = rows.filter((row) => row.id !== deletedQuestion.id);
      setRows(filteredRows);
      setLoading(false);
  });

  const stopLoading = () => {
      setLoading(false);
  }


  useEffect(() => {
    getModuleById(id);
    getQuestionsByModuleId(id);
  },[id])

  const handleViewRecord = (e, selectedRow) => {
    e.preventDefault();

    setAction(Action.DISPLAY_RECORD);
    setQuestion(selectedRow.row);
    setOpenQuestionDlg(true);
  }

  const handleEditRecord = (e, selectedRow) => {
    e.preventDefault();

    setAction(Action.MODIFY_RECORD);
    setQuestion(selectedRow.row);
    setOpenQuestionDlg(true);
  }

  const handleDeleteRecord = (e, params) => {
    e.preventDefault();
    deleteQuestionById(params.id);
  }


  const handleNewRecord = (e) => {
    e.preventDefault();

    setAction(Action.NEW_RECORD);
    setQuestion({options: []});
    setOpenQuestionDlg(true);
  };

  const handleCloseQuestionDlg = (callback) => {
    if (callback.click === Click.SUBMIT) {
        switch(action) {
            case (Action.NEW_RECORD) : {
                createNewQuestion();
                break;
            }
            case (Action.MODIFY_RECORD) : {
                modifyQuestion();
                break;
            }
            default : {
                break;
            }
        }
    }
    setOpenQuestionDlg(false);
  };

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

export default Module;
