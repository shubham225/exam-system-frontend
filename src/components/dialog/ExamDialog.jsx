import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Action, Click } from 'utils/Enums';

export default function ExamDialog(props) {
    const {
        open,
        action,
        exam,
        setExam,
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
            <DialogTitle>{(action == Action.NEW_RECORD) ? "Create New Exam" : "Modify Exam"}</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="examName"
                label="Exam Name"
                type="input"
                value={exam.examName}
                onChange={(e) => {e.preventDefault(); setExam({...exam, examName: e.target.value});}}
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
                value={exam.description}
                onChange={(e) => {e.preventDefault(); setExam({...exam, description: e.target.value});}}
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
