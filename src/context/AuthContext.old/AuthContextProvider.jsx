import React from "react";

const AuthContextProvider = ({children}) => {
    const [auth, setAuth] = React.useState(null);
    
    const AuthContext = React.createContext();
    
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;