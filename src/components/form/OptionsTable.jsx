import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Button, Box, Checkbox, TextField } from '@mui/material';

import { Delete, Edit} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material'

import OptionDialog from 'components/dialog/OptionDialog';
import Mode, { Action } from 'utils/Enums';
import AddIcon from '@mui/icons-material/Add';

export default function OptionsTable(props) {
    const {
        options,
        setOptions,
        action,
    } = props;

    const [openOptionDlg, setOpenOptionDlg] = React.useState(false);
    const [optionAction, setOptionAction] = React.useState(Action.NEW_RECORD);
    const [optionId, setOptionId] = React.useState(0);

    console.log(options)

    const handleViewOptionRecord = (e, selectedRow) => {
        e.preventDefault();
    
        setOptionAction(Action.DISPLAY_RECORD);
        setOpenOptionDlg(true);
        setOptionId(selectedRow.id);
      }
    
      const handleEditOptionRecord = (e, selectedRow) => {
        e.preventDefault();
    
        setOptionAction(Action.MODIFY_RECORD);
        setOpenOptionDlg(true);
        setOptionId(selectedRow.id);
      }
    
      const handleDeleteOptionRecord = (e, selectedRow) => {
        e.preventDefault();
        console.log('Delete Clicked for id : ' + selectedRow.id);
        setOptions(options.filter((option) => option.id !== selectedRow.id));
      }
    
    
      const handleNewOptionRecord = (e) => {
        e.preventDefault();
    
        setOptionAction(Action.NEW_RECORD);
        setOpenOptionDlg(true);
        setOptionId(-1);
      };

      const handleCloseOptionDlg = (updatedRow) => {
        if (updatedRow) {
            switch(optionAction) {
                case (Action.NEW_RECORD) : {
                    setOptions([...options, updatedRow]);
                    break;
                }
                case (Action.MODIFY_RECORD) : {
                    let filteredOption = options.filter((option) => option.id !== updatedRow.id)
                    setOptions([...filteredOption, updatedRow])
                    break;
                }
            }
        }
        setOpenOptionDlg(false);
      }

    return (
        <Grid containner >
            <Grid item sx={12} textAlign='end' mb={2}>
                <Button variant='contained' size='medium'
                    onClick={(e) => handleNewOptionRecord(e)} 
                    startIcon={<AddIcon />}>New</Button>
            </Grid>
            <Grid item sx={12} >
                <TableContainer component={Paper} sx={{ minWidth: 500, maxHeight: 350, overflow: 'auto' }}>
                    <Table stickyHeader >
                        <TableHead>
                        <TableRow>
                            <TableCell >ID</TableCell>
                            <TableCell >Option</TableCell>
                            <TableCell align="right">Answer</TableCell>
                            <TableCell align="right"> Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {options.map((row) => (
                                <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">{row.id}</TableCell>
                                <TableCell >{row.optionText}</TableCell>
                                <TableCell align="right"> <Checkbox disabled checked={row.isAnswer} /> </TableCell>
                                <TableCell align="right"> 
                                    <Box>
                                        <Tooltip title="Edit Record">
                                            <IconButton onClick={(e) => {e.preventDefault(); handleEditOptionRecord(e, row)}} >
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Delete Record">
                                            <IconButton onClick={(e) => handleDeleteOptionRecord(e, row)} >
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <OptionDialog open={openOptionDlg} action={action} optionId={optionId} onCloseDialog={handleCloseOptionDlg} />
            </Grid>
        </Grid>
    );
}
