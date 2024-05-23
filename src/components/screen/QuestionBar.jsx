import { Button, Grid } from '@mui/material';
import LargeWindow from 'layouts/LargeWindow'
import React from 'react'

function QuestionBar(props) {
  const {
    list,
    question,
    setQuestion
  } = props;

  return (
    <LargeWindow >
      <Grid container justifyContent='center' p={2}>
        {list.map((row) => (
          <Grid item >
            <Button variant='outlined' sx={{height : '60px', width : '60px', m : 1}} onClick={() => setQuestion(row.id)}>{row.id}</Button>
          </Grid>
        ))}
      </Grid>
    </LargeWindow>
  )
}

export default QuestionBar