class AuthService {
    constructor(auth) {
        this.auth = auth;
    }

    async logout(props) {
        setAuth({});
        window.localStorage.removeItem("auth_token");
    }
    
    async login(props) {
        setAuth({});
        window.localStorage.removeItem("auth_token");
    }
}

export default AuthService;