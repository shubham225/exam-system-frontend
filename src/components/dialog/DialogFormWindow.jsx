import * as React from 'react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DialogFormWindow(props) {
    const {
        open,
        title,
        onButtonClick,
        buttonLabel,
        maxWidth,
        handleClose
    } = props;
  
  return (
    <React.Fragment>
      <BootstrapDialog
        open={open}
        minWidth='md'
        maxWidth={(maxWidth) ? maxWidth : 'md'}
        onClose={handleClose}
        PaperProps={{
                style: {
                  width : '-webkit-fill-available'
                },
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    onButtonClick();
              }}} 
        >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          {props.children}
        </DialogContent>
        <DialogActions>
          <Button type='submit' 
            variant='contained'>
            {buttonLabel}
          </Button>
          <Button variant='outlined' onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
