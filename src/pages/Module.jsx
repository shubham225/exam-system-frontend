import React, { useEffect } from 'react';

import { AuthContext } from 'context/AuthContext';

import LargeWindow from 'layouts/LargeWindow';
import DataTable from 'components/form/DataTable';
import EditActions from 'components/ui/EditActions';
import { questionColumns } from 'data/columnDefinitions';

import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestionsByModule } from 'services/questionService';
import { getModuleById } from 'services/moduleService';
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
               
  useEffect(() => {
    const moduleDetail = getModuleById(id); 
    const questionList = getQuestionsByModule(id);
    setModule(moduleDetail);
    setRows(questionList);
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
    //TODO : Call API to Delete Record
    let newRows = rows.filter((row) => row.id !== params.id);
    setRows(newRows);
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
                //TODO : Call API to create Record
                let data = {...question, id:999};
                setRows([...rows, data]);
                break;
            }
            case (Action.MODIFY_RECORD) : {
                //TODO : Call API to modify Record
                let filteredRows = rows.filter((row) => row.id !== question.id);
                let data = [...filteredRows, question];
                data.sort((a, b) => {return a.id - b.id});
                setRows(data);
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
      </LargeWindow>
  )
}

export default Module;
