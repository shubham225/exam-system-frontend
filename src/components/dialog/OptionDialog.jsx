import React from 'react';

import {
        FormControlLabel,
        Checkbox,
        TextField,
        FormGroup} from '@mui/material';

import DialogWindow from './DialogWindow';

import { Action, Click } from 'utils/Enums';

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
        <DialogWindow
            open={open} 
            title={(action == Action.NEW_RECORD) ? 
                        "Create New Option" : 
                        (action == Action.DISPLAY_RECORD) ? "View Option" :"Modify Option"}
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
        </DialogWindow>
    )
}
