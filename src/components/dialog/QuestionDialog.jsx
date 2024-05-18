import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import QuestionForm from 'components/form/QuestionForm';
import { Action } from 'utils/Enums';


export default function QuestionDialog(props) {
    const {
        open,
        action,
        question,
        setQuestion,
        onCloseDialog
    } = props;

    const handleSubmitForm = (e) => {
        e.preventDefault();  

        /*
            question = {id : '', questionText : 'text', options : [{id: , optionText: '', isAnswer:false}, ...]}
        */
        
        //TODO: call API and perform action based on mode
        if(action == Action.MODIFY_RECORD) {
            console.log("Final Question :");
            console.log(question);
        }

        onCloseDialog(question);
    }

    return (
        <Dialog
            fullWidth
            maxWidth='lg'
            open={open}
            onClose={() => onCloseDialog({options: []})}
            PaperProps={{
                component: 'form',
                onSubmit: (e) => {handleSubmitForm(e)},
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
                {(action !== Action.DISPLAY_RECORD) && <Button variant='outlined' size='medium' onClick={() => onCloseDialog({options: []})}>Cancel</Button>}
            </DialogActions>
        </Dialog>
    )
}
