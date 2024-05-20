import axios from "axios";

axios.defaults.baseURL = 'http://localhost:9050/api/V1';
axios.defaults.headers.post["Content-type"] = 'application/json'

export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
}

export const setAuthToken = (userToken) => {
    sessionStorage.setItem('auth_token', JSON.stringify(userToken))
}

function request(method, url, data) {
    let headers = {};

    if(getAuthToken() !== null && getAuthToken() !== "null") {
        headers = {"Authorization" : ("Bearer " + getAuthToken())};
    }

    return axios(
        {
            method : method,
            headers : headers,
            url : url,
            data : data
        }
    );
}

export default request;