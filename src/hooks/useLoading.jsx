import React from 'react';

import { AppContext } from 'context/AppContext';


const useLoading = () => {
    const {appContext, setAppContext} = React.useContext(AppContext);

    const startLoading = () => {
        setAppContext((context) => {return {...context, loading : true}});
    } 

    const stopLoading = () => {
        setAppContext((context) => {return {...context, loading : false}});
    } 

    return {
        startLoading,
        stopLoading
    };
}

export default useLoading;