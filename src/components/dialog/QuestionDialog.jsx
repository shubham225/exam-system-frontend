import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import QuestionForm from 'components/form/QuestionForm';

export default function QuestionDialog(props) {
    const {
        open,
        title,
        mode,
        onCloseDialog
    } = props;

    return (
        <Dialog
            fullWidth
            maxWidth='lg'
            open={open}
            onClose={() => onCloseDialog({})}
            PaperProps={{
            component: 'form',
            onSubmit: (event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const data = Object.fromEntries(formData.entries());
                console.log(data);
                onCloseDialog(data);
            },
            }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <QuestionForm mode={mode} />
            </DialogContent>
            <DialogActions>
            <Button type="submit" variant='contained' size='medium'>Create</Button>
            <Button variant='outlined' size='medium' onClick={() => onCloseDialog({})}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}
