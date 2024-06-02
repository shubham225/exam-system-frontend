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
    isUserAdmin,
    getUserId,
    getUserRoles
}

export default AuthService;