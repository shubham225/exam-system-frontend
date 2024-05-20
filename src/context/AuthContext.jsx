import useAuth from "hooks/useAuth";
import React from "react";

export const AuthContext = React.createContext("");

const AuthContextProvider = ({children}) => {
    const {token, setToken} = useAuth();

    const [auth, setAuth] = React.useState(token);
    
    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;