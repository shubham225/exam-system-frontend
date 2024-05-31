import axios from "axios";

var address = 'http://localhost';

axios.defaults.baseURL = (address + ':9050/api/V1');
axios.defaults.headers.post["Content-type"] = 'application/json'

function request(method, url, data) {
    const tokenString = sessionStorage.getItem('auth_token');

    let headers = {};
    
    if(tokenString){
        const userToken = JSON.parse(tokenString);
        const token = userToken?.token;
        if(token) headers = {"Authorization" : ("Bearer " + token)};
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

export function removeAuth() {
    sessionStorage.removeItem("auth_token");
}

export default request;
