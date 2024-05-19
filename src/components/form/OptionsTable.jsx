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
import { Action, Click } from 'utils/Enums';
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
    const [option, setOption] = React.useState({});
    
    const handleEditOptionRecord = (e, selectedRow) => {
        e.preventDefault();

        setOptionAction(Action.MODIFY_RECORD);
        setOption(selectedRow);
        setOpenOptionDlg(true);
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
        setOption({});
        setOpenOptionDlg(true);
    };

    const handleCloseOptionDlg = (callback) => {
        if (callback.click === Click.SUBMIT) {
            switch(optionAction) {
                case (Action.NEW_RECORD) : {
                    let newOption = {...option, id : 0};
                    setOptions([...options, newOption]);
                    setQuestion({...question, options: [...options, newOption]});
                    break;
                }
                case (Action.MODIFY_RECORD) : {
                    //TODO : Call API to modify Record
                    let filteredOption = options.filter((row) => row.id !== option.id)
                    let data = [...filteredOption, option];
                    data.sort((a, b) => {return a.id - b.id});
                    setOptions(data)
                    setQuestion({...question, options: data});
                    break;
                }
                default : {
                    break;
                }
            }
        }
        setOpenOptionDlg(false);
    }


    return (
        <Grid containner >
            { (action !== Action.DISPLAY_RECORD) &&
            (<Grid item sx={12} textAlign='end' mb={2}>
                <Button variant='contained' size='medium'
                    onClick={(e) => handleNewOptionRecord(e)} 
                    startIcon={<AddIcon />}>New</Button>
            </Grid>)}
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
                                { (action !== Action.DISPLAY_RECORD) &&
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
                                }
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <OptionDialog 
                    open={openOptionDlg} 
                    action={action} 
                    option={option} 
                    setOption={setOption}
                    onCloseDialog={handleCloseOptionDlg} />
            </Grid>
        </Grid>
    );
}
