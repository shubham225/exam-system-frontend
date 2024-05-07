import React from 'react'
import {TextField} from '@mui/material';

export default function Input(props) {

    const {name, value, onChange, label} = props;
    return (
        <TextField
            fullWidth
            variant="outlined"
            name={name}
            value={value}
            onChange={onChange}
            label={label}
        />
    )
}
