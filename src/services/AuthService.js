import request from "utils/AxiosHelper";

function loginWithEmailIdPassword(credentials) {
    return new Promise(async (resolve, reject) => {

        try {
            const response = await request( "POST", "/auth/login", credentials);
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

function logout(userId) {
    return new Promise((resolve, reject) => {
        // TODO : IMPLEMENT LOGOUT AT BACKEND
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

function getUserId() {
    const tokenString = sessionStorage.getItem('auth_token');
    const userToken = JSON.parse(tokenString);
    const userId = userToken?.userId;
    return userId;
}

function getUserRoles() {
    const tokenString = sessionStorage.getItem('auth_token');
    const userToken = JSON.parse(tokenString);
    const roles = userToken?.roles;
    return roles;
}

function isUserAdmin() {
    const roles = getUserRoles();
    if(roles.find((role) => role == 'ADMIN')) {
        return true;
    }else {
        return false;
    }
}

const AuthService = {
    loginWithEmailIdPassword,
    registerNewUser,
    logout,
    isUserAdmin,
    getUserId,
    getUserRoles
}

export default AuthService;