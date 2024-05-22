import { Grid } from '@mui/material'
import MainTest from 'components/screen/MainTest'
import ModuleBar from 'components/screen/ModuleBar'
import QuestionBar from 'components/screen/QuestionBar'
import React from 'react'

function Test() {
  return (
    <Grid container height='100%'>
        <Grid item width={300} >
            <ModuleBar />
        </Grid>
        <Grid item flexGrow={1} mx={2}>
            <MainTest />
        </Grid>
        <Grid item width={300} >
            <QuestionBar />
        </Grid>
    </Grid>
  )
}

export default Test