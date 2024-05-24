import { Box, Button, ButtonGroup, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Typography } from '@mui/material'
import LargeWindow from 'layouts/LargeWindow'
import React, { useEffect } from 'react'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import SaveIcon from '@mui/icons-material/Save';

function MainTest(props) {
  const {
    moduleId,
    questionId,
    setQuestionId
  } = props;

  const [questionText, setQuestionText] = React.useState("");
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    setQuestionText("This is a test question - " + questionId + "?");
    let optionList = [];
    for (let i = 0; i < 4; i++) {
      optionList = [...optionList, {id : i, text : ('option - ' + i), checked : false}];
    }
    setOptions(optionList);
  },[questionId]);

  return (
    <LargeWindow>
      <Grid container direction='column' p={2} sx={{ height: '100%'}}>
        <Grid item >
          <Typography variant='h9'>Module : {moduleId}</Typography> 
        </Grid>
        <Grid item flexGrow={1} >
          <Grid container direction='column'>
            <Grid item my={3}>
              <Typography variant='h6'>Question : {questionId}</Typography> 
              <Typography variant='h4'>{questionText}</Typography> 
            </Grid>
            <Grid item mt={4}> 
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
        <Grid item sx={{display : 'flex'}}>
            <Button size='large' variant="outlined" startIcon={<BookmarkBorderIcon />} sx={{mx : 1}}>Mark & Next</Button> 
            <Button size='medium' variant="outlined" startIcon={<RestartAltIcon />} sx={{mx : 1}}>Reset</Button>
            <Box flexGrow={1} />
            <Button size='large' variant="contained" startIcon={<SaveIcon />} sx={{mx : 1}}>Save & Next</Button>
        </Grid>
      </Grid>
    </LargeWindow>
  )
}

export default MainTest