import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import QuestionForm from 'components/form/QuestionForm';
import { Action, Click } from 'utils/Enums';


export default function QuestionDialog(props) {
    const {
        open,
        action,
        question,
        setQuestion,
        onCloseDialog
    } = props;

    return (
        <Dialog
            fullWidth
            maxWidth='lg'
            open={open}
            onClose={() => onCloseDialog({click: Click.CLOSE})}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    onCloseDialog({click: Click.SUBMIT});
                }
            }}
        >
            <DialogTitle>Create New Question</DialogTitle>
            <DialogContent dividers>
                <QuestionForm 
                    action={action}
                    question={question}
                    setQuestion={setQuestion} />
            </DialogContent>
            <DialogActions>
                <Button type="submit" variant='contained' size='medium' >{(action === Action.DISPLAY_RECORD) ? "Ok" : "Create"}</Button>
                {(action !== Action.DISPLAY_RECORD) && <Button variant='outlined' size='medium' onClick={() => onCloseDialog({click: Click.CLOSE})}>Cancel</Button>}
            </DialogActions>
        </Dialog>
    )
}
