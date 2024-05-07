import React from "react";

export const AuthContext = React.createContext("");

const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = React.useState(null);
    
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;