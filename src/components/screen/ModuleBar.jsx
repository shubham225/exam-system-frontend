import { Button, ButtonGroup, Grid, Paper, Tab, Tabs, Typography } from '@mui/material'
import LargeWindow from 'layouts/LargeWindow'
import React from 'react'

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function ModuleBar(props) {
  const {
    list,
    moduleId,
    setModuleId
  } = props;

  return (
    <LargeWindow >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={moduleId}
          onChange={(e) => setModuleId(e.target.value)}
          sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            {list.map((row) => (
              <Tab onClick={() => setModuleId(row.id)} value={row.id} label={row.moduleName} />
            ))}
      </Tabs>
    </LargeWindow>
  )
}

export default ModuleBar