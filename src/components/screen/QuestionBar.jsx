import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Typography } from '@mui/material';
import LargeWindow from 'layouts/LargeWindow'
import React from 'react'
import { QuestionStatus } from 'utils/Enums';

function QuestionBar(props) {
  const {
    list,
    questionId,
    setQuestionId
  } = props;

  const getButtonFormatting = (status) => {
    switch (status) {
      case QuestionStatus.ANSWERED:
        return {variant : 'contained', color : 'success'};
        break;
    
      case QuestionStatus.NOT_ANSWERED:
        return {variant : 'contained', color : 'error'};
        break;

      case QuestionStatus.MARKED:
        return {variant : 'contained', color : 'secondary'}; 
        break;

      case QuestionStatus.VISITED:
        return {variant : 'contained', color : 'primary'};
        break;

      default:
        return {variant : 'outlined', color : 'primary'};
        break;
    }
    return 
  }

  return (
    <LargeWindow >
      <Box sx={{height : '100%', display : 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
      <Grid container justifyContent='center' p={2} sx={{maxHeight : '60vh', overflow: 'auto'}}>
        {list.map((row) => (
          <Grid item >
            <Button {...getButtonFormatting(row.status)} 
              ac
              sx={{height : '60px', width : '60px', m : 1}} 
              onClick={() => setQuestionId(row.id)}><Typography variant={(questionId == row.id) ? 'h6' : 'h7'}>{row.seq}</Typography></Button>
          </Grid>
        ))}
      </Grid>
      <Grid container p={2} direction='column' pb={3} >
      <table>
        <tr>
          <td>
            <Button {...getButtonFormatting(QuestionStatus.MARKED)} sx={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', m: 1}}>1</Button>
            <Typography variant='caption' >Marked</Typography>
          </td>
          <td>
            <Button {...getButtonFormatting(QuestionStatus.NOT_VISITED)}  sx={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', m: 1}}>1</Button>
            <Typography variant='caption' >Not Visited</Typography>
          </td>
        </tr>
        <tr>
          <td>
            <Button {...getButtonFormatting(QuestionStatus.ANSWERED)} sx={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', mt: 1, mx : 1 }}>1</Button>
            <Typography variant='caption' >Answered</Typography>
          </td>
          <td>
            <Button {...getButtonFormatting(QuestionStatus.NOT_ANSWERED)} sx={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px', mt: 1, mx : 1}}>1</Button>
            <Typography variant='caption' >Not Answered</Typography>
          </td>
        </tr>
      </table>
      </Grid>
      </Box>
    </LargeWindow>
  )
}

export default QuestionBar