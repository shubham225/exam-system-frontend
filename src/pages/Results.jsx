import React from 'react';

import useAlert from 'hooks/useAlert';
import useLoading from 'hooks/useLoading';

import { Box, Button, Divider, Grid, Typography } from '@mui/material'

import ExamService from 'services/ExamService';
import { resultColumns } from 'utils/CommonObjects';
import SelectUsersDialog from 'components/dialog/SelectUsersDialog';
import HomeIcon from '@mui/icons-material/Home';
import BreadcrumbsPath from 'components/ui/BreadcrumbsPath';
import DataTable from 'components/form/DataTable';
import LargeWindow from 'layouts/LargeWindow';

function Results() {
  const [openUserSelection, setOpenUserSelection] = React.useState(false);
  const [rows, setRows] = React.useState([]);

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();

  const path = [{name : 'Home', path : '/dashboard', icon : <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}]

  const columns = [...resultColumns];
        
    const fetchAllResults = React.useCallback(async () => {
      startLoading();
      
      try {
          const resultList = await ExamService.getResultOfAllUsers();
          setRows(resultList);
      }catch(error) {
          setAlert(error, 'error');
      }

      stopLoading();
    });

    React.useEffect(() => {
      fetchAllResults();
    }, [])

  return (
    <LargeWindow>
      <Grid container direction='column' p={2}>
        <Grid item pb={1}>
          <Box display='flex' justifyContent='space-between'>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h4'>Results</Typography> 
              <BreadcrumbsPath path={path} currLocation='Results'/>
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
    </LargeWindow>
  )
}

export default Results