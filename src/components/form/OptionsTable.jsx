import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Button, Box, Checkbox } from '@mui/material';

import { Delete, Edit} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material'

import OptionDialog from 'components/dialog/OptionDialog';
import { Action } from 'utils/Enums';
import AddIcon from '@mui/icons-material/Add';

export default function OptionsTable(props) {
    const {
        options,
        setOptions,
        action,
        question,
        setQuestion
    } = props;

    const [openOptionDlg, setOpenOptionDlg] = React.useState(false);
    const [optionAction, setOptionAction] = React.useState(Action.NEW_RECORD);
    const [optionId, setOptionId] = React.useState(0);
    
    const handleEditOptionRecord = (e, selectedRow) => {
    e.preventDefault();

    setOptionAction(Action.MODIFY_RECORD);
    setOpenOptionDlg(true);
    setOptionId(selectedRow.id);
    }

    const handleDeleteOptionRecord = (e, selectedRow) => {
    e.preventDefault();
    let optionsNew = options.filter((option) => option.id !== selectedRow.id);
    setOptions(optionsNew);
    setQuestion({...question, options: optionsNew});
    }


    const handleNewOptionRecord = (e) => {
    e.preventDefault();

    setOptionAction(Action.NEW_RECORD);
    setOpenOptionDlg(true);
    setOptionId(0);
    };

    const handleCloseOptionDlg = (updatedRow) => {
        if (Object.keys(updatedRow).length > 0) {
            switch(optionAction) {
                case (Action.NEW_RECORD) : {
                    setOptions([...options, updatedRow]);
                    setQuestion({...question, options: [...options, updatedRow]});
                    break;
                }
                case (Action.MODIFY_RECORD) : {
                    let filteredOption = options.filter((option) => option.id !== updatedRow.id)
                    setOptions([...filteredOption, updatedRow])
                    setQuestion({...question, options: [...filteredOption, updatedRow]});
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
