import React from "react";
import WindowContext from "./WindowContext";

const WindowContextProvider = ({children}) => {
    const [window, setWindow] = React.useState({currWindow : "Home"});
    
    return(
        <WindowContext.Provider value={{window, setWindow}}>
            {children}
        </WindowContext.Provider>
    );
}

export default WindowContextProvider;