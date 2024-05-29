import React from "react";

export const AppContext = React.createContext("");

const AppContextProvider = ({children}) => {
    let initialAppContext = 
    { 
        loading : false, 
        alert : {
            open : false, 
            message : '', 
            severity : 'error'
        },
        exam : {
            started : false,
            duration : 60
        }
    };

    const [appContext, setAppContext] = React.useState(initialAppContext);
    
    return(
        <AppContext.Provider value={{appContext, setAppContext}}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;