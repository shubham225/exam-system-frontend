import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import LargeWindow from 'layouts/LargeWindow'
import React, { useCallback, useEffect } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import SaveIcon from '@mui/icons-material/Save';
import { QuestionStatus } from 'utils/Enums';
import { AppContext } from 'context/AppContext';
import StudentTestService from 'services/StudentTestService';
import useLoading from 'hooks/useLoading';
import useAlert from 'hooks/useAlert';

function MainTest(props) {
  const {
    moduleId,
    setModuleId,
    questionId,
    setQuestionId,
    questionList,
    setQuestionList

  } = props;

  const {appContext, setAppContext} = React.useContext(AppContext);

  const [answer, setAnswer] = React.useState(null);
  const [question, setQuestion] = React.useState({options : []});

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();

  const fetchAssignedQuestionById = useCallback(async (id) => {
    startLoading();
    
    try {
        const questionObject = await StudentTestService.getAssignedQuestionById(id);

        const newList = questionList.map( ques => 
          (ques.id == questionObject.id && ques.status == QuestionStatus.NOT_VISITED)? {...ques, status : QuestionStatus.NOT_ANSWERED} : ques 
        );
    
        setQuestion(questionObject);
        setQuestionList(newList);
        setAnswer('');
    }catch(error) {
        setAlert(error, 'error');
    }

    stopLoading();
  });

  const saveAssignedQuestion = useCallback(async (question) => {
    startLoading();
    
    try {
        const questionObject = await StudentTestService.updateAssignedQuestion(question);
        setQuestion(questionObject);

        const newList = questionList.map( ques => 
          ques.id == questionObject.id ? {...ques, status : questionObject.status} : ques 
        );
    
        let index = newList.findIndex(ques => ques.id == questionObject.id);
        let newQuestionId = newList[((index+1) % newList.length)]?.id;
    
        setQuestionList(newList);
        setQuestionId(newQuestionId)
    }catch(error) {
        setAlert(error, 'error');
    }

    stopLoading();
  });

  useEffect(() => {
    fetchAssignedQuestionById(questionId);
  },[moduleId, questionId]);

  const markAndNextQuestion = () => {
    let newQuestion = {...question, answer : answer, status : QuestionStatus.MARKED};
    saveAssignedQuestion(newQuestion);
  };

  const saveAndNextQuestion = () => {
    let newQuestion = {...question, answer : answer, status : QuestionStatus.ANSWERED};
    saveAssignedQuestion(newQuestion);
  };

  const resetQuestion = () => {
    let newQuestion = {...question, status : QuestionStatus.NOT_ANSWERED, answer : null};
    saveAssignedQuestion(newQuestion);
  };

  return (
    <LargeWindow>
      <Grid container direction='column' px={2} pb={3} sx={{ height: '100%'}}>
        <Grid item flexGrow={1} >
          <Grid container direction='column' justifyContent='space-between'>
            <Grid item my={3}>
              <Typography variant='overline'>Question : {questionId}</Typography> 
              <Typography variant='h4'>{question.questionText}</Typography> 
            </Grid>
            <Grid item m={3}> 
              <FormControl >
                <FormLabel id="row-radio-buttons-group-label">Options</FormLabel>
                <RadioGroup
                    name="option"
                    value={answer}
                    onChange={(e) => {setAnswer(e.target.value)}}
                    column
                    aria-labelledby="row-radio-buttons-group-label"
                >   
                  {question.options.map((option) => (
                      <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.optionText} />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{display : 'flex'}} >
            <Button size='large' variant="outlined" 
              onClick={(e) => {e.preventDefault(); markAndNextQuestion();}}
              startIcon={<BookmarkBorderIcon />} sx={{mx : 1}}>
                Mark & Next
            </Button> 
            <Button size='medium' variant="outlined"
              onClick={(e) => {e.preventDefault(); resetQuestion();}}  
              startIcon={<RestartAltIcon />} sx={{mx : 1}}>
                Reset
            </Button>
            <Box flexGrow={1} />
            <Button size='large' variant="contained"
              onClick={(e) => {e.preventDefault(); saveAndNextQuestion();}}  
              startIcon={<SaveIcon />} sx={{mx : 1}}>
                Save & Next
            </Button>
        </Grid>
      </Grid>
    </LargeWindow>
  )
}

export default MainTest