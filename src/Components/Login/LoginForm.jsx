import React from "react";
import UserContext from "../../Context/UserContext";
import request, { setAuthToken } from "../../Utils/AxiosHelper";

function LoginForm() {
    const {user, setUser} = React.useContext(UserContext);
    const [username, setUsername] = React.useState("");
    const [password, setPassowrd] = React.useState("");

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
            console.log("login : " + username);
            setUser({isAuthenticated : true});
        }).catch((error) => {
            setUser({isAuthenticated : false});
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
                            type="text" 
                            alt="username"
                            onChange={(e) => setUsername(e.target.value)}
                         />
                    </div>
                    <div className="loginFormItem">
                        <input 
                            type="password" 
                            alt="password"
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


export default LoginForm;
