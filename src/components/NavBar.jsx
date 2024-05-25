import React from "react";
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from "hooks/useAuth";
import useAlert from "hooks/useAlert";
import { AppContext } from "context/AppContext";

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
    const [seconds, setSeconds] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [time, setTime] = React.useState(5);
    const [timerOn, setTimerOn] = React.useState(false);

    const interval = null;

    React.useEffect(() => {
        // NOT WORKING GOING IN INFINITE LOOP
        // if(appContext.examStarted) {
        //     interval = setInterval(() => {
        //         setTime(prevTime => prevTime - 1);
        //     }, 1000)
        // }else {
        //     clearInterval(interval);
        // }
    }, [appContext.examStarted]);

    React.useEffect( () => {
        let object = secondsToTime();
        let calcHours = Math.floor(time / (60 * 60));
    
        let divisor_for_minutes = time % (60 * 60);
        let calcMinutes = Math.floor(divisor_for_minutes / 60);
    
        let divisor_for_seconds = divisor_for_minutes % 60;
        let calcSeconds = Math.ceil(divisor_for_seconds);

        if (calcHours !== hours)
            setHours(calcHours);

        if (calcMinutes !== minutes)
            setMinutes(calcMinutes);

        setSeconds(calcSeconds);

        if(time <= 0) {
            console.log("here")
            setTimerOn(false);
            handleEndExam();
        }
    }, [time]);

    // React.useEffect( () => {
    //     //save last remaining time every minute
    //     sessionStorage.setItem('lastRemainingTime', JSON.stringify(time));
    // }, [minutes]);

    // React.useEffect( () => {
    //     setTimerOn(true);
    // }, [])

    const handleLogout = () => {
        setToken({});
        setAlert({message : 'Logout Successfully'}, 'success');
        navigateTo('/');
    }

    const handleEndExam = (e) => {
        setAppContext({...appContext, examStarted : false})
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
                            color="inherit"
                            onClick={(e) => {
                                e.preventDefault(); handleEndExam(); }} >
                            End Exam
                        </Button>
                        ) :
                        (<Button 
                            color="inherit"
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