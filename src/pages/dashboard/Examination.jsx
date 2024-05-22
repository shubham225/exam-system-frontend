import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import StartIcon from '@mui/icons-material/Start';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';

const fullSpaceCenter = {
  height: '100%', 
  width: '100%',
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'center'
}

function Examination() {
  const navigateTo = useNavigate();

  return (
    <Grid container direction='column' height='100%' alignItems='center' justifyContent='center'>
        <Grid item >
          <Typography variant='h2'>Start Examination</Typography>
        </Grid>
        <Grid item >
          <Button variant='contained' 
            endIcon={<PlayArrowIcon />} 
            onClick={(e) => {e.preventDefault(); navigateTo("/test/23");}}>
              Start
          </Button>
        </Grid>
    </Grid>
  )
}

export default Examination