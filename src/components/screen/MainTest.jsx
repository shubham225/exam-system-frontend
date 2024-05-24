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

  const [questionText, setQuestionText] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const {appContext, setAppContext} = React.useContext(AppContext);

  useEffect(() => {
    // This is added just for testing will remove afterwards
    setAppContext({...appContext, examStarted : true})
  }, [])

  useEffect(() => {
    // fetch question object here from backend
    setQuestionText("This is a test question - " + questionId + "?");
    let optionList = [];
    for (let i = 0; i < 4; i++) {
      optionList = [...optionList, {id : i, text : ('option - ' + i), checked : false}];
    }

    //Make question Visited
    const newList = questionList.map( ques => 
      (ques.id == questionId && ques.status == QuestionStatus.NOT_VISITED)? {...ques, status : QuestionStatus.NOT_ANSWERED} : ques 
    );

    setQuestionList(newList);

    setOptions(optionList);
  },[questionId]);

  const markAndNextQuestion = useCallback(() => {

    const newList = questionList.map( ques => 
      ques.id == questionId ? {...ques, status : QuestionStatus.MARKED} : ques 
    );

    let index = newList.findIndex(ques => ques.id == questionId);
    let newQuestionId = newList[((index+1) % newList.length)]?.id;

    setQuestionList(newList);
    setQuestionId(newQuestionId)

  }, [questionList, questionId]);

  const saveAndNextQuestion = useCallback(() => {

    const newList = questionList.map( ques => 
      ques.id == questionId ? {...ques, status : QuestionStatus.ANSWERED} : ques 
    );

    let index = newList.findIndex(ques => ques.id == questionId);
    let newQuestionId = newList[((index+1) % newList.length)]?.id;
    
    setQuestionList(newList);
    setQuestionId(newQuestionId)

  }, [questionList, questionId]);

  const resetQuestion = useCallback(() => {

    const newList = questionList.map( ques => 
      ques.id == questionId ? {...ques, status : QuestionStatus.NOT_ANSWERED} : ques 
    );
    setQuestionList(newList);

  }, [questionList, questionId]);

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
              <Typography variant='h4'>{questionText}</Typography> 
            </Grid>
            <Grid item m={3}> 
              <FormControl >
                <FormLabel id="row-radio-buttons-group-label">Options</FormLabel>
                <RadioGroup
                    name="option"
                    // value={values.gender}
                    // onChange={handleChange}
                    column
                    aria-labelledby="row-radio-buttons-group-label"
                >   
                  {options.map((option) => (
                      <FormControlLabel key={option.id} value={option.id} control={<Radio />} label={option.text} />
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