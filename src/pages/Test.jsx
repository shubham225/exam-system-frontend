import { Grid } from '@mui/material'
import MainTest from 'components/screen/MainTest'
import ModuleBar from 'components/screen/ModuleBar'
import QuestionBar from 'components/screen/QuestionBar'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { QuestionStatus } from 'utils/Enums'

function Test() {
  // const examId = useParams();
  const [moduleId, setModuleId] = React.useState(0);
  const [questionId, setQuestionId] = React.useState(0);
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
    setModuleId(currModule);
  }, [moduleList])

  useEffect(() => {
    if(moduleId == 1){
      // questionListS = [
      //                 {id : 112, seq : 1, status : QuestionStatus.ANSWERED}, 
      //                 {id : 213, seq : 2, status : QuestionStatus.NOT_VISITED},
      //                 {id : 321, seq : 3, status : QuestionStatus.NOT_ANSWERED},
      //                 {id : 423, seq : 4, status : QuestionStatus.NOT_VISITED},
      //                 {id : 523, seq : 5, status : QuestionStatus.NOT_ANSWERED},
      //                 {id : 612, seq : 6, status : QuestionStatus.MARKED},
      //                 {id : 712, seq : 7, status : QuestionStatus.NOT_VISITED},
      //                 {id : 523, seq : 5, status : QuestionStatus.NOT_ANSWERED},
      //                 {id : 612, seq : 6, status : QuestionStatus.MARKED},
      //                 {id : 712, seq : 7, status : QuestionStatus.NOT_VISITED},
      //               ];
      for (let i = 0; i < 100; i++) {
        questionListS = [...questionListS, {id : i, seq : i, status : QuestionStatus.NOT_VISITED}];
        
      }
    }else {
      questionListS = [
        {id : 823, seq : 1, status : QuestionStatus.NOT_ANSWERED}, 
        {id : 9221, seq : 2, status : QuestionStatus.NOT_ANSWERED},
        {id : 1220, seq : 3, status : QuestionStatus.NOT_ANSWERED}
      ];
    }

    setQuestionList(questionListS);

    const currQuestion = questionListS[0]?.id;
    setQuestionId(currQuestion);
  },[moduleId]);

  return (
    <Grid container height='100%'>
        <Grid item width={300} >
            <ModuleBar list={moduleList} moduleId={moduleId} setModuleId={setModuleId} />
        </Grid>
        <Grid item flexGrow={1} mx={2} >
            <MainTest moduleId={moduleId} questionId={questionId} setQuestionId={setQuestionId} />
        </Grid>
        <Grid item width={300} >
            <QuestionBar list={questionList} questionId={questionId} setQuestionId={setQuestionId} />
        </Grid>
    </Grid>
  )
}

export default Test