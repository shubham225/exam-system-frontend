export const logout = (props) => {
    setAuth({});
    window.localStorage.removeItem("auth_token");
}

export const login = (props) => {
    setAuth({});
    window.localStorage.removeItem("auth_token");
}

