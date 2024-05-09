import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewExam(props) {
    const {
        open,
        onCloseDialog
    } = props;

    return (
        <Dialog
            open={open}
            onClose={() => onCloseDialog({})}
            PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const data = Object.fromEntries(formData.entries());
                onCloseDialog(data);
            },
            }}
        >
            <DialogTitle>Create New Exam</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="examName"
                label="Exam Name"
                type="input"
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
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button type="submit">Create</Button>
            <Button onClick={() => onCloseDialog({})}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
