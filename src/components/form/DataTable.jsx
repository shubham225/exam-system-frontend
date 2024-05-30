import * as React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


function DataTable(props) {
  const {
        width,
        height,
        ...other
        } = props;

  const [pageSize, setPageSize] = React.useState(7);

  return (
    <Box sx={{ height: {height}, width: '100%' }}>
      <DataGrid
        pageSize={pageSize}
        rowsPerPageOptions={[7, 14, 21]}
        onPageSizeChange={(size) => { setPageSize(size)}}
        getRowId={row => row.id}
        {...other}
      />
    </Box>
  );
}

DataTable.defaultProps = {
  height: 475,
  width: 950
}

export default DataTable