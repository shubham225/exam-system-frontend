import { AppContext } from 'context/AppContext';
import React from 'react'


const useTimer = () => {
    const {appContext, setAppContext} = React.useContext(AppContext);

    const setTimer = (error, type) => {
        let alertCtx = { open : true, message : error.message, severity : type};
        setAppContext((context) => {return {...context, alert : alertCtx}});
    } 

    const endTimer = () => {
        setAppContext((context) => { return {...context, alert : {...appContext.alert, open : false, message : ''}}});
    } 

    return {
        setTimer,
        endTimer
    };
}

export default useTimer;