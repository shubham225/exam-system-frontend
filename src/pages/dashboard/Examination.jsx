import React from 'react'

import { Box, Grid } from '@mui/material'

import useAlert from 'hooks/useAlert';
import useLoading from 'hooks/useLoading';

import ExamCard from 'components/ui/ExamCard';

import StudentTestService from 'services/StudentTestService';
import AuthService from 'services/AuthService';
import { useNavigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';

function Examination() {
  const [exams, setExams] = React.useState([]);

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();
  const {setToken} = useAuth();

  const navigateTo = useNavigate();

  const fetchAllExamsByUserId = React.useCallback(async (id) => {
    startLoading();
    
    try {
        const examList = await StudentTestService.getAllExamsByUserId(id);
        
        setExams(examList);
    }catch(error) {
        setAlert(error, 'error');
    }

    stopLoading();
  });

  React.useEffect(() => {
    const userId = AuthService.getUserId();
    fetchAllExamsByUserId(userId);
  }, [])

  

  return (
      <Grid container height='100%' width='90%' justifyContent='center' alignContent='safe center' overflow='auto'>
        {exams.map((exam) => 
          <Grid item p={1}>
            <ExamCard exam={exam}/>
          </Grid>
        )}
      </Grid>
  )
}

export default Examination