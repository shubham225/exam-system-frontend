import React from "react";

let UserContext = React.createContext(
                    {
                        isAuthenticated : false    
                    }
                );

export default UserContext;