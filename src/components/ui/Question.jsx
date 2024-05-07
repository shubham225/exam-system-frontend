import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Question(props) {
    const { questionText, options, onClose, rowId ,open } = props;

    const handleClose = () => {
        onClose({rowId : rowId , answer : 'No'});
    };

    const onButtonClick = (value) => {
        onClose(
                {rowId : rowId , answer : value}
        );
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {questionText}
            </DialogTitle>
            <DialogActions>
                {options.map(
                    option => (
                        <Button key={option.value} onClick={() => onButtonClick(option.value)}>{option.text}</Button>
                    )
                )}
            </DialogActions>
        </Dialog>
    )
}