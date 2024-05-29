import React from 'react';

import TextField from '@mui/material/TextField';

import DialogFormWindow from './DialogFormWindow';

import { Action, Click } from 'utils/Enums';

export default function ModuleDialog(props) {
    const {
        open,
        action,
        module,
        setModule,
        onCloseDialog
    } = props;

    const onButtonClick = () => {
        onCloseDialog({click: Click.SUBMIT})
    };

    const handleClose = () => {
        onCloseDialog({click: Click.CLOSE})
    };

    return (
        <DialogFormWindow
            open={open} 
            title={(action == Action.NEW_RECORD) ? "Create New Module" : "Modify Module"}
            buttonLabel={(action == Action.NEW_RECORD) ? "Add" : "Modify"}
            onButtonClick={onButtonClick}
            handleClose={handleClose}
            >
            <TextField
                autoFocus
                required
                id="name"
                name="moduleName"
                label="Module Name"
                type="input"
                value={module.moduleName}
                onChange={(e) => {e.preventDefault(); setModule({...module, moduleName: e.target.value});}}
                fullWidth  
                sx={{my : 1}}              
                variant="outlined"
            />

            <TextField
                autoFocus
                required
                id="name"
                name="description"
                label="Description"
                type="input"
                value={module.description}
                onChange={(e) => {e.preventDefault(); setModule({...module, description: e.target.value});}}
                fullWidth    
                sx={{my : 1}}           
                variant="outlined"
            />
        </DialogFormWindow>
    )
}
