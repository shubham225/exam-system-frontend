import { AppContext } from 'context/AppContext';
import React from 'react'


const useTimer = () => {
    const {appContext, setAppContext} = React.useContext(AppContext);

    const setExamTimer = (time) => {
        let alertCtx = { open : true, message : error.message, severity : type};
        setAppContext((context) => {return {...context, startTime : alertCtx}});
    } 

    const endExamTimer = () => {
        setAppContext((context) => { return {...context, alert : {...appContext.alert, open : false, message : ''}}});
    } 

    return {
        setExamTimer,
        endExamTimer
    };
}

export default useTimer;