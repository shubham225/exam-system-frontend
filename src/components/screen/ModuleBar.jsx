import { Button, Grid, Paper, Typography } from '@mui/material'
import LargeWindow from 'layouts/LargeWindow'
import React from 'react'

function ModuleBar(props) {
  const {
    list,
    module,
    setModule
  } = props;

  return (
    <LargeWindow >
      <Grid container direction='column'>
        {list.map((row) => (
          <Grid item >
            <Button fullWidth sx={{height : '60px'}} onClick={() => setModule(row.id)}>{row.moduleName}</Button>
          </Grid>
        ))}
      </Grid>
    </LargeWindow>
  )
}

export default ModuleBar