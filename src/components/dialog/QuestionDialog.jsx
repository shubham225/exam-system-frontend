import React from 'react';

import QuestionForm from 'components/form/QuestionForm';
import DialogFormWindow from './DialogFormWindow';

import { Action, Click } from 'utils/Enums';


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
            title={(action == Action.NEW_RECORD) ? 
                        "Create New Question" : 
                        (action == Action.DISPLAY_RECORD) ? "View Question" :"Modify Question"}
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
