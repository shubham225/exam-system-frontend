import React from "react";

import { useNavigate } from 'react-router-dom'
import { useTimer } from "react-timer-hook";
import { AppContext } from "context/AppContext";

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import useAuth from "hooks/useAuth";
import useAlert from "hooks/useAlert";
import useLoading from "hooks/useLoading";

import StudentTestService from "services/StudentTestService";
import SessionService from "services/SessionService";

import { ExamStatus } from "utils/Enums";

const NavBar = () => {
    const navigateTo = useNavigate();
    const {token, setToken} = useAuth();
    const {startLoading, stopLoading} = useLoading();
    const {setAlert} = useAlert();
    const {appContext, setAppContext} = React.useContext(AppContext);
    const duration = new Date();


    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ duration, onExpire: () => handleEndExam() });

    const endExamById = React.useCallback(async (id) => {
        startLoading();
        
        try {
            await StudentTestService.updateExamStatusById(id, ExamStatus.COMPLETED);
        }catch(error) {
            setAlert(error, 'error');
        }

        stopLoading();
    });

    React.useEffect(() => {
        const currentExam = appContext?.exam;
        let time = currentExam?.startTime;
        
        if(time) {
            time.setSeconds(time.getSeconds() + currentExam.duration);
            restart(time);
        }

    },[appContext.exam.startTime])

    React.useEffect(() => {

        // Fetching the exam data from session storage on refresh. 
        const currentExam = appContext?.exam;
        const storedExam = SessionService.getCurrentExam();
        const storedExamIsStarted = (storedExam?.started) ? storedExam.started : false;

        if(currentExam.started === false && storedExamIsStarted) {
            setAppContext({...appContext, exam : storedExam});
        }
    },[])

    const handleLogout = () => {
        setToken({});
        setAlert({message : 'Logout Successfully'}, 'success');
        navigateTo('/');
    }

    const handleEndExam = () => {
        pause();

        // Ending the exam and updating details in backend, appContext and session storage

        endExamById(appContext.exam.id);
        const currentExam = {...appContext.exam, started : false, endTime : new Date()};
        setAppContext({...appContext, exam : currentExam});

        SessionService.setCurrentExam(currentExam);

        setAlert({message : 'Exam Ended Successfully'}, 'success');
        navigateTo('/dashboard');
    }

    return (
        <Paper elevation={6} sx= {{ borderRadius: '10px' }} >
            <Toolbar>
                <Typography variant="h6" component="div" onClick={() => {navigateTo('/');}}>
                    Exam-Portal
                </Typography>
                
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                {(appContext.exam.started) && 
                    <Typography variant='outlined' color={(parseInt(minutes) <= 2) ? 'error' : 'primary'}>
                        TIME REMAINING : {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
                    </Typography>}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                {
                    (token) && (
                    (appContext.exam.started) ? 
                        (
                            <Button 
                            variant="contained"
                            color="error"
                            onClick={(e) => {
                                e.preventDefault(); handleEndExam(); }} >
                            End Exam
                        </Button>
                        ) :
                        (<Button 
                            variant="outlined"
                            color="secondary"
                            onClick={(e) => {
                                e.preventDefault(); handleLogout();}} >
                            Logout
                        </Button>))
                }
            </Toolbar>
        </Paper>
    );
}


export default NavBar;