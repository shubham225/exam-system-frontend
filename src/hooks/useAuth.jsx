import React from 'react';


const useAuth = () => {

    const getToken =() =>{
        const tokenString = sessionStorage.getItem('auth_token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    } 

    const [token, setToken] = React.useState(getToken());

    const saveToken = (userToken) => {
        sessionStorage.setItem('auth_token', JSON.stringify(userToken));
        setToken(userToken.token);
    }

    React.useEffect(() => {
        setToken(token)
    }, [token]);

    return {
        token,
        setToken : saveToken
    }
}

export default useAuth
