import React from 'react'
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
                onChange={(e) => {e.preventDefault(); setOption({...option, [e.target.name]: e.target.value})}}
                label="New Option"
                type="input"/>
            <FormControlLabel 
                control={<Checkbox name="isAnswer" 
                            checked={option.isAnswer} 
                            onClick={(e) => {e.preventDefault(); setOption({...option, [e.target.name]: e.target.checked})}}/>} 
                label="Answer" />
        </FormGroup>
    )
}
