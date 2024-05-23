import { Box, Button, Checkbox, Grid, Paper, Typography } from '@mui/material'
import LargeWindow from 'layouts/LargeWindow'
import React, { useEffect } from 'react'

function MainTest(props) {
  const {
    module,
    question,
    setQuestion
  } = props;

  const [questionText, setQuestionText] = React.useState("");
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    setQuestionText("Question - " + question);
    let optionList = [];
    for (let i = 0; i <= question; i++) {
      optionList = [...optionList, {id : i, text : ('option - ' + i), checked : false}];
    }
    setOptions(optionList);
  },[question]);

  return (
    <LargeWindow>
      <Grid container direction='column' p={2} sx={{ height: '100%'}}>
        <Grid item >
          <Typography variant='h9'>Module : {module}</Typography> 
        </Grid>
        <Grid item flexGrow={1} >
          <Grid container direction='column'>
            <Grid item my={3}>
              <Typography variant='h4'>Question : {questionText}</Typography> 
            </Grid>
            <Grid item >    
              {options.map((option) => (
                <Box display='flex' alignItems='baseline'>
                  <Checkbox checked={option.checked}></Checkbox>
                  <Typography variant='h6'>{option.text}</Typography>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{display : 'flex', justifyContent : 'end'}}>
          <Button>Prev</Button>
          <Button>Next</Button>
          <Button>Mark</Button> 
        </Grid>
      </Grid>
    </LargeWindow>
  )
}

export default MainTest