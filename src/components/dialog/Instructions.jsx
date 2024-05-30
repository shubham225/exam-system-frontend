import * as React from 'react';

import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';

import Typography from '@mui/material/Typography';
import DialogWindow from './DialogWindow';

import useLoading from 'hooks/useLoading';
import useAlert from 'hooks/useAlert';

import StudentTestService from 'services/StudentTestService';
import SessionService from 'services/SessionService';

import { ExamStatus } from 'utils/Enums';

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
        let examObj = {id : exam.id, started : true, startTime : new Date(), duration : exam.duration};

        examObj = await StudentTestService.updateExamStatusById(id, ExamStatus.IN_PROGRESS);
        examObj = {...examObj, started : true, startTime : new Date(examObj.startTime)};
        
        setAppContext({...appContext, exam : examObj});
        SessionService.setCurrentExam(examObj);
    }catch(error) {
        setAlert(error, 'error');
    }

    stopLoading();
  });

  const onButtonClick = () => {
    // Updating Exam Status and startTime in Backend, AppContext and SessionStorage
    startExamById(exam.id);

    handleClose();
    navigateTo("/test/" + exam.id);
  }

  return (
      <DialogWindow open={open}
        maxWidth='sm'
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
