import { Box, Button, Divider, Grid, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import StartIcon from '@mui/icons-material/Start';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';

const fullSpaceCenter = {
  height: '100%', 
  width: '100%',
  display: 'flex', 
  alignItems: 'center',
  justifyContent: 'center'
}

function Examination() {
  const navigateTo = useNavigate();
  const {appContext, setAppContext} = React.useContext(AppContext);

  return (
    <Grid container direction='column' height='100%' alignItems='center' >
        <Grid item >
          <Typography variant='h3' px={1}>Start Examination</Typography>
        </Grid>
        <Grid item width='100%'>
          <Divider />
        </Grid>
        <Grid item mt={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exam ID</TableCell>
                <TableCell>Exam</TableCell>
                <TableCell>Start</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>121</TableCell>
                <TableCell>SDE-1 Exam</TableCell>
                <TableCell>
                <Button variant='contained' 
                  endIcon={<PlayArrowIcon />} 
                  onClick={(e) => {e.preventDefault(); setAppContext({...appContext, examStarted : true});navigateTo("/test/23");}}>
                    Start
                </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>122</TableCell>
                <TableCell>SDE-2 Exam</TableCell>
                <TableCell>
                <Button variant='contained' 
                  endIcon={<PlayArrowIcon />} 
                  onClick={(e) => {e.preventDefault(); setAppContext({...appContext, examStarted : true});navigateTo("/test/23");}}>
                    Start
                </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>123</TableCell>
                <TableCell>SDE-3 Exam</TableCell>
                <TableCell>
                <Button variant='contained' 
                  endIcon={<PlayArrowIcon />} 
                  onClick={(e) => {e.preventDefault(); setAppContext({...appContext, examStarted : true});navigateTo("/test/23");}}>
                    Start
                </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          
        </Grid>
    </Grid>
  )
}

export default Examination