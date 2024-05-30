import React from 'react';

import { useParams } from 'react-router-dom';

import useAlert from 'hooks/useAlert';
import useLoading from 'hooks/useLoading';

import LargeWindow from 'layouts/LargeWindow';

import { Box, 
         Button, 
         Divider, 
         Grid, 
         Typography } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';

import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import BreadcrumbsPath from 'components/ui/BreadcrumbsPath';
import QuestionDialog  from 'components/dialog/QuestionDialog';

import QuestionService from 'services/QuestionService';
import ModuleService from 'services/ModuleService';

import { questionColumns } from 'utils/CommonObjects';

import { Action, Click } from 'utils/Enums';

function Module() {
  const { id } = useParams();
  const [openQuestionDlg, setOpenQuestionDlg] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [module, setModule] = React.useState({});
  const [question, setQuestion] = React.useState({options: []});
  const [action, setAction] = React.useState(Action.NEW_RECORD);

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();

  const path = [{name : 'Home', path : '/dashboard', icon : <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />},
                {name : 'Exams', path : '/exam', icon : <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />}]

  const columns = 
      [...questionColumns, 
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
        }
      ];

  React.useEffect(() => {
    getModuleById(id);
    getQuestionsByModuleId(id);
  },[id])
        
  const getModuleById = React.useCallback(async (id) => {
    startLoading();

    try {
      const moduleDetail = await ModuleService.getModuleById(id); 
      setModule(moduleDetail);
    } catch (error) {
      setAlert(error, 'error');
    }

    stopLoading();
  }, [id]);
    
  const getQuestionsByModuleId = React.useCallback(async (id) => {
    startLoading();

    try{
      const questionList = await QuestionService.getQuestionsByModuleId(id);
      setRows(questionList);
    } catch (error) {
      setAlert(error, 'error');
    }
  
    stopLoading();
  }, [id]);

  const createNewQuestion = React.useCallback(async () => {
    startLoading();

    try {
      let data = await QuestionService.createNewQuestion(question);
      setRows([...rows, data]);
      setOpenQuestionDlg(false);
    } catch (error) {
      setAlert(error, 'error');
    }

    stopLoading();
  }, [question]);

  const modifyQuestion = React.useCallback(async () => {
    startLoading();

    try {
      let modifiedQuestion = await QuestionService.modifyQuestion(question);
      let filteredRows = rows.filter((row) => row.id !== modifiedQuestion.id);
      let data = [...filteredRows, modifiedQuestion];
      data.sort((a, b) => {return a.id - b.id});
      setRows(data);
      setOpenQuestionDlg(false);
    }catch(error) {
      setAlert(error, 'error');
    }

    stopLoading();
  }, [question]);

  const deleteQuestionById = React.useCallback(async (id) => {
    startLoading();

    try {
      let deletedQuestion = await QuestionService.deleteQuestionById(id);
      let filteredRows = rows.filter((row) => row.id !== deletedQuestion.id);
      setRows(filteredRows);
    } catch (error) {
      setAlert(error, 'error');
    }

    stopLoading();
  });

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
    setQuestion({moduleId : module.id, type : "MULTIPLE_CHOICE", options: []});
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
              setOpenQuestionDlg(false);
              break;
            }
        }
    }
    if (callback.click === Click.CLOSE) {
      setOpenQuestionDlg(false);
    }
  };

  return (
      <LargeWindow>
          <Grid container direction='column' p={2}>
              <Grid item pb={2}>
                  <Box display='flex' justifyContent='space-between'>
                    <Box display='flex' flexDirection='column'>
                        <Typography variant='h4'>{ module.moduleName + " [ #" + module.id + " ]"}</Typography> 
                        <BreadcrumbsPath path={path} currLocation={module.moduleName}/>
                    </Box>
                    <Box alignSelf='center'>
                        <Button size='medium' variant='contained'  startIcon={<AddIcon/>} onClick={(e) => handleNewRecord(e)}>New</Button>
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
