import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import LargeWindow from 'layouts/LargeWindow'
import React, { useCallback, useEffect } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import SaveIcon from '@mui/icons-material/Save';
import { QuestionStatus } from 'utils/Enums';
import { AppContext } from 'context/AppContext';

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

  const [questionText, setQuestionText] = React.useState("");
  const [answer, setAnswer] = React.useState(null);
  const [question, setQuestion] = React.useState({options : []});

  // useEffect(() => {
  //   // This is added just for testing will remove afterwards
  //   setAppContext({...appContext, examStarted : true});
  // }, [])

  useEffect(() => {
    // fetch question object here from backend

    let questionObject = {
        id : questionId, 
        questionText : "This is a test question - " + questionId + "?",
        status : QuestionStatus.NOT_VISITED,
        answer : '',
        options : [
          {
            id : 1,
            optionText : "Option 1"
          },
          {
            id : 2,
            optionText : "Option 2"
          },
          {
            id : 3,
            optionText : "Option 3"
          },
          {
            id : 4,
            optionText : "Option 4"
          }
        ]
    }

    setQuestionText("This is a test question - " + questionId + "?");
    let optionList = [];
    for (let i = 0; i < 4; i++) {
      optionList = [...optionList, {id : i, text : ('option - ' + i), checked : false}];
    }

    //Make question Visited
    const newList = questionList.map( ques => 
      (ques.id == questionId && ques.status == QuestionStatus.NOT_VISITED)? {...ques, status : QuestionStatus.NOT_ANSWERED} : ques 
    );

    setQuestion(questionObject);
    setQuestionList(newList);
    setAnswer('');
  },[questionId]);

  const markAndNextQuestion = useCallback(() => {
    //Save the question
    let newQuestion = {...question, answer : answer, status : QuestionStatus.MARKED};
    setQuestion(newQuestion);

    console.log("Marking question... ", newQuestion);

    const newList = questionList.map( ques => 
      ques.id == questionId ? {...ques, status : QuestionStatus.MARKED} : ques 
    );

    let index = newList.findIndex(ques => ques.id == questionId);
    let newQuestionId = newList[((index+1) % newList.length)]?.id;

    setQuestionList(newList);
    setQuestionId(newQuestionId)

  }, [questionList, questionId, answer]);

  const saveAndNextQuestion = useCallback(() => {
    //Save the Question
    let newQuestion = {...question, answer : answer, status : QuestionStatus.ANSWERED};
    setQuestion(newQuestion);

    console.log("Saving question... ", newQuestion);

    const newList = questionList.map( ques => 
      ques.id == questionId ? {...ques, status : QuestionStatus.ANSWERED} : ques 
    );

    let index = newList.findIndex(ques => ques.id == questionId);
    let newQuestionId = newList[((index+1) % newList.length)]?.id;
    
    setQuestionList(newList);
    setQuestionId(newQuestionId)

  }, [questionList, questionId, answer]);

  const resetQuestion = useCallback(() => {
    //Save the Question
    let newQuestion = {...question, status : QuestionStatus.NOT_ANSWERED, answer : null};
    setQuestion(newQuestion);

    console.log("Saving question... ", newQuestion);

    const newList = questionList.map( ques => 
      ques.id == questionId ? {...ques, status : QuestionStatus.NOT_ANSWERED} : ques 
    );
    setQuestionList(newList);
    setAnswer('');

  }, [questionList, questionId, answer]);

  return (
    <LargeWindow>
      <Grid container direction='column' px={2} pb={3} sx={{ height: '100%'}}>
        {/* <Grid item >
          <Typography variant='body2'>Module : {moduleId}</Typography> 
        </Grid> */}
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