import React from 'react';
import {
        FormControlLabel,
        Checkbox,
        TextField,
        FormGroup} from '@mui/material';

export default function OptionForm(params) {
    const {
        option,
        setOption
    } = params;

    return (
        <FormGroup>
            <TextField
                fullWidth
                name="optionText"
                value={option.optionText}
                onChange={(e) => {e.preventDefault(); setOption({...option, optionText: e.target.value})}}
                label="New Option"
                type="input"/>
            <FormControlLabel 
                control={<Checkbox name="answer" 
                            checked={option.answer} 
                            onClick={(e) => {e.preventDefault(); setOption({...option, answer : e.target.checked})}}/>} 
                label="Answer" />
        </FormGroup>
    )
}
