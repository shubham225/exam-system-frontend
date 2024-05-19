import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Action, Click } from 'utils/Enums';

export default function ModuleDialog(props) {
    const {
        open,
        action,
        module,
        setModule,
        onCloseDialog
    } = props;

    return (
        <Dialog
            open={open}
            onClose={() => onCloseDialog({click: Click.CLOSE})}
            PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                onCloseDialog({click: Click.SUBMIT});
            },
            }}
        >
            <DialogTitle>{(action == Action.NEW_RECORD) ? "Create New Module" : "Modify Module"}</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="moduleName"
                label="Module Name"
                type="input"
                value={module.moduleName}
                onChange={(e) => {e.preventDefault(); setModule({...module, moduleName: e.target.value});}}
                fullWidth
                variant="standard"
            />
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="description"
                label="Description"
                type="input"
                value={module.description}
                onChange={(e) => {e.preventDefault(); setModule({...module, description: e.target.value});}}
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button type="submit">Create</Button>
            <Button onClick={() => onCloseDialog({click: Click.CLOSE})}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
