import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import QuestionForm from 'components/form/QuestionForm';
import { Action, Click } from 'utils/Enums';
import DialogFormWindow from './DialogFormWindow';


export default function QuestionDialog(props) {
    const {
        open,
        action,
        question,
        setQuestion,
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
            title={(action == Action.NEW_RECORD) ? "Create New Question" : (action == Action.DISPLAY_RECORD) ? "View Question" :"Modify Question"}
            buttonLabel={(action == Action.NEW_RECORD) ? "Add" : (action == Action.DISPLAY_RECORD) ? "Ok" : "Modify"}
            onButtonClick={onButtonClick}
            handleClose={handleClose}
            >
            <QuestionForm 
                action={action}
                question={question}
                setQuestion={setQuestion} />
        </DialogFormWindow>
    )
}
