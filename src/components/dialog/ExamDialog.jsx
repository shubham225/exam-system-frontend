import React, { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Action, Click } from 'utils/Enums';
import DialogFormWindow from './DialogFormWindow';
import { Grid } from '@mui/material';

export default function ExamDialog(props) {
    const {
        open,
        action,
        exam,
        setExam,
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
            title={(action == Action.NEW_RECORD) ? "Create New Exam" : "Modify Exam"}
            buttonLabel={(action == Action.NEW_RECORD) ? "Add" : "Modify"}
            onButtonClick={onButtonClick}
            handleClose={handleClose}
            >
            <TextField
                sx={{my : 1}}
                autoFocus
                required
                variant="outlined"
                id="name"
                name="examName"
                label="Exam Name"
                type="input"
                value={exam.examName}
                onChange={(e) => {e.preventDefault(); setExam({...exam, examName: e.target.value});}}
                fullWidth
            />
            <TextField
                sx={{my : 1}}
                autoFocus
                required
                variant="outlined"
                id="name"
                name="description"
                label="Description"
                type="input"
                value={exam.description}
                onChange={(e) => {e.preventDefault(); setExam({...exam, description: e.target.value});}}
                fullWidth
            />
            <TextField
                sx={{my : 1}}
                autoFocus
                required
                variant="outlined"
                id="duration"
                name="examDuration"
                label="Exam Duration (In Hours)"
                type="number"
                value={exam.examDuration}
                onChange={(e) => {e.preventDefault(); setExam({...exam, examDuration: e.target.value});}}
                fullWidth
            />
        </DialogFormWindow>
    )
}
