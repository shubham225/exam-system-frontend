import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material'
import LargeWindow from 'layouts/LargeWindow'
import React from 'react'

function ModuleBar(props) {
  const {
    list,
    moduleId,
    setModuleId
  } = props;

  return (
    <LargeWindow >
        <ButtonGroup
          fullWidth
          orientation="vertical"
          aria-label="Vertical button group"
          variant="text"
        >
        {list.map((row) => (
            <Button fullWidth sx={{height : '60px'}} onClick={() => setModuleId(row.id)}>{row.moduleName}</Button>
        ))}
        </ButtonGroup>
    </LargeWindow>
  )
}

export default ModuleBar