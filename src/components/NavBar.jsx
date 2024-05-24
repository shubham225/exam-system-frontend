import React from "react";
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useAuth from "hooks/useAuth";
import useAlert from "hooks/useAlert";
import { AppContext } from "context/AppContext";

const NavBar = () => {
    const navigateTo = useNavigate();
    const {token, setToken} = useAuth();
    const {setAlert} = useAlert();
    const {appContext, setAppContext} = React.useContext(AppContext);

    const handleLogout = (e) => {
        e.preventDefault();
        setToken({});
        setAlert({message : 'Logout Successfully'}, 'success');
        navigateTo('/');
    }

    const handleEndExam = (e) => {
        e.preventDefault();
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
                {(appContext.examStarted) && <Typography variant='outlined'>TIME REMAINING : 00:01:59</Typography>}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                {
                    (token) && 
                    (appContext.examStarted) ? 
                        (
                            <Button 
                            color="inherit"
                            onClick={handleEndExam}
                        >
                            End Exam
                        </Button>
                        ) :
                        (<Button 
                            color="inherit"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>)
                }
            </Toolbar>
        </Paper>
    );
}


export default NavBar;