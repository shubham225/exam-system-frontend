import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';
import DialogWindow from './DialogWindow';
import { ExamStatus } from 'utils/Enums';
import useLoading from 'hooks/useLoading';
import useAlert from 'hooks/useAlert';
import StudentTestService from 'services/StudentTestService';

export default function Instructions(props) {
    const {
        open,
        exam,
        handleClose
    } = props;

  const navigateTo = useNavigate();
  const {appContext, setAppContext} = React.useContext(AppContext);

  const {startLoading, stopLoading} = useLoading();
  const {setAlert} = useAlert();
  
  const startExamById = React.useCallback(async (id) => {
    startLoading();
    
    try {
        const examDetail = await StudentTestService.updateExamStatusById(id, ExamStatus.IN_PROGRESS);
    }catch(error) {
        setAlert(error, 'error');
    }

    stopLoading();
  });

  const onButtonClick = () => {
    startExamById(exam.id);
    setAppContext({...appContext, examId : exam.id, examStarted : true, examStartTime : new Date(), examDuration : exam.duration});
    
    // STORE EXAM DETAILS IN SESSION STORAGE
    // TODO : UPDATE LOGIC TO SYNC APPCONTEXT WITH BACKEND
    let examDetails = sessionStorage.getItem('current_exam');
    examDetails = {examId : exam.id, examStarted : true, examStartTime : new Date(), examDuration : exam.duration};
    sessionStorage.setItem('current_exam', JSON.stringify(examDetails));

    
    handleClose();
    navigateTo("/test/" + exam.id);
  }

  return (
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
  );
}