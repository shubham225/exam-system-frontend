import request, { setAuthToken } from "utils/AxiosHelper";

function loginWithEmailIdPassword(credentials) {
    return new Promise(async (resolve, reject) => {
        console.log("Logging in.. : " + JSON.stringify(credentials));
        try {
            const response = await request( "POST", "/auth/login", credentials);
            // setAuthToken(response.data.token);
            resolve(response.data);
        }catch(error) {
            if(error.response) {
                reject(error.response.data);
            }else {
                const message = error.code + " : " + error.message;
                reject({message : message});
            }
            window.localStorage.removeItem("auth_token");
        }
    });
}

function logout(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Logging out... : " + userId);

            if(userId) {
                resolve(userId);
            }else {
                reject({});
            }
        },1000)
    });
}

function registerNewUser(userData) {
    return new Promise(async (resolve, reject) => {
        console.log("Registering user... : " + userData);

        try {
            const response = await request( "POST", "/auth/register", userData);
            resolve(response.data);
        }catch(error) {
            if(error.response) {
                reject(error.response.data);
            }else {
                const message = error.code + " : " + error.message;
                reject({message : message});
            }
        }
    });
}

const AuthService = {
    loginWithEmailIdPassword,
    registerNewUser,
    logout
}

export default AuthService;