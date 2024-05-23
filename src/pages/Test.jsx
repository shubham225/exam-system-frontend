import { Grid } from '@mui/material'
import MainTest from 'components/screen/MainTest'
import ModuleBar from 'components/screen/ModuleBar'
import QuestionBar from 'components/screen/QuestionBar'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { QuestionStatus } from 'utils/Enums'

function Test() {
  // const examId = useParams();
  const [module, setModule] = React.useState(0);
  const [question, setQuestion] = React.useState(0);
  const [moduleList, setModuleList] = React.useState([]);
  const [questionList, setQuestionList] = React.useState([]);
  let moduleListS = [];
  let questionListS = [];

  useEffect(() => {
    moduleListS = [{id: 1, moduleName: "Aptitute"},{id: 2, moduleName: "Programming"}];
    setModuleList(moduleListS);
  },[]);

  useEffect(() => {
    const currModule = moduleList[0]?.id;
    setModule(currModule);
  }, [moduleList])

  useEffect(() => {
    if(module == 1){
      questionListS = [
                      {id : 1, status : QuestionStatus.ANSWERED}, 
                      {id : 2, status : QuestionStatus.NOT_ANSWERED},
                      {id : 3, status : QuestionStatus.NOT_ANSWERED},
                      {id : 4, status : QuestionStatus.NOT_ANSWERED},
                      {id : 5, status : QuestionStatus.NOT_ANSWERED},
                      {id : 6, status : QuestionStatus.NOT_ANSWERED},
                      {id : 7, status : QuestionStatus.NOT_ANSWERED},
                    ];
    }else {
      questionListS = [
        {id : 8, status : QuestionStatus.NOT_ANSWERED}, 
        {id : 9, status : QuestionStatus.NOT_ANSWERED},
        {id : 10, status : QuestionStatus.NOT_ANSWERED}
      ];
    }

    setQuestionList(questionListS);

    const currQuestion = questionListS[0]?.id;
    setQuestion(currQuestion);
  },[module]);

  return (
    <Grid container height='100%'>
        <Grid item width={300} >
            <ModuleBar list={moduleList} module={module} setModule={setModule} />
        </Grid>
        <Grid item flexGrow={1} mx={2} >
            <MainTest module={module} question={question} setQuestion={setQuestion} />
        </Grid>
        <Grid item width={300} >
            <QuestionBar list={questionList} question={question} setQuestion={setQuestion} />
        </Grid>
    </Grid>
  )
}

export default Test