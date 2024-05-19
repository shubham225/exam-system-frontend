import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getOptionById } from 'services/optionService';
import { Action, Click } from 'utils/Enums';

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

    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            onClose={() => onCloseDialog({click: Click.CLOSE})} 
        >
            <DialogTitle>
                {getDescription(action)}
            </DialogTitle>
            <DialogContent dividers>
                <FormGroup>
                    <TextField
                        fullWidth
                        name="optionText"
                        value={option.optionText}
                        onChange={(e) => {e.preventDefault(); setOption({...option, optionText : e.target.value})}}
                        label="New Option"
                        type="input"/>
                    <FormControlLabel 
                        control={<Checkbox name="isAnswer" 
                                    checked={option.isAnswer} 
                                    onChange={(e) => {e.preventDefault(); setOption({...option, isAnswer: e.target.checked})}}/>} 
                        label="Answer" />
                </FormGroup>
            </DialogContent>
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
        </Dialog>
    )
}
