import { AppContext } from 'context/AppContext';
import React from 'react'


const useAlert = () => {
    const {appContext, setAppContext} = React.useContext(AppContext);

    const setAlert = (error, type) => {
        let alertCtx = { open : true, message : error.message, severity : type};
        setAppContext((context) => {return {...context, alert : alertCtx}});
    } 

    const closeAlert = () => {
        setAppContext((context) => { return {...context, alert : {...appContext.alert, open : false, message : ''}}});
    } 

    return {
        setAlert,
        closeAlert
    };
}

export default useAlert;