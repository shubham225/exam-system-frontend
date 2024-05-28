import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Action, Click } from 'utils/Enums';
import DialogWindow from './DialogWindow';

import {
        FormControlLabel,
        Checkbox,
        TextField,
        FormGroup} from '@mui/material';

export default function QuestionDialog(props) {
    const {
        open,
        action,
        option,
        setOption,
        onCloseDialog
    } = props;

    const getDescription = (action) => {
        switch(action) {
            case (Action.NEW_RECORD) : {
                return "Create New Option";
            }
            case (Action.MODIFY_RECORD) : {
                return "Modify Option";
            }
            default : {
                return "View Option";
            }
        }
    }

    const onButtonClick = () => {
        onCloseDialog({click: Click.SUBMIT})
    };

    const handleClose = () => {
        onCloseDialog({click: Click.CLOSE})
    };

    return (
        // <Dialog
        //     fullWidth
        //     maxWidth='md'
        //     open={open}
        //     onClose={() => onCloseDialog({click: Click.CLOSE})} 
        // >
        //     <DialogTitle>
        //         {getDescription(action)}
        //     </DialogTitle>
        //     <DialogContent dividers>

        <DialogWindow
            open={open} 
            title={(action == Action.NEW_RECORD) ? "Create New Option" : (action == Action.DISPLAY_RECORD) ? "View Option" :"Modify Option"}
            buttonLabel={(action == Action.NEW_RECORD) ? "Add" : (action == Action.DISPLAY_RECORD) ? "Ok" : "Modify"}
            onButtonClick={onButtonClick}
            handleClose={handleClose}
            >
            <FormGroup fullWidth>
                <TextField
                    fullWidth
                    name="optionText"
                    value={option.optionText}
                    onChange={(e) => {e.preventDefault(); setOption({...option, optionText : e.target.value})}}
                    label="New Option"
                    type="input"/>
                <FormControlLabel 
                    control={<Checkbox name="answer" 
                                checked={option.isAnswer} 
                                onChange={(e) => {e.preventDefault(); setOption({...option, answer: e.target.checked})}}/>} 
                    label="Answer" />
            </FormGroup>
            {/* </DialogContent>
            <DialogActions>
                <Button 
                    variant='contained' size='medium' 
                    onClick={(event) => {
                        event.preventDefault();
                        onCloseDialog({click: Click.SUBMIT});
                    }} > 
                        {(action === Action.DISPLAY_RECORD) ? "Ok" : "Create"}
                </Button>
                {(action !== Action.DISPLAY_RECORD) && 
                 <Button 
                    variant='outlined' size='medium' 
                    onClick={(event) => {
                        event.preventDefault();
                        onCloseDialog({click: Click.SUBMIT});
                    }} >
                        Cancel
                 </Button>}
            </DialogActions>
        </Dialog> */}
        </DialogWindow>
    )
}
