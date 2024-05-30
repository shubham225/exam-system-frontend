import React from 'react';

import { useNavigate } from 'react-router-dom';
import useAlert from 'hooks/useAlert';
import useLoading from 'hooks/useLoading';

import { Box, Button, Divider, Grid, Typography } from '@mui/material'

import ExamService from 'services/ExamService';
import { examColumns } from 'utils/CommonObjects';
import SelectUsersDialog from 'components/dialog/SelectUsersDialog';
import HomeIcon from '@mui/icons-material/Home';
import BreadcrumbsPath from 'components/ui/BreadcrumbsPath';
import DataTable from 'components/form/DataTable';
import LargeWindow from 'layouts/LargeWindow';
import LaunchIcon from '@mui/icons-material/Launch';

function AssignExam() {
  const [openUserSelection, setOpenUserSelection] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [exam, setExam] = React.useState({});

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();

  const navigateTo = useNavigate();

  const path = [{name : 'Home', path : '/dashboard', icon : <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}]

  const columns = 
        [...examColumns, 
            {
                field: 'action',
                headerName: 'Action',
                type: 'action',
                width: 200,
                renderCell: (params)=> (
                    <Button variant='contained' endIcon={<LaunchIcon />} onClick={(e) => handleOpenUserSelection(e, params)} >Assign</Button>
                )
            }
        ];
        
    const fetchAllExams = React.useCallback(async () => {
      startLoading();
      
      try {
          const examList = await ExamService.getAllExams();
          setRows(examList);
      }catch(error) {
          setAlert(error, 'error');
      }

      stopLoading();
    });

    React.useEffect(() => {
      fetchAllExams();
    }, [])

    const handleOpenUserSelection = (e, params) => {
      e.preventDefault();
      setExam(params.row);
      setOpenUserSelection(true);
    };
  
    const handleClose = () => {
      setOpenUserSelection(false);
    };

  return (
    <LargeWindow>
      <Grid container direction='column' p={2}>
        <Grid item pb={1}>
          <Box display='flex' justifyContent='space-between'>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h4'>Assign Exam</Typography> 
              <BreadcrumbsPath path={path} currLocation='Assign Exam'/>
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
      <SelectUsersDialog 
          open= {openUserSelection}
          exam={exam}
          onCloseDialog= {handleClose}
      /> 
    </LargeWindow>
  )
}

export default AssignExam