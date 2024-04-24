import React from 'react'
import AuthContext from "../../Context/AuthContext";
import request, { setAuthToken } from "../../Utils/AxiosHelper";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassowrd] = React.useState('');

    const {setAuth} = React.useContext(AuthContext);

    const navigateTo = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        request(
            "POST",
            "/auth/login",
            {
                username : username,
                password : password
            }
        ).then((response) => {
            setAuthToken(response.data.token);
            console.log("login : " + JSON.stringify(response.data));
            setAuth(response.data);
            navigateTo("/home")
        }).catch((error) => {
            // setAuthentication(false);
            // setUserInfo({});
            window.localStorage.removeItem("auth_token");
            console.log("error" + error);
        });
    }

    return (
        <>
        <div className="login">
            <div className="loginContainer">
                <form className="loginForm" onSubmit={handleLogin}>
                    <div className="loginFormItem">
                        <input 
                            type='text' 
                            alt='username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                         />
                    </div>
                    <div className="loginFormItem">
                        <input 
                            type='password' 
                            alt='password'
                            value={password}
                            onChange={(e) => setPassowrd(e.target.value)}
                         />
                    </div>
                    <input type="submit" value="Login"/>
                </form> 
            </div>
        </div>
        </>
      );
}


export default Login;
