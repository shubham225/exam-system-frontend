import React from 'react'

import { useParams } from 'react-router-dom'

import { Grid } from '@mui/material'

import useAlert from 'hooks/useAlert'
import useLoading from 'hooks/useLoading'

import MainTest from 'components/screen/MainTest'
import ModuleBar from 'components/screen/ModuleBar'
import QuestionBar from 'components/screen/QuestionBar'

import StudentTestService from 'services/StudentTestService'

function Test() {
  const { id } = useParams();
  const [moduleId, setModuleId] = React.useState(0);
  const [questionId, setQuestionId] = React.useState(0);
  const [moduleList, setModuleList] = React.useState([]);
  const [questionList, setQuestionList] = React.useState([]);

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();

  const fetchAssignedModulesByExamId = React.useCallback(async (id) => {
    startLoading();
    
    try {
        const modulesList = await StudentTestService.getAssignedModulesByExamId(id);
        setModuleList(modulesList);
        const currModule = modulesList[0]?.id;
        setModuleId(currModule);
    }catch(error) {
        setAlert(error, 'error');
    }

    stopLoading();
  });

  const fetchAssignedQuestionsByModuleId = React.useCallback(async (id) => {
    startLoading();
    
    try {
        const questionsList = await StudentTestService.getAssignedQuestionsByModuleId(id);
        
        setQuestionList(questionsList);
        const currQuestion = questionsList[0]?.id;
        setQuestionId(currQuestion);
    }catch(error) {
        setAlert(error, 'error');
    }

    stopLoading();
  });

  React.useEffect(() => {
    fetchAssignedModulesByExamId(id);
  },[id]);

  React.useEffect(() => {
    fetchAssignedQuestionsByModuleId(moduleId);
  },[moduleId]);

  return (
    <Grid container height='100%'>
        <Grid item width={300} >
            <ModuleBar list={moduleList} moduleId={moduleId} setModuleId={setModuleId} />
        </Grid>
        <Grid item flexGrow={1} mx={2} >
            <MainTest 
              moduleId={moduleId} setModuleId={setModuleId}
              questionId={questionId} setQuestionId={setQuestionId}
              questionList={questionList} setQuestionList={setQuestionList} />
        </Grid>
        <Grid item width={300} >
            <QuestionBar list={questionList} questionId={questionId} setQuestionId={setQuestionId} />
        </Grid>
    </Grid>
  )
}

export default Test