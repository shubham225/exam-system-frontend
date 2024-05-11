import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getOptionById } from 'services/optionService';
import { Action } from 'utils/Enums';

import {
        FormControlLabel,
        Checkbox,
        TextField,
        FormGroup} from '@mui/material';

export default function QuestionDialog(props) {
    const {
        open,
        action,
        optionId,
        onCloseDialog
    } = props;

    const [option, setOption] = useState({});

    useEffect(() => {
        if (action === Action.NEW_RECORD) {
            setOption({})
        } else {
            setOption(getOptionById(optionId));
        }
    },[optionId, action]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const optionN = {...option, id : 333}  
        onCloseDialog(optionN);
    }

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
            onClose={() => onCloseDialog({})} 
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
                <Button onClick={(event) => {handleSubmit(event)}} variant='contained' size='medium' >{(action === Action.DISPLAY_RECORD) ? "Ok" : "Create"}</Button>
                {(action !== Action.DISPLAY_RECORD) && <Button variant='outlined' size='medium' onClick={() => onCloseDialog({})}>Cancel</Button>}
            </DialogActions>
        </Dialog>
    )
}
