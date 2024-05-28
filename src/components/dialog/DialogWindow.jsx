import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function Instructions(props) {
    const {
        open,
        title,
        onButtonClick,
        buttonLabel,
        closeButtonLabel,
        handleClose
    } = props;

  const navigateTo = useNavigate();
  const {appContext, setAppContext} = React.useContext(AppContext);
  
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='md'
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
          <Button autoFocus 
            variant='contained'
            onClick={(e) => {
                e.preventDefault(); onButtonClick();
            }} >
            {buttonLabel}
          </Button>
          <Button onClick={handleClose}>
            {(closeButtonLabel) ? closeButtonLabel : "Close"}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
