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
import DialogWindow from './DialogWindow';

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
        exam,
        handleClose
    } = props;

  const navigateTo = useNavigate();
  const {appContext, setAppContext} = React.useContext(AppContext);
  
  const onButtonClick = () => {
    setAppContext({...appContext, examStarted : true, examStartTime : new Date()});
    handleClose();
    navigateTo("/test/"+exam.id);
  }

  return (
    // <React.Fragment>
    //   <BootstrapDialog
    //     onClose={handleClose}
    //     aria-labelledby="customized-dialog-title"
    //     open={open}
    //     maxWidth='md'
    //   >
    //     <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
    //       Instructions
    //     </DialogTitle>
    //     <IconButton
    //       aria-label="close"
    //       onClick={handleClose}
    //       sx={{
    //         position: 'absolute',
    //         right: 8,
    //         top: 8,
    //         color: (theme) => theme.palette.grey[500],
    //       }}
    //     >
    //       <CloseIcon />
    //     </IconButton>
    //     <DialogContent dividers>
        <DialogWindow open={open}
          title="Instructions"
          buttonLabel="Continue"
          onButtonClick={onButtonClick}
          handleClose={handleClose}>
          <ul>
            <li>
              <Typography gutterBottom>
              You must use a functioning webcam and microphone
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
              No cell phones or other secondary devices in the room or test area
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
              Your desk/table must be clear or any materials except your test-taking device
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
              No one else can be in the room with you
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
              No talking 
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
              The testing room must be well-lit and you must be clearly visible
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
              No dual screens/monitors
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
              Do not leave the camera 
              </Typography>
            </li>
            <li>
              <Typography gutterBottom>
              No use of additional applications or internet
              </Typography>
            </li>
          </ul>
        </DialogWindow>
    //     </DialogContent>
    //     <DialogActions>
    //       <Button autoFocus 
    //         variant='contained'
    //         onClick={(e) => {
    //             e.preventDefault(); 
    //             setAppContext({...appContext, examStarted : true});
    //             handleClose();
    //             navigateTo("/test/"+exam.id);
    //         }} >
    //         Continue
    //       </Button>
    //       <Button onClick={handleClose}>
    //         Close
    //       </Button>
    //     </DialogActions>
    //   </BootstrapDialog>
    // </React.Fragment>
  );
}
