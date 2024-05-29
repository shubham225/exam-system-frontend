import React from 'react';

import { Tab, Tabs } from '@mui/material';

import LargeWindow from 'layouts/LargeWindow';

import AssignmentIcon from '@mui/icons-material/Assignment';

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
              <Tab 
                sx={{justifyContent : 'start'}} 
                iconPosition='start' 
                icon={<AssignmentIcon />} 
                value={row.id} label={row.moduleName}
                onClick={() => setModuleId(row.id)} />
            ))}
      </Tabs>
    </LargeWindow>
  )
}

export default ModuleBar