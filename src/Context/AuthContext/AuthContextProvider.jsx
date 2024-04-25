import React from "react";
import AuthContext from "./AuthContext";

const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = React.useState(null);
    
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;