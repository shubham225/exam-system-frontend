import React from 'react'
import {FormControl, 
        FormLabel,
        FormControlLabel,
        Radio} from '@mui/material';

export default function RadioGroup(props) {
    const {label, name, value, onChange, items, ...other} = props;
    console.log(items)
    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <RadioGroup
                row
                name={name}
                value={value}
                onChange={onChange}
                {...other}
            >
                {
                    items.map(
                        item => (
                            <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.label} />
                        )
                )}
            </RadioGroup>
        </FormControl>
    )
}
