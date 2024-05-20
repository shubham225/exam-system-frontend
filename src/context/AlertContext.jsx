import React from "react";

export const AlertContext = React.createContext("");

const AlertContextProvider = ({children}) => {
    const [alert, setAlert] = React.useState({open : false, message : ''});
    
    return(
        <AlertContext.Provider value={{alert, setAlert}}>
            {children}
        </AlertContext.Provider>
    );
}

export default AlertContextProvider;