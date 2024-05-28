import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from "hooks/useAuth";
import useAlert from "hooks/useAlert";
import { AppContext } from "context/AppContext";
import Timer from "./ui/Timer";
import { useTimer } from "react-timer-hook";

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
    const {setAlert} = useAlert();
    const {appContext, setAppContext} = React.useContext(AppContext);
    const time = new Date();

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
      } = useTimer({ time, onExpire: () => handleEndExam() });

    React.useEffect(() => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 3600);
        restart(time)
    },[appContext.examStartTime])

    const handleLogout = () => {
        setToken({});
        setAlert({message : 'Logout Successfully'}, 'success');
        navigateTo('/');
    }

    const handleEndExam = () => {
        pause();
        setAppContext({...appContext, examStarted : false, examEnded : new Date()})
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