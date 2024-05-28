import React from "react";
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from "hooks/useAuth";
import useAlert from "hooks/useAlert";
import { AppContext } from "context/AppContext";
import { useTimer } from "react-timer-hook";
import { ExamStatus } from "utils/Enums";
import useLoading from "hooks/useLoading";
import StudentTestService from "services/StudentTestService";

function secondsToTime(secs)
{
    var hours = Math.floor(secs / (60 * 60));

    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);

    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);

    var obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
    };
    return obj;
}

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
        const examDetail = await StudentTestService.updateExamStatusById(id, ExamStatus.COMPLETED);
    }catch(error) {
        setAlert(error, 'error');
    }

    stopLoading();
    });

    React.useEffect(() => {

        let time = appContext?.examStartTime;

        if(time) {
            time.setSeconds(time.getSeconds() + appContext.examDuration);
            restart(time)
        }
    },[appContext.examStartTime])

    React.useEffect(() => {
        // IF EXAM IS STARTED AND APPLICTION CONTEXT IS NOT STARTED THEN SYNC APP CONTEXT
        // TODO : NEED TO UPDATE LOGIC TO SYNC APP CONTEXT FROM BACKEND RATHER THAN FROM SESSION STORAGE
        const examDetail = JSON.parse(sessionStorage.getItem('current_exam'));
        const examStarted = examDetail?.examStarted;
        if(appContext.examStarted === false && examStarted === true) {
            setAppContext({...appContext, 
                              examStarted : examDetail.examStarted, 
                              examStartTime : new Date(Date.parse(examDetail.examStartTime)), 
                              examDuration : examDetail.examDuration});
        }
        console.log(appContext);
    },[])

    const handleLogout = () => {
        setToken({});
        setAlert({message : 'Logout Successfully'}, 'success');
        navigateTo('/');
    }

    const handleEndExam = () => {
        pause();
        endExamById(appContext.examId)
        setAppContext({...appContext, examStarted : false, examEnded : new Date()})

        // STORE EXAM DETAILS IN SESSION STORAGE
        let examDetails = sessionStorage.getItem('current_exam');
        examDetails = {...examDetails, examStarted : false, examEnded : new Date()}
        sessionStorage.setItem('current_exam', JSON.stringify(examDetails));

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
                {(appContext.examStarted) && 
                    <Typography variant='outlined'>
                        TIME REMAINING : {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
                    </Typography>}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                {
                    (token) && (
                    (appContext.examStarted) ? 
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