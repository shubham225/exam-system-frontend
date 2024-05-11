import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import QuestionForm from 'components/form/QuestionForm';
import { getQuestionById } from 'services/questionService';
import { getOptionById, getOptionsByQuestion } from 'services/optionService';
import { createNewQuestion } from 'services/questionService';
import OptionForm from 'components/form/OptionForm';
import objectHelper from 'utils/objectHelper';
import Mode, { Action } from 'utils/Enums';
import useForm from 'hooks/useForm';
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

    const [option, setOption] = useState(objectHelper.getDefaultOption());

    useEffect(() => {
        if (action === Action.NEW_RECORD) {
            setOption(objectHelper.getDefaultOption())
        } else {
            setOption(getOptionById(optionId));
        }
    },[optionId,action]);

    
    const handleSubmit = (event) => {
        event.preventDefault();  
    
        //TODO: call API and perform action based on mode
        let newOption = option;
        setOption({});
        onCloseDialog(option);
    }

    return (
        <Dialog
            fullWidth
            maxWidth='md'
            open={open}
            onClose={() => onCloseDialog({})} 
        >
            <DialogTitle>
                Create New Option  
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
                                    onClick={(e) => {e.preventDefault(); setOption({...option, isAnswer: e.target.checked})}}/>} 
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
