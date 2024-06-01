import React from 'react';

import useAlert from 'hooks/useAlert';
import useLoading from 'hooks/useLoading';

import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'

import ExamService from 'services/ExamService';
import { resultColumns } from 'utils/CommonObjects';
import HomeIcon from '@mui/icons-material/Home';
import BreadcrumbsPath from 'components/ui/BreadcrumbsPath';
import DataTable from 'components/form/DataTable';
import LargeWindow from 'layouts/LargeWindow';

function Results() {
  const [rows, setRows] = React.useState([]);
  const [exams, setExams] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState('');
  const rowsBackup = React.useRef([]);

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();

  const path = [{name : 'Home', path : '/dashboard', icon : <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />}]

  const columns = [...resultColumns];
        
    const fetchAllResults = React.useCallback(async () => {
      startLoading();
      
      try {
          const resultList = await ExamService.getResultOfAllUsers();
          rowsBackup.current = resultList;

          setFilterValue(resultList[0]?.examName);
          let filteredRows = resultList.filter((row) => row.examName == resultList[0]?.examName);

          setRows(filteredRows);
      }catch(error) {
          setAlert(error, 'error');
      }

      stopLoading();
    });

    const fetchAllExams = React.useCallback(async () => {
      startLoading();
      
      try {
          const examList = await ExamService.getAllExams();
          setExams(examList);
      }catch(error) {
          setAlert(error, 'error');
      }

      stopLoading();
    });

    React.useEffect(() => {
      fetchAllResults();
      fetchAllExams();
    }, [])

    React.useEffect(() => {
      console.log(rowsBackup.current);
      let rowsBackupData = rowsBackup.current;
      let filteredRows = rowsBackupData.filter((row) => row.examName == filterValue);
      setRows(filteredRows);
    }, [filterValue])

  return (
    <LargeWindow>
      <Grid container direction='column' p={2}>
        <Grid item pb={1}>
          <Box display='flex' justifyContent='space-between'>
            <Box display='flex' flexDirection='column'>
              <Typography variant='h4'>Results</Typography> 
              <BreadcrumbsPath path={path} currLocation='Results'/>
            </Box>
            <Box alignSelf='center' width='300px'>
              <FormControl fullWidth>
                <InputLabel id="exam-select-label">Select Exam</InputLabel>
                <Select
                  labelId="exam-select-label"
                  id="exam-select"
                  value={filterValue}
                  label="Select Exam"
                  onChange={(e) => {e.preventDefault(); setFilterValue(e.target.value);}}
                >
                  {exams.map((exam) =>
                    (
                      <MenuItem value={exam.examName}>{exam.examName}</MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Divider />
        <Grid item alignSelf='center' pt={2} width='100%' >
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